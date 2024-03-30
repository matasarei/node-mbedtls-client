# MbedTLS Node.js Client
Original DTLS client with fixes and improvements from AI and [node-mbed-dtls-modified](https://www.npmjs.com/package/node-mbed-dtls-modified), 
including Node.js 12 support.

## Setup & Build
```bash
git submodule update --init mbedtls
npm i
```

## DTLS Client API:

Here is the scope of possible options, along with their default values.
```javascript
const options = {
  host:    'localhost', // The target address or hostname.
  port:     5684,       // The target UDP port.
  socket:   undefined,  // An already established socket, if you'd rather spin your own.
  key:      undefined,  // Buffer. Our private key.
  cert:     undefined,  // Buffer. Our public key.
  psk:      undefined,  // Buffer. Pre-shared Symmetric Key, if applicable.
  PSKIdent: undefined,  // Buffer. PSK Identity, if applicable.
  CACert:   undefined,  // Buffer. CA public key, if applicable.
  debug:    0           // How chatty is the library? Larger values generate more log.
};
```
Must be provided with either a `key` and `cert` or a `psk` and `PSKIdent`.
If `CACert` is provided, the server's certificate will be validated against it.

### Events
`secureConnect` when we successfully establish a connection. This will only occur once for any given client.
```javascript
// socket: A connection socket, ready for data.
client.on('secureConnect', (socket) => {});
```

`close` when the socket closes.
```javascript
//hadError: A boolean. Did the socket close because of an error?
client.on('close', (hadError) => {});
```

`error` when the connection has a problem.
```javascript
// err: Error code.
// msg: Optional error string.
client.on('error', (err, msg) => {});
```
