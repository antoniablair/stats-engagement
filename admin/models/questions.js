module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('questions', {
    'game_id': {
      type: DataTypes.INTEGER,
    },
    'text': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'questions',
    underscored: true,
    timestamps: false,
    
  });

  Model.associate = (models) => {
    Model.belongsTo(models.games, { foreignKey: 'game_id'});
    // Model.hasOne(models.question_tokens, { foreignKey: 'question_id'});
  };

  return Model;
};

