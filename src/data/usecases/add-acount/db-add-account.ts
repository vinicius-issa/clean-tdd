/* eslint-disable @typescript-eslint/return-await */
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve({
      id: 'id',
      email: 'any_mail',
      password: 'any_password',
      name: 'any_name'
    }))
  }
}
