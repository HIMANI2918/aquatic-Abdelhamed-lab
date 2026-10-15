// Footer year
var yr = document.getElementById("year");
if (yr) yr.textContent = new Date().getFullYear();

// Click-to-enlarge viewer for diagrams (home page) and photos (gallery)
(function () {
  var box = document.getElementById("lightbox");
  if (!box || typeof box.showModal !== "function") return;
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");

  function open() {
    img.src = this.currentSrc || this.src;
    img.alt = this.alt;
    var fig = this.closest("figure");
    var fc = fig && fig.querySelector("figcaption");
    cap.textContent = fc ? fc.textContent.replace(/\s+/g, " ").trim() : "";
    box.showModal();
  }

  document.querySelectorAll(".figure img, .gallery-item img").forEach(function (el) {
    el.tabIndex = 0;
    el.addEventListener("click", open);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open.call(el); }
    });
  });

  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lb-close")) box.close();
  });
})();
