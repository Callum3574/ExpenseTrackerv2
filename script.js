// adding info to table
const btnAdd = document
  .querySelector(".button-55")
  .addEventListener("click", send);

function send(e) {
  e.preventDefault();
  const location = document.querySelector("#locationInput").value;
  const amount = document.querySelector("#amountInput").value;
  const date = document.querySelector("#dateInput").value;
  const template = `<tr class="newTR">
      <td>${location}</td>
      <td>${amount}</td>
      <td>${date}</td>
      <td>
                <button class="button-55" role="button">X</button>
        
              </td>
    </tr>`;

  document.querySelector("#tb").innerHTML += template;
}

// removing info to table
const inputs = document.querySelector(".GeneratedTable");
inputs.addEventListener("click", removeItem);

function removeItem(e) {
  if (e.target.classList.contains("button-55")) {
    const tr = e.target.parentElement.parentElement.rowIndex;
    inputs.deleteRow(tr);
  }
}

// changing theme

const dropDown = document.querySelector("#dropdown");
dropDown.addEventListener("change", selectColor);

function selectColor(e) {
  const choice = dropDown.value;
  switch (choice) {
    case "black":
      changeColor("black", "white");
      break;
    case "red":
      changeColor("red", "white");
      break;
    case "green":
      changeColor("green", "white");
      break;
    case "blue":
      changeColor("blue", "white");
      break;
    case "white":
      changeColor("white", "black");
      break;
    default:
      changeColor("white", "black", "black");
  }
}
function changeColor(color, text, form) {
  document.querySelector("body").style.backgroundColor = color;
  document.querySelector(".mainTitle").style.color = text;
  document.querySelector(".labelcolor").style.color = text;
  document.querySelector(".tableHead").style.color = form;
}
