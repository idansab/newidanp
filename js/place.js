const Place = {
  open(id) {
    try {
      const p = App.state.places.find(x => x.id == id);
      if (!p) {
        console.error('[QA] Place.open: no place found for id', id, 'available ids:', App.state.places.map(x => x.id));
        return;
      }
      App.state.currentPlace = p;

      // Gallery
      try {
        document.getElementById("galleryCategory").textContent = p.category;
        const gallery = document.getElementById("placeGallery");
        if (p.image) {
          gallery.innerHTML = `<img src="${p.image}" alt="${p.imageAlt || p.name}" class="place-gallery-img" loading="lazy" onerror="this.style.display='none'"><span class="gallery-category" id="galleryCategory">${p.category}</span>`;
        } else {
          gallery.innerHTML = `<span class="gallery-category" id="galleryCategory">${p.category}</span>`;
        }
      } catch (err) {
        console.error('[QA] Place.open gallery error:', err);
      }

      // Category badge
      try {
        document.getElementById("placeCategoryBadge").textContent = p.category;
      } catch (err) {
        console.error('[QA] Place.open category badge error:', err);
      }

      // Meta
      try {
        document.getElementById("placeMeta").innerHTML = `
          <span>📍 ${p.distance != null ? p.distance.toFixed(1) + ' ק"מ' : 'לא ידוע'}</span>
          <span>⭐ ${p.rating} (${p.reviews})</span>
          <span>🕐 ${p.duration}</span>
          <span>💰 ${p.cost.label}</span>
        `;
      } catch (err) {
        console.error('[QA] Place.open meta error:', err);
      }

      // Tags
      try {
        document.getElementById("placeTags").innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join("");
      } catch (err) {
        console.error('[QA] Place.open tags error:', err);
      }

      // Description
      try {
        document.getElementById("placeDescription").textContent = p.description.full;
      } catch (err) {
        console.error('[QA] Place.open description error:', err);
      }

      // Quick info grid
      try {
        document.getElementById("quickInfoGrid").innerHTML = `
          <div class="info-item"><span class="icon">🕐</span> ${p.hours.note}</div>
          <div class="info-item"><span class="icon">⏱️</span> ${p.duration}</div>
          <div class="info-item"><span class="icon">📍</span> ${p.location.address}</div>
          <div class="info-item"><span class="icon">⭐</span> ${p.rating} / 5 (${p.reviews} ביקורות)</div>
        `;
      } catch (err) {
        console.error('[QA] Place.open quickInfoGrid error:', err);
      }

      // Amenities
      try {
        const amenityLabels = {
          restrooms: "🚻 שירותים", parking: "🅿️ חניה", shade: "🌳 צל",
          picnic: "🧺 פיקניק", water: "💧 מים", wheelchair: "♿ נגישות",
          dogs: "🐕 כלבים", bbq: "🔥 מנגלים", swimming: "🏊 רחצה", store: "🛒 חנות"
        };
        document.getElementById("amenitiesGrid").innerHTML = Object.entries(p.amenities).map(([k, v]) => {
          const label = amenityLabels[k] || k;
          return `<div class="amenity-item ${v ? 'yes' : 'no'}">${label} — ${v ? "✅ יש" : "❌ אין"}</div>`;
        }).join("");
      } catch (err) {
        console.error('[QA] Place.open amenities error:', err);
      }

      // Tips and personal review
      try {
        const tipsHtml = p.tips.map(t => `
          <div class="tip-item">
            <div>${t.text}</div>
            <div class="tip-author">— ${t.author}</div>
          </div>
        `).join("");

        const reviewHtml = p.personalReview ? `
          <div class="tip-item personal-review">
            <div>💬 ${p.personalReview.text}</div>
            <div class="tip-author">— ${p.personalReview.author || 'החוויה שלי'}</div>
          </div>
        ` : "";

        document.getElementById("tipsList").innerHTML = reviewHtml + tipsHtml;
      } catch (err) {
        console.error('[QA] Place.open tips error:', err);
      }

      // Nearby places
      try {
        const nearby = App.state.places.filter(x => x.id !== p.id).sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999)).slice(0, 4);
        document.getElementById("nearbyList").innerHTML = nearby.map(n => `
          <div class="nearby-item" data-id="${n.id}">
            <div class="nearby-item-icon">${n.emoji}</div>
            <div class="nearby-item-name">${n.name}</div>
            <div class="nearby-item-dist">${n.distance != null ? n.distance.toFixed(1) + ' ק"מ' : ''}</div>
          </div>
        `).join("");

        // Nearby list click handler
        document.getElementById("nearbyList").onclick = e => {
          try {
            const item = e.target.closest(".nearby-item");
            if (item) Place.open(item.dataset.id);
          } catch (err) {
            console.error('[QA] Place.open nearby onclick error:', err);
          }
        };
      } catch (err) {
        console.error('[QA] Place.open nearby error:', err);
      }

      // Favorite button
      try {
        this.updateFavoriteBtn(p.id);
      } catch (err) {
        console.error('[QA] Place.open favorite error:', err);
      }

      // Page navigation
      try {
        document.getElementById("page-place").classList.add("active");
        document.getElementById("page-home").classList.remove("active");
        document.getElementById("page-results").classList.remove("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error('[QA] Place.open page navigation error:', err);
      }
    } catch (err) {
      console.error('[QA] Place.open general error:', err);
    }
  },

  updateFavoriteBtn(id) {
    try {
      const btn = document.getElementById("favoriteBtn");
      const isFav = Favorites.has(id);
      btn.textContent = isFav ? "❤️" : "🤍";
      btn.classList.toggle("favorited", isFav);
      btn.onclick = () => {
        try {
          Favorites.toggle(id);
          this.updateFavoriteBtn(id);
          Toast.show(isFav ? "הוסר ממועדפים" : "נשמר במועדפים ❤️");
        } catch (err) {
          console.error('[QA] Favorite button onclick error:', err);
        }
      };
    } catch (err) {
      console.error('[QA] updateFavoriteBtn error:', err);
    }
  },

  navigate() {
    try {
      const p = App.state.currentPlace;
      if (!p) return;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${p.location.lat},${p.location.lng}`;
      window.open(url, "_blank");
    } catch (err) {
      console.error('[QA] navigate error:', err);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("navigateBtn").addEventListener("click", () => Place.navigate());
  document.getElementById("shareBtn").addEventListener("click", () => {
    try {
      const p = App.state.currentPlace;
      if (!p) return;
      if (navigator.share) {
        navigator.share({ title: p.name, text: p.description.short, url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href);
        Toast.show("הקישור הועתק ללוח");
      }
    } catch (err) {
      console.error('[QA] shareBtn error:', err);
    }
  });
});