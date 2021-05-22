export class MissignParamError extends Error {
  constructor (paramName: string) {
    super(`Missign param:  ${paramName}`)
    this.name = 'MissingParamError'
  }
}
