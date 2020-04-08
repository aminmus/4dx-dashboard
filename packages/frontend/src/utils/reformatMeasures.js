export default measures => {
  return measures.map(entry => {
    return entry.attributes.success;
  });
};
