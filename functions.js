var input = "";
var response = "this is a temporary response";
var conversationFormatted = "";

var ni = "ni"
var nr = "nr"

var speed = 50; /* The speed/duration of the effect in milliseconds */

function HandleInput() {
  input = document.getElementById('text-input').value;

  document.getElementById('text-input').value = "";

  setTimeout(TypeInput, speed, 0);
  setTimeout(TypeResponse, (((speed) * input.length) + 500), 0);

  conversationFormatted += input + "<br><br>" + response + "<br><br>";
  console.log(input);
};

function TypeInput(i) {
  if (i < input.length) { 
    document.getElementById("conversation").innerHTML += input.charAt(i);
    i++;
    setTimeout(TypeInput, (speed / 2), i);
  }
  else {
    document.getElementById("conversation").innerHTML += "<br><br>";
  }
};

function addInpAndRespToConvo() {
  conversationFormatted += input + "<br><br>" + response + "<br><br>";
};

function TypeResponse(i) {
  if (i < response.length) { 
    document.getElementById("conversation").innerHTML += response.charAt(i);
    i++;
    setTimeout(TypeResponse, speed, i);
  }
  else {
    document.getElementById("conversation").innerHTML += "<br><br>";
  }
};





function HandleResponse() {
  // TODO: add response to conversation block
};
