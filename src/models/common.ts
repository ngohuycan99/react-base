export type Collection<T, Name extends string> = {
  [key in Name]: T[]
} & { total: number }
