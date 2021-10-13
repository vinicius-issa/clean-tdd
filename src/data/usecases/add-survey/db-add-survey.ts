import { AddSurvey, AddSurveyRepository, AddSurveytModel } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (data: AddSurveytModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
