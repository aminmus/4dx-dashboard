const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');
const { Nps } = require('../models');

const NpsSerializer = new JSONAPISerializer('nps', {
  attributes: [
    'currentNps',
    'goalNps',
    'date',
    'targetDate',
    'createdAt',
    'updatedAt',
  ],
});

const NpsDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

const getAll = async (_req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findAll();
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    if (!nps) {
      return res
        .status(404)
        .json({ error: { title: 'Nps entry not found' }, data: null });
    }
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    if (!nps) {
      return res
        .status(404)
        .json({ error: { title: 'Nps not found' }, data: null });
    }
    const deserializedNps = await NpsDeserializer.deserialize(req.body);
    await nps.update(deserializedNps);
    return res.status(200).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - NPS');
  console.log('*************************');
  try {
    const {
      date,
      currentNps,
      goalNps,
      targetDate,
    } = await NpsDeserializer.deserialize(req.body);

    const nps = await Nps.create({
      currentNps,
      goalNps,
      date,
      targetDate,
    });

    return res.status(201).json(NpsSerializer.serialize(nps));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - NPS');
  console.log('*************************');
  try {
    const nps = await Nps.findByPk(req.params.npsId);
    await nps.destroy();
    return res.send(nps);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

module.exports = {
  createOne,
  deleteById,
  getAll,
  getById,
  updateById,
};
