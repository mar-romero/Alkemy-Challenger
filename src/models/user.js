const { DataTypes } = require('sequelize');
const sequelize = require ('../loaders/sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique:true
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  role:{
    type: DataTypes.ENUM({
      values:['USER_ROLE','ADMIN_ROLE']
    }),
    defaultValue:'USER_ROLE'
  }
}, {

});
module.exports = User;