import convert from '../convert'

describe('convert', () => {
  it('converts a markdown input to slack', () => {
    const input = `I love [md2slack](https://github.com/rbutera/md2slack)`
    const actual = convert(input)

    expect(actual).toBe(
      'I love <https://github.com/rbutera/md2slack|md2slack>\n',
    )
  })
})
