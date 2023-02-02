const NUM_CHAMPS = 162;

export const getOptions = (): [number, number] => {
  const firstChamp = Math.floor(Math.random() * NUM_CHAMPS) + 1;
  const secondChamp = Math.floor(Math.random() * NUM_CHAMPS) + 1;

  if (firstChamp === secondChamp) {
    return getOptions();
  }

  return [firstChamp, secondChamp];
};
