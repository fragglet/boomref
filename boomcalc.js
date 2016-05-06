// @licstart The following is the entire license notice for the
// JavaScript code in this page.
//
// Copyright (C) 2016 Simon Howard
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// @licend  The above is the entire license notice
// for the JavaScript code in this page.


function Control(part) {
	this.part = part;
	this.createControl();
}

Control.prototype = {
	createDropDown: function() {
		var result = document.createElement("select");

		var i;
		for (i = 0; i < this.part.values.length; ++i) {
			var value = this.part.values[i];
			if (value == null) {
				continue;
			}
			var opt = document.createElement("option");
			opt.appendChild(document.createTextNode(value));
			opt.setAttribute("value", i.toString());
			result.appendChild(opt);
		}

		return result;
	},

	createCheckBox: function() {
		var result = document.createElement("input");
		result.setAttribute("type", "checkbox");
		return result;
	},

	createControl: function() {
		if ("values" in this.part) {
			this.control = this.createDropDown();
		} else {
			this.control = this.createCheckBox();
		}
		var ctrl = this;
		this.control.onchange = function() {
			ctrl.onChange();
		}
	},

	onChange: function() {
	},

	tableRow: function() {
		var result = document.createElement("tr");

		var labelCell = document.createElement("th");
		labelCell.classList.add("label");
		var label = document.createTextNode(this.part.name);
		if ("url" in this.part) {
			var link = document.createElement("a");
			var url = this.part.url;
			if (url.startsWith("#")) {
				url = "index.html" + url;
			}
			link.setAttribute("href", url);
			link.appendChild(label);
			label = link;
		}
		labelCell.appendChild(label);
		result.appendChild(labelCell);

		var controlCell = document.createElement("td");
		controlCell.appendChild(this.control);
		result.appendChild(controlCell);

		return result;
	},

	leftShift: function() {
		var mask = this.part.mask;
		var result = 0;
		while ((mask & 1) == 0) {
			mask = mask >> 1;
			++result;
		}
		return result;
	},

	getValue: function() {
		var value;
		if ("values" in this.part) {
			value = parseInt(this.control.value);
		} else {
			value = this.control.checked ? 1 : 0;
		}
		return value << this.leftShift();
	},

	setValue: function(value) {
		value = (value & this.part.mask) >> this.leftShift();
		if ("values" in this.part) {
			this.control.value = value.toString();
		} else {
			this.control.checked = value != 0;
		}
	},
}

function Calculator(calcData) {
	this.calcData = calcData;
	this.calcWindow = null;
	this.createControls();
}

Calculator.prototype = {
	createControls: function() {
		this.controls = [];

		var calc = this;
		function controlChanged() {
			calc.onChange();
		}

		var i;
		for (i = 0; i < this.calcData.parts.length; ++i) {
			var control = new Control(this.calcData.parts[i]);
			control.onChange = controlChanged;
			this.controls.push(control);
		}
	},

	onChange: function() {
	},

	createResultBox: function() {
		var result = document.createElement("div");
		result.classList.add("result");

		var hexDiv = document.createElement("div");
		hexDiv.classList.add("hex-control");
		result.appendChild(hexDiv);

		var hexControl = document.createElement("input");
		hexControl.setAttribute("type", "checkbox");
		hexDiv.appendChild(hexControl);
		hexDiv.appendChild(document.createTextNode("Hex"));

		var inputBox = document.createElement("input");
		inputBox.setAttribute("type", "text");
		result.appendChild(inputBox);

		var calc = this;
		// Change to controls updates result box
		function valueChanged() {
			var value;
			if (hexControl.checked) {
				value = "0x" + calc.getValue().toString(16);
			} else {
				value = calc.getValue().toString();
			}
			inputBox.value = value;
		}
		this.onChange = valueChanged;
		hexControl.onchange = valueChanged;
		valueChanged();

		// Change to result box updates controls
		function boxChanged() {
			var boxValue = inputBox.value;
			var value;
			if (boxValue.startsWith("0x")) {
				value = parseInt(boxValue.substring(2), 16);
			} else {
				value = parseInt(boxValue);
			}
			if (calc.isValidValue(value)) {
				calc.setValue(value);
				inputBox.classList.remove("invalid-result");
			} else {
				inputBox.classList.add("invalid-result");
			}
		}
		inputBox.onchange = boxChanged;
		inputBox.oninput = boxChanged;

		return result;
	},

	createControlsTable: function() {
		var result = document.createElement("table");
		var i;
		for (i = 0; i < this.controls.length; ++i) {
			result.appendChild(this.controls[i].tableRow());
		}
		return result;
	},

	open: function() {
		var title = this.calcData.name + " calculator";
		var body = document.createElement("div");
		body.classList.add("calculator-body");
		body.appendChild(this.createResultBox());
		body.appendChild(this.createControlsTable());
		this.popupWindow =
			new PopupWindow("calculator-window", title, body);
	},

	close: function() {
		this.popupWindow.close();
	},

	isValidValue: function(value) {
		var mask = 0;
		var i;
		for (i = 0; i < this.calcData.parts.length; ++i) {
			mask |= this.calcData.parts[i].mask;
		}
		return (value >= this.calcData.base
		     && value <= this.calcData.base + mask);
	},

	getValue: function() {
		var result = this.calcData.base;
		var i;
		for (i = 0; i < this.controls.length; ++i) {
			result |= this.controls[i].getValue();
		}
		return result;
	},

	setValue: function(value) {
		var i;
		for (i = 0; i < this.controls.length; ++i) {
			this.controls[i].setValue(value);
		}
	},
};

function openCalculator(calcData) {
	var calc = new Calculator(calcData);
	calc.open();
}

