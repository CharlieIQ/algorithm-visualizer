import { ArrayElement, SortingStep } from './types';

/**
 * Collection of improved versions of basic sorting algorithms.
 * These algorithms enhance simple sorting methods with clever optimizations
 * to achieve better performance while maintaining understandable logic.
 * 
 * Characteristics:
 * - Build upon simple sorting concepts with optimizations
 * - Better performance than basic O(n²) algorithms
 * - Still relatively easy to understand and implement
 * - Good middle ground between simple and complex algorithms
 */
export class ImprovedSorts {
  /**
   * Shell Sort - Generalization of insertion sort with gap sequences
   * 
   * Algorithm Overview:
   * 1. Start with a large gap between compared elements
   * 2. Perform insertion sort on elements separated by this gap
   * 3. Gradually reduce the gap size
   * 4. Final pass with gap=1 is regular insertion sort
   * 5. Earlier passes with larger gaps move elements closer to final positions
   * 
   * Time Complexity: Depends on gap sequence - O(n^1.25) to O(n²)
   * Space Complexity: O(1) - sorts in-place
   * Stability: Not stable (gaps can cause equal elements to be reordered)
   * 
   * Invented by: Donald Shell (1959)
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static shellSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Shell Sort - Insertion sort with gap sequence'
    });

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      steps.push({
        array: [...array],
        description: `Using gap size: ${gap}`
      });

      for (let i = gap; i < n; i++) {
        const temp = array[i];
        let j = i;

        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: idx === i ? 'comparing' as const : 'default' as const
          })),
          description: `Comparing elements ${gap} positions apart`
        });

        while (j >= gap && array[j - gap].value > temp.value) {
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: (idx === j || idx === j - gap) ? 'swapping' as const : 'default' as const
            })),
            description: `Moving ${array[j - gap].value} forward by gap ${gap}`
          });

          array[j] = array[j - gap];
          j -= gap;
        }

        array[j] = temp;
      }
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Shell Sort complete! All elements are sorted.'
    });

    return steps;
  }

  /**
   * Comb Sort - Improvement over bubble sort with shrinking gaps
   * 
   * Algorithm Overview:
   * 1. Start with a large gap (usually array length)
   * 2. Compare and swap elements separated by this gap
   * 3. Shrink gap by dividing by shrink factor (typically 1.3)
   * 4. Continue until gap becomes 1
   * 5. Perform final passes with gap=1 (like bubble sort)
   * 
   * Time Complexity: O(n²) worst case, O(n log n) average case
   * Space Complexity: O(1) - sorts in-place
   * Stability: Not stable
   * 
   * Key insight: Eliminates "turtles" (small values near the end)
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static combSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Comb Sort - Bubble sort with shrinking gap'
    });

    let gap = n;
    let swapped = true;

    while (gap !== 1 || swapped) {
      gap = Math.floor(gap / 1.3);
      if (gap < 1) gap = 1;

      steps.push({
        array: [...array],
        description: `Using gap size: ${gap}`
      });

      swapped = false;

      for (let i = 0; i < n - gap; i++) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === i + gap) ? 'comparing' as const : 'default' as const
          })),
          description: `Comparing elements ${gap} positions apart: ${array[i].value} vs ${array[i + gap].value}`
        });

        if (array[i].value > array[i + gap].value) {
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: (idx === i || idx === i + gap) ? 'swapping' as const : 'default' as const
            })),
            description: `Swapping ${array[i].value} and ${array[i + gap].value}`
          });

          [array[i], array[i + gap]] = [array[i + gap], array[i]];
          swapped = true;
        }
      }
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Comb Sort complete! All elements are sorted.'
    });

    return steps;
  }

  /**
   * Cocktail Sort (Bidirectional Bubble Sort) - Bubble sort in both directions
   * 
   * Algorithm Overview:
   * 1. Perform a forward pass (left to right) like bubble sort
   * 2. Perform a backward pass (right to left)
   * 3. Alternate between forward and backward passes
   * 4. Each pass moves the largest remaining element to its position
   * 5. Each backward pass moves the smallest remaining element to its position
   * 
   * Time Complexity: O(n²) in worst/average case, O(n) best case
   * Space Complexity: O(1) - sorts in-place
   * Stability: Stable sorting algorithm
   * 
   * Also known as: Shaker Sort, Ripple Sort
   * Advantage: Slightly better than bubble sort for partially sorted arrays
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static cocktailSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Cocktail Sort - Bidirectional bubble sort'
    });

    let left = 0;
    let right = n - 1;
    let swapped = true;

    while (swapped) {
      swapped = false;

      // Left to right pass
      for (let i = left; i < right; i++) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === i + 1) ? 'comparing' as const : 'default' as const
          })),
          description: `Forward pass: Comparing ${array[i].value} and ${array[i + 1].value}`
        });

        if (array[i].value > array[i + 1].value) {
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: (idx === i || idx === i + 1) ? 'swapping' as const : 'default' as const
            })),
            description: `Swapping ${array[i].value} and ${array[i + 1].value}`
          });

          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }

      array[right].state = 'sorted';
      right--;

      if (!swapped) break;

      swapped = false;

      // Right to left pass
      for (let i = right; i > left; i--) {
        steps.push({
          array: array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === i - 1) ? 'comparing' as const : 'default' as const
          })),
          description: `Backward pass: Comparing ${array[i].value} and ${array[i - 1].value}`
        });

        if (array[i].value < array[i - 1].value) {
          steps.push({
            array: array.map((el, idx) => ({
              ...el,
              state: (idx === i || idx === i - 1) ? 'swapping' as const : 'default' as const
            })),
            description: `Swapping ${array[i].value} and ${array[i - 1].value}`
          });

          [array[i], array[i - 1]] = [array[i - 1], array[i]];
          swapped = true;
        }
      }

      array[left].state = 'sorted';
      left++;
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Cocktail Sort complete! All elements are sorted.'
    });

    return steps;
  }
}
