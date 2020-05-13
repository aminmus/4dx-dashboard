import { Deserializer, Serializer } from 'jsonapi-serializer';

/**
 *  Provides tools to serialize and deserialize requests and responses to and from a JSONAPI.org specification format
 * @module
 * */

/**
 * Serializes data into JSONAPI.org specification format using a specific serializer
 * for the given entity type
 * @function
 * @param {string} type entity type
 * @param {Object} data data to serialize
 */
export const serializePerType = (type, data) => {
  let serializer;

  switch (type.toLowerCase()) {
    case 'nps':
      serializer = new Serializer('Nps', {
        attributes: ['id', 'currentNps', 'goalNps', 'date', 'targetDate', 'createdAt', 'updatedAt']
      });
      break;
    case 'clients':
      serializer = new Serializer('Clients', {
        attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
        Csats: {
          attributes: ['score', 'date', 'createdAt', 'updatedAt'],
          ref: 'id'
        },
        Measures: {
          attributes: ['description', 'success', 'createdAt', 'updatedAt'],
          ref: 'id'
        }
      });
      break;
    case 'measures':
      serializer = new Serializer('Measures', {
        attributes: ['description', 'success', 'createdAt', 'updatedAt', 'Client'],
        Client: {
          attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
          ref: 'id'
        }
      });
      break;
    case 'measuregoals':
      serializer = new Serializer('MeasureGoals', {
        attributes: ['measuresAmount', 'targetDate', 'createdAt', 'updatedAt']
      });
      break;
    case 'csats':
      serializer = new Serializer('Csats', {
        attributes: ['score', 'date', 'Client'],
        Client: {
          attributes: ['name', 'createdAt', 'updatedAt', 'Csats', 'Measures'],
          ref: 'id'
        }
      });
      break;
    default:
      break;
  }

  return serializer.serialize(data);
};

// Generic deserializer
const deserializer = new Deserializer({
  keyForAttribute: 'camelCase'
});

/**
 * Deserializes JSONAPI.org formatted data
 * @function
 * @param {Object} data data to serialize
 */
export const deserialize = data => {
  return deserializer.deserialize(data);
};
