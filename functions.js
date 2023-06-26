//////////////////////////////////////////////////////////////////////////
                          // GET CSV //
//////////////////////////////////////////////////////////////////////////

var responseData = new Object();

function reqListener() {

  const header = "Symbol,Response \n";
  var data_csv = this.responseText;

  data_csv = data_csv.substring(header.length)
  var lines = data_csv.split(`\r\n`);
  var stock = "";
  var stock_response = "";

  for (let i = 0; i < lines.length - 1; i++) {

    stock_pair_raw = lines[i].replace(/"/g, "");

    stock = stock_pair_raw.substring(0, stock_pair_raw.search(","))
    
    stock_response = stock_pair_raw.substring(stock_pair_raw.search(",") + 1)

    responseData[stock] = stock_response

    console.log(stock_response)

  }
}


const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://ryankbr.github.io/stockgpt/data/response6-5-2023.csv");
req.send();


window.onload = function () {
  checkSession();
  
};

//////////////////////////////////////////////////////////////////////////
                          // DISPLAY INPUT //
//////////////////////////////////////////////////////////////////////////

var input = "";
var response = `I'm sorry, I have not yet been trained on this stock and am unable to provide a response.`;
const DEFAULT_RESPONSE = `I'm sorry, I have not yet been trained on this stock and am unable to provide a response.`;
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
  response = parseInputSetResponse(input);
  document.getElementById('text-input').value = "";

  isTyping = true;
  console.log("isTyping is " + isTyping);
  speed = SPEED;
  disableDelay = false;
  setTimeout(TypeInput, speed, 0);
  conversationFormatted = setTimeout(TypeResponse, (((speed) * input.length) + 500), 0);
  

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

function parseInputSetResponse(input) {
  var input_tokens = input.split(' ');
  
  for (let i = 0; i < input_tokens.length; ++i) {
    let input_token = input_tokens[i];
    input_token = input_token.toUpperCase();
    console.log(input_token)
  
    if (responseData.hasOwnProperty(input_token)) {
      return responseData[input_token];
    }
  }
  return DEFAULT_RESPONSE;
}

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
    
    var charToPlace = (response.charAt(i) == "\r") ? "<br>" : response.charAt(i);
    document.getElementById("nr" + nr).innerHTML += charToPlace;

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
                          // INTRO ANIMATION //
//////////////////////////////////////////////////////////////////////////


function setCookie(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());document.cookie=c_name + "=" + c_value;}

function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1){c_start = c_value.indexOf(c_name + "=");}if (c_start == -1){c_value = null;}else{c_start = c_value.indexOf("=", c_start) + 1;var c_end = c_value.indexOf(";", c_start);if (c_end == -1){c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}


function checkSession(){
  
  var c = getCookie("visited");
  if (c === "yes") {
    // recurring visitor
    console.log("old visitor")
    if (document.getElementById('logo-page')) {
      logo_page = document.getElementById('logo-page');
      // logo_page.setAttribute("style", "display: none;");
      
    } 
  } else {
    // new visitor -- logo animation
    console.log("new visitor")
    if (document.getElementById('logo-page')) {
      logo_page = document.getElementById('logo-page')
      logo_page.classList.remove('disabled')
      startPage();
      
    } 
    // startPage();
  }

  setCookie("visited", "yes", 365); // expire in 1 year; or use null to never expire
  
}

function startPage () {
  if (document.getElementById('logo-page')) {
    logo_page = document.getElementById('logo-page');
    logo_page.classList.add('inactive');
  }
}

//////////////////////////////////////////////////////////////////////////
                          // MOBILE MENU //
//////////////////////////////////////////////////////////////////////////

function toggleMobileMenu () {
  if (document.getElementById('mobileMenuButton') && document.getElementById('mobile-menu')) {
    mobile_menu_button = document.getElementById('mobileMenuButton');
    mobile_menu = document.getElementById('mobile-menu');

    mobile_menu_button.classList.toggle('active');
    mobile_menu.classList.toggle('active');
  }
}



