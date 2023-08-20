import express from 'express'

import * as db from '../db/db'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  const posts = await db.getAllPosts()

  res.json(posts)
})

export default router
