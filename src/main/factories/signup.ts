import { DbAddAccount } from '../../data/usecases/add-acount/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import {
  AccountMongoRepository
} from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const addAcount = new DbAddAccount(bcrypterAdapter, accountRepository)
  const signUpController = new SignUpController(
    emailValidator,
    addAcount
  )
  return signUpController
}
