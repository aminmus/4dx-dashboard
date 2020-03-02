const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');
const { Csat } = require('../models');

const CsatSerializer = new JSONAPISerializer('Csats', {
  attributes: ['score', 'date', 'Client'],
  Client: {
    attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
    ref: 'id',
  },
});
const CsatDeserializer = new JSONAPIDeserializer({ keyForAttribute: 'camelCase' });

const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - CSAT');
  console.log('*************************');
  try {
    const opts = { include: [{ all: true, nested: true }] };
    if (req.query.filter && req.query.filter.clientId) {
      opts.where = { ClientId: req.query.filter.clientId };
    }
    const csats = await Csat.findAll(opts);
    return res.status(200).json(CsatSerializer.serialize(csats));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId, {
      include: [{ all: true, nested: true }],
    });
    if (!csat) {
      return res
        .status(404)
        .json({ error: { title: 'Csat not found' }, data: null });
    }
    return res.status(200).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId, {
      include: [{ all: true, nested: true }],
    });
    if (!csat) {
      return res
        .status(404)
        .json({ error: { title: 'Csat not found' }, data: null });
    }
    await csat.update(await CsatDeserializer.deserialize(req.body));
    return res.status(200).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - CSAT');
  console.log('*************************');
  try {
    const { date, score, clientId: ClientId } = await CsatDeserializer.deserialize(req.body);
    const csat = await Csat.create({
      date,
      score,
      ClientId,
    });
    return res.status(201).json(CsatSerializer.serialize(csat));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - CSAT');
  console.log('*************************');
  try {
    const csat = await Csat.findByPk(req.params.csatId);
    await csat.destroy();
    return res.send(csat);
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
