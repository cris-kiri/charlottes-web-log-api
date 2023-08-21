import express from 'express'

import * as db from '../db/db'
import { CommentData } from '../../models/comment'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

// GET /api/v1/comments/:postID/comments
router.get('/:postID/comments', async (req, res) => {
  const postID = parseInt(req.params.postID)
  const postsWithComments = await db.getCommentsById(postID)

  res.json(postsWithComments)
})

// POST /api/v1/comments/:postID/comments
router.post('/:postID/comments', async (req, res) => {
  const postID = Number(req.params.postID)
  const addedComment: CommentData = await db.addCommentToPost({
    comment: req.body.comment,
    postId: postID,
  })

  res.json(addedComment)
})

// PATCH /api/v1/comments/:commentID
router.patch('/:commentID', async (req, res) => {
  const commentID = Number(req.params.commentID)

  try {
    await db.updateComment(commentID, req.body.comment)
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message)
    else throw Error("Can't handle this error!")
  }

  res.sendStatus(200)
})

// DELETE /api/v1/comments/:commentID
router.delete('/:commentID', async (req, res) => {
  const id: number = parseInt(req.params.commentID)

  try {
    await db.deleteComment(id)
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message)
    else throw Error("Can't handle this error!")
  }

  res.sendStatus(200)
})

export default router
