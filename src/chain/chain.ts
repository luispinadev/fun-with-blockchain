import { last, head, tail, not } from 'ramda'

import { Block, HashableBlock, hashBlock } from '../block'

export type Blockchain = Block[]

const GENESIS_BLOCK = {
  data: 'Genesis block',
  previousHash: '0_0',
  timestamp: '26/11/2017',
  index: 0,
  nounce: 193,
}

const createGenesisBlock = (genesis = GENESIS_BLOCK): Block => ({
  ...GENESIS_BLOCK,
  hash: hashBlock(GENESIS_BLOCK),
})

export const createChain = (): Blockchain => [createGenesisBlock()]

export const addBlock = (newBlock: HashableBlock, blockChain: Blockchain) => [
  ...blockChain,
  {
    ...newBlock,
    previousHash: last(blockChain)!.hash,
    hash: hashBlock(newBlock),
  },
]

/*
  Notes:
    - The "indexInTail" is the index of previous block in the blockchain
*/
export const isChainValid = (blockchain: Blockchain) =>
  // check genesis block
  head(blockchain)!.hash === hashBlock(head(blockchain)!)
  // check ledger blocks
  && not(
    tail(blockchain)
    .some( (block, indexInTail) =>
      block.hash !== hashBlock(block) ||
      block.previousHash !== blockchain[indexInTail].hash ||
      false
    )
  )

