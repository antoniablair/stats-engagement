module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('tokens', {
    'name': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'tokens',
    
    timestamps: false,
    
  });

  Model.associate = (models) => {
    // Model.belongsToMany(models.question, {
    //   through: 'questiontoken',
    //   foreignKey: 'tokenId',
    // });
    Model.hasOne(models.question_tokens, { foreignKey: 'token_id'});
  };

  return Model;
};

