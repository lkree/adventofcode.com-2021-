import { getData as commonGetData } from '../common';

const day = 4;

// part 1
const getData = (day) => commonGetData(day).then(r => [
         r[0].split(',').map(Number),
         r.slice(1).map(r => r.split(' ').filter(Boolean).map(Number)).reduce((b, c, i) => {
            const index = Math.floor(i / 5);

            if (!b[index]) b[index] = [c];
            else b[index].push(c);

            return b;
         }, [])
      ]);

const checkRows = (numbers, matrix) => {
   for (let i = 0; i < matrix.length; ++i) {
      if (matrix[i].every(n => numbers.includes(n))) return matrix[i];
   }
}
const checkColumns = (numbers, matrix) => {
   const result = matrix.reduce((b, row) => {
      row.forEach((n, i) => numbers.includes(n) && (b[i] ? b[i].push(n) : (b[i] = [n])));

      return b;
   }, []);

   for (let i = 0; i < result.length; ++i) {
      if (result?.[i].length === 5) return result[i];
   }
}

const checkMatrix = (numbers, matrix) => checkRows(numbers, matrix) || checkColumns(numbers, matrix);

const getUnmarkedNumbers = (numbers, matrix) => matrix.reduce((b, row) => {
   row.forEach(n => !numbers.includes(n) && b.push(n));

   return b;
}, []);

const getResult = ([luckyNumbers, matrixArray]) => {
   const usedNumbers = [];

   for (let i = 0; i < luckyNumbers.length; ++i) {
      usedNumbers.push(luckyNumbers[i]);

      if (i >= 5) {
         for (let j = 0; j < matrixArray.length; ++j) {
            if (checkMatrix(usedNumbers, matrixArray[j])) {
               return getUnmarkedNumbers(usedNumbers, matrixArray[j]).reduce((b, c) => b + c, 0) * luckyNumbers[i];
            }
         }
      }
   }
}

getData(4).then(getResult);
