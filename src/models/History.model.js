import { DataTypes } from "sequelize";
import { database } from "../config/database.config.js";
import { Tracking } from "./Tracking.model.js";

export const History = database.define("History", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  trackingId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Tracking,
      key: 'id',
    },
  },
  stage: {
    type: DataTypes.ENUM("Recebido", "Em análise", "Aprovado", "Auxílio Entregue","Negado"),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#FA8035'
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'HardDriveDownload'
  },
});

Tracking.hasMany(History, { foreignKey: 'trackingId', as: 'history' });
History.belongsTo(Tracking, { foreignKey: 'trackingId' });