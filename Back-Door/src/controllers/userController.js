const usercontroller = require('../controllers/userController');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await usercontroller.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usercontroller.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
}; 