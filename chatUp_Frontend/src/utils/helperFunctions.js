export function getSavesCount(savesarray) {
  if (!savesarray || savesarray.length < 1) return 0;
  const res = savesarray
    .map(saves => saves.size)
    .reduce((prev, current) => prev + current);
  return res;
}
