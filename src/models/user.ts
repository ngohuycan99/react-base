import { Collection } from './common'

export type User = {
  id: number
  name: string
  age: number
  address?: string
}

export type UserCollectionParams = {
  name?: string
  pageSize?: number
  pageIndex?: number
}

export type UserCollection = Collection<User, 'users'>

export type CreateUser = Omit<User, 'id'>

export type UpdateUser = Partial<CreateUser>
