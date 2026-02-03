export class ConfigHandler {
	initiate(codebookName) {
		const config = {
			'codebookName': codebookName
		};

		localStorage.setItem('configuration', this.convertToJSONString(config));
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