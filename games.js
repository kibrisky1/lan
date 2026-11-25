const el=(t,a={},...c)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a)){if(k==="onclick")e.onclick=v;else if(k==="class")e.className=v;else e[k]=v;}c.flat().forEach(x=>e.append(x));return e;};
const clear=n=>{while(n.firstChild)n.remove(n.firstChild);};

export const renderers={
"reaction-test":(c,s,me,send)=>{
  clear(c);
  const btn=el("button",{className:"btn big-btn",onclick:()=>send({type:"click"})},s.phase==="waiting"?"Wait...":s.phase==="signal"?"CLICK!":"Done");
  if(s.phase==="waiting")btn.disabled=true;
  c.append(el("div",{className:"card"},el("h3",{},"Reaction Test"),btn));
},
"color-rush":(c,s,me,send)=>{
  clear(c);
  if(s.phase==="show")c.append(el("div",{className:"card"},el("h3",{},"Color Rush"),el("p",{},"Get ready...")));
  else{const g=el("div",{className:"grid cols2"});["red","blue","green","yellow"].forEach(col=>g.append(el("button",{className:"btn",style:`background:${col}`,onclick:()=>send({type:"answer",color:col})},col)));c.append(el("div",{className:"card"},el("h3",{},"Color Rush"),g));}
},
"number-flash":(c,s,me,send)=>{
  clear(c);
  if(s.phase==="show")c.append(el("div",{className:"card"},el("h3",{},"Number Flash"),el("h1",{style:"font-size:48px"},s.number)));
  else{const i=el("input",{placeholder:"Enter the number"});const b=el("button",{className:"btn",onclick:()=>send({type:"answer",value:i.value})},"Submit");c.append(el("div",{className:"card"},el("h3",{},"Number Flash"),i,b));}
},
"fast-fingers":(c,s,me,send)=>{
  clear(c);
  const i=el("input",{placeholder:"Type the sequence"});
  i.oninput=()=>send({type:"type",text:i.value});
  c.append(el("div",{className:"card"},el("h3",{},"Fast Fingers"),el("p",{},"Target: "+s.seq),i));
},
"quick-draw":(c,s,me,send)=>{
  clear(c);
  const btn=el("button",{className:"btn big-btn",onclick:()=>send({type:"click"})},s.phase==="waiting"?"Wait...":s.phase==="signal"?"DRAW!":"Done");
  if(s.phase==="waiting")btn.disabled=true;
  c.append(el("div",{className:"card"},el("h3",{},"Quick Draw"),btn));
},
"tic-tac-toe":(c,s,me,send)=>{
  clear(c);
  const b=el("div",{className:"board",style:"grid-template-columns:repeat(3,1fr)"});
  s.board.forEach((v,i)=>b.append(el("div",{className:"cell "+(v||"").toLowerCase(),onclick:()=>send({type:"move",cell:i})},v||"")));
  c.append(el("div",{className:"card"},el("h3",{},"Tic-Tac-Toe"),b));
},
"connect-four":(c,s,me,send)=>{
  clear(c);
  const b=el("div",{className:"board",style:"grid-template-columns:repeat(7,1fr)"});
  for(let r=0;r<6;r++)for(let col=0;col<7;col++){const v=s.board[r*7+col];b.append(el("div",{className:"cell "+(v==="R"?"x":v==="Y"?"o":""),onclick:()=>send({type:"drop",col})},v==="R"?"R":v==="Y"?"Y":""));}
  c.append(el("div",{className:"card"},el("h3",{},"Connect Four"),b));
},
"checkers":(c,s,me,send)=>{
  clear(c);
  let sel=null;
  const b=el("div",{className:"board",style:"grid-template-columns:repeat(8,1fr)"});
  s.board.forEach((p,i)=>{const dark=(Math.floor(i/8)+i%8)%2===1;const cell=el("div",{className:"cell"+(dark?" dark":""),style:dark?"background:#2a2f3d":"background:#1a1d26",onclick:()=>{if(p&&p.c===(s.players[0]===me?"r":"b")){sel=i;render();}else if(sel!=null){send({type:"move",from:sel,to:i});sel=null;render();}}},p?el("div",{style:`width:70%;height:70%;border-radius:50%;background:${p.c==="r"?"#ff6b81":"#4dabf7"};${p.k?"border:3px solid gold;":""}`}):""));
  function render(){clear(b);s.board.forEach((p,i)=>{const dark=(Math.floor(i/8)+i%8)%2===1;const cell=el("div",{className:"cell"+(dark?" dark":""),style:dark?"background:#2a2f3d":"background:#1a1d26",onclick:()=>{if(p&&p.c===(s.players[0]===me?"r":"b")){sel=i;render();}else if(sel!=null){send({type:"move",from:sel,to:i});sel=null;render();}}},p?el("div",{style:`width:70%;height:70%;border-radius:50%;background:${p.c==="r"?"#ff6b81":"#4dabf7"};${p.k?"border:3px solid gold;":""}`}):""));b.append(cell);});}
  render();
  c.append(el("div",{className:"card"},el("h3",{},"Checkers"),b));
},
"battleship":(c,s,me,send)=>{
  clear(c);
  const mine=s.boards[me],oppId=s.players.find(p=>p!==me),opp=s.boards[oppId];
  const g1=el("div",{className:"board",style:"grid-template-columns:repeat(10,1fr)"}),g2=el("div",{className:"board",style:"grid-template-columns:repeat(10,1fr)"});
  for(let i=0;i<100;i++){g1.append(el("div",{className:"cell "+(mine.grid[i]?"ship":"")+(mine.shots.has(i)?" hit":"")},mine.grid[i]?"S":""));}
  for(let i=0;i<100;i++){const x=i%10,y=Math.floor(i/10);g2.append(el("div",{className:"cell "+(opp.shots.has(i)?(opp.grid[i]?"hit":"miss"):""),onclick:()=>send({type:"shoot",x,y})},opp.shots.has(i)?(opp.grid[i]?"X":"·"):""));}
  c.append(el("div",{className:"card"},el("h3",{},"Battleship"),el("p",{},"Your fleet"),g1),el("div",{className:"card"},el("h3",{},"Enemy waters"),g2));
},
"memory-cards":(c,s,me,send)=>{
  clear(c);
  const b=el("div",{className:"board",style:"grid-template-columns:repeat(4,1fr)"});
  s.cards.forEach((card,i)=>b.append(el("div",{className:"cell",onclick:()=>send({type:"flip",index:i})},card.matched||s.flipped.includes(i)?card.v:"?")));
  c.append(el("div",{className:"card"},el("h3",{},"Memory Cards"),b));
},
"pattern-master":(c,s,me,send)=>{
  clear(c);
  if(s.phase==="show")c.append(el("div",{className:"card"},el("h3",{},"Pattern Master"),el("p",{},"Memorize: "+s.seq.join(", "))));
  else{const seq=[];const g=el("div",{});["red","blue","green","yellow"].forEach(col=>g.append(el("button",{className:"pill",style:`background:${col}`,onclick:()=>seq.push(col)},col)));const sub=el("button",{className:"btn",onclick:()=>send({type:"submit",sequence:seq})},"Submit");c.append(el("div",{className:"card"},el("h3",{},"Pattern Master"),g,sub));}
},
"word-scramble":(c,s,me,send)=>{
  clear(c);
  const i=el("input",{placeholder:"Your answer"});
  const b=el("button",{className:"btn",onclick:()=>send({type:"answer",word:i.value})},"Submit");
  c.append(el("div",{className:"card"},el("h3",{},"Word Scramble"),el("h2",{},s.scrambled),i,b));
},
"math-duel":(c,s,me,send)=>{
  clear(c);
  const i=el("input",{placeholder:"Answer"});
  const b=el("button",{className:"btn",onclick:()=>send({type:"answer",value:i.value})},"Submit");
  c.append(el("div",{className:"card"},el("h3",{},"Math Duel"),el("h2",{},s.question),i,b));
},
"sequence-master":(c,s,me,send)=>{
  clear(c);
  if(s.phase==="show")c.append(el("div",{className:"card"},el("h3",{},"Sequence Master"),el("h2",{},s.seq.join(", "))));
  else{const i=el("input",{placeholder:"e.g. 3,7,1,9"});const b=el("button",{className:"btn",onclick:()=>send({type:"answer",sequence:i.value.split(",").map(x=>parseInt(x.trim())).filter(x=>!isNaN(x))})},"Submit");c.append(el("div",{className:"card"},el("h3",{},"Sequence Master"),i,b));}
},
"speed-typing":(c,s,me,send)=>{
  clear(c);
  const t=el("textarea",{rows:4,placeholder:"Type here..."});
  t.oninput=()=>send({type:"type",text:t.value});
  c.append(el("div",{className:"card"},el("h3",{},"Speed Typing"),el("p",{},s.text),t));
}
};
