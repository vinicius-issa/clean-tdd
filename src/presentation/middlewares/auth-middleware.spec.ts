import { forbideen } from '../helpers/http/http-helpers'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'

describe('Auth Middlware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbideen(new AccessDeniedError()))
  })
})
