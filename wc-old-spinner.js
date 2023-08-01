class WCOldSpinner extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({
      mode: 'open'
    })
    this.rIndex = 0
    this.rotateCircle = 0
    this.startTime = Date.now()
  }

  get css() {
    return `
      <style>
        span {
          fill: #444;
          stroke: #4b8bf4;
        }
        svg {
          width: 19% !important;
          height: 85px !important;
        }
        circle{
          animation: colors 5.6s ease-in-out infinite;
        }
        @keyframes colors {
          16.666% {
              stroke: #da4f49;
          }
          33.333% {
              stroke: #2A80B9;
          }
          50% {
              stroke: #5bb75b;
          }
          66.666% {
              stroke: #e78730;
          }
          83.333% {
              stroke: #0a79fd;
          }
        }
      </style>
    `
  }

  get html() {
    return `
      <span>
        <svg viewBox="0 0 64 64">
          <g>
            <circle stroke-width="6" stroke-linecap="round" r="26" cx="32" cy="32" fill="none"></circle>
          </g>
        </svg>
      </span>
    `
  }

  render() {
    this.shadow.innerHTML = `${this.css}${this.html}`
  }

  setSvgAttribute(ele, k, v) {
    ele.setAttribute(k || k, v)
  }

  easeInOutCubic(t, c) {
    t /= c / 2
    if (t < 1) {
      return 1 / 2 * t * t * t
    }
    t -= 2
    return 1 / 2 * (t * t * t + 2)
  }

  connectedCallback() {
    this.render()
    this.g = this.shadow.querySelector('g')
    this.circle = this.shadow.querySelector('circle')
    let animate = () => {
      requestAnimationFrame(animate)
      const v = this.easeInOutCubic(Date.now() - this.startTime, 650)
      const scaleX = this.rIndex % 2 ? -1 : 1
      const translateX = this.rIndex % 2 ? -64 : 0
      const dasharray = this.rIndex % 2 ? 128 - -58 * v : 188 - 58 * v
      const dashoffset = this.rIndex % 2 ? 182 * v : 182 - 182 * v
      const rotateLine = [0, -101, -90, -11, -180, 79, -270, -191][this.rIndex]
      this.rotateCircle += 4.1
      if (this.rotateCircle > 359) this.rotateCircle = 0
      this.setSvgAttribute(this.g, 'transform', 'rotate(' + this.rotateCircle + ', 32, 32)');
      this.setSvgAttribute(this.circle, 'stroke-dasharray', Math.max(Math.min(dasharray, 188), 128));
      this.setSvgAttribute(this.circle, 'stroke-dashoffset', Math.max(Math.min(dashoffset, 182), 0));
      this.setSvgAttribute(this.circle, 'transform', 'scale(' + scaleX + ',1) translate(' + translateX + ',0) rotate(' + rotateLine + ',32,32)');
      if (v >= 1) {
        this.rIndex++
        if (this.rIndex > 7) {
          this.rIndex = 0
        }
        this.startTime = Date.now()
      }
    }
    animate()
  }
}

window.customElements.define('wc-old-spinner', WCOldSpinner);