import { AccountModel } from '../models/account'

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}

export interface AddAccountModel {
  name: string
  email: string
  password: string
}
