'use strict';

import {PersonFactory as Factory} from './modules/personFactory.js'
import {School} from './modules/school.js'

init();

function init() {
    parent = document.getElementsByTagName('main')[0];
    const factory = new Factory();
    const school = new School();

    getStudentList().forEach((person) => {
        const student = factory.create('student', person);
        school.enroll(student);
    })
    getTeacherList().forEach((person) => {
        const teacher = factory.create('teacher', person);
        school.enroll(teacher);
    })

    school.mount(parent);
}








function getStudentList () {
	return [
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
}
function getTeacherList () {
	return [
        {
           fullName: 'Сергей Игоревич Пахом',
           university: 'УГАТУ',
           birthDate: new Date(2004, 0, 5),
           photoUrl: 'ava2.png'
        },
        {
           fullName: 'Марина Валерьевна Батькова',
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
}