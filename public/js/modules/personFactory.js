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
}