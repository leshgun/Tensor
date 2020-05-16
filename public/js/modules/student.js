define (
    'modules/student',
    ['modules/person'],
    (Person) => {
        return class Student extends Person {
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
    }
);

