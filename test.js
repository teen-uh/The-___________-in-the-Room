// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDk_XUtGdegXaVPVRvlreyyhU6Y9ZL4yEk",
  authDomain: "elephant-309fb.firebaseapp.com",
  databaseURL: "https://elephant-309fb-default-rtdb.firebaseio.com",
  projectId: "elephant-309fb",
  storageBucket: "elephant-309fb.firebasestorage.app",
  messagingSenderId: "287178852965",
  appId: "1:287178852965:web:fc244c1386eefeab70d48c",
};
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Get DOM elements
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to display messages
function displayMessage(message, isUser) {
  console.log("BRUH");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  if (isUser) {
    messageElement.classList.add("user-message");
  } else {
    messageElement.classList.add("bot-message");
  }
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
}

// Send message function
sendButton.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage !== "") {
    displayMessage(userMessage, true);
    userInput.value = "";

    // Get response from Firebase
    database
      .ref("chatbot/responses/" + userMessage.toLowerCase())
      .once("value", (snapshot) => {
        const response = snapshot.val();
        if (response) {
          displayMessage(response, false);
        } else {
          displayMessage(
            "I'm not sure I understand. Try rephrasing your question.",
            false
          );
        }
      });
  }
});
