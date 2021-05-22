import { MissignParamError } from '../errors/missing-params-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (httpRequest.body.name === undefined) {
      return {
        statusCode: 400,
        body: new MissignParamError('name')
      }
    }
    if (httpRequest.body.email === undefined) {
      return {
        statusCode: 400,
        body: new MissignParamError('email')
      }
    }
  }
}
