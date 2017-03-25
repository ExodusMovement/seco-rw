// @flow
import * as secoFile from 'seco-file'

// Not using ES6 class here to keep the passphrase private
export default function (file: string, passphrase: string | Buffer, header: Object) {
  let blobKey
  let metadata

  return {
    async write (data) {
      if (metadata) {
        await secoFile.write(file, data, { metadata, blobKey, overwrite: true, header })
      } else {
        const res = await secoFile.write(file, data, { passphrase, overwrite: true, header })
        blobKey = res.blobKey
        metadata = res.metadata
      }
    },
    async read () {
      const res = await secoFile.read(file, passphrase)
      blobKey = res.blobKey
      metadata = res.metadata
      return res.data
    }
  }
}
