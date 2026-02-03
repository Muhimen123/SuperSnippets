export class ConfigHandler {
  #storageKey = "configuration";

  initiate(codebookName) {
    const config = {
      codebookName: codebookName,
      repoArray: [],
      font: "Jetbrains Mono",
      marginSize: 1,
      fontSize: 11,
      columns: 1,
      pageLimit: 20,
    };

    this.write(config);
  }

  write(config) {
    localStorage.setItem(this.#storageKey, this.convertToJSONString(config));
  }

  addRepo(repoList) {
    let config = this.convertToJSON();
    config["repoArray"] = [...config["repoArray"], ...repoList];
    this.write(config);
  }

  setFont(fontName) {
    let config = this.convertToJSON();
    config["font"] = fontName;
    this.write(config);
  }

  setMargin = (marginSize) => {
    let config = this.convertToJSON();
    config["marginSize"] = marginSize;
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
    config["columns"] = columns;
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

  clearAll() {
    localStorage.clear();
  }

  convertToJSONString(config) {
    return JSON.stringify(config);
  }

  convertToJSON() {
    const configString = localStorage.getItem(this.#storageKey);
    const config = JSON.parse(configString);
    return config;
  }
}
