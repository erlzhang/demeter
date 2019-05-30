export default class Validation {
  constructor (value, name, specs) {
    this.value = value
    this.error = this.validate(name, specs)
  }

  validate(name, specs) {
    let error
    /*validate exsitence*/
    let is_blank = this.is_blank()

    if ( is_blank ) {
      if ( specs["required"] ) {
        error = name + " is required"
      }
      /*if the value is blank but not required, we needn't to test it any more!*/
    } else {
      /*validate range*/
      if ( specs["range"] ) {
        if ( !this.is_in_range(specs["range"]) ) {
          error = name + " is not a valid value"
        }
      }
    }
    return error;
  }

  is_blank () {
    return this.value === undefined || this.value === "" 
  }

  is_in_range (range) {
    return range.indexOf(this.value) > -1
  }

}
