import { AddAccount } from '../../../domain/usecases/add-account'
import { InvalidParamError, MissignParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    validation: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissignParamError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (isValid === false) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
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
