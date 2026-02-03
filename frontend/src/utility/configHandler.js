export class ConfigHandler {

	#storageKey = 'configuration';

	initiate(codebookName) {
		const config = {
			'codebookName': codebookName,
			'repoArray': [],
		};

		this.write(config);
	}

	write(config) {
		localStorage.setItem(this.#storageKey, this.convertToJSONString(config));
	}

	addRepo(repoList) {
		let config = this.convertToJSON();
		config['repoArray'] = [...config['repoArray'], ...repoList];
		this.write(config);
	}

	clearAll() {
		localStorage.clear();
	}

	convertToJSONString(config) {
		return JSON.stringify(config);
	}

	convertToJSON() {
		const configString = localStorage.getItem('configuration');
		const config = JSON.parse(configString);
		return config;
	}
}