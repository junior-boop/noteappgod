class n {
    constructor({ data: t, config: e, api: i, block: s, readOnly: a }) {
      this.data = t, this.config = e, this.api = i, this.block = s, this.readOnly = a, this.nodes = {
        wrapper: null
      }, this._css = {
        block: "note-block",
        margin: "margin",
        content: "content"
      }, this._placeholder = e.placeholder ? e.placeholder : n.DEFAULT_PLACEHOLDER, this._data = {}, this._element, this._preserveBlank = e.preserveBlank !== void 0 ? e.preserveBlank : !1;
    }
    static get toolbox() {
      return {
        title: "Petit Note",
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6818 5.63636C12.6818 5.63636 8.70455 5.63636 7.35227 5.63636C6 5.63636 6 6.90909 6 6.90909C6 6.90909 6 16 6 17.5C6 19 7.35227 19 7.35227 19H12L14.5 16.5L16.8182 14.2M16.8182 11.6818V14.2M16.8182 14.2H12V18" stroke="black" stroke-width="1.5"/><path d="M16.8181 5V10.0909" stroke="black" stroke-width="1.5"/><path d="M19.3636 7.54546H14.2727" stroke="black" stroke-width="1.5"/></svg>'
      };
    }
    render() {
      const t = document.createElement("div"), e = document.createElement("div"), i = document.createElement("div"), s = document.createElement("div");
      return e.classList.add(this._css.margin), i.classList.add(this._css.margin), s.classList.add(this._css.content), t.classList.add(this._css.block), s.contentEditable = !1, s.dataset.placeholder = this.api.i18n.t(this._placeholder), this.data.text && (s.innerText = this.data.text), t.appendChild(e), t.appendChild(s), t.appendChild(i), this._element = t, this.readOnly || (s.contentEditable = !0), t;
    }
    save(t) {
      return {
        text: t.innerText
      };
    }
    static get conversionConfig() {
      return {
        export: "text",
        import: "text"
      };
    }
    static get isReadOnlySupported() {
      return !0;
    }
  }
  export {
    n as default
  };
  