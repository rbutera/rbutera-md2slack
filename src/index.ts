#! /usr/bin/env node
import convert from './convert'
import * as process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as packageJson from '../package.json'

export function run() {
  process.stdin.on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read()) !== null) {
      const converted = convert(chunk)
      process.stdout.write(converted)
    }
  })
}

export function version() {
  process.stdout.write(packageJson.version)
}

export function main() {
  const argv = yargs(hideBin(process.argv)).argv
  if (Object.keys(argv).includes('v')) {
    version()
    return
  }

  run()
}

main()
