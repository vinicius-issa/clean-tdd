import { Controller } from '../../../../presentation/protocols'
import {
  LoginController
} from '../../../../presentation/controllers/login/login-controller'
import {
  LogControllerDecorator
} from '../../../decorators/log-controller-decorator'
import {
  LogMongoRepository
} from '../../../../infra/db/mongodb/log/log-mongo-repository'
import {
  makeLoginValidation
} from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const logMongoRepository = new LogMongoRepository()
  const dbAuthentication = makeDbAuthentication()
  const loginController = new LoginController(
    makeLoginValidation(),
    dbAuthentication
  )
  return new LogControllerDecorator(loginController, logMongoRepository)
}
