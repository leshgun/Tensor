define (
    'modules/person_factory',
    ['modules/person', 'modules/student', 'modules/teacher'],
    (Person, Student, Teacher) => {
        return class PersonFactory {
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
    }
);


