import { ArrayElement, SortingStep } from './types';

/**
 * Collection of simple sorting algorithms with O(n²) time complexity.
 * These algorithms are easy to understand and implement, making them excellent
 * for educational purposes and small datasets.
 * 
 * Characteristics:
 * - Simple logic and implementation
 * - Good for learning sorting concepts
 * - Inefficient for large datasets
 * - Most work in-place with O(1) space complexity
 */
export class SimpleSorts {
  /**
   * Bubble Sort - Repeatedly swaps adjacent elements if they're in wrong order
   * 
   * Algorithm Overview:
   * 1. Compare adjacent elements from left to right
   * 2. Swap them if they're in the wrong order
   * 3. Repeat until no swaps are needed
   * 4. After each pass, the largest element "bubbles up" to its correct position
   * 
   * Time Complexity: O(n²) average/worst case, O(n) best case (already sorted)
   * Space Complexity: O(1) - sorts in-place
   * Stability: Stable (maintains relative order of equal elements)
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static bubbleSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Bubble Sort - Compare adjacent elements and swap if needed'
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        const compareArray = array.map((el, idx) => ({
          ...el,
          state: (idx === j || idx === j + 1) ? 'comparing' as const : 'default' as const
        }));

        steps.push({
          array: compareArray,
          compareIndices: [j, j + 1],
          description: `Comparing elements at positions ${j} and ${j + 1}: ${array[j].value} vs ${array[j + 1].value}`
        });

        if (array[j].value > array[j + 1].value) {
          // Swapping step
          const swapArray = array.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'swapping' as const : 'default' as const
          }));

          steps.push({
            array: swapArray,
            swapIndices: [j, j + 1],
            description: `Swapping ${array[j].value} and ${array[j + 1].value}`
          });

          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          steps.push({
            array: [...array],
            description: `After swap: ${array[j].value} and ${array[j + 1].value}`
          });
        }
      }

      // Mark the last element as sorted
      array[n - 1 - i].state = 'sorted';
      steps.push({
        array: [...array],
        sortedIndices: [n - 1 - i],
        description: `Element at position ${n - 1 - i} (${array[n - 1 - i].value}) is now in its final sorted position`
      });
    }

    // Mark first element as sorted too
    array[0].state = 'sorted';
    steps.push({
      array: [...array],
      description: 'Bubble Sort complete! All elements are sorted.'
    });

    return steps;
  }

  /**
   * Selection Sort - Repeatedly finds minimum element and places it at beginning
   * 
   * Algorithm Overview:
   * 1. Find the minimum element in the unsorted portion
   * 2. Swap it with the first element of unsorted portion
   * 3. Move the boundary of sorted/unsorted portions one position right
   * 4. Repeat until entire array is sorted
   * 
   * Time Complexity: O(n²) in all cases (always makes n² comparisons)
   * Space Complexity: O(1) - sorts in-place
   * Stability: Not stable in typical implementation
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static selectionSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Selection Sort - Find minimum element and place it at the beginning'
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' as const : 'default' as const
        })),
        description: `Finding minimum element from position ${i} to ${n - 1}`
      });

      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === minIdx) ? 'comparing' as const : 'default' as const
          })),
          description: `Comparing ${array[j].value} with current minimum ${array[minIdx].value}`
        });

        if (array[j].value < array[minIdx].value) {
          minIdx = j;
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: idx === minIdx ? 'comparing' as const : 'default' as const
            })),
            description: `New minimum found: ${array[minIdx].value} at position ${minIdx}`
          });
        }
      }

      if (minIdx !== i) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === minIdx) ? 'swapping' as const : 'default' as const
          })),
          description: `Swapping ${array[i].value} with minimum ${array[minIdx].value}`
        });

        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }

      array[i].state = 'sorted';
      steps.push({
        array: [...array],
        description: `Position ${i} is now sorted with value ${array[i].value}`
      });
    }

    array[n - 1].state = 'sorted';
    steps.push({
      array: [...array],
      description: 'Selection Sort complete! All elements are sorted.'
    });

    return steps;
  }

  /**
   * Insertion Sort - Builds sorted array one element at a time
   * 
   * Algorithm Overview:
   * 1. Start with the second element (assume first is sorted)
   * 2. Compare current element with elements in sorted portion
   * 3. Shift larger elements one position right
   * 4. Insert current element in its correct position
   * 5. Repeat for all elements
   * 
   * Time Complexity: O(n²) average/worst case, O(n) best case
   * Space Complexity: O(1) - sorts in-place
   * Stability: Stable sorting algorithm
   * 
   * Note: Very efficient for small datasets and nearly sorted arrays
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static insertionSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Insertion Sort - Insert each element into its correct position'
    });

    for (let i = 1; i < n; i++) {
      const key = array[i];
      let j = i - 1;

      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' as const : 'default' as const
        })),
        description: `Inserting ${key.value} into sorted portion`
      });

      while (j >= 0 && array[j].value > key.value) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === j || idx === j + 1) ? 'swapping' as const : 'default' as const
          })),
          description: `Moving ${array[j].value} one position right`
        });

        array[j + 1] = array[j];
        j--;

        steps.push({
          array: [...array],
          description: `Shifted elements to make room for ${key.value}`
        });
      }

      array[j + 1] = key;
      steps.push({
        array: [...array],
        description: `Inserted ${key.value} at position ${j + 1}`
      });
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Insertion Sort complete! All elements are sorted.'
    });

    return steps;
  }
}
