
var numSideFloats = 0;

function insertBasicFloat(floatClass, iconPath) {
	var divId = "calc-float-" + numSideFloats;
	++numSideFloats;

	document.write("<div id='" + divId + "'></div>")
	var result = document.getElementById(divId);
	result.classList.add("side-float", floatClass);

	var icon = document.createElement("img");
	icon.setAttribute("src", iconPath);
	result.appendChild(icon);

	return result;
}

function insertCalculatorFloat(calcData) {
	var result = insertBasicFloat("calc-float", "boomcalc.png");

	var link = document.createElement("a");
	link.setAttribute("href", "javascript:true;");
	link.onclick = function() {
		openCalculator(calcData);
	}
	link.appendChild(document.createTextNode("Click here"));
	result.appendChild(link);

	var text = (
		" to open an interactive calculator for calculating " +
		calcData.name.toLowerCase() + "."
	)
	result.appendChild(document.createTextNode(text))
	return result;
}

function insertVideoFloat(thing, timestamp) {
	var result = insertBasicFloat("video-float", "youtube.png");

	var link = document.createElement("a");
	var url = "https://www.youtube.com/watch?v=d7WBQH5-1ps#t=" + timestamp;
	link.setAttribute("href", url);
	link.appendChild(document.createTextNode("Click here"));
	result.appendChild(link);

	var text = " to open a video demonstration of " + thing + ".";
	result.appendChild(document.createTextNode(text))
	return result;
}

function insertInfoFloat(text) {
	var result = insertBasicFloat("info-float", "infoicon.png");

	result.appendChild(document.createTextNode(text));
	return result;
}

