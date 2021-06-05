import { DbAddAccount } from '../../data/usecases/add-acount/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import {
  AccountMongoRepository
} from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import {
  Controller
} from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignupController = (): Controller => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const addAcount = new DbAddAccount(bcrypterAdapter, accountRepository)
  const signUpController = new SignUpController(
    emailValidator,
    addAcount
  )
  return new LogControllerDecorator(signUpController)
}
