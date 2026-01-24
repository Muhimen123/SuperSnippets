export const processFiles = (fileList) => {
  const filePromises = fileList.map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        resolve({ name: file.name, content: content });
      };
      reader.onerror = () => {
        console.error(`Error reading file: ${file.name}`);
        resolve({ name: file.name, content: "", error: true });
      };
      reader.readAsText(file);
    });
  });

  return Promise.all(filePromises);
};