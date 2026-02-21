export class ConfigHandler {
  #storageKey = "configuration";

  initiate(codebookName) {
    const config = {
      codebookName: codebookName,
      headerText: "CodeBook",
      repoArray: [],
      font: "Jetbrains Mono",
      marginSize: 1,
      fontSize: 11,
      columns: 1,
      pageLimit: 20,
      orientation: "landscape",
    };

    this.write(config);
  }

  write(config) {
    localStorage.setItem(this.#storageKey, this.convertToJSONString(config));
  }

  getConfig = () => {
    let config = this.convertToJSON();
    return config;
  };

  addRepo = (repoList) => {
    let config = this.convertToJSON();
    config["repoArray"] = [...config["repoArray"], ...repoList];
    this.write(config);
  };

  getRepos = () => {
    let config = this.convertToJSON();
    return config.repoArray;
  };

  setFont(fontName) {
    let config = this.convertToJSON();
    config["font"] = fontName;
    this.write(config);
  }

  getFont = () => {
    let config = this.convertToJSON();
    return config["font"];
  };

  setMargin = (marginSize) => {
    let config = this.convertToJSON();
    config["marginSize"] = Math.max(1, marginSize);
    this.write(config);
  };

  getMargin = () => {
    let config = this.convertToJSON();
    return config["marginSize"];
  };

  setFontSize = (fontSize) => {
    let config = this.convertToJSON();
    config["fontSize"] = fontSize;
    this.write(config);
  };

  getFontSize = () => {
    let config = this.convertToJSON();
    return config["fontSize"];
  };

  setColumns = (columns) => {
    let config = this.convertToJSON();
    config["columns"] = Math.max(1, columns);
    this.write(config);
  };

  getColumns = () => {
    let config = this.convertToJSON();
    return config["columns"];
  };

  setPageLimit = (pageLimit) => {
    let config = this.convertToJSON();
    config["pageLimit"] = pageLimit;
    this.write(config);
  };

  getPageLimit = () => {
    let config = this.convertToJSON();
    return config["pageLimit"];
  };

  setOrientation = (orientation) => {
    let config = this.convertToJSON();
    config["orientation"] = orientation;
    this.write(config);
  };

  getOrientation = () => {
    let config = this.convertToJSON();
    return config["orientation"];
  };

  setHeader = (headerText) => {
    let config = this.convertToJSON();
    config["headerText"] = headerText;
    this.write(config);
  };

  getHeader = () => {
    let config = this.convertToJSON();
    return config["headerText"];
  };

  clearAll() {
    localStorage.removeItem(this.#storageKey);
  }

  convertToJSONString(config) {
    return JSON.stringify(config);
  }

  convertToJSON() {
    const configString = localStorage.getItem(this.#storageKey);
    const config = JSON.parse(configString);
    return config;
  }

  downloadConfig = () => {
    const config = this.convertToJSON();
    const configString = this.convertToJSONString(config) + "\n";

    const blob = new Blob([configString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const fileName = `${config.codebookName || "codebook"}_config.json`;

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  importConfig = (configString) => {
    this.clearAll();
    localStorage.setItem(this.#storageKey, configString);
  };

  createSchemaData = (ownerId) => {
    const config = this.convertToJSON();
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
      codeSegments: [],
      categories: [],
    };
  };

  loadConfigFromSchema = (schema) => {
    this.initiate(schema.codebook_name);
    const config = {
      codebookName: schema.codebook_name,
      headerText: schema.configuration.header_text,
      repoArray: schema.repositories,
      font: schema.configuration.font_family,
      marginSize: schema.configuration.margin,
      fontSize: schema.configuration.font_size,
      columns: schema.configuration.column_number,
      pageLimit: schema.configuration.page_number,
      orientation: schema.configuration.orientation,
    };

    this.write(config);
  };
}
