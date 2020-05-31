import {Component} from './component.js'

export class School extends Component {
    constructor(args) {
        super(args);
        this.schoolList = new SchoolList();
    }
    enroll(person) {
        this.schoolList.add(person);
    }
    kick(person) {
        this.schoolList.remove(person);
        person.unmount();
    }
    getPersonList(attr, value) {
        let person_list = [];
        this.schoolList.list.forEach( (person) => {
            if (person[attr].includes(value)) person_list.push(person);
        });
        return person_list;
    }
    render() {
        return `<div class="school"></div>`;
    }
    afterMount() {
        this.schoolList.getList().forEach((person) => {
            person.mount(this.getContainer());
        });
    }
}

class SchoolList {
    constructor() {
        this.list = [];
    }
    getList() {
        return this.list;
    }
    add(person) {
        this.list.push(person);
    }
    remove(person) {
        const i = this.list.findIndex(x => x === person);
        this.list.splice(i, 1);
    }
}