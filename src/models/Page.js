import uniqid from 'uniqid'

import LocalDb from '@/services/LocalDb'
import FIELDS from '@/data/fields'

const STORE = "pages"

export default class {
  /*
  * @param id String
  * @param slug String
  * @param title String
  * @param datetime Object
  * @param content String
  */
  constructor (args) {
    this.store = STORE
    this.fields = this.getFields()
    if ( !args ) {
      this.uid = uniqid()
      this.datetime = new Date().getTime()
      this.isSaved = false
    } else {
      this.getParams(args, this)
      this.isSaved = true
    }
    this.type = "page"
  }

  getParams (args, obj={}) {
    for ( let key of Object.keys(this.fields) ) {
      let arg = args[key]
      if ( arg != undefined ) {
        Object.defineProperty(obj, key, {
          value: arg,
          writable: true,
          enumerable: true
        })
      }
    }
    return obj
  }

  validate () {

  }

  save () {
    if ( this.isSaved ) return;

    const item = this.getParams(this)
    const e = LocalDb.addItem(this.store, this.getParams(this))
    if ( e.type == "success" ) {
      this.isSaved = true;
    }
    return e;
  }

  update () {
    if ( !this.isSaved ) return;

    const item = this.getParams(this)
    return LocalDb.updateItem(this.store, this.getParams(this))
  }

  delete () {
    return LocalDb.deleteItem(this.store, this.uid)
  }

  getFields () {
    return FIELDS.page;
  }
}
