import fs from 'node:fs';
import path from 'node:path';

const testUploadFile = async () => {
  const endpoint = "http://localhost:8000/api/files/upload";
  
  //upload a specific file from the user's PC
  const filePath = String.raw`C:\Users\user\Downloads\Computer-Netowrk-main\hey.txt`;
  const fileName = path.basename(filePath); 

  console.log(`1. Reading file from disk: ${filePath}`);

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read the file into a buffer
    const buffer = fs.readFileSync(filePath);
    
    // Create a Blob from the buffer (simulating a file object)
    const fileBlob = new Blob([buffer], { type: 'application/json' });
    
    // Prepare FormData
    const formData = new FormData();
    // 'files' must match the backend route configuration: upload.array("files")
    formData.append("files", fileBlob, fileName);

    console.log(`2. Uploading to: ${endpoint}`);

    // Send the request
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    console.log("\n3. Success! Backend received and parsed the file:");
    console.log("---------------------------------------------------");
    // Show only the beginning of content
    data.forEach(file => {
        console.log(`File Name: ${file.name}`);
        console.log(`Content Preview: ${file.content.substring(0, 100)}...`);
    });

  } catch (error) {
    console.error("\nTest Failed:", error.message);
  }
};

testUploadFile();