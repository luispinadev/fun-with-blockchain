import { last } from 'ramda'

import { createChain, isChainValid, addBlock } from './chain'

let chain = createChain()

console.log('Some tests:\n')
console.log('creating chain')
console.log('chain valid?', isChainValid(chain), '\n')

const newBlock = {
  timestamp: '29/30/2020',
  index: chain.length,
  previousHash: last(chain)!.hash,
  nounce: 132,
  data: 'hello!',
}
console.log('adding block', JSON.stringify(newBlock))
chain = addBlock(
  newBlock,
  chain
)

console.log('chain still valid?', isChainValid(chain), '\n')


console.log('tampering with ledger block')
chain[1] = {
  ...chain[1],
  data: 'no ketchup'
}
console.log('chain still valid?', isChainValid(chain), '\n')