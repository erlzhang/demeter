import DateTime from '@/utils/DateTime'

describe('DateTime', () => {
  const oTime = new Date(2018, 0, 23, 23, 12, 59).getTime()
  const time = new DateTime(oTime)

  it('should change 3 to 03', () => {
    expect(time.coverZero(3)).toBe("03")
  })

  it('should remain 23', () => {
    expect(time.coverZero(23)).toBe("23")
  })

  it('should parse time into the format of yy-mm-dd HH:MM:SS', () => {
    expect(time.parse("yy-mm-dd HH:MM:SS")).toBe("2018-01-23 23:12:59")
  })

  it('should parse time into the format of yy/mm/dd', () => {
    expect(time.parse("yy/mm/dd")).toBe("2018/01/23")
  })


  it('should get timestamp of the given time', () => {
    expect(time.getTimestamp()).toBe(oTime)
  })
})
