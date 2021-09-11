import { AddAccount } from '../../../domain/usecases/add-account'
import { badRequest, serverError, ok } from '../../helpers/http/http-helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  Authentication
} from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error != null) {
        return badRequest(error)
      }

      const { email, password, name } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      await this.authentication.auth({
        email,
        password
      })

      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
