
var currentWindow = null;

function PopupWindow(windowClass, title, bodyDiv) {
	// Only a single window can be open at a time.
	if (currentWindow != null) {
		currentWindow.close();
	}
	currentWindow = this;

	this.title = title;
	this.windowDiv = this.createWindowDiv(windowClass, bodyDiv);
	document.body.appendChild(this.windowDiv);
}

PopupWindow.prototype = {
	createCloseButton: function() {
		var result = document.createElement("div");
		result.classList.add("close-button");
		result.appendChild(document.createTextNode("X"));
		var popup = this;
		result.onclick = function() {
			popup.close();
		}
		return result;
	},

	createTitleBar: function() {
		var result = document.createElement("div");
		result.classList.add("title-bar");
		result.appendChild(this.createCloseButton());
		result.appendChild(document.createTextNode(this.title));
		return result;
	},

	createWindowDiv: function(windowClass, body) {
		var result = document.createElement("div");
		result.classList.add("popup-window");
		if (windowClass) {
			result.classList.add(windowClass);
		}
		result.appendChild(this.createTitleBar());
		result.appendChild(body);

		return result;
	},

	onClose: function() {},

	close: function() {
		if (this.windowDiv != null) {
			this.onClose();
			document.body.removeChild(this.windowDiv);
			this.windowDiv = null;
		}
	},
}

