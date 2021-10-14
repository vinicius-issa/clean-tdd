import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbideen } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = HttpRequest.headers?.['x-access-token']
    if (accessToken !== undefined) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbideen(new AccessDeniedError())
  }
}
