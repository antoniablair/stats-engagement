module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('games', {
    'numberOfRounds': {
      type: DataTypes.INTEGER,
    },
    'name': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'games',
    
    timestamps: false,
    
  });

  Model.associate = (models) => {
    Model.hasMany(models.questions, { foreignKey: 'game_id'});
  };

  return Model;
};

