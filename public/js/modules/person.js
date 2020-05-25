export class Person {
    constructor(params) {
        this.fullName = params['fullName'];
        this.birthDate = params['birthDate'];
        this.photoUrl = params['photoUrl'];
        this.university = params['university'];
        this.type = 'person';
    };
    get birthDateStr() {
        let m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return this.birthDate.getDate() + ' ' + m[this.birthDate.getMonth()];
    };
    get age() {
        const a = Math.floor((Date.now() - this.birthDate) / 3.154e+10);
        let b = 'лет';
        if ((a > 20) | (a < 10)) {
            b = (a+10-1)%10 < 5 ? 'года' : 'лет';
            if (a%10 == 1) b = 'год';
        }
        return a + ' ' + b;
    };
    render() {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        let card_contain = getCardStructure(this);
        card_contain.forEach( (item) => {
            card.append(createNewElem(item));
        });
        return card;
    };
    appendToDOM(parent) {
        const personBlock = this.render();
        parent.append(personBlock);
        personBlock.addEventListener('click', (event) => {
            const ch = document.getElementsByClassName('mini_card');
            if (document.getElementsByClassName('mini_card').length) {
                ch[0].remove();
            } else {
                this.openMiniCard(event.currentTarget);
            };
        });
    };
    openMiniCard(cur_target){
        let miniCard = document.createElement('div');
        miniCard.setAttribute('class', 'mini_card');
        const miniCard_contain = getMiniCardStructure(this);
        miniCard_contain.forEach( (item) => {
            const elem = createNewElem(item);
            miniCard.append(elem);
        });

        cur_target.append(miniCard);
    };
};



function createNewElem(item) {
    let elem = document.createElement(item['tag_name']);
    if (item['class']) elem.setAttribute('class', item['class']);
    if (item['cont']) elem.innerHTML = item['cont'];
    if (item['src']) elem.setAttribute('src', item['src']);
    if (item['inner_items']) {
        item['inner_items'].forEach( (sub_item) => {
            let sub_elem = createNewElem(sub_item);
            elem.append(sub_elem);
        });
    }
    return elem;
};

function getCardStructure(person){
    switch (person.type) {
        case 'student':
            return [
                {
                    'tag_name': 'img',
                    'class': 'card__image',
                    'src': 'img/' + person.photoUrl,
                },
                {
                    'tag_name': 'div',
                    'class': 'card-title',
                    'cont': person.fullName,
                },
                {
                    'tag_name': 'div',
                    'class': 'card-text',
                    'cont': person.university + ' ' + person.course + ' курс',
                },
            ];
        case 'teacher':
            return [
                {
                    'tag_name': 'img',
                    'class': 'card__image',
                    'src': 'img/' + person.photoUrl,
                },
                {
                    'tag_name': 'div',
                    'class': 'card-title',
                    'cont': person.fullName,
                },
                {
                    'tag_name': 'div',
                    'class': 'card-text',
                    'cont': 'Преподаёт в ' + person.university,
                },
            ];
        default:
            return [
                {
                    'tag_name': 'img',
                    'class': 'card__image',
                    'src': 'img/' + person.photoUrl,
                },
                {
                    'tag_name': 'div',
                    'class': 'card-title',
                    'cont': person.fullName,
                },
            ];
    }
}

function getMiniCardStructure(person) {
    return [
        {
            'tag_name': 'div',
            'class': 'mini_card__exit',
            'inner_items': [
                {
                    'tag_name': 'img',
                    'src': 'img/exit.png',
                },
            ],
        },
        {
            'tag_name': 'div',
            'class': 'mini_card__about',
            'inner_items': [
                {
                    'tag_name': 'div',
                    'class': 'mini_card__description',
                    'inner_items': [
                        {
                            'tag_name': 'div',
                            'class': 'mini_card__name',
                            'cont': person['fullName'],
                        },
                        {
                            'tag_name': 'div',
                            'class': 'mini_card__sub_title',
                            'inner_items': [
                                {
                                    'tag_name': 'div',
                                    'class': 'mini_card__sub_title__value grey',
                                    'cont': 'День рождения:'
                                },
                                {
                                    'tag_name': 'div',
                                    'class': 'mini_card__sub_title__value',
                                    'cont': person['birthDateStr'] + ' ' +
                                                person['age'],
                                },
                            ],
                        },
                        {
                            'tag_name': 'div',
                            'class': 'mini_card__sub_title',
                            'inner_items': [
                                {
                                    'tag_name': 'div',
                                    'class': 'mini_card__sub_title__value grey',
                                    'cont': person['type'] == 'student'
                                                ? 'Учится:'
                                                : 'Преподаёт:',
                                },
                                {
                                    'tag_name': 'div',
                                    'class': 'mini_card__sub_title__value',
                                    'cont': person['university'] + ' ' 
                                            + (person['type'] == 'student'
                                                ? person['course'] + ' курс'
                                                : ''),
                                },
                            ],
                        },
                    ],
                },
                {
                    'tag_name': 'div',
                    'class': 'mini_card__image',
                    'inner_items': [
                        {
                            'tag_name': 'img',
                            'src': 'img/' + person['photoUrl'],
                        },
                    ],
                },
            ],
        },
    ];
}