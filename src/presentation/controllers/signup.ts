import { MissignParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return badRequest(new MissignParamError(field))
      }
    }
  }
}
