import {Component} from './component.js'
import {Popup} from './popup.js'

export class Person extends Component {
    constructor(args) {
        super(args);
    }
    get birthDateStr() {
        let m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const date = this.stats.args['birthDate'];
        return date.getDate() + ' ' + m[date.getMonth()];
    }
    get age() {
        const a = Math.floor((Date.now() - this.stats.args['birthDate']) / 3.154e+10);
        let b = 'лет';
        if ((a > 20) | (a < 10)) {
            b = (a+10-1)%10 < 5 ? 'года' : 'лет';
            if (a%10 == 1) b = 'год';
        }
        return a + ' ' + b;
    }
    render() {
        return `<div class="card">
                    <img class="card__image" src="img/${this.stats.args['photoUrl']}">
                    <div class="card-title">${this.stats.args['fullName']}</div>
                    <div class="card-text">${this.stats.args['university']} ${this.stats.args['course']} курс</div>
                </div>`;
    }
    afterMount() {
        this.subscribeTo(this.getContainer(), 'click', this.onClick.bind(this));
    }
    getStatus() {}
    onClick(){
        const status = this.getStatus();
        const popup = new Popup({
            'name': this.stats.args['fullName'],
            'title': ['День рождения:', status['title']],
            'value': [this.birthDateStr + ' ' + this.age, status['value']],
            'image': this.stats.args['photoUrl'],
        })
        popup.stats['target'] = this.getContainer();
        popup.mount(document.getElementsByTagName('main')[0]);
    }
};