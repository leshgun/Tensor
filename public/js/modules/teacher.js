import {Person} from './person.js';

export class Teacher extends Person {

    constructor(props) {
        super(props);
        this.type = 'teacher';
    }

    getStatus() {
    	return {
    		'title': 'Преподаёт:',
    		'value': this.props['university'],
    	}
    }
};