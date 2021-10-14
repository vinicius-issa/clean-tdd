import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbideen, ok, serverError } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = HttpRequest.headers?.['x-access-token']
      if (accessToken !== undefined) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account !== null) {
          return ok({ accountId: account.id })
        }
      }
      return forbideen(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
