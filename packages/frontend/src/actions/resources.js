import { Deserializer } from 'jsonapi-serializer';

import { GET_RESOURCES } from './types';
import fetchData from '../utils/fetchData';
import reformatMeasureGoals from '../utils/reformatMeasureGoals';
import reformatMeasures from '../utils/reformatMeasures';

const deserializer = new Deserializer({
  keyForAttribute: 'camelCase'
});

export default function fetchResources() {
  return async function fetchResourcesThunk(dispatch) {
    try {
      const {
        nps,
        clients: fetchedClients,
        measures: { data: measuresData },
        measureGoals: { data: measureGoalsData }
      } = await fetchData();

      const formattedData = {
        clients: await deserializer.deserialize(fetchedClients),
        nps: await deserializer.deserialize(nps),
        measures: reformatMeasures(measuresData),
        measureGoals: reformatMeasureGoals(measureGoalsData)
      };
      console.log(formattedData);

      return dispatch({
        type: GET_RESOURCES,
        payload: formattedData
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
