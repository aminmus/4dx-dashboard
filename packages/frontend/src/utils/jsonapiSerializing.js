import { Deserializer, Serializer } from 'jsonapi-serializer';

// Serializes data using a specific serializer according to give type
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
    case 'measureGoals':
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

export const deserialize = data => {
  return deserializer.deserialize(data);
};
