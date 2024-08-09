
function dom(str) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = str
    return wrapper.children[0]
}

const style = `
    .side-menu-wrapper {
        position: fixed;
        top: 0;
        left: 0;

        z-index: 99999 !important;
        overflow: hidden;

        width: 0vw;
        height: 100vh;
    }
    .side-menu-wrapper--open {
        width: 100vw;
    }

    .side-menu-black-overlay {
        height: 100vh;
        width: 100%;

        background-color: black;

        z-index: 99991;
        opacity: 0;
        transition: 0.5s;
    }
    .side-menu-black-overlay--open {
        opacity: 0.5;
    }

    .side-menu {
        --width: min(300px, 70vw);

        position: absolute;

        height: 100vh;
        width: var(--width);

        top: 0;
        left: calc(-1 * var(--width));
        
        z-index: 99990 !important;

        transition: 0.5s;
        
        background-color: black;
        color: white;
    }

    .side-menu--open {
        left: 0vw !important;
    }
`

class SideMenu extends HTMLElement {

    static get observedAttributes() {
        return ['is-open']
    }

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })

        this.sideMenuWrapper = dom(`
            <div class="side-menu-wrapper">
                <div class="side-menu-black-overlay"></div>
                <div class="side-menu">
                    <slot></slot>
                </div>
            </div>
        `)

        const elemStyle = document.createElement('style')
        elemStyle.textContent = style

        this.sideMenuWrapper.addEventListener('click', evt => this.closeSideMenu())
        this.sideMenuWrapper.querySelector('.side-menu').addEventListener('click', evt => evt.stopPropagation())

        this.shadowRoot.appendChild(this.sideMenuWrapper)
        this.shadowRoot.appendChild(elemStyle)

        this.state = 'CLOSED'
    }

    connectedCallback() {
        
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'is-open':
                if (newValue == 'true') {
                    this.openSideMenu()
                } else {
                    this.closeSideMenu()
                }
                break
        }
    }

    openSideMenu() {
        this.sideMenuWrapper.classList.add('side-menu-wrapper--open')
        this.sideMenuWrapper.querySelector('.side-menu-black-overlay').classList.add('side-menu-black-overlay--open')
        this.sideMenuWrapper.querySelector('.side-menu').classList.add('side-menu--open')
        this.state = 'OPEN'
    }

    closeSideMenu() {
        if (this.state != 'OPEN') {
            return
        }
        this.state = 'CLOSING'
        this.sideMenuWrapper.querySelector('.side-menu-black-overlay').classList.remove('side-menu-black-overlay--open')
        this.sideMenuWrapper.querySelector('.side-menu').classList.remove('side-menu--open')
        setTimeout(() => {
            this.sideMenuWrapper.classList.remove('side-menu-wrapper--open')
            this.state = 'CLOSED'
        }, 500)
    }
}

customElements.define('side-menu', SideMenu)