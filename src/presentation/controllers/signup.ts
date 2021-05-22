export class SignUpController {
  handle (httpRequest: any): any {
    if (httpRequest.body.name === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missign param: name')
      }
    }
    if (httpRequest.body.email === undefined) {
      return {
        statusCode: 400,
        body: new Error('Missign param: email')
      }
    }
  }
}
