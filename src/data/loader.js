import {SharedArray} from 'k6/data';

export const intras = new SharedArray('intras', function () {
  return JSON.parse(open('./intras.json'));
});
