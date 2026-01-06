let currentCategory = 0;
let selectedItem = null;
let votes = {};

function startVoting() {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) return alert("Wpisz pseudonim!");

  localStorage.setItem("nickname", nick);

  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("voting-screen").classList.add("active");

  renderCategory();
}

function renderCategory() {
  const category = categories[currentCategory];
  document.getElementById("category-name").innerText = category.name;
  document.getElementById("progress").innerText =
    `${currentCategory + 1} / ${categories.length}`;

  const container = document.getElementById("items");
  container.innerHTML = "";
  selectedItem = null;
  document.getElementById("next-btn").disabled = true;

  category.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.onclick = () => selectItem(div, item.id);

    if (category.type === "video") {
      div.innerHTML = `<video src="${item.src}" controls></video><p>${item.title}</p>`;
    } else {
      div.innerHTML = `<img src="${item.src}"><p>${item.title}</p>`;
    }

    container.appendChild(div);
  });
}

function selectItem(div, id) {
  document.querySelectorAll(".item").forEach(i => i.classList.remove("selected"));
  div.classList.add("selected");
  selectedItem = id;
  document.getElementById("next-btn").disabled = false;
}

function nextCategory() {
  const category = categories[currentCategory];
  votes[category.id] = selectedItem;

  currentCategory++;

  if (currentCategory >= categories.length) {
    finishVoting();
  } else {
    renderCategory();
  }
}

function finishVoting() {
  document.getElementById("voting-screen").classList.remove("active");
  document.getElementById("finish-screen").classList.add("active");

  console.log("GŁOSY:", votes);
}

