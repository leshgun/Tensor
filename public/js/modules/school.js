define (
    'modules/school',
    () => {
        return School;
    }
);

class School {
    constructor() {
        this.schoolList = new SchoolList();
        this.schoolDiv = document.createElement('div');
        this.schoolDiv.setAttribute('class', 'school');
    }
    enroll(person) {
        this.schoolList.add(person);
        person.appendToDOM(this.schoolDiv);
    }
    kick(person) {
        const child = document.getElementsByClassName('card');
        for (let i = 0; i < child.length; i++) {
            let personStr = person.render().innerText.replace(/\n/g, "");
            let childStr = child[i].innerText.replace(/\n/g, "");
            if (personStr == childStr) {
                child[i].remove();
            };
        };
        this.schoolList.remove(person);
    }
    getPersonList(attr, value) {
        let person_list = [];
        this.schoolList.list.forEach( (person) => {
            if (person[attr].includes(value)) person_list.push(person);
        });
        return person_list;
    }
    appendToDom(parent) {
        parent.append(this.schoolDiv);
    }
}

class SchoolList {
    constructor() {
        this.list = [];
    }
    add(person) {
        this.list.push(person);
    }
    remove(person) {
        const i = this.list.findIndex(x => x === person);
        this.list.splice(i, 1);
    }
}