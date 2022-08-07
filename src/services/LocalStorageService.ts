const getKey = (key: string) => {
  return `${key}@MyEcommerceApp`;
};

const set = (key: string, data: any) => {
  const item = getKey(key);
  window.localStorage.setItem(item, JSON.stringify(data));
};

const get = (key: string) => {
  const item = getKey(key);
  const data = window.localStorage.getItem(item);
  if (data) {
    return JSON.parse(data);
  }
  return;
};

const storage = { get, set };
export default storage;
