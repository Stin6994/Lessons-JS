export const inc = () =>  ({type: 'INC'}); // аналогично return {type: 'INC'}
export const dec = () =>  ({type: 'DEC'});
export const rnd = () =>  ({ type: 'RND', payload: Math.floor(Math.random() *10) });