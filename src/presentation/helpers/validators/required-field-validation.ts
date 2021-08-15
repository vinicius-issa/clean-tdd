/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissignParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) { }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissignParamError(this.fieldName)
    }
    return null
  }
}
