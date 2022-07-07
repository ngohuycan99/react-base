import {
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
} from 'react-query'
import {
  CreateUser,
  UpdateUser,
  User,
  UserCollection,
  UserCollectionParams,
} from '../../models'
import request from '../request'
import { MutationOptions, QueryOptions } from '../type'

type Response = {
  get: UserCollection
  getOne: User
  create: User
  update: User
  delete: {}
}

type QueryKeys = {
  get: ['getUsers', UserCollectionParams]
  getOne: ['getUser', number]
}

type Variables = {
  create: CreateUser
  update: UpdateUser
  delete: number
}

type API = {
  get: QueryFunction<Response['get'], QueryKeys['get']>
  getOne: QueryFunction<Response['getOne'], QueryKeys['getOne']>
  create: MutationFunction<Response['create'], Variables['create']>
  update: MutationFunction<Response['update'], Variables['update']>
  delete: MutationFunction<Response['delete'], Variables['delete']>
}

const PREFIX = 'users'

const user: API = {
  get: ({ queryKey: [, params] }) => request.get(PREFIX, { params }),
  getOne: ({ queryKey: [, id] }) => request.get(`${PREFIX}/${id}`),
  create: body => request.post(PREFIX, body),
  update: body => request.put(PREFIX, body),
  delete: id => request.delete(`${PREFIX}/${id}`),
}

export const useGetUsersQuery = (
  params: UserCollectionParams,
  options?: QueryOptions<Response['get'], QueryKeys['get']>
) => useQuery(['getUsers', params], user.get, options)

export const useGetUserQuery = (
  id: number,
  options?: QueryOptions<Response['getOne'], QueryKeys['getOne']>
) => useQuery(['getUser', id], user.getOne, options)

export const useCreateUserMutation = (
  options?: MutationOptions<Response['create'], Variables['create']>
) => useMutation(['create'], user.create, options)

export const useUpdateUserMutation = (
  options?: MutationOptions<Response['update'], Variables['update']>
) => useMutation(['update'], user.update, options)

export const useDeleteUserMutation = (
  options?: MutationOptions<Response['delete'], Variables['delete']>
) => useMutation(['delete'], user.delete, options)
