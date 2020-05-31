export class DataSet {

	constructor(args) {
		this.args = {
			host: 'http://localhost:8080/api/',
			model: args['model'],
			object: args['object'],
		}
	}

	query(query, option, args) {
		const url = new URL(this.args['host']);
		url.pathname += query;
		for (const key in args){
			url.searchParams.set(key, args[key]);
		};
		return fetch(url, option).then(
			response => response.json()
		);
	}

	create() {

	}

	list(page, limit) {
		return this.query(
			`${this.args['object']}`,
			{
				method: 'GET',
			},
			{
				'_page': page,
				'_limit': limit,
			}
		)
	}

	read(id) {
		return this.query(
			`${this.args['object']}/${id || ''}`,
			{
				method: 'GET',
			}
		);
	}

	update() {

	}

	delete() {

	}

}