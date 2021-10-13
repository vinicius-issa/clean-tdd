import { AddSurveytModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository{
  add: (surveyData: AddSurveytModel) => Promise<void>
}
