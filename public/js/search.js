const Search = {
  filters: {
    query: "",
    category: null,
    free: false,
    accessible: false,
    kids: false,
    couples: false,
    openNow: false,
    saturdayOpen: false,
    region: null,
    maxDistance: 30
  },

  togglePriceFilter(minPrice, maxPrice) {
    this.filters.minPrice = minPrice;
    this.filters.maxPrice = maxPrice;
    // ARIA announcement for screen readers
    const announcement = document.getElementById('price-filter-announcement');
    if (announcement) {
      const label = minPrice === 0 ? 'חינם' : `${minPrice}–${maxPrice} ₪`;
      announcement.textContent = `סונן לפי מחיר: ${label}`;
      announcement.setAttribute('aria-live', 'polite');
    }
    this.apply({ navigate: false });
      },

      toggleFilter(name, val) {
    this.filters[name] = val;
    // ARIA live update
    const status = document.getElementById('filter-status');
    if (status) status.textContent = `필터 עודכן: ${name} = ${val}`;
  },

  byCategory(cat) {
    this.filters.category = cat;
    this.applyForHome();
  },

  applyForHome() {
    const { userLat, userLng } = App.state;
    let results = App.state.places.map(p => {
      let distance = 999;
      if (userLat !== null && userLng !== null && p.location && typeof p.location.lat === 'number' && typeof p.location.lng === 'number') {
        distance = App.haversine(userLat, userLng, p.location.lat, p.location.lng);
      }
      return { ...p, distance };
    }).filter(p => {
      if (this.filters.category && p.category !== this.filters.category) return false;
      if (this.filters.region && p.region !== this.filters.region) return false;
      if (this.filters.query) {
        const q = this.filters.query;
        const hay = `${p.name} ${p.description.short} ${p.tags.join(" ")} ${p.region || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (this.filters.free && p.cost.level !== "free") return false;
      if (this.filters.accessible && !p.amenities.wheelchair) return false;
      if (this.filters.kids && !p.suitableFor.children) return false;
      if (this.filters.couples && !p.suitableFor.couples) return false;
      if (this.filters.saturdayOpen && !p.saturdayOpen) return false;
      // Filter by maxDistance only when GPS coords are actually available
      if (userLat !== null && userLng !== null && p.distance != null && p.distance > this.filters.maxDistance) return false;
      return true;
    });
    // No maxDistance filter on the home suggestions — always show what matches
    results.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
    const list = document.getElementById("suggestionsList");
    if (list) {
      list.innerHTML = results.slice(0, 12).map(App.cardTemplate).join("");
    }
  },

  apply(opts) {
      // opts.navigate === false → render results WITHOUT switching to the results page.
      // The results page opens ONLY via the explicit "הצג תוצאות" button / App.showResults().
      const navigate = !opts || opts.navigate !== false;

      let results = App.state.places.filter(p => {
      if (this.filters.category && p.category !== this.filters.category) return false;
      if (this.filters.region && p.region !== this.filters.region) return false;
      if (this.filters.query) {
        const q = this.filters.query;
        const hay = `${p.name} ${p.description.short} ${p.tags.join(" ")} ${p.region || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (this.filters.free && p.cost.level !== "free") return false;
      if (this.filters.accessible && !p.amenities.wheelchair) return false;
      if (this.filters.kids && !p.suitableFor.children) return false;
      if (this.filters.couples && !p.suitableFor.couples) return false;
      if (this.filters.saturdayOpen && !p.saturdayOpen) return false;
      if (p.distance != null && p.distance > this.filters.maxDistance) return false;
      return true;
    });

    results.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));

    const title = [this.filters.category ? this.categoryLabel(this.filters.category) : null, this.filters.region ? this.filters.region : null].filter(Boolean).join(" · ") || "תוצאות";
    document.getElementById("resultsTitle").textContent = title;
    document.getElementById("resultsCount").textContent = `${results.length} מקומות`;
    document.getElementById("resultsList").innerHTML = results.map(App.cardTemplate).join("");
    document.getElementById("emptyResults").style.display = results.length ? "none" : "block";
        // Only switch pages when explicitly requested (showResults button). Otherwise just
        // refresh the results data so it's ready when the user does open the page.
        if (navigate) {
          document.getElementById("page-results").classList.add("active");
          document.getElementById("page-home").classList.remove("active");
        }
      },

  categoryLabel(cat) {
    const map = { nature: "טבע", food: "אוכל", culture: "תרבות", sports: "ספורט", family: "משפחה", shopping: "קניות" };
    return map[cat] || cat;
  }
};

// Single source of truth for card click handling — used by all lists
function handleCardClick(e, listId) {
  try {
    const card = e.target.closest(".place-card");
    if (!card) return;
    const id = card.getAttribute("data-id");
    if (!id) return;
    Place.open(parseInt(id, 10));
  } catch (err) {
    console.error('[QA] handleCardClick error in', listId, err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sug = document.getElementById("suggestionsList");
  if (sug) sug.addEventListener("click", e => handleCardClick(e, "suggestionsList"));
  const list = document.getElementById("resultsList");
  if (list) list.addEventListener("click", e => handleCardClick(e, "resultsList"));
});
