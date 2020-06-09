import {Popup} from './popup.js'

export class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openPopup: false
        };
        this.key = this.props.keyClone;
        this.onClick = this.onClick.bind(this);
    }

    get birthDateStr() {
        if (!this.props['bday']) return '';
        let m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        const date = new Date(this.props['bday']);
        return date.getDate() + ' ' + m[date.getMonth()];
    }

    get age() {
        if (!this.props['bday']) return 'Once, a long time ago';
        const a = Math.floor((Date.now() - new Date(this.props['bday'])) / 3.154e+10);
        let b = 'лет';
        if ((a > 20) | (a < 10)) {
            b = (a+10-1)%10 < 5 ? 'года' : 'лет';
            if (a%10 == 1) b = 'год';
        }
        return a + ' ' + b;
    }

    render() {

        const img = React.createElement('img', {
            className: `card__image`, 
            src: `img/${this.props['photo'] || 'default_pix.jpg'}`,
            key: `${this.key}-image`
        }, null);

        const title = React.createElement('div', {
            className: `card-title`,
            key: `${this.key}-title`
        }, this.props['name'] || 'Name');

        return React.createElement('div', {
            className: 'card', 
            key: this.key,
            onClick: this.onClick
        }, img, title, React.createElement(Popup, {
            args: this.popup(),
            openPopup: this.state.openPopup,
            parent: this
        }));
    }

    popup() {
        const {title='Status:', value='somebody'} = this.getStatus() || {};
        return {
            'title': this.props['name'] || 'Name',
            'description': [
                ['День рождения:', this.birthDateStr + ' ' + this.age],
                [title, value],
                ['Телефон:', this.props['phone'] || '112'],
            ],
            'image': this.props['photo'] || 'default_pix.jpg'
        };
    }

    getStatus() {}

    componentDidMount() {
        this.sibscribeTo('click');
        // this.setState({
        //     container: ReactDOM.findDOMNode(this)
        // });
    }

    sibscribeTo(event) {
        if (window.myEvent.eventListener['click']) {
            window.myEvent.eventListener['click'].push(this);
        }
    }

    componentDidUpdate() {
        // console.log(this.state)
    }

    update() {
        if (window.myEvent.onClick == this.key) this.onClick()
        else this.setState({openPopup: false})
    }

    onClick(){
        if (window.myEvent && (window.myEvent.onClick != this.key)) {
            window.myEvent.onClick = this.key;
            if (!this.state.openPopup) {
                this.setState({openPopup: true});
            }
        }
    }
};