import axios from "axios";
import { History } from "../models/History.model.js";
import { Tracking } from "../models/Tracking.model.js";

await Tracking.sync();

async function latAndLon(address) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    console.log(response.data);
    const { lat, lon } = response.data[0];
    return `${lat},${lon}`;
  } catch {
    const lat = -15.793889
    const lon = -47.882778
    return `${lat},${lon}`;
  }
}

export const createTracking = async (req, res) => {
  try {
    const { applicantName, supportType, address } = req.body;

    if (!applicantName || !supportType || !address)
      return res
        .status(400)
        .json({ error: "Applicant name and support type are required" });

    const addressLatLon = await latAndLon(address);

    const tracking = await Tracking.create({
      applicantName,
      supportType,
      address,
      addressLatLon: addressLatLon,
    });

    await History.create({ stage: "Recebido", trackingId: tracking.id });

    return res.status(201).json({ tracking });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTrackings = async (req, res) => {
  try {
    const trackings = await Tracking.findAll();

    if (!trackings) {
      return res.status(404).json({ error: "No tracking found" });
    }

    return res.status(200).json({ trackings });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTrackingByCode = async (req, res) => {
  try {
    const { trackingCode } = req.params;

    if (!trackingCode) {
      return res.status(400).json({ error: "Request number is required" });
    }

    const tracking = await Tracking.findOne({ where: { trackingCode } });

    if (!tracking) {
      return res.status(404).json({ error: "Tracking not found" });
    }

    const history = await History.findAll({
      where: { trackingId: tracking.id },
    });

    if (history) {
      tracking.dataValues.history = history;
    }

    return res.status(200).json({ tracking });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicantName, supportType, address  } = req.body;

    if (!id ||  !applicantName || !supportType || !address) {
      return res
        .status(400)
        .json({ error: "Request are required" });
    }

    const tracking = await Tracking.findOne({ where: { id } });

    if (!tracking) {
      return res.status(404).json({ error: "Tracking not found" });
    }

    await Tracking.update({ applicantName, supportType, address }, { where: { id } });

    return res.status(200).json({ message: "Tracking updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTracking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Request id is required" });
    }

    const tracking = await Tracking.findOne({ where: { id } });

    if (!tracking) {
      return res.status(404).json({ error: "Tracking not found" });
    }

    await Tracking.destroy({ where: { id } });

    return res.status(200).json({ message: "Tracking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCounterAll = async (req, res) => {
  try {
    const trackings = await Tracking.findAll();
    const count = trackings.length;
    return res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
