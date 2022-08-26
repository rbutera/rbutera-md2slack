#! /usr/bin/env node
import { convertAll } from './convert'
import * as process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as packageJson from '../package.json'
import { format } from 'date-fns'
import * as fs from 'node:fs/promises'

process.stdin.resume()
process.stdin.setEncoding('utf8')

export function writeConverted(toConvert: string[]): void {
  const converted = convertAll(toConvert)
  const trimmed = converted.trim()
  process.stdout.write(trimmed)
}

export function runOnStdIn() {
  let remainder = ''
  process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n')
    lines.unshift(remainder + lines.shift())
    const popped = lines.pop()
    remainder = popped ? popped : ''
    const toConvert = []
    let skip = false
    let index = 0
    for (const line of lines) {
      if (index === 0 && line.startsWith('---')) {
        skip = true
      }

      if (!skip) {
        toConvert.push(line)
      } else if (skip && line.startsWith('---')) {
        skip = false
      }

      index++
    }

    writeConverted(toConvert)
  })
}

export async function runOnToday() {
  const dateFormat = 'yyyy-MM-dd EEE'
  const directory =
    process.env.DAILY_STANDUP_DIRECTORY ?? '/Users/rai/notes/work/log'
  const filename = format(new Date(), dateFormat)
  const filenameFull = `${directory}/done ${filename}.md`
  const contents = await fs.readFile(filenameFull, 'utf8')
  writeConverted(contents.split('\n'))
}

export function version() {
  return process.stdout.write(packageJson.version)
}

export async function main() {
  const fullArguments = yargs(hideBin(process.argv))
  const { argv } = fullArguments

  if (Object.keys(argv).includes('v')) {
    version()
    return
  }

  const { parsed } = fullArguments

  if (!parsed) {
    runOnStdIn()
    return
  }

  const { _: argument } = parsed.argv

  if (argument.includes('today') || argument.includes('standup')) {
    await runOnToday()
  }

  process.exit(0)
}

await main()
