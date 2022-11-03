export class AlertComponent extends HTMLElement {
  private readonly wrapper: HTMLDivElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.textContent = this.getAttribute("message");
    wrapper.classList.add("wrapper");
    wrapper.classList.add("primary");

    const style = document.createElement("style");

    style.textContent = `
    .wrapper {
        margin: 20px auto;
        border-radius: 4px;
        text-align: center;
        padding: 12px 20px;
        width: 400px;
    }

    .top {
        position: absolute;
        top:100px;
        left: 0;
        right: 0;
    }

    .bottom {
        position: absolute;
        bottom:100px;
        left: 0;
        right: 0;
    }

    .primary {
        color: #004085;
        background-color: #cce5ff;
        border: 1px solid #b8daff;
    }

    .secondary {
        color: #383d41;
        background-color: #e2e3e5;
        border: 1px solid #d6d8db;
    }

    .danger {
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
     }

     .success {
        color: #155724;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
     }

     .warning {
        color: #856404;
        background-color: #fff3cd;
        border: 1px solid #ffeeba;
     }

     .info {
        color: #0c5460;
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
     }

     .light {
        color: #818182;
        background-color: #fefefe;
        border: 1px solid #fefefe;
     }

     .dark {
        color: #1b1e21;
        background-color: #d6d8d9;
        border: 1px solid #c6c8ca;
     }

     .disappeared {
        display:none;
     }
     `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    this.wrapper = wrapper;
  }

  static get observedAttributes() {
    return ["type", "position", "duration"];
  }

  attributeChangedCallback(
    attrName: string,
    _oldValue: string,
    newValue: string
  ) {
    switch (attrName) {
      case "type":
        this.wrapper.classList.add(`${newValue}`);
        break;
      case "position":
        this.wrapper.classList.add(`${newValue}`);
        break;
      case "duration":
        setTimeout(() => {
          this.wrapper.classList.add("disappeared");
        }, +newValue * 1000);
        break;
    }
  }
}

customElements.define("alert-component", AlertComponent);
