/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * This is a component of the solution the the Bakery Packing problem
 *
 * data sets used to test the system
 *
 */


let name = {
	"VS5":  "Vegemite Scroll",
	"MB11": "Blueberry Muffin",
	"CF":   "Croissant"
};

/**
 *
 * Schema
  	"string": {
		"integer": decimal d.dd ,
		"integer": decimal d.dd ,
		...
	},
 	"string": {...},
 	"string": {...},
 	...

	 * Schema description
	 "code - product identifier (string)": {
			"pack size identifier (integer)": pack cost - decimal d.dd ,
			"pack size identifier (integer)": pack cost - decimal d.dd ,
			...
		},
	 "code": {...},
	 "code": {...},
	 ...


 */

let product = {
	"VS5": {
		"3": 6.99,
		"5": 8.99
	},
	"MB11": {
		"2": 9.95,
		"5": 16.95,
		"8": 24.95
	},
	"CF": {
		"3": 5.95,
		"5": 9.95,
		"9": 16.99
	}
};
