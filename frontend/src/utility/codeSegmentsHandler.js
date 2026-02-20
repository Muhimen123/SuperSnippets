export class CodeSegmentsHandler {
  #storageKey = "codeSegments";

  initiate = () => {
    const codeSegments = {
        segments: [],
    };
    this.write(codeSegments);
  };

  addSegment = (segment) => {
    let codeSegments = this.convertToJSON();
    codeSegments["segments"] = [...codeSegments["segments"], segment];
    this.write(codeSegments);
  };
  addSegments = (segmentList) => {
    let codeSegments = this.convertToJSON();
    codeSegments["segments"] = [...codeSegments["segments"], ...segmentList];
    this.write(codeSegments);
  };

  getSegments = () => {
    let codeSegments = this.convertToJSON();
    return codeSegments.segments;
  };

  write = (codeSegments) => {
    localStorage.setItem(this.#storageKey, this.convertToJSONString(codeSegments));
  }

  convertToJSON() {
    const jsonString = localStorage.getItem(this.#storageKey);
    return jsonString ? JSON.parse(jsonString) : null;
  }

  convertToJSONString(codeSegments) {
    return JSON.stringify(codeSegments);
  }

  clearAll() {
    localStorage.removeItem(this.#storageKey);
  }
}