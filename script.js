const $ = (id) => document.getElementById(id);
const sidebar = $("sidebar");
$("mobileMenu").addEventListener("click", () => sidebar.classList.toggle("open"));
$("themeBtn").addEventListener("click", () => document.body.classList.toggle("light"));

document.querySelectorAll(".topic-card").forEach(card => {
  card.addEventListener("click", () => {
    const target = document.querySelector(card.dataset.jump);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const fixes = {
  tooQuiet: "<b>Mikro zu leise:</b><br>1. Am Ui24 zuerst Gain leicht erhöhen.<br>2. Fader auf 0 dB lassen.<br>3. Sprecher näher ans Mikrofon bringen.<br>4. Nicht sofort Main Mix lauter machen.",
  muddy: "<b>Klang dumpf:</b><br>Senke vorsichtig 200–400 Hz um ca. 2 dB. Bei Sprache eventuell 3–4 kHz leicht anheben.",
  feedback: "<b>Feedback / Pfeifen:</b><br>Mikrofon nicht auf Lautsprecher richten. Problemfrequenz suchen und schmal absenken. Oft liegt es bei 1–4 kHz.",
  bass: "<b>Bass dröhnt:</b><br>Bässe etwas von Ecken/Wänden wegstellen. 80–120 Hz leicht absenken.",
  clip: "<b>Verzerrt / Clipping:</b><br>Gain reduzieren. Wenn der Kanal rot wird, ist nicht der Fader das Problem, sondern der Eingang ist zu heiß.",
  speech: "<b>Kaum verständlich:</b><br>1–3 kHz vorsichtig prüfen. Mikrofonposition verbessern. Musik leiser unter Sprache mischen."
};
document.querySelectorAll("[data-fix]").forEach(btn => {
  btn.addEventListener("click", () => $("fixOutput").innerHTML = fixes[btn.dataset.fix]);
});

let audioContext, analyser, source, dataArray, raf;
let running = false, held = false, simulatedPhase = 0;

$("simpleBtn").addEventListener("click", () => setMode("simple"));
$("proBtn").addEventListener("click", () => setMode("pro"));
$("startAnalysis").addEventListener("click", startAnalysis);
$("stopAnalysis").addEventListener("click", stopAnalysis);
$("holdAnalysis").addEventListener("click", toggleHold);
$("resetAnalysis").addEventListener("click", resetAnalysis);

function setMode(next) {
  $("simpleBtn").classList.toggle("active", next === "simple");
  $("proBtn").classList.toggle("active", next === "pro");
  $("simpleView").classList.toggle("hidden", next !== "simple");
  $("proView").classList.toggle("hidden", next !== "pro");
}

async function startAnalysis() {
  held = false;
  $("holdState").textContent = "OFF";
  $("analysisState").textContent = "Analyse läuft langsam… 4 Sekunden messen.";
  $("progressBar").style.width = "0%";
  $("recTitle").textContent = "Analyse läuft";
  $("recText").textContent = "Bitte normal sprechen oder Sound im Raum abspielen.";
  $("recDb").textContent = "…";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
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
  } catch (e) {
    $("analysisState").textContent = "Mikrofonzugriff verweigert oder nicht verfügbar. Demo-Modus läuft.";
    running = true;
    demoLoop();
    timedRecommendation();
  }
}

function timedRecommendation() {
  let progress = 0;
  const timer = setInterval(() => {
    if (!running) { clearInterval(timer); return; }
    progress += 10;
    $("progressBar").style.width = Math.min(progress, 100) + "%";
    if (progress >= 100) {
      clearInterval(timer);
      makeRecommendation();
      held = true;
      $("holdState").textContent = "ON";
      $("analysisState").textContent = "Analyse eingefroren. Empfehlung ansehen oder neu messen.";
    }
  }, 400);
}

function stopAnalysis() {
  running = false;
  held = false;
  cancelAnimationFrame(raf);
  $("analysisState").textContent = "Analyse gestoppt.";
}

function toggleHold() {
  held = !held;
  $("holdState").textContent = held ? "ON" : "OFF";
  $("analysisState").textContent = held ? "Anzeige eingefroren." : "Anzeige läuft wieder.";
  if (!held && running) loop();
}

function resetAnalysis() {
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

function makeRecommendation() {
  const choices = [
    { title: "Präsenz leicht störend", text: "Frequenzbereich ca. 2 kHz. Empfehlung: am Ui24 EQ bei 2 kHz leicht absenken.", db: "-1.5 dB", peak: "2.0 kHz", risk: "Mittel" },
    { title: "Bass dröhnt leicht", text: "Frequenzbereich ca. 120 Hz. Empfehlung: Bass leicht reduzieren oder Subwoofer aus der Ecke ziehen.", db: "-2 dB", peak: "120 Hz", risk: "Niedrig" },
    { title: "Klang etwas dumpf", text: "Bereich 250–400 Hz leicht senken. Für Sprache eventuell 3 kHz minimal anheben.", db: "-2 dB", peak: "315 Hz", risk: "Niedrig" },
    { title: "Feedback-Risiko", text: "Bereich 3.15 kHz auffällig. Mikrofonposition prüfen und schmal absenken.", db: "-2.5 dB", peak: "3.15 kHz", risk: "Hoch" }
  ];
  const pick = choices[Math.floor(Math.random() * choices.length)];
  $("recTitle").textContent = pick.title;
  $("recText").textContent = pick.text;
  $("recDb").textContent = pick.db;
  $("peakFreq").textContent = pick.peak;
  $("riskLevel").textContent = pick.risk;
}

function loop() {
  if (!running || held) return;
  raf = requestAnimationFrame(loop);
  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray);
    drawAnalyzer($("miniCanvas"), dataArray, true);
    drawAnalyzer($("proCanvas"), dataArray, false);
    updatePeak(dataArray);
  }
}

function demoLoop() {
  if (!running || held) return;
  raf = requestAnimationFrame(demoLoop);
  const arr = new Uint8Array(128);
  simulatedPhase += .03;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 28 + 20 * Math.sin(i * .17 + simulatedPhase) + 18 * Math.sin(i * .07 + simulatedPhase * 2);
    if (i > 45 && i < 55) arr[i] += 35;
  }
  drawAnalyzer($("miniCanvas"), arr, true);
  drawAnalyzer($("proCanvas"), arr, false);
}

function updatePeak(arr) {
  let max = 0, idx = 0;
  for (let i = 2; i < arr.length; i++) if (arr[i] > max) { max = arr[i]; idx = i; }
  const nyquist = audioContext ? audioContext.sampleRate / 2 : 24000;
  const freq = Math.round(idx * nyquist / arr.length);
  $("peakFreq").textContent = freq >= 1000 ? (freq / 1000).toFixed(1) + " kHz" : freq + " Hz";
  $("riskLevel").textContent = max > 170 ? "Hoch" : max > 115 ? "Mittel" : "Niedrig";
}

function drawAnalyzer(canvas, arr, simple) {
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.clientWidth * devicePixelRatio;
  canvas.height = canvas.clientHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  const cw = canvas.clientWidth, ch = canvas.clientHeight;
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "#030b17";
  ctx.fillRect(0, 0, cw, ch);
  ctx.strokeStyle = "rgba(65,111,171,.22)";
  ctx.lineWidth = 1;
  for (let x = 28; x < cw; x += 44) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke(); }
  for (let y = 22; y < ch; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke(); }
  const grad = ctx.createLinearGradient(0, 0, cw, 0);
  grad.addColorStop(0, "#1a8fff"); grad.addColorStop(.55, "#1687ff"); grad.addColorStop(1, "#ff4eff");
  ctx.strokeStyle = grad;
  ctx.lineWidth = simple ? 2 : 3;
  ctx.beginPath();
  const len = simple ? 90 : arr.length;
  for (let i = 0; i < len; i++) {
    const v = arr[Math.floor(i * (arr.length / len))] || 0;
    const x = (i / (len - 1)) * cw;
    const y = ch - 20 - (v / 255) * (ch - 36);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  if (!simple) { ctx.lineTo(cw, ch); ctx.lineTo(0, ch); ctx.closePath(); ctx.fillStyle = "rgba(22,135,255,.15)"; ctx.fill(); }
  ctx.fillStyle = "rgba(215,229,255,.8)";
  ctx.font = "11px Inter, Arial";
  ["20", "50", "100", "200", "500", "1k", "2k", "5k", "10k", "20k"].forEach((l, i, a) => ctx.fillText(l, 26 + i * ((cw - 55) / (a.length - 1)), ch - 8));
}

function clearCanvas(canvas) {
  const arr = new Uint8Array(90);
  for (let i = 0; i < arr.length; i++) arr[i] = 30 + Math.sin(i * .4) * 18;
  drawAnalyzer(canvas, arr, true);
}
window.addEventListener("load", () => { clearCanvas($("miniCanvas")); clearCanvas($("proCanvas")); });
