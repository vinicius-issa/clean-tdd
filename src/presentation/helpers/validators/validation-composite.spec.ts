import { MissignParamError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite,
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  const validationStub = new ValidationStub()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const {
      sut,
      validationStub
    } = makeSut()
    jest.spyOn(
      validationStub,
      'validate'
    ).mockReturnValueOnce(new MissignParamError('any_field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissignParamError('any_field'))
  })
})
