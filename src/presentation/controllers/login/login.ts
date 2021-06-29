/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './login-protocols'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http/http-helpers'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (validation: Validation, authentication: Authentication) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error !== null) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
