import {Component} from './component.js'

export class Pagination extends Component {

	constructor(args) {
		super(args)
		this.stats.page = args['page'] || 1;
		this.stats.hasPrev = this.stats.page > 1 
							? true
							: false;
		this.stats.hasNext = true;
	}

	get prev() {
		return `<input class="pagi-button pagi-button__prev" type="button" value="Prev">`
	}

	get next() {
		return `<input class="pagi-button pagi-button__next" type="button" value="Next">`
	}

	render() {
		return `<div class="pagination">
					${this.prev || ''}
					<span class="pagi-page">Page: ${this.stats.page}</span>
					${this.next || ''}
				<div>`
	}

	afterMount() {
		const prev = parent.getElementsByClassName('pagi-button__prev')[0];
		const next = parent.getElementsByClassName('pagi-button__next')[0];
        this.subscribeTo(prev, 'click', this.prevPage.bind(this));
        this.subscribeTo(next, 'click', this.onClick.bind(this));
    }

	onClick() {
		alert('Got it...');
	}

}
