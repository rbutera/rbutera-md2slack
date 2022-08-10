import slackify from 'slackify-markdown'

function prepare(input: string): string {
  return input.replace(/- \[x] /g, '• ✅ ')
}

function format(input: string): string {
  return input.replace(/<(\/)?cite>/g, '_').trimEnd()
}

/*
 * Converts a markdown string to slack markdown
 */
function convert(input: string): string {
  const prepared = prepare(input)
  const slackified = slackify(prepared)
  return format(slackified)
}

export default convert
