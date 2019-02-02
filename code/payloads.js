/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * This is a component of the solution the the Bakery Packing problem
 *
 * data sets used to test the system
 *
 */

let payloads = {
	"standard": {
		"stream": [
			"10 VS5",
			"14 MB11",
			"13 CF"
		],
		"expected": null
	},
	"string": {
		"stream": `
		10 VS5
		14 MB11
		13 CF
		`,
		"expected": null
	},
	"number": {
		"stream": 1234,
		"expected": null
	},
	"random": {
		"stream": [
			"",
			"XXX",
			"XXX YYY",
			"10 YYY",
			"ZZ VS5",
			"10 VS5",
			"14 MB11",
			"13 CF",
			"1 CF",
			"7 CF"
		],
		"expected": null
	},
	"empty": {
		"stream": [],
		"expected": ``
	},

};

