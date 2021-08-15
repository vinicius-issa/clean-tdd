import { DbAddAccount } from '../../../data/usecases/add-acount/db-add-account'
import {
  BcryptAdapter
} from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import {
  AccountMongoRepository
} from '../../../infra/db/mongodb/account/account-mongo-repository'
import {
  LogMongoRepository
} from '../../../infra/db/mongodb/log/log-mongo-repository'
import {
  SignUpController
} from '../../../presentation/controllers/signup/signup-controller'
import {
  Controller
} from '../../../presentation/protocols'
import {
  LogControllerDecorator
} from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcrypterAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAcount = new DbAddAccount(bcrypterAdapter, accountMongoRepository)
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(
    addAcount,
    makeSignupValidation()
  )
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
