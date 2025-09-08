import { EfficientSorts } from './EfficientSorts';
import { SimpleSorts } from './SimpleSorts';
import { SpecializedSorts } from './SpecializedSorts';
import { ImprovedSorts } from './ImprovedSorts';
import { NoveltySorts } from './NoveltySorts';

/**
 * Main aggregator class that provides access to all sorting algorithms.
 * 
 * This class serves as the primary interface for the Algorithm Visualizer,
 * consolidating all sorting algorithms from different categories into a
 * single, easy-to-use API. It maintains backward compatibility with the
 * original monolithic structure while benefiting from the new modular organization.
 * 
 * Architecture Benefits:
 * - Modular organization by algorithm category
 * - Easy to add new algorithms or categories
 * - Improved code maintainability and readability
 * - Clear separation of concerns
 * - Backward compatibility with existing code
 * 
 * Usage:
 * ```typescript
 * import { SortingAlgorithms } from './algorithms';
 * const steps = SortingAlgorithms.quickSort(arrayElements);
 * ```
 * 
 * For direct access to categories:
 * ```typescript
 * import { EfficientSorts, SimpleSorts } from './algorithms';
 * const steps1 = EfficientSorts.quickSort(arrayElements);
 * const steps2 = SimpleSorts.bubbleSort(arrayElements);
 * ```
 */
export class SortingAlgorithms {
  // ===== EFFICIENT ALGORITHMS (O(n log n) or better) =====
  /** Quick Sort - Fast divide-and-conquer algorithm with partitioning */
  /** Quick Sort - Fast divide-and-conquer algorithm with partitioning */
  static quickSort = EfficientSorts.quickSort;
  /** Merge Sort - Stable divide-and-conquer algorithm with guaranteed O(n log n) */
  static mergeSort = EfficientSorts.mergeSort;
  /** Heap Sort - Uses binary heap structure, sorts in-place with O(n log n) */
  static heapSort = EfficientSorts.heapSort;
  /** Tim Sort - Hybrid algorithm used in Python and Java, optimized for real-world data */
  static timSort = EfficientSorts.timSort;

  // ===== SIMPLE ALGORITHMS (O(n²) but educational) =====
  /** Bubble Sort - Repeatedly swaps adjacent elements, easiest to understand */
  static bubbleSort = SimpleSorts.bubbleSort;
  /** Selection Sort - Repeatedly finds minimum and places at beginning */
  static selectionSort = SimpleSorts.selectionSort;
  /** Insertion Sort - Builds sorted array one element at a time, efficient for small arrays */
  static insertionSort = SimpleSorts.insertionSort;

  // ===== SPECIALIZED ALGORITHMS (Non-comparison based) =====
  /** Counting Sort - Linear time for integers with limited range */
  static countingSort = SpecializedSorts.countingSort;
  /** Radix Sort - Sorts by individual digits, good for multi-digit numbers */
  static radixSort = SpecializedSorts.radixSort;
  /** Bucket Sort - Distributes elements into buckets, efficient for uniform distributions */
  static bucketSort = SpecializedSorts.bucketSort;

  // ===== IMPROVED ALGORITHMS (Enhanced versions of basic sorts) =====
  /** Shell Sort - Insertion sort with gaps, better than O(n²) */
  static shellSort = ImprovedSorts.shellSort;
  /** Comb Sort - Bubble sort with shrinking gaps, eliminates "turtles" */
  static combSort = ImprovedSorts.combSort;
  /** Cocktail Sort - Bidirectional bubble sort, slightly more efficient */
  static cocktailSort = ImprovedSorts.cocktailSort;

  // ===== NOVELTY/EDUCATIONAL ALGORITHMS (For learning and fun) =====
  /** Gnome Sort - Like insertion sort but with backward movement */
  static gnomeSort = NoveltySorts.gnomeSort;
  /** Pancake Sort - Sorts by flipping prefixes, real problem in bioinformatics */
  static pancakeSort = NoveltySorts.pancakeSort;
  /** Bogo Sort - Randomly shuffles until sorted, worst possible algorithm! */
  static bogoSort = NoveltySorts.bogoSort;
  /** Miracle Sort - Waits for cosmic intervention, demonstrates impossibility */
  static miracleSort = NoveltySorts.miracleSort;
  /** Sleep Sort - Elements "sleep" then wake up in order, parallel processing concept */
  static sleepSort = NoveltySorts.sleepSort;
  /** Quantum Bogo Sort - Satirical "quantum" algorithm, educational quantum computing intro */
  static quantumBogoSort = NoveltySorts.quantumBogoSort;
}

/**
 * Individual algorithm category classes for direct access and better organization.
 * 
 * These classes can be imported individually when you only need algorithms
 * from a specific category, reducing bundle size and improving code organization.
 * 
 * Example usage:
 * ```typescript
 * import { EfficientSorts } from './algorithms';
 * // Only imports efficient algorithms, not the entire library
 * ```
 */
export { EfficientSorts, SimpleSorts, SpecializedSorts, ImprovedSorts, NoveltySorts };
