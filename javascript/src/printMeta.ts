import { promises as fs } from 'fs'
import { Writable } from 'stream'

import { ciDict } from './ciDict'
import { detectCI } from './createMeta'

export async function main(envPath: string, stdout: Writable) {
  const envData = await fs.readFile(envPath, 'utf-8')
  const entries = envData.split('\n').map((line) => line.split('='))
  const env = Object.fromEntries(entries)
  const ci = detectCI(ciDict, env)
  stdout.write(JSON.stringify(ci, null, 2) + '\n')
}
main(process.argv[2], process.stdout).catch((err) => console.error(err.backtrace))
