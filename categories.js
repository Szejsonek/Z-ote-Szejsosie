const categories = [
  { id:"glosy_niebios", name:"Głosy z Niebios", type:"video", items:[
    {id:"buszonbek", title:"Człowiekue", src:"clips/clip.mp4"},
    {id:"pomozmi", title:"Pomóż mi", src:"clips/glosy2.mp4"},
    {id:"sa2", title:"Antol Zacinak", src:"clips/glosy3.mp4"},
    {id:"sa2", title:"działający mikrofon", src:"clips/glosy4.mp4"}
  ]},
  { id:"playsofyear", name:"Plays Roku", type:"video", items:[
    {id:"agenci", title:"Angent ant i szej", src:"clips/plays.mp4"},
    {id:"ultyrolka", title:"Możesz użyć ulta", src:"clips/plays2.mp4"},
    {id:"majuranegv", title:"Majura Prime", src:"clips/plays3.mp4"},
    {id:"decoy", title:"decoy", src:"clips/plays4.mp4"},
    {id:"rolekbum", title:"Kaput Rolek buszon flash", src:"clips/plays5.mp4"},
    {id:"pomocy", title:"Pomocyyyy", src:"clips/plays6.mp4"}
  ]},
  { id:"krzyk", name:"Krzyk Roku", type:"video", items:[
    {id:"dobrabuszon", title:"dobra buszon", src:"clips/krzyk.mp4"},
    {id:"julkawrona", title:"Julka Wrona", src:"clips/krzyk2.mp4"},
    {id:"julkaaaaaaaaaaaa", title:"julkaaaaaaaaaaaa", src:"clips/krzyk3.mp4"},
    {id:"majaskinwalker", title:"maja i skinwalker", src:"clips/krzyk4.mp4"},
    {id:"majagenshin", title:"Maja i Przygoty Genshińskie", src:"clips/krzyk5.mp4"}
  ]},
    { id:"300iq", name:"Szejson Activity", type:"video", items:[
    {id:"dobrabuszon", title:"dobra buszon", src:"clips/szej.mp4"},
    {id:"julkawrona", title:"Julka Wrona", src:"clips/szej2.mp4"},
    {id:"julkaaaaaaaaaaaa", title:"julkaaaaaaaaaaaa", src:"clips/szej3.mp4"},
    {id:"majaskinwalker", title:"maja i skinwalker", src:"clips/szej4.mp4"},
    {id:"majagenshin", title:"Maja i Przygoty Genshińskie", src:"clips/szej5.mp4"}
  ]},
  ...Array.from({length:27}).map((_,i)=>({
    id:`category_${i+4}`,
    name:`Kategoria ${i+4}`,
    type:i%2===0?"video":"image",
    items:[
      {id:`item_${i}_1`, title:"Placeholder 1", src:i%2===0?"clips/clip1.mp4":"images/logo.png"},
      {id:`item_${i}_2`, title:"Placeholder 2", src:i%2===0?"clips/clip1.mp4":"images/logo.png"}
    ]
  }))
];
