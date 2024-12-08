document.addEventListener("DOMContentLoaded", function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDk_XUtGdegXaVPVRvlreyyhU6Y9ZL4yEk",
    authDomain: "elephant-309fb.firebaseapp.com",
    databaseURL: "https://elephant-309fb-default-rtdb.firebaseio.com",
    projectId: "elephant-309fb",
    storageBucket: "elephant-309fb.firebasestorage.app",
    messagingSenderId: "287178852965",
    appId: "1:287178852965:web:fc244c1386eefeab70d48c",
  };

  firebase.initializeApp(firebaseConfig);

  let messagesRef = firebase.database().ref("responses");
  let dataDisplay = document.getElementById("data");
  let specificWord = "elephant"; // Word to search for in the keys

  messagesRef.once("value", function (snapshot) {
    if (snapshot.exists()) {
      let data = snapshot.val();
      for (let branchKey in data) {
        if (branchKey.includes(specificWord)) {
          // Display matching keys
          let responseData = data[branchKey].response;
          if (responseData) {
            dataDisplay.innerHTML += `
                        <p class="elephants">${responseData}</p>
                    `;
          }
        }
      }
    }
  });
});
