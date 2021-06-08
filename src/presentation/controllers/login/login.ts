/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissignParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissignParamError('email'))
    }
    if (!httpRequest.body.password) {
      return badRequest(new MissignParamError('password'))
    }
    return {
      statusCode: 0,
      body: {}
    }
  }
}
