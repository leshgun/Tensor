import {Person} from './person.js';

export class Teacher extends Person {
    constructor(args) {
        super(args);
        this.stats['type'] = 'teacher';
    };
    getStatus() {
    	return {
    		'title': 'Преподаёт:',
    		'value': this.stats.args['university'],
    	}
    }
};