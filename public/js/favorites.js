const Favorites = {
  get() {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); }
    catch { return []; }
  },
  add(id) {
    const list = this.get();
    if (!list.includes(id)) { list.push(id); localStorage.setItem("favorites", JSON.stringify(list)); }
  },
  remove(id) {
    const list = this.get().filter(x => x !== id);
    localStorage.setItem("favorites", JSON.stringify(list));
  },
  toggle(id) { this.has(id) ? this.remove(id) : this.add(id); },
  has(id) { return this.get().includes(id); },
  render() {
    const ids = this.get();
    const items = App.state.places.filter(p => ids.includes(p.id));
    document.getElementById("emptyFavorites").style.display = items.length ? "none" : "block";
    document.getElementById("favoritesList").innerHTML = items.map(App.cardTemplate).join("");
    document.getElementById("favoritesList").onclick = e => {
      const card = e.target.closest(".place-card");
      if (card) Place.open(card.dataset.id);
    };
  }
};
