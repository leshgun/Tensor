import {Component} from './component.js'

export class Popup extends Component{
	render(args) {
        let r = `<div class="popup">
                    <div class="popup__exit">
                        <img src="img/exit.png">
                    </div>
                    <div class="popup__content">
                    <div class="popup__description">
                    <div class="popup__name">${args.title}</div>`
		args.description.forEach((arr) => {
            r += `<div class="popup__sub_title">
                    <div class="popup__sub_title__value text-secondary">${arr[0]}</div>
                    <div class="popup__sub_title__value">${arr[1]}</div>
                </div>`
        })
        r += `</div><div class="popup__image"><img src="img/${args.image}"></div>
            </div></div></div></div>`
        return r
	}
    beforeMount() {
        const d = document.getElementsByClassName('popup')[0];
        if (d) d.remove();
    }
    afterMount() {
        this.stats['exit'] = this.getContainer().querySelector('.popup__exit img');
        this.subscribeTo(this.stats['exit'], 'click', this.onClose.bind(this));
        this.setPopupPosition();
    }
    beforeUnmount() {
        delete this.stats['exit'];
    }
    setTarget(target) {
        this.stats['target'] = target;
    }
    setPopupPosition() {
        const container = this.getContainer();

        // выставляем значения по умолчанию для получения реальных размеров в доме
        container.style.left = '0px';
        container.style.top = '0px';

        // получаем реальные размеры элементов окна и таргета и вычисляем куда позиционировать popup
        let position = this.coutPopupPosition(
            this.stats['target'].getBoundingClientRect(), 
            container.getBoundingClientRect()
        );
        container.style.left = position['x'] + 'px';
        container.style.top = position['y'] + 'px';
    }

    coutPopupPosition(target, offset) {
        let {width=0, height=0, left=0, top=0} = offset || {};
        let {x=0, y=0, width:w=0} = target || {};

        // получаем размер окна браузера
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // отступ от края, с учётом полосы прокрутки
        const defOffset = 20;

        // чтобы отрисовывалась под картинкой профиля
        const dy = 200;

        // берём центр
        x -= width/2 - w/2 + left;
        y += dy - top;

        // проверяем влезает ли в окно браузера, если нет, корректируем смещение
        if (x + width >= innerWidth) {
            x -= (x + width - innerWidth) + defOffset;
        }
        if (y + height + top >= innerHeight) {
            y -= (y + height + top - innerHeight) + defOffset;
        }

        // т.к. полосы прокрутки слева и сверху нет, то можно уменьшить отступ
        if (x < 0) x = defOffset/2;
        if (y < 0) y = defOffset/2;

        return {x, y};
    }

    onClose() {
        this.unmount();
    }
}