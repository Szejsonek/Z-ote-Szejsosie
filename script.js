// 🔹 FIREBASE CONFIG – Twoje dane
const firebaseConfig = {
  apiKey: "AIzaSyDpqu9KUUeyMhN3OJeFIdn6EaKS8jT8PD4",
  authDomain: "zloteszejsosie.firebaseapp.com",
  projectId: "zloteszejsosie",
  storageBucket: "zloteszejsosie.firebasestorage.app",
  messagingSenderId: "166508890344",
  appId: "1:166508890344:web:08739ba541a5cd934fa15d",
  measurementId: "G-1H7QXZMBVL"
};

// Inicjalizacja Firebase (compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// APP LOGIC
let currentCategory = 0;
let selectedItem = null;
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = crypto.randomUUID();
  localStorage.setItem("userId", userId);
}

function startVoting() {
  const nick = document.getElementById("nickname").value.trim();
  if (!nick) return alert("Wpisz pseudonim!");
  localStorage.setItem("nickname", nick);

  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("voting-screen").classList.add("active");

  renderCategory();
}

function renderCategory() {
  const screen = document.getElementById("voting-screen");
  const cat = categories[currentCategory];
  
  document.getElementById("category-name").innerText = cat.name;
  document.getElementById("progress").innerText = `${currentCategory + 1} / ${categories.length}`;

  const container = document.getElementById("items");
  container.innerHTML = "";
  
  // nie resetujemy selectedItem tutaj, bo przycisk Dalej odczytuje jego wartość
  document.getElementById("next-btn").disabled = true;

  cat.items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.onclick = () => selectItem(div, item.id);

    if (cat.type === "video") {
      if (item.src.includes("outplayed.tv")) {
        div.innerHTML = `<img src="images/logo.png"><p>${item.title} (Outplayed)</p>`;
      } else {
        div.innerHTML = `<video src="${item.src}" controls></video><p>${item.title}</p>`;
      }
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

async function nextCategory() {
  if (!selectedItem) return alert("Musisz wybrać element!");

  const cat = categories[currentCategory];

  try {
    await db.collection("votes").add({
      userId,
      nickname: localStorage.getItem("nickname"),
      categoryId: cat.id,
      itemId: selectedItem,
      time: Date.now()
    });
  } catch (e) {
    console.error("Błąd zapisu do Firebase:", e);
    alert("Nie udało się zapisać głosu. Sprawdź połączenie internetowe.");
    return;
  }

  currentCategory++;

  if (currentCategory >= categories.length) {
    document.getElementById("voting-screen").classList.remove("active");
    document.getElementById("finish-screen").classList.add("active");
  } else {
    selectedItem = null; // teraz resetujemy dopiero po zapisaniu głosu
    renderCategory();
  }
}
