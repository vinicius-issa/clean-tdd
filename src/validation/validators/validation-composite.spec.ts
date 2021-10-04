import { MissignParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
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
  const validationStubs = [
    makeValidation(),
    makeValidation()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const {
      sut,
      validationStubs
    } = makeSut()
    jest.spyOn(
      validationStubs[1],
      'validate'
    ).mockReturnValueOnce(new MissignParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissignParamError('any_field'))
  })

  test('Should return the first error if more then one validation fail', () => {
    const {
      sut,
      validationStubs
    } = makeSut()
    jest.spyOn(
      validationStubs[0],
      'validate'
    ).mockReturnValueOnce(new Error())
    jest.spyOn(
      validationStubs[1],
      'validate'
    ).mockReturnValueOnce(new MissignParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_field ' })
    expect(error).toBeNull()
  })
})
