const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Assuming you also want to set up relationships for Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };
