import React, { useEffect } from 'react';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';
import './App.css';

const CLIENT_ID = "client_id";//replace your client id 
const API_KEY = "api_key";//replace your api key
const SCOPES = "scopes";//replace your scopes

function App() {

  useEffect(() => {
    const start = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES
        });
      });
    };

    start();
  }, []);

  const shareNotes = (subject) => {
    const emails = [
      "akhil.chib@mitaoe.ac.in",
      "vijay.palsaniya@mitaoe.ac.in",
      "vijaypalsaniyajaipur@gmail.com"
    ];

    const selectedEmail = prompt(`Select an email to share ${subject} notes: \n\n${emails.join('\n')}`);

    if (selectedEmail && emails.includes(selectedEmail)) {
      const emailContent = `Here are the ${subject} notes: [Insert Link to Google Doc]`; // Customize the email content as needed
      const mailtoLink = `mailto:${selectedEmail}?subject=${encodeURIComponent(`Sharing ${subject} Notes`)}&body=${encodeURIComponent(emailContent)}`;
      window.open(mailtoLink);
    } else {
      alert("Invalid email selected.");
    }
  }

  const createFile = async (subject) => {
    const accessToken = gapi.auth.getToken().access_token;
    const currentDateTime = getCurrentDateTime(); // Generate current date and time
    const fileName = `${subject}_Notes_${currentDateTime}.txt`; // Use current date and time for filename
    try {
      const res = await fetch('https://docs.googleapis.com/v1/documents', {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: fileName })
      });

      const data = await res.json();
      console.log(data);
      console.log(data.documentId);

      // Extract the URL of the created document from the response data
      const documentUrl = `https://docs.google.com/document/d/${data.documentId}`;

      // Open the document URL in a new tab
      window.open(documentUrl, '_blank');
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }

  // Function to generate current date and time in a suitable format
  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      <div>
        <button onClick={() => shareNotes('AI')}>Share AI Notes</button>
        <button onClick={() => createFile('AI')}>Create AI Notes</button>
      </div>
      <div>
        <button onClick={() => shareNotes('Hindi')}>Share Hindi Notes</button>
        <button onClick={() => createFile('Hindi')}>Create Hindi Notes</button>
      </div>
      <div>
        <button onClick={() => shareNotes('English')}>Share English Notes</button>
        <button onClick={() => createFile('English')}>Create English Notes</button>
      </div>
      <div>
        <button onClick={() => shareNotes('Math')}>Share Math Notes</button>
        <button onClick={() => createFile('Math')}>Create Math Notes</button>
      </div>
    </div>
  );
}

export default App;
