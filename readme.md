# Пишем первый класс

class Student {
    constructor(params) {
       this.fullName = params.fullName;
       ….
    }
    get birthDateStr: () => {
       ...
    }
    get age: () => {
       ...
    }
}






# Делаем заполнение страницы с помощью нового класса

Пусть на входе у нас будет фиксированный набор студентов:
const studentArr = [
   {
       fullName: 'Маша Иванова',
       university: 'УГАТУ',
       course: 2,
       birthDate: new Date(2000, 0, 1),
       photoUrl: '/photo1'
   },
   …..
];

Пробегаемся по массиву студентов и создаем экземпляры класса Student на базе элемента массива:
studentArr.forEach((item) => {
    const student = new Student(item);
    appendStudentBlock(student);
});

Функции appendStudentBlock у нас пока нет, пишем и ее.
Что она будет делать? Склеивает верстку, которую вы делали в прошлой домашней работе, с данными из экземпляра класса Student.
Конкретно вот этот кусочек:
 
  |pic_1|

Затем вставляет его в DOM-дерево.
По результату выполнения этого кода у вас должны появиться те же самые студенты, как и были раньше. Просто мы наполним сделаем страницу гибче.







# Подписываемся на клик
Помимо просто верстки нам нужно открывать миникарточку студента.

  |pic_2|
 
Как будем это делать: будем пользоваться методом addEventListener и подписываться на событие click.
Чтобы подписаться на элемент - нужно найти, пусть этим займется метод appendStudentBlock:
1.	Добавили элемент в DOM,
2.	В результате функции вернули добавленный элемент.
Дополним код подпиской на событие:
studentArr.forEach((item) => {
    const student = new Student(item);
    const studentBlock = appendStudentBlock(student);
    studentBlock.addEventListener('click', (event) => {
        openCard(student, event.currentTarget);
    });
});
Ну и наконец метод openCard просто создает миникарточку рядом с блоком студента.







# Как сделать еще лучше
Чтобы код стал структурированнее - в идеале метод формирования верстки каждого студента должен жить в самом классе Student.
Подписку на клик тоже делать внутри класса.
Модифицируем класс Student, добавляем в него методы appendToDOM и render:
class Student {
    render: () => {
      // Формирует верстку по this
       ...
    },
    appendToDOM: () => {
        const layout = this.render();
        // Добавляем в DOM
        // Получаем добавленный элемент
        // Подписываем на клик
        ….
    }
}

