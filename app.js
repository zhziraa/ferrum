/* =========================================================
   ПЕРСОНАЖ «ФЕРРА»
   Сейчас нарисован кодом (SVG). Когда сгенерируете картинки
   в Higgsfield Soul, вставьте ссылки в img, и они заменят рисунок.
   ========================================================= */
// Бобрёнок — хранитель железа (сгенерирован в нейросети). Картинки встроены прямо в файл.
const CHARACTER_IMAGES = {
  hello: "assets/ferra-hello.jpg",
  low: "assets/ferra-low.jpg",
  mid: "assets/ferra-mid.jpg",
  good: "assets/ferra-good.jpg",
  portrait: "assets/ferra-portrait.jpg",
};

/* Ферра: стеклянная капля с ручками.
   Уровень жидкости внутри = ферритин (полная капля ≈ 45 нг/мл и выше),
   поза ручек и глаза = общее состояние по анализам. */
function feraLevel(){
  const h = sorted().filter(e=>e.values.ferritin!==undefined);
  if(!h.length) return 0.55;
  return Math.max(0.08, Math.min(0.95, h[h.length-1].values.ferritin/45));
}
function feraSVG(mood, level){
  if(level===undefined) level = mood==="hello" ? 0.55 : feraLevel();
  const id = "fr"+(++feraSVG.n||(feraSVG.n=1));
  const D = "M80 16 C80 16 36 72 36 102 a44 44 0 0 0 88 0 C124 72 80 16 80 16Z";
  const top = 146 - level*130;               // верхняя граница жидкости
  const eyeCol = top < 98 ? "#fff" : "#4A0716"; // глаза в жидкости — белые
  const eyes = {
    low:  `<path d="M64 104 h10 M86 104 h10" stroke="${eyeCol}" stroke-width="3.5" stroke-linecap="round"/>`,
    mid:  `<ellipse cx="69" cy="103" rx="3.6" ry="5" fill="${eyeCol}"/><ellipse cx="91" cy="103" rx="3.6" ry="5" fill="${eyeCol}"/>`,
    good: `<path d="M63 105 q6 -7 12 0 M85 105 q6 -7 12 0" stroke="${eyeCol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    hello:`<ellipse cx="69" cy="103" rx="3.6" ry="5" fill="${eyeCol}"/><ellipse cx="91" cy="103" rx="3.6" ry="5" fill="${eyeCol}"/>`
  }[mood];
  const arms = {
    low:  `<path d="M40 112 q-12 14 -10 30"/><path d="M120 112 q12 14 10 30"/>`,
    mid:  `<path d="M39 108 q-16 4 -12 18 q4 8 14 2"/><path d="M121 108 q16 4 12 18 q-4 8 -14 2"/>`,
    good: `<path d="M40 104 q-20 -2 -22 -22 q-1 -10 8 -12"/><path d="M120 104 q20 -2 22 -22 q1 -10 -8 -12"/>`,
    hello:`<path d="M40 112 q-12 14 -10 30"/><g class="wave-arm"><path d="M120 104 q18 -4 22 -26"/></g>`
  }[mood];
  const extra = mood==="good"
    ? `<g fill="#D8B07A"><path class="spark" d="M140 30 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z"/><path class="spark d2" d="M20 36 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z"/></g>`
    : mood==="low" ? `<text class="zz" x="118" y="40" font-family="Georgia" font-size="16" fill="currentColor" opacity=".6">z</text>` : "";
  // волна шире капли, чтобы её можно было сдвигать по кругу
  let wave = `M-60 ${top}`; for(let k=0;k<8;k++) wave += ` q15 -6 30 0 t30 0`;
  wave += ` V170 H-60Z`;
  return `<svg viewBox="0 0 160 170" role="img" aria-label="Ферра: уровень железа ${Math.round(level*100)}%">
    <defs><clipPath id="${id}c"><path d="${D}"/></clipPath>
      <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D2264A"/><stop offset="1" stop-color="#5A0A1C"/></linearGradient></defs>
    <ellipse cx="80" cy="158" rx="34" ry="4" fill="#26111A" opacity=".12"/>
    <g class="bob ${mood==="low"?"slow":""}">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">${arms}</g>
      <path d="${D}" fill="#F7E4E8" opacity=".85"/>
      <g clip-path="url(#${id}c)"><g class="liquid" style="--from:${(146-top)}px">
        <g class="wave"><path d="${wave}" fill="url(#${id}g)"/></g>
        <circle class="bubble1" cx="70" cy="${Math.min(140,top+22)}" r="2.5" fill="#fff" opacity=".45"/>
        <circle class="bubble2" cx="92" cy="${Math.min(142,top+36)}" r="1.8" fill="#fff" opacity=".45"/>
      </g></g>
      <path d="${D}" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".55"/>
      <path d="M58 80 q-8 16 -6 34" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>
      <circle cx="66" cy="62" r="2.5" fill="#fff" opacity=".8"/>
      ${eyes}
    </g>${extra}
  </svg>`;
}

/* ---------- машущий бобрёнок: картинка разделена на «тело» и «руку», рука качается у плеча ---------- */
const WAVE = { base:"assets/ferra-wave-body.jpg", arm:"assets/ferra-wave-arm.png" };
function waveBeaverHTML(){
  return `<div class="waver"><img class="w-base" src="${WAVE.base}" alt="Бобрёнок Ферра машет лапкой">
    <img class="w-arm" src="${WAVE.arm}" alt="" style="left:3.828%;top:19.685%;width:32.297%;height:38.386%;transform-origin:80.00% 86.15%"></div>`;
}
function setAvatar(id, mood){
  const el = document.getElementById(id);
  if(mood==="hello" && WAVE.base){ el.innerHTML = waveBeaverHTML(); el.onclick = () => { const a = el.querySelector(".w-arm"); if(a){ a.style.animation="none"; a.offsetWidth; a.style.animation=""; } }; return; }
  el.innerHTML = CHARACTER_IMAGES[mood] ? `<img src="${CHARACTER_IMAGES[mood]}" alt="Бобрёнок Ферра">` : feraSVG(mood);
}
const MOOD_TEXT = {
  good:"Все показатели в пределах референса! Я полна сил ✨",
  mid: "Есть показатели на границе. Стоит присмотреться к ним и обсудить с врачом.",
  low: "Некоторые показатели вне референса, и я немного устала. Покажи отчёт врачу, он подскажет, что делать дальше."
};

/* =========================================================
   ПОКАЗАТЕЛИ. Нормы ПРИМЕРНЫЕ, для взрослых небеременных женщин.
   Перед демо сверить с источником (ВОЗ / клинические рекомендации).
   ========================================================= */
const MARKERS = [
  { id:"ferritin", name:"Ферритин", unit:"нг/мл", min:15, max:150,
    hint:"Запасы железа в организме. Обычно снижается первым.",
    low:"Запасы железа ниже референса. Этот показатель часто снижается раньше остальных.",
    high:"Выше референса. Ферритин может повышаться и по причинам, не связанным с железом, например при воспалении.",
    ok:"Запасы железа в пределах референса." },
  { id:"iron", name:"Сывороточное железо", unit:"мкмоль/л", min:9, max:30,
    hint:"Сколько железа в крови прямо сейчас. Сильно колеблется в течение дня.",
    low:"Ниже референса. Этот показатель зависит от времени сдачи и питания, его смотрят вместе с остальными.",
    high:"Выше референса. Иногда бывает из-за приёма препаратов железа незадолго до анализа.",
    ok:"В пределах референса." },
  { id:"hgb", name:"Гемоглобин", unit:"г/л", min:120, max:150,
    hint:"Белок, который переносит кислород.",
    low:"Ниже референса. Это повод обязательно обсудить результаты с врачом.",
    high:"Выше референса. Стоит уточнить у врача.",
    ok:"В пределах референса." },
  { id:"tsat", name:"Насыщение трансферрина", unit:"%", min:20, max:45,
    hint:"Какая часть «транспорта» железа сейчас загружена.",
    low:"Ниже референса: железа для переноса может быть недостаточно.",
    high:"Выше референса. Стоит уточнить у врача.",
    ok:"В пределах референса." }
];
const M = Object.fromEntries(MARKERS.map(m=>[m.id,m]));

/* ---------- ИСТОЧНИКИ ---------- */
const SOURCES = [
  { t:"ВОЗ. Guideline on use of ferritin concentrations to assess iron status in individuals and populations, 2020. Дефицит у взрослых: ферритин <15 мкг/л; при инфекции или воспалении <70; верхний ориентир для женщин 150.", u:"https://www.ncbi.nlm.nih.gov/books/NBK569877/" },
  { t:"Physiologically based serum ferritin thresholds for iron deficiency among women and children… multinational comparative study (PubMed 40288394). Гемоглобин у женщин начинает снижаться при ферритине около 24,8 мкг/л.", u:"https://pubmed.ncbi.nlm.nih.gov/40288394/" },
  { t:"Mei Z. и соавт. Сравнение порогов ВОЗ с физиологическими порогами ферритина (NHANES III): для женщин около 25 мкг/л.", u:"https://pmc.ncbi.nlm.nih.gov/articles/PMC10472073" },
  { t:"ВОЗ, eLENA: ферритин при воспалении — порог дефицита поднимают до 30 или 70 мкг/л в зависимости от возраста.", u:"https://www.who.int/tools/elena/interventions/ferritin-concentrations" },
  { t:"ВОЗ. Guideline on haemoglobin cutoffs to define anaemia, 2024 (сводка рекомендаций): небеременные женщины 15–65 лет — анемия при <120 г/л.", u:"https://guidelinecentral.com/guideline/3534081" },
  { t:"NIH Office of Dietary Supplements. Iron: Fact Sheet for Health Professionals — стадии дефицита, насыщение трансферрина, влияние воспаления на ферритин.", u:"https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/" },
  { t:"NHS. How and when to take ferrous sulfate — двухчасовой интервал до чая, кофе, молочного и яиц.", u:"https://www.nhs.uk/medicines/ferrous-sulfate/how-and-when-to-take-ferrous-sulfate/" },
  { t:"Ko C.W. и соавт. AGA Clinical Practice Guidelines on the Gastrointestinal Evaluation of Iron Deficiency Anemia. Gastroenterology, 2020 — при анемии порог ферритина 45 нг/мл.", u:"https://doi.org/10.1053/j.gastro.2020.06.046" }
];
const cite = (...n) => `<sup>[${n.map(i=>`<a href="#src-${i}" onclick="openSources()">${i}</a>`).join(", ")}]</sup>`;
function renderSources(){
  document.getElementById("src-list").innerHTML = SOURCES.map((x,i)=>`<li id="src-${i+1}">${x.t} <a href="${x.u}" target="_blank" rel="noopener">открыть</a></li>`).join("");
}
function openSources(){ const l = document.getElementById("src-list"); const d = l && l.closest("details"); if(d) d.open = true; }

/* Что говорят рекомендации — короткая заметка под показателем */
function sciNote(id, v, ctx){
  if(id==="ferritin"){
    if(ctx && ctx.sick) return `Ты недавно болела. При воспалении ферритин завышается, поэтому для людей с воспалением ВОЗ считает дефицитом уже ферритин ниже 70 мкг/л${cite(1,4)}.`;
    if(v < 15) return `Ниже 15 мкг/л — порог дефицита железа у взрослых по ВОЗ${cite(1)}.`;
    if(v < 25) return `«Серая зона»: порог ВОЗ 15 основан на мнении экспертов, а большие исследования показывают, что гемоглобин у женщин начинает снижаться уже при ферритине около 25${cite(2,3)}.`;
    if(v > 150) return `Выше 150 мкг/л — верхний ориентир ВОЗ для женщин${cite(1)}.`;
  }
  if(id==="hgb" && v < 120) return `По ВОЗ (2024) у небеременных женщин анемией считается гемоглобин ниже 120 г/л${cite(5)}.`;
  if(id==="tsat" && v < 20) return `Насыщение трансферрина падает, когда запасы уже исчерпаны, даже если гемоглобин ещё в норме${cite(6)}.`;
  return "";
}
const SYMPTOMS = [ {id:"fatigue", name:"Усталость, слабость"}, {id:"hair", name:"Выпадение волос"}, {id:"nails", name:"Ломкость ногтей"} ];
const SYM_LEVELS = ["нет","немного","заметно","сильно"];

/* ---------- хранение (только в браузере) ---------- */
function load(k, d){ try{ const v = localStorage.getItem("ferrum_"+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
function save(k, v){ try{ localStorage.setItem("ferrum_"+k, JSON.stringify(v)); }catch(e){} }

let history = load("history", []);   // [{date:"2026-11-10", values:{ferritin:34,...}}]
let refs = load("refs", {});
const ref = id => refs[id] || {min:M[id].min, max:M[id].max};

/* ---------- утилиты ---------- */
const fmtDate = d => new Date(d+"T00:00").toLocaleDateString("ru-RU",{day:"numeric",month:"short",year:"numeric"});
const shortDate = d => new Date(d+"T00:00").toLocaleDateString("ru-RU",{day:"numeric",month:"short"});
const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const today = () => iso(new Date());
const daysBetween = (a,b) => Math.round((new Date(b+"T00:00") - new Date(a+"T00:00"))/86400000);
const nf = (v,d=1) => (+v).toLocaleString("ru-RU",{maximumFractionDigits:d});
let intake = load("intake", []);
const sorted = () => [...history].sort((a,b)=>a.date.localeCompare(b.date));

function status(v, id){
  const {min,max} = ref(id);
  if(id==="hgb" && v < 120) return "low";           // ВОЗ 2024 [5]
  if(v < min) return "low";
  if(v > max) return "high";
  const edge = (max-min)*0.12;
  if(v < min+edge || v > max-edge) return "warn";
  if(id==="ferritin" && v < 25) return "warn";      // серая зона [2,3]
  return "ok";
}
const LABEL = { ok:"в пределах референса", warn:"на границе", low:"ниже референса", high:"выше референса" };

/* ---------- навигация ---------- */
function startApp(){
  save("seen", true);
  document.getElementById("s-welcome").classList.add("hidden");
  document.getElementById("s-app").classList.remove("hidden");
}
function tab(name){
  ["input","report","remind"].forEach(t=>{
    document.getElementById("p-"+t).classList.toggle("hidden", t!==name);
    document.getElementById("t-"+t).classList.toggle("on", t===name);
  });
  if(name==="report") renderReport();
  renderTimer();
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- ввод ---------- */
function renderFields(){
  document.getElementById("date").value = today();
  document.getElementById("fields").innerHTML = MARKERS.map(m=>{
    const r = ref(m.id);
    return `<div class="field">
      <label for="v-${m.id}">${m.name}</label>
      <div class="hint">${m.hint}</div>
      <div class="inputs"><input type="number" step="any" id="v-${m.id}" placeholder="—"><span class="muted">${m.unit}</span></div>
      <details class="refbox"><summary>Норма на бланке: ${r.min}–${r.max} · другая?</summary>
        <div class="ref">моя норма:
          <input type="number" step="any" id="min-${m.id}" value="${r.min}"> –
          <input type="number" step="any" id="max-${m.id}" value="${r.max}">
        </div></details>
    </div>`;
  }).join("");
  document.getElementById("symFields").innerHTML = SYMPTOMS.map(x=>`<div class="sel"><span>${x.name}</span>
    <select id="sym-${x.id}">${SYM_LEVELS.map((l,i)=>`<option value="${i}">${l}</option>`).join("")}</select></div>`).join("");
}
function renderHistory(){
  const h = sorted();
  document.getElementById("hist").innerHTML = h.length
    ? h.map(e=>`<span class="chip">${fmtDate(e.date)} · ${Object.keys(e.values).length} пок.<button title="Удалить" onclick="delEntry('${e.date}')">×</button></span>`).join("")
    : `<span class="muted">Пока ничего нет</span>`;
}
function saveEntry(){
  const date = document.getElementById("date").value || today();
  const values = {};
  MARKERS.forEach(m=>{
    const v = document.getElementById("v-"+m.id).value;
    if(v!=="") values[m.id] = parseFloat(v);
    refs[m.id] = { min: parseFloat(document.getElementById("min-"+m.id).value) || m.min,
                   max: parseFloat(document.getElementById("max-"+m.id).value) || m.max };
  });
  save("refs", refs);
  if(!Object.keys(values).length){ toast("Введи хотя бы один показатель"); return; }
  const g = id => document.getElementById(id);
  const dayV = g("c-day").value;
  const ctx = { fasting:g("c-fasting").checked, heavy:g("c-heavy").checked, sick:g("c-sick").checked,
                taking:g("c-taking").checked, day: dayV==="" ? null : parseInt(dayV) };
  const sym = {}; SYMPTOMS.forEach(x=>{ sym[x.id] = parseInt(g("sym-"+x.id).value); });
  const refSnap = JSON.parse(JSON.stringify(Object.fromEntries(MARKERS.map(m=>[m.id, ref(m.id)]))));
  history = history.filter(e=>e.date!==date).concat({date, values, ctx, sym, refs:refSnap});
  save("history", history);
  MARKERS.forEach(m=>document.getElementById("v-"+m.id).value="");
  ["c-fasting","c-heavy","c-sick","c-taking"].forEach(id=>g(id).checked=false); g("c-day").value="";
  SYMPTOMS.forEach(x=>g("sym-"+x.id).value="0");
  renderHistory(); tab("report");
}
function delEntry(date){
  history = history.filter(e=>e.date!==date); save("history", history); renderHistory();
}
function loadDemo(){
  const R = (fmin,fmax)=>({ferritin:{min:fmin,max:fmax},iron:{min:9,max:30},hgb:{min:120,max:150},tsat:{min:20,max:45}});
  history = [
    {date:"2026-01-15", values:{ferritin:7,  iron:6,  hgb:108, tsat:10}, refs:R(15,150),
     ctx:{fasting:true,  heavy:true,  sick:false, taking:false, day:4},  sym:{fatigue:3, hair:3, nails:2}},
    {date:"2026-03-20", values:{ferritin:8,  iron:8,  hgb:111, tsat:12}, refs:R(15,150),
     ctx:{fasting:true,  heavy:true,  sick:false, taking:true,  day:10}, sym:{fatigue:3, hair:2, nails:2}},
    {date:"2026-05-28", values:{ferritin:11, iron:21, hgb:115, tsat:19}, refs:R(10,120),
     ctx:{fasting:false, heavy:true,  sick:false, taking:true,  day:12}, sym:{fatigue:2, hair:2, nails:1}},
    {date:"2026-08-10", values:{ferritin:29, iron:9,  hgb:117, tsat:14}, refs:R(15,150),
     ctx:{fasting:true,  heavy:false, sick:true,  taking:true,  day:20}, sym:{fatigue:3, hair:1, nails:1}},
    {date:"2026-11-10", values:{ferritin:26, iron:13, hgb:122, tsat:22}, refs:R(15,150),
     ctx:{fasting:true,  heavy:true,  sick:false, taking:true,  day:3},  sym:{fatigue:1, hair:1, nails:0}}
  ];
  // отметки приёма: март–май ~45%, май–август ~85%, август–ноябрь ~90%
  intake = [];
  const addDays = (d,n)=>{ const x=new Date(d+"T00:00"); x.setDate(x.getDate()+n); return iso(x); };
  const fill = (from,to,keep)=>{ for(let d=addDays(from,1), i=0; d<=to; d=addDays(d,1), i++) if(keep(i)) intake.push(d); };
  fill("2026-03-20","2026-05-28", i=>i%20<9);
  fill("2026-05-28","2026-08-10", i=>i%20<17);
  fill("2026-08-10","2026-11-10", i=>i%10!==0);
  fill("2026-11-10", addDays(today(),-1), i=>i%7!==3);
  if(!reminder){ reminder = "17:00"; save("reminder", reminder); document.getElementById("doseTime").value = reminder; renderTimeline(); document.getElementById("setupBox").open = false; }
  refs = {}; save("refs", refs); save("history", history); save("intake", intake);
  renderFields(); renderHistory(); renderIntake(); toast("Пример загружен"); tab("report");
}

/* =========================================================
   АНАЛИТИКА
   ========================================================= */
function buildInsights(v, s){
  const out = [];
  const has = id => v[id] !== undefined;
  const inRange = x => x==="ok" || x==="warn";

  if(s.ferritin==="low" && s.hgb==="low")
    out.push(["low","Снижены и запасы, и гемоглобин","Ферритин и гемоглобин оба ниже референса. Такое сочетание стоит обязательно показать врачу в ближайшее время."]);
  else if(s.ferritin==="low" && inRange(s.hgb))
    out.push(["warn","Запасы снижены, гемоглобин пока в норме","Ферритин ниже референса, а гемоглобин в пределах. Запасы железа обычно расходуются раньше, чем меняется гемоглобин, поэтому такое сочетание имеет смысл обсудить с врачом, не дожидаясь изменений."]);
  else if(s.hgb==="low" && has("ferritin") && s.ferritin!=="low")
    out.push(["info","Гемоглобин ниже, а запасы в пределах","Гемоглобин может снижаться не только из-за железа, например при нехватке B12 или фолиевой кислоты. Врач может предложить дополнительные анализы."]);

  if(has("ferritin") && s.ferritin!=="low" && s.tsat==="low")
    out.push(["info","Ферритин в норме, но насыщение трансферрина низкое","Ферритин может повышаться при воспалении и «маскировать» реальные запасы. Это хороший вопрос для врача."]);

  if(s.iron==="low" && ["ferritin","hgb","tsat"].every(id=>!has(id) || inRange(s[id])) && has("ferritin"))
    out.push(["info","Снижено только сывороточное железо","Этот показатель сильно колеблется в течение дня и после еды. Сам по себе, без других отклонений, он мало что говорит."]);

  const filled = Object.keys(v);
  if(filled.length>=2 && filled.every(id=>s[id]==="ok"))
    out.push(["ok","Показатели согласуются друг с другом","Все введённые показатели в пределах референса и не противоречат друг другу."]);

  if(!has("ferritin"))
    out.push(["info","Не хватает ферритина","Для оценки запасов железа обычно смотрят ферритин. Без него картина неполная."]);
  if(filled.length===1)
    out.push(["info","Мало данных","Введён один показатель. Показатели железа информативнее вместе."]);

  return out;
}

// Изменение: при росте/падении в 2 раза и больше пишем «в N раза», иначе в процентах
function fmtChange(from, to){
  if(!from) return "—";
  const r = to/from, times = n => n.toLocaleString("ru-RU",{maximumFractionDigits:1});
  if(r >= 2)   return `в ${times(r)} раза`;
  if(r <= 0.5) return `в ${times(1/r)} раза меньше`;
  const p = Math.round((r-1)*100);
  return (p>0?"+":"") + p + "%";
}
function trendInfo(id){
  const pts = sorted().filter(e=>e.values[id]!==undefined);
  if(pts.length<2) return null;
  // сравниваем с последним предыдущим анализом, который не был искажён условиями сдачи
  const before = pts.slice(0,-1), clean = before.filter(e=>!isFlagged(e,id));
  const prevE = (clean.length ? clean : before)[(clean.length ? clean : before).length-1];
  const prev = prevE.values[id], prevDate = prevE.date, last = pts[pts.length-1].values[id];
  const first = pts[0].values[id];
  return { pts, prev, prevDate, last, first,
    pct: prev ? Math.round((last-prev)/prev*100) : 0,
    pctAll: first ? Math.round((last-first)/first*100) : 0 };
}

function chartSVG(id){
  const t = trendInfo(id); if(!t) return "";
  const {min,max} = ref(id);
  const vals = t.pts.map(p=>p.values[id]);
  const lo = Math.min(min, ...vals)*0.8, hi = Math.max(max*0.6>Math.max(...vals)?Math.max(...vals)*1.3:max, ...vals)*1.1;
  const W=320,H=120,pl=8,pr=8,pt=14,pb=22;
  const d0 = t.pts[0].date, span = Math.max(1, daysBetween(d0, t.pts[t.pts.length-1].date));
  const x = i => pl + 14 + daysBetween(d0, t.pts[i].date)/span*(W-pl-pr-28);
  const y = v => pt + (1-(v-lo)/(hi-lo))*(H-pt-pb);
  const bandTop = y(Math.min(max,hi)), bandBot = y(Math.max(min,lo));
  const line = t.pts.map((p,i)=>`${x(i)},${y(p.values[id])}`).join(" ");
  const dots = t.pts.map((p,i)=>{
    const v=p.values[id], st=status(v,id);
    const c = {ok:"#3f8f5b",warn:"#c98a1b",low:"#c0392b",high:"#7b5ea7"}[st];
    const anchor = i===0?"start":i===t.pts.length-1?"end":"middle";
    const fl = isFlagged(p, id);
    return (fl ? `<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#fff" stroke="${c}" stroke-width="2.5"/>`
               : `<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="${c}" stroke="#fff" stroke-width="2"/>`) + `
      <text x="${x(i)}" y="${y(v)-9}" text-anchor="${anchor}" font-size="11" font-weight="700" fill="#2b1d1a">${v}</text>
      <text x="${x(i)}" y="${H-6}" text-anchor="${anchor}" font-size="10" fill="#7a6660">${shortDate(p.date)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${W} ${H}">
    <rect x="0" y="${bandTop}" width="${W}" height="${Math.max(0,bandBot-bandTop)}" fill="#3f8f5b" opacity=".12"/>
    <polyline points="${line}" fill="none" stroke="#b5452f" stroke-width="2.5" stroke-linejoin="round" opacity=".55"/>
    ${(()=>{ const f = fitTrend(id); if(!f) return "";
       const xa = pl+14, xb = W-pr-14, ya = f.a, yb = f.a + f.b*span;
       return `<line x1="${xa}" y1="${y(ya)}" x2="${xb}" y2="${y(yb)}" stroke="#2b1d1a" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>`; })()}
    ${dots}</svg>`;
}

function buildQuestions(v, s){
  const q = [];
  MARKERS.forEach(m=>{
    if(s[m.id]==="low") q.push(`Мой показатель «${m.name}» ниже референса. Что это может значить в моём случае?`);
    if(s[m.id]==="high") q.push(`Мой показатель «${m.name}» выше референса. Нужно ли что-то дополнительно проверить?`);
  });
  MARKERS.forEach(m=>{
    const t = trendInfo(m.id);
    if(t && t.last < t.prev && (s[m.id]==="low"||s[m.id]==="warn"))
      q.push(`«${m.name}» снизился с прошлого анализа. С чем это может быть связано?`);
  });
  if(v.ferritin===undefined) q.push("Стоит ли мне сдать ферритин?");
  const c = sorted().slice(-1)[0].ctx || {};
  if(c.heavy) q.push("У меня обильные месячные. Может ли это влиять на уровень железа и что с этим делать?");
  if(c.sick) q.push("Я недавно болела. Стоит ли пересдать ферритин позже?");
  if(s.hgb==="low") q.push("Нужно ли проверить B12 и фолиевую кислоту?");
  q.push("Когда мне лучше пересдать анализы?");
  return q;
}

/* ---------- личная аналитика ---------- */
const RANK = {low:3, high:3, warn:2, ok:1};
function renderChain(v, s){
  const steps = [
    {name:"Запасы", sub:"ферритин", ids:["ferritin"]},
    {name:"Транспорт", sub:"насыщение, железо", ids:["tsat","iron"]},
    {name:"Гемоглобин", sub:"в крови", ids:["hgb"]}
  ];
  document.getElementById("chain").innerHTML = steps.map((st,i)=>{
    const got = st.ids.filter(id=>s[id]);
    const worst = got.length ? got.map(id=>s[id]).sort((a,b)=>RANK[b]-RANK[a])[0] : "none";
    const lbl = worst==="none" ? "нет данных" : LABEL[worst];
    return (i?'<span class="arrow">→</span>':'') +
      `<div class="step s-${worst}"><b>${st.name}</b>${st.sub}<br><span style="font-size:12px">${lbl}</span></div>`;
  }).join("");
}

function buildFactors(latest){
  const c = latest.ctx, v = latest.values, out = [];
  if(!c){ return [["info","Нет условий сдачи","Отметь их при следующем вводе анализа, и здесь появятся подсказки."]]; }
  if(!c.fasting && v.iron!==undefined)
    out.push(["warn","Сдано не натощак","После еды и приёма препаратов сывороточное железо может быть выше обычного. В этот раз лучше ориентироваться на ферритин и насыщение трансферрина."]);
  if(c.sick)
    out.push(["warn","Недавно болела","При воспалении ферритин может быть выше реальных запасов. Если он в норме, а остальные показатели ниже, обсуди это с врачом."]);
  if(c.heavy)
    out.push(["info","Обильные месячные","Это одна из частых причин потерь железа у женщин. Стоит рассказать об этом врачу, даже если показатели в норме."]);
  if(c.day && c.day<=5)
    out.push(["info",`${c.day}-й день цикла`,"В первые дни цикла гемоглобин и железо могут быть немного ниже, чем в другие дни."]);
  if(c.taking && v.iron!==undefined && !c.fasting)
    out.push(["info","Принимаешь железо","Если препарат был выпит незадолго до анализа, сывороточное железо может быть завышено. Уточни у врача, нужен ли перерыв перед сдачей."]);
  const h = sorted(), heavyN = h.filter(e=>e.ctx&&e.ctx.heavy).length;
  if(h.length>=2 && heavyN>=2)
    out.push(["info","Повторяется",`Обильные месячные отмечены в ${heavyN} из ${h.length} анализов.`]);
  if(!out.length) out.push(["ok","Условия в порядке","Ничего из отмеченного не должно было заметно исказить результаты."]);
  return out;
}

/* ---------- качество данных ---------- */
function entryFlags(e, prev){
  const c = e.ctx || {}, out = [];
  if(c.fasting===false && (e.values.iron!==undefined || e.values.tsat!==undefined))
    out.push({ids:["iron","tsat"], warn:true, text:"Сдано не натощак: сывороточное железо и насыщение могли быть завышены."});
  if(c.sick)
    out.push({ids:["ferritin"], warn:true, text:"Недавно болела: ферритин мог быть выше реальных запасов."});
  if(prev && e.refs && prev.refs){
    const diff = MARKERS.filter(m=>e.refs[m.id] && prev.refs[m.id] &&
      (e.refs[m.id].min!==prev.refs[m.id].min || e.refs[m.id].max!==prev.refs[m.id].max)).map(m=>m.name.toLowerCase());
    if(diff.length) out.push({ids:[], warn:false, text:`Другие нормы на бланке (${diff.join(", ")}), возможно, другая лаборатория. Сравнивай с осторожностью.`});
  }
  return out;
}
function isFlagged(e, id){
  const h = sorted(), i = h.findIndex(x=>x.date===e.date);
  return entryFlags(e, i>0 ? h[i-1] : null).some(f=>f.warn && f.ids.includes(id));
}
function renderQuality(){
  const h = sorted();
  document.getElementById("quality").innerHTML = h.map((e,i)=>{
    const fl = entryFlags(e, i>0 ? h[i-1] : null);
    const bad = fl.some(f=>f.warn);
    const ic = bad ? `<span class="ic" style="background:var(--warn)">!</span>` : fl.length ? `<span class="ic" style="background:var(--info)">i</span>` : `<span class="ic" style="background:var(--ok)">✓</span>`;
    return `<div class="qrow">${ic}<div><b>${fmtDate(e.date)}</b><br>${fl.length ? fl.map(f=>f.text).join("<br>") : "<span class='muted'>Условия сдачи в порядке, результат можно сравнивать.</span>"}</div></div>`;
  }).join("");
}

/* ---------- тренд: линейная регрессия по «чистым» точкам ---------- */
function fitTrend(id){
  const h = sorted().filter(e=>e.values[id]!==undefined);
  if(h.length<2) return null;
  const d0 = h[0].date;
  const pts = h.filter(e=>!isFlagged(e,id)).map(e=>({x:daysBetween(d0,e.date), y:e.values[id], e}));
  const n = pts.length; if(n<2) return null;
  const mx = pts.reduce((a,p)=>a+p.x,0)/n, my = pts.reduce((a,p)=>a+p.y,0)/n;
  const sxx = pts.reduce((a,p)=>a+(p.x-mx)**2,0); if(!sxx) return null;
  const b = pts.reduce((a,p)=>a+(p.x-mx)*(p.y-my),0)/sxx, a = my - b*mx;
  let se = null;
  if(n>=3){ const sse = pts.reduce((s2,p)=>s2+(p.y-(a+b*p.x))**2,0); se = Math.sqrt(sse/(n-2)/sxx); }
  return {a, b, se, n, pts, excluded: h.length-n, lastX: daysBetween(d0, h[h.length-1].date)};
}

/* ---------- самочувствие ---------- */
function pearson(xs, ys){
  const n = xs.length, mx = xs.reduce((a,b)=>a+b,0)/n, my = ys.reduce((a,b)=>a+b,0)/n;
  let sxy=0,sxx=0,syy=0; for(let i=0;i<n;i++){ sxy+=(xs[i]-mx)*(ys[i]-my); sxx+=(xs[i]-mx)**2; syy+=(ys[i]-my)**2; }
  return sxx&&syy ? sxy/Math.sqrt(sxx*syy) : null;
}
function renderSymptoms(){
  const h = sorted().filter(e=>e.sym && e.values.ferritin!==undefined);
  const box = document.getElementById("sym");
  if(!h.length){ box.innerHTML = `<p class="muted">Отмечай самочувствие при вводе анализа, и здесь появится связь с показателями.</p>`; return; }
  const maxF = Math.max(...h.map(e=>e.values.ferritin));
  const dots = n => "●".repeat(n) + "<span style='opacity:.25'>" + "●".repeat(3-n) + "</span>";
  let html = h.map(e=>`<div class="symrow"><div><b>${shortDate(e.date)}</b></div><div>
      <div style="display:flex;align-items:center;gap:8px"><div class="fbar" style="width:${Math.max(4,e.values.ferritin/maxF*70)}%"></div><span>${e.values.ferritin} нг/мл${isFlagged(e,"ferritin")?" ⚠":""}</span></div>
      ${SYMPTOMS.map(x=>`<span class="muted" style="font-size:12px">${x.name.split(",")[0]} <span class="lv">${dots(e.sym[x.id]||0)}</span></span>`).join(" · ")}
    </div></div>`).join("");
  const clean = h.filter(e=>!isFlagged(e,"ferritin"));
  if(clean.length>=3){
    const score = e => SYMPTOMS.reduce((a,x)=>a+(e.sym[x.id]||0),0);
    const r = pearson(clean.map(e=>e.values.ferritin), clean.map(score));
    if(r!==null){
      const strength = Math.abs(r)>=0.7 ? "сильная" : Math.abs(r)>=0.4 ? "умеренная" : "слабая";
      const dir = r<0 ? "чем выше ферритин, тем меньше жалоб" : "жалоб больше при более высоком ферритине";
      html += `<div class="insight ${r<=-0.4?"i-ok":"i-info"}" style="margin-top:12px"><b>${strength[0].toUpperCase()+strength.slice(1)} связь: ${dir}</b>
        По ${clean.length} анализам${clean.length<h.length?` (без ${h.length-clean.length}, где ферритин мог быть искажён)`:""}. Анализов пока мало, поэтому это наблюдение, а не вывод: на самочувствие влияет не только железо.
        <span class="muted" style="display:block;font-size:11px;margin-top:4px">коэффициент корреляции r = ${nf(r,2)}</span></div>`;
    }
  }
  box.innerHTML = html;
}

/* ---------- темп и регулярность ---------- */
function renderPace(){
  const box = document.getElementById("pace"), per = document.getElementById("periods");
  const f = fitTrend("ferritin");
  if(!f){ box.innerHTML = `<p class="muted">Нужно минимум два анализа с ферритином.</p>`; per.innerHTML=""; return; }
  const rate = f.b*30.4, rlo = f.se!==null ? (f.b-f.se)*30.4 : null, rhi = f.se!==null ? (f.b+f.se)*30.4 : null;
  const {min,max} = ref("ferritin"), border = +(min + (max-min)*0.12).toFixed(1);
  const lastFit = f.a + f.b*f.lastX;
  let forecast = "";
  if(rate>0 && lastFit < border){
    const target = lastFit < min ? min : border, need = target - lastFit;
    let when;
    if(rlo!==null && rlo>0) when = `примерно через <b>${Math.max(1,Math.round(need/rhi))}–${Math.ceil(need/rlo)} мес.</b>`;
    else if(rlo!==null) when = `примерно через <b>${Math.ceil(need/rate)} мес.</b>, но разброс большой, и оценка ненадёжна`;
    else when = `примерно через <b>${Math.ceil(need/rate)} мес.</b>`;
    forecast = `<p style="font-size:14px;margin:8px 0 0">Если тренд сохранится, ферритин дойдёт до ${lastFit<min?"нижней границы референса":"уровня вне пограничной зоны"} (${nf(target)} нг/мл) ${when}.</p>`;
  }
  box.innerHTML = `<div class="pace-big" style="color:${rate>0?"var(--ok)":"var(--low)"}">${rate>0?"+":""}${nf(rate)} нг/мл в месяц</div>
    <div class="muted">${rlo!==null ? `вероятный диапазон: от ${nf(rlo)} до ${nf(rhi)} · ` : ""}тренд по ${f.n} анализам${f.excluded?`, ${f.excluded} исключён(ы) как искажённые`:""}</div>${forecast}
    <p class="muted" style="font-size:12px;margin:4px 0 0">Тренд — прямая линия по твоим данным, а не медицинский прогноз.</p>`;

  // интервалы между «чистыми» анализами: регулярность приёма и изменение ферритина
  const P = f.pts.map(p=>p.e), rows = [];
  for(let i=1;i<P.length;i++){
    const a = P[i-1], b = P[i], days = daysBetween(a.date,b.date);
    const taken = intake.filter(d=>d>a.date && d<=b.date).length;
    rows.push({a,b,days,taken,adh: Math.round(taken/days*100), r:(b.values.ferritin-a.values.ferritin)/(days/30.4)});
  }
  let html = rows.map(x=>`<div class="iv">
      <b>${shortDate(x.a.date)} → ${shortDate(x.b.date)}</b> · ${x.days} дн.
      <div class="meter"><i style="width:${Math.min(100,x.adh)}%"></i></div>
      <div class="muted" style="font-size:13px">Отмечено приёмов: ${x.taken} из ${x.days} (${x.adh}%) · ферритин ${x.r>=0?"+":""}${nf(x.r)} нг/мл в мес.</div>
    </div>`).join("");
  const withLog = rows.filter(x=>x.taken>0);
  if(withLog.length>=2){
    const r = withLog.length>=3 ? pearson(withLog.map(x=>x.adh), withLog.map(x=>x.r)) : null;
    const hi = withLog.reduce((p,c)=>c.adh>p.adh?c:p), lo = withLog.reduce((p,c)=>c.adh<p.adh?c:p);
    if(hi!==lo){
      const same = hi.r > lo.r;
      html += `<div class="insight ${same?"i-ok":"i-info"}" style="margin-top:12px"><b>${same?"Регулярность связана с ростом":"Связь не видна"}</b>${
        same ? `При ${hi.adh}% отмеченных приёмов ферритин рос на ${nf(hi.r)} нг/мл в месяц, а при ${lo.adh}% — на ${nf(lo.r)}.`
             : `При более регулярном приёме ферритин не рос быстрее. Это стоит обсудить с врачом.`
      } Это наблюдение по твоим данным, а не доказательство.${r!==null?`<span class="muted" style="display:block;font-size:11px;margin-top:4px">корреляция по ${withLog.length} периодам: r = ${nf(r,2)}</span>`:""}</div>`;
    }
  } else if(!intake.length){
    html += `<p class="muted" style="margin-top:10px">Отмечай приём на вкладке «Режим», и здесь появится связь регулярности с результатами.</p>`;
  }
  per.innerHTML = html;
}

/* ---------- отметки приёма ---------- */
function markTaken(){
  const d = today();
  intake = intake.includes(d) ? intake.filter(x=>x!==d) : intake.concat(d);
  save("intake", intake); renderIntake(); if(typeof renderTimer==="function") renderTimer();
  toast(intake.includes(d) ? "Отмечено ✓" : "Отметка снята");
}
function renderIntake(){
  const d = today(), on = intake.includes(d);
  const btn = document.getElementById("takeBtn");
  btn.textContent = on ? "✓ Сегодня отмечено (нажми, чтобы снять)" : "Я приняла железо сегодня";
  btn.classList.toggle("ghost", on);
  const days = [];
  for(let i=13;i>=0;i--){ const x=new Date(); x.setDate(x.getDate()-i); days.push(iso(x)); }
  document.getElementById("dots").innerHTML = days.map(x=>`<span class="${intake.includes(x)?"on":""}" title="${x}">${+x.slice(-2)}</span>`).join("");
  const n = days.filter(x=>intake.includes(x)).length;
  document.getElementById("intakeStat").textContent = `За последние 14 дней отмечено ${n} из 14 (${Math.round(n/14*100)}%).`;
}

/* ---------- отчёт ---------- */
let lastReportText = "";
function renderReport(){
  const h = sorted();
  const empty = !h.length;
  document.getElementById("report-empty").classList.toggle("hidden", !empty);
  document.getElementById("report").classList.toggle("hidden", empty);
  if(empty){ setAvatar("av-empty","hello"); return; }

  const latest = h[h.length-1], v = latest.values;
  const s = {}; Object.keys(v).forEach(id=>s[id]=status(v[id],id));
  const filled = Object.keys(v);
  const nOk = filled.filter(id=>s[id]==="ok"||s[id]==="warn").length;

  // настроение
  const mood = filled.some(id=>s[id]==="low"||s[id]==="high") ? "low" : filled.some(id=>s[id]==="warn") ? "mid" : "good";
  setAvatar("av-report", mood);
  let sum = MOOD_TEXT[mood];
  const tf = trendInfo("ferritin");
  if(tf && tf.last>tf.prev) sum += ` А ещё ферритин вырос ${fmtChange(tf.prev,tf.last).startsWith('в ') ? fmtChange(tf.prev,tf.last) : 'на '+fmtChange(tf.prev,tf.last).replace('+','')} с ${shortDate(tf.prevDate)} 💪`;
  document.getElementById("summary").textContent = sum;


  // цепочка, факторы, темп
  renderChain(v, s);
  const fac = buildFactors(latest);
  document.getElementById("factors").innerHTML = fac.map(([c,t,d])=>`<div class="insight i-${c}"><b>${t}</b>${d}</div>`).join("");
  renderPace(); renderSymptoms(); renderQuality();
  renderStories();

  // инсайты
  const ins = buildInsights(v, s);
  document.getElementById("insights").innerHTML = ins.map(([c,t,d])=>`<div class="insight i-${c}"><b>${t}</b>${d}</div>`).join("");
  document.getElementById("insights-card").classList.toggle("hidden", !ins.length);

  // карточки
  document.getElementById("latest-date").textContent = "Последний анализ: " + fmtDate(latest.date);
  document.getElementById("results").innerHTML = MARKERS.filter(m=>v[m.id]!==undefined).map(m=>{
    const val = v[m.id], st = s[m.id], {min,max} = ref(m.id);
    const scaleMax = Math.max(max*1.4, val*1.05);
    const pos = Math.min(100, Math.max(0, val/scaleMax*100));
    const text = st==="low"?m.low:st==="high"?m.high:st==="warn"?"В пределах референса, но близко к границе.":m.ok;
    const t = trendInfo(m.id);
    let delta = "";
    if(t && t.prev!==t.last){
      const towards = (st==="low"&&t.last>t.prev)||(st==="high"&&t.last<t.prev)||((st==="ok"||st==="warn"));
      const col = towards ? "var(--ok)" : "var(--low)";
      delta = `<span class="delta" style="color:${col}">${t.last>t.prev?"▲":"▼"} ${fmtChange(t.prev,t.last).replace(/^[+-]/,"")} к ${shortDate(t.prevDate)} (было ${t.prev})</span>`;
    }
    return `<div class="res s-${st}">
      <div class="top"><span class="name">${m.name}</span><span class="val">${val} <span class="muted" style="font-size:13px">${m.unit}</span></span></div>
      <span class="tag">${LABEL[st]}</span>${delta}
      <div class="bar"><div class="zone" style="left:${min/scaleMax*100}%;width:${(max-min)/scaleMax*100}%"></div><div class="dot" style="left:${pos}%"></div></div>
      <div class="muted" style="font-size:12px">референс: ${min}–${max} ${m.unit}</div>
      <div style="font-size:14px;margin-top:6px">${text}</div>
      ${(n=>n?`<div class="sci"><b>Что говорят рекомендации:</b> ${n}</div>`:"")(sciNote(m.id, val, latest.ctx))}
    </div>`;
  }).join("");
  renderSources();

  // динамика
  const charts = MARKERS.map(m=>{
    const svg = chartSVG(m.id); if(!svg) return "";
    const t = trendInfo(m.id);
    return `<div class="chart"><div class="ttl"><span>${m.name}, ${m.unit}</span><span class="muted">${fmtChange(t.first,t.last)} за период</span></div>${svg}</div>`;
  }).join("");
  document.getElementById("charts").innerHTML = charts || `<p class="muted">Добавь второй анализ с другой датой, и здесь появятся графики.</p>`;

  // вопросы врачу
  const qs = buildQuestions(v, s);
  document.getElementById("questions").innerHTML = qs.map(q=>`<li>${q}</li>`).join("");

  // текст для копирования
  lastReportText = [
    `Ferrum — отчёт по анализам (${fmtDate(latest.date)})`, "",
    ...MARKERS.filter(m=>v[m.id]!==undefined).map(m=>{
      const t=trendInfo(m.id), r=ref(m.id);
      return `• ${m.name}: ${v[m.id]} ${m.unit} (реф. ${r.min}–${r.max}) — ${LABEL[s[m.id]]}${t&&t.prev!==t.last?`, ${fmtChange(t.prev,t.last)} к ${shortDate(t.prevDate)}`:""}`;
    }), "", "Наблюдения:", ...ins.map(i=>`• ${i[1]}`), "", "Что могло повлиять:", ...fac.map(i=>`• ${i[1]}`), "", "Вопросы врачу:", ...qs.map((q,i)=>`${i+1}. ${q}`),
    "", "Отчёт не является диагнозом."
  ].join("\n");
}
function copyReport(){
  try{ navigator.clipboard.writeText(lastReportText).then(()=>toast("Отчёт скопирован"),()=>toast("Не удалось скопировать")); }
  catch(e){ toast("Не удалось скопировать"); }
}

/* =========================================================
   ОТЧЁТ В ВИДЕ ИСТОРИЙ: одна карточка — одна мысль
   ========================================================= */
let storyList = [], storyIdx = 0;

function sparkSVG(points, opts={}){
  // points: [{date, v, flagged}]
  if(points.length<2) return "";
  const W=300,H=110,p=16, d0=points[0].date, span=Math.max(1,daysBetween(d0,points[points.length-1].date));
  const vs=points.map(q=>q.v), lo=Math.min(...vs)*0.7, hi=Math.max(...vs)*1.15;
  const x=q=>p+daysBetween(d0,q.date)/span*(W-2*p), y=v=>H-22-(v-lo)/(hi-lo)*(H-40);
  const col = opts.color||"currentColor";
  const line = points.filter(q=>!opts.skipFlagged||!q.flagged);
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="${opts.label||"График"}">
    <polyline points="${line.map(q=>x(q)+","+y(q.v)).join(" ")}" fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round"/>
    ${points.map((q,i)=>`<circle cx="${x(q)}" cy="${y(q.v)}" r="5" fill="${q.flagged?"none":col}" stroke="${col}" stroke-width="2" ${q.flagged&&opts.skipFlagged?'stroke-dasharray="2 2" opacity=".6"':''}/>
      <text x="${x(q)}" y="${y(q.v)-10}" text-anchor="middle" font-size="12" font-weight="600" fill="${col}">${q.v}</text>
      <text x="${x(q)}" y="${H-4}" text-anchor="${i===0?"start":i===points.length-1?"end":"middle"}" font-size="10" fill="${col}" opacity=".6">${shortDate(q.date)}</text>`).join("")}
  </svg>`;
}

function buildStories(){
  const h = sorted(), latest = h[h.length-1], v = latest.values;
  const s = {}; Object.keys(v).forEach(id=>s[id]=status(v[id],id));
  const filled = Object.keys(v);
  const mood = filled.some(id=>s[id]==="low"||s[id]==="high") ? "low" : filled.some(id=>s[id]==="warn") ? "mid" : "good";
  const out = [];

  // 1. Обложка
  const headline = {good:"Запасы в порядке", mid:"Ты на верном пути", low:"Есть что обсудить с врачом"}[mood];
  const sub = {good:"Все показатели в пределах референса.", mid:"Часть показателей пока на границе нормы, но динамика видна.", low:"Некоторые показатели вне референса. Покажи отчёт врачу."}[mood];
  out.push({theme:"garnet", html:`
    <div class="kicker">Отчёт по анализу от ${fmtDate(latest.date)}</div>
    <div class="avatar xl" data-mood="${mood}"></div>
    <h2>${headline}</h2><p style="opacity:.85">${sub}</p>
    <div class="note">${h.length} ${h.length===1?"анализ":h.length<5?"анализа":"анализов"} в истории · нажимай справа, чтобы листать</div>`});

  // 2. Ферритин
  if(v.ferritin!==undefined){
    const t = trendInfo("ferritin"), st = s.ferritin;
    const pts = h.filter(e=>e.values.ferritin!==undefined).map(e=>({date:e.date, v:e.values.ferritin, flagged:isFlagged(e,"ferritin")}));
    const r = ref("ferritin");
    out.push({theme:"pearl", html:`
      <div class="kicker">Ферритин — запасы железа</div>
      <div class="big">${v.ferritin}<small>нг/мл</small></div>
      <div><span class="pill ${st}">${LABEL[st]}</span> <span class="muted">референс ${r.min}–${r.max}</span></div>
      ${t && t.prev!==t.last ? `<p style="font-size:19px">${t.last>t.prev?"Вырос":"Снизился"} ${fmtChange(t.prev,t.last).startsWith("в ")?fmtChange(t.prev,t.last):"на "+fmtChange(t.prev,t.last).replace(/^[+-]/,"")} с ${shortDate(t.prevDate)}: было ${t.prev}, стало ${t.last}.</p>`:""}
      <div class="spacer"></div>
      <div style="color:var(--garnet)">${sparkSVG(pts,{color:"#8E1330",label:"Ферритин по датам"})}</div>
      <div class="note">Пустой кружок — результат, который мог быть искажён условиями сдачи.</div>`});
  }

  // 3. Цепочка
  const steps = [
    {name:"Запасы", sub:"ферритин", ids:["ferritin"]},
    {name:"Транспорт", sub:"насыщение трансферрина, железо", ids:["tsat","iron"]},
    {name:"Гемоглобин", sub:"в крови", ids:["hgb"]}];
  const COL = {ok:"var(--ok)",warn:"var(--warn)",low:"var(--low)",high:"var(--high)",none:"var(--chrome)"};
  out.push({theme:"rose", html:`
    <div class="kicker">Где сейчас отклонения</div>
    <h2>Обычно сначала уходят запасы, и только потом гемоглобин</h2>
    <div class="vchain">${steps.map((st,i)=>{
      const got = st.ids.filter(id=>s[id]);
      const worst = got.length ? got.map(id=>s[id]).sort((a,b)=>RANK[b]-RANK[a])[0] : "none";
      return (i?'<div class="arrow">↓</div>':'')+`<div class="lnk"><i class="dot" style="background:${COL[worst]}"></i><div><b>${st.name}</b><span>${st.sub} · ${worst==="none"?"нет данных":LABEL[worst]}</span></div></div>`;
    }).join("")}</div>`});

  // 4. Очистка данных: показываем, как меняется вывод
  const fPts = h.filter(e=>e.values.ferritin!==undefined);
  const flaggedF = fPts.filter(e=>isFlagged(e,"ferritin"));
  if(flaggedF.length && fPts.length>=3){
    const lastE = fPts[fPts.length-1], rawPrev = fPts[fPts.length-2];
    const t = trendInfo("ferritin");
    const reason = flaggedF.map(e=>`${shortDate(e.date)} ты болела, и ферритин ${e.values.ferritin} мог быть выше реальных запасов`).join("; ");
    const pts = fPts.map(e=>({date:e.date, v:e.values.ferritin, flagged:isFlagged(e,"ferritin")}));
    const rawTxt = `${lastE.values.ferritin<rawPrev.values.ferritin?"упал":"вырос"} ${fmtChange(rawPrev.values.ferritin,lastE.values.ferritin).replace(/^[+-]/,"")} (${rawPrev.values.ferritin} → ${lastE.values.ferritin})`;
    const cleanTxt = `${t.last>=t.prev?"вырос":"снизился"} ${fmtChange(t.prev,t.last).replace(/^[+-]/,"")} (${t.prev} → ${t.last})`;
    out.push({theme:"garnet", html:`
      <div class="kicker">Проверка данных</div>
      <h2>${flaggedF.length===1?"Один результат":"Несколько результатов"} мы не учитываем</h2>
      <p style="opacity:.85">${reason[0].toUpperCase()+reason.slice(1)}.</p>
      <div class="toggle" role="group" aria-label="Сравнить выводы"><button data-clean="0">Без проверки</button><button data-clean="1" class="on">С проверкой</button></div>
      <div class="verdict" data-raw="Ферритин ${rawTxt}" data-clean="Ферритин ${cleanTxt}">Ферритин ${cleanTxt}</div>
      <div class="spacer"></div>
      <div class="cleanchart" data-raw='${sparkSVG(pts.map(q=>({...q,flagged:false})),{color:"#fff",label:"Без проверки"})}' data-clean='${sparkSVG(pts,{color:"#fff",skipFlagged:true,label:"С проверкой"})}'>${sparkSVG(pts,{color:"#fff",skipFlagged:true,label:"С проверкой"})}</div>
      <div class="note">Без проверки вывод был бы противоположным.</div>`});
  }

  // 5. Самочувствие
  const symH = h.filter(e=>e.sym && e.values.ferritin!==undefined);
  const symClean = symH.filter(e=>!isFlagged(e,"ferritin"));
  if(symClean.length>=3){
    const score = e => SYMPTOMS.reduce((a,x)=>a+(e.sym[x.id]||0),0);
    const r = pearson(symClean.map(e=>e.values.ferritin), symClean.map(score));
    if(r!==null){
      const maxF = Math.max(...symH.map(e=>e.values.ferritin));
      const head = r<=-0.4 ? "Чем больше запасов, тем лучше самочувствие" : r>=0.4 ? "Самочувствие не улучшается вместе с ферритином" : "Явной связи с самочувствием пока нет";
      out.push({theme:"pearl", html:`
        <div class="kicker">Самочувствие и ферритин</div>
        <h2>${head}</h2>
        <p class="muted">По ${symClean.length} анализам. Это наблюдение, а не вывод: на самочувствие влияет не только железо.</p>
        <div class="spacer"></div>
        <div class="cols" style="grid-template-columns:repeat(${symH.length},1fr)">${symH.map(e=>`<div class="c">
          <div style="font-weight:600">${e.values.ferritin}${isFlagged(e,"ferritin")?"*":""}</div>
          <div class="fb" style="height:${Math.max(6,e.values.ferritin/maxF*120)}px;opacity:${isFlagged(e,"ferritin")?.35:1}"></div>
          <div class="sd" title="жалобы">${"●".repeat(score(e))}</div>
          <div class="muted" style="font-size:11px">${shortDate(e.date)}</div></div>`).join("")}</div>
        <div class="note">Столбик — ферритин, точки — сумма жалоб (усталость, волосы, ногти). * — не учтено.</div>`});
    }
  }

  // 6. Регулярность приёма
  const f = fitTrend("ferritin");
  if(f){
    const P = f.pts.map(p=>p.e), rows=[];
    for(let i=1;i<P.length;i++){
      const a=P[i-1], b=P[i], days=daysBetween(a.date,b.date), taken=intake.filter(d=>d>a.date&&d<=b.date).length;
      if(taken) rows.push({a,b,adh:Math.round(taken/days*100), r:(b.values.ferritin-a.values.ferritin)/(days/30.4)});
    }
    if(rows.length>=2){
      const hi = rows.reduce((p,c)=>c.adh>p.adh?c:p), lo = rows.reduce((p,c)=>c.adh<p.adh?c:p);
      const better = hi.r>lo.r;
      out.push({theme:"rose", html:`
        <div class="kicker">Регулярность приёма</div>
        <h2>${better ? "Когда приём регулярный, ферритин растёт быстрее" : "Регулярность пока не ускоряет рост"}</h2>
        <div class="cmp">${[lo,hi].map(x=>`<div class="it">
          <b>${shortDate(x.a.date)} → ${shortDate(x.b.date)}</b>
          <div class="meter"><i style="width:${Math.min(100,x.adh)}%"></i></div>
          <div style="font-size:14px">${x.adh}% дней с приёмом · ферритин <b>${x.r>=0?"+":""}${nf(x.r)} нг/мл в месяц</b></div></div>`).join("")}</div>
        <div class="note">По отметкам на вкладке «Режим». Это наблюдение по твоим данным, а не доказательство.</div>`});
    }

    // 7. Темп и прогноз
    const rate=f.b*30.4, rlo=f.se!==null?(f.b-f.se)*30.4:null, rhi=f.se!==null?(f.b+f.se)*30.4:null;
    const {min,max}=ref("ferritin"), border=+(min+(max-min)*0.12).toFixed(1), lastFit=f.a+f.b*f.lastX;
    let eta="";
    if(rate>0 && lastFit<border){
      const target = lastFit<min?min:border, need=target-lastFit;
      eta = (rlo!==null&&rlo>0) ? `${Math.max(1,Math.round(need/rhi))}–${Math.ceil(need/rlo)} мес.` : `около ${Math.ceil(need/rate)} мес.`;
      eta = `<p style="font-size:19px">Если тренд сохранится, ферритин выйдет ${lastFit<min?"в референс":"из пограничной зоны"} (${nf(target)} нг/мл) примерно через <b>${eta}</b></p>`;
    }
    out.push({theme:"pearl", html:`
      <div class="kicker">Темп</div>
      <div class="big" style="color:${rate>0?"var(--garnet)":"var(--low)"}">${rate>0?"+":""}${nf(rate)}<small>нг/мл в месяц</small></div>
      <p class="muted" style="margin-top:8px">${rlo!==null?`Вероятный диапазон: от ${nf(rlo)} до ${nf(rhi)}. `:""}Посчитано по ${f.n} анализам${f.excluded?`, ${f.excluded} не учтён${f.excluded>1?"ы":""} как искажённ${f.excluded>1?"ые":"ый"}`:""}.</p>
      ${eta}
      <div class="note">Тренд — прямая линия по твоим данным, а не медицинский прогноз.</div>`});
  }

  // 8. Вопросы врачу
  const qs = buildQuestions(v, s).slice(0,4);
  out.push({theme:"garnet", html:`
    <div class="kicker">Перед приёмом у врача</div>
    <h2>Что можно спросить</h2>
    <ol class="qlist">${qs.map(q=>`<li>${q}</li>`).join("")}</ol>
    <div class="spacer"></div>
    <button class="btn" data-act="copy">Скопировать отчёт для врача</button>
    <button class="btn ghost" data-act="details">Открыть подробный отчёт</button>
    <div class="note">Ferrum не ставит диагнозы и не заменяет врача.</div>`});
  return out;
}

function renderStories(){
  storyList = buildStories(); storyIdx = 0;
  document.getElementById("storyBars").innerHTML = storyList.map(()=>"<span><i></i></span>").join("");
  showStory(0, true);
}
function showStory(i, instant){
  storyIdx = Math.max(0, Math.min(storyList.length-1, i));
  const st = storyList[storyIdx];
  const stage = document.getElementById("storyStage");
  stage.innerHTML = `<div class="story t-${st.theme}${instant?"":" enter"}">${st.html}</div>`;
  stage.querySelectorAll(".avatar[data-mood]").forEach(el=>{
    const m = el.dataset.mood;
    el.innerHTML = CHARACTER_IMAGES[m] ? `<img src="${CHARACTER_IMAGES[m]}" alt="Бобрёнок Ферра">` : feraSVG(m);
  });
  const bars = document.getElementById("storyBars");
  bars.classList.toggle("dark", st.theme!=="garnet");
  [...bars.children].forEach((b,k)=>b.classList.toggle("done", k<=storyIdx));
}
function storyAction(e){
  const t = e.target.closest("button");
  if(t && t.dataset.clean!==undefined){
    const story = t.closest(".story"), key = t.dataset.clean==="1" ? "clean" : "raw";
    story.querySelectorAll(".toggle button").forEach(b=>b.classList.toggle("on", b===t));
    const v = story.querySelector(".verdict"); v.textContent = v.dataset[key];
    const c = story.querySelector(".cleanchart"); c.innerHTML = c.dataset[key];
    return true;
  }
  if(t && t.dataset.act==="copy"){ copyReport(); return true; }
  if(t && t.dataset.act==="details"){ toggleDetails(true); return true; }
  return !!t;
}
(function initStories(){
  const el = document.getElementById("stories");
  el.addEventListener("click", e=>{
    if(storyAction(e)) return;
    const r = el.getBoundingClientRect();
    showStory(storyIdx + ((e.clientX - r.left) < r.width*0.33 ? -1 : 1));
  });
  el.addEventListener("keydown", e=>{
    if(e.key==="ArrowRight"){ showStory(storyIdx+1); e.preventDefault(); }
    if(e.key==="ArrowLeft"){ showStory(storyIdx-1); e.preventDefault(); }
  });
  let sx=null;
  el.addEventListener("touchstart", e=>{ sx = e.touches[0].clientX; }, {passive:true});
  el.addEventListener("touchend", e=>{
    if(sx===null) return; const dx = e.changedTouches[0].clientX - sx; sx=null;
    if(Math.abs(dx)>50){ showStory(storyIdx + (dx<0?1:-1)); e.preventDefault(); }
  });
})();
function toggleDetails(forceOpen){
  const d = document.getElementById("details"), btn = document.getElementById("detailsBtn");
  const open = forceOpen===true ? true : d.classList.contains("hidden");
  d.classList.toggle("hidden", !open);
  btn.textContent = open ? "Скрыть подробный отчёт" : "Открыть подробный отчёт";
  if(open) d.scrollIntoView({behavior:"smooth", block:"start"});
}

/* ---------- режим и напоминания ---------- */
let reminder = load("reminder", null);
function shift(t, mins){
  const [h,m] = t.split(":").map(Number);
  const d = (h*60+m+mins+1440)%1440;
  return String(Math.floor(d/60)).padStart(2,"0")+":"+String(d%60).padStart(2,"0");
}
function renderTimeline(){
  const box = document.getElementById("timeline");
  const ics = document.getElementById("icsBtn"); if(ics) ics.classList.toggle("hidden", !reminder);
  if(!reminder){ box.innerHTML = `<p class="muted">Укажи время приёма, и здесь появится твой день.</p>`; return; }
  const t = reminder;
  box.innerHTML = `<div class="timeline">
    <div class="tl soft"><b>${shift(t,-120)}</b><br>Дальше лучше без чая, кофе, молочного и яиц: они мешают усвоению железа.</div>
    <div class="tl"><b>${t}</b><br>Приём железа, как назначил врач. Витамин C помогает усвоению.</div>
    <div class="tl free"><b>${shift(t,120)}</b><br>Всё снова можно.</div>
  </div><p class="muted" style="font-size:12px;margin:0 0 10px">Двухчасовой интервал — из инструкций NHS к препаратам железа<sup>[<a href="https://www.nhs.uk/medicines/ferrous-sulfate/how-and-when-to-take-ferrous-sulfate/" target="_blank" rel="noopener">NHS</a>]</sup>. Если врач сказал иначе, слушай врача.</p>`;
  const sub = document.getElementById("setupSub"); if(sub) sub.textContent = `Каждый день в ${t} · изменить`;
}
function saveReminder(){
  reminder = document.getElementById("doseTime").value;
  if(!reminder) return;
  save("reminder", reminder); renderTimeline(); renderTimer();
  toast("Режим сохранён на " + reminder);
  try{ if("Notification" in window && Notification.permission==="default") Notification.requestPermission(); }catch(e){}
}
let lastFired = "", snoozeUntil = 0;
const pad2 = n => String(n).padStart(2,"0");
function atTime(hhmm, dayOffset=0){ const [h,m]=hhmm.split(":").map(Number); const d=new Date(); d.setHours(h,m,0,0); d.setDate(d.getDate()+dayOffset); return d; }
function fmtLeft(ms){ const t=Math.max(0,Math.floor(ms/1000)); return pad2(Math.floor(t/3600))+":"+pad2(Math.floor(t%3600/60))+":"+pad2(t%60); }
function fmtShort(ms){ const t=Math.max(0,Math.ceil(ms/60000)); return t>=60 ? `${Math.floor(t/60)} ч ${t%60} мин` : `${t} мин`; }

// В каком моменте дня мы сейчас и что показать
function timerState(now=new Date()){
  if(!reminder) return null;
  const dose = atTime(reminder), pause = new Date(dose-2*3600e3), free = new Date(+dose+2*3600e3);
  const taken = intake.includes(today());
  if(now < pause) return {key:"before", calm:true, mood:"hello", phase:"Скоро пауза перед приёмом", target:pause,
    next:`в ${shift(reminder,-120)} начнётся пауза, приём в ${reminder}`, hint:"Пока можно всё. За 2 часа до приёма лучше отказаться от чая, кофе и молочного.",
    pill:`⏱ ${fmtShort(pause-now)} до паузы`, prog:0};
  if(now < dose) return {key:"pause", mood:"mid", phase:"Пауза перед приёмом", target:dose, next:`приём в ${reminder}`,
    hint:"Сейчас лучше без чая, кофе и молочного: они мешают усвоению железа.", pill:`☕ пауза · ${fmtShort(dose-now)} до приёма`,
    prog:(now-pause)/(dose-pause)};
  if(!taken) return {key:"due", mood:"portrait", phase:"Время приёма железа", target:null, since:now-dose,
    next:`по расписанию в ${reminder}`, hint:"Приняла? Отметь — так в отчёте будет видно, как регулярность влияет на ферритин.",
    pill:"⏰ Время приёма — отметь", prog:1, take:true, due:true};
  if(now < free) return {key:"after", mood:"good", phase:"Приём отмечен ✓", target:free, next:`до ${shift(reminder,120)} без чая, кофе и молочного`,
    hint:"Ещё немного подожди с чаем, кофе и молочным, чтобы железо лучше усвоилось.", pill:`✓ ещё ${fmtShort(free-now)} без кофе`,
    prog:(now-dose)/(free-dose)};
  const tomorrow = atTime(shift(reminder,-120), 1);
  return {key:"done", calm:true, mood:"good", phase:"Сегодня всё по плану ✓", target:tomorrow, next:"до завтрашней паузы",
    hint:"Молочное, чай и кофе снова можно.", pill:`✓ всё по плану`, prog:1};
}
let lastMood = "";
function renderTimer(){
  const st = timerState(), box = document.getElementById("timer"), pill = document.getElementById("pill");
  const onRemind = !document.getElementById("p-remind").classList.contains("hidden");
  const inApp = !document.getElementById("s-app").classList.contains("hidden");
  if(!st){ box.classList.add("hidden"); pill.classList.add("hidden"); return; }
  box.classList.remove("hidden"); box.classList.toggle("calm", !!st.calm);
  document.getElementById("tPhase").textContent = st.phase;
  document.getElementById("tCount").textContent = st.target ? fmtLeft(st.target - new Date()) : "сейчас";
  document.getElementById("tNext").textContent = st.since!==undefined && st.since>60000 ? `прошло ${fmtShort(st.since)} · ${st.next}` : st.next;
  document.getElementById("tHint").textContent = st.hint;
  document.getElementById("tBar").style.width = Math.round(Math.min(1,Math.max(0,st.prog))*100)+"%";
  document.getElementById("tTake").classList.toggle("hidden", !st.take);
  if(lastMood !== st.mood){ lastMood = st.mood; const src = CHARACTER_IMAGES[st.mood] || CHARACTER_IMAGES.hello;
    document.getElementById("tAva").innerHTML = src ? `<img src="${src}" alt="">` : ""; }
  pill.textContent = st.pill; pill.classList.toggle("due", !!st.due);
  pill.classList.toggle("hidden", !inApp || onRemind);
}
function openDoseModal(){
  const src = CHARACTER_IMAGES.portrait || CHARACTER_IMAGES.hello;
  document.getElementById("mAva").innerHTML = src ? `<img src="${src}" alt="Бобрёнок с кристаллом железа">` : "";
  document.getElementById("doseModal").classList.remove("hidden");
}
function closeDoseModal(){ document.getElementById("doseModal").classList.add("hidden"); }
function takeNow(fromModal){
  const d = today();
  if(!intake.includes(d)){ intake = intake.concat(d); save("intake", intake); }
  renderIntake(); renderTimer(); closeDoseModal(); toast("Приём отмечен ✓ Следующие 2 часа — без чая и кофе");
}
function snooze(){ snoozeUntil = Date.now() + 10*60e3; closeDoseModal(); toast("Напомню через 10 минут"); }
document.getElementById("doseModal").addEventListener("click", e=>{ if(e.target.id==="doseModal") closeDoseModal(); });

setInterval(()=>{
  renderTimer();
  if(!reminder) return;
  const now = new Date(), hm = pad2(now.getHours())+":"+pad2(now.getMinutes());
  const notify = msg => { try{ if("Notification" in window && Notification.permission==="granted") new Notification("Ferrum", {body: msg}); }catch(e){} };
  if(lastFired !== hm){
    if(hm === shift(reminder,-120)){ lastFired = hm; toast("Через 2 часа приём железа. С этого момента — без чая, кофе и молочного."); notify("Начинается пауза перед приёмом железа"); }
    if(hm === reminder && !intake.includes(today())){ lastFired = hm; openDoseModal(); notify("Время приёма железа"); }
    if(hm === shift(reminder,120)){ lastFired = hm; toast("Прошло 2 часа: чай, кофе и молочное снова можно."); notify("Чай и кофе снова можно"); }
  }
  if(snoozeUntil && Date.now() >= snoozeUntil){ snoozeUntil = 0; if(!intake.includes(today())){ openDoseModal(); notify("Напоминание: время приёма железа"); } }
}, 1000);

/* ---------- календарь (.ics): напоминания работают при закрытом сайте ---------- */
function downloadICS(){
  if(!reminder) return;
  const d = new Date(), ymd = d.getFullYear()+pad2(d.getMonth()+1)+pad2(d.getDate());
  const stamp = new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";
  const esc = x => x.replace(/\\/g,"\\\\").replace(/,/g,"\\,").replace(/;/g,"\\;");
  const plan = [
    [shift(reminder,-120), "Ferrum: через 2 часа приём железа", "Дальше лучше без чая, кофе, молочного и яиц."],
    [reminder, "Ferrum: время приёма железа", "Как назначил врач. Витамин C помогает усвоению."],
    [shift(reminder,120), "Ferrum: всё снова можно", "Прошло 2 часа после приёма."]];
  const ev = plan.map(([tm,title,text],i)=>{ const [h,m]=tm.split(":");
    return ["BEGIN:VEVENT",`UID:ferrum-${ymd}-${i}-${Math.random().toString(36).slice(2)}@ferrum`,`DTSTAMP:${stamp}`,
      `DTSTART:${ymd}T${h}${m}00`,"DURATION:PT10M","RRULE:FREQ=DAILY",`SUMMARY:${esc(title)}`,`DESCRIPTION:${esc(text)}`,
      "BEGIN:VALARM","ACTION:DISPLAY",`DESCRIPTION:${esc(title)}`,"TRIGGER:PT0M","END:VALARM","END:VEVENT"].join("\r\n"); });
  const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Ferrum//RU",...ev,"END:VCALENDAR"].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
  const a = document.createElement("a"); a.href = url; a.download = "ferrum-reminders.ics"; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 2000);
}

/* ---------- проверка перед стартом ---------- */
let gateDemo = false;
function gate(demo){
  gateDemo = demo;
  if(load("gate", false)){ gateYes(); return; }
  document.getElementById("gateNoMsg").classList.add("hidden");
  document.getElementById("gateModal").classList.remove("hidden");
}
function gateYes(demoOnly){
  if(!demoOnly) save("gate", true);
  document.getElementById("gateModal").classList.add("hidden");
  startApp(); if(gateDemo || demoOnly) loadDemo();
}
function gateNo(){ document.getElementById("gateNoMsg").classList.remove("hidden"); }

/* при печати раскрываем все блоки */
window.addEventListener("beforeprint", ()=>document.querySelectorAll("#details details").forEach(d=>d.open=true));

function toast(t){
  const el = document.getElementById("toast");
  el.textContent = t; el.classList.remove("hidden");
  clearTimeout(el._t); el._t = setTimeout(()=>el.classList.add("hidden"), 3500);
}


/* ---------- заставка ---------- */
(function splash(){
  const el = document.getElementById("splash"); if(!el) return;
  const pop = document.getElementById("splashPop");
  if(WAVE.base) pop.innerHTML = waveBeaverHTML();
  else if(CHARACTER_IMAGES.hello) pop.innerHTML = `<img src="${CHARACTER_IMAGES.hello}" alt="">`;
  else pop.innerHTML = feraSVG("hello");
  let done = false;
  const close = () => { if(done) return; done = true; el.classList.add("out"); setTimeout(()=>el.remove(), 600); };
  el.addEventListener("click", close);
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  setTimeout(close, reduce ? 0 : 3400);
})();
/* ---------- старт ---------- */
setAvatar("av-welcome","hello");
renderFields(); renderHistory(); renderIntake();
if(reminder) document.getElementById("doseTime").value = reminder;
renderTimeline(); renderSources();
document.getElementById("setupBox").open = !reminder;
if(load("seen", false)) startApp();

/* ---------- PWA: установка на главный экран и офлайн ---------- */
if("serviceWorker" in navigator && location.protocol.startsWith("http")){
  window.addEventListener("load", ()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
}
