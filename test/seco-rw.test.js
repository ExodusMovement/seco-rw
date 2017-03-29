import test from 'tape'
import tempfile from 'tempfile'
import createSecoRW from '../src'

test('readFile / writeFile', async (t) => {
  t.plan(1)

  const testFile: string = tempfile('.seco')
  const file = createSecoRW(testFile, Buffer.from('opensesame'), { appName: 'Exodus', appVersion: '1.0.0' })

  const secretMessage = new Buffer('Hello, lets meet at 10 PM to plan our secret mission!')

  await file.write(secretMessage)

  const message = await file.read()

  t.is(message.toString('utf8'), secretMessage.toString('utf8'), 'verify content is the same')

  t.end()
})

test('readFile / writeFile w/ string passphrase', async (t) => {
  t.plan(1)

  const testFile: string = tempfile('.seco')
  const file = createSecoRW(testFile, 'opensesame', { appName: 'Exodus', appVersion: '1.0.0' })

  const secretMessage = new Buffer('Hello, lets meet at 10 PM to plan our secret mission!')

  await file.write(secretMessage)

  const message = await file.read()

  t.is(message.toString('utf8'), secretMessage.toString('utf8'), 'verify content is the same')

  t.end()
})

test('writeFile 2x', async (t) => {
  t.plan(1)

  const testFile: string = tempfile('.seco')
  const file = createSecoRW(testFile, Buffer.from('opensesame'), { appName: 'Exodus', appVersion: '1.0.0' })

  const secretMessage = new Buffer('Hello, lets meet at 11 PM to plan our secret mission!')
  const secretMessage2 = new Buffer('Hello, lets meet at 12 AM to plan our secret mission!')

  await file.write(secretMessage)
  await file.write(secretMessage2)

  const message = await file.read()

  t.is(message.toString('utf8'), secretMessage2.toString('utf8'), 'verify content is the same')

  t.end()
})

test('destroy()', async (t) => {
  t.plan(4)

  const testFile: string = tempfile('.seco')
  const passphrase = Buffer.from('opensesame')
  const file = createSecoRW(testFile, passphrase, { appName: 'Exodus', appVersion: '1.0.0' })

  await file.write(Buffer.from('Hello, lets meet at 10 PM to plan our secret mission!'))

  t.doesNotThrow(() => file.destroy())

  await file.read().catch(e => t.assert(e, 'read() errors when called after destroy()'))

  await file.write(Buffer.from('Hello World!'))
    .catch(e => t.assert(e, 'write() errors when called after destroy()'))

  t.equal(passphrase.toString(), 'opensesame', "doesn't overwrite passphrase")

  t.end()
})

test("destroy() doesn't error when instance was not used", async (t) => {
  t.plan(1)

  const testFile: string = tempfile('.seco')
  const file = createSecoRW(testFile, 'opensesame', { appName: 'Exodus', appVersion: '1.0.0' })

  t.doesNotThrow(() => file.destroy())

  t.end()
})
