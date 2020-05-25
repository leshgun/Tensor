import {Person} from './person.js';

export class Student extends Person {
    constructor(params) {
        super(params);
        this.course = params['course'];
        this.type = 'student';
    };
};