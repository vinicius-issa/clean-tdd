import { AccessDeniedError } from '../errors'
import { forbideen } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    return forbideen(new AccessDeniedError())
  }
}
