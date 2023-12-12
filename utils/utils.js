// utils.js

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const mapToArray = (map) => Array.from(map.entries());

export const arrayToMap = (array) => new Map(array);