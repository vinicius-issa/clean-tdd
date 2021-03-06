/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/return-await */
import {
  Hasher,
  AddAccountModel,
  AccountModel,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (valued: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Sould call Hasher with correct password', async () => {
    const {
      sut,
      hasherStub
    } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const {
      sut,
      hasherStub
    } = makeSut()
    jest.spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new Error()))
      )
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Sould call AddAccountRepository with correct values', async () => {
    const {
      sut,
      addAccountRepositoryStub
    } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if addAccountRepository throws', async () => {
    const {
      sut,
      addAccountRepositoryStub
    } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new Error()))
      )
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const {
      sut
    } = makeSut()
    const accountData = makeFakeAccountData()
    const account = await sut.add(accountData)
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should call loadAccountByEmail repository with correct email', async () => {
    const {
      sut,
      loadAccountByEmailRepositoryStub
    } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository not returns null', async () => {
    const {
      sut,
      loadAccountByEmailRepositoryStub
    } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(
      new Promise(resolve => resolve(makeFakeAccount()))
    )
    const accountData = makeFakeAccountData()
    const account = await sut.add(accountData)
    expect(account).toBeNull()
  })
})
