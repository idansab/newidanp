const Toast = {
  show(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(this._t);
    this._t = setTimeout(() => el.style.display = "none", 2500);
  }
};
