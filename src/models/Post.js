import Page from '@/models/Page'
import FIELDS from '@/data/fields'

export default class extends Page {
  /*
  * @params extend Content
  * @param date Datetime
  */
  constructor (args) {
    super(args)
    this.type = "post"
    this.published = this.published || false
  }

  publish () {
    this.published = true
  }

  getFields() {
    return Object.assign(FIELDS.post, FIELDS.page)
  }
}
