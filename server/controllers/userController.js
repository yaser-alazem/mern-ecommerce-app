import errorHandler from 'express-async-handler'

import {generateToken} from '../utils/jwtGenerator.js'
import User from '../models/user.js'

// @route       POST /api/users/login
// @desc        Authenticate user & get token
// @privacy     Public

const authUser = errorHandler(async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if (user && (await user.validatePassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Not Authenticated! Email or password is not correct')
  }
})

// @route       POST /api/users/
// @desc        Register a new user
// @privacy     Public

const registerUser = errorHandler(async (req, res) => {
  const {name, email, password} = req.body

  const existUser = await User.findOne({email})

  if (existUser) {
    res.status(400)
    throw new Error('User already exists!')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @route       POST /api/users/profile
// @desc        Get user profile
// @privacy     Private

const getUserProfile = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found!')
  }
})

export {authUser, registerUser, getUserProfile}
