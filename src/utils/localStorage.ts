const getStorageValue = (key: string) => {
  const savedValue = localStorage.getItem(key);
  let originalValue: string | object = "";
  try {
    if (savedValue) {
      originalValue = JSON.parse(savedValue);
    }
  } catch (err) {
    console.log(err);
  }
  return originalValue;
};

const removeStorageValue = (key: string) => {
  localStorage.removeItem(key);
};

const saveStorageValue = (key: string, value: any) => {
  if (value) {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  }
};

export { getStorageValue, removeStorageValue, saveStorageValue };
