'use strict';

import {PersonFactory as Factory} from './modules/personFactory.js'
import {School} from './modules/school.js'
import {Component} from './modules/component.js'
import {DataSet} from './modules/dataSet.js'
import {Pagination} from './modules/pagination.js'

init();

async function init(){
    parent = document.getElementsByTagName('main')[0];
    const factory = new Factory();
    const school = new School();
    const limit = undefined;
    const startPage = 1;

    // const pagi = new Pagination({
    //     limit: limit,
    //     page: startPage,
    // });

    const dataset = new DataSet({
        object: 'person',
        model: factory,
    })

    const objects = await dataset.list(startPage, limit).then(obj => { return obj });
    objects.forEach((obj) => {
        const type = obj['course']
            ? 'student'
            : 'teacher';
        const person = factory.create(obj, type);
        school.enroll(person);
    });

    school.enroll(factory.create({}));
    school.mount(parent);

    // pagi.mount(parent);

}
