/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissignParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissignParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissignParamError('password'))
    }
    this.emailValidator.isValid(httpRequest.body.email)
    return {
      statusCode: 0,
      body: {}
    }
  }
}
