import {
  LogMongoRepository
} from '../../../../infra/db/mongodb/log/log-mongo-repository'
import {
  SignUpController
} from '../../../../presentation/controllers/signup/signup-controller'
import {
  Controller
} from '../../../../presentation/protocols'
import {
  LogControllerDecorator
} from '../../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'

export const makeSignupController = (): Controller => {
  const addAcount = makeDbAddAccount()
  const logMongoRepository = new LogMongoRepository()
  const dbAuthentication = makeDbAuthentication()
  const signUpController = new SignUpController(
    addAcount,
    makeSignupValidation(),
    dbAuthentication
  )
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
