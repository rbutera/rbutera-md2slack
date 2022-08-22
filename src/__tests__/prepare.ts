import { prepare } from '../prepare'

const body = `# Example

This is an example of a markdown file.

## Another header

This is a heading level 2.

--- 
some other stuff
---
cool`

const frontmatter = `---
aliases: 'Example'
title: 'Example'
tags: done work journal daily
date created: Thursday, April 20th 2069, 4:20:00 pm
date modified: Thursday, April 20th 2069, 4:20:00 pm
---`

const input = `${frontmatter}\n${body}`

describe('prepare', () => {
  it('should remove YAML frontmatter', () => {
    const actual = prepare(input)

    expect(actual).toEqual(body)
  })
})
