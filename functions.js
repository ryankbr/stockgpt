var input = "";
var response = "this is a temporary response";
var conversation = "";

var i = 0;
var speed = 50; /* The speed/duration of the effect in milliseconds */

function HandleInput() {
  input = document.getElementById('text-input').value;
  document.getElementById('text-input').value = "";
  document.getElementById('conversation').innerHTML = "<br>" + input + "<br>";
  conversation += input + "\n";
  TypeResponse();
  i = 0;
  console.log(input);
};


function TypeResponse() {
  if (i < response.length) { 
    document.getElementById("conversation").innerHTML += response.charAt(i);
    i++;
    setTimeout(TypeResponse, speed);
  }
  conversation += response + "\n";
}

function HandleResponse() {
  // TODO: add response to conversation block
}
