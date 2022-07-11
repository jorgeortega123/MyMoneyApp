export const datsa = [
  {
    "user": "Jorge593",
    "name": "Jorge",
    "secondName": "Ortega",
   "actualDay": "Mon",
    "perWeek": 40,
    "perMonth": 160,
    "cost": [
      {
        "fixed": [
          { "title": "ortodoncia", "color":"#0070ff", "value":0, "cost": 5, "max": 5, "monthly": 20},
          {"title": "cooperativa", "color":"#D7FF00", "value":0, "cost": 2.75, "max":2.75, "monthly": 11},
          { "title": "recargar", "color":"#a05195", "value":0, "cost":1.75, "max": 1.75, "monthly": 7 },
          { "title": "comida", "color":"#FFEC00", "value":0, "cost": 5, "max": 8 },
          { "title": "snacks", "color":"#FF7300", "value":0, "cost": 1.5, "max": 4},
          { "title": "pasaje", "color":"#007ED6", "value":0, "cost": 2.4, "max": 3 },
          { "title": "ahorro", "color":"#FF0000", "value":0, "cost": 3, "max": 4}
        ],
        "variables": [
          { "title": "girlfriend", "color":"#FF45F9", "value":0, "cost": 3, "max":6 },
          { "title": "extrafood", "color":"#D7FF00", "value":0, "cost": 1, "max": 2 },
          { "title": "imprevisto", "color":"#007ED6", "value":0, "cost": 4, "max": 8 },
        ],
      },
    ],
    "debts": [
      {"name": "luis", "relationship": "hermano", "mount": 47.00, "paid": 0 },
      {"name": "johanna", "relationship": "mama", "mount": 51.00, "paid": 0 }
    ],
    "dinnerMove": [{}],
    "totalBill": 0,
    "restOfLastWeek": 0,
    "savings": [{ "title": "ahorros", "value":0, "cost": 4, "max": 8 }]
  }
];
export const serverRes = [
    {
      "user": "Jorge593",
      "name": "Jorge",
      "secondName": "Ortega",
     "actualDay": "Mon",
      "perWeek": 40,
      "perMonth": 160,
      "cost": [
        {
          "fixed": [
            { "title": "ortodoncia", "color":"#0070ff", "value":0, "cost": 5, "max": 5, "monthly": 20},
            {"title": "cooperativa", "color":"#D7FF00", "value":0, "cost": 2.75, "max":2.75, "monthly": 11},
            { "title": "recargar", "color":"#a05195", "value":0, "cost":1.75, "max": 1.75, "monthly": 7 },
            { "title": "comida", "color":"#FFEC00", "value":0, "cost": 5, "max": 8 },
            { "title": "snacks", "color":"#FF7300", "value":0, "cost": 1.5, "max": 4},
            { "title": "pasaje", "color":"#007ED6", "value":0, "cost": 2.4, "max": 3 },
            { "title": "ahorro", "color":"#FF0000", "value":0, "cost": 3, "max": 4}
          ],
          "variables": [
            { "title": "girlfriend", "color":"#FF45F9", "value":0, "cost": 3, "max":6 },
            { "title": "extrafood", "color":"#D7FF00", "value":0, "cost": 1, "max": 2 },
            { "title": "imprevisto", "color":"#007ED6", "value":0, "cost": 4, "max": 8 },
          ],
        },
      ],
      "debts": [
        {"name": "luis", "relationship": "hermano", "mount": 47.00, "paid": 0 },
        {"name": "johanna", "relationship": "mama", "mount": 51.00, "paid": 0 }
      ],
      "dinnerMove": [{}],
      "totalBill": 0,
      "restOfLastWeek": 0,
      "savings": [{ "title": "ahorros", "value":0, "cost": 4, "max": 8 }]
    }
  ]
export const lang = {
  "es": {
    "server": { 
      "out": ["El servidor no está disponible", "Estamos trabajando para arreglarlo"]
    }
  },
  "en": { 
    "server": { 
     "out": ["The server is not available", "We are working to fix it"]
    },
    "components": { 
     "moveCash": ["Add cost or expense"],
     "incomingCash": [{
      "title": ["Add incoming cash"],
      "destiny": ["Destiny to"]
    }],
    "detailsWeek": [{
      "title": ["Details"], 
      "greeting" : ["Hi"], 
      "infFirst": ["there's your account balance"],
      "AccountStats": ["Account management: "],
      "netWorth": ["Net Worth"],
      "Savings": ["Savings"],
      "Debts": ["Debts"], 
      "AbilityToBorrow": ["Ability To Borrow"]
   
    }],
     "debts": [{
      "title": ["About debts"],
      "name" : ["Name"],
      "relationship": ["Relationship"],
      "mountToPay": ["Mount to pay"],
      "paid": ["Paid"]
     }
      ]
    },
    "buttons": { 
      "add": ["Add"],
      "weekly": ["Pay weekly"],
      "increase": ["Increase"],
      "decrease": ["Decrease"]
    }

  }
}