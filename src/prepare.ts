/*
 * takes a markdown string as input and removes YAML frontmatter, if any
 */
export function prepare(input: string) {
  const lines = input.split('\n')
  const [firstLine, ...rest] = lines

  if (!firstLine.startsWith('---')) {
    return input
  }

  let end = false

  const body = []

  for (const line of rest) {
    const ending = line.startsWith('---')

    if (end) {
      body.push(line)
    } else if (ending) {
      end = true
    }
  }

  return body.join('\n')
}
