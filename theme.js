/* Theme: System (default), Dark or Light. Runs in <head> so the page never flashes the wrong
   colours; the System / Dark / Light switch is added to the footer when the page has loaded.
   The choice is remembered in this browser only. */
(function () {
  var KEY = "vps-theme";
  var MODES = [["system", "System"], ["dark", "Dark"], ["light", "Light"]];
  var current = "system";
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") current = saved;
  } catch (e) {}

  function apply() {
    var root = document.documentElement;
    if (current === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", current);
  }
  apply();

  document.addEventListener("DOMContentLoaded", function () {
    var footer = document.querySelector("footer.site");
    if (!footer) return;
    var box = document.createElement("div");
    box.className = "theme-switch";
    box.setAttribute("role", "radiogroup");
    box.setAttribute("aria-label", "Theme");
    var buttons = [];

    function mark() {
      buttons.forEach(function (b) {
        var on = b.getAttribute("data-mode") === current;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.className = on ? "on" : "";
      });
    }

    MODES.forEach(function (m) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = m[1];
      b.setAttribute("role", "radio");
      b.setAttribute("data-mode", m[0]);
      b.addEventListener("click", function () {
        current = m[0];
        try {
          if (current === "system") localStorage.removeItem(KEY);
          else localStorage.setItem(KEY, current);
        } catch (e) {}
        apply();
        mark();
      });
      buttons.push(b);
      box.appendChild(b);
    });
    mark();
    footer.insertBefore(box, footer.firstChild);
  });
})();
