const getData = () => fetch('https://adventofcode.com/2021/day/1/input').then(r => r.text()).then(r => r.split('\n'));

// part 1
getData().then(data => data.reduce((battery, cur, i) => {
   if (+cur > +data[i-1])
      ++battery;

   return battery;
}, 0));

// part 2
getData().then(data => data.reduce((b, c, i) => {
   if (i >= 3)
      b += Number(+data[i-3] + +data[i-2] + +data[i-1] < +data[i-2] + +data[i-1] + +c);

   return b;
}, 0));
