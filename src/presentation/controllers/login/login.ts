/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Authentication,
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse
} from './login-protocols'
import { InvalidParamError, MissignParamError } from '../../errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http-helpers'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = [
        'email',
        'password'
      ]

      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissignParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
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
