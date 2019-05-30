import uniqid from 'uniqid'

import LocalDb from '@/services/LocalDb'
import FIELDS from '@/data/fields'

import Validation from '@/utils/Validation'

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
    console.log( this )
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
    console.log(obj)
    return obj
  }

  validates (params) {
    this.errors = {}
    let is_valid = true
    for ( let field of Object.keys(this.fields) ) {
      let value = params[field]
      let specs = this.fields[field]
      let validation = new Validation(value, field, specs)
      if ( validation.error ) {
        this.errors[field] = validation.error
        is_valid = is_valid ? false : is_valid
      }
    }
    return is_valid;
  }

  save () {
    if ( this.isSaved ) return;

    const item = this.getParams(this)

    this.is_valid = this.validates(item)
    if ( !this.is_valid ) {
      return {
        type: "invalid"
      }
    }

    const e = LocalDb.addItem(this.store, item)
    if ( e.type == "success" ) {
      this.isSaved = true;
    }
    return e;
  }

  update () {
    if ( !this.isSaved ) return;

    const item = this.getParams(this)

    this.is_valid = this.validates(item)
    if ( !this.is_valid ) {
      return;
    }

    return LocalDb.updateItem(this.store, item)
  }

  delete () {
    return LocalDb.deleteItem(this.store, this.uid)
  }

  getFields () {
    return FIELDS.page;
  }
}
