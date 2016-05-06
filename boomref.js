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


VIDEO_BOOMEDIT_WAD = {
	title: "BOOMEDIT.WAD",
	videoId: "d7WBQH5-1ps",
}

VIDEO_MBFEDIT_WAD = {
	title: "MBFEDIT!.WAD",
        videoId: "TbUwV5hMIwk",
}

VIDEO_SKY_WAD = {
	title: "SKY.WAD",
	videoId: "BfuN7mRSeYs",
}

VIDEO_HOCKEY_WAD = {
	title: "HOCKEY.WAD",
	videoId: "VyqVMGDZ0Ls",
}

var numSideFloats = 0;

function insertBasicFloat(floatClass, iconPath) {
	var divId = "calc-float-" + numSideFloats;
	++numSideFloats;

	document.write("<div id='" + divId + "'></div>")
	var result = document.getElementById(divId);
	result.classList.add("side-float", floatClass);

	if (iconPath != null) {
		var icon = document.createElement("img");
		icon.setAttribute("src", iconPath);
		result.appendChild(icon);
	}

	return result;
}

function insertCalculatorFloat(calcData) {
	var result = insertBasicFloat("calc-float", "boomcalc.png");

	var link = document.createElement("a");
	link.setAttribute("href", "javascript:void(0);");
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

function parseTimestamp(timestamp) {
	var regex = /((\d+)m)?((\d+)s?)/;
	var match = regex.exec(timestamp);
	var minutes = match[2] || "0";
	var seconds = match[4] || "0";
	return parseInt(minutes) * 60 + parseInt(seconds);
}

var videoPlayer = null;

function openVideoWindow(video, seconds) {
	var videoDiv = document.createElement("div");
	var win = new PopupWindow("video-popup", video.title, videoDiv);

	videoPlayer = new YT.Player(videoDiv, {
		width: '100%',
		videoId: video.videoId,
		events: {
			onReady: function() {
				videoPlayer.seekTo(seconds);
			},
		},
	});

	// Track the video window so that we don't open a new window every
	// time a video link is clicked - just seek the existing window.
	win.onClose = function() {
		videoPlayer = null;
	}
}

// Seek the video window if it is open, and if it isn't, open one.
function seekVideoWindow(video, timestamp) {
	var seconds = parseTimestamp(timestamp);
	if (videoPlayer != null) {
		// Check we have the same video open we want to play.
		var url = videoPlayer.getVideoUrl();
		if (url.indexOf("v=" + video.videoId) >= 0) {
			videoPlayer.seekTo(seconds);
			return;
		}
	}
	openVideoWindow(video, seconds);
}

function insertVideoFloat(video, thing, timestamp) {
	var result = insertBasicFloat("video-float", "youtube.png");

	// Link is an actual link to the video location so the user can open
	// the link in a new tab if desired, but in practice when clicked the
	// video is opened in a popup window.
	var link = document.createElement("a");
	var url = (
		"https://www.youtube.com/watch?" +
		"v=" + video.videoId +
		"#t=" + timestamp
	);
	link.setAttribute("href", url);
	link.onclick = function(e) {
		seekVideoWindow(video, timestamp);
		return false;
	}
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

function openScreenshotWindow(filename, text) {
	var windowContents = document.createElement("div");
	var screenshot = document.createElement("img");
	screenshot.setAttribute("src", "screenshots/" + filename);
	windowContents.appendChild(screenshot);

	var win = new PopupWindow("screenshot-popup", "Screenshot",
	                          windowContents);
}

function insertScreenshotFloat(filename, text) {
	var result = insertBasicFloat("screenshot-float", null);
	var thumbnail = document.createElement("img");
	thumbnail.setAttribute("src", "screenshots/thumb/" + filename);
	thumbnail.onclick = function() {
		openScreenshotWindow(filename, text);
	}
	result.appendChild(thumbnail);
	result.appendChild(document.createTextNode(
		"Click to see a screenshot of " + text));
	return result;
}

function toggleProportional() {
	var content = document.getElementById("content");
	var prop = content.getAttribute("proportional") == "true";
	content.setAttribute("proportional", !prop);
	return true;
}

