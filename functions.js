// const fs = require('node:fs/promises');

//////////////////////////////////////////////////////////////////////////
                          // DISPLAY INPUT //
//////////////////////////////////////////////////////////////////////////

var input = "";
var response = `I'm sorry, I have not yet been trained on this stock and am unable to provide a response.`;
var conversationFormatted = "";

var isTyping = false;
var disableDelay = false;

var ni = 0
var nr = 0

var SPEED = 50; /* The speed/duration of the effect in milliseconds */
var speed = SPEED;

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
    window.scrollTo(0,document.body.scrollHeight);
    HandleInput();
  }
}

function HandleInput() {
  window.scrollTo(0,document.body.scrollHeight);
  input = document.getElementById('text-input').value;

  if (input == "") {
    return;
  }
  else if (isTyping == true) {
    console.log("here");
    speed = 0;
    disableDelay = true;
    return;
  }
  console.log("isTyping is " + isTyping);
  document.getElementById('text-input').value = "";

  isTyping = true;
  console.log("isTyping is " + isTyping);
  speed = SPEED;
  disableDelay = false;
  setTimeout(TypeInput, speed, 0);
  conversationFormatted = setTimeout(TypeResponse, (((speed) * input.length) + 500), 0);
  

  // conversationFormatted += input + "<br><br>" + response + "<br><br>";
  console.log(input);
};


function TypeInput(i) {
  window.scrollTo(0,document.body.scrollHeight);
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
  if (disableDelay == true) {
    return 0;
  }

  let delay = (100 * Math.random())

  if (delay < 10) {
    return delay
  }
  else {
    return delay / 100
  }

}

function TypeResponse(i) {
  window.scrollTo(0,document.body.scrollHeight);
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

    isTyping = false;

    return(document.getElementById("conversation").innerHTML)
  }
};

//////////////////////////////////////////////////////////////////////////
                          // GET CSV //
//////////////////////////////////////////////////////////////////////////


// var reader = new XMLHttpRequest() || new ActiveXObject('MSXML2.XMLHTTP');

// function loadFile() {
  
//   var output = fs.readFileSync('./data/StockGPT data 6-5-2023.csv')

//   console.log(output)  
//   // reader.open('get', './data/StockGPT data 6-5-2023.csv', true); 
//   // reader.onreadystatechange = displayContents;
//   // reader.send(null);
//   console.log("read")
// }

// function displayContents() {
//     if(reader.readyState==4) {
//         var el = document.getElementById('owo');
//         el.innerHTML = reader.responseText;
//     }
// }

// loadFile()
// displayContents()

// var responseData = [];
// var headers = arr[0].split(',');
// for(var i = 1; i < arr.length; i++) {
//   var data = arr[i].split(',');
//   var obj = {};
//   for(var j = 0; j < data.length; j++) {
//      obj[headers[j].trim()] = data[j].trim();
//   }
//   responseData.push(obj);
// }
// JSON.stringify(responseData);
