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
    console.log(`\n✅ Success! Found ${data.length} files.`);
    
    if (data.length > 0) {
      console.log("\n--- Preview of first file ---");
      console.log(`File: ${data[0].name}`);
      console.log(`Content (first 100 chars):\n${data[0].content.substring(0, 100)}...`);
    }

  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
};

testFetch();
