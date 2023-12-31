/*

1. Variables, Cookies

*/

let loadedcookie = "loaded";


let data = [
  {
    id: 1,
    customer: 'Horst Schlämmer',
    street: 'Hauptstraße 1',
  },  
  {
    id: 2,
    customer: 'Peter Lustig',
    street: 'Hauptstraße 2',
  },
];

const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

export const getEntry = (id) => {
      
  const result = data.filter( element => {
    return element.id === id;
  }); 
    
  return result;

}

export const updateEntry = (entry) => {

  const result = data.map( element => {
   return element.id === entry.id && entry
  }); 
  data = result;
  return result;

}

//wenn der Cookie loadedcookie gesetzt ist, gib die lokalen Daten zurück, ansonsten die Daten aus der API
export const getData = () => {
   

return data
}

const dbName = 'fenotecDB';
const storeName = 'fenotecStore';



/*

2. Function zum Speichern und Lesen von indexedDB

*/

const handleIndexedDB = (action="get", id=0) => {
  
    // indexedDB
    if (!('indexedDB' in window)) {
        alert('IndexedDB wird von diesem Browser nicht unterstützt.');
        return;
    }
    const request = indexedDB.open(dbName, 2);
  
    request.onerror = function(event) {
        alert('Fehler beim Öffnen der Datenbank:', event.target.errorCode);
    };
  
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const store = db.createObjectStore(storeName, { keyPath: 'id' });
    };
  
    request.onsuccess = function(event) {
        
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
  
        // save items
        if(action === 'save') {
  
            data.forEach(item => {
                store.put(item); 
            });
  
          } else {

        //return requested item    
            let result = store.get(1);
  
            result.onsuccess = function(e) {
              return(e.target.result);
            }
        }
  
         
          console.info(store.get(1))
          transaction.oncomplete = function() {
            console.log('Daten erfolgreich in IndexedDB gespeichert.');
          };
  
          transaction.onerror = function(event) {
            console.error('Fehler beim Speichern der Daten in IndexedDB:', event.target.error);
          };
  
  
      }
  }
  

  