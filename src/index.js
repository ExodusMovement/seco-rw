// @flow
import * as secoFile from 'seco-file'

export default function (file: string, passphrase: string | Buffer, header: Object) {
  let blobKey
  let metadata
  let destroyed = false

  return {
    async write (data) {
      if (destroyed) throw new Error('seco-writer class has been destroyed, create a new one')
      if (metadata) {
        await secoFile.write(file, data, { metadata, blobKey, overwrite: true, header })
      } else {
        const res = await secoFile.write(file, data, { passphrase, overwrite: true, header })
        blobKey = res.blobKey
        metadata = res.metadata
      }
    },
    async read () {
      if (destroyed) throw new Error('seco-writer class has been destroyed, create a new one')
      const res = await secoFile.read(file, passphrase)
      blobKey = res.blobKey
      metadata = res.metadata
      return res.data
    },
    destroy () {
      destroyed = true
      if (blobKey) blobKey.fill(0)
    }
  }
}
