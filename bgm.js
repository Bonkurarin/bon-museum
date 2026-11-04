/* BON MEMORIA: サイト共通BGM。初期はオフ。再生状態と位置はlocalStorageで引き継ぐ */
(function(){
if(window.bmBgm)return;
var K="bm-bgm",a=new Audio();a.src="bgm.mp3";a.loop=true;a.preload="none";a.volume=(typeof ld().v==="number")?ld().v:.6;
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
var st=ld();
function sv(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
var css=document.createElement("style");
css.textContent=".bmbgm{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:9998;font:700 13px/1 -apple-system,'Zen Maru Gothic','Hiragino Sans',sans-serif;padding:10px 14px;border-radius:999px;border:2px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);-webkit-tap-highlight-color:transparent}.bmbgm.on{background:linear-gradient(90deg,#e0506a,#e8a23a,#4ea86a,#2f64c8,#8a4fc8)}.bmbg{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(max(12px,env(safe-area-inset-bottom,0px)) + 46px);z-index:9998;font:700 11px/1 -apple-system,'Zen Maru Gothic',sans-serif;padding:6px 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;cursor:pointer;display:none}.bmbg.show{display:block}.bmvol{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(max(12px,env(safe-area-inset-bottom,0px)) + 82px);z-index:9998;display:none;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;border:1.5px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;font:700 11px/1 -apple-system,sans-serif}.bmvol.show{display:flex}.bmvol input{width:90px;accent-color:#e8a23a;margin:0}.bmbgm .n{display:inline-block}.bmbgm.on .n{animation:bmn 1s ease-in-out infinite alternate}@keyframes bmn{to{transform:translateY(-3px) rotate(12deg)}}@media(prefers-reduced-motion:reduce){.bmbgm.on .n{animation:none}}";
document.head.appendChild(css);
var b=document.createElement("button");b.type="button";b.className="bmbgm";
function ui(){var on=!a.paused;b.className="bmbgm"+(on?" on":"");b.innerHTML='<span class="n">♪</span> BON MEMORIA '+(on?"停止":"を流す");b.setAttribute("aria-label",on?"BGMを止める":"BGM「BON MEMORIA」を流す")}
function go(){st.on=true;sv();var p=a.play();if(p&&p.then)p.then(ui,ui);ui()}
function stop(){st.on=false;sv();a.pause();ui()}
b.addEventListener("click",function(){a.paused?go():stop()});
document.body.appendChild(b);ui();
var g=document.createElement("button");g.type="button";g.className="bmbg";document.body.appendChild(g);
var v=document.createElement("label");v.className="bmvol";v.innerHTML='音量<input type="range" min="0" max="100" step="1" aria-label="BON MEMORIAの音量">';document.body.appendChild(v);
var vi=v.querySelector("input");vi.value=Math.round((st.v==null?.6:st.v)*100);a.volume=vi.value/100;
vi.addEventListener("input",function(){a.volume=vi.value/100;st.v=a.volume;sv()});
var held=false;
function gu(){var o=st.bg!==false;g.textContent="裏でも流す: "+(o?"する":"しない");g.setAttribute("aria-label","アプリやタブを離れたときもBGMを流す設定。いまは"+(o?"流す":"止める"));var sh=!a.paused||held;g.className="bmbg"+(sh?" show":"");v.className="bmvol"+(sh?" show":"")}
g.addEventListener("click",function(){st.bg=(st.bg===false);sv();gu()});
document.addEventListener("visibilitychange",function(){
if(document.hidden){if(st.bg===false&&!a.paused){held=true;a.pause()}}
else if(held){held=false;a.play().catch(function(){});}
gu()});
a.addEventListener("play",gu);a.addEventListener("pause",gu);gu();
var last=0;
a.addEventListener("timeupdate",function(){var n=Date.now();if(n-last>1500){last=n;st.t=a.currentTime;sv()}});
window.addEventListener("pagehide",function(){if(!a.paused){st.t=a.currentTime;sv()}});
a.addEventListener("play",ui);a.addEventListener("pause",ui);
/* 動画・音楽プレーヤーが鳴るときはBGMを止める */
document.addEventListener("play",function(e){if(e.target!==a&&!a.paused){st.on=false;sv();a.pause();ui()}},true);
/* 前のページで流していたら続きから */
if(st.on){a.preload="auto";var t=+st.t||0;
a.addEventListener("loadedmetadata",function(){try{if(t&&t<a.duration)a.currentTime=t}catch(e){}},{once:true});
var p=a.play();if(p&&p.catch)p.catch(function(){var h=function(){document.removeEventListener("pointerdown",h,true);if(ld().on)go()};document.addEventListener("pointerdown",h,true)})}
window.bmBgm={play:go,stop:stop,on:function(){return !a.paused}};
})();
