import {
  CompareFieldsdValidation
} from '../../../presentation/helpers/validators/compare-fields-validation'
import {
  EmailValidation
} from '../../../presentation/helpers/validators/email-validation'
import {
  RequiredFieldValidation
} from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import {
  ValidationComposite
} from '../../../presentation/helpers/validators/validation-composite'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignupValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(
      new CompareFieldsdValidation('password', 'passwordConfirmation')
    )
    validations.push(
      new EmailValidation('email', makeEmailValidator())
    )
    makeSignupValidation()
    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
