class r {
  constructor({ data: t, config: e, api: n, block: s, readOnly: i }) {
    this.data = t, this.config = e, this.api = n, this.block = s, this.readOnly = i, this.nodes = {
      wrapper: null
    }, this._data = null, this._element, this._css = {
      block: this.api.styles.block,
      wrapper: "ce-quote"
    }, this._placeholder = "Entrez votre texte";
  }
  static get toolbox() {
    return {
      title: "Quote",
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.97796 12.8421H6.24447C6.24447 12.8421 5.0001 12.8421 5.0001 11.4737C5.0001 10.1053 5 7.36842 5 7.36842C5 7.36842 5 6 6.24437 6C7.48874 6 8.11126 6 9.35563 6C10.6 6 10.6 7.36842 10.6 7.36842C10.6 7.36842 10.6 10.6429 10.6 12.8421C10.6 15.7827 6.24438 19 6.24438 19" stroke="black" stroke-width="1.5"/><path d="M18.3779 12.8421H14.6444C14.6444 12.8421 13.4 12.8421 13.4 11.4737C13.4 10.1053 13.3999 7.36842 13.3999 7.36842C13.3999 7.36842 13.3999 6 14.6443 6C15.8886 6 16.5112 6 17.7555 6C18.9999 6 18.9999 7.36842 18.9999 7.36842C18.9999 7.36842 18.9999 10.6429 18.9999 12.8421C18.9999 15.7827 14.6443 19 14.6443 19" stroke="black" stroke-width="1.5"/></svg>'
    };
  }
  onKeyUp(t) {
    if (t.code !== "Backspace" && t.code !== "Delete")
      return;
    let e;
    this._element !== void 0 && (e = this._element.textContent), e === "" && (this._element.innerHTML = "");
  }
  render() {
    const t = document.createElement("div");
    t.classList.add(this._css.block, this._css.wrapper);
    const e = document.createElement("div"), n = document.createElement("div");
    return e.classList.add(this._css.block, "ce-content"), n.classList.add(this._css.block, "ce-auteur"), e.contentEditable = !1, n.contentEditable = !1, e.dataset.placeholder = this.api.i18n.t(this._placeholder), t.appendChild(e), t.appendChild(n), this.readOnly || (e.contentEditable = !0, n.contentEditable = !0, t.addEventListener("keyup", this.onKeyUp)), this.data && (e.innerText = this.data.texte, n.innerText = this.data.auteur), this.data.hasOwnProperty("texte") || (e.innerText = this._placeholder, n.innerText = "Auteur"), this._element = t, t;
  }
  save(t) {
    const e = t.querySelector(".ce-content");
    return {
      auteur: t.querySelector(".ce-auteur").innerText,
      texte: e.innerText
    };
  }
}
export {
  r as default
};
