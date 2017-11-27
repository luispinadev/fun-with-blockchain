import { createHmac } from 'crypto'

import { ENC_ALGORYTHM, ENC_SECRET_KEY, ENC_DIGEST_ENCODING } from '../const'

export interface Block {
  data: any
  previousHash: string
  timestamp: string
  hash: string
  index: number
  nounce: number
}

export type HashableBlock =
  | Block
  | Pick<Block, 'data' | 'index' | 'nounce' | 'previousHash' | 'timestamp'>

const ORDERED_METADATA_KEYS: (keyof HashableBlock)[] = [
  'index',
  'nounce',
  'previousHash',
  'timestamp',
]

const blockToString = (block: HashableBlock): string =>
  ORDERED_METADATA_KEYS
    .map(stringableKey => block[stringableKey])
    .concat(JSON.stringify(block.data))
    .join()

export const hashBlock = (b: HashableBlock) =>
  createHmac(ENC_ALGORYTHM, ENC_SECRET_KEY)
    .update(blockToString(b))
    .digest(ENC_DIGEST_ENCODING)
