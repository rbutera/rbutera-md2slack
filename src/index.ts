#! /usr/bin/env node
import convert from './convert'
import * as process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as packageJson from '../package.json'

process.stdin.resume()
process.stdin.setEncoding('utf8')

export function run() {
  let remainder = ''
  process.stdin.on('data', function (chunk) {
    const lines = chunk.toString().split('\n')
    lines.unshift(remainder + lines.shift())
    const popped = lines.pop()
    remainder = popped ? popped : ''
    for (const line of lines) {
      const converted = convert(line)
      process.stdout.write(converted)
      process.stdout.write('\n')
    }
  })
}

export function version() {
  return process.stdout.write(packageJson.version)
}

export function main() {
  const argv = yargs(hideBin(process.argv)).argv
  if (Object.keys(argv).includes('v')) {
    version()
    return
  } else {
    run()
  }
}

main()
