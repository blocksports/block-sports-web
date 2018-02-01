export const mockNavigation = [
	{
		id: 'soccer',
		name: 'Soccer',
		type: 'sport',
		count: 20,
		competitions: [
			{
				id: '111',
				name: 'A League',
				type: 'competition',
				sport: 'soccer',
				count: 5,
			},
			{
				id: '112',
				name: 'B League',
				type: 'competition',
				sport: 'soccer',
				count: 5,
			},
			{
				id: '113',
				name: 'C League',
				type: 'competition',
				sport: 'soccer',
				count: 5,
			},
			{
				id: '114',
				name: 'D League',
				type: 'competition',
				sport: 'soccer',
				count: 5,
			},
		],
	},
	{
		id: 'american-football',
		name: 'American Football',
		type: 'sport',
		count: 24,
		competitions: [],
	},
	{
		id: 'mixed-martial-arts',
		name: 'Mixed Martial Arts',
		type: 'sport',
		count: 13,
		competitions: [
			{
				id: '311',
				name: 'Card 1',
				type: 'competition',
				sport: 'mma',
				count: 5,
			},
			{
				id: '312',
				name: 'Card 2',
				type: 'competition',
				sport: 'mma',
				count: 5,
			},
			{
				id: '313',
				name: 'Card 3',
				type: 'competition',
				sport: 'mma',
				count: 5,
			},
			{
				id: '314',
				name: 'Card 4',
				type: 'competition',
				sport: 'mma',
				count: 5,
			},
			{
				id: '315',
				name: 'Card 5',
				type: 'competition',
				sport: 'mma',
				count: 5,
			},
		],
	},
	{
		id: 'basketball',
		name: 'Basketball',
		type: 'sport',
		count: 33,
		competitions: [],
	},
	{
		id: 'cricket',
		name: 'Cricket',
		type: 'sport',
		count: 17,
		competitions: [
			{
				id: '211',
				name: 'A Test',
				type: 'competition',
				sport: 'cricket',
				count: 5,
			},
			{
				id: '212',
				name: 'B Test',
				type: 'competition',
				sport: 'cricket',
				count: 5,
			},
			{
				id: '213',
				name: 'C Test',
				type: 'competition',
				sport: 'cricket',
				count: 5,
			},
		],
	},
	{
		id: 'ice-hockey',
		name: 'Ice Hockey',
		type: 'sport',
		count: 23,
		competitions: [],
	},
	{
		id: 'boxing',
		name: 'Boxing',
		type: 'sport',
		count: 27,
		competitions: [],
	},
	{
		id: 'tennis',
		name: 'Tennis',
		type: 'sport',
		count: 20,
		competitions: [],
	},
];

export const mockMarkets = [
	{
		id: '9t7GbKPLoo04',
		name: 'Adelaide United_Central Coast Mariners',
		sport: 'soccer',
		competition: 'A-LEAGUE',
		competition_name: 'A-League',
		participants: ['Adelaide United', 'Central Coast Mariners'],
		commence: '2510822200',
		status: 'Pending',
		outcomes: 3,
		matched: 7927.2300000000005,
		match_odds: {
			back: [
				[
					{ odds: 2.54, available: 20.88 },
					{ odds: 2.5, available: 31.12 },
					{ odds: 2.44, available: 93.7 },
				],
				[{ odds: 2.45, available: 22.48 }, { odds: 2.41, available: 31.92 }],
				[{ odds: 3.37, available: 21.42 }, { odds: 3.29, available: 30.87 }],
			],
			lay: [
				[{ odds: 4.8, available: 21.18 }, { odds: 4.95, available: 30.56 }],
				[
					{ odds: 4.8, available: 20.79 },
					{ odds: 4.95, available: 34.46 },
					{ odds: 5.12, available: 95.47 },
					{ odds: 5.25, available: 284.94 },
					{ odds: 5.5, available: 664.53 },
				],
				[
					{ odds: 8.8, available: 23.3 },
					{ odds: 9.31, available: 31.53 },
					{ odds: 9.82, available: 93.84 },
				],
			],
		},
		scale: 0.167,
	},
];

export const mockPrices = {
	NEO: { USD: 28.14, GAS: 1.23, AUD: 35.7 },
	GAS: { USD: 22.79, GAS: 1, AUD: 29.02 },
};

export const mockNotifications = [
	{
		id: 484590,
		runnerName: 'Arsenal',
		name: 'Arsenal_Manchester United',
		status: 'Pending',
		outcome: 'is now',
		type: 'back',
		date: '14 mins ago',
	},
	{
		id: 246124,
		runnerName: 'Australia',
		name: 'Australia_New Zealand',
		status: 'Filled',
		outcome: 'is now',
		type: 'lay',
		date: '27 mins ago',
	},
	{
		id: 125519,
		runnerName: 'Adelaide United',
		name: 'Adelaide United_Central Coast Mariners',
		status: null,
		outcome: 'won',
		type: 'back',
		date: '1 hour ago',
	},
	{
		id: 152334,
		runnerName: 'Conor McGregor',
		name: 'Conor McGregor_Floyd Mayweather',
		status: null,
		outcome: 'lost',
		type: 'lay',
		date: '6 hours ago',
	},
	{
		id: 524935,
		runnerName: 'Manchester United',
		name: 'Arsenal_Manchester United',
		status: null,
		outcome: 'cancelled',
		type: 'back',
		date: '4 days ago',
	},
];

export const mockCards = [
	{
		sport: 'tennis',
		name: 'Australian Open',
		commence: 1523664000,
		total_matched: 3945.34,
	},
	{
		sport: 'american-football',
		name: 'Superbowl',
		commence: 1533396800,
		total_matched: 2245.34,
	},
	{
		sport: 'soccer',
		name: 'FA Cup Final',
		commence: 1530316800,
		total_matched: 51453.42,
	},
];

