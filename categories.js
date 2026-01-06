const categories = [
  { id:"szejson_activity", name:"Szejson Activity", type:"video", items:[
    {id:"sa1", title:"Szejson moment 1", src:"clips/clip1.mp4"},
    {id:"sa2", title:"Szejson moment 2", src:"clips/clip.mp4"}
  ]},
  { id:"best_scream", name:"Najlepszy Krzyk", type:"video", items:[
    {id:"krzyk1", title:"Krzyk level 100", src:"clips/clip.mp4"},
    {id:"krzyk2", title:"Krzyk ultimate", src:"clips/clip.mp4"}
  ]},
  { id:"rage", name:"Rage", type:"video", items:[
    {id:"rage1", title:"Rage quit", src:"clips/clip.mp4"},
    {id:"rage2", title:"Total rage", src:"clips/clip.mp4"}
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
