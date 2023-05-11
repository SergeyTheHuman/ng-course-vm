export function deepEqual(a: any, b: any): boolean {
	// Handle primitive types
	if (a === b) {
		return true
	}

	// Handle null and undefined
	if (a == null || b == null) {
		return a === b
	}

	// Handle arrays
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) {
			return false
		}
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) {
				return false
			}
		}
		return true
	}

	// Handle objects
	if (typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a)
		const keysB = Object.keys(b)
		if (keysA.length !== keysB.length) {
			return false
		}
		for (const key of keysA) {
			if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
				return false
			}
		}
		return true
	}

	// Handle all other types
	return false
}
