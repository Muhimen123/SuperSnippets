export class FileHandler {
  #storageKey = "codebook_files";

  saveFiles(files) {
    const data = { files: files };
    this.write(data);
  }

  getFiles() {
    const data = this.convertToJSON();
    return data && data.files ? data.files : [];
  }
  
  write(data) {
    localStorage.setItem(this.#storageKey, this.convertToJSONString(data));
  }
  
  convertToJSONString(data) {
    return JSON.stringify(data);
  }

  convertToJSON() {
    const dataString = localStorage.getItem(this.#storageKey);
    try {
      const data = JSON.parse(dataString);
      return data;
    } catch (e) {
      return { files: [] };
    }
  }

  clearAll() {
    localStorage.removeItem(this.#storageKey);
  }
}
