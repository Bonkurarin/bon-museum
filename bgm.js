/* BON MEMORIA: サイト共通BGM。初期はオフ。再生状態と位置はlocalStorageで引き継ぐ */
(function(){
if(window.bmBgm)return;
var K="bm-bgm",a=new Audio();a.src="bgm.mp3";a.loop=true;a.preload="none";a.volume=.6;
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
var st=ld();
function sv(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
var css=document.createElement("style");
css.textContent=".bmbgm{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:9998;font:700 13px/1 -apple-system,'Zen Maru Gothic','Hiragino Sans',sans-serif;padding:10px 14px;border-radius:999px;border:2px solid rgba(255,255,255,.85);background:rgba(40,30,70,.82);color:#fff;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);-webkit-tap-highlight-color:transparent}.bmbgm.on{background:linear-gradient(90deg,#e0506a,#e8a23a,#4ea86a,#2f64c8,#8a4fc8)}.bmbgm .n{display:inline-block}.bmbgm.on .n{animation:bmn 1s ease-in-out infinite alternate}@keyframes bmn{to{transform:translateY(-3px) rotate(12deg)}}@media(prefers-reduced-motion:reduce){.bmbgm.on .n{animation:none}}";
document.head.appendChild(css);
var b=document.createElement("button");b.type="button";b.className="bmbgm";
function ui(){var on=!a.paused;b.className="bmbgm"+(on?" on":"");b.innerHTML='<span class="n">♪</span> BON MEMORIA '+(on?"停止":"を流す");b.setAttribute("aria-label",on?"BGMを止める":"BGM「BON MEMORIA」を流す")}
function go(){st.on=true;sv();var p=a.play();if(p&&p.then)p.then(ui,ui);ui()}
function stop(){st.on=false;sv();a.pause();ui()}
b.addEventListener("click",function(){a.paused?go():stop()});
document.body.appendChild(b);ui();
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
