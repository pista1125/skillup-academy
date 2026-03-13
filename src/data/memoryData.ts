export const DEFAULT_LEVELS = [
  {
    difficulty: "Nagyon könnyű",
    exercises: [
      { id: 1, items: [{ id: "1", type: "shape", content: "circle", color: "#ef4444", x: 50, y: 50, size: 80, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 }] },
      { id: 2, items: [{ id: "1", type: "shape", content: "square", color: "#3b82f6", x: 50, y: 50, size: 80, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 }] },
      { id: 3, items: [{ id: "1", type: "lucide", content: "Star", color: "#f59e0b", x: 50, y: 50, size: 80, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 }] },
      { id: 4, items: [{ id: "1", type: "emoji", content: "🍎", color: "inherit", x: 50, y: 50, size: 80, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 }] },
      { id: 5, items: [{ id: "1", type: "shape", content: "triangle", color: "#10b981", x: 50, y: 50, size: 80, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 }] },
      { id: 6, items: [
          { id: "1", type: "shape", content: "circle", color: "#ef4444", x: 30, y: 50, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 },
          { id: "2", type: "shape", content: "square", color: "#3b82f6", x: 70, y: 50, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 2 }
      ]},
      { id: 7, items: [
          { id: "1", type: "emoji", content: "🐶", color: "inherit", x: 30, y: 50, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 },
          { id: "2", type: "emoji", content: "🐱", color: "inherit", x: 70, y: 50, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 2 }
      ]},
      { id: 8, items: [
          { id: "1", type: "lucide", content: "ArrowUp", color: "#ef4444", x: 50, y: 30, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 1 },
          { id: "2", type: "lucide", content: "ArrowDown", color: "#3b82f6", x: 50, y: 70, size: 60, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 2 }
      ]},
      { id: 9, items: [
          { id: "1", type: "shape", content: "circle", color: "#8b5cf6", x: 50, y: 50, size: 100, rotation: 0, isFilled: false, flipX: false, flipY: false, zIndex: 1 },
          { id: "2", type: "shape", content: "circle", color: "#8b5cf6", x: 50, y: 50, size: 40, rotation: 0, isFilled: true, flipX: false, flipY: false, zIndex: 2 }
      ]},
      { id: 10, items: [
          { id: "1", type: "shape", content: "square", color: "#f59e0b", x: 50, y: 50, size: 80, rotation: 45, isFilled: true, flipX: false, flipY: false, zIndex: 1 },
          { id: "2", type: "shape", content: "square", color: "#ffffff", x: 50, y: 50, size: 40, rotation: 45, isFilled: true, flipX: false, flipY: false, zIndex: 2 }
      ]}
    ]
  },
  // Higher levels can be populated later or designed by user
  { difficulty: "Könnyű", exercises: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, items: [] })) },
  { difficulty: "Közepes", exercises: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, items: [] })) },
  { difficulty: "Nehéz", exercises: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, items: [] })) },
  { difficulty: "Mester", exercises: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, items: [] })) }
];
