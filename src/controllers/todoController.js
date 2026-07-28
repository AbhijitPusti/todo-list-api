const { createTodo, getTodos } = require('../services/todoService');

const create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await createTodo({ title, description, userId: req.userId });

    res.status(201).json({
      id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { todos, total } = await getTodos({ userId: req.userId, page, limit });

    res.status(200).json({
      data: todos.map((todo) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
      })),
      page,
      limit,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { create, list };