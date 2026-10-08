const bank=[
{t:"בניינים",q:"מהו הבניין של \"נִכְתַּב\"?",a:["נפעל","קל","פיעל","הופעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"הִדְלִיק\"?",a:["הפעיל","הופעל","פיעל","קל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"סִדֵּר\"?",a:["פיעל","קל","התפעל","נפעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"הֻדְלַק\"?",a:["הופעל","הפעיל","נפעל","פיעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"הִתְלַבֵּשׁ\"?",a:["התפעל","נפעל","פיעל","קל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"שָׁמַר\"?",a:["קל","פיעל","נפעל","התפעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"סֻדַּר\"?",a:["פועל","הופעל","פיעל","נפעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"נִשְׁמַר\"?",a:["נפעל","קל","פועל","הופעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"מְסַדֵּר\"?",a:["פיעל","הפעיל","קל","התפעל"],c:0},
{t:"בניינים",q:"מהו הבניין של \"הִתְקַשֵּׁר\"?",a:["התפעל","נפעל","הפעיל","פיעל"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"ילד\" במשפט: \"הילד רץ לבית הספר\"?",a:["שם עצם","פועל","שם תואר","מילת יחס"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"רץ\" במשפט: \"הילד רץ לבית הספר\"?",a:["פועל","שם עצם","שם תואר","תואר הפועל"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"מהיר\" במשפט: \"זהו ילד מהיר\"?",a:["שם תואר","שם עצם","פועל","מילת יחס"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"מאוד\" במשפט: \"הילד רץ מאוד מהר\"?",a:["תואר הפועל","שם עצם","פועל","שם תואר"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"אל\" במשפט: \"הלכתי אל החנות\"?",a:["מילת יחס","שם עצם","פועל","שם תואר"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"אבל\"?",a:["מילת קישור","שם עצם","פועל","שם תואר"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"שלושה\" במשפט: \"שלושה תלמידים הגיעו\"?",a:["שם מספר","שם עצם","פועל","מילת יחס"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"ללמוד\" במשפט: \"אני רוצה ללמוד\"?",a:["שם פועל","פועל","שם פעולה","שם עצם"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"שמחה\" במשפט: \"השמחה מילאה את החדר\"?",a:["שם עצם","שם תואר","פועל","מילת קישור"],c:0},
{t:"חלקי דיבור",q:"מהו חלק הדיבור של \"במהירות\"?",a:["תואר הפועל","שם תואר","שם עצם","פועל"],c:0}
];

let mode="mixed", questions=[], idx=0, score=0, combo=0, bestCombo=0, wrong=0, timeLeft=600, timer=null, locked=false;
const $=id=>document.getElementById(id);
document.querySelectorAll(".mode").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mode").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");mode=b.dataset.mode});
$("start").onclick=startQuiz;
$("again").onclick=startQuiz;
$("homeBtn").onclick=()=>show("home");
$("quit").onclick=()=>show("home");
$("next").onclick=()=>{if(idx<questions.length-1){idx++;render()}else finish()};

function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active")}
function startQuiz(){
 clearInterval(timer); idx=0;score=0;wrong=0;combo=0;bestCombo=0;timeLeft=600;locked=false;
 let pool=mode==="mixed"?bank:bank.filter(x=>mode==="buildings"?x.t==="בניינים":x.t==="חלקי דיבור");
 questions=[...pool].sort(()=>Math.random()-.5).slice(0,10);
 show("quiz"); render(); timer=setInterval(tick,1000);
}
function tick(){timeLeft--;let m=Math.floor(timeLeft/60),s=timeLeft%60;$("time").textContent=`${m}:${String(s).padStart(2,"0")}`;if(timeLeft<=0)finish()}
function render(){
 locked=false;$("counter").textContent=`שאלה ${idx+1} / ${questions.length}`;$("combo").textContent=`🔥 ${combo} קומבו`;
 $("progress").style.width=((idx+1)/questions.length*100)+"%";
 const x=questions[idx];$("type").textContent=x.t;$("question").textContent=x.q;$("answers").innerHTML="";$("feedback").textContent="";$("next").disabled=true;
 x.a.forEach((a,n)=>{const b=document.createElement("button");b.className="answer";b.textContent=a;b.onclick=()=>answer(n,b);$("answers").appendChild(b)});
}
function answer(n,btn){
 if(locked)return;locked=true;const x=questions[idx], ok=n===x.c;
 document.querySelectorAll(".answer").forEach(b=>b.disabled=true);
 if(ok){btn.classList.add("correct");score++;combo++;bestCombo=Math.max(bestCombo,combo);$("feedback").textContent="✓ נכון!";$("feedback").style.color="var(--good)";if(combo>=3)toast(`🔥 קומבו ${combo}!`)}
 else{btn.classList.add("wrong");document.querySelectorAll(".answer")[x.c].classList.add("correct");wrong++;combo=0;$("feedback").textContent=`✗ לא נכון — התשובה: ${x.a[x.c]}`;$("feedback").style.color="var(--bad)"}
 $("combo").textContent=`🔥 ${combo} קומבו`;$("next").disabled=false;
}
function finish(){
 clearInterval(timer);show("result");const pct=Math.round(score/questions.length*100);
 $("finalScore").textContent=pct;$("correct").textContent=score;$("wrong").textContent=wrong;$("bestCombo").textContent=bestCombo;
 $("score-ring")?.remove();
 const deg=pct*3.6;document.querySelector(".score-ring").style.background=`conic-gradient(var(--b) 0deg,var(--a) ${deg}deg,#24283b ${deg}deg)`;
 $("resultTitle").textContent=pct>=90?"אגדה. 🔥":pct>=75?"כל הכבוד! 💪":pct>=60?"יפה! עוד קצת תרגול.":"יש מקום להשתפר — ממשיכים.";
 $("resultText").textContent=`ענית נכון על ${score} מתוך ${questions.length} שאלות.`;
}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1300)}
