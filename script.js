let currentCategory = 0;
let selectedItem = null;

let userId = localStorage.getItem("userId");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("userId", userId);
}

function startVoting() {
  const nick = document.getElementById("nickname").value.trim();

  if (!nick) {
    alert("Wpisz pseudonim!");
    return;
  }

  localStorage.setItem("nickname", nick);

  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("voting-screen").classList.add("active");

  renderCategory();
}

function renderCategory() {
  const cat = categories[currentCategory];

  document.getElementById("category-name").innerText = cat.name;
  document.getElementById("progress").innerText =
    `${currentCategory + 1} / ${categories.length}`;

  const container = document.getElementById("items");
  container.innerHTML = "";

  document.getElementById("next-btn").disabled = true;

  cat.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.onclick = () => selectItem(div, item.id);

    if (cat.type === "video") {

      if (item.src.includes("outplayed.tv")) {
        div.innerHTML = `
          <img src="images/logo.png">
          <p>${item.title} (Outplayed)</p>
        `;
      } else {
        div.innerHTML = `
          <video src="${item.src}" controls></video>
          <p>${item.title}</p>
        `;
      }

    } else {

      div.innerHTML = `
        <img src="${item.src}">
        <p>${item.title}</p>
      `;
    }

    container.appendChild(div);
  });
}

function selectItem(div, id) {
  document.querySelectorAll(".item").forEach(i => {
    i.classList.remove("selected");
  });

  div.classList.add("selected");

  selectedItem = id;

  document.getElementById("next-btn").disabled = false;
}

function nextCategory() {

  if (!selectedItem) {
    alert("Musisz wybrać element!");
    return;
  }

  currentCategory++;

  if (currentCategory >= categories.length) {

    document.getElementById("voting-screen").classList.remove("active");

    document.getElementById("finish-screen").classList.add("active");

  } else {

    selectedItem = null;

    renderCategory();
  }
}
