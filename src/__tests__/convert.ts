import convert from '../convert'

describe('convert', () => {
  it('converts a markdown input to slack', () => {
    const input = `I love [md2slack](https://github.com/rbutera/md2slack)`
    const actual = convert(input)

    expect(actual).toBe('I love md2slack: https://github.com/rbutera/md2slack')
  })

  it('converts <cite> tags to italics', () => {
    const input = `wawawiwa <cite>Borat</cite>`
    const actual = convert(input)

    expect(actual).toBe('wawawiwa _Borat_')
  })

  it('handles checkboxes', () => {
    const input = `- [x] Added a routine to dumps pipeline`
    const actual = convert(input)
    const expected = `• ✔️  Added a routine to dumps pipeline`

    expect(actual).toBe(expected)
  })

  it('handles unfinished TODO items', () => {
    const input = `- [ ] Added a routine to dumps pipeline`
    const actual = convert(input)
    const expected = `• Added a routine to dumps pipeline`

    expect(actual).toBe(expected)
  })

  it('handles urls', () => {
    const input = `[foo bar baz](https://bar.baz)`
    const actual = convert(input)
    const expected = `foo bar baz: https://bar.baz`

    expect(actual).toBe(expected)
  })
})
