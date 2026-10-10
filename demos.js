
/* =====================================================================
   DEMOS — interactive demo content (all sample data, clearly labelled)
   ===================================================================== */

const Demos = (() => {
  /* ---------- Sample sales data (fictional) ---------- */
  const PRODUCTS = {
    Beverages:  [["Zobo drink", 450], ["Sparkling water", 300], ["Cold brew", 900]],
    Stationery: [["Notebook", 1200], ["Pen set", 800], ["Planner", 2500]],
    Electronics:[["Earbuds", 9500], ["Power bank", 12000], ["Speaker", 15000]],
    Home:       [["Desk lamp", 6500], ["Storage box", 3500], ["Throw pillow", 4200]]
  };
  const LOCATIONS = ["Lagos", "Ibadan", "Abuja", "Port Harcourt", "Enugu"];
  const CUSTOMERS = ["Retail", "Wholesale", "Online"];
  const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const CATEGORIES = ["All", "Beverages", "Stationery", "Electronics", "Home"];

  function rng(seed) { // small deterministic generator so the demo looks the same every time
    return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  const rand = rng(2026);
  const pick = (a) => a[Math.floor(rand() * a.length)];

  const rows = [];
  const cats = Object.keys(PRODUCTS);
  for (let i = 0; i < 90; i++) {
    const cat = cats[i % cats.length];
    const [product, price] = pick(PRODUCTS[cat]);
    const qty = 1 + Math.floor(rand() * 12);
    const monthIdx = Math.floor(rand() * 6);
    const day = 1 + Math.floor(rand() * 27);
    rows.push({ monthIdx, day, product, category: cat, qty, revenue: qty * price,
      location: pick(LOCATIONS), customer: pick(CUSTOMERS) });
  }
  rows.sort((a, b) => b.monthIdx - a.monthIdx || b.day - a.day);

  const naira = (n) => "₦" + Math.round(n).toLocaleString("en-NG");
  const el = (id) => document.getElementById(id);
  const tween = (node, to, fmt, ms = 650) => {
    const from = parseFloat(node.dataset.v || 0), t0 = performance.now();
    const step = (t) => { const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      node.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); else node.dataset.v = to; };
    requestAnimationFrame(step);
  };

  let built = false;
  function buildData() {
    if (built || !el("barChart")) return;
    built = true;
    el("barChart").innerHTML = LOCATIONS.map(l => `<div class="bar"><div class="track"><i style="--v:0%"></i></div><span>${l.split(" ")[0]}</span></div>`).join("");
    el("lineMonths").innerHTML = MONTHS.map(m => `<span>${m}</span>`).join("");
  }

  function renderData(catIndex = 0) {
    buildData();
    if (!el("barChart")) return;
    const cat = CATEGORIES[catIndex];
    const set = cat === "All" ? rows : rows.filter(r => r.category === cat);

    const rev = set.reduce((s, r) => s + r.revenue, 0);
    const qty = set.reduce((s, r) => s + r.qty, 0);
    tween(el("kRev"), rev, naira); tween(el("kQty"), qty, v => Math.round(v).toLocaleString());
    tween(el("kOrd"), set.length, v => Math.round(v)); tween(el("kAvg"), rev / Math.max(1, set.length), naira);

    // bars
    const byLoc = LOCATIONS.map(l => set.filter(r => r.location === l).reduce((s, r) => s + r.revenue, 0));
    const max = Math.max(...byLoc, 1);
    el("barChart").querySelectorAll(".bar i").forEach((b, i) => {
      b.style.setProperty("--v", Math.max(4, byLoc[i] / max * 100) + "%");
    });

    // line
    const byMonth = MONTHS.map((_, m) => set.filter(r => r.monthIdx === m).reduce((s, r) => s + r.revenue, 0));
    const mm = Math.max(...byMonth, 1);
    const pts = byMonth.map((v, i) => [10 + i * 56, 110 - (v / mm) * 92]);
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    el("lineChart").innerHTML =
      `<defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--primary)" stop-opacity=".35"/><stop offset="1" stop-color="var(--primary)" stop-opacity="0"/></linearGradient></defs>` +
      `<path class="area" d="${line} L${pts[5][0]} 120 L${pts[0][0]} 120Z" fill="url(#lg)"/>` +
      `<path class="ln" d="${line}" fill="none" stroke="var(--primary)" stroke-width="2.5" pathLength="1" vector-effect="non-scaling-stroke"/>` +
      pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="var(--bg)" stroke="var(--primary)" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join("");

    renderSheet(cat, set);
  }

  /* ---------- Excel window ---------- */
  const SALES_HEAD = '<tr class="cols"><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr><tr class="hdr"><th>1</th><th>Date</th><th>Product</th><th>Category</th><th>Qty</th><th>Revenue</th><th>Location</th><th>Customer</th></tr>';
  const ENTRY_HEAD = '<tr class="cols"><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr><tr class="hdr"><th>1</th><th>No.</th><th>Full name</th><th>Phone</th><th>Email</th><th>Town</th><th>Status</th><th>Entered</th></tr>';
  const PEOPLE = [["Adaeze Okafor","Lagos"],["Tunde Bakare","Ibadan"],["Chiamaka Eze","Abuja"],["Ibrahim Musa","Kaduna"],["Funke Adeyemi","Lagos"],["Emeka Nwosu","Enugu"],["Zainab Lawal","Abuja"],["Segun Ajayi","Ibadan"],["Ngozi Obi","Lagos"],["Bayo Ogunleye","Ibadan"],["Hauwa Bello","Kano"],["Kelechi Uche","Owerri"]];
  let entryTimer = null, entryCount = 0, mode = "sales";
  function entryRow(i, typing) {
    const [n, t] = PEOPLE[i % PEOPLE.length], id = String(i + 1).padStart(3, "0");
    const mail = n.toLowerCase().replace(/ /g, ".") + "@example.com";
    return `<tr class="${typing ? "new typing" : ""}"><th>${i + 2}</th><td>${id}</td><td>${n}</td><td>0800 000 ${String(1000 + i * 37).slice(-4)}</td><td>${mail}</td><td>${t}</td><td>${i % 5 === 3 ? "Pending" : "Verified"}</td><td>${typing ? "now" : "Today"}</td></tr>`;
  }
  function stopEntry() { clearInterval(entryTimer); entryTimer = null; }
  function setTabs(m) { el("tabSales").classList.toggle("on", m === "sales"); el("tabEntry").classList.toggle("on", m === "entry"); el("xlFile").textContent = m === "sales" ? "Sales_Report_DEMO.xlsx" : "Contact_List_DEMO.xlsx"; }
  function renderSheet(cat, set) {
    if (!el("sheetBody")) return;
    stopEntry(); mode = "sales"; setTabs("sales"); el("sheet").classList.remove("entrymode");
    el("sheetHead").innerHTML = SALES_HEAD;
    el("sheetBody").innerHTML = set.slice(0, 7).map((r, i) =>
      `<tr><th>${i + 2}</th><td>${String(r.day).padStart(2, "0")} ${MONTHS[r.monthIdx]} 2026</td><td>${r.product}</td><td>${r.category}</td><td class="num">${r.qty}</td><td class="num${i === 0 ? " sel" : ""}">${naira(r.revenue)}</td><td>${r.location}</td><td>${r.customer}</td></tr>`).join("");
    el("xlCell").textContent = "E2";
    el("xlFormula").textContent = cat === "All" ? '=SUM(E2:E91)' : `=SUMIFS(E:E,C:C,"${cat}")`;
  }
  function renderEntry() {
    if (!el("sheetBody")) return;
    stopEntry(); mode = "entry"; setTabs("entry"); entryCount = 5;
    el("sheetHead").innerHTML = ENTRY_HEAD;
    el("sheet").classList.add("entrymode");
    const body = el("sheetBody");
    body.innerHTML = Array.from({ length: 5 }, (_, k) => entryRow(k, false)).join("");
    const info = () => { el("xlCell").textContent = "B" + (entryCount + 1); el("xlFormula").textContent = "=COUNTA(B2:B" + (entryCount + 1) + ")  →  " + entryCount + " records"; };
    info();
    entryTimer = setInterval(() => {
      if (document.body.classList.contains("paused")) return;
      body.querySelectorAll("tr.typing").forEach(r => r.classList.remove("typing"));
      body.insertAdjacentHTML("beforeend", entryRow(entryCount, true)); entryCount++;
      if (body.children.length > 7) body.removeChild(body.firstElementChild);
      info();
    }, 1300);
  }

  /* ---------- Support ticket sync ---------- */
  function ticketStage(i) {
    const chip = el("tk1042chip");
    if (!chip) return;
    const states = [["Investigating", ""], ["Investigating", ""], ["In progress", "chip-warn"], ["In progress", "chip-warn"], ["Resolved", "chip-ok"]];
    const [txt, cls] = states[Math.min(i, 4)];
    chip.textContent = txt; chip.className = "chip " + cls;
  }

  /* ---------- Stage change router ---------- */
  document.addEventListener("stagechange", (e) => {
    const { stage, index } = e.detail;
    if (stage.closest("#data")) { renderData(index === 5 ? 0 : index); if (index === 5) renderEntry(); }
    if (stage.closest("#support")) ticketStage(index);
  });

  return { renderData, ticketStage, rows, MONTHS };
})();

/* ---------- Bind SITE_CONFIG / PROJECT_LINKS to the page ---------- */
(function bindConfig() {
  const c = SITE_CONFIG;
  const hrefs = {
    whatsapp: `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`,
    email: `mailto:${c.email}`,
    linkedin: c.linkedin, github: c.github, portfolio: c.portfolio
  };
  document.querySelectorAll("[data-bind]").forEach(n => { const v = c[n.dataset.bind]; if (v) n.textContent = v; });
  document.querySelectorAll("[data-bind-href]").forEach(n => { n.href = hrefs[n.dataset.bindHref] || "#"; });
  document.querySelectorAll("[data-link]").forEach(n => { n.href = PROJECT_LINKS[n.dataset.link] || "#"; });
})();
