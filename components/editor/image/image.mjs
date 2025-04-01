const n = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><rect width="14" height="14" x="5" y="5" stroke="currentColor" stroke-width="2" rx="4"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.13968 15.32L8.69058 11.5661C9.02934 11.2036 9.48873 11 9.96774 11C10.4467 11 10.9061 11.2036 11.2449 11.5661L15.3871 16M13.5806 14.0664L15.0132 12.533C15.3519 12.1705 15.8113 11.9668 16.2903 11.9668C16.7693 11.9668 17.2287 12.1705 17.5675 12.533L18.841 13.9634"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.7778 9.33331H13.7867"/></svg>';
class d {
  constructor({ data: t, config: s, api: e, block: a, readOnly: i }) {
    this.data = t, this.config = s, this.api = e, this.block = a, this.readOnly = i, this.nodes = {
      wrapper: null
    }, this._css = {
      block: this.api.styles.block
    }, this._imageSrc = "";
  }
  static get toolbox() {
    return {
      title: "Image",
      icon: n
    };
  }
  render() {
    const t = document.createElement("div"), s = document.createElement("img"), e = document.createElement("input");
    return t.classList.add("block-image"), s.classList.add("ce-image"), e.type = "file", e.classList.add("ce-input"), t.appendChild(e), e.addEventListener("change", (a) => {
      const i = a.target.files[0], r = new FileReader();
      r.addEventListener("load", (l) => {
        i.size < 5e5 ? (s.src = r.result, this._imageSrc = r.result, e.style.display = "none", t.appendChild(s)) : e.style.setProperty("--opacity", "1");
      }, !1), i && r.readAsDataURL(i);
    }), this.data && (e.style.display = "none", s.src = this.data.datasrc, t.appendChild(s)), t;
  }
  save(t) {
    return {
      datasrc: this._imageSrc
    };
  }
}
export {
  d as default
};
