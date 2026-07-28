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
const updateTodo = async ({ todoId, userId, title, description }) => {
  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw { status: 404, message: 'Todo not found' };
  }

  if (todo.user.toString() !== userId) {
    throw { status: 403, message: 'Forbidden' };
  }

  todo.title = title;
  todo.description = description;
  await todo.save();

  return todo;
};

const deleteTodo = async ({ todoId, userId }) => {
  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw { status: 404, message: 'Todo not found' };
  }

  if (todo.user.toString() !== userId) {
    throw { status: 403, message: 'Forbidden' };
  }

  await todo.deleteOne();
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
