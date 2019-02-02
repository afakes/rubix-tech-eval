class BakeryView  extends base {

	/**
	 * @param {Bakery} src
	 */
	constructor(src) {
		super();
		this.src = src;

		this.elements = {
			"input": null,
			"output": null,
			"error": null
		};

	}

	/** @returns {Bakery} */
	get src() {

	    return this.getProperty('src', null);
	}

	/** @param {Bakery} value */
	set src(value) {
	    this.setProperty('src', value);
	}

	// ui element ID's

	/** @returns {{}} */
	configureElements(input = null, output = null, error = null) {
		if (input  != null) { this.elements.input  = document.getElementById(input);  }
		if (output != null) { this.elements.output = document.getElementById(output); }
		if (error  != null) { this.elements.error  = document.getElementById(error);  }
	}

	render() {
		if (this.src == null) { return; }

		this.input();
		this.payload();
		this.error();

	}

	input() {
		if (this.elements.input === null) { return; }
		this.elements.input.innerText = JSON.stringify(this.src.inputStream || "" , null, 2);
	}

	/**
	 * Render the payload of the Bakery Object
	 */
	payload() {
		if (this.elements.output === null) { return; }

		for (let lineItem of this.src.payload || [] ) {
			this.elements.output.appendChild(this.formatLineItem(lineItem));
		}
	}

	/**
	 * configured formatter
	 * @return {Intl.NumberFormat}
	 */
	static get numberFormatter() {
		return new Intl.NumberFormat('en-AU', { style: 'decimal', minimumFractionDigits: 2});
	}

	/**
	 * for mat line-item for output
	 * @param lineItem
	 * @return {DocumentFragment}
	 */
	formatLineItem(lineItem) {

		let formatter = BakeryView.numberFormatter;

		let str = `${lineItem.numberOfItems}&nbsp;${lineItem.code}&nbsp;$${formatter.format(lineItem.totalCost)}`;

		for (let subItem of lineItem.breakdown || []) {
			str += `\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${subItem.count}&nbsp;x&nbsp;${subItem.packSize}&nbsp;$${formatter.format(subItem.packCost)}`;
		}

		return BakeryView.toHTML(`<pre>${str}</pre>`);
	}

	error() {
		if (this.elements.error === null) { return; }

		let str = `<ul>`;
		for (let error of this.src.error || []) { str += `<li>${error.message || ""}</li>\n`; }
		str += `<ul>`;

		this.elements.error.appendChild(BakeryView.toHTML(str));
	}



	/**
	 * convert string into HTML appendable object (HTML Fragment)
	 * @param {string} string
	 * @return {DocumentFragment}
	 */
	static toHTML(string = "") {
		return document.createRange().createContextualFragment(string);
	}

	/** @returns {{}} */
	get elements() {
	    return this.getProperty('elements', {"input": null, "output": null, "error": null });
	}

	/** @param {{}} value */
	set elements(value) {
	    this.setProperty('elements', value);
	}

}

