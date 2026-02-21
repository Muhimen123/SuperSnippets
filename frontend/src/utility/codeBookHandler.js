import { ConfigHandler } from "./configHandler";
import { CodeSegmentsHandler } from "./codeSegmentsHandler";

export class CodeBookHandler {
  #storageKey = "codebook";
	configHandler = new ConfigHandler();
	codeSegmentsHandler = new CodeSegmentsHandler();

  initiate = () => {
		this.clearAll();
    const codebook = {
        _id: ""
    };
    this.write(codebook);
  }
    
	getId = () => {
		let codebook = this.convertToJSON();
		return codebook["_id"];
	}

	setId = (id) => {
		let codebook = this.convertToJSON();
		codebook["_id"] = id;
		this.write(codebook);
	}

	convertToJSON = () => {
		const codebookString = localStorage.getItem(this.#storageKey);
		return codebookString ? JSON.parse(codebookString) : null;
	}

  write =(codebook) => {
		const codebookString = JSON.stringify(codebook);
    localStorage.setItem(this.#storageKey, codebookString);
  }

	createSchemaData = (ownerId) => {
		const config = this.configHandler.getConfig();
		const codesegments = this.codeSegmentsHandler.getSegments();
		return {
      codebook_name: config.codebookName,
      owner: ownerId,
      collaborators: [],
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
      categories: [],
    };
	}

	loadCodebook = (codebookData) => {
		const tmpId = this.getId();
		this.initiate();
		this.configHandler.loadConfigFromSchema(codebookData); 
		this.codeSegmentsHandler.addSegments(codebookData.codeSegments);
		this.setId(tmpId);
	}

	clearAll() {
		localStorage.removeItem(this.#storageKey);
	}

	ultimateCleanUp() {
		this.clearAll();
		this.configHandler.clearAll();
		this.codeSegmentsHandler.clearAll();
	}
};
