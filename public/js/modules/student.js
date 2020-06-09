import {Person} from './person.js';

export class Student extends Person {

    constructor(props) {
        super(props);
        this.type = 'teacher';
    }

    getStatus() {
    	return {
    		'title': 'Учится:',
    		'value': this.props['university'] + ' ' + this.props['course'] + ' курс'
    	}
    }
};