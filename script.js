// 🔹 FIREBASE CONFIG – wklej swoje wartości z Web App
const firebaseConfig = {
  apiKey: "TU_WKLEISZ",
  authDomain: "TU_WKLEISZ",
  projectId: "TU_WKLEISZ",
  storageBucket: "TU_WKLEISZ",
  messagingSenderId: "TU_WKLEISZ",
  appId: "TU_WKLEISZ",
  measurementId: "TU_WKLEISZ"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// APP LOGIC
let currentCategory = 0;
let selectedItem = null;
let userId = localStorage.getItem("userId");
if(!userId){ userId=crypto.randomUUID(); localStorage.setItem("userId",userId); }

function startVoting(){
  const nick=document.getElementById("nickname").value.trim();
  if(!nick) return alert("Wpisz pseudonim!");
  localStorage.setItem("nickname",nick);
  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("voting-screen").classList.add("active");
  renderCategory();
}

function renderCategory(){
  const screen=document.getElementById("voting-screen");
  screen.classList.remove("fade-in"); screen.classList.add("fade-out");

  setTimeout(()=>{
    const cat=categories[currentCategory];
    document.getElementById("category-name").innerText=cat.name;
    document.getElementById("progress").innerText=`${currentCategory+1} / ${categories.length}`;

    const container=document.getElementById("items");
    container.innerHTML="";
    selectedItem=null;
    document.getElementById("next-btn").disabled=true;

    cat.items.forEach(item=>{
      const div=document.createElement("div");
      div.className="item";
      div.onclick=()=>selectItem(div,item.id);

      if(cat.type==="video"){
        if(item.src.includes("outplayed.tv")){
          div.innerHTML=`<img src="images/logo.png"><p>${item.title} (Outplayed)</p>`;
        }else{
          div.innerHTML=`<video src="${item.src}" controls></video><p>${item.title}</p>`;
        }
      }else{
        div.innerHTML=`<img src="${item.src}"><p>${item.title}</p>`;
      }
      container.appendChild(div);
    });

    screen.classList.remove("fade-out");
    screen.classList.add("fade-in");
  },300);
}

function selectItem(div,id){
  document.querySelectorAll(".item").forEach(i=>i.classList.remove("selected"));
  div.classList.add("selected");
  selectedItem=id;
  document.getElementById("next-btn").disabled=false;
}

async function nextCategory(){
  const cat=categories[currentCategory];
  if(!selectedItem) return;

  await db.collection("votes").add({
    userId,
    nickname: localStorage.getItem("nickname"),
    categoryId: cat.id,
    itemId: selectedItem,
    time: Date.now()
  });

  currentCategory++;
  if(currentCategory>=categories.length){
    document.getElementById("voting-screen").classList.remove("active");
    document.getElementById("finish-screen").classList.add("active");
  }else{
    renderCategory();
  }
}
