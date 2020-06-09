export class School extends React.Component {

    constructor(props) {
        super(props);
        this.schoolList = new SchoolList(this.props.list);
        this.onClick = this.onClick.bind(this);

        window.myEvent = window.myEvent || {};
        window.myEvent.eventListener = window.myEvent.eventListener || {};
        window.myEvent.eventListener['click'] = 
            window.myEvent.eventListener['click'] || [];
    }

    onClick(e){
        window.myEvent.eventListener['click'].forEach(listener => {
            listener.update();
        })      
    }

    enroll(person) {
        this.schoolList.add(person);
    }

    kick(person) {
        this.schoolList.remove(person);
    }
    getPersonList(attr, value) {
        let person_list = [];
        this.schoolList.list.forEach( (person) => {
            if (person.props[attr].includes(value)) person_list.push(person);
        });
        return person_list;
    }
    render() {
        return React.createElement('div', {
            className:'school',
            onClick: this.onClick,
            key: `school-${document.getElementsByClassName('school').length+1}`
        }, 
        this.schoolList.getList());
    }
}

class SchoolList {
    constructor(list) {
        this.list = list || [];
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