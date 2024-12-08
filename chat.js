// Initialize Firebase
const firebase = require("firebase/app");
require("firebase/database");

// Your Firebase configuration
const firebaseConfig = {
  // ... your firebase config
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the Realtime Database
const database = firebase.database();
const responsesRef = database.ref("responses");

// Sample chatbot responses (stored in Realtime Database)
// You'll need to create these in your Firebase Console
// Example:
// {
//   "responses": {
//     "hello": "Hi there! How can I help you?",
//     "goodbye": "See you later!",
//     "default": "I'm not sure I understand. Can you rephrase?"
//   }
// }

// Function to handle user input
function handleUserInput(userInput) {
  // Read responses from the database
  responsesRef.once("value", (snapshot) => {
    const responses = snapshot.val();

    // Find a matching response
    let response = responses[userInput.toLowerCase()] || responses.default;

    // Display the response
    displayChatbotResponse(response);
  });
}

function handleUserInput() {
  const userInput = document.getElementById("userInput").value;
  document.getElementById("userInput").value = ""; // Clear input field

  responsesRef.once("value", (snapshot) => {
    const responses = snapshot.val();
    let response = responses[userInput.toLowerCase()] || responses.default;
    document.getElementById("chatOutput").innerHTML +=
      "<p><strong>You:</strong> " + userInput + "</p>";
    document.getElementById("chatOutput").innerHTML +=
      "<p><strong>Chatbot:</strong> " + response + "</p>";
  });
}

// Function to display chatbot responses
function displayChatbotResponse(response) {
  // ... (Add your logic to display the response in your UI)
}

// Example usage:
handleUserInput("hello");
