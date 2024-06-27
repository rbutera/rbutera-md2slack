import slackify from 'slackify-markdown'
import { prepare } from './prepare'

function replace(input: string): string {
  return input.replace(/- \[x] /g, '• ✔️  ').replace(/- \[ ] /, '• ')
  // .replace(/\[([\s\w]+)](\S+)/g, '$1: $2')
}

function format(input: string): string {
  return input
    .replace(/<(\/)?cite>/g, '_')
    .replace(/<([^|]+)\|(.+)>/g, '$2: $1')
    .replace(/\[\!quote\]/g, ' ')
    .trimEnd()
}

/*
 * Converts a markdown string to slack markdown
 */
function convert(input: string): string {
  if (!!input && input.length > 0) {
    const prepared = replace(input)
    const slackified = slackify(prepared)
    return format(slackified)
  } else {
    return input
  }
}

export function convertAll(input: string[]): string {
  // split into sections
  const toConvert = prepare(input.join('\n'))
  const paragraphs = toConvert.split(/\n(# [\S ]*)/g)
  const trimmed = paragraphs.map((text) => {
    return text.startsWith('\n\n') ? text.slice(2) : text
  })
  const convertedParagraphs = trimmed.map((text) => convert(text))
  const result = convertedParagraphs.join('\n\n')

  return result
}

export default convert
