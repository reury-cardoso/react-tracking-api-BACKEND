import { DataTypes } from "sequelize";
import { database } from "../config/database.config.js";

function generateTrackingCode() {
  const prefix = 'REQ';
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Gera um número aleatório de 6 dígitos
  return `${prefix}${randomNumber}`;
}

export const Tracking = database.define("Tracking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  trackingCode: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: generateTrackingCode,
  },
  status: {
    type: DataTypes.ENUM("Recebido", "Pendente", "Em análise", "Aprovado", "Auxílio Entregue", "Negado"),
    allowNull: false,
    defaultValue: "Recebido",
  },
  applicantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supportType: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLatLon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  styleIcon: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'HardDriveDownload',
  },
  styleColor: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '#FA8035',
  },
});