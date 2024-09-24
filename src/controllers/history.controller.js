import { History } from "../models/History.model.js";
import { Tracking } from "../models/Tracking.model.js";

await History.sync();

function generateStyle(status) {

  const colors = {
    'Recebido': '#FA8035',
    'Pendente': '#7EBCE2',
    'Em análise': '#4F96F7',
    'Aprovado': '#14C3A4',
    'Auxílio Entregue': '#28A745',
    'Negado': '#e21663',
  };

  const icons = {
    'Recebido': 'HardDriveDownload',
    'Pendente': 'FolderClock',
    'Em análise': 'TextSearch',
    'Aprovado': 'CircleCheck',
    'Auxílio Entregue': 'MapPinCheck',
    'Negado': 'TicketX',
    'default': 'HardDriveDownload'
  };

  return { color: colors[status], icon: icons[status] || icons['default'] };
}

export const createHistory = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const { stage } = req.body;

    if (!trackingId || !stage) return res.status(400).json({ error: "Request id, date, location and stage are required" });

    const { color, icon } = generateStyle(stage);

    const historyExists = await History.findOne({ where: { trackingId, stage } });
    if (historyExists) return res.status(400).json({ error: "History already exists" });

    const history = await History.create({ trackingId, stage, color, icon });

    await Tracking.update({ status: stage, styleColor: color, styleIcon: icon  }, { where: { id: trackingId } });

    return res.status(201).json(history);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getHistories = async (req, res) => {
  try {
    const histories = await History.findAll();

    if (!histories) {
      return res.status(404).json({ error: "No history found" });
    }

    return res.status(200).json(histories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "History id is required" });
    }

    const history = await History.findOne({ where: { id } });

    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    if (!id || !stage) {
      return res.status(400).json({ error: "History id and stage are required" });
    }

    const history = await History.findOne({ where: { id } });

    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    history.stage = stage;

    await history.save();

    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "History id is required" });
    }

    const history = await History.findOne({ where: { id } });

    if (!history) {
      return res.status(404).json({ error: "History not found" });
    }

    await history.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

