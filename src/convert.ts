import slackify from 'slackify-markdown'

function prepare(input: string): string {
  return input.replace(/- \[x] /g, '• ✅ ').replace(/- \[ ] /, '• ')
  // .replace(/\[([\s\w]+)](\S+)/g, '$1: $2')
}

function format(input: string): string {
  return input
    .replace(/<(\/)?cite>/g, '_')
    .replace(/<([^|]+)\|(.+)>/g, '$2: $1')
    .trimEnd()
}

/*
 * Converts a markdown string to slack markdown
 */
function convert(input: string): string {
  if (!!input && input.length > 0) {
    const prepared = prepare(input)
    const slackified = slackify(prepared)
    return format(slackified)
  } else {
    return input
  }
}

export default convert
