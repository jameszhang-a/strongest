const NUM_CHAMPS = 162;

export const getOptions = (): [number, number] => {
  const firstChamp = Math.floor(Math.random() * NUM_CHAMPS);
  const secondChamp = Math.floor(Math.random() * NUM_CHAMPS);

  if (firstChamp === secondChamp) {
    return getOptions();
  }

  return [firstChamp, secondChamp];
};
