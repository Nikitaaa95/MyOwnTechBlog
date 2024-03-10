const User = db['User'];
const Project = db['Project'];
const Comment = db['Comment'];
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
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

module.exports = { User, Project, Comment };
