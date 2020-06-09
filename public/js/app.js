'use strict';

import {PersonFactory as Factory} from './modules/personFactory.js'
import {School} from './modules/school.js'
import {DataSet} from './modules/dataSet.js'

init();

async function init(){
    parent = document.getElementsByTagName('main')[0];
    const factory = new Factory();
    // const limit = undefined;
    const startPage = 1;

    const dataset = new DataSet({
        object: 'person',
        model: factory,
    });
    const objects = await dataset.list(startPage).then(obj => { return obj });

    const personList = [];
    objects.forEach((obj) => {
        const type = obj['course']
            ? 'student'
            : 'teacher';
        const person = factory.createReact(obj, type);
        personList.push(person)
    });

    ReactDOM.render(
        React.createElement(School, {
            list: personList
        }), parent
    );
}