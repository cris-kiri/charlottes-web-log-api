import connection from './connection.ts'
import { Post, PostData } from '../../models/post.ts'

export function getAllPosts() {
  return connection('Posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
  )
}

export function addPost(post: PostData): Promise<Post[]> {
  return connection('Posts')
    .insert(post)
    .returning(['id', 'title', 'text', 'date_created as dateCreated'])
}

export function updatePost(post: Post): Promise<Post[]> {
  return connection('Posts')
    .update({
      id: post.id,
      title: post.title,
      text: post.text,
      date_created: post.dateCreated,
    })
    .where('id', post.id)
}

export function deletePost(id: number): Promise<Post[]> {
  return connection('Posts').delete().where('id', id)
}
