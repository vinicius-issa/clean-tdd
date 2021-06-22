/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { MissignParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissignParamError(this.fieldName)
    }
    return null
  }
}
