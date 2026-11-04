/* 来館スタンプ: 記録はこの端末のブラウザ(localStorage)だけに保存 */
(function(){
if(window.bmStamp)return;
var K="bm-stamps";
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function sv(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var LIST=[
["v-top","トップ","博物館のトップに来た"],["v-games","ゲーム","ゲームのページを見た"],["v-gallery","ギャラリー","ギャラリーを見た"],["v-zukan","ずかん","ボンたちのずかんを見た"],["v-music","ミュージック","ミュージックのページに来た"],["v-talk","おしゃべり","ボンたちと おしゃべりのページに来た"],
["today","今日のボン","今日のボンのひとことを聞いた"],["omikuji","おみくじ","今日のおみくじを引いた"],["shindan","ボン診断","ボン診断をやった"],["bgm","BGM","BGM「BON MEMORIA」を流した"],["music-play","曲","ミュージックで曲を聴いた"],["wall","壁紙","壁紙かアイコンをもらった"],["mini","ボンたたき","ボンたたきであそんだ"],
["p-bon-pachi","BON UTOPIA","BON UTOPIAであそんだ"],["p-bon-nyanko","にゃんこ","にゃんこガーディアンであそんだ"],["p-bon-hari","寝違え","寝違え大騒動であそんだ"],["p-bon-puzzle","パズル","ボン・パズルであそんだ"],["p-bon-life","ボンライフ","ボンボンライフ！であそんだ"],["p-bon-koi","ボンこい","ボン♥こいであそんだ"],["p-bonsei","ボン生","ボン生ゲームであそんだ"]
];
function add(k){var o=ld();if(o[k])return false;o[k]=Date.now();sv(o);return true}
window.bmStamp={add:add,has:function(k){return !!ld()[k]},all:ld,list:LIST,count:function(){var o=ld(),n=0;LIST.forEach(function(x){if(o[x[0]])n++});return n},reset:function(){sv({})}};
var f=(location.pathname.split("/").pop()||"index.html").replace(/\.html$/,"");
var V={index:"v-top",games:"v-games",gallery:"v-gallery",zukan:"v-zukan",music:"v-music",talk:"v-talk"};
if(V[f])add(V[f]);
document.addEventListener("play",function(e){if(e.target&&e.target.id!=="bm-bgm-audio"&&e.target.src&&!/bgm\.mp3/.test(e.target.src))add("music-play")},true);
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#tdMore"))add("today");var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var m=/bonkurarin\.github\.io\/([^\/]+)\//.exec(a.getAttribute("href")||"");if(m&&m[1]!=="bon-museum")add("p-"+m[1])},true);
})();
