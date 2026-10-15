/* Aquatic Animal Health Management Lab website
 *
 * You normally do NOT need to edit this file.
 * Edit the text files in the  content/  folder instead:
 *   content/pi.json            Principal Investigator
 *   content/members.json       Lab members
 *   content/publications.json  Publications
 *   content/awards.json        Awards & honors
 *   content/activities.json    Lab activities
 *   content/gallery.json       Gallery photos
 *   content/lab.json           Contact address
 */

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
// *text* becomes italic (for species names)
function fmt(s) { return esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>"); }

function load(path) {
  return fetch(path, { cache: "no-cache" }).then(function (r) {
    if (!r.ok) throw new Error(path + " (" + r.status + ")");
    return r.json();
  });
}

function fail(el, err) {
  if (!el) return;
  el.innerHTML =
    '<p class="load-error"><strong>Could not load the content.</strong> ' +
    "Check the file for a missing comma or quote mark (" + esc(err.message || err) + "). " +
    "If you opened this page directly from your computer, preview it with " +
    "<code>python3 -m http.server</code> instead, or view the live GitHub Pages site.</p>";
}

function photoHtml(src, alt, cls) {
  var img = src
    ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '" onerror="this.remove()" />'
    : "";
  return '<div class="photo' + (cls ? " " + cls : "") + '">' + img + "</div>";
}

function el(id) { return document.getElementById(id); }

/* ---------- renderers ---------- */
function renderPI(pi) {
  var host = el("pi-card");
  if (!host) return;

  var chips = (pi.disciplines || []).map(function (d) {
    return '<span class="chip">' + esc(d) + "</span>";
  }).join("");

  var edu = (pi.education || []).map(function (e) {
    return "<li>" + fmt(e) + "</li>";
  }).join("");

  var contact = "";
  if (pi.email) contact += '<li><span>Email</span> <a href="mailto:' + esc(pi.email) + '">' + esc(pi.email) + "</a></li>";
  if (pi.phone) contact += '<li><span>Phone</span> <a href="tel:' + esc(String(pi.phone).replace(/[^\d+]/g, "")) + '">' + esc(pi.phone) + "</a></li>";
  if (pi.office) contact += "<li><span>Office</span> " + esc(pi.office) + "</li>";
  if (pi.profile_url) contact += '<li><span>Profile</span> <a href="' + esc(pi.profile_url) + '" target="_blank" rel="noopener">Faculty directory page</a></li>';

  host.innerHTML =
    photoHtml(pi.photo, "Photo of " + (pi.name || "the Principal Investigator"), "photo-lg") +
    '<div class="pi-info">' +
      "<h3>" + esc(pi.name) + "</h3>" +
      '<p class="role">' + esc(pi.title) + "</p>" +
      '<p class="dept">' + esc([pi.department, pi.institution].filter(Boolean).join(" • ")) + "</p>" +
      (chips ? '<p class="chips">' + chips + "</p>" : "") +
      (pi.research_interests ? "<h4>Research interests</h4><p class=\"bio\">" + fmt(pi.research_interests) + "</p>" : "") +
      (edu ? "<h4>Education</h4><ul class=\"edu\">" + edu + "</ul>" : "") +
      (contact ? '<ul class="contact-list">' + contact + "</ul>" : "") +
    "</div>";
}

function renderMembers(data) {
  var host = el("members-grid");
  if (!host) return;
  host.innerHTML = (data.members || []).map(function (m) {
    return '<article class="member">' +
      photoHtml(m.photo, m.name || "Lab member") +
      '<h3 class="name">' + esc(m.name) + "</h3>" +
      '<p class="member-role">' + esc(m.role) + "</p>" +
    "</article>";
  }).join("");
}

function renderContact(lab, pi) {
  var intro = el("contact-intro");
  var addr = el("contact-address");
  if (intro) {
    intro.innerHTML = esc(lab.contact_intro || "Please contact us at") +
      (pi.email ? ' <a href="mailto:' + esc(pi.email) + '">' + esc(pi.email) + "</a>." : ".");
  }
  if (addr) addr.innerHTML = (lab.address_lines || []).map(esc).join("<br />");
}

function groupSections(host, groups, itemHtml, itemClassName) {
  host.innerHTML = (groups || []).map(function (g, i) {
    return '<section class="section' + (i % 2 ? " alt" : "") + '"><div class="container">' +
      "<h2>" + fmt(g.title) + "</h2>" +
      (g.subtitle ? '<p class="section-sub">' + fmt(g.subtitle) + "</p>" : "") +
      '<div class="cards">' + (g.items || []).map(itemHtml).join("") + "</div>" +
    "</div></section>";
  }).join("");
}

function renderActivities(data) {
  var host = el("groups");
  if (!host) return;
  groupSections(host, data.groups, function (a) {
    return '<article class="card">' +
      (a.tag ? '<span class="tag">' + esc(a.tag) + "</span>" : "") +
      "<h3>" + fmt(a.title) + "</h3>" +
      (a.date ? '<p class="meta">' + esc(a.date) + "</p>" : "") +
      (a.description ? "<p>" + fmt(a.description) + "</p>" : "") +
    "</article>";
  });
}

function renderAwards(data) {
  var host = el("groups");
  if (!host) return;
  groupSections(host, data.groups, function (a) {
    return '<article class="award">' +
      (a.year ? '<span class="award-year">' + esc(a.year) + "</span>" : "") +
      "<h3>" + fmt(a.title) + "</h3>" +
      (a.organization ? '<p class="meta">' + fmt(a.organization) + "</p>" : "") +
      (a.note ? "<p>" + fmt(a.note) + "</p>" : "") +
    "</article>";
  });
}

function renderGallery(data) {
  var host = el("gallery");
  if (!host) return;
  host.innerHTML = (data.photos || []).map(function (p) {
    return '<figure class="gallery-item">' +
      '<div class="ph">' +
        (p.photo ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.caption || "Gallery photo") + '" loading="lazy" onerror="this.remove()" />' : "") +
      "</div>" +
      (p.caption ? "<figcaption>" + fmt(p.caption) + "</figcaption>" : "") +
    "</figure>";
  }).join("");
}

function renderPublications(data) {
  var prof = el("profiles");
  if (prof) {
    prof.innerHTML = (data.profiles || []).filter(function (p) { return p.url; }).map(function (p) {
      return '<a class="btn btn-solid" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.label) + "</a>";
    }).join("");
  }
  var host = el("pubs");
  if (!host) return;

  var byYear = {};
  (data.publications || []).forEach(function (p) {
    var y = String(p.year || "Other");
    (byYear[y] = byYear[y] || []).push(p);
  });
  var years = Object.keys(byYear).sort(function (a, b) { return b.localeCompare(a, undefined, { numeric: true }); });

  host.innerHTML = years.map(function (y) {
    return '<h3 class="year">' + esc(y) + '</h3><ol class="pubs">' +
      byYear[y].map(function (p) {
        return "<li>" +
          '<span class="pub-authors">' + fmt(p.authors) + "</span> (" + esc(p.year) + "). " +
          '<span class="pub-title">' + fmt(p.title) + "</span> " +
          (p.journal ? "<em>" + fmt(p.journal) + "</em>. " : "") +
          (p.link ? '<a class="pub-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">DOI / PDF</a>' : "") +
        "</li>";
      }).join("") + "</ol>";
  }).join("");
}

/* ---------- start ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var yr = el("year");
  if (yr) yr.textContent = new Date().getFullYear();

  if (el("pi-card") || el("contact-intro")) {
    Promise.all([load("content/pi.json"), load("content/lab.json")]).then(function (r) {
      renderPI(r[0]);
      renderContact(r[1], r[0]);
    }).catch(function (e) { fail(el("pi-card"), e); });
  }
  if (el("members-grid")) load("content/members.json").then(renderMembers).catch(function (e) { fail(el("members-grid"), e); });
  if (el("gallery"))      load("content/gallery.json").then(renderGallery).catch(function (e) { fail(el("gallery"), e); });
  if (el("pubs"))         load("content/publications.json").then(renderPublications).catch(function (e) { fail(el("pubs"), e); });
  if (el("groups")) {
    var src = el("groups").getAttribute("data-source");
    load(src).then(src.indexOf("awards") > -1 ? renderAwards : renderActivities)
      .catch(function (e) { fail(el("groups"), e); });
  }
});

/* ---------- click-to-enlarge viewer (diagrams and gallery photos) ---------- */
(function () {
  var box = document.getElementById("lightbox");
  if (!box || typeof box.showModal !== "function") return;
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var SEL = ".figure img, .gallery-item img";

  function open(target) {
    img.src = target.currentSrc || target.src;
    img.alt = target.alt;
    var fig = target.closest("figure");
    var fc = fig && fig.querySelector("figcaption");
    cap.textContent = fc ? fc.textContent.replace(/\s+/g, " ").trim() : "";
    box.showModal();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest(SEL) : null;
    if (t) open(t);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var t = document.activeElement;
    if (t && t.matches && t.matches(SEL)) { e.preventDefault(); open(t); }
  });
  // make images keyboard-focusable once they exist
  new MutationObserver(function () {
    document.querySelectorAll(SEL).forEach(function (i) { i.tabIndex = 0; });
  }).observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll(SEL).forEach(function (i) { i.tabIndex = 0; });

  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lb-close")) box.close();
  });
})();
