// Remove import since fetch is global in Node v22
// import fetch from 'node-fetch'; 

const testFetch = async () => {
  const url = "https://github.com/ShahjalalShohag/code-library";
  const apiUrl = "http://localhost:8000/api/github/fetch";

  console.log(`Fetching from: ${apiUrl}`);
  console.log(`Target Repo: ${url}`);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    const data = await response.json();
    console.log(`\n Success! Found ${data.length} files.`);
    
    if (data.length > 0) {
      console.log("\n--- File List ---");
      // Display all file names
      data.forEach((file, index) => {
        console.log(`${index + 1}. ${file.name}`);
      });
      console.log("----------------------------\n");
    }

  } catch (error) {
    console.error("\n Error:", error.message);
  }
};

testFetch();
