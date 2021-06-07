import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpReponse = await controller.handle(httpRequest)
    if (httpReponse.statusCode === 200) {
      res.status(httpReponse.statusCode).json(httpReponse.body)
    } else {
      res.status(httpReponse.statusCode).json({
        error: httpReponse.body.message
      })
    }
  }
}
