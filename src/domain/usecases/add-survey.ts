export interface AddSurvey {
  add: (data: AddSurveytModel) => Promise<void>
}

export interface AddSurveytModel {
  question: string
  answers: SurveyAnswers[]
}

export interface SurveyAnswers {
  image: string
  answer: string
}
