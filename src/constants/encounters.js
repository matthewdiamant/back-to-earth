export default [
  // 1
  [],
  // 2
  [{ speed: "slow", size: "medium", health: "medium", weapons: ["main"] }],
  // 3
  [
    { speed: "slow", size: "medium", health: "medium", weapons: ["main", "secondary"] },
    { speed: "medium", size: "medium", health: "medium", weapons: ["main"] }
  ],
  // 4
  [
    { speed: "medium", size: "small", health: "weak", weapons: ["main"] },
    { speed: "slow", size: "medium", health: "medium", weapons: ["main"] },
    { speed: "slow", size: "medium", health: "medium", weapons: ["main", "secondary"] },
  ],
  // 5
  [
    { speed: "medium", size: "medium", health: "weak", weapons: ["missile"] },
    { speed: "medium", size: "small", health: "weak", weapons: ["main"] },
    { speed: "slow", size: "medium", health: "medium", weapons: ["main", "secondary"] },
  ],
  // 6
  [
    { speed: "fast", size: "small", health: "medium", weapons: ["main"] },
    { speed: "medium", size: "medium", health: "weak", weapons: ["main", "missile"] },
    { speed: "medium", size: "medium", health: "medium", weapons: ["main", "secondary"] },
  ],
  // 7
  [
    { speed: "fast", size: "small", health: "medium", weapons: ["beam"] },
    { speed: "medium", size: "medium", health: "medium", weapons: ["main", "missile"] },
    { speed: "medium", size: "medium", health: "medium", weapons: ["main", "secondary"] },
  ],
  // 8
  [
    { speed: "slow", size: "large", health: "strong", weapons: ["main", "secondary"] },
    { speed: "medium", size: "medium", health: "strong", weapons: ["main", "secondary"] },
    { speed: "fast", size: "small", health: "medium", weapons: ["beam"] },
  ],
  // 9
  [
    { speed: "medium", size: "large", health: "strong", weapons: ["main", "secondary"] },
    { speed: "medium", size: "medium", health: "strong", weapons: ["main", "secondary"] },
    { speed: "fast", size: "small", health: "medium", weapons: ["beam"] },
  ],
  // 10
  [
    { speed: "fast", size: "large", health: "strong", weapons: ["main", "secondary", "missile"] },
    { speed: "fast", size: "medium", health: "strong", weapons: ["main", "secondary"] },
    { speed: "fast", size: "small", health: "strong", weapons: ["beam", "secondary"] },
  ]
];
