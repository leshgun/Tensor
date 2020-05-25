'use strict';

export class Component {
    
    constructor(args) {
        this.stats = {args};
        this.container = undefined;
        
        this.handlers = {};
    }

    mount(parent) {

        this.beforeMount();

        const child = document.createElement('div');
        child.innerHTML = this.render(this.stats.args);
        parent.append(child);

        this.container = child.firstElementChild;
        parent.insertAdjacentElement('beforeend', child.firstElementChild);

        child.remove();

        this.stats['parent'] = parent;

        this.afterMount();
    }

    beforeMount() {}

    afterMount() {}

    beforeUnmount() {}

    afterUnmount() {
        this.container = undefined;
    }

    unmount() {
        this.beforeUnmount();

        this.container.remove();

        this.afterUnmount();
    }

    render() {
        return `<div>${this.stats}</div>`
    }

    getContainer() {
        if (this.container === undefined) {
            this.container = document.getElementById(this.id);
        }
        return this.container;
    }

    subscribeTo(target, eventName, handler) {
        const hand = this.handlers[eventName] || [];
        hand.push({target, handler});
        this.handlers[eventName] = hand;
        target.addEventListener(eventName, handler);
    }
}