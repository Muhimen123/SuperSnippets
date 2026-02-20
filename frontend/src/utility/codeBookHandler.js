export class CodeBookHandler {
  #storageKey = "codebook";

  initiate = () => {
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

	clearAll() {
		localStorage.removeItem(this.#storageKey);
	}
};