import {Component} from './component.js'
import {Popup} from './popup.js'

export class Person extends Component {

    constructor(args) {
        super(args);
    }

    get birthDateStr() {
        if (!this.stats.args['bday']) return '';
        let m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const date = new Date(this.stats.args['bday']);
        return date.getDate() + ' ' + m[date.getMonth()];
    }

    get age() {
        if (!this.stats.args['bday']) return 'Once, a long time ago';
        const a = Math.floor((Date.now() - new Date(this.stats.args['bday'])) / 3.154e+10);
        let b = 'лет';
        if ((a > 20) | (a < 10)) {
            b = (a+10-1)%10 < 5 ? 'года' : 'лет';
            if (a%10 == 1) b = 'год';
        }
        return a + ' ' + b;
    }

    render() {
        return `<div class="card">
                    <img class="card__image" src="img/${this.stats.args['photo'] || 'default_pix.jpg'}">
                    <div class="card-title">${this.stats.args['name'] || 'Name'}</div>
                </div>`;
    }

    afterMount() {
        this.subscribeTo(this.getContainer(), 'click', this.onClick.bind(this));
    }

    getStatus() {}

    onClick(){
        const {title='Status:', value='somebody'} = this.getStatus() || {};
        const popup = new Popup({
            'title': this.stats.args['name'] || 'Name',
            'description': [
                ['День рождения:', this.birthDateStr + ' ' + this.age],
                [title, value],
                ['Телефон:', this.stats.args['phone'] || '112'],
            ],
            'image': this.stats.args['photo'] || 'default_pix.jpg',
        })
        popup.stats['target'] = this.getContainer();
        popup.mount(document.getElementsByTagName('main')[0]);
    }
};