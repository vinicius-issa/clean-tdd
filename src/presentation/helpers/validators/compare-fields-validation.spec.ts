import { InvalidParamError } from '../../errors'
import { CompareFieldsdValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsdValidation => {
  return new CompareFieldsdValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_name'
    })
    expect(error).toBeNull()
  })
})
