import slackify from 'slackify-markdown'
/*
 * Converts a markdown string to slack markdown
 */
function convert(input: string): string {
  return slackify(input)
}

export default convert
