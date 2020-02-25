import ipfsAPI from 'ipfs-http-client'

export var ipfs = ipfsAPI('https://ipfs.app.mesg.com:5001')

export async function save(content) {
  for await (const result of ipfs.add(content)) {
    return result.path
  }
}
