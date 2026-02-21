export const processFiles = (fileList) => {
  const filePromises = fileList.map((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        // console.log(file.name, content);

        // Format to the specific schema required
        const formattedFile = {
          title: file.name,
          code: content.split(/\r?\n/), // Split by newline to get array of strings
          category_id: null,
          type: "local",
          file_url: "local",
        };

        resolve(formattedFile);
      };
      reader.onerror = () => {
        console.error(`Error reading file: ${file.name}`);
        resolve({
          title: file.name,
          code: [],
          category_id: null,
          type: "local",
          file_url: "local",
          error: true,
        });
      };
      reader.readAsText(file);
    });
  });

  return Promise.all(filePromises);
};