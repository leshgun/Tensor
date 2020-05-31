import {Person} from './person.js';

export class Student extends Person {
    constructor(args) {
        super(args);
        this.stats['type'] = 'student';
    };
    getStatus() {
    	return {
    		'title': 'Учится:',
    		'value': this.stats.args['university'] + ' ' + this.stats.args['course'] + ' курс'
    	}
    }
};