const {
  Serializer: JSONAPISerializer,
  Deserializer: JSONAPIDeserializer,
} = require('jsonapi-serializer');
const { Measure } = require('../models');

const MeasureSerializer = new JSONAPISerializer('measures', {
  attributes: ['description', 'success', 'ClientId', 'createdAt', 'updatedAt'],
});
const MeasureDeserializer = new JSONAPIDeserializer('measures', {
  attributes: ['description', 'success', 'ClientId', 'createdAt', 'updatedAt'],
});

const getAll = async (req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
  res.setHeader('Content-Range', '30');
  console.log('*************************');
  console.log('GET ALL REQUEST - MEASURES');
  console.log('*************************');
  try {
    const measures = await Measure.findAll();
    const data = await MeasureSerializer.serialize(measures);
    return res.status(200).json({ ...data });
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
    const measure = await Measure.findByPk(req.params.measureId);
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

    const {
      description,
      success,
      ClientId,
    } = await MeasureDeserializer.deserialize(req.body);

    // TODO: use measure.update instead of manual updating
    measure.description = description;
    measure.success = success;
    measure.ClientId = ClientId;
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
    // When Trying to serialize ClientId it can't be found
    const { ClientId } = req.body.data.attributes;
    const { description, success } = await MeasureDeserializer.deserialize(
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
    await measure.destroy();
    return res.send(measure);
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
