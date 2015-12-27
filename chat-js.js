
var myname = localStorage.getItem(myname);
if (myname == undefined){
  var username = prompt("what is your username?");
  localStorage.setItem("myname", username);
}

window.addEventListener("load", displayMessages);
var main = document.querySelector("body");
var nomess = document.getElementById("no-messages");
if ($("#messages").has("div")){
  main.removeChild(nomess);
}

var sendButton = document.getElementById("send");
sendButton.addEventListener("click", sendMessage);

var firebase = new Firebase("https://blinding-inferno-7422.firebaseio.com");
firebase.limitToLast(200).on('child_added', function (snapshot){
  var data = snapshot.val();
  console.log(data);
  displayMessages(data);
})

function displayMessages(snapshot){
  event.preventDefault();
  var messagelist = document.getElementById("messages");
  var newMessage = document.createElement("div");
  var newTail = document.createElement("div");
  var newUser = document.createElement("div");
  newMessage.classList.add("textbubble");
  newTail.classList.add("textbubbletail");
  newUser.classList.add("userbubble");
  newMessage.textContent = snapshot.messageBody;
  newUser.textContent = snapshot.username;
  messagelist.appendChild(newMessage);
  messagelist.appendChild(newTail);
  messagelist.appendChild(newUser);
}

function sendMessage(event){
  event.preventDefault();
  var textfield = document.getElementById("message-text");
  var text = textfield.value;
  var now = new Date();
  now.getTime();

  var message = {
    messageBody: text,
    username: localStorage.getItem("myname"),
  };
  firebase.push(message);
  textfield.value = "";
  textfield.focus();
}
