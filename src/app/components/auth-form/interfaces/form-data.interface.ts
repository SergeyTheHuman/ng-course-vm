export interface IAuthFormData {
	email: string
	name: string
	passwords: IPassword
	address: IAddress
	skills: string[]
	sex: ISex
	jobs: IJobs
}

interface IAddress {
	country: string
	city: string
}

interface IJobs {
	hasWorkExperience: boolean
	jobs: IJob[]
}

interface IJob {
	company: string
	start: string
	end: string
}

interface IPassword {
	password: string
	repeatPassword: string
}

interface ISex {
	sex: string
	other?: string
}
