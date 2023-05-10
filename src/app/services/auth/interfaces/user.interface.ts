import { IAuthFormData } from 'src/app/components/auth-form/interfaces/form-data.interface'

export interface IUser extends Omit<IAuthFormData, 'passwords'> {}
