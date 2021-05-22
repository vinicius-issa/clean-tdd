import { MissignParamError } from '../errors/missing-params-error'
import { badRequest } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return badRequest(new MissignParamError('name'))
    }
    if (httpRequest.body.email === undefined) {
      return badRequest(new MissignParamError('email'))
    }
  }
}
