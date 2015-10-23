
// Data about Boom generalized linedef and sector types.
// This is esssentially the tables from boomref.txt in JSON form.

commonTriggerPart = {
	"name": "Trigger",
	"mask": 0x0007,
	"values": [
		"W1 (Walk trigger, works once)",
		"WR (Walk trigger, works repeatedly)",
		"S1 (Single use switch)",
		"SR (Repeated use switch)",
		"G1 (Shootable trigger, works once)",
		"GR (Shootable trigger, works repeatedly",
		"D1 (Door, opens once)",
		"DR (Door, opens repeatedly)",
	],
}

commonSpeedPart = {
	"name": "Speed",
	"mask": 0x0018,
	"values": [
		"Slow", "Normal", "Fast", "Turbo",
	],
},

generalizedFloors = {
	"name": "Generalized floors",
	"base": 0x6000,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		{
			// What this does depends on the value of "change"
			"name": "Model",
			"mask": 0x0020,
			"values": [
				"trig/numeric", "nomonst/monst",
			],
		},
		{
			"name": "Direction",
			"mask": 0x0040,
			"values": [
				"Down", "Up",
			],
		},
		{
			"name": "Target",
			"mask": 0x0380,
			"values": [
				"HnF (Highest neighbor floor)",
				"LnF (Lowest neighbor floor)",
				"NnF (Next neighbor floor)",
				"LnC (Next neighbor ceiling)",
				"C (Ceiling)",
				"sT (Shortest lower texture)",
				"24 units",
				"32 units",
			],
		},
		{
			"name": "Change",
			"mask": 0x0c00,
			"values": [
				"No change",
				"Zero",
				"Texture only",
				"Type",
			],
		},
		{
			"name": "Crush",
			"mask": 0x1000,
		},
	],
}

generalizedCeilings = {
	"name": "Generalized ceilings",
	"base": 0x6000,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		{
			// What this does depends on the value of "change"
			"name": "Model",
			"mask": 0x0020,
			"values": [
				"trig/numeric", "nomonst/monst",
			],
		},
		{
			"name": "Direction",
			"mask": 0x0040,
			"values": [
				"Down", "Up",
			],
		},
		{
			"name": "Target",
			"mask": 0x0380,
			"values": [
				"HnC (Highest neighbor ceiling)",
				"LnC (Lowest neighbor ceiling)",
				"NnC (Next neighbor ceiling)",
				"HnF (Highest neighbor floor)",
				"F (Floor)",
				"sT (Shortest lower texture)",
				"24 units",
				"32 units",
			],
		},
		{
			"name": "Change",
			"mask": 0x0c00,
			"values": [
				"No change",
				"Zero",
				"Texture only",
				"Type",
			],
		},
		{
			"name": "Crush",
			"mask": 0x1000,
		},
	],
}

commonDoorKindPart = {
	"name": "Kind",
	"mask": "0x0060",
	"values": [
		"Open, delay, close",
		"Open",
		"Close, delay, open",
		"Close",
	],
}

generalizedDoors = {
	"name": "Generalized doors",
	"base": 0x3c00,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		commonDoorKindPart,
		{
			"name": "Monsters can trigger",
			"mask": 0x0080,
		},
		{
			"name": "Delay",
			"mask": 0x300,
			"values": [
				"1 second",
				"4 seconds",
				"9 seconds",
				"30 seconds",
			],
		},
	],
}

generalizedLockedDoors = {
	"name": "Generalized locked doors",
	"base": 0x3800,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		commonDoorKindPart,
		{
			"name": "Lock",
			"mask": 0x01c0,
			"values": [
				"Any key",
				"Red keycard",
				"Yellow keycard",
				"Blue keycard",
				"Red skull key",
				"Blue skull key",
				"Yellow skull key",
				"All keys",
			],
		},
		{
			"name": "No difference between card and skull keys",
			"mask": 0x200,
		},

	],
}


