var util = {

// var zoroInt16 = new BigNumber('0000000000000000000000000000000000000000000000000000000000000000', 16);
// var minInt16 = new BigNumber('0000000000000000000000000000000000000000000000000000000000000001', 16);
// var maxInt16 = new BigNumber('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);

    wordToBitcoinAddress: function (key) {
        var bytes = Crypto.SHA256(key.toString(), { asBytes: true });
        return util.bytesToBitcoinAddress(bytes);
    },

    intToBitcoinAddress: function (int) {
        var bytes = util.intToBytes(int);
        return util.bytesToBitcoinAddress(bytes);
    },

    hexToBitcoinAddress: function (hex) {
        hex = hex.toString() || "1";
        hex = util.addZero(hex, 64);
        var bytes = util.hexToBytes(hex)
        return util.bytesToBitcoinAddress(bytes);
    },

    wordToBytes: function (key) {
        return Crypto.SHA256(key.toString(), { asBytes: true });
    },

    wordToSha256: function (key) {
        return Crypto.SHA256(key.toString());
    },

    hexToBytes: function (hex) {
        return Crypto.util.hexToBytes(hex);
    },

    bytesToHex: function (bytes) {
		return Crypto.util.bytesToHex(hex);
    },


    intToBytes: function (int) {
        
        if (/^[0-9]+$/.test(int) === false) {
        	int = 1;
        }

        var int10 = new BigNumber(int);
        var int16 = int10.toString(16);
		int16 = util.addZero(int16, 64);

        var maxInt16 = new BigNumber('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);

        if (int10.gt(maxInt16.toString(10))) {
        	int16 = maxInt16.toString(16);
        }

		return Crypto.util.hexToBytes(int16);
    },

    privateKeyToBitcoinAddress: function (privateKey){
        var hex = Bitcoin.Base58.decode(privateKey);
        hex = Crypto.util.bytesToHex(hex);
        hex = hex.substring(2, 66);
        return util.hexToBitcoinAddress(hex);
    },
    
    bytesToBitcoinAddress: function (bytes) {
        
        var addressUnCompressed,
        	addressCompressed,
        	privateKey;

        var hex = Crypto.util.bytesToHex(bytes);

		// addressUnCompressed
		var btcKey = new Bitcoin.ECKey(bytes);
		btcKey.compressed = false;
		var addressUnCompressed = btcKey.getBitcoinAddress().toString();

		// addressCompressed
		var btcKey = new Bitcoin.ECKey(bytes);
		btcKey.compressed = true;
		var addressCompressed = btcKey.getBitcoinAddress().toString();

		// privateKey
		privateKey = btcKey.getExportedPrivateKey();

		return {
			addressUnCompressed: addressUnCompressed,
			addressCompressed: addressCompressed,
            privateKey: privateKey,
            bytes: bytes,
			hex: hex,
		}
    },

    addZero: function (number, length) {
        var buffer = "";
        if (number == "") {
            for (var i = 0; i < length; i++) {
                buffer += "0"
            }
        } else {
            if (length < number.length) {
                return ""
            } else if (length == number.length) {
                return number
            } else {
                for (var i = 0; i < (length - number.length); i++) {
                    buffer += "0"
                }
                buffer += number
            }
        }
        return buffer
    },



}