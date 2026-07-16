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

  /* Builds the little grey info pills. The mileage pill only appears
     if that bike has a mileage value, so new bikes stay clean. */
  function metaPills(b) {
    var html = "";
    if (b.year) {
      html += '<span class="pill pill-year">📅 ' + b.year + "</span>";
    }
    html +=
      '<span class="pill">' + b.engine + "</span>" +
      '<span class="pill">' + b.condition + "</span>";
    if (b.mileage) {
      html += '<span class="pill pill-km">⏱️ ' + b.mileage + "</span>";
    }
    if (b.owner) {
      html += '<span class="pill pill-owner">👤 ' + t(b.owner, b.owner_bn || b.owner) + "</span>";
    }
    return '<div class="bike-meta">' + html + "</div>";
  }

  /* Optional highlighted note, e.g. papers / registration status. */
  function noteLine(b) {
    var n = t(b.note, b.note_bn || b.note);
    return n ? '<div class="bike-note">📄 ' + n + "</div>" : "";
  }

  /* Price line. If the bike has a price it is shown; if not,
     the customer is invited to contact the shop instead. */
  function priceLine(b) {
    var p = t(b.price, b.price_bn || b.price);
    if (p) return '<div class="bike-price">' + p + "</div>";
    return '<div class="bike-price ask">' + t("Contact for price", "দামের জন্য যোগাযোগ করুন") + "</div>";
  }

  /* Returns a bike's photo list. Accepts either the new
     photos: ["a.jpg","b.jpg"] list, or a single image: "a.jpg". */
  function photosOf(b) {
    if (b.photos && b.photos.length) return b.photos.filter(Boolean);
    if (b.image) return [b.image];
    return [];
  }

  /* Card thumbnail: first photo + a 📷 count badge if there are more. */
  function bikeImg(b) {
    var ph = photosOf(b);
    if (!ph.length) return "🏍️";
    var badge = ph.length > 1 ? '<span class="photo-count">📷 ' + ph.length + "</span>" : "";
    return '<img src="' + ph[0] + '" alt="" onerror="this.style.display=\'none\'">' + badge;
  }

  /* Modal gallery: big photo + clickable thumbnails + ‹ › arrows. */
  function gallery(b) {
    var ph = photosOf(b);
    if (!ph.length) return '<div class="modal-img">🏍️</div>';

    var main = '<div class="modal-img" id="galMain">' +
      '<img id="galImg" src="' + ph[0] + '" alt="" onerror="this.style.visibility=\'hidden\'">' +
      (ph.length > 1
        ? '<button class="gal-arrow gal-prev" id="galPrev" aria-label="Previous photo">‹</button>' +
          '<button class="gal-arrow gal-next" id="galNext" aria-label="Next photo">›</button>' +
          '<span class="gal-count" id="galCount">1 / ' + ph.length + "</span>"
        : "") +
      "</div>";

    var thumbs = "";
    if (ph.length > 1) {
      thumbs = '<div class="gal-thumbs" id="galThumbs">' +
        ph.map(function (src, i) {
          return '<button class="gal-thumb' + (i === 0 ? " active" : "") + '" data-i="' + i + '">' +
                 '<img src="' + src + '" alt="" onerror="this.style.visibility=\'hidden\'"></button>';
        }).join("") + "</div>";
    }
    return main + thumbs;
  }

  /* Wires up the gallery clicks/arrows after the modal is in the DOM. */
  function initGallery(b) {
    var ph = photosOf(b);
    if (ph.length < 2) return;
    var i = 0;
    var img = document.getElementById("galImg");
    var count = document.getElementById("galCount");
    var thumbs = document.querySelectorAll(".gal-thumb");

    function show(n) {
      i = (n + ph.length) % ph.length;   // wraps around both ways
      img.src = ph[i];
      count.textContent = i + 1 + " / " + ph.length;
      thumbs.forEach(function (tb, k) { tb.classList.toggle("active", k === i); });
    }
    document.getElementById("galPrev").addEventListener("click", function () { show(i - 1); });
    document.getElementById("galNext").addEventListener("click", function () { show(i + 1); });
    thumbs.forEach(function (tb) {
      tb.addEventListener("click", function () { show(parseInt(tb.getAttribute("data-i"), 10)); });
    });
    galleryKeys = show;
  }
  var galleryKeys = null;

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
            metaPills(b) +
            noteLine(b) +
            priceLine(b) +
            '<div class="bike-actions">' +
              '<button class="btn btn-ghost" data-detail="' + idx + '">' + t("Details", "বিস্তারিত") + "</button>" +
              '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(waMsg) + '">💬 ' +
                (b.price ? t("Contact", "যোগাযোগ") : t("Price", "দাম")) + "</a>" +
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
      gallery(b) +
      '<span class="m-brand">' + b.brand + "</span>" +
      "<h3>" + name + "</h3>" +
      metaPills(b) +
      noteLine(b) +
      priceLine(b) +
      "<ul class='spec-list'>" + specs.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" +
      '<div class="modal-note">' +
        (b.price
          ? t("💡 Price is negotiable. Tap below to contact the shop about this bike.",
              "💡 দাম আলোচনা সাপেক্ষে। এই বাইকটির ব্যাপারে জানতে নিচের বাটনে ক্লিক করুন।")
          : t("💡 Price is not listed online. Tap below to contact the shop for the best price.",
              "💡 দাম অনলাইনে দেওয়া নেই। সেরা দামের জন্য নিচের বাটনে ক্লিক করে দোকানে যোগাযোগ করুন।")) +
      "</div>" +
      '<div class="contact-btns">' +
        '<a class="c-wa" target="_blank" rel="noopener" href="' + waLink(waMsg) + '">💬 WhatsApp</a>' +
        '<a class="c-call" href="tel:+' + CONFIG.phoneCall + '">📞 ' + t("Call", "কল") + "</a>" +
      "</div>";
    document.getElementById("modalBody").innerHTML = body;
    document.getElementById("modal").hidden = false;
    initGallery(b);
  }
  function closeModal() {
    document.getElementById("modal").hidden = true;
    galleryKeys = null;
  }

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
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
      if (!galleryKeys) return;
      if (e.key === "ArrowLeft") document.getElementById("galPrev").click();
      if (e.key === "ArrowRight") document.getElementById("galNext").click();
    });

    renderFilters();
    applyLang(); // renders bikes + contact
  });
})();
