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
  let botRef = firebase.database().ref("bot");
  let counter = 0;
  let dataDisplay = document.getElementById("bg-text");
  let nodeName;
  dataDisplay.innerHTML = "";

  function generateCustomKey() {
    let timestamp = Date.now();
    let randomPart = Math.floor(Math.random() * 1000000);
    return `elephant_${timestamp}_${randomPart}`;
  }
  let elephantKey = generateCustomKey();
  let elephant = false;
  window.addEventListener("load", checkOnlineStatus);

  window.addEventListener("online", checkOnlineStatus);
  window.addEventListener("offline", checkOnlineStatus);
  document.getElementById("chatBox").addEventListener("submit", submitForm);

  setTimeout(function () {
    showByKey("intro-1");
  }, 2000);
  setTimeout(function () {
    showByKey("intro-2");
  }, 3500);
  showElephant();

  function submitForm(e) {
    e.preventDefault();

    // Get values
    let response = getInputVal("userResponse");

    counter += 1;
    if (counter <= 3) {
      nodeName = `usermsg-${counter}`;
    } else if (counter == 4 && response == "no") {
      nodeName = `no-${counter}`;
    } else if ((counter == 4 && response == "yes") || counter < 7) {
      nodeName = `yes-${counter}`;
    } else if (counter == 7 && response == "elephant") {
      nodeName = `prompt-${counter}`;
    } else if (counter == 8) {
      nodeName = elephantKey;
      elephant = true;
    } else if (counter == 9) {
      nodeName = `callback-${counter}`;
    } else if (counter == 10 && response == "i don't") {
      nodeName = `idont-${counter}`;
    } else if (counter == 10 && response == "i do") {
      nodeName = `ido-${counter}`;
    } else {
      nodeName = `null-${counter}`;
      counter -= 1;
    }

    saveMessage(nodeName, response);

    document.getElementById("chatBox").reset();
  }

  function generateCustomKey() {
    let timestamp = Date.now();
    let randomPart = Math.floor(Math.random() * 1000000);
    return `elephant_${timestamp}_${randomPart}`;
  }

  // Function to get form values
  function getInputVal(id) {
    return document.getElementById(id).value;
  }

  function saveMessage(nodeName, response) {
    let newMessageRef = messagesRef.child(nodeName);

    newMessageRef.set({
      response: response,
    });
    displayData();
    displayBackgroundText();
  }

  function displayData() {
    let dataDisplay = document.getElementById("chat");
    let form = document.getElementById("userResponse");

    form.innerHTML = "";
    form.placeholder = "";

    messagesRef.child(nodeName).once("value", function (snapshot) {
      if (snapshot.exists()) {
        let userData = snapshot.val();
        dataDisplay.innerHTML =
          `<div class="msg user">${userData.response || botData}</div>` +
          dataDisplay.innerHTML;
      }
    });

    setTimeout(function () {
      // Fetch and display corresponding data from the second database
      botRef.child(nodeName).once("value", function (botSnapshot) {
        if (botSnapshot.exists()) {
          let botData = botSnapshot.val();
          dataDisplay.innerHTML =
            `<p class="msg bot">${botData.response || botData}</p>` +
            dataDisplay.innerHTML;

          if (nodeName == "usermsg-3") {
            form.placeholder = "yes or no";
          } else if (nodeName == "callback-9") {
            form.placeholder = "i do or i don't";
          }

          if (nodeName == "no-4") {
            setTimeout(function () {
              window.location.replace("seeya.html");
            }, 1000);
          }
          if (nodeName == "prompt-7") {
            setTimeout(function () {
              showByKey("prompt-8");
            }, 1500);
            setTimeout(function () {
              showByKey("prompt-9");
            }, 3600);
            setTimeout(function () {
              showByKey("prompt-10");
            }, 5200);
            setTimeout(function () {
              showByKey("prompt-11");
            }, 7100);
            setTimeout(function () {
              showByKey("prompt-12");
            }, 9000);
            setTimeout(function () {
              showByKey("prompt-13");
              form.placeholder = "what's your elephant in the room?";
            }, 11000);
          }

          if (nodeName == "idont-10") {
            setTimeout(function () {
              showByKey("idont-11");
            }, 2000);
            setTimeout(function () {
              showByKey("idont-12");
            }, 3600);
            setTimeout(function () {
              window.location.replace("seeya.html");
            }, 5700);
          }

          if (nodeName == "ido-10") {
            setTimeout(function () {
              showByKey("ido-11");
            }, 2000);
            setTimeout(function () {
              window.location.replace("elephant.html");
            }, 4500);
          }
        } else {
          if (elephant == true) {
            setTimeout(function () {
              showByKey("callback-8");
            }, 4000);
            elephant = false;
          } else {
            dataDisplay.innerHTML =
              `<p class="msg bot">no response</p>` + dataDisplay.innerHTML;
          }
        }
      });
    }, 1000); // Delay of 1 second (1000 milliseconds)
  }

  function displayBackgroundText() {
    let dataDisplay = document.getElementById("bg-text");

    messagesRef.child(nodeName).once("value", function (snapshot) {
      if (snapshot.exists()) {
        let userData = snapshot.val();
        dataDisplay.innerHTML += `<span>${
          userData.response || botData
        } </span>`;
      }
    });
  }

  function showByKey(key) {
    let dataDisplay = document.getElementById("chat");

    botRef
      .child(key)
      .once("value") // Fetch data once
      .then((snapshot) => {
        if (snapshot.exists()) {
          let botData = snapshot.val();
          dataDisplay.innerHTML =
            `<p class="msg bot">${botData.response || botData}</p>` +
            dataDisplay.innerHTML;
        } else {
          console.log("No data found for this key");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function checkOnlineStatus() {
    if (navigator.onLine) {
      document.getElementById("offline-world").style.display = "none";
      document.getElementById("gone").style.display = "block";
      document.getElementById("online-world").style.display = "flex";
    } else {
      document.getElementById("offline-world").style.display = "flex";
      document.getElementById("online-world").style.display = "none";
      document.getElementById("gone").style.display = "none";
    }
  }
});
