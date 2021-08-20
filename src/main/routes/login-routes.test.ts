/* eslint-disable @typescript-eslint/no-misused-promises */
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return an account on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Vinicius',
          email: 'vinicius.almeidaissa@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })

    describe('POST /login', async () => {
      test('Should return an account on login', async () => {
        const password = await hash('123456', 12)
        await accountCollection.insertOne({
          name: 'Vinicius',
          email: 'vinicius.almeidaissa@gmail.com',
          password
        })
        await request(app)
          .post('/api/login')
          .send({
            email: 'vinicius.almeidaissa@gmail.com',
            password: '123456'
          })
          .expect(200)
      })
    })
  })
})
