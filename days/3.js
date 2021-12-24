import { getData } from '../common';

const day = 3;

// part1
getData(day).then(r =>
   r.reduce((battery, curr) => {
      Array.from(curr).forEach((n, i) => battery[i] = (battery[i] ?? 0) + (+n > 0 ? 1 : -1));

      return battery;
      }, []
   ).map((i) => Number(i > 0)
   ).reduce((battery, curr) => {
      battery[0].push(curr);
      battery[1].push(Number(curr === 0));

      return battery;
      }, [[], []]
   ).map((d) => parseInt(d.join(''), 2))
).then(([x, y]) => x * y);

// part2
const findIndex = (array, n) => {
   let left = 0;
   let right = array.length - 1;
   let middle;

   while (left < right) {
      middle = Math.floor((left + right) / 2);

      if (+array[middle] === +n) return middle;
      if (+array[middle] > +n && +array[middle - 1] < +n) return middle;

      if (+n > +array[middle]) left = middle + 1;
      else right = middle;
   }

   // FIXME
   return left !== right
      ? -1
      : +array[left] === +n ? left : -1;
}

const getStringWithIndexReplacement = (string, index, replacement) => `${string.slice(0, index)}${replacement}${string.slice(index + 1, string.length)}`

// FIXME 2 same functions
const getPriorityPart = (data) => {
   let result = data;
   let i = 0;
   let currentIterateNumber = `1${'0'.repeat(data[0].length - 1)}`;

   while (result.length !== 1) {
      const notPriorityItemsCount = findIndex(result, currentIterateNumber);
      const arrayLength = result.length;
      const arrayMiddle = arrayLength / 2;
      const priorityItemsCount = arrayLength - notPriorityItemsCount;

      if ((priorityItemsCount > notPriorityItemsCount) || (priorityItemsCount === arrayMiddle)) {
         result = result.slice(notPriorityItemsCount, arrayLength);
      } else {
         result = result.slice(0, notPriorityItemsCount);
         currentIterateNumber = getStringWithIndexReplacement(currentIterateNumber, i, '0');
      }

      ++i;
      currentIterateNumber = getStringWithIndexReplacement(currentIterateNumber, i, '1');
   }

   return result;
};

const getReversedPriorityPart = (data) => {
   let result = data;
   let i = 0;
   let currentIterateNumber = `1${'0'.repeat(data[0].length - 1)}`;

   while (result.length !== 1) {
      const notPriorityItemsCount = findIndex(result, currentIterateNumber);
      const arrayLength = result.length;
      const arrayMiddle = arrayLength / 2;
      const priorityItemsCount = arrayLength - notPriorityItemsCount;

      if (priorityItemsCount > notPriorityItemsCount) {
         result = result.slice(0, notPriorityItemsCount);
         currentIterateNumber = getStringWithIndexReplacement(currentIterateNumber, i, '0');
      } else if (priorityItemsCount === arrayMiddle) {
         result = result.slice(0, notPriorityItemsCount);
      } else {
         result = result.slice(notPriorityItemsCount, arrayLength);
      }

      ++i;
      currentIterateNumber = getStringWithIndexReplacement(currentIterateNumber, i, '1');
   }

   return result;
};

getData(day)
   .then(r => r.sort((a, b) => +a - +b))
   .then(r => [getPriorityPart(r), getReversedPriorityPart(r)])
   .then(([f, s]) => parseInt(f, '2') * parseInt(s, '2'));
