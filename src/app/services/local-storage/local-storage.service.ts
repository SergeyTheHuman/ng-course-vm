export class LocalStorageService {
	constructor() {}

	setItem(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	getItem(key: string) {
		const result = localStorage.getItem(key)

		return result ? JSON.parse(result) : result
	}

	removeItem(key: string) {
		localStorage.removeItem(key)
	}

	clear() {
		localStorage.clear()
	}
}
