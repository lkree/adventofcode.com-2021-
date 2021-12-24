import { getData } from '../common';

const day = 2;

// part 1
const actions = {
   forward: (f, c) => f[0] += c,
   down: (f, c) => f[1] += c,
   up: (f, c) => f[1] -= c
};

getData(day).then(r => r.reduce((battery, curr) => {
   const [action, value] = curr.split(' ');
   actions[action](battery, +value);

   return battery;
}, [0, 0])).then(([x, y]) => x * y);

// part 2
const aimActions = {
   forward: (f, c) => { f[0] += c; f[1] += f[2] * c },
   down: (f, c) => f[2] += c,
   up: (f, c) => f[2] -= c
};

getData(day).then(r => r.reduce((battery, curr) => {
   const [action, value] = curr.split(' ');
   aimActions[action](battery, +value);

   return battery;
}, [0, 0, 0])).then(([x, y]) => x * y);
