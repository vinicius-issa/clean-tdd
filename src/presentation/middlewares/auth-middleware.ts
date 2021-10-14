import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbideen, ok } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = HttpRequest.headers?.['x-access-token']
    if (accessToken !== undefined) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account !== null) {
        return ok({ accountId: account.id })
      }
    }
    return forbideen(new AccessDeniedError())
  }
}
