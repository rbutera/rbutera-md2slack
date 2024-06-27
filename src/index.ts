#!/usr/bin/env -S node --no-warnings
import { format } from 'date-fns'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as packageJson from '../package.json'
import { convertAll } from './convert'

process.stdin.resume()
process.stdin.setEncoding('utf8')

const DEBUG_LOG = process.env.DEBUG ?? false

const _console = DEBUG_LOG ? console : { log: () => {}, error: () => {} }

export function writeConverted(toConvert: string[]): void {
  const converted = convertAll(toConvert)
  const trimmed = converted.trim()
  process.stdout.write(trimmed)
  _console.log('Converted output written.')
}

export function runOnStdIn() {
  _console.log('Reading from stdin...')
  let remainder = ''
  process.stdin.on('data', function (chunk) {
    _console.log('Data chunk received...')
    const lines = chunk.toString().split('\n')
    lines.unshift(remainder + lines.shift())
    const popped = lines.pop()
    remainder = popped ?? ''
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

    _console.log('Writing converted lines...')
    writeConverted(toConvert)
  })
}

export async function runOnToday() {
  const dateFormat = 'yyyy-MM-dd EEE'
  const directory: string =
    process.env.DAILY_STANDUP_DIRECTORY ?? `${os.homedir()}/notes/work/log`
  const filename: string = format(new Date(), dateFormat)
  const filenameFull = `${directory}/done ${filename}.md`
  _console.log(`Reading file: ${filenameFull}`)
  const contents = await fs.readFile(filenameFull, 'utf8')
  _console.log('File read successfully.')
  writeConverted(contents.split('\n'))
}

export function version() {
  _console.log('Writing version...')
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

  _console.log('Exiting...')
  process.exit(0)
}

await main()
