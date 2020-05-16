require (
    ['modules/personLib'],
    (person_lib) => {
        start(person_lib);
    }
);

function start(person_lib) {
    // console.log(person_lib)
    const factory = new person_lib['Factory'];
    
    let school = new person_lib['School'];
    getStudentList().forEach((student) => {
        const person = factory.create('student', student);
        school.enroll(person);
    });
    getTeacherList().forEach((teacher) => {
        const person = factory.create('teacher', teacher);
        school.enroll(person);
    });
    school.appendToDom(document.getElementsByTagName('main')[0]);
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