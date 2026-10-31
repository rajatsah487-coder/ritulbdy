/* ===== EDIT THIS PART =====
   Photos: photos/1.jpg to photos/9.jpg   Songs: track1.mp3 (add more to the tracks list to get more) */
const tracks=[{n:"Happy Birthday",f:"track1.mp3"}];
// t: p polaroid, d digital screen, r ornate rectangle. trk: attach a play button to a track (0, 1, 2)
const F=[
 {t:'p',c:"Tumhari wo hansi",trk:0},{t:'d',c:"Pure sunshine"},{t:'r',c:"खास पल"},
 {t:'d',c:"Main character"},{t:'p',c:"Golden hour"},{t:'r',c:"यादें"},
 {t:'d',c:"Full vibes"},{t:'p',c:"Sabse pyari"},{t:'d',c:"Aaj ka din tumhara"}
];
/* ========================== */
const $=s=>document.querySelector(s),au=$('#au'),cols=[['#ffb3c6','#ffd59a'],['#b9f0e6','#c9b8ff'],['#ffd59a','#ff9eb5'],['#c9b8ff','#9ee7f0']],rat=['4/5','1/1','3/4','4/3','4/5'];
const bars='<span class="wv"><i></i><i></i><i></i></span>';
let cur=0;
function setTrack(i,play){cur=i;au.src=tracks[i].f;$('#tn').textContent=tracks[i].n;if(play)au.play().catch(()=>{})}
function sync(){const on=!au.paused;$('#cas').classList.toggle('on',on);$('#cp').textContent=on?'Pause':'Play';document.querySelectorAll('.pl').forEach(b=>b.classList.toggle('on',on&&+b.dataset.t===cur))}
au.onplay=au.onpause=sync;au.onended=()=>{setTrack((cur+1)%tracks.length,true)};
function toggle(i){if(i===cur&&au.src&&!au.paused)au.pause();else{if(i!==cur||!au.src)setTrack(i);au.play().catch(()=>{});}}
if(tracks.length<2)$('#cn').style.display='none';
$('#cp').onclick=()=>toggle(cur);$('#cn').onclick=()=>setTrack((cur+1)%tracks.length,true);setTrack(0);
document.addEventListener('click',e=>{const b=e.target.closest('.pl');if(b){e.stopPropagation();toggle(+b.dataset.t)}},true);
document.querySelectorAll('.card .pl').forEach(b=>b.innerHTML=bars+'&#9654;');

const wall=$('#wall'),lb=$('#lb');
F.forEach((o,i)=>{
 const f=document.createElement('figure');f.className='fr';
 f.style.cssText=`--r:${(i%2?1:-1)*(.8+(i*7%22)/10)}deg;--a:${rat[i%5]};--c1:${cols[i%4][0]};--c2:${cols[i%4][1]}`;
 const ph=document.createElement('div');ph.className='ph';ph.textContent='Photo '+(i+1);
 const img=new Image(),ex=['jpg','jpeg','png','JPG','webp'];let k=0;const nx=()=>{if(k<ex.length)img.src=`photos/${i+1}.${ex[k++]}`};
 img.onerror=nx;img.alt=o.c;img.onload=()=>{ph.textContent='';ph.style.aspectRatio='auto';ph.appendChild(img)};nx();
 const cap=document.createElement('figcaption');cap.textContent=o.c;
 f.className+=' '+o.t;
 if(o.t==='d'){const bar=document.createElement('div');bar.className='bar';bar.innerHTML='<span>Ritul 18:30</span><span>&#9679;&#9679;&#9679;</span>';f.append(bar,ph,cap)}else f.append(ph,cap);
 if(o.trk!==undefined){const b=document.createElement('button');b.className='pl';b.dataset.t=o.trk;b.setAttribute('aria-label','Play '+tracks[o.trk].n);b.innerHTML=bars+'&#9654;';f.appendChild(b)}
 f.onclick=()=>{if(img.parentNode){lb.querySelector('img').src=img.src;lb.classList.add('on')}};
 wall.appendChild(f);
});
lb.onclick=()=>lb.classList.remove('on');addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});

// bokeh + sparkles
const pal=['#ffd36e','#ff7aa8','#ff9a4d','#c9a0ff','#fff1b8'];
for(let i=0;i<26;i++){const b=document.createElement('div'),s=40+Math.random()*130,c=pal[i%5];b.className='bk';
 b.style.cssText=`left:${Math.random()*100}vw;top:${Math.random()*100}vh;width:${s}px;height:${s}px;background:radial-gradient(circle,${c}99,${c}22 60%,transparent 70%);opacity:${.25+Math.random()*.4};--x:${(Math.random()-.5)*80}px;--y:${(Math.random()-.5)*80}px;--d:${6+Math.random()*8}s`;document.body.appendChild(b)}
for(let i=0;i<34;i++){const s=document.createElement('span');s.className='sp';s.textContent='\u2726';s.style.cssText=`left:${Math.random()*100}vw;top:${Math.random()*100}vh;font-size:${8+Math.random()*16}px;--d:${2+Math.random()*4}s;animation-delay:${Math.random()*4}s`;document.body.appendChild(s)}

// string lights
(function(){const sv=$('#strings'),w=innerWidth;sv.setAttribute('viewBox',`0 0 ${w} 120`);let d=`M0 20`,h='';
 for(let x=0;x<=w;x+=20)d+=` L${x} ${22+Math.sin(x/w*Math.PI*5)*14}`;
 h+=`<path d="${d}" stroke="#3a2a2a" stroke-width="2" fill="none"/>`;
 for(let x=30,i=0;x<w;x+=56,i++){const y=26+Math.sin(x/w*Math.PI*5)*14,c=pal[i%5];h+=`<circle cx="${x}" cy="${y+10}" r="22" fill="${c}" opacity=".22"/><circle cx="${x}" cy="${y+10}" r="7" fill="${c}"><animate attributeName="opacity" values="1;.5;1" dur="${2+i%3}s" repeatCount="indefinite"/></circle>`}
 sv.innerHTML=h})();

// confetti: gentle fall always, big burst on open
const cv=$('#fx'),cx=cv.getContext('2d');let P=[];
const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};rs();addEventListener('resize',rs);
const cc=['#ffd36e','#ff7aa8','#ff9a4d','#fff1b8','#8de2d6','#c9a0ff'];
function mk(x,y,vx,vy){P.push({x,y,vx,vy,s:5+Math.random()*7,c:cc[P.length%6],a:Math.random()*6,va:(Math.random()-.5)*.3,r:Math.random()<.3})}
for(let i=0;i<45;i++)mk(Math.random()*innerWidth,Math.random()*innerHeight,(Math.random()-.5),1+Math.random()*1.5);
function burst(){for(let i=0;i<220;i++)mk(innerWidth/2,innerHeight*.65,(Math.random()-.5)*20,-Math.random()*18-4)}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);
 P.forEach(p=>{p.vy=Math.min(p.vy+.12,3.2);p.vx*=.985;p.x+=p.vx+Math.sin(p.y/40)*.4;p.y+=p.vy;p.a+=p.va;cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;p.r?(cx.beginPath(),cx.arc(0,0,p.s/2,0,7),cx.fill()):cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.55);cx.restore();
  if(p.y>cv.height+20){p.y=-20;p.x=Math.random()*cv.width;p.vx=0;p.vy=1+Math.random()*1.5}});
 requestAnimationFrame(loop)})();

$('#begin').onclick=()=>{burst();setTrack(0,true);document.querySelectorAll('section')[1].scrollIntoView({behavior:'smooth'})};
