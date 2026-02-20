export class CodeSegmentsHandler {
  #storageKey = "codeSegments";

  initiate = () => {
    const codeSegments = {
        segments: [],
    };
    this.write(codeSegments);
  };
}