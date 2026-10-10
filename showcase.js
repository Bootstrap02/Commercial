/* =====================================================================
   SHOWCASE — a working demo website that performs its own features.
   Everything here is real code (dropdown, carousel, filters, cart,
   validation, modal, login, responsive layout). In normal mode you can
   click it yourself; in presentation mode a cursor drives it.
   ===================================================================== */
(() => {
  const mount = document.getElementById("wsite");
  if (!mount) return;
  const $ = (s, r = mount) => r.querySelector(s);
  const $$ = (s, r = mount) => [...r.querySelectorAll(s)];

  const PRODUCTS = [
    ["Desk lamp", "Lighting", 6500, 38], ["Floor lamp", "Lighting", 18500, 28], ["String lights", "Lighting", 3200, 48], ["Reading light", "Lighting", 5400, 200],
    ["Storage box", "Storage", 3500, 190], ["Shelf basket", "Storage", 5200, 24], ["Throw pillow", "Textiles", 4200, 330], ["Linen throw", "Textiles", 9800, 168]
  ];
  const naira = n => "₦" + n.toLocaleString("en-NG");

  mount.innerHTML = `
  <header class="ws-nav">
    <span class="ws-logo">Northwind Goods</span>
    <nav class="ws-links" aria-label="Demo site menu">
      <a data-go="home">Home</a>
      <div class="ws-dd" id="wsDD"><a>Shop <small>▾</small></a>
        <div class="ws-menu"><a data-go="shop" data-cat="Lighting">Lighting <small>4</small></a><a data-go="shop" data-cat="Storage">Storage <small>2</small></a><a data-go="shop" data-cat="Textiles">Textiles <small>2</small></a></div></div>
      <a data-go="contact">Contact</a>
    </nav>
    <div class="ws-tools"><button class="ws-cartbtn" id="wsCartBtn">Cart<em id="wsBadge">0</em></button><button class="ws-signin" data-go="account">Sign in</button><button class="ws-burger" id="wsBurger" aria-label="Menu">☰</button></div>
  </header>
  <div class="ws-mobilemenu" id="wsMM"><a data-go="home">Home</a><a data-go="shop">Shop</a><a data-go="contact">Contact</a><a data-go="account">Sign in</a></div>
  <div class="ws-pages">
    <section class="ws-page on" data-pg="home">
      <div class="ws-car"><div class="ws-track" id="wsTrack">
        <div class="ws-slide"><h4>Brighter rooms, calmer evenings</h4><p>Lamps and lights for every corner.</p><button class="ws-cta">Shop lighting</button></div>
        <div class="ws-slide"><h4>Storage that disappears</h4><p>Boxes and baskets with good manners.</p><button class="ws-cta">Shop storage</button></div>
        <div class="ws-slide"><h4>Soft textiles for every season</h4><p>Throws, pillows and table linen.</p><button class="ws-cta">Shop textiles</button></div></div>
        <button class="ws-arrow l" id="wsPrev" aria-label="Previous slide">‹</button><button class="ws-arrow r" id="wsNext" aria-label="Next slide">›</button>
        <div class="ws-dots" id="wsDots"><i class="on"></i><i></i><i></i></div></div>
      <div class="ws-tiles"><div><b>Free delivery</b><span>On orders over ₦20,000</span></div><div><b>Easy returns</b><span>Within 14 days</span></div><div><b>Secure payment</b><span>Card or transfer</span></div></div>
    </section>
    <section class="ws-page" data-pg="shop">
      <div class="ws-shophead"><label class="ws-search" id="wsSearchBox">⌕<input id="wsQ" placeholder="Search products" aria-label="Search products"></label>
        <div class="ws-chips" id="wsChips"><button class="on" data-c="All">All</button><button data-c="Lighting">Lighting</button><button data-c="Storage">Storage</button><button data-c="Textiles">Textiles</button></div></div>
      <div class="ws-grid" id="wsGrid">${PRODUCTS.map((p, i) => `<div class="ws-prod" data-n="${p[0].toLowerCase()}" data-c="${p[1]}"><div class="sw" style="--h:${p[3]}"></div><b>${p[0]}</b><span>${naira(p[2])}</span><button data-i="${i}">Add to cart</button></div>`).join("")}<p class="ws-empty">No products match your search.</p></div>
    </section>
    <section class="ws-page" data-pg="contact"><div class="ws-two">
      <form class="ws-form" id="wsForm" novalidate><h5>Talk to us</h5>
        <label class="ws-field" id="fName">Name<input id="iName" autocomplete="off"><small></small></label>
        <label class="ws-field" id="fMail">Email<input id="iMail" autocomplete="off"><small></small></label>
        <label class="ws-field" id="fMsg">Message<textarea id="iMsg" rows="2"></textarea><small></small></label>
        <button class="ws-send" id="wsSend" type="submit">Send message</button></form>
      <div class="ws-faq" id="wsFaq"><h5>Questions</h5>
        <details><summary>How long is delivery?</summary><p>Two to four working days in major cities.</p></details>
        <details><summary>Can I return an item?</summary><p>Yes, within 14 days if it is unused.</p></details>
        <details><summary>Which payments work?</summary><p>Cards and bank transfer.</p></details></div></div></section>
    <section class="ws-page" data-pg="account" id="wsAcc">
      <div class="ws-login"><div class="card"><h5>Welcome back</h5>
        <label class="ws-field">Email<input id="lMail" autocomplete="off"></label><label class="ws-field">Password<input id="lPass" type="password" autocomplete="off"></label>
        <button class="ws-send" id="wsLogin" style="justify-self:stretch">Sign in</button></div></div>
      <div class="ws-dashb"><div class="ws-dh"><b>Dashboard</b><span class="ws-av">A</span></div>
        <div class="ws-kp"><div><small>Orders</small><b>12</b></div><div><small>Status</small><span class="ws-ok">Active</span></div><div><small>Points</small><b>480</b></div></div>
        <div class="ws-bars"><i style="--v:40%"></i><i style="--v:62%"></i><i style="--v:48%"></i><i style="--v:80%"></i><i style="--v:66%"></i><i style="--v:92%"></i></div></div>
    </section>
  </div>
  <aside class="ws-drawer" id="wsDrawer"><h5>Your cart</h5><div class="ws-lines" id="wsLines"></div>
    <div class="ws-total"><span>Total</span><span id="wsTotal">₦0</span></div><button class="ws-pay" id="wsPay">Pay securely</button>
    <div class="ws-done"><div class="ws-tick">✓</div><b>Payment received</b><small>Demo only. No money moves.</small></div></aside>
  <div class="ws-modal" id="wsModal"><div class="box"><button class="ws-x" id="wsX" aria-label="Close">×</button><h5>Get 10% off your first order</h5><p>Join the newsletter and we will send a code.</p>
    <label class="ws-field">Email<input id="mMail" autocomplete="off"></label><button class="ws-send" id="wsSub" style="justify-self:stretch">Subscribe</button></div></div>
  <div class="ws-toast" id="wsToast"></div>
  <svg class="ws-cursor" id="wsCursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l15 9-6.5 1.6L9 19z" fill="#101828" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

  /* ---------- real behaviour ---------- */
  let page = "home", slide = 0, cart = [], toastT = 0;
  const go = (p, cat) => { page = p; $$(".ws-page").forEach(s => s.classList.toggle("on", s.dataset.pg === p)); $("#wsMM").classList.remove("open"); if (cat !== undefined) setCat(cat); };
  const toast = (t) => { const e = $("#wsToast"); e.textContent = t; e.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.remove("show"), 2200); };
  const setSlide = (n) => { slide = (n + 3) % 3; $("#wsTrack").style.transform = `translateX(-${slide * 100}%)`; $$("#wsDots i").forEach((d, i) => d.classList.toggle("on", i === slide)); };
  let cat = "All";
  const filter = () => {
    const q = $("#wsQ").value.trim().toLowerCase(); let n = 0;
    $$(".ws-prod").forEach(p => { const ok = (cat === "All" || p.dataset.c === cat) && p.dataset.n.includes(q); p.classList.toggle("out", !ok); if (ok) n++; });
    $("#wsGrid").classList.toggle("none", n === 0);
  };
  const setCat = (c) => { cat = c; $$("#wsChips button").forEach(b => b.classList.toggle("on", b.dataset.c === c)); filter(); };
  const renderCart = () => {
    $("#wsBadge").textContent = cart.length; const b = $("#wsBadge"); b.classList.add("bump"); setTimeout(() => b.classList.remove("bump"), 250);
    $("#wsLines").innerHTML = cart.map(i => `<div class="ws-line"><span>${PRODUCTS[i][0]}</span><span>${naira(PRODUCTS[i][2])}</span></div>`).join("") || "<small>Your cart is empty.</small>";
    $("#wsTotal").textContent = naira(cart.reduce((s, i) => s + PRODUCTS[i][2], 0));
  };
  const mailOK = v => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v);
  const validate = () => {
    const set = (id, ok, msg) => { const f = $(id); f.classList.toggle("good", ok); f.classList.toggle("bad", !ok && !!msg); f.querySelector("small").textContent = ok ? "Looks good" : msg; };
    const n = $("#iName").value.trim(), m = $("#iMail").value.trim(), t = $("#iMsg").value.trim();
    set("#fName", n.length > 1, n ? "Enter your full name" : ""); set("#fMail", mailOK(m), m ? "Enter a valid email address" : ""); set("#fMsg", t.length > 5, t ? "Write a little more" : "");
    return n.length > 1 && mailOK(m) && t.length > 5;
  };

  mount.addEventListener("click", (e) => {
    const g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go, g.dataset.cat); }
    const c = e.target.closest("#wsChips button"); if (c) setCat(c.dataset.c);
    const a = e.target.closest(".ws-prod button"); if (a) { cart.push(+a.dataset.i); renderCart(); }
    if (e.target.closest("#wsBurger")) $("#wsMM").classList.toggle("open");
    if (e.target.closest("#wsCartBtn")) $("#wsDrawer").classList.toggle("open");
    if (e.target.closest("#wsPay")) { $("#wsDrawer").classList.add("paid"); }
    if (e.target.closest("#wsPrev")) setSlide(slide - 1); if (e.target.closest("#wsNext")) setSlide(slide + 1);
    const d = e.target.closest("#wsDots i"); if (d) setSlide([...d.parentNode.children].indexOf(d));
    if (e.target.closest("#wsLogin")) $("#wsAcc").classList.add("in");
    if (e.target.closest("#wsX") || e.target.closest("#wsSub")) $("#wsModal").classList.remove("open");
  });
  $("#wsQ").addEventListener("input", filter);
  ["#iName", "#iMail", "#iMsg"].forEach(s => $(s).addEventListener("input", validate));
  $("#wsForm").addEventListener("submit", (e) => { e.preventDefault(); if (validate()) toast("Message sent. We will reply soon."); });
  setInterval(() => { if (!document.body.classList.contains("paused") && !running && page === "home" && mount.closest(".scene.on") && !document.body.classList.contains("mode-presenting")) { /* idle autoplay of carousel in normal mode */ if (++idleTick % 5 === 0) setSlide(slide + 1); } }, 1000);
  let idleTick = 0, running = false;

  /* ---------- choreography (pause-aware scheduler) ---------- */
  let queue = [], clock = 0;
  const after = (ms, fn) => queue.push([clock + ms, fn]);
  setInterval(() => {
    if (document.body.classList.contains("paused")) return;
    clock += 50; queue = queue.filter(([t, fn]) => { if (t <= clock) { fn(); return false; } return true; });
  }, 50);
  const cursor = $("#wsCursor");
  const pt = (el) => { const a = mount.getBoundingClientRect(), b = el.getBoundingClientRect(), k = a.width / mount.offsetWidth || 1; return [(b.left - a.left + b.width * .55) / k, (b.top - a.top + b.height * .55) / k]; };
  const moveTo = (sel, ms = 0) => after(ms, () => { const el = typeof sel === "string" ? $(sel) : sel; if (!el) return; const [x, y] = pt(el); cursor.classList.add("on"); cursor.style.transform = `translate(${x}px,${y}px)`; });
  const click = (sel, ms, fn) => after(ms, () => { const el = typeof sel === "string" ? $(sel) : sel; if (!el) return; cursor.classList.remove("click"); void cursor.getBoundingClientRect(); cursor.classList.add("click"); el.classList.add("press"); setTimeout(() => el.classList.remove("press"), 220); fn ? fn(el) : el.click(); });
  const typeInto = (sel, text, ms, speed = 90) => { for (let i = 1; i <= text.length; i++) after(ms + i * speed, () => { const el = $(sel); el.value = text.slice(0, i); el.dispatchEvent(new Event("input")); }); return ms + text.length * speed; };
  const focus = (sel, on) => { const e = $(sel); e && e.classList.toggle("focus", on); };

  function reset() {
    queue = []; clock = 0; running = true;
    go("home"); setCat("All"); $("#wsQ").value = ""; filter(); setSlide(0);
    $("#wsDrawer").classList.remove("open", "paid"); $("#wsModal").classList.remove("open"); $("#wsDD").classList.remove("open"); $$(".ws-menu a").forEach(a => a.classList.remove("hl"));
    $("#wsAcc").classList.remove("in"); ["#iName", "#iMail", "#iMsg", "#lMail", "#lPass", "#mMail"].forEach(s => $(s).value = ""); validate(); $$(".ws-field small").forEach(s => s.textContent = ""); $$(".ws-field").forEach(f => f.classList.remove("good", "bad"));
    $$("#wsFaq details").forEach(d => d.open = false); cart = []; renderCart(); $("#wsBadge").textContent = "0"; $("#wsToast").classList.remove("show"); $("#wsMM").classList.remove("open");
    cursor.classList.remove("on"); cursor.style.transform = "translate(420px,300px)";
    const f = document.getElementById("wbFrame"); f.style.width = "100%"; document.getElementById("wbSize").textContent = "Desktop";
  }

  const scenes = [
    /* 0 dropdown menus */ () => {
      moveTo(".ws-dd > a", 500); after(1000, () => $("#wsDD").classList.add("open"));
      moveTo(".ws-menu a:nth-child(2)", 1700); after(2000, () => $(".ws-menu a:nth-child(2)").classList.add("hl"));
      moveTo(".ws-menu a:nth-child(3)", 3000); after(3200, () => { $$(".ws-menu a").forEach(a => a.classList.remove("hl")); $(".ws-menu a:nth-child(3)").classList.add("hl"); });
      click(".ws-menu a:nth-child(3)", 4300, el => { el.click(); }); after(4500, () => $("#wsDD").classList.remove("open"));
      moveTo(".ws-links a:last-child", 5600);
    },
    /* 1 carousel */ () => {
      moveTo("#wsNext", 600); click("#wsNext", 1300); click("#wsNext", 3000); moveTo("#wsDots i:first-child", 4400); click("#wsDots i:first-child", 5000);
    },
    /* 2 search + filters */ () => {
      go("shop"); moveTo("#wsQ", 400); after(900, () => focus("#wsSearchBox", true)); const e = typeInto("#wsQ", "lamp", 1100, 220);
      after(e + 1300, () => { $("#wsQ").value = ""; filter(); focus("#wsSearchBox", false); });
      moveTo("#wsChips button:nth-child(4)", e + 1500); click("#wsChips button:nth-child(4)", e + 2300); moveTo("#wsChips button:nth-child(1)", e + 3600); click("#wsChips button:nth-child(1)", e + 4100);
    },
    /* 3 cart + checkout */ () => {
      go("shop"); moveTo(".ws-prod:nth-child(1) button", 400); click(".ws-prod:nth-child(1) button", 1000);
      moveTo(".ws-prod:nth-child(3) button", 1700); click(".ws-prod:nth-child(3) button", 2200);
      moveTo("#wsCartBtn", 2900); click("#wsCartBtn", 3400); moveTo("#wsPay", 4300); click("#wsPay", 4900);
    },
    /* 4 forms + validation */ () => {
      go("contact"); moveTo("#iName", 400); after(700, () => focus("#fName input", true)); let t = typeInto("#iName", "Ada Obi", 800, 90);
      after(t + 100, () => focus("#fName input", false)); moveTo("#iMail", t + 300); t = typeInto("#iMail", "ada@shop", t + 700, 90);
      after(t + 200, () => { const el = $("#iMail"); el.value = "ada@shop.ng"; el.dispatchEvent(new Event("input")); });
      moveTo("#iMsg", t + 1400); t = typeInto("#iMsg", "I need a website.", t + 1700, 60);
      moveTo("#wsSend", t + 300); click("#wsSend", t + 900, el => $("#wsForm").requestSubmit());
    },
    /* 5 pop-ups, accordions */ () => {
      go("contact"); validate(); $$(".ws-field small").forEach(s => s.textContent = ""); $$(".ws-field").forEach(f => f.classList.remove("good", "bad"));
      moveTo("#wsFaq details:nth-of-type(1) summary", 500); click("#wsFaq details:nth-of-type(1) summary", 1100, el => el.parentNode.open = true);
      moveTo("#wsFaq details:nth-of-type(2) summary", 2200); click("#wsFaq details:nth-of-type(2) summary", 2800, el => { $("#wsFaq details:nth-of-type(1)").open = false; el.parentNode.open = true; });
      after(3900, () => $("#wsModal").classList.add("open")); moveTo("#mMail", 4300); after(4600, () => typeInto("#mMail", "ada@shop.ng", 0, 60));
      moveTo("#wsSub", 5800); click("#wsSub", 6300);
    },
    /* 6 login + dashboard */ () => {
      go("account"); moveTo("#lMail", 400); let t = typeInto("#lMail", "ada@shop.ng", 700, 70); moveTo("#lPass", t + 200);
      t = typeInto("#lPass", "••••••••", t + 500, 60); moveTo("#wsLogin", t + 300); click("#wsLogin", t + 900);
    },
    /* 7 responsive */ () => {
      const f = document.getElementById("wbFrame"), s = document.getElementById("wbSize");
      after(900, () => { f.style.width = "78%"; s.textContent = "Tablet"; });
      after(2900, () => { f.style.width = "min(330px, 100%)"; s.textContent = "Phone"; });
      after(4700, () => $("#wsMM").classList.add("open")); after(6000, () => $("#wsMM").classList.remove("open"));
      after(6600, () => { f.style.width = "100%"; s.textContent = "Desktop"; });
    }
  ];

  document.addEventListener("stagechange", (e) => {
    if (e.detail.stage.id !== "webStage") return;
    reset(); (scenes[e.detail.index] || (() => {}))();
  });
  reset(); running = false;
})();
