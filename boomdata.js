
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
			"url": "#sec2.1",
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
			"url": "#sec3.1",
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
	"url": "#sec1.1",
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

commonMonsterPart = {
	"name": "Monsters can trigger",
	"mask": 0x0020,
}

generalizedLifts = {
        "name": "Generalized lifts (elevators)",
        "base": 0x3400,
        "parts": [
                commonTriggerPart,
                commonSpeedPart,
		commonMonsterPart,
		{
			"name": "Delay",
			"mask": 0x00c0,
			"values": [
				"1 second",
				"4 seconds",
				"9 seconds",
				"30 seconds",
			],
		},
		{
			"name": "Target",
			"mask": 0x0300,
			"url": "#sec4.1",
			"values": [
				"LnF (Lowest neighbor floor)",
				"NnF (Next neighbor floor)",
				"LnC (Lowest neighbor ceiling)",
				"LnF <-> HnF (perpetual lift)",
			],
		},
        ],
}

generalizedStairs = {
	"name": "Generalized stairs",
	"base": 0x3000,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		commonMonsterPart,
		{
			"name": "Step size",
			"mask": 0x00c0,
			"values": [
				"4 units",
				"8 units",
				"16 units",
				"24 units",
			],
		},
		{
			"name": "Direction",
			"mask": 0x0100,
			"values": [
				"Down", "Up",
			],
		},
		{
			"name": "Ignore texture",
			"mask": 0x0200,
		},
	],
}

generalizedCrushers = {
	"name": "Generalized crushing ceilings",
	"base": 0x2f80,
	"parts": [
		commonTriggerPart,
		commonSpeedPart,
		commonMonsterPart,
		{
			"name": "Silent",
			"mask": 0x0040,
		},
	],
}

generalizedSectors = {
	"name": "Generalized sector types",
	"base": 0,
	"parts": [
		{
			"name": "Lighting",
			"mask": 0x001f,
			// Lighting values are sparse to keep backward
			// compatibility with original sector types:
			"values": [
				"Normal lighting",
				"random off",
				"blink 0.5 second",
				"blink 1.0 second",
				"-10/20% health AND light blink 0.5 second",
				null,
				null,
				null,
				"oscillates",
				null,
				null,
				null,
				"blink 0.5 second, synchronized",
				"blink 1.0 second, synchronized",
				null,
				null,
				null,
				"flickers on and off randomly",
			],
		},
		{
			"name": "Damage",
			"mask": 0x0060,
			"values": [
				"No damage",
				"5 units per second",
				"10 units per second",
				"20 units per second",
			],
		},
		{
			"name": "Secret",
			"mask": 0x0080,
		},
		{
			"name": "Friction effects",
			"mask": 0x0100,
		},
		{
			"name": "Wind effects",
			"mask": 0x0200,
		},

	],
}

