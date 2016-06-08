import * as mock from './mock';
import async from '../src/async';

let count = 0
async.whilst(
    () => Promise.resolve(count < 5),
    () => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('whilst task', count, timeout);
            setTimeout(() => resolve(++count), timeout);
        });
    }
)
    .then((...args) => console.log('async.whilst done', args, count))
    .catch((error) => console.log('async.whilst error', error));

async.whilst(
    (count) => Promise.resolve(count < 5),
    (count) => {
        return new Promise((resolve, reject) => {
            let timeout = mock.getTimeout(1, 1);
            console.log('whilst task', count, timeout);
            setTimeout(() => resolve(++count), timeout);
        });
    },
    0
)
    .then((...args) => console.log('async.whilst done', args))
    .catch((error) => console.log('async.whilst error', error));