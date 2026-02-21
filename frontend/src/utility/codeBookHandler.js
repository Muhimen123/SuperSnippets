import { ConfigHandler } from "./configHandler";
import { CodeSegmentsHandler } from "./codeSegmentsHandler";

export class CodeBookHandler {
  #storageKey = "codebook";
  configHandler = new ConfigHandler();
  codeSegmentsHandler = new CodeSegmentsHandler();

  initiate = () => {
    this.clearAll();
    const codebook = {
      _id: "",
      ownerId: "",
      categories: [],
      collaborators: [],
    };
    this.write(codebook);
  };

  getId = () => {
    let codebook = this.convertToJSON();
    return codebook["_id"];
  };

  setId = (id) => {
    let codebook = this.convertToJSON();
    codebook["_id"] = id;
    this.write(codebook);
  };

  getOwnerId = () => {
    let codebook = this.convertToJSON();
    return codebook.ownerId;
  };

  setOwnerId = (ownerId) => {
    let codebook = this.convertToJSON();
    codebook.ownerId = ownerId;
    this.write(codebook);
  };

  setCategory = (category) => {
    let codebook = this.convertToJSON();
    codebook.categories.push(category);
    this.write(codebook);
  };

  setCategories = (categories) => {
    let codebook = this.convertToJSON();
    codebook.categories = categories;
    this.write(codebook);
  };

  setCollaborators = (collaborators) => {
    let codebook = this.convertToJSON();
    codebook.collaborators = collaborators;
    this.write(codebook);
  };

  getCollaborators = () => {
    let codebook = this.convertToJSON();
    return codebook ? codebook.collaborators : [];
  };

  getCategories = () => {
    let codebook = this.convertToJSON();
    return codebook ? codebook.categories : [];
  };

  clearCategories = () => {
    let codebook = this.convertToJSON();
    codebook.categories = [];
    this.write(codebook);
  };

  convertToJSON = () => {
    const codebookString = localStorage.getItem(this.#storageKey);
    return codebookString ? JSON.parse(codebookString) : null;
  };

  write = (codebook) => {
    const codebookString = JSON.stringify(codebook);
    localStorage.setItem(this.#storageKey, codebookString);
  };

  createSchemaData = (ownerId, modify = false) => {
    const config = this.configHandler.getConfig();
    const codesegments = this.codeSegmentsHandler.getSegments();
    const categories = this.getCategories();
    const collaborators = this.getCollaborators();
    if (modify) {
      ownerId = this.getOwnerId();
    }
    return {
      codebook_name: config.codebookName,
      owner: ownerId,
      collaborators: collaborators || [],
      repositories: config.repoArray || [],
      configuration: {
        margin: config.marginSize,
        header_text: config.headerText,
        column_number: config.columns,
        page_number: config.pageLimit,
        font_size: config.fontSize,
        font_family: config.font,
        orientation: config.orientation,
      },
      codeSegments: codesegments || [],
      categories: categories || [],
    };
  };

  downloadCodebookConfig = () => {
    const data = this.createSchemaData(this.getId());
    data["_id"] = this.getId();
    const configString = JSON.stringify(data) + "\n";
    console.log(configString);

    const blob = new Blob([configString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = `codebook_config.json`;

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  importCodebookConfig = (configString) => {
    this.clearAll();
    // localStorage.setItem(this.#storageKey, configString);
    const codebookData = JSON.parse(configString);
    this.initiate();
    this.configHandler.loadConfigFromSchema(codebookData);
    this.codeSegmentsHandler.addSegments(codebookData.codeSegments);
    this.setCategories(codebookData.categories);
  };

  loadCodebook = (codebookData) => {
    const tmpId = this.getId();
    this.initiate();
    this.configHandler.loadConfigFromSchema(codebookData);
    this.codeSegmentsHandler.addSegments(codebookData.codeSegments);
    this.setOwnerId(codebookData.owner._id);
    this.setCategories(codebookData.categories);
    this.setCollaborators(codebookData.collaborators);
    this.setId(tmpId);
  };

  clearAll() {
    localStorage.removeItem(this.#storageKey);
  }

  ultimateCleanUp() {
    this.clearAll();
    this.configHandler.clearAll();
    this.codeSegmentsHandler.clearAll();
  }

  createLatexData = () => {
    const categories = this.getCategories();
    console.log("Looping over categories to create LaTeX data:");
    let returnData = [];
    for (const category of categories) {
      let categoryField = {
        category: category.name,
        codesegments: [],
      };
      console.log("Processing category items");
      for (const item of category.items) {
        if (!item.included) {
          continue;
        }

        const segment = this.codeSegmentsHandler.getSegmentByIndex(item.id);
        const content = segment ? segment.code.join("\n") : "";
        categoryField.codesegments.push({
          name: item.name,
          content: content,
        });
      }

      returnData.push(categoryField);
    }

    return returnData;
  };
}
