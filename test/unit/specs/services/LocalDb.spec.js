import LocalDb from '@/services/LocalDb'

describe('LocalDb', () => {
  LocalDb.init()
  it("add item into localdb", () => {
    LocalDb.addItem("pages", {
      id: "1234",
      name: "12345678"
    })
  })
})
