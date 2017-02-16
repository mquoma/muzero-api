var utils = {

	bitMaskToInt: function(bitMask) {
		return bitMask.split('').reverse().reduce( (acc, val, idx) => acc += parseInt(val) * (Math.pow(2, idx)), 0);
	}
}

module.exports = utils;