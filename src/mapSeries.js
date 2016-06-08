import tryFn from './tryFn';

export default function mapSeries(collection, iteratee) {
    return collection.reduce(
        (promise, item, index, collection) => {
            return promise.then((results) => {
                return tryFn(iteratee, item, index, collection)
                    .then((result) => {
                        results.push(result);
                        return results;
                    });
            });
        },
        Promise.resolve([])
    );
};