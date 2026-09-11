// Debouncer for distanceSlider (500ms)
let distanceSliderDebounceTimer = null;

function debounceDistanceSlider(callback, delay = 500) {
  if (distanceSliderDebounceTimer) clearTimeout(distanceSliderDebounceTimer);
  distanceSliderDebounceTimer = setTimeout(callback, delay);
}

function announce(message) {
  const el = document.getElementById('filter-status');
  if (el) {
    el.textContent = '';
    requestAnimationFrame(() => { el.textContent = message; });
  }
}

// Single source of truth for card click handling — used by all lists
function handleCardClick(e) {
  try {
    const card = e.target.closest(".place-card");
    if (!card) return;
    const id = card.getAttribute("data-id");
    if (!id) return;
    Place.open(parseInt(id, 10));
  } catch (err) {
    console.error('[QA] handleCardClick error:', err);
  }
}

const App = {
  state: {
    userLat: null,
    userLng: null,
    currentPlace: null,
    places: [],
    userLocationName: null,
    userRegion: null
  },

  init() {
    this.loadPlaces();
    this.requestLocation();
    this.bindHomeEvents();
    Settings.init();
    this.renderSuggestions();
    Accessibility.init();
  },

  showResults() {
    // Collect all current filters and apply
    Search.apply();
    // Scroll to results
    document.getElementById('page-results').classList.add('active');
    document.getElementById('page-home').classList.remove('active');
    // Announce to screen readers
    const ann = document.getElementById('filter-status');
    if (ann) ann.textContent = 'מציג תוצאות';
  },

  loadPlaces() {
      // Load from API for real-time sync with admin dashboard
      fetch('/api/places')
        .then(res => res.json())
        .then(data => {
          const validPlaces = (data.places || []).filter(p => p != null && typeof p === 'object');
          this.state.places = validPlaces.map(p => ({ ...p }));
          this.renderSuggestions();
          if (typeof Search !== 'undefined' && Search.apply) {
            Search.apply();
          }
        })
        .catch(err => {
          console.error('Failed to load places from API, falling back to local data:', err);
          // Fallback to local data
          this.state.places = PLACES.filter(p => p && typeof p === 'object').map(p => ({ ...p }));
          this.renderSuggestions();
        });
    },

  async reverseGeocode(lat, lng) {
    const text = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    const fallback = Settings.get().location || Settings.defaults.location || text;
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=he`;
      const response = await fetch(url, { headers: { "User-Agent": "mah-sheyesh-pah" } });
      if (!response.ok) return fallback;
      const data = await response.json();
      const addr = data?.address || {};
      const name = addr.city || addr.town || addr.village || addr.county || addr.state || text;
      this.state.userLocationName = name;
      this.state.userRegion = addr.county || addr.state || "";
      return name;
    } catch {
      return fallback;
    }
  },

  async geocodeByAddress(address) {
    if (!address || typeof address !== 'string') return null;
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&accept-language=he`;
      const response = await fetch(url, { headers: { "User-Agent": "mah-sheyesh-pah" } });
      if (!response.ok) return null;
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return null;
    } catch { return null; }
  },

  requestLocation() {
    const locEl = document.getElementById("header-location");
    const nameEl = locEl ? locEl.querySelector("span:nth-child(2)") : null;
    const radiusEl = locEl ? locEl.querySelector(".radius") : null;
    const applyRadius = (r) => { if (radiusEl) radiusEl.textContent = `${r} ק"מ`; };
    const applyLocationName = (name) => {
      const display = name || Settings.get().location || Settings.defaults.location;
      if (nameEl) nameEl.textContent = display;
    };
    if (!navigator.geolocation) {
      const s = Settings.get();
      applyLocationName(s.location);
      applyRadius(s.radius || Settings.defaults.radius);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.state.userLat = pos.coords.latitude;
        this.state.userLng = pos.coords.longitude;
        this.updateDistances();
        // Re-apply settings so the select reflects GPS + distances are recalculated
        const sel = document.getElementById("defaultLocation");
        if (sel) sel.value = "מיקום נוכחי (GPS)";
        Settings.apply({
          location: "מיקום נוכחי (GPS)",
          radius: Settings.get().radius ?? Settings.defaults.radius,
          dark: Settings.get().dark ?? Settings.defaults.dark,
        });
        this.renderSuggestions();
        this.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then(applyLocationName);
      },
      () => {
        const s = Settings.get();
        applyLocationName(s.location);
        applyRadius(s.radius || Settings.defaults.radius);
      }
    );
  },

  updateDistances() {
    const { userLat, userLng } = this.state;
    if (userLat === null) return;
    this.state.places.forEach(p => {
      if (!p) return;
      if (p.location && typeof p.location.lat === 'number' && typeof p.location.lng === 'number') {
        p.distance = this.haversine(userLat, userLng, p.location.lat, p.location.lng);
      } else {
        p.distance = 999;
      }
    });
  },

  haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  },

  bindHomeEvents() {
    document.getElementById("homeSurpriseBtn").addEventListener("click", () => Navigation.show("surprise"));
    document.querySelectorAll("#page-home .category-btn").forEach(btn => {
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.addEventListener("click", () => {
        document.querySelectorAll("#page-home .category-btn").forEach(b => {
          b.setAttribute("aria-selected", "false");
        });
        btn.setAttribute("aria-selected", "true");
        Search.byCategory(btn.dataset.category);
        announce("קטגוריה: " + btn.textContent.trim());
      });
    });
    document.querySelectorAll("#page-home .filter-chip").forEach(btn => {
      btn.setAttribute("role", "button");
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        const f = btn.dataset.filter;
        Search.toggleFilter(f, btn.classList.contains("active"));
        Search.applyForHome();
        btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
        announce("Filter updated: " + f + " = " + btn.classList.contains("active"));
      });
    });
    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");
    searchInput.addEventListener("input", e => {
      searchClear.classList.toggle("visible", e.target.value.length > 0);
      Search.filters.query = e.target.value.trim().toLowerCase();
      Search.applyForHome();
    });
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchClear.classList.remove("visible");
      Search.filters.query = "";
      Search.applyForHome();
    });
  
    // Bind showResults button
    const showBtn = document.getElementById('showResults');
    if (showBtn) showBtn.addEventListener('click', () => App.showResults());
},

  // Home suggestions: apply maxDistance filter only when GPS coords are available.
  renderSuggestions() {
    try {
      const list = document.getElementById("suggestionsList");
      if (!list) return;
      const { userLat, userLng } = this.state;
      let sorted = [...this.state.places];

      // Recalculate distances from actual GPS position when available
      if (userLat !== null && userLng !== null) {
        sorted = sorted.filter(p => p && typeof p === 'object');
        sorted = sorted.map(p => {
          let distance = 999; // Default max distance
          if (p && p.location && typeof p.location.lat === 'number' && typeof p.location.lng === 'number') {
            distance = this.haversine(userLat, userLng, p.location.lat, p.location.lng);
          }
          return {
            ...p,
            distance: distance
          };
        });
        // Apply maxDistance radius only when coords exist — otherwise show all
        sorted = sorted.filter(p => (p.distance ?? 999) <= (Search.filters.maxDistance ?? 999));
      }

      sorted.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
      list.innerHTML = sorted.slice(0, 12).map(this.cardTemplate).join("");
      list.addEventListener("click", handleCardClick);
      console.log('[QA] renderSuggestions',
        { userLat, userLng, radius: Search.filters.maxDistance, count: Math.min(sorted.length, 12) });
    } catch (e) {
      console.error('[QA] renderSuggestions error', e);
    }
  },

  cardTemplate(place) {
    const costClass = place.cost.level === "free" ? "free" : "paid";
    const imageHtml = place.image
      ? `<img src="${place.image}" alt="${place.imageAlt || place.name}" class="place-card-img" loading="lazy">`
      : "";
    const fallbackEmoji = !place.image && place.emoji ? `<span class="place-emoji-fallback">${place.emoji}</span>` : "";
    return `
      <article class="place-card" data-id="${place.id}">
        <div class="place-card-image">
          ${imageHtml}
          ${fallbackEmoji}
          <span class="cost-badge ${costClass}">${place.cost.label}</span>
        </div>
        <div class="place-card-body">
          <h3 class="place-card-title">${place.name}</h3>
          <div class="place-card-meta">
            <span class="meta-item">${place.distance != null ? place.distance.toFixed(1) + ' ק"מ' : 'מרחק נטען'}</span>
            <span class="meta-item">⭐ ${place.rating}</span>
            <span class="meta-item">🕐 ${place.duration}</span>
          </div>
          <p class="place-card-desc">${place.description.short}</p>
          ${place.personalReview ? `<p class="place-card-review">💬 ${place.personalReview.text}</p>` : ""}
          <div class="place-card-tags">
            ${place.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
      </article>`;
  }
};


  // Price filter buttons — ARIA + announcements
  document.querySelectorAll(".price-btn").forEach(btn => {
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", btn.classList.contains("active") ? "true" : "false");
    btn.addEventListener("click", () => {
      document.querySelectorAll(".price-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");
      const price = btn.dataset.price;
      Search.filters.price = price;
      const labels = { all: "הכל", free: "חינם", cheap: "₪", medium: "₪₪", expensive: "₪₪₪" };
      announce("Price type: " + (labels[price] || price));
      Search.apply();
    });
  });

// Accessibility settings — localStorage sync
const Accessibility = {
  init() {
    this.load();
    this.bind();
  },
  load() {
    try {
      const saved = localStorage.getItem('accessibility');
      if (saved) {
        const settings = JSON.parse(saved);
        if (settings.fontSize) document.documentElement.style.setProperty('--font-size', settings.fontSize);
        if (settings.contrast !== undefined) document.documentElement.classList.toggle('high-contrast', settings.contrast);
        if (settings.reducedMotion) document.documentElement.classList.add('reduced-motion');
      }
    } catch(e) {}
  },
  save(settings) {
    try { localStorage.setItem('accessibility', JSON.stringify(settings)); } catch(e) {}
  },
  bind() {
    const slider = document.getElementById('accessibility-font-size');
    const contrast = document.getElementById('accessibility-contrast');
    const motion = document.getElementById('accessibility-motion');
    if (slider) slider.addEventListener('input', () => {
      document.documentElement.style.setProperty('--font-size', slider.value + 'px');
      this.save({ fontSize: slider.value });
    });
    if (contrast) contrast.addEventListener('change', () => {
      document.documentElement.classList.toggle('high-contrast', contrast.checked);
      this.save({ contrast: contrast.checked });
    });
    if (motion) motion.addEventListener('change', () => {
      document.documentElement.classList.toggle('reduced-motion', motion.checked);
      this.save({ reducedMotion: motion.checked });
    });
  }
};

// Distance slider — debounced, only updates distanceValue, no page reload
(function() {
  const slider = document.getElementById('distanceSlider');
  const valueDisplay = document.getElementById('distanceValue');
  if (slider && valueDisplay) {
    slider.addEventListener('input', function() {
      const val = this.value;
      this.setAttribute('aria-valuenow', val);
      debounceDistanceSlider(function() {
        valueDisplay.textContent = val + ' ק"מ';
        try { localStorage.setItem('distanceSlider', val); } catch(e) {}
      }, 500);
    });
  }
})();

document.addEventListener("DOMContentLoaded", () => App.init());
