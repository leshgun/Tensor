define (
    'modules/teacher',
    ['modules/person'],
    (Person) => {
        return class Teacher extends Person {
            constructor(params) {
                super(params);
                this.fullName = params.fullName;
                this.university = params.university;
                this.birthDate = params.birthDate;
                this.photoUrl = params.photoUrl;
                this.type = 'teacher';
            };
        };
    }
);