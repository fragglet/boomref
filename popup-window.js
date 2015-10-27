
function PopupWindow(title, bodyDiv) {
	this.title = title;
	this.windowDiv = this.createWindowDiv(bodyDiv);
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

	createWindowDiv: function(body) {
		var result = document.createElement("div");
		result.classList.add("popup-window");
		result.appendChild(this.createTitleBar());
		result.appendChild(body);

		return result;
	},

	close: function() {
		if (this.windowDiv != null) {
			document.body.removeChild(this.windowDiv);
			this.windowDiv = null;
		}
	},
}

