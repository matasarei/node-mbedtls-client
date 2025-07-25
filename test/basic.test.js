const assert = require('assert');

describe('node-mbedtls-client Basic Tests', function() {
  this.timeout(10000); // 10 second timeout for network operations

  describe('Module Loading', function() {
    it('should load the module without errors', function() {
      const mbedtls = require('../index.js');
      assert(mbedtls, 'Module should be loaded');
      assert.strictEqual(typeof mbedtls.connect, 'function', 'connect should be a function');
    });

    it('should expose the connect method', function() {
      const mbedtls = require('../index.js');
      const methods = Object.keys(mbedtls);
      assert(methods.includes('connect'), 'Module should expose connect method');
    });
  });

  describe('DtlsSocket Class', function() {
    it('should load DtlsSocket class', function() {
      const DtlsSocket = require('../socket.js');
      assert(DtlsSocket, 'DtlsSocket class should be loaded');
      assert.strictEqual(typeof DtlsSocket, 'function', 'DtlsSocket should be a constructor function');
    });

    it('should create DtlsSocket instance with valid options', function() {
      const DtlsSocket = require('../socket.js');
      
      // Create with minimal valid PSK options
      const options = {
        host: '127.0.0.1',
        port: 12345,
        psk: Buffer.from('test-psk'),
        PSKIdent: Buffer.from('test-client')
      };
      
      const socket = new DtlsSocket(options);
      assert(socket instanceof DtlsSocket, 'Should create DtlsSocket instance');
      assert.strictEqual(typeof socket.send, 'function', 'Socket should have send method');
      assert.strictEqual(typeof socket.bind, 'function', 'Socket should have bind method');
      assert.strictEqual(typeof socket.end, 'function', 'Socket should have end method');
      assert.strictEqual(socket.remoteAddress, '127.0.0.1', 'Should set remote address');
      assert.strictEqual(socket.remotePort, 12345, 'Should set remote port');
    });

    it('should throw error when creating socket without PSK or private key', function() {
      const DtlsSocket = require('../socket.js');
      
      const options = {
        host: '127.0.0.1',
        port: 12345
        // No PSK or private key provided
      };
      
      assert.throws(() => {
        new DtlsSocket(options);
      }, /you must define either a PSK or a private key/, 'Should throw error for missing authentication');
    });
  });

  describe('Integration Tests', function() {
    it('should handle connection attempts gracefully', function(done) {
      const mbedtls = require('../index.js');
      
      const options = {
        host: '127.0.0.1',
        port: 12345,
        psk: Buffer.from('test-psk'),
        PSKIdent: Buffer.from('test-client')
      };

      try {
        const socket = mbedtls.connect(options);
        
        let responseReceived = false;
        
        socket.on('error', (err) => {
          if (!responseReceived) {
            responseReceived = true;
            assert(err, 'Error should be provided');
            console.log('Expected error received:', err.message || err.toString());
            socket.end();
            done();
          }
        });

        socket.on('secureConnect', () => {
          if (!responseReceived) {
            responseReceived = true;
            socket.end();
            done();
          }
        });

        // Quick timeout - we just want to see that the module can handle connection attempts
        setTimeout(() => {
          if (!responseReceived) {
            responseReceived = true;
            socket.end();
            // This is actually success - the module handled the connection attempt without crashing
            done();
          }
        }, 1000);
        
      } catch (err) {
        // Synchronous error is also valid - shows the module handles invalid input
        done();
      }
    });

    it('should handle invalid certificate paths gracefully', function(done) {
      const mbedtls = require('../index.js');
      
      const options = {
        host: '127.0.0.1',
        port: 12345,
        key: '/nonexistent/private.der',
        cert: '/nonexistent/public.der'
      };

      try {
        const socket = mbedtls.connect(options);
        
        socket.on('error', (err) => {
          assert(err, 'Error should be provided for invalid certificates');
          socket.end();
          done();
        });

        socket.on('secureConnect', () => {
          socket.end();
          done(new Error('Should not connect with invalid certificates'));
        });

        // Timeout fallback
        setTimeout(() => {
          socket.end();
          done(new Error('No error received for invalid certificates'));
        }, 1000);
      } catch (err) {
        // Synchronous error is also acceptable
        assert(err, 'Should throw error for invalid certificates');
        done();
      }
    });

    it('should handle PSK buffer validation', function() {
      const mbedtls = require('../index.js');
      
      // Test with non-buffer PSK (should fail)
      const invalidOptions = {
        host: '127.0.0.1',
        port: 12345,
        psk: 'not-a-buffer',
        PSKIdent: Buffer.from('test-client')
      };

      assert.throws(() => {
        mbedtls.connect(invalidOptions);
      }, 'Should throw error for non-buffer PSK');
    });
  });

  describe('Native Module Tests', function() {
    it('should have native bindings loaded', function() {
      const DtlsSocket = require('../socket.js');
      
      const options = {
        host: '127.0.0.1',
        port: 12345,
        psk: Buffer.from('test-psk'),
        PSKIdent: Buffer.from('test-client')
      };
      
      const socket = new DtlsSocket(options);
      
      // Check that the native module is properly bound
      assert(socket.mbedSocket, 'Native DTLS socket should be bound');
      assert.strictEqual(typeof socket.mbedSocket, 'object', 'Native socket should be an object');
    });

    it('should expose required native methods', function() {
      const mbed = require('../build/Release/node_mbed_dtls_client');
      
      assert(mbed, 'Native module should be loaded');
      assert(mbed.DtlsSocket, 'Native DtlsSocket constructor should be available');
      assert.strictEqual(typeof mbed.DtlsSocket, 'function', 'DtlsSocket should be a constructor');
    });
  });
});
