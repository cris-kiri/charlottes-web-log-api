import connection from './connection.ts'
import { Post, PostData } from '../../models/post.ts'
import { Comment, CommentData } from '../../models/comment'

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

export function getCommentsById(id: number): Promise<Comment[]> {
  return connection('Comments')
    .join('Posts', 'Posts.id', 'Comments.post_id')
    .select(
      'Comments.id',
      'Comments.post_id as postID',
      'Comments.date_posted as datePosted',
      'Comments.comment'
    )
    .where('Posts.id', id)
}

export function addCommentToPost(comment: CommentData): Promise<Comment> {
  return connection('Comments')
    .insert({
      comment: comment.comment,
      post_id: comment.postId,
      date_posted: Date.now(),
    })
    .returning([
      'id',
      'post_id as postID',
      'date_posted as datePosted',
      'comment',
    ])
}

export function updateComment(id: number, comment: string): Promise<Comment[]> {
  return connection('Comments')
    .update({ id: id, comment: comment, date_posted: Date.now() })
    .where('id', id)
}

export function deleteComment(id: number): Promise<Comment[]> {
  return connection('Comments').delete().where('id', id)
}
