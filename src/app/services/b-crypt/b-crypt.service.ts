import * as crypto from 'crypto-js'
import { environment } from 'src/environments/environment'

export class CryptoService {
	private crypto: typeof crypto

	constructor() {
		this.crypto = crypto
	}

	encode(value: any): string {
		return this.crypto.AES.encrypt(
			JSON.stringify(value),
			environment.SECRET_KEY,
		).toString()
	}

	decode<T>(value: string): T {
		const decrypted = this.crypto.AES.decrypt(
			value,
			environment.SECRET_KEY,
		).toString(this.crypto.enc.Utf8)
		const parsed = JSON.parse(decrypted)

		return parsed
	}
}
