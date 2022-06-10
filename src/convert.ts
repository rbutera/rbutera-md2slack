import slackify from 'slackify-markdown'
/*
 * Converts a markdown string to slack markdown
 */
function convert(input: string): string {
  const slackified = slackify(input)
  return slackified.replace(/<(\/)?cite>/g, '_').trimEnd()
}

export default convert
