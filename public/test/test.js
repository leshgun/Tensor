import {Component} from '../js/modules/component.js'
import {Person} from '../js/modules/person.js'
import {DataSet} from '../js/modules/dataSet.js'

class PromiseFake {
	constructor(result) {
		this.result = result;
	}
	then(cb) {
		return cb(this.result);
	}
}

describe("Тестирование модулей", function() {

   'use strict';

	describe('Component', () => {

		it('constructor', function() {
		    // arrange
		    const args = {
		    	name: 'testName',
		    	bday: '2000-01-01',
		    	phone: '+7 (800) 555-35-35',
		    }

		    // act
		    const component = new Component(args);

		    //assert
		    //assert.equal(1, 1);
		    assert(component instanceof Component);
		});

		it('default render', function() {

			// arrange
		    const args = {};
		    const component = new Component(args);
		    const res = '<div class="card"><p><b>type: Component</b></p></div>';

		    // act
		    const render = component.render();

		    //assert
		    assert.equal(render, res);
			
		});

		it('mount', function() {

			// arrange
		    const args = {};
		    const component = new Component(args);
		    const res = '<div class="card"><p><b>type: Component</b></p></div>';
		    const parent = document.createElement('div');

		    // act
		    component.mount(parent);

		    //assert
		    assert.equal(parent.innerHTML, res);
			
		});

		it('unmount', function() {

			// arrange
		    const args = {};
		    const component = new Component(args);
		    const res = '';
		    const parent = document.createElement('div');

		    // act
		    component.mount(parent);
		    component.unmount();

		    //assert
		    assert.equal(parent.innerHTML, res);
			
		});

		it('subscribe', function() {

			// arrange
		    const args = {};
		    const component = new Component(args);
		    const target = document.body;
		    const eventName = 'Click';
		    const handler = () => {};
		    const res = {target, handler};

		    // act
		    component.subscribeTo(target, eventName, handler);

		    //assert
		    assert.equal(JSON.stringify(component.handlers[eventName][0]), JSON.stringify(res));
			
		});

	});

	describe('Person', () => {

		it('constructor', function() {
		    // arrange
		    const args = {
		    	name: 'testName',
		    	bday: '2000-01-01',
		    	phone: '+7 (800) 555-35-35',
		    }

		    // act
		    const person = new Person(args);

		    //assert
		    //assert.equal(1, 1);
		    assert(person instanceof Person);
		});

		it('default render', function() {

			// arrange
		    const args = {};
		    const person = new Person(args);
		    const res = `<div class="card">
		                    <img class="card__image" src="img/${args['photo'] || 'default_pix.jpg'}">
		                    <div class="card-title">${args['name'] || 'Name'}</div>
		                </div>`;

		    // act
		    const render = person.render();

		    //assert
		    assert.equal(res.replace(/\n|\t| /g, ''), render.replace(/\n|\t| /g, ''));
			
		});

		it('mount', function() {

			// arrange
		    const args = {};
		    const person = new Person(args);
		    const res = `<div class="card">
		                    <img class="card__image" src="img/${args['photo'] || 'default_pix.jpg'}">
		                    <div class="card-title">${args['name'] || 'Name'}</div>
		                </div>`;
		    const parent = document.createElement('div');

		    // act
		    person.mount(parent);

		    //assert
		    assert.equal(parent.innerHTML.replace(/\n|\t| /g, ''), res.replace(/\n|\t| /g, ''));
			
		});

		it('unmount', function() {

			// arrange
		    const args = {};
		    const person = new Person(args);
		    const res = '';
		    const parent = document.createElement('div');

		    // act
		    person.mount(parent);
		    person.unmount();

		    //assert
		    assert.equal(parent.innerHTML, res);
			
		});

		it('subscribe', function() {

			// arrange
		    const args = {};
		    const person = new Person(args);
		    const target = document.body;
		    const eventName = 'Click';
		    const handler = () => {};
		    const res = {target, handler};

		    // act
		    person.subscribeTo(target, eventName, handler);

		    //assert
		    assert.equal(JSON.stringify(person.handlers[eventName][0]), JSON.stringify(res));
			
		});

	});

	describe('DataSet', () => {

		it('constructor', function() {
		    // arrange
		    const args = {
		    	model: 'testName',
		    	object: {title:'testObject'},
		    }

		    // act
		    const dataset = new DataSet(args);

		    //assert
		    //assert.equal(1, 1);
		    assert(dataset instanceof DataSet);
		});

		it('list(page, limit)', function(done, nope) {

			// arrange
		    const args = {
		    	model: 'testModel',
		    	object: 'person',
		    };
		    const page = 1;
		    const limit = 2;
		    const dataset = new DataSet(args);
		    const res = [{
	            "id": 1,
	            "name": "Петров Миша",
	            "university": "УГАТУ",
	            "course": 1,
	            "bday": "2004-05-01",
	            "photo": "ava01.jpg",
	            "phone": "+7 (963) 123-45-67"
	        },
	        {
	            "id": 2,
	            "name": "Иванова-Иванова Марго",
	            "university": "СурГУ",
	            "course": 2,
	            "bday": "1990-01-01",
	            "photo": "ava02.jpg",
	            "phone": "+7 (963) 223-45-67"
	        }];

		    // act
		    const objects = dataset.list(page, limit)
		    	.then(obj => {
		    		if (JSON.stringify(obj) == JSON.stringify(res)) done();
		    	});
			
		});

	});

});

mocha.run();
