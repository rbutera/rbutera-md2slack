#! /usr/bin/env node
import convert from './convert'
import * as process from 'node:process'

export function main() {
  process.stdin.on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read()) !== null) {
      const converted = convert(chunk)
      process.stdout.write(converted)
    }
  })
}

main()
