# seco-rw

A handy wrapper for reading/writing [secure containers](https://github.com/ExodusMovement/secure-container). Caches the file's `blobKey` & `metadata` to avoid expensive scrypt operations.

## Usage

```js
import createSecoRW from 'seco-rw'

const somefile = createSecoRW('somefile.seco', 'opensesame', {
  appName: 'Exodus',
  appVersion: '1.0.0'
})

await somefile.write('Hello World!')
await somefile.read().toString('utf8')
// -> Hello World!
```

### `createSecoRW(file, passphrase, header)`

- `file` (String) Path to the secure-container
- `passphrase` (String | Buffer) Passphrase for the secure-container
- `header` (Object) Data to write to the secure-container header
  - `appName` (String) Name of your app
  - `appVersion` (String) Your app's version number

### `write(data)`

- `data` (String | Buffer) Data to write to the file

Returns a Promise that resolves when the file has been written.

### `read()`

Returns a Promise, resolving to a Buffer of the file data.

### `destroy()`

Destroys the instance and zero-fills the internal cache buffer. Future calls to `read()` or `write()` will error out.

If you are using a `Buffer` passphrase, you may also want to call `.fill(0)` to zero-fill that too.

## License

MIT
