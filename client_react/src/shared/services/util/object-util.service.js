export const isEquivalent = () => {
  if (a && b && typeof a === "object" && typeof b === "object") {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    // eslint-disable-next-line guard-for-in
    for (const key in a) {
      let aKey;
      let bKey;
      if (Array.isArray(a[key]) && Array.isArray(b[key])) {
        const aKeyClone = Object.assign([], a[key]);
        const bKeyClone = Object.assign([], b[key]);

        aKey = aKeyClone.sort();
        bKey = bKeyClone.sort();
      } else {
        aKey = a[key];
        bKey = b[key];
      }

      if (!this.isEquivalent(aKey, bKey)) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
};

export const clone = (obj) => {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
};
