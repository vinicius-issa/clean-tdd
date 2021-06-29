import { LoginController } from './login'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http-helpers'
import { MissignParamError } from '../../errors'
import {
  HttpRequest,
  Authentication,
  Validation
} from './login-protocols'

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(
    validationStub,
    authenticationStub
  )
  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct email', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(httpRequest)
    expect(authSpy)
      .toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 401 if invalid credentias are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpRequest = makeFakeRequest()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(async () => {
      throw new Error()
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentias are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      ok({
        accessToken: 'any_token'
      })
    )
  })

  test('Should call Valiton with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const isValidSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissignParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissignParamError('any_field')))
  })
})
