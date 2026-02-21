export class CodeSegmentsHandler {
  #storageKey = "codeSegments";

  initiate = () => {
    this.clearAll();
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

  getSegmentByIndex = (index) => {
    let codeSegments = this.convertToJSON();
    return codeSegments.segments[index];
  };

  write = (codeSegments) => {
    localStorage.setItem(this.#storageKey, this.convertToJSONString(codeSegments));
  }

  convertToJSON() {
    const jsonString = localStorage.getItem(this.#storageKey);
    return jsonString ? JSON.parse(jsonString) : {segments: []};
  }

  convertToJSONString(codeSegments) {
    return JSON.stringify(codeSegments);
  }

  updateSegmentContent = (segmentIndex, newCodeString) => {
    let codeSegments = this.convertToJSON();

    if (codeSegments.segments[segmentIndex]) {
      const contentArray = newCodeString.split("\n");

      codeSegments.segments[segmentIndex].code = contentArray;

      this.write(codeSegments);
    } else {
      console.error(`Segment at index ${segmentIndex} not found.`);
    }
  };

  clearAll() {
    localStorage.removeItem(this.#storageKey);
  }
}