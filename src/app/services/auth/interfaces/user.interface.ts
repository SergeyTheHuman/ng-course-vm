import { IAuthFormData } from 'src/app/pages/auth/components/auth-form/interfaces/form-data.interface'

export interface IUser extends Omit<IAuthFormData, 'passwords'> {}
