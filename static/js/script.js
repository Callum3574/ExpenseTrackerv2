// when page is loaded, get request to endpoint that returns data
window.onload = async function load() {
  const res = await fetch("http://127.0.0.1:5000/tracker", {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();
  for (let i = 0; i < json.length; i++) {
    const templateV2 = `<tr class="newTR">
      <td>${json[i][1]}</td>
      <td>${json[i][2]}</td>
      <td>${json[i][3]}</td>
      <td>
                <button class="button-55" role="button">X</button>

              </td>
    </tr>`;
    document.querySelector("#tb").innerHTML += templateV2;
  }
};

// adding info to table
const btnAdd = document
  .querySelector(".button-55")
  .addEventListener("click", send);

function send(e) {
  e.preventDefault();
  const location = document.querySelector("#locationInput").value;
  const amount = document.querySelector("#amountInput").value;
  const date = document.querySelector("#dateInput").value;

  if (location.length === 0 || amount.length === 0 || date.length === 0) {
    alert("Please input location, amount and date!");
  } else {
    const template = `<tr class="newTR">
      <td>${location}</td>
      <td>${amount}</td>
      <td>${date}</td>
      <td>
                <button class="button-55" role="button">X</button>

              </td>
    </tr>`;
    console.log(template);
    document.querySelector("#tb").innerHTML += template;

    fetch("/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ location, amount, date }),
      credentials: "include",
    });
  }
}

// removing info to table

const inputs = document.querySelector(".GeneratedTable");
inputs.addEventListener("click", removeItem);

async function removeItem(e) {
  e.preventDefault();
  parseInt(e.target);
  if (e.target.classList.contains("button-55")) {
    const tr = e.target.parentElement.parentElement.rowIndex;
    inputs.deleteRow(tr);
  }

  res = await fetch(`http://127.0.0.1:5000/tracker`, {
    methods: "GET",
    credentials: "include",
  });

  const json = await res.json();
  console.log(json[0][0]);

  fetch(`/delete/${json[0][0]}`, {
    methods: "DELETE",
  });
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

console.log(document);
