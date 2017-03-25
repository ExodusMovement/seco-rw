# seco-writer

A handy class for reading/writing [secure containers](https://github.com/ExodusMovement/secure-container). Caches the file's `blobKey` & `metadata` to avoid expensive scrypt operations.

## Usage

```js
import Writer from 'seco-writer'

const somefile = new Writer('somefile.seco', 'opensesame', {
  appName: 'Exodus',
  appVersion: '1.0.0'
})

await somefile.write('Hello World!')
await somefile.read().toString('utf8')
// -> Hello World!
```

### `new Writer(file, passphrase, header)`

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

## License

MIT
