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
    total_matched: 1313.35,
    date: '1507717083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '1',
      name: 'Mirren King-Smith',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.49
        },
        {
          odds: 3.1,
          matched: 15.79
        },
        {
          odds: 3.0,
          matched: 11.09
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.99
        },
        {
          odds: 3.5,
          matched: 15.31
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
          matched: 21.66
        },
        {
          odds: 1.4,
          matched: 15.00
        },
        {
          odds: 1.5,
          matched: 11.09
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.14
        },
        {
          odds: 1.9,
          matched: 15.69
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
    total_matched: 2013.91,
    date: '1507746083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '2',
      name: 'Mirren King-Smith',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.91
        },
        {
          odds: 3.1,
          matched: 15.21
        },
        {
          odds: 3.0,
          matched: 11.77
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.66
        },
        {
          odds: 3.5,
          matched: 15.14
        },
        {
          odds: 3.6,
          matched: 11.49
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
          matched: 21.53
        },
        {
          odds: 1.4,
          matched: 15.78
        },
        {
          odds: 1.5,
          matched: 11.71
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.36
        },
        {
          odds: 1.9,
          matched: 15.26
        },
        {
          odds: 2.0,
          matched: 11.15
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
    total_matched: 213.11,
    date: '1507816083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '3',
      name: 'Mirren King-Smith',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.44
        },
        {
          odds: 3.1,
          matched: 15.33
        },
        {
          odds: 3.0,
          matched: 11.11
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.93
        },
        {
          odds: 3.5,
          matched: 15.83
        },
        {
          odds: 3.6,
          matched: 11.79
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
          matched: 21.27
        },
        {
          odds: 1.4,
          matched: 15.69
        },
        {
          odds: 1.5,
          matched: 11.37
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.14
        },
        {
          odds: 1.9,
          matched: 15.12
        },
        {
          odds: 2.0,
          matched: 11.11
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
    total_matched: 713.78,
    date: '1508716083',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '4',
      name: 'Mirren King-Smith',
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
          matched: 21.15
        },
        {
          odds: 3.5,
          matched: 15.19
        },
        {
          odds: 3.6,
          matched: 11.61
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
          matched: 21.69
        },
        {
          odds: 1.4,
          matched: 15.48
        },
        {
          odds: 1.5,
          matched: 11.42
        }
      ],
      lay: [
        {
          odds: 1.8,
          matched: 21.61
        },
        {
          odds: 1.9,
          matched: 15.51
        },
        {
          odds: 2.0,
          matched: 11.96
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
      name: 'Mirren King-Smith',
      option: 'a',
      back: [
        {
          odds: 3.2,
          matched: 21.83
        },
        {
          odds: 3.1,
          matched: 15.10
        },
        {
          odds: 3.0,
          matched: 11.57
        }
      ],
      lay: [
        {
          odds: 3.4,
          matched: 21.49
        },
        {
          odds: 3.5,
          matched: 15.53
        },
        {
          odds: 3.6,
          matched: 11.87
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
          matched: 15.10
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
    total_matched: 313.11,
    date: '1508214242',
    runner_a:
    {
      type: 'runner',
      runner_id: '1111',
      market_id: '6',
      name: 'Mirren King-Smith',
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
