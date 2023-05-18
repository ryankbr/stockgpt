var input = "";
var response = 
`Hi! We have not received the data we need to give you information about that
stock ticker yet! Please be patient as this is a work-in-progress application :)`;
var conversationFormatted = "";

var ni = 0
var nr = 0

var speed = 50; /* The speed/duration of the effect in milliseconds */


const inputFormat = inputNum =>  
  `<div class="inputDisplay">
    <img src="./assets/user_icon.png" alt="stock-gpt logo" width="30px" height="30px"
    style="transform: translate(0px, 10px); margin-right: 15px;"
    ></img>
    <p id="ni${inputNum}">
    </p>
  </div>`

const responseFormat = responseNum =>  
  `<div class="responseDisplay">  
    <img src="./assets/icon.png" alt="stock-gpt logo" width="30px" height="30px"
    style="transform: translate(0px, 10px); margin-right: 15px;"
    ></img>
    <p id="nr${responseNum}">
    </p>
  </div>`

function handleKeyPress(event) {
  if (event.keyCode === 13) { // Enter key is pressed
    HandleInput();
  }
}

function HandleInput() {
  input = document.getElementById('text-input').value;

  document.getElementById('text-input').value = "";

  setTimeout(TypeInput, speed, 0);
  conversationFormatted = setTimeout(TypeResponse, (((speed) * input.length) + 500), 0);

  // conversationFormatted += input + "<br><br>" + response + "<br><br>";
  console.log(input);
};


function TypeInput(i) {
  if (i == 0) {
    document.getElementById("conversation").innerHTML += inputFormat(ni);
  }
  if (i < input.length) { 
    alreadyWritten = document.getElementById("ni" + nr).innerHTML;
    alreadyWritten = alreadyWritten.replace('▒', '');
    document.getElementById("ni" + nr).innerHTML = alreadyWritten;

    document.getElementById("ni" + ni).innerHTML += input.charAt(i);

    document.getElementById("ni" + nr).innerHTML += '▒';

    i++;
    setTimeout(TypeInput, (speed / 2), i);
  }
  else {
    alreadyWritten = document.getElementById("ni" + nr).innerHTML;
    alreadyWritten = alreadyWritten.replace('▒', '');
    document.getElementById("ni" + nr).innerHTML = alreadyWritten;

    ni++;

    return(document.getElementById("conversation").innerHTML)
  }
};

// biased to generally be quick
function delayGenerator() {
  let delay = (100 * Math.random())

  if (delay < 10) {
    return delay
  }
  else {
    return delay / 100
  }

}

function TypeResponse(i) {
  if (i == 0) {
    document.getElementById("conversation").innerHTML += responseFormat(nr);
  }
  if (i < response.length) { 
    delay = delayGenerator()

    alreadyWritten = document.getElementById("nr" + nr).innerHTML;
    alreadyWritten = alreadyWritten.replace('▒', '');
    document.getElementById("nr" + nr).innerHTML = alreadyWritten;
    
    document.getElementById("nr" + nr).innerHTML += response.charAt(i);

    if (delay < 1) {
      document.getElementById("nr" + nr).innerHTML += '▒';
    }

    i++;
    setTimeout(TypeResponse, speed * delay, i);
  }
  else {
    alreadyWritten = document.getElementById("nr" + nr).innerHTML;
    alreadyWritten = alreadyWritten.replace('▒', '');
    document.getElementById("nr" + nr).innerHTML = alreadyWritten;

    nr++;

    return(document.getElementById("conversation").innerHTML)
  }
};

function HandleResponse() {
  // TODO: add response to conversation block
};
