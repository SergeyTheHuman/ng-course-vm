export const INVALID_DATE = 'Invalid date'

export function dateParse(format: string, value: any) {
	try {
		if (!value || format.length !== value.length) return INVALID_DATE

		const map = {
			day: format.indexOf('DD'),
			month: format.indexOf('MM'),
			year: format.indexOf('YYYY'),
		}

		const day = +value.substring(map['day'], map['day'] + 2)
		const month = +value.substring(map['month'], map['month'] + 2)
		const year = +value.substring(map['year'], map['year'] + 4)

		const date = new Date(year, month - 1, day)
		const validDay = date.getDate()
		const validMonth = date.getMonth()
		const validYear = date.getFullYear()

		if (
			day < 1 ||
			month < 1 ||
			year < 1970 ||
			validDay !== day ||
			validMonth !== month - 1 ||
			validYear !== year
		) {
			return INVALID_DATE
		}
		return date.toISOString()
	} catch (error) {
		return INVALID_DATE
	}
}
