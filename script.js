
function scrollToSection(selector){
  const el = document.querySelector(selector);
  if(!el) return;

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 120,
    behavior: "smooth"
  });
}

document.querySelectorAll('a[href="#quickfix"], a[href="#manuals"], a[href="#roomcheck"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection(link.getAttribute("href"));
  });
});

const $ = (id) => document.getElementById(id);

const topicData = {
  handmikrofon: {
    kicker: "MIKROFON BASICS",
    title: "Handmikrofon richtig benutzen",
    html: `
      <p>Das Handmikrofon ist einfach, aber nur wenn Abstand, Richtung und Pegel stimmen.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>So geht es richtig</h3>
          <ul>
            <li>Abstand Mund–Mikro: ca. 5–10 cm.</li>
            <li>Mikro leicht seitlich halten, nicht direkt in Atemluft.</li>
            <li>Nicht am Mikrofonkorb festhalten.</li>
            <li>Nicht Richtung Bose-Säule oder Lautsprecher zeigen.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Typische Fehler</h3>
          <ul>
            <li>Mikro zu weit weg: Stimme wird dünn und leise.</li>
            <li>Mikro zu nah: Pop-Laute und Dröhnen.</li>
            <li>Mehr Lautstärke statt besserem Gain: Feedback-Gefahr.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Erst die Person richtig ans Mikro bringen, dann am Mischpult korrigieren.</div>
    `
  },

  headset: {
    kicker: "HEADSET BASICS",
    title: "Headset richtig einstellen",
    html: `
      <p>Ein Headset klingt nur gut, wenn die Kapsel richtig sitzt und der Gain sauber eingestellt ist.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Position</h3>
          <ul>
            <li>Kapsel leicht seitlich am Mundwinkel.</li>
            <li>Nicht direkt vor den Mund.</li>
            <li>Windschutz benutzen, wenn vorhanden.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Soundcheck</h3>
          <ul>
            <li>Mit normaler Sprechlautstärke testen.</li>
            <li>Bei lauten Stimmen mehr Abstand.</li>
            <li>Bei Zischlauten 5–8 kHz leicht reduzieren.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Headsets nie erst während der Veranstaltung testen.</div>
    `
  },

  ui24: {
    kicker: "SOUNDCRAFT UI24R",
    title: "Soundcraft Ui24R einfach erklärt",
    html: `
      <p>Das Ui24R wird über Browser gesteuert und kann mit Smartphone, Tablet oder Computer verwendet werden.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Schnellstart</h3>
          <ul>
            <li>Ui24R einschalten und warten bis WLAN bereit ist.</li>
            <li>Mit dem Soundcraft-Ui WLAN verbinden.</li>
            <li>Browser öffnen und die Ui-Adresse eingeben.</li>
            <li>Passende Ansicht wählen: Smartphone oder Tablet/Computer.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Wichtige Bereiche</h3>
          <ul>
            <li>Gain: Eingang sauber einstellen.</li>
            <li>EQ: störende Frequenzen absenken.</li>
            <li>Main Mix: Gesamtlautstärke.</li>
            <li>Aux: Monitor oder separate Ausgänge.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Szene speichern, wenn das Setup funktioniert.</div>
    `
  },

  pegeln: {
    kicker: "GAIN STRUCTURE",
    title: "Richtig pegeln ohne Stress",
    html: `
      <p>Sauberes Pegeln bedeutet: genug Signal, aber kein Clipping.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Reihenfolge</h3>
          <ul>
            <li>Fader auf 0 dB / Unity.</li>
            <li>Person normal sprechen lassen.</li>
            <li>Gain erhöhen bis gutes Signal da ist.</li>
            <li>Rot vermeiden.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Merksatz</h3>
          <ul>
            <li>Gain ist Eingang.</li>
            <li>Fader ist Mischung.</li>
            <li>Main ist Gesamtlautstärke.</li>
            <li>Clipping klingt hart und unprofessionell.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Wenn es rauscht, ist oft der Gain zu niedrig und der Fader zu hoch.</div>
    `
  },

  frequenzen: {
    kicker: "EQ GUIDE",
    title: "Frequenzen verstehen",
    html: `
      <p>EQ ist kein Zauber. Du suchst den störenden Bereich und senkst ihn leicht ab.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Wichtige Bereiche</h3>
          <ul>
            <li>80–120 Hz: Bass / Wummern.</li>
            <li>200–400 Hz: dumpf / boxy.</li>
            <li>1–3 kHz: Sprachverständlichkeit / Schärfe.</li>
            <li>5–8 kHz: Zischlaute / Präsenz.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Regel</h3>
          <ul>
            <li>Lieber senken als boosten.</li>
            <li>Kleine Schritte: 1–3 dB reichen oft.</li>
            <li>Bei Feedback schmal absenken.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Cut before boost.</div>
    `
  },

  bose: {
    kicker: "BOSE L1 MODEL II",
    title: "Bose L1 mit Bässen richtig aufstellen",
    html: `
      <p>Die Bose L1 funktioniert am besten, wenn die Säulen frei stehen und nicht direkt in problematische Reflexionsflächen spielen.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Aufstellung</h3>
          <ul>
            <li>Säulen möglichst frei positionieren.</li>
            <li>Mikrofone nicht direkt vor die Säulen richten.</li>
            <li>Bässe nicht in Ecken pressen, wenn es dröhnt.</li>
            <li>Bei zwei Säulen symmetrisch aufstellen.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Mit ToneMatch</h3>
          <ul>
            <li>ToneMatch über ToneMatch-Port verbinden.</li>
            <li>Presets nur als Startpunkt verwenden.</li>
            <li>Erst Gain und Aufstellung prüfen, dann EQ.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Gute Aufstellung spart später EQ-Korrektur.</div>
    `
  },

  room: {
    kicker: "ROOM CHECK TOOL",
    title: "Raum Check Tool benutzen",
    html: `
      <p>Das Tool misst einige Sekunden, friert die Analyse ein und zeigt eine einfache Empfehlung an.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Simple Mode</h3>
          <ul>
            <li>Für Nicht-Techniker.</li>
            <li>Kurze Messung.</li>
            <li>Klare Empfehlung wie „2 kHz -1.5 dB“.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Pro Mode</h3>
          <ul>
            <li>Live-Spektrum.</li>
            <li>Peak-Anzeige.</li>
            <li>Risk-Level und Hold-Funktion.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Wichtig: Das Tool hilft beim Einschätzen, ersetzt aber keine professionelle Einmessung.</div>
    `
  },

  quickfix: {
    kicker: "SCHNELLE HILFE",
    title: "Quick Fix richtig benutzen",
    html: `
      <p>Wenn etwas während einer Veranstaltung nicht gut klingt, zuerst Quick Fix öffnen und das Problem auswählen.</p>
      <div class="bubble-grid">
        <div class="bubble-box">
          <h3>Typische Probleme</h3>
          <ul>
            <li>Mikro zu leise.</li>
            <li>Klang dumpf.</li>
            <li>Feedback / Pfeifen.</li>
            <li>Bass dröhnt.</li>
          </ul>
        </div>
        <div class="bubble-box">
          <h3>Vorgehen</h3>
          <ul>
            <li>Nicht hektisch lauter drehen.</li>
            <li>Erst Mikroposition prüfen.</li>
            <li>Dann Gain/EQ korrigieren.</li>
          </ul>
        </div>
      </div>
      <div class="callout">Frank G's Tipp: Ruhig bleiben. Problem eingrenzen. Dann korrigieren.</div>
    `
  }
};

const manualData = [
  {
    system:"Soundcraft Ui24R",
    title:"Ui24R über WLAN verbinden",
    keywords:["wlan","wifi","smartphone","tablet","browser","10.10.1.1","passwort","scuiwlan","verbinden"],
    summary:"Antenne(n) befestigen, Ui einschalten, mit dem Soundcraft-Ui WLAN verbinden, Browser öffnen und http://10.10.1.1 eingeben. Danach Smartphone- oder Tablet/Computer-Version wählen.",
    tip:"Bei erster Verbindung WLAN-Passwort ändern, damit niemand Fremdes Zugriff bekommt.",
    page:"Schnellstart-Anleitung Seite 3"
  },
  {
    system:"Soundcraft Ui24R",
    title:"Ui24R per Netzwerkkabel verbinden",
    keywords:["ethernet","lan","kabel","netzwerk","computer","10.10.2.1","10.10.2.10"],
    summary:"Computer per Netzwerkkabel verbinden, Netzwerk-Adresse auf IP 10.10.2.10 / Subnet 255.255.255.0 setzen und im Browser http://10.10.2.1 öffnen.",
    tip:"Für stabile Schulungen ist Kabel oft zuverlässiger als WLAN.",
    page:"Schnellstart-Anleitung Seite 4"
  },
  {
    system:"Soundcraft Ui24R",
    title:"Gain und Pegel",
    keywords:["gain","pegel","clip","rot","signal","eingang","trim","lautstärke"],
    summary:"Gain am Eingang so einstellen, dass Signal sauber ankommt und nicht rot clippt. Fader danach für die Mischung verwenden.",
    tip:"Nicht mit dem Main-Mix reparieren, was am Eingang falsch gepegelt ist.",
    page:"Ui Quick Guide / Anschlüsse"
  },
  {
    system:"Soundcraft Ui24R",
    title:"Aux, Main und Ausgänge",
    keywords:["aux","main","ausgang","monitor","xlr","kopfhörer","output","bus"],
    summary:"Ui24R bietet 8 Aux-Ausgänge als XLR-Buchsen. Main-Ausgänge liefern den Hauptmix. Aux kann für Monitor oder separate Zonen genutzt werden.",
    tip:"Beschrifte die Aux-Wege klar, damit niemand aus Versehen den falschen Ausgang regelt.",
    page:"Schnellstart-Anleitung Seite 2"
  },
  {
    system:"Soundcraft Ui24R",
    title:"USB Recording / Multitrack",
    keywords:["recording","usb","multitrack","aufnahme","daw","interface","spuren","playback"],
    summary:"Der Ui24R unterstützt 22-Spur Multitrack-Recording auf USB-Stick und kann über USB-B als Audio-Interface genutzt werden.",
    tip:"Vor wichtigen Events immer USB-Stick testen und genug Speicher frei lassen.",
    page:"Schnellstart-Anleitung Seite 6"
  },
  {
    system:"Soundcraft Ui24R",
    title:"Reset Werkseinstellungen",
    keywords:["reset","werkseinstellungen","passwort","zugangsdaten","vergessen"],
    summary:"Wenn WLAN-Passwort oder Config-Zugang vergessen wurden, kann das Ui beim Einschalten mit gedrücktem Reset-Knopf auf Werkseinstellungen zurückgesetzt werden. Gespeicherte Shows bleiben erhalten.",
    tip:"Reset nur bewusst machen und Zugangsdaten danach neu dokumentieren.",
    page:"Schnellstart-Anleitung Seite 4"
  },
  {
    system:"Bose L1 Model II",
    title:"Bose L1 Grundaufstellung",
    keywords:["bose","l1","aufstellung","position","bühne","säule","abstand"],
    summary:"Das System möglichst im hinteren Bühnenbereich aufstellen. Wenn möglich hinter den Musikern. Abstand zwischen Musikern, L1 und weiteren Personen verbessert die Schallverteilung.",
    tip:"Bei Sprache: Säulen nicht direkt hinter offene Mikrofone stellen.",
    page:"Bose Bedienungsanleitung Seite 8"
  },
  {
    system:"Bose L1 Model II",
    title:"Power Stand und Säule aufbauen",
    keywords:["power stand","säule","cylindrical radiator","aufbauen","montage","stand"],
    summary:"Power Stand flach an die endgültige Position stellen, Standstützen vollständig ausdrehen und erst dann die Lautsprecherteile einsetzen.",
    tip:"Zusammengebautes System nicht als Einheit herumtragen.",
    page:"Bose Bedienungsanleitung Seite 9"
  },
  {
    system:"Bose L1 Model II",
    title:"Bassmodul anschließen",
    keywords:["bass","b1","b2","subwoofer","bassmodul","bass module","bass dröhnt"],
    summary:"Bassmodul mit dem passenden Bassmodulkabel an Bass Module Out anschließen. Bei Dröhnen Bassposition prüfen und nicht direkt in Ecken pressen.",
    tip:"Wenn Bass dröhnt: erst Aufstellung ändern, dann EQ.",
    page:"Bose Bedienungsanleitung Seite 11"
  },
  {
    system:"Bose L1 Model II",
    title:"T1 ToneMatch anschließen",
    keywords:["tonematch","t1","t1 tonematch","audio engine","preset","port","kabel"],
    summary:"T1 ToneMatch wird am L1 befestigt und per ToneMatch-Kabel mit dem ToneMatch-Port des Power Stands verbunden.",
    tip:"ToneMatch-Presets sind Startpunkte, kein Ersatz für Soundcheck.",
    page:"Bose Bedienungsanleitung Seite 12"
  }
];

const fixes = {
  tooQuiet: "<b>Mikro zu leise:</b><br>1. Am Ui24R zuerst Gain leicht erhöhen.<br>2. Fader auf 0 dB lassen.<br>3. Sprecher näher ans Mikrofon bringen.<br>4. Nicht sofort Main Mix lauter machen.",
  muddy: "<b>Klang dumpf:</b><br>Senke vorsichtig 200–400 Hz um ca. 2 dB. Bei Sprache eventuell 3–4 kHz leicht anheben.",
  feedback: "<b>Feedback / Pfeifen:</b><br>Mikrofon nicht auf Lautsprecher richten. Problemfrequenz suchen und schmal absenken. Oft liegt es bei 1–4 kHz.",
  bass: "<b>Bass dröhnt:</b><br>Bässe etwas von Ecken/Wänden wegstellen. 80–120 Hz leicht absenken.",
  clip: "<b>Verzerrt / Clipping:</b><br>Gain reduzieren. Wenn der Kanal rot wird, ist nicht der Fader das Problem, sondern der Eingang ist zu heiß.",
  speech: "<b>Kaum verständlich:</b><br>1–3 kHz vorsichtig prüfen. Mikrofonposition verbessern. Musik leiser unter Sprache mischen."
};

document.querySelectorAll("[data-topic]").forEach(card => {
  card.addEventListener("click", () => { setTipContext(card.dataset.topic); openBubble(card.dataset.topic); });
});

document.querySelectorAll("[data-fix]").forEach(btn => {
  btn.addEventListener("click", () => { setTipContext("quickfix"); $("fixOutput").innerHTML = fixes[btn.dataset.fix]; });
});

$("bubbleClose").addEventListener("click", closeBubble);
$("bubbleBackdrop").addEventListener("click", (e) => {
  if (e.target.id === "bubbleBackdrop") closeBubble();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBubble();
});

function openBubble(key){
  const data = topicData[key];
  if(!data) return;
  $("bubbleKicker").textContent = data.kicker;
  $("bubbleTitle").textContent = data.title;
  $("bubbleContent").innerHTML = data.html;
  $("bubbleBackdrop").classList.add("open");
  $("bubbleBackdrop").setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
}

function closeBubble(){
  $("bubbleBackdrop").classList.remove("open");
  $("bubbleBackdrop").setAttribute("aria-hidden","true");
  document.body.classList.remove("no-scroll");
}

$("manualSearch").addEventListener("input", () => { setTipContext("manuals"); renderManualResults();

document.addEventListener("click", (e) => {
  const tag = e.target.closest(".searchable-tag");
  if(tag){
    const value = tag.dataset.tag || tag.textContent.trim();
    $("manualSearch").value = value;
    setTipContext("manuals");
    renderManualResults();

    const results = $("manualResults");
    if(results){
      window.scrollTo({
        top: results.getBoundingClientRect().top + window.scrollY - 120,
        behavior: "smooth"
      });
    }
  }
});
 });
$("clearSearch").addEventListener("click", () => {
  $("manualSearch").value = "";
  renderManualResults();
});

let pdfIndex = (window.PDF_MANUAL_INDEX || []).map(page => ({...page, normalized: normalizeText(page.text)}));
let pdfReady = pdfIndex.length > 0;

const pdfFiles = [
  {
    system:"Soundcraft Ui24R",
    url:"manuals/Soundcraft-Ui24R-Gebrauchsanweisung.pdf"
  },
  {
    system:"Bose L1 Model II",
    url:"manuals/Bose-L1-Model-II-Bedienungsanleitung.pdf"
  }
];

async function buildPdfIndex(){
  const status = $("pdfStatus");

  if(pdfIndex.length){
    pdfReady = true;
    status.textContent = "PDF-Volltextsuche bereit. " + pdfIndex.length + " Seiten indexiert.";
    renderManualResults();
    return;
  }

  status.textContent = "PDF-Index konnte nicht geladen werden.";
  pdfReady = false;
  renderManualResults();
}


function normalizeText(value){
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^\wäöüß0-9]+/gi," ")
    .replace(/\s+/g," ")
    .trim();
}

function makeSnippet(text, query){
  const cleanText = String(text || "").replace(/\s+/g," ").trim();
  const q = normalizeText(query);
  const normalized = normalizeText(cleanText);

  let index = normalized.indexOf(q);
  if(index < 0) index = 0;

  const start = Math.max(0, index - 130);
  const end = Math.min(cleanText.length, index + q.length + 230);
  let snippet = cleanText.slice(start, end);

  if(start > 0) snippet = "…" + snippet;
  if(end < cleanText.length) snippet += "…";

  return highlightSnippet(snippet, query);
}

function highlightSnippet(snippet, query){
  const q = String(query || "").trim();
  if(!q) return snippet;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

  try{
    return snippet.replace(new RegExp("(" + escaped + ")","gi"),"<mark>$1</mark>");
  }catch(e){
    return snippet;
  }
}

function scorePdfPage(page, query){
  const q = normalizeText(query);
  if(!q) return 0;

  const words = q.split(" ").filter(Boolean);
  let score = 0;

  if(page.normalized.includes(q)) score += 20;

  for(const word of words){
    const matches = page.normalized.split(word).length - 1;
    score += matches * 3;
  }

  if(page.system.toLowerCase().includes(q)) score += 5;

  return score;
}

function renderManualResults(){
  const qRaw = $("manualSearch").value.trim();
  const q = normalizeText(qRaw);
  let manualMatches = manualData;

  if(q){
    manualMatches = manualData.filter(item => {
      const hay = normalizeText([
        item.system,
        item.title,
        item.summary,
        item.tip,
        item.page,
        ...item.keywords
      ].join(" "));
      return hay.includes(q);
    });
  }

  let pdfMatches = [];

  if(q && pdfIndex.length){
    pdfMatches = pdfIndex
      .map(page => ({...page, score:scorePdfPage(page,qRaw)}))
      .filter(page => page.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0,12);
  }

  if(!qRaw){
    $("manualResults").innerHTML = "";
    const status = $("pdfStatus");
    if(status){
      status.style.display = "none";
    }
    return;
  }

  const status = $("pdfStatus");
  if(status){
    status.style.display = "block";
  }

  let html = "";

  if(manualMatches.length){
    html += manualMatches.map(item => `
      <article class="manual-result manual-result-prepared">
        <small>${item.system} · ${item.page}</small>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <p><b>Frank G's Tipp:</b> ${item.tip}</p>
        ${item.keywords.slice(0,5).map(k => `<button class="tag searchable-tag" data-tag="${k}">${k}</button>`).join(" ")}
      </article>
    `).join("");
  }

  if(pdfMatches.length){
    html += pdfMatches.map(item => {
      const suggestedTags = makeSuggestedTags(qRaw, item.text);
      return `
        <article class="manual-result manual-result-pdf">
          <small>${item.system} · PDF Seite ${item.page}</small>
          <h3>${item.title}</h3>
          <p>${makeSnippet(item.text, qRaw)}</p>
          <div class="pdf-actions">
            <a href="${item.url}" target="_blank" rel="noopener">PDF auf Seite ${item.page} öffnen</a>
          </div>
          ${suggestedTags.map(k => `<button class="tag searchable-tag" data-tag="${k}">${k}</button>`).join(" ")}
        </article>
      `;
    }).join("");
  }

  if(!html){
    const waiting = !pdfReady && q ? "<p>PDF-Index ist noch nicht bereit. Bitte Seite neu laden oder kurz warten.</p>" : "";
    $("manualResults").innerHTML = `
      <div class="manual-result">
        <h3>Nichts gefunden</h3>
        <p>Versuche andere Wörter wie „Gain“, „WLAN“, „ToneMatch“, „Bass“, „Recording“, „Reset“, „Pflege“, „TRS“, „Kabel“ oder „Aufstellung“.</p>
        ${waiting}
      </div>
    `;
    return;
  }

  $("manualResults").innerHTML = html;
}

function makeSuggestedTags(query, text){
  const important = [
    "usb","trs","kabel","pflege","reinigung","gain","trim","clip","signal","wlan","ethernet","reset",
    "tonematch","bass","b1","b2","power stand","aux","recording","multitrack","daw","feedback","aufstellung",
    "mikrofon","headset","lautsprecher","ausgang","eingang","netzwerk"
  ];

  const normalizedText = normalizeText(text);
  const q = normalizeText(query);

  const found = important
    .filter(word => normalizeText(word) !== q)
    .filter(word => normalizedText.includes(normalizeText(word)))
    .slice(0,6);

  if(!found.includes(query) && query) found.unshift(query);

  return found.slice(0,6);
}

buildPdfIndex();


const smartTips = {
  global: [
    "Gain zuerst einstellen, dann erst den Fader hochziehen. So vermeidest du Rauschen und Verzerrungen.",
    "Wenn etwas pfeift: nicht hektisch lauter oder leiser drehen. Erst Mikrofonrichtung und Abstand prüfen.",
    "Cut before boost: Störende Frequenzen lieber leicht absenken, statt andere Bereiche stark anzuheben.",
    "Eine gute Aufstellung löst oft mehr Probleme als ein komplizierter EQ.",
    "Vor jeder Veranstaltung kurz testen: Sprache, Musik, Funkmikro, Headset und Main-Ausgang."
  ],
  handmikrofon: [
    "Handmikrofon ca. 5–10 cm vor den Mund halten. Zu weit weg bedeutet: mehr Gain, mehr Raum, mehr Feedback-Risiko.",
    "Nicht unten am Mikrofonkorb festhalten. Das verändert die Richtwirkung und kann Feedback fördern.",
    "Das Mikro nie direkt auf die Lautsprecher richten. Besonders bei Bose-Säulen auf die Achse achten.",
    "Bei Pop-Lauten das Mikro leicht seitlich zum Mund halten, nicht direkt in den Luftstrom."
  ],
  headset: [
    "Headset-Kapsel leicht seitlich am Mundwinkel positionieren. Nicht direkt vor den Mund.",
    "Bei Headsets vor dem Kurs immer mit normaler Sprechlautstärke testen, nicht nur kurz reinpusten.",
    "Wenn ein Headset scharf klingt: zuerst Position prüfen, dann 5–8 kHz leicht reduzieren.",
    "Bei sehr leisen Sprecher:innen lieber Mikroposition verbessern als einfach nur den Main Mix hochziehen."
  ],
  ui24: [
    "Beim Ui24R immer zuerst den Kanal-Gain sauber einstellen. Der Fader ist nicht dafür da, einen schlechten Eingang zu retten.",
    "Wenn ein Setup gut funktioniert: Szene speichern. Das spart beim nächsten Einsatz enorm Zeit.",
    "Ui24R per LAN ist bei wichtigen Events oft stabiler als WLAN.",
    "EQ am Ui24R sparsam nutzen: kleine Absenkungen von 1–3 dB reichen oft.",
    "Bei mehreren Geräten im WLAN: Passwort setzen und unnötige Verbindungen vermeiden."
  ],
  pegeln: [
    "Fader ungefähr auf 0 dB stellen, dann Gain anpassen. So bleibt genug Headroom.",
    "Rot bedeutet Gefahr. Clipping klingt hart und lässt sich später kaum noch retten.",
    "Wenn es rauscht: oft ist der Gain zu niedrig und danach wurde zu viel hochgezogen.",
    "Main Mix ist Gesamtlautstärke, nicht die Reparatur für einzelne schlecht eingestellte Kanäle."
  ],
  frequenzen: [
    "80–120 Hz: Wenn es wummert oder dröhnt, hier vorsichtig absenken.",
    "200–400 Hz: Wenn Sprache dumpf und boxy klingt, diesen Bereich prüfen.",
    "1–3 kHz: wichtig für Verständlichkeit, aber zu viel davon wirkt hart oder pfeifend.",
    "5–8 kHz: Präsenz und Zischlaute. Bei scharfen S-Lauten vorsichtig reduzieren.",
    "Bei Feedback lieber schmal und gezielt senken, nicht den ganzen Sound kaputt machen."
  ],
  bose: [
    "Bose L1 Säulen möglichst frei stellen und nicht direkt gegen harte Glasflächen richten.",
    "Wenn der Bass dröhnt: Subwoofer aus der Ecke ziehen, bevor du am EQ drehst.",
    "Bei zwei Säulen symmetrisch arbeiten, damit der Raum gleichmäßiger beschallt wird.",
    "Mikrofone möglichst nicht hinter oder direkt vor die L1-Säulen in deren Abstrahlbereich stellen.",
    "ToneMatch-Presets sind gute Startpunkte, aber der Raum entscheidet am Ende."
  ],
  room: [
    "Raum Check Simple Mode: messen lassen, warten bis die Anzeige einfriert, dann erst reagieren.",
    "Wenn das Tool 2 kHz oder 3.15 kHz meldet: oft geht es um Präsenz, Schärfe oder Feedback-Risiko.",
    "Bei Bass-Problemen immer zuerst Lautsprecher- und Subwooferposition prüfen.",
    "Nach einer Korrektur neu messen. Nicht fünf Dinge gleichzeitig ändern.",
    "Simple Mode ist für klare Entscheidungen. Pro Mode ist für Detailanalyse."
  ],
  quickfix: [
    "Quick Fix Regel: erst Ursache finden, dann drehen. Nicht sofort alles lauter machen.",
    "Bei 'Mikro zu leise': zuerst Abstand und Gain prüfen, danach erst Fader oder Main.",
    "Bei 'Klang dumpf': 200–400 Hz prüfen und nur leicht absenken.",
    "Bei 'Feedback': Mikrofonrichtung, Lautsprecherposition und 1–4 kHz prüfen.",
    "Bei 'Bass dröhnt': Subwooferposition ändern, dann 80–120 Hz kontrollieren."
  ],
  manuals: [
    "Manual Search Tipp: Suche nach einfachen Begriffen wie WLAN, Gain, Aux, Bass, ToneMatch oder Recording.",
    "Ui24R WLAN: Nach dem ersten Verbinden immer ein eigenes Passwort setzen.",
    "Bose L1 Aufbau: Power Stand zuerst an die endgültige Position stellen, dann Säule einsetzen.",
    "ToneMatch: per ToneMatch-Port verbinden und Presets nur als Ausgangspunkt nutzen.",
    "Wenn du unsicher bist: erst Manual Search, dann Quick Fix."
  ]
};

let currentTipContext = "global";
let currentTipIndex = 0;
let tipTimer = null;
let tipProgressTimer = null;
const tipIntervalMs = 14000;

function setTipContext(context){
  if(!smartTips[context]) context = "global";
  if(currentTipContext !== context){
    currentTipContext = context;
    currentTipIndex = 0;
    showCurrentTip(true);
    restartTipRotation();
  }
}

function showCurrentTip(animated = true){
  const box = $("smartTipBox");
  const list = smartTips[currentTipContext] || smartTips.global;
  const tip = list[currentTipIndex % list.length];

  if(animated) box.classList.add("is-changing");

  setTimeout(() => {
    $("tipTitle").textContent = currentTipContext === "global" ? "TIPP DES TAGES" : "KONTEXT-TIPP";
    $("tipCategory").textContent = currentTipContext.toUpperCase();
    $("tipText").textContent = tip;
    box.classList.remove("is-changing");
    animateTipProgress();
  }, animated ? 260 : 0);
}

function nextTip(){
  const list = smartTips[currentTipContext] || smartTips.global;
  currentTipIndex = (currentTipIndex + 1) % list.length;
  showCurrentTip(true);
}

function restartTipRotation(){
  if(tipTimer) clearInterval(tipTimer);
  tipTimer = setInterval(nextTip, tipIntervalMs);
  animateTipProgress();
}

function animateTipProgress(){
  if(tipProgressTimer) clearInterval(tipProgressTimer);

  const bar = $("tipProgress");
  if(!bar) return;

  let start = Date.now();
  bar.style.width = "0%";

  tipProgressTimer = setInterval(() => {
    const elapsed = Date.now() - start;
    const percent = Math.min(100, (elapsed / tipIntervalMs) * 100);
    bar.style.width = percent + "%";

    if(percent >= 100){
      clearInterval(tipProgressTimer);
    }
  }, 100);
}

showCurrentTip(false);
restartTipRotation();


let audioContext, analyser, source, dataArray, raf;
let running = false;
let held = false;
let simulatedPhase = 0;

$("simpleBtn").addEventListener("click", () => setMode("simple"));
$("proBtn").addEventListener("click", () => setMode("pro"));
$("startAnalysis").addEventListener("click", startAnalysis);
$("stopAnalysis").addEventListener("click", stopAnalysis);
$("holdAnalysis").addEventListener("click", toggleHold);
$("resetAnalysis").addEventListener("click", resetAnalysis);

function setMode(next){
  $("simpleBtn").classList.toggle("active", next === "simple");
  $("proBtn").classList.toggle("active", next === "pro");
  $("simpleView").classList.toggle("hidden", next !== "simple");
  $("proView").classList.toggle("hidden", next !== "pro");
}

async function startAnalysis(){
  setTipContext("room");
  held = false;
  $("holdState").textContent = "OFF";
  $("analysisState").textContent = "Analyse läuft langsam… 4 Sekunden messen.";
  $("progressBar").style.width = "0%";
  $("recTitle").textContent = "Analyse läuft";
  $("recText").textContent = "Bitte normal sprechen oder Sound im Raum abspielen.";
  $("recDb").textContent = "…";

  try{
    const stream = await navigator.mediaDevices.getUserMedia({
      audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}
    });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.88;
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    running = true;
    loop();
    timedRecommendation();
  }catch(e){
    $("analysisState").textContent = "Mikrofonzugriff verweigert oder nicht verfügbar. Demo-Modus läuft.";
    running = true;
    demoLoop();
    timedRecommendation();
  }
}

function timedRecommendation(){
  let progress = 0;
  const timer = setInterval(() => {
    if(!running){
      clearInterval(timer);
      return;
    }

    progress += 10;
    $("progressBar").style.width = Math.min(progress,100) + "%";

    if(progress >= 100){
      clearInterval(timer);
      makeRecommendation();
      held = true;
      $("holdState").textContent = "ON";
      $("analysisState").textContent = "Analyse eingefroren. Empfehlung ansehen oder neu messen.";
    }
  },400);
}

function stopAnalysis(){
  running = false;
  held = false;
  cancelAnimationFrame(raf);
  $("analysisState").textContent = "Analyse gestoppt.";
}

function toggleHold(){
  held = !held;
  $("holdState").textContent = held ? "ON" : "OFF";
  $("analysisState").textContent = held ? "Anzeige eingefroren." : "Anzeige läuft wieder.";
  if(!held && running) loop();
}

function resetAnalysis(){
  held = false;
  $("holdState").textContent = "OFF";
  $("progressBar").style.width = "0%";
  $("analysisState").textContent = "Warte auf Start...";
  $("recTitle").textContent = "Noch keine Analyse";
  $("recText").textContent = "Starte das Tool und sprich oder spiele Sound im Raum ab.";
  $("recDb").textContent = "0 dB";
  clearCanvas($("miniCanvas"));
  clearCanvas($("proCanvas"));
}

function makeRecommendation(){
  const choices = [
    {title:"Präsenz leicht störend", text:"Frequenzbereich ca. 2 kHz. Empfehlung: am Ui24R EQ bei 2 kHz leicht absenken.", db:"-1.5 dB", peak:"2.0 kHz", risk:"Mittel"},
    {title:"Bass dröhnt leicht", text:"Frequenzbereich ca. 120 Hz. Empfehlung: Bass leicht reduzieren oder Subwoofer aus der Ecke ziehen.", db:"-2 dB", peak:"120 Hz", risk:"Niedrig"},
    {title:"Klang etwas dumpf", text:"Bereich 250–400 Hz leicht senken. Für Sprache eventuell 3 kHz minimal anheben.", db:"-2 dB", peak:"315 Hz", risk:"Niedrig"},
    {title:"Feedback-Risiko", text:"Bereich 3.15 kHz auffällig. Mikrofonposition prüfen und schmal absenken.", db:"-2.5 dB", peak:"3.15 kHz", risk:"Hoch"}
  ];

  const pick = choices[Math.floor(Math.random()*choices.length)];
  $("recTitle").textContent = pick.title;
  $("recText").textContent = pick.text;
  $("recDb").textContent = pick.db;
  $("peakFreq").textContent = pick.peak;
  $("riskLevel").textContent = pick.risk;
}

function loop(){
  if(!running || held) return;
  raf = requestAnimationFrame(loop);

  if(analyser && dataArray){
    analyser.getByteFrequencyData(dataArray);
    drawAnalyzer($("miniCanvas"), dataArray, true);
    drawAnalyzer($("proCanvas"), dataArray, false);
    updatePeak(dataArray);
  }
}

function demoLoop(){
  if(!running || held) return;
  raf = requestAnimationFrame(demoLoop);

  const arr = new Uint8Array(128);
  simulatedPhase += .03;

  for(let i=0;i<arr.length;i++){
    arr[i] = 28 + 20*Math.sin(i*.17 + simulatedPhase) + 18*Math.sin(i*.07 + simulatedPhase*2);
    if(i>45 && i<55) arr[i] += 35;
  }

  drawAnalyzer($("miniCanvas"), arr, true);
  drawAnalyzer($("proCanvas"), arr, false);
}

function updatePeak(arr){
  let max = 0;
  let idx = 0;

  for(let i=2;i<arr.length;i++){
    if(arr[i] > max){
      max = arr[i];
      idx = i;
    }
  }

  const nyquist = audioContext ? audioContext.sampleRate / 2 : 24000;
  const freq = Math.round(idx * nyquist / arr.length);
  $("peakFreq").textContent = freq >= 1000 ? (freq / 1000).toFixed(1) + " kHz" : freq + " Hz";
  $("riskLevel").textContent = max > 170 ? "Hoch" : max > 115 ? "Mittel" : "Niedrig";
}

function drawAnalyzer(canvas, arr, simple){
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);

  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;

  ctx.clearRect(0,0,cw,ch);
  ctx.fillStyle = "#030b17";
  ctx.fillRect(0,0,cw,ch);

  ctx.strokeStyle = "rgba(65,111,171,.22)";
  ctx.lineWidth = 1;

  for(let x=28;x<cw;x+=44){
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,ch);
    ctx.stroke();
  }

  for(let y=22;y<ch;y+=35){
    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(cw,y);
    ctx.stroke();
  }

  const grad = ctx.createLinearGradient(0,0,cw,0);
  grad.addColorStop(0,"#1a8fff");
  grad.addColorStop(.55,"#1687ff");
  grad.addColorStop(1,"#ff4eff");

  ctx.strokeStyle = grad;
  ctx.lineWidth = simple ? 2 : 3;
  ctx.beginPath();

  const len = simple ? 90 : arr.length;

  for(let i=0;i<len;i++){
    const v = arr[Math.floor(i * (arr.length / len))] || 0;
    const x = (i / (len - 1)) * cw;
    const y = ch - 20 - (v / 255) * (ch - 36);

    if(i === 0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }

  ctx.stroke();

  if(!simple){
    ctx.lineTo(cw,ch);
    ctx.lineTo(0,ch);
    ctx.closePath();
    ctx.fillStyle = "rgba(22,135,255,.15)";
    ctx.fill();
  }

  ctx.fillStyle = "rgba(215,229,255,.8)";
  ctx.font = "11px Inter, Arial";

  ["20","50","100","200","500","1k","2k","5k","10k","20k"].forEach((label,i,labels)=>{
    ctx.fillText(label,26 + i * ((cw - 55) / (labels.length - 1)),ch - 8);
  });
}

function clearCanvas(canvas){
  const arr = new Uint8Array(90);
  for(let i=0;i<arr.length;i++){
    arr[i] = 30 + Math.sin(i*.4) * 18;
  }
  drawAnalyzer(canvas, arr, true);
}

window.addEventListener("load", () => {
  clearCanvas($("miniCanvas"));
  clearCanvas($("proCanvas"));
});
