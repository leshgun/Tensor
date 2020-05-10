class Student {
    constructor(params) {
        this.fullName = params.fullName;
        this.university = params.university;
        this.course = params.course;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
    };

    get birthDateStr() {
        let m = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 
                    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        let d = this.birthDate.getDay() + ' ' + m[this.birthDate.getMonth()];
        return d + ', ' + this.age + ' лет';
    };

    get age() {
        return Math.floor((Date.now() - this.birthDate) / 3.154e+10);
    };

    render() {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let card_items = [
            {
                'tag_name': 'img',
                'class': 'card__image',
                'src': 'img/' + this.photoUrl,
            },
            {
                'tag_name': 'div',
                'class': 'card-title',
                'cont': this.fullName,
            },
            {
                'tag_name': 'div',
                'class': 'card-text',
                'cont': this.university + ' ' + this.course + ' курс',
            },
        ];
        card_items.forEach( (item) => {
            card.append(createNewElem(item));
        });
        document.getElementsByTagName('main')[0].append(card);
        return card;
    };

    appendToDOM(){
        const studentBlock = this.render();
        studentBlock.addEventListener('click', (event) => {
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

        const miniCard_items = getMiniCardStructure(this);
        miniCard_items.forEach( (item) => {
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
            sub_elem = createNewElem(sub_item);
            elem.append(sub_elem);
        });
    }
    return elem;
};



function init(){
    const studentArr = [
        {
           fullName: 'Петров Миша',
           university: 'УГАТУ',
           course: 1,
           birthDate: new Date(2004, 0, 5),
           photoUrl: 'ava01.jpg'
        },
        {
           fullName: 'Иванова-Иванова Марго',
           university: 'СурГУ',
           course: 2,
           birthDate: new Date(2003, 0, 1),
           photoUrl: 'ava02.jpg'
        },
        {
           fullName: 'Сидорова Мальвина',
           university: 'БГУ',
           course: 3,
           birthDate: new Date(2002, 1, 1),
           photoUrl: 'ava03.jpg'
        },
        {
           fullName: 'Матвей Успенский',
           university: 'УГАТУ',
           course: 4,
           birthDate: new Date(2001, 0, 1),
           photoUrl: 'ava04.jpg'
        },
        {
           fullName: 'Маша Козлова',
           university: 'СурГУ',
           course: 5,
           birthDate: new Date(2000, 3, 1),
           photoUrl: 'ava05.jpg'
        },
        {
           fullName: 'Омар Хайям',
           university: 'БГУ',
           course: 6,
           birthDate: new Date(1948, 18, 5),
           photoUrl: 'ava06.jpg'
        },
    ];
    studentArr.forEach((st) => {
        const student = new Student(st);
        student.appendToDOM()
    });
};



function getMiniCardStructure(student) {

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
                            'cont': student['fullName'],
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
                                    'cont': student['birthDateStr'],
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
                                    'cont': 'Учится:'
                                },
                                {
                                    'tag_name': 'div',
                                    'class': 'mini_card__sub_title__value',
                                    'cont': student['university'] + ' ' 
                                            + student['course'] + ' курс',
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
                            'src': 'img/' + student['photoUrl'],
                        },
                    ],
                },
            ],
        },
    ];
}