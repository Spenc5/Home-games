/*
  Builds the printable version of The Quest (black and white, for coloring):
    board.pdf  – the board on 2 sheets of letter paper (tape or glue together, then onto cardboard)
    cards.pdf  – all the cards, 9 per sheet, each sheet followed by its backs (print double-sided, flip on the long edge)
    mats.pdf   – player mats and stone tokens to cut out
  The card text comes straight from the game (../index.html), so the printed cards match the app.

  Run:  node print/build.js        (from the-quest/ or the repo root; needs Playwright)
*/
const path = require("path");
const { chromium } = require("playwright");

const HERE = __dirname;
const GAME = "file://" + path.join(HERE, "..", "index.html");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

/* ---------- shared look ---------- */
const FONT = `"Times New Roman", "Liberation Serif", Times, serif`;
const BASE_CSS = `
  @page { size: letter portrait; margin: 0 }
  * { box-sizing: border-box }
  html, body { margin: 0; padding: 0; font-family: ${FONT}; color: #000; background: #fff }
  .page { width: 8.5in; height: 11in; position: relative; overflow: hidden; page-break-after: always; break-after: page }
  .page:last-child { page-break-after: auto; break-after: auto }
  .note { position: absolute; left: 0.25in; right: 0.25in; font-size: 8pt; color: #555; text-align: center }
`;
// Icons from the game, turned into outlines so they can be colored in.
const outline = svg => svg.replace(/fill="currentColor"/g, 'fill="none" stroke="#000" stroke-width="1.4"').replace(/currentColor/g, "#000");
const star5 = (x, y, r) => { let d = ""; for (let i = 0; i < 10; i++){ const a = -Math.PI/2 + i*Math.PI/5, rr = i % 2 ? r*.45 : r; d += (i ? "L" : "M") + (x + Math.cos(a)*rr).toFixed(1) + " " + (y + Math.sin(a)*rr).toFixed(1); } return d + "Z"; };

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(GAME);
  const D = await page.evaluate(() => ({
    CHOICES, SCRIPTURES, STONES, HABITS, SHORT, ACTIVITIES, STORMS, SONGS, ORDS: ORDS.map(o => ({ title:o.title, short:o.short })),
    TALKS, COVENANT, TOGETHER, CFM_FOUND: CFM_CARDS.filter(c => c.deck === "foundation"),
    BOARD, LOOP, FORK, LANE0, LAST, ICONS, HEL512, REPENT,
  }));

  /* ======================================================================
     BOARD: 15.9 × 10.5 inches, split over two letter sheets with a small overlap
     ====================================================================== */
  const W = 1590, H = 1050;                       // board units: 1 unit = 0.01 inch
  const T = { x0:90, y0:90, x1:1500, y1:960, rc:150 };   // the loop runs around this rounded rectangle
  const PRE = { x:320, y:300, r:112 };
  const CK = { x:790, y:575, r:150 };
  const TER = { x:1105, y:430, r:72 }, TEL = { x:1105, y:725, r:72 };

  // sample the rounded rectangle, then place the loop spaces evenly along it
  const pts = [];
  const seg = (ax, ay, bx, by) => { for (let i = 0; i <= 60; i++) pts.push([ax + (bx-ax)*i/60, ay + (by-ay)*i/60]); };
  const arc = (cx, cy, a0, a1) => { for (let i = 0; i <= 30; i++){ const a = a0 + (a1-a0)*i/30; pts.push([cx + Math.cos(a)*T.rc, cy + Math.sin(a)*T.rc]); } };
  seg(T.x0+T.rc, T.y0, T.x1-T.rc, T.y0); arc(T.x1-T.rc, T.y0+T.rc, -Math.PI/2, 0);
  seg(T.x1, T.y0+T.rc, T.x1, T.y1-T.rc); arc(T.x1-T.rc, T.y1-T.rc, 0, Math.PI/2);
  seg(T.x1-T.rc, T.y1, T.x0+T.rc, T.y1); arc(T.x0+T.rc, T.y1-T.rc, Math.PI/2, Math.PI);
  seg(T.x0, T.y1-T.rc, T.x0, T.y0+T.rc); arc(T.x0+T.rc, T.y0+T.rc, Math.PI, 1.5*Math.PI);
  const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i-1] + Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]));
  const total = cum[cum.length-1];
  const at = d => { d = ((d % total) + total) % total; let i = cum.findIndex(c => c >= d); if (i <= 0) i = 1; const t = (d - cum[i-1]) / (cum[i] - cum[i-1] || 1); return { x: pts[i-1][0] + (pts[i][0]-pts[i-1][0])*t, y: pts[i-1][1] + (pts[i][1]-pts[i-1][1])*t }; };
  const step = total / D.LOOP, d0 = 190;
  const POS = [];
  for (let i = 0; i < D.LOOP; i++) POS.push({ ...at(d0 + i*step), r: 54 });
  // the road home: from the fork into the Celestial Kingdom
  const A = POS[D.FORK], ang = Math.atan2(CK.y - A.y, CK.x - A.x);
  const B = { x: CK.x - Math.cos(ang)*(CK.r+8), y: CK.y - Math.sin(ang)*(CK.r+8) };
  const laneN = D.LAST - D.LANE0, L = Math.hypot(B.x-A.x, B.y-A.y), ls = (L - 40) / laneN;
  for (let k = 1; k <= laneN; k++){ const d = ls * k; POS.push({ x: A.x + (B.x-A.x)*d/L, y: A.y + (B.y-A.y)*d/L, r: 45 }); }
  POS.push({ x: CK.x, y: CK.y, r: CK.r });

  const ICON = k => outline(D.ICONS[k] || "");
  const icon = (k, x, y, s) => `<g transform="translate(${x - 12*s} ${y - 12*s}) scale(${s})" fill="none" stroke="#000" stroke-width="${1.5/s*2.2}">${ICON(k)}</g>`;
  const extraIcons = {
    born: (x, y) => `<path d="${star5(x, y, 20)}" fill="none" stroke="#000" stroke-width="3"/>`,
    death: (x, y) => `<path d="M${x-24} ${y+8}h48M${x-18} ${y+8}a18 18 0 0 1 36 0" fill="none" stroke="#000" stroke-width="3"/>${[-50,-20,10,40].map(a => { const r = a*Math.PI/180; return `<line x1="${x+Math.sin(r)*24}" y1="${y+8-Math.cos(r)*24}" x2="${x+Math.sin(r)*31}" y2="${y+8-Math.cos(r)*31}" stroke="#000" stroke-width="2.5"/>`; }).join("")}`,
    spiritworld: (x, y) => `<path d="M${x-22} ${y+10}a10 10 0 0 1 4-19a13 13 0 0 1 24-3a10 10 0 0 1 16 22z" fill="none" stroke="#000" stroke-width="3"/>`,
    resurrection: (x, y) => `<circle cx="${x}" cy="${y+4}" r="11" fill="none" stroke="#000" stroke-width="3"/>${[0,45,90,135,180,225,270,315].map(a => { const r = a*Math.PI/180; return `<line x1="${x+Math.cos(r)*16}" y1="${y+4+Math.sin(r)*16}" x2="${x+Math.cos(r)*23}" y2="${y+4+Math.sin(r)*23}" stroke="#000" stroke-width="2.5"/>`; }).join("")}`,
  };
  const label = (x, y, t, size = 15) => `<text x="${x}" y="${y}" text-anchor="middle" font-family='${FONT}' font-weight="700" font-size="${size}">${esc(t)}</text>`;

  let g = `<rect x="6" y="6" width="${W-12}" height="${H-12}" rx="50" fill="none" stroke="#000" stroke-width="5"/>
    <rect x="20" y="20" width="${W-40}" height="${H-40}" rx="40" fill="none" stroke="#000" stroke-width="1.5"/>`;
  // scenery to color: trees and the house on the rock
  const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" stroke="#000" stroke-width="2.5"><rect x="-6" y="0" width="12" height="28"/><circle cy="-14" r="26"/><path d="M-12 -18q6-8 14-4" fill="none" stroke-width="2"/></g>`;
  [[520,250],[1390,330],[640,860],[520,830],[1000,860],[1250,610],[600,420],[1360,520]].forEach(([x,y]) => g += tree(x, y));
  g += `<g transform="translate(1320 790)" fill="#fff" stroke="#000" stroke-width="3">
      <path d="M-120 70l30-30 40 10 30-25 50 15 40-20 50 50z"/>
      <rect x="-70" y="-20" width="140" height="60"/><path d="M-90 -18L0 -80 90 -18z"/><rect x="-14" y="5" width="28" height="35"/><rect x="34" y="-5" width="22" height="20"/>
      ${[-66,-30,6,42].map(x => `<rect x="${x}" y="40" width="34" height="14"/>`).join("")}</g>
    ${label(1320, 905, "Build your house upon the rock", 17)}`;
  // title
  g += `<text x="1000" y="305" text-anchor="middle" font-family='${FONT}' font-weight="700" font-size="92" fill="#fff" stroke="#000" stroke-width="2.5">THE QUEST</text>`;
  // the loop road (outlined) and the road home
  const loopPts = POS.slice(0, D.LOOP).map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  g += `<polygon points="${loopPts}" fill="none" stroke="#000" stroke-width="134" stroke-linejoin="round"/><polygon points="${loopPts}" fill="none" stroke="#fff" stroke-width="128" stroke-linejoin="round"/>`;
  const lanePts = [POS[D.FORK], ...POS.slice(D.LANE0)].map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  g += `<polyline points="${lanePts}" fill="none" stroke="#000" stroke-width="112" stroke-linecap="round"/><polyline points="${lanePts}" fill="none" stroke="#fff" stroke-width="106" stroke-linecap="round"/>`;
  // Premortal Life circle
  g += `<circle cx="${PRE.x}" cy="${PRE.y}" r="${PRE.r+10}" fill="#fff" stroke="#000" stroke-width="3"/><circle cx="${PRE.x}" cy="${PRE.y}" r="${PRE.r}" fill="#fff" stroke="#000" stroke-width="2"/>`;
  [[-55,-62,11],[48,-66,9],[0,-84,7],[-62,62,8],[60,60,10],[0,82,7],[-88,-30,6],[88,-28,6]].forEach(([dx,dy,r]) => g += `<path d="${star5(PRE.x+dx, PRE.y+dy, r)}" fill="none" stroke="#000" stroke-width="2"/>`);
  g += label(PRE.x, PRE.y - 2, "PREMORTAL LIFE", 22) + label(PRE.x, PRE.y + 24, "Pop a 1 or 6 to be born", 15);
  g += `<path d="M${PRE.x+PRE.r-10} ${PRE.y-60} Q${POS[0].x} ${PRE.y-90} ${POS[0].x} ${POS[0].y+62}" fill="none" stroke="#000" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round"/>
    <path d="M${POS[0].x-9} ${POS[0].y+76}l9-14 9 14" fill="none" stroke="#000" stroke-width="3"/>`;
  // signpost at the fork
  { const f = POS[D.FORK]; const sx = f.x + 140, sy = f.y + 132;
    g += `<g fill="#fff" stroke="#000" stroke-width="2.5"><rect x="${sx-4}" y="${sy}" width="8" height="58"/><path d="M${sx-20} ${sy-34}h150l18 18-18 18h-150z"/></g>
      ${label(sx+60, sy-10, "Road home", 17)}
      ${label(sx+68, sy+20, "4 ordinances + your stones", 12)}`; }
  // the kingdoms
  for (let i = 0; i < 24; i++){ const a = i*Math.PI/12; g += `<line x1="${CK.x+Math.cos(a)*(CK.r+8)}" y1="${CK.y+Math.sin(a)*(CK.r+8)}" x2="${CK.x+Math.cos(a)*(CK.r+(i%2?26:44))}" y2="${CK.y+Math.sin(a)*(CK.r+(i%2?26:44))}" stroke="#000" stroke-width="3" stroke-linecap="round"/>`; }
  g += `<circle cx="${CK.x}" cy="${CK.y}" r="${CK.r}" fill="#fff" stroke="#000" stroke-width="4"/><circle cx="${CK.x}" cy="${CK.y}" r="${CK.r-12}" fill="none" stroke="#000" stroke-width="1.5"/>
    ${label(CK.x, CK.y - 20, "CELESTIAL", 34)}${label(CK.x, CK.y + 18, "KINGDOM", 34)}${label(CK.x, CK.y + 52, "Answer a Scripture card to enter", 14)}
    <circle cx="${TER.x}" cy="${TER.y}" r="${TER.r}" fill="#fff" stroke="#000" stroke-width="3"/>
    <path d="M${TER.x+8} ${TER.y-34} a30 30 0 1 0 22 46 a24 24 0 1 1 -22 -46z" fill="none" stroke="#000" stroke-width="3"/>
    ${label(TER.x, TER.y + TER.r + 24, "Terrestrial", 17)}
    <circle cx="${TEL.x}" cy="${TEL.y}" r="${TEL.r}" fill="#fff" stroke="#000" stroke-width="3"/>
    ${[[-22,-18,13],[20,-24,9],[8,14,14],[-24,24,8],[30,22,7]].map(([dx,dy,r]) => `<path d="${star5(TEL.x+dx, TEL.y+dy, r)}" fill="none" stroke="#000" stroke-width="2.2"/>`).join("")}
    ${label(TEL.x, TEL.y + TEL.r + 24, "Telestial", 17)}`;
  // direction arrows between some loop spaces
  for (let i = 2; i < D.LOOP; i += 5){ const a = POS[i], b = POS[(i+1) % D.LOOP], mx = (a.x+b.x)/2, my = (a.y+b.y)/2, th = Math.atan2(b.y-a.y, b.x-a.x)*180/Math.PI;
    g += `<path d="M-7 -9l12 9-12 9" transform="translate(${mx} ${my}) rotate(${th})" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`; }
  // spaces
  const TL = { scripture:"Scripture", choose:"Choose", storm:"Storm", service:"Service", song:"Song", sabbath:"Sabbath", repent:"Repent", ord:"Ordinance", habit:"Foundation" };
  D.BOARD.forEach((sp, i) => {
    if (i === D.LAST) return;
    const { x, y, r } = POS[i];
    if (sp.type === "mile"){
      const name = { birth:"Born", death:"Death", spiritworld:"Spirit World", resurrection:"Risen" }[sp.mile] || sp.mile;
      g += `<circle cx="${x}" cy="${y}" r="${r+7}" fill="#fff" stroke="#000" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#000" stroke-width="2"/>`;
      g += (extraIcons[sp.mile === "birth" ? "born" : sp.mile] || (() => ""))(x, y - 12) + label(x, y + r - 14, name, name.length > 8 ? 12.5 : 15);
      return;
    }
    g += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#000" stroke-width="3.5"/>`;
    if (sp.type === "ord") g += `<circle cx="${x}" cy="${y}" r="${r-7}" fill="none" stroke="#000" stroke-width="1.5"/>`;
    if (sp.type === "repent") g += `<circle cx="${x}" cy="${y}" r="${r+9}" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="4 5"/>`;
    const k = sp.type === "habit" ? "land" : sp.type === "ord" ? "mile" : sp.type;
    const name = sp.type === "habit" ? D.SHORT[sp.topic] : sp.type === "storm" ? `Storm ${sp.power}` : TL[sp.type];
    g += icon(k, x, y - 13, 2.1) + label(x, y + 30, name, name.length > 9 ? 12.5 : 15);
  });
  const boardSvg = (vx) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} 0 800 ${H}" style="position:absolute;left:0.25in;top:0.25in;width:8in;height:10.5in">${g}</svg>`;
  const boardHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>
    <div class="page">${boardSvg(0)}
      <svg viewBox="0 0 10 1050" style="position:absolute;left:8.25in;top:0.25in;width:0.1in;height:10.5in"><line x1="0" y1="0" x2="0" y2="1050" stroke="#000" stroke-width="1" stroke-dasharray="6 6"/></svg>
      <div class="note" style="bottom:0.08in">Sheet 1 of 2 · Trim along the dotted line on the right, then lay this sheet over the gray strip on sheet 2.</div></div>
    <div class="page">${boardSvg(790)}
      <div style="position:absolute;left:0.25in;top:0.25in;width:0.1in;height:10.5in;background:rgba(0,0,0,.12)"></div>
      <div class="note" style="bottom:0.08in">Sheet 2 of 2 · Glue sheet 1 over the gray strip on the left.</div></div>
  </body></html>`;

  /* ======================================================================
     CARDS: 2.5 × 3.5 inches, 9 per sheet; each sheet of fronts is followed by its backs
     ====================================================================== */
  // One shuffled stack: every card has the same back. The front says what kind of card it is.
  // No links or sources on printed cards (credits are in SOURCES.md).
  const cards = [];
  const letters = ["A", "B", "C"];
  const QUIZ = "Answer right (you may try twice): take a stone.";
  const SHARE = "Share or do it: take a stone.";
  const opt = (o, k) => `<p class="opt"><b>${letters[k]}.</b> ${esc(o)}</p>`;
  // Choose the Right (quiz): true stories and scripture stories
  D.CHOICES.forEach((c, i) => {
    const goodFirst = i % 2 === 0, opts = goodFirst ? [c.good, c.bad] : [c.bad, c.good], ans = goodFirst ? "A" : "B";
    cards.push({ head: c.friend ? "Choose the Right" : "Scripture Story", icon:"choose",
      body: `${c.friend ? `<p class="src">A true story</p>` : ""}<p>${esc(c.s)}</p><p class="q">${c.friend ? "What would you do?" : "What did they do?"}</p>${opts.map(opt).join("")}`,
      foot: c.friend ? `<b>Answer: ${ans}.</b> What really happened: ${esc(c.did)}` : `<b>Answer: ${ans}.</b> “${esc(c.v.t)}” <b>${esc(c.v.r)}</b>`,
      reward: QUIZ });
  });
  // Missing-word quizzes
  const blankCard = (head, iconK, title, text, answer, wrong, ref, i) => {
    const opts = [answer, ...wrong], order = [[0,1,2],[1,0,2],[1,2,0]][i % 3].map(k => opts[k]), ans = letters[order.indexOf(answer)];
    cards.push({ head, icon:iconK,
      body: `${title ? `<p class="big">${esc(title)}</p>` : ""}<p class="q">Pick the missing word:</p><p class="verse">“${esc(text).replace("___", "<span class='blank'></span>")}”<br><b>${esc(ref)}</b></p>${order.map(opt).join("")}`,
      foot: `<b>Answer: ${ans}. ${esc(answer)}</b>`, reward: QUIZ });
  };
  D.SCRIPTURES.slice(0, 22).forEach((c, i) => blankCard("Scripture", "scripture", "", c.t, c.a, c.w, c.r, i));
  D.HABITS.forEach((t, i) => { const s = D.STONES[t]; blankCard("Foundation", "land", s.name, s.v.t.replace(s.blank, "___"), s.blank, s.w, s.v.r, i + 1); });
  // Deeper cards: stories to talk about, questions to share, things to do, a few covenant quizzes
  const deep = (c, head) => {
    if (c.kind === "mc"){
      deep.n = (deep.n || 0) + 1;
      const opts = [[c.a, c.w[0], c.w[1]], [c.w[0], c.a, c.w[1]], [c.w[0], c.w[1], c.a]][deep.n % 3], ans = letters[opts.indexOf(c.a)];
      cards.push({ head, icon:"mile", body: `<p class="big">${esc(c.q)}</p>${opts.map(opt).join("")}`,
        foot: `<b>Answer: ${ans}.</b> ${c.note ? esc(c.note) : ""}`, reward: QUIZ });
    } else if (c.kind === "talk"){
      cards.push({ head:"Story", icon:"scripture", body: `<p class="src">A true story</p><p>${esc(c.s)}</p><ul class="qs">${c.qs.map(q => `<li>${esc(q)}</li>`).join("")}</ul>`,
        foot: c.did ? `What really happened: ${esc(c.did)}` : "", reward: SHARE });
    } else if (c.kind === "think"){
      cards.push({ head: head || "Think About It", icon:"service", body: `<p class="think">${esc(c.t)}</p>`, foot: c.note ? `${esc(c.note)}` : "", reward: SHARE });
    } else {
      cards.push({ head: head || "Something to Do", icon:"choose", body: `<p class="big">${esc(c.title)}</p><p class="think">${esc(c.t)}</p>`, foot:"", reward: SHARE });
    }
  };
  D.TALKS.forEach(c => deep(c));
  D.COVENANT.forEach(c => deep(c, c.kind === "mc" ? "Covenants" : c.kind === "talk" ? null : c.kind === "think" ? "Covenants · Think" : "Covenants · Do"));
  D.TOGETHER.forEach(c => deep(c));
  D.CFM_FOUND.forEach(c => deep(c));
  D.ACTIVITIES.forEach(a => deep({ kind:"do", title:a.title, t:a.t }));
  D.SONGS.filter(s => /Baptism|Child of God|Sacrament|Temple|Families|Wise Man|Choose/.test(s.t)).forEach(s =>
    cards.push({ head:"Sing Together", icon:"song", body:`<p class="big">${esc(s.t)}</p><p class="think">Sing or hum a verse together!</p>`, foot:"", reward: SHARE }));
  // mix the deck order a little so the printed sheets aren't all one kind (the stack gets shuffled anyway)
  let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = cards.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]]; }

  const cardFront = c => `<div class="card"><div class="hd"><svg viewBox="0 0 24 24" class="ic">${ICON(c.icon)}</svg><span>${esc(c.head)}</span></div>
      <div class="bd">${c.body}</div>${c.reward ? `<div class="rw">${c.reward}</div>` : ""}${c.foot ? `<div class="ft">${c.foot}</div>` : ""}</div>`;
  const cardBack = () => `<div class="card back"><div class="frame"><div class="bk-title">THE QUEST</div>
      <svg viewBox="0 0 120 100" class="bk-ic"><path d="M8 92l18-14 22 4 16-10 24 6 18-8 8 22z" fill="#fff" stroke="#000" stroke-width="2.5"/><g fill="#fff" stroke="#000" stroke-width="2.2">${[0,1,2].map(i => `<rect x="${28+i*22}" y="66" width="20" height="9" rx="2"/>`).join("")}<rect x="34" y="40" width="52" height="26"/><path d="M26 41L60 14l34 27z"/><rect x="54" y="50" width="12" height="16"/></g></svg>
      <div class="bk-name">Build on the rock</div>${[[0.08,0.1],[1.8,0.1],[0.08,2.82],[1.8,2.82]].map(([x,y]) => `<svg class="bk-star" style="left:${x}in;top:${y}in" viewBox="0 0 40 40"><path d="${star5(20,20,16)}" fill="none" stroke="#000" stroke-width="2"/></svg>`).join("")}</div></div>`;
  const CARD_CSS = `
    .grid { position:absolute; left:0.5in; top:0.25in; width:7.5in; height:10.5in; display:grid; grid-template-columns:repeat(3,2.5in); grid-template-rows:repeat(3,3.5in) }
    .card { width:2.5in; height:3.5in; border:0.5pt solid #999; position:relative; padding:0.13in; display:flex; flex-direction:column; overflow:hidden }
    .hd { display:flex; align-items:center; gap:0.06in; border-bottom:1.2pt solid #000; padding-bottom:0.04in; font-weight:700; font-size:10.5pt; text-transform:uppercase; letter-spacing:.05em }
    .ic { width:0.26in; height:0.26in; flex:none }
    .bd { font-size:9.4pt; line-height:1.22; padding-top:0.05in; flex:1; min-height:0 }
    .bd p { margin:0 0 0.045in }
    .bd .big { font-size:12pt; font-weight:700; line-height:1.12 }
    .bd .think { font-size:10.6pt; line-height:1.25 }
    .bd .src { font-size:7.5pt; color:#333; font-style:italic }
    .bd .q { font-weight:700 }
    .bd .opt { padding-left:0.05in }
    .bd .verse { font-style:italic }
    .bd .qs { margin:0.02in 0 0; padding-left:0.16in }
    .bd .qs li { margin-bottom:0.03in }
    .blank { display:inline-block; width:0.55in; border-bottom:1pt solid #000 }
    .rw { font-size:8.2pt; font-weight:700; text-align:right; margin-bottom:0.03in }
    .ft { transform:rotate(180deg); border-bottom:0.8pt dashed #000; padding-bottom:0.04in; font-size:7.6pt; line-height:1.18 }
    .back { padding:0.12in }
    .frame { flex:1; border:2pt solid #000; border-radius:0.14in; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.1in }
    .bk-title { font-size:20pt; font-weight:700; letter-spacing:.08em }
    .bk-ic { width:1.35in; height:1.1in }
    .bk-name { font-size:12pt; font-weight:700; text-transform:uppercase; letter-spacing:.06em; text-align:center }
    .bk-star { position:absolute; width:0.3in; height:0.3in }
  `;
  let cardPages = "";
  for (let i = 0; i < cards.length; i += 9){
    const sheet = cards.slice(i, i + 9);
    const sheetNo = i/9 + 1, of = Math.ceil(cards.length/9);
    const fronts = [...sheet]; while (fronts.length < 9) fronts.push(null);
    cardPages += `<div class="page"><div class="grid">${fronts.map(c => c ? cardFront(c) : `<div></div>`).join("")}</div><div class="note" style="bottom:0.06in">Card sheet ${sheetNo} of ${of} · fronts</div></div>`;
    // backs: mirror each row left-to-right so they line up when flipped on the long edge
    const backs = []; for (let r = 0; r < 3; r++) backs.push(...fronts.slice(r*3, r*3+3).reverse());
    cardPages += `<div class="page"><div class="grid">${backs.map(c => c ? cardBack() : `<div></div>`).join("")}</div><div class="note" style="bottom:0.06in">Card sheet ${sheetNo} of ${of} · backs</div></div>`;
  }
  const cardsHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}${CARD_CSS}</style></head><body>${cardPages}</body></html>`;

  /* ======================================================================
     MATS: 2 player mats per sheet, then a sheet of stone tokens
     ====================================================================== */
  const mat = () => `<div class="mat">
      <div class="mrow"><span class="lbl">Name</span><span class="line"></span></div>
      <div class="mbody">
        <svg viewBox="0 0 300 230" class="house">
          <path d="M10 222l40-28 50 10 40-22 60 14 50-18 40 30v14H10z" fill="#fff" stroke="#000" stroke-width="2.5"/>
          ${[0,1,2,3,4,5].map(i => { const row = i < 3 ? 0 : 1, col = i % 3, x = 54 + col*66, y = row ? 128 : 160; return `<rect x="${x}" y="${y}" width="62" height="28" rx="4" fill="#fff" stroke="#000" stroke-width="2" ${i >= 4 ? 'stroke-dasharray="6 4"' : ""}/><text x="${x+31}" y="${y+19}" text-anchor="middle" font-family='${FONT}' font-size="13" fill="#666">${i+1}</text>`; }).join("")}
          <rect x="80" y="62" width="140" height="66" fill="#fff" stroke="#000" stroke-width="2.5"/>
          <path d="M66 64L150 10l84 54z" fill="#fff" stroke="#000" stroke-width="2.5"/>
          <rect x="136" y="88" width="28" height="40" fill="#fff" stroke="#000" stroke-width="2"/><rect x="96" y="80" width="26" height="22" fill="#fff" stroke="#000" stroke-width="2"/><rect x="178" y="80" width="26" height="22" fill="#fff" stroke="#000" stroke-width="2"/>
        </svg>
        <div class="mside">
          <div class="mh">My foundation</div>
          <div class="small">Put a stone on each spot. Short game: 4 stones. Long game: 6 stones (the dashed spots too).</div>
          <div class="mh" style="margin-top:0.12in">My ordinances</div>
          ${D.ORDS.map((o, i) => `<div class="ord"><span class="box"></span>${i+1}. ${esc(o.title)}</div>`).join("")}
          <div class="small">Land on an Ordinance space to get the next one. Baptism and Confirmation gives +1 in every storm.</div>
        </div>
      </div>
      <div class="tallies"><div class="tally"><b>Blessings ★</b><span></span></div><div class="tally"><b>Storms overcome</b><span></span></div></div>
    </div>`;
  const MAT_CSS = `
    .mat { position:absolute; left:0.4in; right:0.4in; height:5in; border:2pt solid #000; border-radius:0.2in; padding:0.18in 0.22in; display:flex; flex-direction:column; gap:0.1in }
    .mrow { display:flex; align-items:flex-end; gap:0.1in; font-size:14pt; font-weight:700 }
    .mrow .line { flex:1; border-bottom:1pt solid #000; height:0.3in }
    .mbody { display:flex; gap:0.2in; flex:1; min-height:0 }
    .house { width:3.6in; height:auto; flex:none }
    .mside { flex:1; font-size:11pt }
    .mh { font-size:13pt; font-weight:700; border-bottom:1pt solid #000; margin-bottom:0.05in }
    .ord { display:flex; align-items:center; gap:0.08in; margin:0.05in 0 }
    .box { width:0.2in; height:0.2in; border:1.5pt solid #000; flex:none }
    .small { font-size:9pt; color:#333; margin-top:0.04in }
    .tallies { display:flex; gap:0.2in }
    .tally { flex:1; border:1pt solid #000; border-radius:0.08in; height:0.75in; padding:0.05in 0.1in; font-size:10.5pt }
    .tokens { position:absolute; left:0.5in; top:0.45in; width:7.5in; display:grid; grid-template-columns:repeat(5,1.5in); grid-auto-rows:0.8in }
    .tok { border:0.5pt solid #999; display:flex; align-items:center; justify-content:center }
  `;
  const stoneTok = `<svg viewBox="0 0 120 64" style="width:1.25in;height:0.66in"><rect x="4" y="6" width="112" height="52" rx="8" fill="#fff" stroke="#000" stroke-width="3"/><path d="M14 22q10-6 22 0M70 44q12-6 26 0M50 16l6 4" fill="none" stroke="#000" stroke-width="2"/></svg>`;
  const matsHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}${MAT_CSS}</style></head><body>
    <div class="page"><div style="top:0.35in">${mat()}</div>${mat().replace('class="mat"', 'class="mat" style="top:5.65in"')}<div class="note" style="bottom:0.08in">Player mats · cut along the outline</div></div>
    <div class="page">${mat().replace('class="mat"', 'class="mat" style="top:0.35in"')}${mat().replace('class="mat"', 'class="mat" style="top:5.65in"')}<div class="note" style="bottom:0.08in">Player mats · cut along the outline</div></div>
    <div class="page"><div class="note" style="top:0.15in;font-size:11pt;color:#000"><b>Foundation stones</b> · color them, then cut them out</div><div class="tokens">${Array(60).fill(`<div class="tok">${stoneTok}</div>`).join("")}</div></div>
  </body></html>`.replace('<div style="top:0.35in">' + mat() + '</div>', mat().replace('class="mat"', 'class="mat" style="top:0.35in"'));

  /* ---------- write the PDFs ---------- */
  for (const [name, html] of [["board", boardHtml], ["cards", cardsHtml], ["mats", matsHtml]]){
    const p = await browser.newPage();
    await p.setContent(html, { waitUntil:"load" });
    await p.pdf({ path: path.join(HERE, `${name}.pdf`), format:"Letter", printBackground:true, preferCSSPageSize:true });
    await p.close();
  }
  console.log(`board.pdf (2 sheets), cards.pdf (${cards.length} cards on ${Math.ceil(cards.length/9)*2} pages), mats.pdf written to ${HERE}`);
  await browser.close();
})();
