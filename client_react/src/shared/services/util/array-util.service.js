import { isEquivalent } from "./object-util.service";

export const isArrayEmpty = (arr) => {
  return arr === undefined || arr === null || arr.length === 0;
};

export const isArraysEqual = (arr1, arr2) => {
  arr1 = !arr1 ? [] : [...arr1];
  arr2 = !arr2 ? [] : [...arr2];
  arr1.sort();
  arr2.sort();
  return (
    arr1.length === arr2.length &&
    arr1.every((o, idx) => isEquivalent(o, arr2[idx]))
  );
};
