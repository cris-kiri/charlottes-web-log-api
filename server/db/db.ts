import connection from './connection.ts'

export function getAllPosts(db = connection) {
  return db('Posts').select()
}
