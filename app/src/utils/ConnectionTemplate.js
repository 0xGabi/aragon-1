import { process } from '@mesg/compiler'

export default async (app, dataInputs, abi, eventSignature, mesgAddress) => {
  console.log('app :', app)
  console.log('dataInputs :', dataInputs)
  console.log('abi :', abi)
  console.log('eventSignature :', eventSignature)
  console.log('mesgAddress', mesgAddress)
  return {}
}
