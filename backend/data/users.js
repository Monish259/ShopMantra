import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'adminuser',
    email: 'adminuser@example.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'testuser1',
    email: 'test1@example.com',
    password: bcrypt.hashSync('test1', 10),
  },
  {
    name: 'testuser2',
    email: 'test2@example.com',
    password: bcrypt.hashSync('test2', 10),
  },
];

export default users;
