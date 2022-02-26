export const toTagCloudDto = (data) => {
  return data.map((d) => ({
    value: d.value,
    counter: d.counter,
  }));
};
