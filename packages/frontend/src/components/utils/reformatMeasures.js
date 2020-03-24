export default measures => {
  return measures.data.map(entry => {
    return entry.attributes.success;
  });
};
