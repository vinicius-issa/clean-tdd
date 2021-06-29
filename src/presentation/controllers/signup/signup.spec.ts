/* eslint-disable @typescript-eslint/return-await */
import { MissignParamError, ServerError } from '../../errors'
import { ok, serverError, badRequest } from '../../helpers/http/http-helpers'
import { HttpRequest } from '../../protocols'
import { SignUpController } from './signup'
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Validation
} from './signup-protocols'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeFakeRequest = (): HttpRequest => (
  {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
)

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(
    addAccountStub,
    validationStub
  )

  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('Signup Controller', () => {
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(
      async (account: AddAccountModel) => {
        return new Promise((resolve, reject) => {
          reject(new ServerError('error'))
        })
      })

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      serverError(new ServerError('error'))
    )
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
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
