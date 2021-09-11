import { AccountModel } from '../models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export interface AddAccountModel {
  name: string
  email: string
  password: string
}
