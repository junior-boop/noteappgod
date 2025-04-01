class l {
  constructor({ data: t, config: e, api: n, block: i, readOnly: s }) {
    this.data = t, this.config = e, this.api = n, this.block = i, this.readOnly = s, this.nodes = {
      wrapper: null
    }, this._data = null, this._element, this._css = {
      block: this.api.styles.block,
      wrapper: "ce-titre"
    }, this._placeholder = "Entrez votre text";
  }
  static get toolbox() {
    return {
      title: "Grand Titre",
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="white"/><path d="M11 19.3172V5.8" stroke="black" stroke-width="1.5"/><path d="M14 14.0069L17 13.0414V19.8" stroke="black" stroke-width="1.5"/><path d="M6 7.73104V5.8H16V7.73104" stroke="black" stroke-width="1.5"/><path d="M13 19.3172H9" stroke="black" stroke-width="1.5"/></svg>'
    };
  }
  onKeyUp(t) {
    if (t.code !== "Backspace" && t.code !== "Delete")
      return;
    let e;
    this._element !== void 0 && (e = this._element.textContent), e === "" && (this._element.innerHTML = "");
  }
  render() {
    const t = document.createElement("h1"), e = "<span contenteditable='false'>Votre titre</span>";
    t.classList.add(this._css.block, this._css.wrapper), t.contentEditable = !1;
    const n = () => {
      if (t.innerText.length === 0)
        t.innerHTML = e;
      else {
        const s = t.querySelector("span");
        s !== null && (s.style.display = "none");
      }
    }, i = () => {
      t.textContent === "Votre titre" && (t.innerHTML = "");
    };
    return this.readOnly || (t.contentEditable = !0, t.addEventListener("input", n), t.addEventListener("focus", i), t.addEventListener("blur", n)), this.data.text || (t.innerHTML = e), n(), this.data.text && (t.innerText = this.data.text), this._element = t, t;
  }
  save(t) {
    return {
      text: t.innerText
    };
  }
}
export {
  l as default
};
