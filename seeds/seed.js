// seeds/seed.js
const { User, Post } = require('../models');

const seedDatabase = async () => {
  await User.bulkCreate([
    { username: 'user1' },
    { username: 'user2' },
  ]);

  await Post.bulkCreate([
    { title: 'Post 1', content: 'Content 1', user_id: 1 },
    { title: 'Post 2', content: 'Content 2', user_id: 2 },
  ]);
};

seedDatabase();
