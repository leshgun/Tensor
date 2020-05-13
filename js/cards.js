class Person {
    constructor(params) {
        this.fullName = params.fullName;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
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
    appendToDOM() {
        const personBlock = this.render();
        document.getElementsByTagName('main')[0].append(personBlock);
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
}

class PersonFactory {
    create(type, params) {
        switch (type) {
            case 'student':
                return new Student(params);
                break;
            case 'teacher':
                return new Teacher(params);
                break;
            default:
                return new Person(params);
        }
    }
}

class School {
    constructor() {
        this.schoolList = new SchoolList();
        this.personFactory = new PersonFactory();
    }
    enroll(type, params) {
        const person = this.personFactory.create(type, params);
        this.schoolList.add(person);
        person.appendToDOM();
        return `${type} ${person.fullName} успешно зачислен...`
    }
    kick(person) {
        const child = document.getElementsByClassName('card');
        for (let i = 0; i < child.length; i++) {
            let personStr = person.render().innerText.replace(/\n/g, "");
            let childStr = child[i].innerText.replace(/\n/g, "");
            if (personStr == childStr) {
                console.log(person['fullName'], 'has been kicked...');
                child[i].remove();
            };
        };
        this.schoolList.remove(person);
    }
    getPersonList(attr, value) {
        let person_list = [];
        this.schoolList.list.forEach( (person) => {
            if (person[attr].includes(value)) person_list.push(person);
        });
        return person_list;
    }
}

class SchoolList {
    constructor() {
        this.list = [];
    }
    add(person) {
        this.list.push(person);
    }
    remove(person) {
        const i = this.list.findIndex(x => x === person);
        this.list.splice(i, 1);
    }
}

class Teacher extends Person {
    constructor(params) {
        super(params);
        this.fullName = params.fullName;
        this.university = params.university;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = 'teacher';
    };
}

class Student extends Person {
    constructor(params) {
        super(params);
        this.fullName = params.fullName;
        this.university = params.university;
        this.course = params.course;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = 'student';
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
           birthDate: new Date(1990, 0, 1),
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
           birthDate: new Date(2019, 5, 23),
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
           birthDate: new Date(1948, 4, 18),
           photoUrl: 'ava06.jpg'
        },
    ];
    const teacherArr = [
        {
           fullName: 'Сергей Игоревич Пахом',
           university: 'УГАТУ',
           birthDate: new Date(2004, 0, 5),
           photoUrl: 'ava2.png'
        },
        {
           fullName: 'Марина Валерьевна Батьковна',
           university: 'СурГУ',
           birthDate: new Date(1999, 0, 1),
           photoUrl: 'ava1.png'
        },
        {
           fullName: 'Михаил Петрович Епифанцев',
           university: 'БГУ',
           birthDate: new Date(2002, 1, 1),
           photoUrl: 'ava3.png'
        },
    ];
    const school = new School();
    studentArr.forEach((st) => {
        console.log(school.enroll('student', st));
    });
    teacherArr.forEach((te) => {
        console.log(school.enroll('teacher', te));
    });
    console.log(school.getPersonList('fullName', 'Миша'));
    console.log(school.getPersonList('university', 'СурГУ'));
    console.log(school.getPersonList('university', 'ГУ'));
    school.kick(school.personFactory.create('student', studentArr[0]));
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