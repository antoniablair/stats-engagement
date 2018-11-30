module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('question_tokens', {
    'token_id': {
      type: DataTypes.INTEGER,
    },
    'question_id': {
      type: DataTypes.INTEGER,
    },
    'points_if_true': {
      type: DataTypes.INTEGER,
    },
    'points_if_false': {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'question_tokens',
    underscored: true,
    timestamps: false,
    
  });

  Model.associate = (models) => {
    Model.belongsTo(models.questions, { foreignKey: 'question_id' });
    Model.belongsTo(models.tokens, { foreignKey: 'token_id' });
  };

  return Model;
};

