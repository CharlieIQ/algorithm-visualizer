import { AlgorithmPreset } from '../algorithms';

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
  },

  // ===== USEFUL ALGORITHMS =====
  {
    id: 'tim-sort',
    name: 'Tim Sort',
    category: 'sorting',
    algorithm: {
      name: 'Tim Sort',
      description: 'Hybrid stable sort combining merge sort and insertion sort, used in Python and Java.',
      timeComplexity: 'O(n log n) worst, O(n) best',
      spaceComplexity: 'O(n)',
      code: `function timSort(arr) {
  const MIN_MERGE = 32;
  const n = arr.length;
  
  // Sort individual subarrays using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    const right = Math.min(i + MIN_MERGE - 1, n - 1);
    insertionSort(arr, i, right);
  }
  
  // Start merging from size MIN_MERGE
  let size = MIN_MERGE;
  while (size < n) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);
      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
    size *= 2;
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'sorting',
    algorithm: {
      name: 'Counting Sort',
      description: 'Non-comparison sort that counts occurrences of each distinct element.',
      timeComplexity: 'O(n + k) where k is range',
      spaceComplexity: 'O(k)',
      code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  // Transform count array
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return output;
}`,
      steps: []
    }
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'sorting',
    algorithm: {
      name: 'Radix Sort',
      description: 'Non-comparison sort that sorts by individual digits from least to most significant.',
      timeComplexity: 'O(d × (n + k)) where d is digits',
      spaceComplexity: 'O(n + k)',
      code: `function radixSort(arr) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  
  // Transform count array
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy back
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
      steps: []
    }
  },
  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'sorting',
    algorithm: {
      name: 'Bucket Sort',
      description: 'Distributes elements into buckets, sorts each bucket, then concatenates.',
      timeComplexity: 'O(n + k) avg, O(n²) worst',
      spaceComplexity: 'O(n + k)',
      code: `function bucketSort(arr) {
  if (arr.length <= 1) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length));
  const bucketSize = (max - min + 1) / bucketCount;
  
  // Create buckets
  const buckets = Array(bucketCount).fill().map(() => []);
  
  // Distribute elements
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.min(
      Math.floor((arr[i] - min) / bucketSize), 
      bucketCount - 1
    );
    buckets[bucketIndex].push(arr[i]);
  }
  
  // Sort each bucket and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      arr[index++] = buckets[i][j];
    }
  }
  
  return arr;
}`,
      steps: []
    }
  },

  // ===== FUNNY ALGORITHMS =====
  {
    id: 'miracle-sort',
    name: 'Miracle Sort',
    category: 'sorting',
    algorithm: {
      name: 'Miracle Sort',
      description: 'Check if array is sorted, if not, wait for a miracle to occur!',
      timeComplexity: 'O(n) best, O(∞) worst',
      spaceComplexity: 'O(1)',
      code: `function miracleSort(arr) {
  function isSorted() {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }
  
  if (isSorted()) {
    console.log("Miracle! Array is sorted!");
    return arr;
  }
  
  console.log("Array is not sorted. Waiting for a miracle...");
  // In theory, we wait forever for cosmic rays to 
  // flip bits in memory to sort the array
  while (!isSorted()) {
    // Wait for miracle...
    // (In practice, this would run forever)
  }
  
  return arr;
}`,
      steps: []
    }
  },
  {
    id: 'sleep-sort',
    name: 'Sleep Sort',
    category: 'sorting',
    algorithm: {
      name: 'Sleep Sort',
      description: 'Each element sleeps for a time proportional to its value, creating sorted output!',
      timeComplexity: 'O(max(arr)) time complexity',
      spaceComplexity: 'O(n)',
      code: `function sleepSort(arr) {
  const result = [];
  const promises = [];
  
  for (let i = 0; i < arr.length; i++) {
    promises.push(
      new Promise(resolve => {
        setTimeout(() => {
          result.push(arr[i]);
          resolve(arr[i]);
        }, arr[i]);
      })
    );
  }
  
  // Wait for all elements to "wake up"
  return Promise.all(promises).then(() => result);
}

// Usage (async):
// const sorted = await sleepSort([3, 1, 4, 1, 5]);`,
      steps: []
    }
  },
  {
    id: 'quantum-bogo-sort',
    name: 'Quantum Bogo Sort',
    category: 'sorting',
    algorithm: {
      name: 'Quantum Bogo Sort',
      description: 'Uses quantum superposition to check all permutations simultaneously!',
      timeComplexity: 'O(1) with quantum computer',
      spaceComplexity: 'O(1)',
      code: `function quantumBogoSort(arr) {
  // Step 1: Create quantum superposition of all permutations
  const superposition = createQuantumSuperposition(arr);
  
  // Step 2: Apply sorting oracle to identify sorted permutation
  const sortedState = applySortingOracle(superposition);
  
  // Step 3: Measure the quantum state to collapse into solution
  const result = measureQuantumState(sortedState);
  
  return result;
}

// Note: Requires quantum computer with O(n!) qubits
// Current implementation limited by classical hardware constraints
function createQuantumSuperposition(arr) {
  // In reality, this would require a quantum computer
  return arr.sort((a, b) => a - b); // Classical fallback
}`,
      steps: []
    }
  }
];
