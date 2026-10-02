/* db.js - LocalStorage interface */

const DB = {
  get: (key) => JSON.parse(localStorage.getItem(`stry_${key}`)),
  set: (key, val) => localStorage.setItem(`stry_${key}`, JSON.stringify(val)),
  remove: (key) => localStorage.removeItem(`stry_${key}`),
  clear: () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith('stry_'))
      .forEach(k => localStorage.removeItem(k));
  }
};
