const { createTodo, getTodo, updateTodo, deleteTodo } = require('../services/todoService');

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

const update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await updateTodo({
      todoId: req.params.id,
      userId: req.userId,
      title,
      description,
    });

    res.status(200).json({
      id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  } catch (error) {
    const status = error.status || 500;
    const message = error.status ? error.message : 'Something went wrong';
    res.status(status).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    await deleteTodo({ todoId: req.params.id, userId: req.userId });
    res.status(204).send();
  } catch (error) {
    const status = error.status || 500;
    const message = error.status ? error.message : 'Something went wrong';
    res.status(status).json({ message });
  }
};

module.exports = { create, list, update, remove };
