export const mockNavigation = [
  {
    id: 'soccer',
    name: 'Soccer',
    type: 'sport',
    marketCount: 20,
    items: [
      {
        id: '111',
        name: 'A League',
        type: 'competition',
        sport: 'soccer',
        marketCount: 5
      },
      {
        id: '112',
        name: 'B League',
        type: 'competition',
        sport: 'soccer',
        marketCount: 5
      },
      {
        id: '113',
        name: 'C League',
        type: 'competition',
        sport: 'soccer',
        marketCount: 5
      },
      {
        id: '114',
        name: 'D League',
        type: 'competition',
        sport: 'soccer',
        marketCount: 5
      },
    ],
  },
  {
    id: 'cricket',
    name: 'Cricket',
    type: 'sport',
    marketCount: 15,
    items: [
      {
        id: '211',
        name: 'A Test',
        type: 'competition',
        sport: 'cricket',
        marketCount: 5
      },
      {
        id: '212',
        name: 'B Test',
        type: 'competition',
        sport: 'cricket',
        marketCount: 5
      },
      {
        id: '213',
        name: 'C Test',
        type: 'competition',
        sport: 'cricket',
        marketCount: 5
      },
    ],
  },
  {
    id: 'mma',
    name: 'Mixed Martial Arts',
    type: 'sport',
    marketCount: 25,
    items: [
      {
        id: '311',
        name: 'Card 1',
        type: 'competition',
        sport: 'mma',
        marketCount: 5
      },
      {
        id: '312',
        name: 'Card 2',
        type: 'competition',
        sport: 'mma',
        marketCount: 5
      },
      {
        id: '313',
        name: 'Card 3',
        type: 'competition',
        sport: 'mma',
        marketCount: 5
      },
      {
        id: '314',
        name: 'Card 4',
        type: 'competition',
        sport: 'mma',
        marketCount: 5
      },
      {
        id: '315',
        name: 'Card 5',
        type: 'competition',
        sport: 'mma',
        marketCount: 5
      }
    ],
  },
];

export const mockMarkets = [
  {
    id: '1',
    name: 'Tsering vs Sergej',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 1313.59,
    date: '1507717083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '1',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '2',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  },
  {
    id: '2',
    name: 'Tsering vs Sergej',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 2013.59,
    date: '1507746083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '2',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '2',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  },
  {
    id: '3',
    name: 'Tsering vs Sergej',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 213.59,
    date: '1507816083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '3',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '3',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  },
  {
    id: '4',
    name: 'Blah vs Blah',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 713.59,
    date: '1508716083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '4',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '4',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  },
  {
    id: '5',
    name: 'Tsering vs Sergej',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 13.59,
    date: '1517716083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '5',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '5',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  },
  {
    id: '6',
    name: 'Tsering vs Sergej',
    sport: 'soccer',
    entity: 'competition',
    entity_id: '111',
    entity_name: 'A League',
    total_matched: 313.59,
    date: '1508214242',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '6',
      name: 'Tsering Redmond Jones',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.19
        },
        {
          odds: 3.1,
          matched: 15.19
        },
        {
          odds: 3.0,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.19
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.19
        }
      ]
    },
    runner_b: {
      type: 'runner',
      runner_id: '1112',
      market_id: '6',
      name: 'Sergej Stojanovski',
      option: 'b',
      back: [
        {
          odds: 1.3,
          matched: 21.19
        },
        {
          odds: 1.4,
          matched: 15.19
        },
        {
          odds: 1.5,
          matched: 11.19
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.19
        },
        {
          odds: 1.9,
          matched: 15.19
        },
        {
          odds: 2.0,
          matched: 11.19
        }
      ]
    }
  }
];
