import {
  CompareFieldsdValidation
} from '../../presentation/helpers/validators/compare-fields-validation'
import {
  RequiredFieldValidation
} from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import {
  ValidationComposite
} from '../../presentation/helpers/validators/validation-composite'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldsdValidation('password', 'passwordConfirmation')
  )
  return new ValidationComposite(validations)
}
