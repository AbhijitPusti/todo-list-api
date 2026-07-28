const Todo = require('../models/Todo');

const createTodo = async ({ title, description, userId }) => {
  const todo = await Todo.create({ title, description, user: userId });
  return todo;
};

const getTodos = async ({ userId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [todos, total] = await Promise.all([
    Todo.find({ user: userId }).skip(skip).limit(limit),
    Todo.countDocuments({ user: userId }),
  ]);

  return { todos, total };
};

module.exports = { createTodo, getTodos };