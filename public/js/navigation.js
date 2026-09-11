/**
 * Navigation — Liquid bead bottom nav
 *  - אייקון SVG + תווית לכל טאב
 *  - חרוז נוזלי: melt (scale 1.6, 0.35) → slide (spring) → reform
 *  - טאב פעיל: צבע + הרמת אייקון (CSS)
 *  - RTL, נגישות (aria, roving tabindex, חצים/Home/End), מובייל
 *  - לא משנה לוגיקת show/back — רק מוסיף אנימציית חרוז
 */
const Navigation = {
  bead: null,
  itemsEl: null,
  items: [],
  activeIndex: 0,
  _animToken: 0,

  init() {
    try {
      this.bead = document.querySelector(".nav-bead");
      this.itemsEl = document.querySelector(".nav-items");
      this.items = Array.from(document.querySelectorAll(".nav-item[data-page]"));

      // מצא אינדקס פעיל התחלתי
      const active = this.items.findIndex((b) => b.classList.contains("active"));
      this.activeIndex = active >= 0 ? active : 0;

      // קליקים
      this.items.forEach((btn, i) => {
        btn.addEventListener("click", () => this.show(btn.dataset.page, i));
        btn.addEventListener("keydown", (e) => this.handleKeydown(e, i));
      });

      // Back buttons
      const br = document.getElementById("backFromResults");
      if (br) br.addEventListener("click", () => this.back());
      const bp = document.getElementById("backFromPlace");
      if (bp) bp.addEventListener("click", () => this.back());

      // מיקום ראשוני ללא אנימציה
      // חכה פריים כדי שהלייאאוט יתייצב (פונט/אייקונים)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.updateBead(this.activeIndex, false));
      });

      // resize → עדכון ללא אנימציה (debounced)
      let t = 0;
      window.addEventListener("resize", () => {
        clearTimeout(t);
        t = setTimeout(() => this.updateBead(this.activeIndex, false), 80);
      });

      // אם מישהו קורא ל-Navigation.show programmatically (למשל back), ודא שהחרוז מסונכרן
      // האזנה לשינויי dir דינמיים
      const mo = new MutationObserver(() => this.updateBead(this.activeIndex, false));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    } catch (e) {
      console.error("[nav] init", e);
    }
  },

  show(page, index) {
    // index אופציונלי — אם לא סופק, חפש לפי data-page (קריאות קיימות בקוד)
    if (typeof index !== "number") {
      const found = this.items.findIndex((b) => b.dataset.page === page);
      index = found >= 0 ? found : this.activeIndex;
    }

    // עדכון ויזואלי של הטאבים + ARIA
    this.items.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    // אנימציית חרוז 3 שלבים
    this.updateBead(index, true);
    this.activeIndex = index;

    // לוגיקת עמודים — נשארה זהה (לא נוגעים בפונקציונליות)
    console.log("[nav] show called:", page);
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    const target = document.getElementById("page-" + page);
    if (target) target.classList.add("active");
    if (page === "favorites" && typeof Favorites !== "undefined") Favorites.render();
    if (page === "home") {
      if (typeof Search !== "undefined") {
        Search.filters.category = null;
        Search.filters.query = "";
      }
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.value = "";
      document.querySelectorAll("#page-home .category-btn").forEach((b) => b.classList.remove("active"));
      if (typeof App !== "undefined" && App.renderSuggestions) App.renderSuggestions();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  back() {
    this.show("home", 0);
  },

  handleKeydown(e, index) {
    const isRTL = (document.documentElement.getAttribute("dir") || document.body.getAttribute("dir") || "rtl").toLowerCase() === "rtl";
    let next = null;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        next = isRTL ? index - 1 : index + 1;
        break;
      case "ArrowLeft":
        e.preventDefault();
        next = isRTL ? index + 1 : index - 1;
        break;
      case "Home":
        e.preventDefault();
        next = 0;
        break;
      case "End":
        e.preventDefault();
        next = this.items.length - 1;
        break;
      default:
        return;
    }

    // wrap
    next = (next + this.items.length) % this.items.length;
    this.items[next].focus();
    this.show(this.items[next].dataset.page, next);
  },

  updateBead(index, animate) {
    if (!this.bead || !this.items[index] || !this.itemsEl) return;
    const target = this.items[index];
    const navRect = this.itemsEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetWidth = targetRect.width;
    // x פיזי: מרחק קצה שמאל הטאב מקצה שמאל של nav-items (עובד זהה ב-RTL/LTR כי left פיזי)
    const x = targetRect.left - navRect.left;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!animate || reduceMotion) {
      this._animToken++;
      this.bead.style.transition = "none";
      this.bead.style.width = targetWidth + "px";
      this.bead.style.transform = `translateY(-50%) translateX(${x}px) scale(1, 1)`;
      void this.bead.offsetHeight;
      this.bead.style.transition = "";
      return;
    }

    // 3 שלבים: melt → slide (spring) → reform
    const token = ++this._animToken;
    const bead = this.bead;

    // שלב 1: melt — התארכות במקום הנוכחי
    const prevTransform = bead.style.transform || "";
    const m = prevTransform.match(/translateX\(([^)]+)\)/);
    const currentX = m ? parseFloat(m[1]) : x;
    bead.style.transition = "transform 140ms cubic-bezier(0.4, 0, 0.2, 1), width 140ms cubic-bezier(0.4, 0, 0.2, 1)";
    bead.style.width = targetWidth + "px";
    bead.style.transform = `translateY(-50%) translateX(${currentX}px) scale(1.6, 0.35)`;

    // שלב 2: slide עם spring — החלקה ליעד
    setTimeout(() => {
      if (token !== this._animToken) return;
      bead.style.transition =
        "transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1), width 320ms cubic-bezier(0.16, 1, 0.3, 1)";
      bead.style.transform = `translateY(-50%) translateX(${x}px) scale(1, 1)`;
    }, 140);

    // שלב 3: reform — ניקוי transition
    setTimeout(() => {
      if (token !== this._animToken) return;
      bead.style.transition = "transform 180ms cubic-bezier(0.16, 1, 0.3, 1), width 180ms cubic-bezier(0.16, 1, 0.3, 1)";
    }, 700);
  },
};

document.addEventListener("DOMContentLoaded", () => Navigation.init());
