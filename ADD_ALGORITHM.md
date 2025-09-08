# How to Add a New Sorting Algorithm

This guide explains how to add a new sorting algorithm to the Algorithm Visualizer, so it appears in the UI, can be visualized step-by-step, and is available as a preset.

## 1. Add the Algorithm Implementation

All step-by-step sorting algorithms are implemented in `src/utils/sortingAlgorithms.ts` as static methods of the `SortingAlgorithms` class. Each method should:
- Accept an array of `ArrayElement` objects.
- Return an array of `SortingStep` objects (for visualization).
- Push a new `SortingStep` to the `steps` array for each significant action (compare, swap, etc).

**Example skeleton:**
```typescript
static mySort(arr: ArrayElement[]): SortingStep[] {
  const steps: SortingStep[] = [];
  const array = [...arr];
  // ...algorithm logic...
  steps.push({ array: [...array], description: 'Step description' });
  // ...
  return steps;
}
```

## 2. Add a Preset Entry

Presets are defined in `src/data/presets.ts` as objects in the `ALGORITHM_PRESETS` array. Each preset includes:
- `id`: unique string (e.g. 'my-sort')
- `name`: display name
- `category`: 'sorting'
- `algorithm`: { name, description, timeComplexity, spaceComplexity, code (JS string), steps: [] }

**Example:**
```typescript
{
  id: 'my-sort',
  name: 'My Sort',
  category: 'sorting',
  algorithm: {
    name: 'My Sort',
    description: 'Describe what your algorithm does.',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    code: `function mySort(arr) { /* ... */ return arr; }`,
    steps: []
  }
}
```

## 3. (Optional) Add to Category in UI

If you want your algorithm to appear in a specific category ("Efficient", "Simple", etc), update the category arrays in `src/components/AlgorithmSelector.tsx`.

**Example:**
```typescript
const improved = ['shell-sort', 'comb-sort', 'cocktail-sort', 'my-sort'];
```

## 4. Test Your Algorithm
- Run the app.
- Select your algorithm in the UI.
- Use the visualizer to step through and verify the animation and code.

## 5. Tips
- Use existing algorithms as templates.
- Make sure your preset `id` matches the static method name (e.g. `mySort` in code, `my-sort` in preset).
- For educational/novel algorithms, add a clear description and complexity.

---

**Files to edit:**
- `src/utils/sortingAlgorithms.ts` (add implementation)
- `src/data/presets.ts` (add preset entry)
- `src/components/AlgorithmSelector.tsx` (optional: add to category)

