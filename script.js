/* ===== BM MOTORS — APP LOGIC ===== */
(function () {
  "use strict";

  var lang = localStorage.getItem("bm_lang") || "en";
  var activeBrand = "all";

  /* ---------- helpers ---------- */
  function t(en, bn) { return lang === "bn" ? bn : en; }

  function waLink(msg) {
    return "https://wa.me/" + CONFIG.phoneCall + "?text=" + encodeURIComponent(msg);
  }
  /* ---------- language ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.body.classList.toggle("bn", lang === "bn");
    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute(lang === "bn" ? "data-bn" : "data-en");
      if (val !== null) el.innerHTML = val;
    });
    var lt = document.getElementById("langToggle");
    lt.textContent = lang === "bn" ? "English" : "বাংলা";
    renderBikes();
    renderContact();
  }

  /* ---------- bikes ---------- */
  function brands() {
    var set = {};
    BIKES.forEach(function (b) { set[b.brand] = true; });
    return Object.keys(set);
  }

  function renderFilters() {
    var wrap = document.getElementById("filters");
    var html = '<button class="chip ' + (activeBrand === "all" ? "active" : "") +
      '" data-brand="all">' + t("All", "সব") + "</button>";
    brands().forEach(function (br) {
      html += '<button class="chip ' + (activeBrand === br ? "active" : "") +
        '" data-brand="' + br + '">' + br + "</button>";
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll(".chip").forEach(function (c) {
      c.addEventListener("click", function () {
        activeBrand = c.getAttribute("data-brand");
        renderFilters();
        renderBikes();
      });
    });
  }

  function bikeImg(b, big) {
    if (b.image) return '<img src="' + b.image + '" alt="' + b.name_en + '" onerror="this.style.display=\'none\'">';
    return "🏍️";
  }

  function renderBikes() {
    var grid = document.getElementById("bikeGrid");
    var list = BIKES.filter(function (b) {
      return activeBrand === "all" || b.brand === activeBrand;
    });

    if (!list.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted)">' +
        t("No bikes to show.", "কোনো বাইক নেই।") + "</p>";
      return;
    }

    grid.innerHTML = list.map(function (b, i) {
      var idx = BIKES.indexOf(b);
      var name = t(b.name_en, b.name_bn);
      var stock = b.available
        ? '<span class="tag stock">' + t("In stock", "স্টকে আছে") + "</span>"
        : '<span class="tag sold">' + t("Sold", "বিক্রি হয়েছে") + "</span>";
      var waMsg = t(
        "Hello BM Motors, I'm interested in the " + b.name_en + ". Please share the price & details.",
        "আসসালামু আলাইকুম, বিএম মোটরস। আমি " + b.name_bn + " বাইকটির ব্যাপারে আগ্রহী। দাম ও বিস্তারিত জানাবেন।"
      );
      return (
        '<article class="bike-card">' +
          '<div class="bike-img">' + stock + bikeImg(b) + "</div>" +
          '<div class="bike-body">' +
            '<span class="bike-brand">' + b.brand + "</span>" +
            '<h3 class="bike-name">' + name + "</h3>" +
            '<div class="bike-meta">' +
              '<span class="pill">' + b.engine + "</span>" +
              '<span class="pill">' + b.type + "</span>" +
              '<span class="pill">' + b.condition + "</span>" +
            "</div>" +
            '<div class="bike-actions">' +
              '<button class="btn btn-ghost" data-detail="' + idx + '">' + t("Details", "বিস্তারিত") + "</button>" +
              '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(waMsg) + '">💬 ' + t("Price", "দাম") + "</a>" +
            "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    grid.querySelectorAll("[data-detail]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        openModal(parseInt(btn.getAttribute("data-detail"), 10));
      });
    });
  }

  /* ---------- modal ---------- */
  function openModal(idx) {
    var b = BIKES[idx];
    var name = t(b.name_en, b.name_bn);
    var specs = (lang === "bn" ? b.specs_bn : b.specs_en) || [];
    var waMsg = t(
      "Hello BM Motors, I'm interested in the " + b.name_en + ". Please share the price & details.",
      "আসসালামু আলাইকুম, বিএম মোটরস। আমি " + b.name_bn + " বাইকটির ব্যাপারে আগ্রহী। দাম ও বিস্তারিত জানাবেন।"
    );
    var body =
      '<div class="modal-img">' + bikeImg(b, true) + "</div>" +
      '<span class="m-brand">' + b.brand + "</span>" +
      "<h3>" + name + "</h3>" +
      '<div class="bike-meta" style="margin:.6rem 0">' +
        '<span class="pill">' + b.engine + "</span>" +
        '<span class="pill">' + b.type + "</span>" +
        '<span class="pill">' + b.condition + "</span>" +
      "</div>" +
      "<ul class='spec-list'>" + specs.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" +
      '<div class="modal-note">' + t("💡 Prices are not listed online. Tap below to contact the shop for the best price.",
        "💡 দাম অনলাইনে দেওয়া নেই। সেরা দামের জন্য নিচের বাটনে ক্লিক করে দোকানে যোগাযোগ করুন।") + "</div>" +
      '<div class="contact-btns">' +
        '<a class="c-wa" target="_blank" rel="noopener" href="' + waLink(waMsg) + '">💬 WhatsApp</a>' +
        '<a class="c-call" href="tel:+' + CONFIG.phoneCall + '">📞 ' + t("Call", "কল") + "</a>" +
      "</div>";
    document.getElementById("modalBody").innerHTML = body;
    document.getElementById("modal").hidden = false;
  }
  function closeModal() { document.getElementById("modal").hidden = true; }

  /* ---------- contact ---------- */
  function renderContact() {
    document.getElementById("ciAddress").textContent = t(CONFIG.addressEn, CONFIG.addressBn);
    document.getElementById("ciPhone").textContent = CONFIG.phoneDisplay;
    document.getElementById("footAddress").textContent = t(CONFIG.addressEn, CONFIG.addressBn);

    var waMsg = t("Hello BM Motors, I have a question.", "আসসালামু আলাইকুম, বিএম মোটরস। আমার একটি প্রশ্ন আছে।");
    document.getElementById("contactBtns").innerHTML =
      '<a class="c-wa" target="_blank" rel="noopener" href="' + waLink(waMsg) + '">💬 WhatsApp</a>' +
      '<a class="c-call" href="tel:+' + CONFIG.phoneCall + '">📞 ' + t("Call", "কল") + "</a>" +
      '<a class="c-fb" target="_blank" rel="noopener" href="' + CONFIG.facebook + '">👍 Messenger</a>';

    document.getElementById("floatWa").href = waLink(waMsg);

    var map = document.getElementById("mapFrame");
    if (!map.src) {
      map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(CONFIG.mapQuery) + "&output=embed";
    }
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent = new Date().getFullYear();

    document.getElementById("langToggle").addEventListener("click", function () {
      lang = lang === "bn" ? "en" : "bn";
      localStorage.setItem("bm_lang", lang);
      applyLang();
    });

    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");
    navToggle.addEventListener("click", function () { nav.classList.toggle("open"); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });

    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("modal").addEventListener("click", function (e) {
      if (e.target.id === "modal") closeModal();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

    renderFilters();
    applyLang(); // renders bikes + contact
  });
})();
