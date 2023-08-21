import express from 'express'

import * as db from '../db/db'
import { Post, PostData, PostUpdate } from '../../models/post'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  const posts: Post[] = await db.getAllPosts()

  res.json(posts)
})

// POST /api/v1/posts
router.post('/', async (req, res) => {
  const { title, text } = req.body

  const newPost = {
    title: title,
    text: text,
    date_created: Date.now(),
  }

  const addedPost = await db.addPost(newPost)

  res.json(addedPost[0])
})

// PATCH /api/v1/posts/:id
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { title, text } = req.body
  const post: Post = {
    id: parseInt(id),
    title: title,
    text: text,
    dateCreated: Date.now(),
  }

  const updatedPost = await db.updatePost(post)

  res.json(updatedPost[0])
})

// DELETE /api/v1/posts/:id
router.delete('/:id', async (req, res) => {
  const id: number = parseInt(req.params.id)

  const deletedPost = await db.deletePost(id)

  res.json(deletedPost[0])
})

export default router
