import {Person} from './person.js';
import {Student} from './student.js';
import {Teacher} from './teacher.js';

export class PersonFactory {
    create(params, type) {
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
    createReact(params, type) {
        params.key = params.key || `${type || 'person'}-
            ${params.id || this.randomKey}`;
        params.keyClone = params.key;
        switch (type) {
            case 'student':
                return React.createElement(Student, params);
                break;
            case 'teacher':
                return React.createElement(Teacher, params);
                break;
            default:
                return React.createElement(Person, params);
        }
    }
    get randomKey() {
        return Math.floor(Math.random() * 1000);
    }
}