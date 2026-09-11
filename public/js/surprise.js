const Surprise = {
  state: { freeOnly: false, closeOnly: false, quickOnly: false, countryAll: true },
  init() {
    document.getElementById("surpriseAgain").addEventListener("click", () => this.pick());
    document.getElementById("surpriseAccept").addEventListener("click", () => {
      if (this.current) Place.open(this.current.id);
    });
    document.querySelectorAll("#page-surprise .filter-chip[data-sfilter], #page-surprise .filter-chip[data-region]").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        const sf = btn.dataset.sfilter;
        if (sf === "free") this.state.freeOnly = btn.classList.contains("active");
        if (sf === "all-country") this.state.countryAll = btn.classList.contains("active");
        if (sf === "close") this.state.closeOnly = btn.classList.contains("active");
        if (sf === "quick") this.state.quickOnly = btn.classList.contains("active");
      });
    });
  },

  pick() {
    const settings = Settings.get();
    const radius = Number(settings?.radius ?? 30);
    const region = this.state.countryAll ? "" : (settings?.location || "").trim();
    const { userLat, userLng } = App.state;

    const eligible = App.state.places.filter(p => {
      const distanceOk = userLat !== null && userLng !== null
        ? App.haversine(userLat, userLng, p.location.lat, p.location.lng) <= radius
        : (p.distance ?? 30) <= radius;
      const regionOk = !region || p.region === region || p.location.address.includes(region);
      const freeOk = this.state.freeOnly ? p.cost.level === "free" : true;
      const closeOk = this.state.closeOnly ? (p.distance ?? 999) <= 10 : true;
      const quickOk = this.state.quickOnly ? p.duration && p.duration.includes("30") : true;
      return distanceOk && regionOk && freeOk && closeOk && quickOk;
    });

    if (!eligible.length) {
      Toast.show("לא מצאנו מקומות בטווח הזה — נסה להרחיב מרחק או לשנות אזור");
      return;
    }

    this.current = eligible[Math.floor(Math.random() * eligible.length)];
    document.getElementById("surprisePlaceholder").style.display = "none";
    document.getElementById("surpriseResult").style.display = "block";
    document.getElementById("surpriseAccept").style.display = "inline-block";
    document.getElementById("surpriseResult").innerHTML = `
      <div class="surprise-result">
        <div class="place-emoji">${this.current.emoji}</div>
        <div class="place-name">${this.current.name}</div>
        <div class="place-meta">
          <span>📍 ${this.current.distance != null ? this.current.distance.toFixed(1) + ' ק"מ' : ''}</span>
          <span>⭐ ${this.current.rating}</span>
          <span>💰 ${this.current.cost.label}</span>
        </div>
        <div class="place-desc">${this.current.description.short}</div>
      </div>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => Surprise.init());
