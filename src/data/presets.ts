import { AlgorithmPreset } from '../types';

/**
 * Predefined algorithm presets with code snippets and metadata.
 * These can be used to quickly load and visualize common algorithms.
 * Each preset includes:
 * - id: Unique identifier
 * - name: Display name
 * - category: Algorithm category (e.g., sorting)
 * - algorithm: Object containing:
 *   - name: Algorithm name
 *   - description: Brief description
 *   - timeComplexity: Time complexity notation
 *   - spaceComplexity: Space complexity notation
 *   - code: JavaScript implementation as a string
 *   - steps: Initially empty array for visualization steps
 */
export const ALGORITHM_PRESETS: AlgorithmPreset[] = [
  // ===== EFFICIENT ALGORITHMS =====
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    algorithm: {
      name: 'Quick Sort',
      description: 'Efficient divide-and-conquer algorithm that picks a pivot and partitions the array.',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      steps: []
    }
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    algorithm: {
      name: 'Merge Sort',
      description: 'Stable divide-and-conquer algorithm that divides array into halves and merges them sorted.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      steps: []
    }
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    algorithm: {
      name: 'Heap Sort',
      description: 'Builds a max heap then repeatedly extracts the maximum element.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
      steps: []
    }
  },

  // ===== SIMPLE ALGORITHMS =====
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    algorithm: {
      name: 'Bubble Sort',
      description: 'Simple algorithm that repeatedly compares adjacent elements and swaps if needed.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    algorithm: {
      name: 'Selection Sort',
      description: 'Finds the minimum element and places it at the beginning, then repeats.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    algorithm: {
      name: 'Insertion Sort',
      description: 'Builds sorted array one element at a time by inserting into correct position.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}`,
      steps: []
    }
  },

  // ===== IMPROVED ALGORITHMS =====
  {
    id: 'shell-sort',
    name: 'Shell Sort',
    category: 'sorting',
    algorithm: {
      name: 'Shell Sort',
      description: 'Generalization of insertion sort that allows exchange of far apart elements.',
      timeComplexity: 'O(n^1.25) to O(n²)',
      spaceComplexity: 'O(1)',
      code: `function shellSort(arr) {
  const n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      
      arr[j] = temp;
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'comb-sort',
    name: 'Comb Sort',
    category: 'sorting',
    algorithm: {
      name: 'Comb Sort',
      description: 'Improvement over bubble sort that eliminates turtles (small values near the end).',
      timeComplexity: 'O(n²) worst, O(n log n) avg',
      spaceComplexity: 'O(1)',
      code: `function combSort(arr) {
  const n = arr.length;
  let gap = n;
  let swapped = true;
  
  while (gap !== 1 || swapped) {
    gap = Math.floor(gap / 1.3);
    if (gap < 1) gap = 1;
    
    swapped = false;
    
    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
      }
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'cocktail-sort',
    name: 'Cocktail Sort',
    category: 'sorting',
    algorithm: {
      name: 'Cocktail Sort',
      description: 'Bidirectional bubble sort that sorts in both directions on each pass.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function cocktailSort(arr) {
  const n = arr.length;
  let left = 0;
  let right = n - 1;
  let swapped = true;
  
  while (swapped) {
    swapped = false;
    
    // Left to right pass
    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    right--;
    
    if (!swapped) break;
    swapped = false;
    
    // Right to left pass
    for (let i = right; i > left; i--) {
      if (arr[i] < arr[i - 1]) {
        [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
        swapped = true;
      }
    }
    left++;
  }
  
  return arr;
}`,
      steps: []
    }
  },

  // ===== INTERESTING/UNUSUAL ALGORITHMS =====
  {
    id: 'gnome-sort',
    name: 'Gnome Sort',
    category: 'sorting',
    algorithm: {
      name: 'Gnome Sort',
      description: 'Simple algorithm that works like insertion sort but moves element to beginning by swapping.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function gnomeSort(arr) {
  const n = arr.length;
  let index = 0;
  
  while (index < n) {
    if (index === 0) {
      index++;
    } else if (arr[index] >= arr[index - 1]) {
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'pancake-sort',
    name: 'Pancake Sort',
    category: 'sorting',
    algorithm: {
      name: 'Pancake Sort',
      description: 'Sorts by flipping prefixes of the array, like flipping a stack of pancakes.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      code: `function pancakeSort(arr) {
  const n = arr.length;
  
  function flip(k) {
    let left = 0;
    while (left < k) {
      [arr[left], arr[k]] = [arr[k], arr[left]];
      left++;
      k--;
    }
  }
  
  function findMax(n) {
    let maxIdx = 0;
    for (let i = 0; i < n; i++) {
      if (arr[i] > arr[maxIdx]) {
        maxIdx = i;
      }
    }
    return maxIdx;
  }
  
  for (let currSize = n; currSize > 1; currSize--) {
    const maxIdx = findMax(currSize);
    
    if (maxIdx !== currSize - 1) {
      if (maxIdx !== 0) {
        flip(maxIdx);
      }
      flip(currSize - 1);
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'bogo-sort',
    name: 'Bogo Sort',
    category: 'sorting',
    algorithm: {
      name: 'Bogo Sort',
      description: 'Randomly shuffles array until it becomes sorted. Extremely inefficient!',
      timeComplexity: 'O((n+1)!) avg, O(∞) worst',
      spaceComplexity: 'O(1)',
      code: `function bogoSort(arr) {
  function isSorted() {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
  
  function shuffle() {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  while (!isSorted()) {
    shuffle();
    // In practice, you'd want a limit to prevent infinite loops!
  }
  
  return arr;
}`,
      steps: []
    }
  }
];
