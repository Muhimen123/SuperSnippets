import archiver from "archiver";
import { Writable } from "stream";
import Codebook from "../models/Codebook.js";
import User from "../models/User.js";
import { buildLatexText } from "../utils/pdf.util.js";

export const fetchCodebookById = async (codebookId) => {
  const codebook = await Codebook.findById(codebookId).populate("owner", "name");
  if (!codebook) {
    throw new Error("Codebook not found");
  }
  return codebook;
};

export const createNewConfiguration = async (data) => {
  const codebook = new Codebook(data);
  const savedConfig = await codebook.save();
  return savedConfig._id;
};

export const addCollaboratorToCodebook = async (codebookId, collaboratorId) => {
  const updatedCodebook = await Codebook.findByIdAndUpdate(
    codebookId,
    { $addToSet: { collaborators: collaboratorId } },
    { new: true },
  );
  if (!updatedCodebook) {
    throw new Error("Could not add collaborator");
  }
  return updatedCodebook;
};

export const removeCollaboratorFromCodebook = async (
  codebookId,
  collaboratorId,
) => {
  const updatedCodebook = await Codebook.findByIdAndUpdate(
    codebookId,
    { $pull: { collaborators: collaboratorId } },
    { new: true },
  );
  if (!updatedCodebook) {
    throw new Error("Could not remove collaborator");
  }
  return updatedCodebook;
};

export const getAllCollaboratorsForCodebook = async (codebookId) => {
  const codebook = await Codebook.findById(codebookId).populate(
    "collaborators",
    "name email",
  );
  if (!codebook) {
    throw new Error("Codebook not found");
  }
  return codebook.collaborators;
};

/**
 *
 * @param {*} userId
 * @returns {Promise<Array>} List of codebooks where the user is either owner or collaborator.
 * Each codebook includes the owner's name and the codebook name. Mainly to use it in the dashboard.
 */
export const fetchAllCodebooksForUser = async (userId) => {
  const codebooks = await Codebook.find({
    $or: [{ owner: userId }, { collaborators: userId }],
  })
    .populate("owner", "name")
    .select("owner codebook_name updatedAt")
    .sort({ updatedAt: -1 })
    .exec();

  return codebooks;
};

export const removeCodebook = async (codebookId) => {
  try {
    const deletedCodebook = await Codebook.findByIdAndDelete(codebookId);
    if (!deletedCodebook) {
      throw new Error("Codebook not found");
    }
    // Remove codebook reference from owner's document
    await User.findByIdAndUpdate(deletedCodebook.owner, {
      $pull: { codebooksID: codebookId },
    });
    return deletedCodebook;
  } catch (error) {
    throw new Error("Failed to delete codebook: " + error.message);
  }
};

export const modifyCodebook = async (codebookId, updatedData) => {
  try {
    const updatedCodebook = await Codebook.findByIdAndUpdate(
      codebookId,
      { $set: updatedData },
      { 
        new: true,
        runValidators: true,
        context: 'query'
      }
    );

    if (!updatedCodebook) {
      throw new Error("Codebook not found");
    }

    return updatedCodebook;
  } catch (error) {
    console.error(`Update Error (ID: ${codebookId}):`, error);
    throw new Error("Failed to update codebook: " + error.message);
  }
};

// TODO: Move the following functions in utility
export const generateTarBuffer = async (snippets, config) => {
  return new Promise((resolve, reject) => {
    const texCode = buildLatexText(snippets, config);
    const chunks = [];
    const archive = archiver("tar");

    const stream = new Writable({
      write(chunk, encoding, next) {
        chunks.push(chunk);
        next();
      },
    });

    archive.pipe(stream);

    archive.append(texCode, { name: "main.tex" });

    archive.on("error", (err) => reject(err));
    stream.on("finish", () => resolve(Buffer.concat(chunks)));

    archive.finalize();
  });
};
