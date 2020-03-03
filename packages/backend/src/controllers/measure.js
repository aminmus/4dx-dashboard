const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');
const { Measure } = require('../models');

const MeasureSerializer = new JSONAPISerializer('Measures', {
  attributes: ['description', 'success', 'createdAt', 'updatedAt', 'Client'],
  Client: {
    attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
    ref: 'id',
  },
});
const MeasureDeserializer = new JSONAPIDeserializer({
  keyForAttribute: 'camelCase',
});

const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - MEASURES');
  console.log('*************************');
  try {
    const opts = { include: [{ all: true, nested: true }] };
    if (req.query.filter && req.query.filter.clientId) {
      opts.where = { ClientId: req.query.filter.clientId };
    }
    const measures = await Measure.findAll(opts);
    return res.status(200).json(MeasureSerializer.serialize(measures));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const getById = async (req, res, next) => {
  console.log('*************************');
  console.log('GET ONE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId, {
      include: [{ all: true, nested: true }],
    });
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }
    return res.status(200).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const updateById = async (req, res, next) => {
  console.log('*************************');
  console.log('PUT REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.measureId);
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }
    const { description, success } = await MeasureDeserializer.deserialize(
      req.body,
    );

    // TODO: use measure.update instead of manual updating
    measure.description = description;
    measure.success = success;
    await measure.save();

    return res.status(200).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const createOne = async (req, res, next) => {
  console.log('*************************');
  console.log('POST REQUEST - MEASURES');
  console.log('*************************');
  try {
    const { description, success, clientId: ClientId } = await MeasureDeserializer.deserialize(
      req.body,
    );
    const measure = await Measure.create({
      description,
      success,
      ClientId,
    });
    return res.status(201).json(MeasureSerializer.serialize(measure));
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return next(err);
  }
};

const deleteById = async (req, res, next) => {
  console.log('*************************');
  console.log('DELETE REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measure = await Measure.findByPk(req.params.clientId);
    if (!measure) {
      return res
        .status(404)
        .json({ error: { title: 'Measure not found' }, data: null });
    }
    await measure.destroy();
    return res.status(204).send();
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
