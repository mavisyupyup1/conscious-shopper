export function idbPromise(storeName, method, object, key) {
    return new Promise((resolve, reject) => {
        // open connection to the database with the version of 1
        const request = window.indexedDB.open('concious-shopper', 1);

        //create variables to hold reference to the database, trasaction and object store
        let db, tx, store;

        // if version has changed (or if this is the first time using the database), run this method and create object stores
        request.onupgradeneeded = function(e) {
            const db = request.result;
            // create a object store for each type of data and set primary key to be the `_id` of the data
            db.createObjectStore('business', {keyPath: '_id'});
            db.createObjectStore('thoughts', {keyPath: '_id'});
            db.createObjectStore('me', { keyPath: '_id'});
            db.createObjectStore('location', { autoIncrement: true });
        };

        request.onerror = function(e){
            console.log('There was an error');
        };

        // on database open success
        request.onsuccess = function(e){
            // save a reference of the database to the `db` variable
            db = request.result;
            // open a transaction to whatever we pass into `storeName` must be equal to already defined object storeNames
            tx = db.transaction(storeName, 'readwrite');
            // save a reference to that object store
            store = tx.objectStore(storeName);

            // if there's any errors, let us know
            db.onerror = function(e) {
                console.log('error', e);
            };

            // method that specifies what to change or retrieve with commands for the idb promise
            switch(method){
                case 'put':
                    store.put(object, key);
                    resolve(object, key);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess=function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('No valid method');
                    break;
            }

            // when the transaction is complete, close the connection
            tx.oncomplete = function() {
                db.close();
            };
        };
    });
}