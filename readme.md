# Задания

> В index.html пропишите ваши стили css, если нужно.

Cтили прописаны в *public/css/*.

> Берем предыдущую домашку и помещаем в папку public/js. Не затрите app.js.

Здесь я использовал загрузчик модулей *require.js*, подключённый к *app.js*.
```
<script data-main="js/app.js" src="js/libs/require.js"></script>
```

> Открываем файл app.js там программа, которая собирает список студентов и учителей, затем помещает их в верстку. 
Нужно создать отдельные файлы, в который поместить классы, каждый класс в свой файл.

> personLib.js - библиотека, которая импортит в себя файлы с классами и экспортит их для использоватния в приложении.  
school.js - прямой импорт класса.

В качесве *прямого импорта* использовал объект с классами (описан ниже).

## Запуск сервера 

1. В консоле переходим в папку проекта.
2. Обновляем зависимости: `npm install`
3. Для запуска сервера нужно ввести одну из двух команд:
- `npm run-script start`
- `node index.js`
4. В браузере переходим по адресу: *http://localhost:8080/*

## Реализация

Загружаем модули из нашей библиотеки, и запускаем скрипт
```
require (
    ['modules/personLib'],
    (person_lib) => {
        start(person_lib);
    }
);
```

Сам скрипт
```
function start(person_lib) {
    const factory = new person_lib['Factory'];
    let school = new person_lib['School'];
    getStudentList().forEach((student) => {
        const person = factory.create('student', student);
        school.enroll(person);
    });
    school.appendToDom(document.getElementsByTagName('main')[0]);
}
```

**person_lib** - объект, содержащий загруженные классы. 
Для инициализации экземпляра достаточно добавить **new**.

**getStudentList** - возвращает список объектов вида:
```
{
   fullName: 'Петров Миша',
   university: 'УГАТУ',
   course: 1,
   birthDate: new Date(2004, 0, 5),
   photoUrl: 'ava01.jpg'
}
```

`school.appendToDom(document.getElementsByTagName('main')[0])` - добавляет "школу" в `<main>`