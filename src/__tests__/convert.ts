import convert from '../convert'

describe('convert', () => {
  it('converts a markdown input to slack', () => {
    const input = `I love [md2slack](https://github.com/rbutera/md2slack)`
    const actual = convert(input)

    expect(actual).toBe('I love <https://github.com/rbutera/md2slack|md2slack>')
  })

  it('converts <cite> tags to italics', () => {
    const input = `wawawiwa <cite>Borat</cite>`
    const actual = convert(input)

    expect(actual).toBe('wawawiwa _Borat_')
  })

  it('handles links correctly', () => {
    const input = `- [x] Added a routine to dumps pipeline that [merges 'Other' and 'Other Jurisdiction'](https://app.clickup.com/t/2r74da2)`
    const actual = convert(input)
    const expected = `• ✅ Added a routine to dumps pipeline that <https://app.clickup.com/t/2r74da2|merges 'Other' and 'Other Jurisdiction'>`

    expect(actual).toBe(expected)
  })
})
