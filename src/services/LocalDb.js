const DB_NAME = "demeterDb";
const DB_VERSION = 1;
const STORES = [
  {
    name: "pages",
    key: "uid",
    indexs: ["type", "slug", "published", "book", "ref", "locale"]
  }
]

class Connection {
  constructor () {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    const _this = this
    this.db = null

    request.onsuccess = (event) => {
      console.log("Connect to IndexedDB successfully!")
      _this.db = event.target.result
    }

    request.onerror = () => {
      throw new Error("Can't connect to IndexedDB.");
    }

    request.onupgradeneeded = (event) => {
      console.log("db updated")
      const db = event.target.result

      for( let s of STORES ) {
        let store = db.createObjectStore(s.name, { keyPath: s.key })
        for ( let index of s.indexs ) {
          store.createIndex(index, index, {unique: false})
        }
      }
      _this.db = db
    }
  }
}

const LocalDb = {
  connection: null,

  init () {
    this.connection = new Connection()
  },

  /* A promise to check is the connection of the db can be used!*/
  checkDbConnection () {
    return new Promise((resolve, reject) => {
      if ( this.connection && this.connection.db ) {
        resolve(true);
      } else {
        const _this = this;
        this.timer = setInterval(function() {
          if ( _this.connection && _this.connection.db ) {
            clearInterval(_this.timer);
            resolve(true);
          }
        }, 1000)
      }
    });
  },

  async loadItems (store) {
    let isConnected = await this.checkDbConnection();
    if ( isConnected ) {
      return new Promise((resolve, reject) => {
        const items = []
        const request = this.connection.db.transaction(store, 'readwrite')
                        .objectStore(store)
                        .openCursor()
        request.onsuccess = (event) => {
          let cursor = event.target.result;
          if ( cursor ) {
            items.push(cursor.value)
            cursor.continue()
          } else {
            console.log(items)
            resolve(items)
          }
        }
        request.onerror = (event) => {
          //console.log(event)
        }
      })
    }
  },

  loadItem (store, key) {
    return this.handleItem(store, key, "get")
  },

  deleteItem (store, key) {
    return this.handleItem(store, key, "delete")
  },

  addItem (store, item) {
    return this.handleItem(store, item, "create")
  },

  updateItem (store, item) {
    return this.handleItem(store, item, "update")
  },

  async handleItem (store, item, operate) {
    await this.checkDbConnection()

    return new Promise((resolve, reject) => {
      let requestStore = this.connection.db.transaction(store, 'readwrite')
                    .objectStore(store)

      let request = null
      switch (operate) {
        case 'create':
          request = requestStore.add(item)
          break;
        case "update":
          request = requestStore.put(item)
          break;
        case "get":
          request = requestStore.get(item)
          break;
        case "delete":
          request = requestStore.delete(item)
          break;
      }
      request.onsuccess = (event) => {
        resolve(event)
      }
      request.onerror = (event) => {
        console.log(event)
        reject(event)
      }
    })
  }
}

export default LocalDb
