const express = require('express');
const router = express.Router();

const mockUser = {
  username: 'admin',
  password: 'admin',
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    return res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

module.exports = router;
