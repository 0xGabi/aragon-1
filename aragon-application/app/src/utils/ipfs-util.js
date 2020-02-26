import ipfsAPI from 'ipfs-http-client'

export const ipfs = ipfsAPI('https://rpc.ipfs.app.mesg.com')

export async function save(content) {
  for await (const result of ipfs.add(content)) {
    return result.path
  }
}
