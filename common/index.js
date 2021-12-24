export const getData = (day) => fetch(`https://adventofcode.com/2021/day/${day}/input`).then(r => r.text()).then(r => r.split('\n').filter(Boolean));
