import express from 'express'

import * as db from '../db/db'
import { Comment, CommentData } from '../../models/comment'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

// GET /api/v1/comments/:postID/comments
router.get('/:postID/comments', async (req, res) => {
  const postID = parseInt(req.params.postID)
  const postsWithComments = await db.getCommentsById(postID)

  res.json(postsWithComments)

  // const comments = postsWithComments.map((post) => {
  //   return post.comment
  // })

  // res.json(comments)
})

// POST /api/v1/comments/:postID/comments
router.post('/:postID/comments', async (req, res) => {
  const postID = Number(req.params.postID)
  const addedComment = await db.addCommentToPost({
    comment: req.body.comment,
    date_posted: Date.now(),
    post_id: postID,
  })

  res.json(addedComment)
})

// PATCH /api/v1/comments/:commentID
router.patch('/:commentID', async (req, res) => {
  const commentID = Number(req.params.commentID)
  await db.updateComment({
    id: commentID,
    comment: req.body.comment,
    date_created: Date.now(),
  })

  res.sendStatus(200)
})

// DELETE /api/v1/comments/:commentID
router.delete('/:commentID', async (req, res) => {
  const id: number = parseInt(req.params.commentID)

  try {
    await db.deleteComment(id)
  } catch (err) {
    console.log(err.message)
  }

  res.sendStatus(200)
})

export default router
