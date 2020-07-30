let lastId = 0;

export default function GetId(prefix = "id-"): string {
  // eslint-disable-next-line no-plusplus
  return prefix + lastId++;
}
