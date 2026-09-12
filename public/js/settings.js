const Settings = {
  defaults: { location: "עמק יזרעאל", radius: 30, dark: false },

  // City name → coordinates (center, ±1 km). Used for haversine; UI always shows city names.
  LOCATION_DB: {
    "נוף הגליל":   { lat: 32.6996, lng: 35.3080 },
    "נתניה":       { lat: 32.3215, lng: 34.8532 },
    "רמת הגולן":   { lat: 33.0106, lng: 35.5985 },
    "טבריה":       { lat: 32.7940, lng: 35.5307 },
    "כרמיאל":      { lat: 32.9205, lng: 35.2919 },
    "עמק יזרעאל":  { lat: 32.6543, lng: 35.1234 },
    "מיקום נוכחי (GPS)": null
  },

  _suppressApply: false,

  init() {
    // Bind ALL location selects (page + modal), ALL radius sliders, ALL dark toggles
    const locSelects = [
      document.getElementById("defaultLocation"),
      document.getElementById("modalLocation")
    ].filter(Boolean);

    const radiusInputs = [
      document.getElementById("defaultRadius"),
      document.getElementById("modalRadius")
      // distanceSlider intentionally excluded — it only updates display text (debounced), does NOT trigger Search.apply()
    ].filter(Boolean);

    const darkToggles = [
      document.getElementById("darkModeToggle"),
      document.getElementById("modalDarkModeToggle")
    ].filter(Boolean);

    // Radius displays
    const syncRadiusDisplays = (val) => {
      const d1 = document.getElementById("radiusDisplay");
      const d2 = document.getElementById("modalRadiusDisplay");
      const d3 = document.getElementById("distanceValue");
      if (d1) d1.textContent = String(val);
      if (d2) d2.textContent = String(val);
      if (d3) d3.textContent = `${val} ק"מ`;
    };

    const collectAndApply = () => {
      if (this._suppressApply) return;
      // Take values from the element that triggered, but prefer stored + current
      // For location: use whichever select changed last; if both exist they are synced so either is fine
      const loc = document.getElementById("modalLocation")?.value
               || document.getElementById("defaultLocation")?.value
               || this.defaults.location;
      // Radius: take from active input, but they are synced so any of them
      const radiusEl = document.activeElement && radiusInputs.includes(document.activeElement)
        ? document.activeElement
        : (document.getElementById("defaultRadius") || document.getElementById("modalRadius"));
      const radius = radiusEl ? Number(radiusEl.value) : this.defaults.radius;
      const darkEl = document.activeElement && darkToggles.includes(document.activeElement)
        ? document.activeElement
        : (document.getElementById("darkModeToggle") || document.getElementById("modalDarkModeToggle"));
      const dark = darkEl ? !!darkEl.checked : this.defaults.dark;

      // Need to know which location value is authoritative – if user changed a location select, that select's value should win
      // So check activeElement if it's a location select
      let locationVal = loc;
      if (document.activeElement && locSelects.includes(document.activeElement)) {
        locationVal = document.activeElement.value;
      }
      this.apply({ location: locationVal, radius, dark });
    };

    locSelects.forEach(el => {
      el.addEventListener("change", collectAndApply);
      el.addEventListener("input", collectAndApply);
    });

    radiusInputs.forEach(el => {
      el.addEventListener("input", (e) => {
        syncRadiusDisplays(e.target.value);
        collectAndApply();
      });
      el.addEventListener("change", collectAndApply);
    });
    // distanceSlider: only sync display, do NOT call collectAndApply/Search.apply()
    const distanceSlider = document.getElementById("distanceSlider");
    if (distanceSlider) {
      distanceSlider.addEventListener("input", (e) => {
        syncRadiusDisplays(e.target.value);
      });
    }

    darkToggles.forEach(el => el.addEventListener("change", collectAndApply));

    const installBtn = document.getElementById("installBtn");
    if (installBtn) installBtn.addEventListener("click", () => Toast.show("כדי להתקין: סייר ב-Chrome → ... → הוסף למסך הבית"));

    // Waypoint chip click already handled in inline script (opens modal). Also allow direct GPS via long press / waypoint icon
    const waypoint = document.querySelector("#header-location .waypoint");
    if (waypoint) {
      waypoint.style.cursor = "pointer";
      waypoint.addEventListener("click", (e) => {
        e.stopPropagation();
        // Trigger GPS: set location to GPS placeholder and request position
        this.apply({ location: "מיקום נוכחי (GPS)", radius: this.get().radius ?? this.defaults.radius, dark: this.get().dark ?? this.defaults.dark });
        if (typeof App !== "undefined" && App.requestLocation) App.requestLocation(true);
      });
    }

    const stored = this.get();
    this.apply({ ...this.defaults, ...stored }, { skipStore: false });
  },

  get() {
    try { return JSON.parse(localStorage.getItem("settings") || "{}"); }
    catch { return {}; }
  },

  apply(data, opts = {}) {
    const merged = { location: data.location ?? this.defaults.location, radius: data.radius ?? this.defaults.radius, dark: !!data.dark };
    // Clamp radius
    merged.radius = Math.min(100, Math.max(1, Number(merged.radius) || this.defaults.radius));

    // Prevent re-entrant apply during control sync
    this._suppressApply = true;

    // Sync ALL controls to merged values (no city list shows coordinates – always city names)
    const loc1 = document.getElementById("defaultLocation");
    const loc2 = document.getElementById("modalLocation");
    if (loc1) loc1.value = merged.location;
    if (loc2) loc2.value = merged.location;

    const r1 = document.getElementById("defaultRadius");
    const r2 = document.getElementById("modalRadius");
    const r3 = document.getElementById("distanceSlider");
    if (r1) r1.value = String(merged.radius);
    if (r2) r2.value = String(merged.radius);
    if (r3) r3.value = String(merged.radius);

    const rd1 = document.getElementById("radiusDisplay");
    const rd2 = document.getElementById("modalRadiusDisplay");
    const rd3 = document.getElementById("distanceValue");
    if (rd1) rd1.textContent = String(merged.radius);
    if (rd2) rd2.textContent = String(merged.radius);
    if (rd3) rd3.textContent = `${merged.radius} ק"מ`;

    const d1 = document.getElementById("darkModeToggle");
    const d2 = document.getElementById("modalDarkModeToggle");
    if (d1) d1.checked = merged.dark;
    if (d2) d2.checked = merged.dark;
    document.documentElement.setAttribute("data-theme", merged.dark ? "dark" : "light");

    // Search radius filter is the single source for filtering
    if (typeof Search !== "undefined" && Search.filters) {
      Search.filters.maxDistance = merged.radius;
    }

    // Resolve location name → coordinates (GPS placeholder keeps last GPS fix)
    const locName = (merged.location || this.defaults.location || "").trim();
    const db = this.LOCATION_DB;
    if (locName === "מיקום נוכחי (GPS)") {
      // Do not overwrite App.state.userLat/Lng – GPS handler owns them.
      // If no GPS yet, leave as is (App.requestLocation will fill it)
    } else if (db[locName]) {
      if (typeof App !== "undefined" && App.state) {
        App.state.userLat = db[locName].lat;
        App.state.userLng = db[locName].lng;
        App.state.userLocationName = locName;
      }
    } else {
      // Unknown name – try to parse coords (fallback), but UI still shows the name
      if (typeof App !== "undefined" && App.state && App.state.userLat === null) {
        const m = locName.match(/(-?\d{1,2}(?:\.\d+)?)[^\d]*(-?\d{1,2}(?:\.\d+)?)/);
        if (m) {
          App.state.userLat = Number(m[1]);
          App.state.userLng = Number(m[2]);
        }
      }
      if (typeof App !== "undefined" && App.state) App.state.userLocationName = locName;
    }

    // Header chip: always show city name (not coords) + radius
    const locEl = document.getElementById("header-location");
    if (locEl) {
      const nameEl = locEl.querySelector("span:nth-child(2)");
      const radiusEl = locEl.querySelector(".radius");
      // For GPS, show the reverse-geocoded name if available, else the placeholder label
      let displayName = locName;
      if (locName === "מיקום נוכחי (GPS)" && typeof App !== "undefined" && App.state && App.state.userLocationName) {
        displayName = App.state.userLocationName;
      }
      if (nameEl) nameEl.textContent = displayName || this.defaults.location;
      if (radiusEl) radiusEl.textContent = `${merged.radius} ק"מ`;
    }

    if (!opts.skipStore) {
      localStorage.setItem("settings", JSON.stringify(merged));
    }

    this._suppressApply = false;

    // Recalc distances and re-render (coords-based, but UI is city names)
    if (typeof App !== "undefined") {
      if (App.updateDistances) App.updateDistances();
      if (App.renderSuggestions) App.renderSuggestions();
      if (typeof Search !== "undefined" && Search.apply) Search.apply({ navigate: false });
    }
  }
};

// Keep legacy REGION_COORDS alias for older app.js code that might reference it
const REGION_COORDS = Settings.LOCATION_DB;
