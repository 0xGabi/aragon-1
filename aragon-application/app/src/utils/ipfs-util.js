import ipfsAPI from 'ipfs-http-client'

export const ipfs = ipfsAPI(process.env.IPFS_RPC_ENDPOINT)

export async function save(content) {
  for await (const result of ipfs.add(content)) {
    return result.path
  }
}
