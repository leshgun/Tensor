import { Component } from './component.js';


class Header extends Component {
   render({title, description}) {
       return `
       <header>
           <div class="card card_header">
               <img class="card__img" src="img/logo.jpg" alt="${title}" />
               <p class="card__title" title="${title}">${title}</p>
               <span class="card__description" title="${description}">${description}</span>
           </div>
       </header>`;
   }
}

class ComponentFactory {
   create(component, options) {
       return new component(options || {});
   }
}

const factory = new ComponentFactory();

const head = factory.create(Header, {
   title: 'Tensor Scool',
   description: 'Это страница школы Тензор. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.'
});

head.mount(document.body);




// ----------------------


class Person extends Component {
   render({item}) {
      return `<div class="card card_person">
          <img class="card__img card__img_round" src="${item.photo || 'img/ui/default_pix.jpg'}" alt="Аватар ${item.title}" />
          <p class="card__title" title="${item.title || ''}">${item.title || ''}</p>
          <span class="card__description" title="${item.study || ''}">${item.study || ''}</span>
      </div>`;
   }

   afterMount() {
      this.container.addEventListener('click', (event) => this.onClick(event) );
   }

   onClick(event) {
      if (!this.popup) {
         this.popup = new PopupList();
         this.popup.mount(document.body);
      }

      this.popup.open('student', {
         caption: this.options.title,
         content: `<center><img height="300" width="300" class="card__img" src="${this.options.photo || 'img/ui/default_pix.jpg'}" alt="Аватар ${this.title}" /></center>`
      });
   }
}

class Model {
   constructor(data) {
      for(let key in data) {
         this[key] = data[key];
      }
   }

   get fullName() {
      return `{this.title}`;
   }
}

let personModel = new Model({
   title: 'Женя Серова',
   photo: 'img/ava03.jpg',
   study: 'Угату',
   bday: new Date('1998-11-13'),
   phone: '+7 (963) 123-45-67',
   active: new Date('2020-04-03T20:00:00')
});


const person = factory.create(Person, {item: personModel});
person.mount(document.body);


class Popup extends Component {
   render({caption, content}) {
       return `<div class="popup">
           <div class="popup__header">
               <p class="popup__title" title="${caption}">${caption}</p>
               <img class="popup__closeButton" title="Закрыть" alt="Кнопка закрыть" src="img/ui/close_x.png"/>
           </div>
           <div class="popup__content">
           ${content}
           </div>
       </div>`;
   }

   afterMount() {
      this.container.querySelector('.popup__closeButton').addEventListener('click', () => this.unmount() );
   }
}


class PopupList extends Component {
   constructor(options) {
      super(options);
      this.popups = {};
   }

   render() {
      return `<div class="popup-list"></div>`;
   }

   open(key, options) {

      if (this.popups[key]) {
         this.popups[key].unmount();
      }

      const popup = new Popup(options);
         this.popups[key] = popup;

         popup.mount(this.container);

   }
}
