import { ArrayElement, SortingStep } from './types';

/**
 * Collection of specialized non-comparison sorting algorithms.
 * These algorithms don't rely on element comparisons but instead use
 * mathematical properties of the data to achieve better time complexity.
 * 
 * Characteristics:
 * - Can achieve linear time complexity O(n) under certain conditions
 * - Require additional memory proportional to data range or number of elements
 * - Work best with specific types of data (integers, limited range, etc.)
 * - Not general-purpose but very efficient for appropriate use cases
 */
export class SpecializedSorts {
  /**
   * Counting Sort - Non-comparison sort using frequency counting
   * 
   * Algorithm Overview:
   * 1. Count the frequency of each distinct element
   * 2. Calculate cumulative counts to determine final positions
   * 3. Place elements in output array based on their counts
   * 4. Copy sorted elements back to original array
   * 
   * Time Complexity: O(n + k) where k is the range of input values
   * Space Complexity: O(k) for counting array
   * Stability: Stable when implemented correctly
   * 
   * Best for: Integer arrays with small range of values
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static countingSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Counting Sort - Non-comparison sort using frequency counting'
    });

    // Find the maximum value to determine range
    const maxVal = Math.max(...array.map(el => el.value));
    const minVal = Math.min(...array.map(el => el.value));
    const range = maxVal - minVal + 1;

    steps.push({
      array: [...array],
      description: `Range determined: ${minVal} to ${maxVal} (${range} values)`
    });

    // Create count array
    const count = new Array(range).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
      count[array[i].value - minVal]++;
      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' as const : 'default' as const
        })),
        description: `Counting occurrences of ${array[i].value}`
      });
    }

    // Transform count array to store actual positions
    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    const output = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
      const value = array[i].value;
      output[count[value - minVal] - 1] = { ...array[i] };
      count[value - minVal]--;
    }

    // Copy back to original array
    for (let i = 0; i < n; i++) {
      array[i] = output[i];
      steps.push({
        array: [...array],
        description: `Placing ${array[i].value} in its final position`
      });
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Counting Sort complete! Non-comparison sorting achieved linear time.'
    });

    return steps;
  }

  /**
   * Radix Sort - Sorts by individual digits from least to most significant
   * 
   * Algorithm Overview:
   * 1. Find the maximum number to determine number of digits
   * 2. For each digit position (units, tens, hundreds, etc.):
   *    - Use counting sort to sort by that digit
   *    - Maintain stability to preserve order from previous iterations
   * 3. After processing all digit positions, array is fully sorted
   * 
   * Time Complexity: O(d × (n + k)) where d is number of digits, k is base (10)
   * Space Complexity: O(n + k) for temporary arrays
   * Stability: Stable sorting algorithm
   * 
   * Best for: Integer arrays, especially with many digits
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static radixSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    steps.push({
      array: [...array],
      description: 'Starting Radix Sort - Sort by individual digits from least to most significant'
    });

    function getMax(): number {
      return Math.max(...array.map(el => el.value));
    }

    function countingSortByDigit(exp: number): void {
      const output = new Array(n);
      const count = new Array(10).fill(0);

      steps.push({
        array: [...array],
        description: `Sorting by digit at position ${Math.log10(exp)} (divider: ${exp})`
      });

      // Count occurrences of digits
      for (let i = 0; i < n; i++) {
        const digit = Math.floor(array[i].value / exp) % 10;
        count[digit]++;
      }

      // Change count to store actual positions
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      // Build output array
      for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(array[i].value / exp) % 10;
        output[count[digit] - 1] = { ...array[i] };
        count[digit]--;
      }

      // Copy back
      for (let i = 0; i < n; i++) {
        array[i] = output[i];
      }

      steps.push({
        array: [...array],
        description: `Sorted by digit at position ${Math.log10(exp)}`
      });
    }

    const maxVal = getMax();
    for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
      countingSortByDigit(exp);
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Radix Sort complete! Sorted all digits from least to most significant.'
    });

    return steps;
  }

  /**
   * Bucket Sort - Distributes elements into buckets then sorts each bucket
   * 
   * Algorithm Overview:
   * 1. Create a number of empty buckets (usually √n buckets)
   * 2. Distribute input elements into buckets based on their values
   * 3. Sort individual buckets (using insertion sort or recursively)
   * 4. Concatenate all sorted buckets to get final result
   * 
   * Time Complexity: O(n + k) average case, O(n²) worst case
   * Space Complexity: O(n + k) where k is number of buckets
   * Stability: Can be stable depending on bucket sorting method
   * 
   * Best for: Uniformly distributed data over a known range
   * 
   * @param arr - Array of elements to sort
   * @returns Array of visualization steps
   */
  static bucketSort(arr: ArrayElement[]): SortingStep[] {
    const steps: SortingStep[] = [];
    const array = [...arr];
    const n = array.length;

    if (n <= 1) {
      steps.push({
        array: array.map(el => ({ ...el, state: 'sorted' as const })),
        description: 'Bucket Sort complete! Array already sorted (1 or fewer elements).'
      });
      return steps;
    }

    steps.push({
      array: [...array],
      description: 'Starting Bucket Sort - Distribute elements into buckets then sort each bucket'
    });

    // Find max and min values
    const maxVal = Math.max(...array.map(el => el.value));
    const minVal = Math.min(...array.map(el => el.value));
    const bucketCount = Math.floor(Math.sqrt(n));
    const bucketSize = (maxVal - minVal + 1) / bucketCount;

    steps.push({
      array: [...array],
      description: `Creating ${bucketCount} buckets with size ${bucketSize.toFixed(2)}`
    });

    // Create buckets
    const buckets: ArrayElement[][] = Array(bucketCount).fill(null).map(() => []);

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.min(Math.floor((array[i].value - minVal) / bucketSize), bucketCount - 1);
      buckets[bucketIndex].push({ ...array[i] });

      steps.push({
        array: array.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' as const : 'default' as const
        })),
        description: `Placing ${array[i].value} into bucket ${bucketIndex}`
      });
    }

    // Sort individual buckets and concatenate
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
      if (buckets[i].length > 0) {
        // Simple insertion sort for each bucket
        const bucket = buckets[i];
        for (let j = 1; j < bucket.length; j++) {
          const key = bucket[j];
          let k = j - 1;
          while (k >= 0 && bucket[k].value > key.value) {
            bucket[k + 1] = bucket[k];
            k--;
          }
          bucket[k + 1] = key;
        }

        // Place sorted bucket back into array
        for (let j = 0; j < bucket.length; j++) {
          array[index] = bucket[j];
          index++;
        }

        steps.push({
          array: [...array],
          description: `Sorted and placed bucket ${i} back into array`
        });
      }
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Bucket Sort complete! All buckets sorted and concatenated.'
    });

    return steps;
  }
}
