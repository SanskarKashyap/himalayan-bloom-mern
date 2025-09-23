import User from '../models/User.js';

export async function getUsers(req, res, next) {
  try {
    const users = await User.find({}).lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
