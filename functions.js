var input;

function HandleInput() {
  input = document.getElementById('text-input').value;
  document.getElementById('text-input').value = "";
  console.log(input);
};