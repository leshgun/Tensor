export class Popup extends React.Component {

	render() {
        if (this.props.openPopup) {
            return this.popup();
        };
        return React.createElement('div', {});
	}

    popup() {
        const exit = React.createElement('div', {className: 'popup__exit'},
            React.createElement('img', {
                src: 'img/exit.png',
                onClick: this.onClick
            })
        )
        const descr = [];
        let cnt = 0;
        this.props.args.description.forEach( (arr) => {
            cnt += 1;
            descr.push(React.createElement('div', {
                    className: 'popup__sub_title',
                    key: `${cnt}`
                },
                React.createElement('div', 
                    {className: 'popup__sub_title__value text-secondary'},
                    arr[0]
                ),
                React.createElement('div', 
                    {className: 'popup__sub_title__value'},
                    arr[1]
                )
            ));
        });
        const content = React.createElement('div', {className: 'popup__content'},
            React.createElement('div', {className: 'popup__description'},
                React.createElement('div', {className: 'popup__name'}, 
                    this.props.args.title
                ),
                descr
            ),
            React.createElement('div', {className: 'popup__image'},
                React.createElement('img', {src: `img/${this.props.args.image}`})
            )
        )
        return React.createElement('div', {
            className: 'popup'
        }, exit, content)
    }

    onClick() {
        this.props.parent.setState({
            openPopup: false
        })
    }
    
    getContainer(){
        return ReactDOM.findDOMNode(this)
    }

    componentDidMount() {
        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate() {
        if (this.props.openPopup) this.setPopupPosition();
    }
    
    setPopupPosition() {
        const container = this.getContainer();

        // выставляем значения по умолчанию для получения реальных размеров в доме
        // container.style.left = '0px';
        // container.style.top = '0px';

        // получаем реальные размеры элементов окна и таргета и вычисляем куда позиционировать popup
        let position = this.coutPopupPosition(
            ReactDOM.findDOMNode(this.props.parent).getBoundingClientRect(), 
            container.getBoundingClientRect()
        );
        container.style.left = position['x'] + 'px';
        container.style.top = position['y'] + 'px';
    }

    coutPopupPosition(target, offset) {
        // let {width=0, height=0, left=0, top=0} = offset || {};
        // let {x=0, y=0, width:w=0} = target || {};

        // получаем размер окна браузера
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        // отступ от края, с учётом полосы прокрутки
        const defOffset = 20;

        // чтобы отрисовывалась под картинкой профиля
        const dy = 200;

        // берём центр по X
        // let x = width/2 - w/2 + left;
        let x = target.width/2 - offset.width/2;
        let y = dy;

        // проверяем влезает ли в окно браузера, если нет, корректируем смещение
        if (x + offset.width + target.x >= innerWidth) {
            x -= (x + offset.width + target.x - innerWidth) + defOffset;
        }
        if (y + offset.height + target.y >= innerHeight) {
            y -= (y + offset.height + target.y - innerHeight) + defOffset;
        }

        // т.к. полосы прокрутки слева и сверху нет, то можно уменьшить отступ
        if (x + target.x < 0) x = defOffset/2 - target.x;
        if (y + target.y < 0) y = defOffset/2 - target.y;

        return {x, y};
    }
}