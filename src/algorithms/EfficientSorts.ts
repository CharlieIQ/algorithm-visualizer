import { ArrayElement, SortingStep } from './types';

/**
 * Collection of efficient sorting algorithms with O(n log n) or better time complexity.
 * These algorithms are suitable for large datasets and production use.
 * 
 * Each method:
 * - Takes an array of ArrayElement objects as input
 * - Returns an array of SortingStep objects for visualization
 * - Maintains immutability by creating copies of the input array
 * - Provides detailed step-by-step descriptions for educational purposes
 */
export class EfficientSorts {
    /**
     * Quick Sort - Divide and conquer algorithm using partitioning
     * 
     * Algorithm Overview:
     * 1. Choose a pivot element (last element in this implementation)
     * 2. Partition array so elements < pivot are on left, elements > pivot on right
     * 3. Recursively apply quick sort to left and right subarrays
     * 
     * Time Complexity: O(n log n) average, O(n²) worst case
     * Space Complexity: O(log n) due to recursion stack
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static quickSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];

        steps.push({
            array: [...array],
            description: 'Starting Quick Sort - Divide and conquer approach'
        });

        function partition(low: number, high: number): number {
            const pivot = array[high];
            let i = low - 1;

            steps.push({
                array: array.map((el, idx) => ({
                    ...el,
                    state: idx === high ? 'comparing' as const : 'default' as const
                })),
                description: `Partitioning: Using ${pivot.value} at position ${high} as pivot`
            });

            for (let j = low; j < high; j++) {
                steps.push({
                    array: array.map((el, idx) => ({
                        ...el,
                        state: idx === j ? 'comparing' as const : idx === high ? 'comparing' as const : 'default' as const
                    })),
                    compareIndices: [j, high],
                    description: `Comparing ${array[j].value} with pivot ${pivot.value}`
                });

                if (array[j].value < pivot.value) {
                    i++;
                    if (i !== j) {
                        steps.push({
                            array: array.map((el, idx) => ({
                                ...el,
                                state: (idx === i || idx === j) ? 'swapping' as const : 'default' as const
                            })),
                            swapIndices: [i, j],
                            description: `Swapping ${array[i].value} and ${array[j].value}`
                        });
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                }
            }

            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            steps.push({
                array: [...array],
                description: `Pivot ${pivot.value} is now in its correct position at index ${i + 1}`
            });

            return i + 1;
        }

        function quickSortRecursive(low: number, high: number): void {
            if (low < high) {
                const pi = partition(low, high);
                quickSortRecursive(low, pi - 1);
                quickSortRecursive(pi + 1, high);
            }
        }

        quickSortRecursive(0, array.length - 1);

        steps.push({
            array: array.map(el => ({ ...el, state: 'sorted' as const })),
            description: 'Quick Sort complete! All elements are sorted.'
        });

        return steps;
    }

    /**
     * Merge Sort - Stable divide and conquer algorithm
     * 
     * Algorithm Overview:
     * 1. Divide array into two halves until subarrays have 1 element
     * 2. Merge the subarrays back together in sorted order
     * 3. Continue merging until the entire array is reconstructed
     * 
     * Time Complexity: O(n log n) in all cases (best, average, worst)
     * Space Complexity: O(n) for temporary arrays during merging
     * Stability: Stable (maintains relative order of equal elements)
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static mergeSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];

        steps.push({
            array: [...array],
            description: 'Starting Merge Sort - Divide and conquer with merging'
        });

        function merge(left: number, mid: number, right: number): void {
            const leftArr = array.slice(left, mid + 1);
            const rightArr = array.slice(mid + 1, right + 1);

            steps.push({
                array: [...array],
                description: `Merging subarrays: [${left}..${mid}] and [${mid + 1}..${right}]`
            });

            let i = 0, j = 0, k = left;

            while (i < leftArr.length && j < rightArr.length) {
                steps.push({
                    array: array.map((el, idx) => ({
                        ...el,
                        state: (idx === k) ? 'comparing' as const : 'default' as const
                    })),
                    description: `Comparing ${leftArr[i].value} and ${rightArr[j].value}`
                });

                if (leftArr[i].value <= rightArr[j].value) {
                    array[k] = leftArr[i];
                    i++;
                } else {
                    array[k] = rightArr[j];
                    j++;
                }
                k++;
            }

            while (i < leftArr.length) {
                array[k] = leftArr[i];
                i++;
                k++;
            }

            while (j < rightArr.length) {
                array[k] = rightArr[j];
                j++;
                k++;
            }

            steps.push({
                array: [...array],
                description: `Merged subarrays from position ${left} to ${right}`
            });
        }

        function mergeSortRecursive(left: number, right: number): void {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                mergeSortRecursive(left, mid);
                mergeSortRecursive(mid + 1, right);
                merge(left, mid, right);
            }
        }

        mergeSortRecursive(0, array.length - 1);

        steps.push({
            array: array.map(el => ({ ...el, state: 'sorted' as const })),
            description: 'Merge Sort complete! All elements are sorted.'
        });

        return steps;
    }

    /**
     * Heap Sort - Uses binary heap data structure for sorting
     * 
     * Algorithm Overview:
     * 1. Build a max heap from the input array
     * 2. Repeatedly extract the maximum element (root) and place it at the end
     * 3. Re-heapify the remaining elements
     * 4. Continue until all elements are sorted
     * 
     * Time Complexity: O(n log n) in all cases
     * Space Complexity: O(1) - sorts in-place
     * Stability: Not stable (may change relative order of equal elements)
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static heapSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];
        const n = array.length;

        steps.push({
            array: [...array],
            description: 'Starting Heap Sort - Build max heap then extract elements'
        });

        function heapify(n: number, i: number): void {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && array[left].value > array[largest].value) {
                largest = left;
            }

            if (right < n && array[right].value > array[largest].value) {
                largest = right;
            }

            if (largest !== i) {
                steps.push({
                    array: array.map((el, idx) => ({
                        ...el,
                        state: (idx === i || idx === largest) ? 'swapping' as const : 'default' as const
                    })),
                    description: `Heapifying: Swapping ${array[i].value} with ${array[largest].value}`
                });

                [array[i], array[largest]] = [array[largest], array[i]];
                heapify(n, largest);
            }
        }

        // Build heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(n, i);
        }

        steps.push({
            array: [...array],
            description: 'Max heap built successfully'
        });

        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            steps.push({
                array: array.map((el, idx) => ({
                    ...el,
                    state: (idx === 0 || idx === i) ? 'swapping' as const : 'default' as const
                })),
                description: `Moving max element ${array[0].value} to position ${i}`
            });

            [array[0], array[i]] = [array[i], array[0]];
            array[i].state = 'sorted';

            steps.push({
                array: [...array],
                description: `Element ${array[i].value} is now in its final position`
            });

            heapify(i, 0);
        }

        array[0].state = 'sorted';
        steps.push({
            array: [...array],
            description: 'Heap Sort complete! All elements are sorted.'
        });

        return steps;
    }

    /**
     * Tim Sort - Hybrid stable sorting algorithm (used in Python and Java)
     * 
     * Algorithm Overview:
     * 1. Divide array into small runs and sort them with insertion sort
     * 2. Merge runs using a sophisticated merging strategy
     * 3. Takes advantage of existing order in data
     * 4. Optimized for real-world data patterns
     * 
     * Time Complexity: O(n) best case, O(n log n) average/worst case
     * Space Complexity: O(n) for temporary storage during merging
     * Stability: Stable sorting algorithm
     * 
     * Note: This is a simplified version. Real TimSort is much more complex.
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static timSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];
        const n = array.length;
        const MIN_MERGE = 32;

        steps.push({
            array: [...array],
            description: 'Starting Tim Sort - Hybrid stable sort combining merge sort and insertion sort'
        });

        function insertionSort(left: number, right: number): void {
            for (let i = left + 1; i <= right; i++) {
                const keyItem = array[i];
                let j = i - 1;

                while (j >= left && array[j].value > keyItem.value) {
                    steps.push({
                        array: array.map((el, idx) => ({
                            ...el,
                            state: (idx === j || idx === j + 1) ? 'swapping' as const : 'default' as const
                        })),
                        description: `Moving ${array[j].value} one position right`
                    });

                    array[j + 1] = array[j];
                    j--;
                }

                array[j + 1] = keyItem;
            }
        }

        function merge(left: number, mid: number, right: number): void {
            const leftPart = array.slice(left, mid + 1);
            const rightPart = array.slice(mid + 1, right + 1);

            let i = 0, j = 0, k = left;

            while (i < leftPart.length && j < rightPart.length) {
                if (leftPart[i].value <= rightPart[j].value) {
                    array[k] = leftPart[i];
                    i++;
                } else {
                    array[k] = rightPart[j];
                    j++;
                }
                k++;
            }

            while (i < leftPart.length) {
                array[k] = leftPart[i];
                i++;
                k++;
            }

            while (j < rightPart.length) {
                array[k] = rightPart[j];
                j++;
                k++;
            }

            steps.push({
                array: [...array],
                description: `Merged runs from ${left} to ${right}`
            });
        }

        // Sort individual subarrays of size MIN_MERGE using insertion sort
        for (let i = 0; i < n; i += MIN_MERGE) {
            const right = Math.min(i + MIN_MERGE - 1, n - 1);
            insertionSort(i, right);
        }

        // Start merging from size MIN_MERGE
        let size = MIN_MERGE;
        while (size < n) {
            for (let start = 0; start < n; start += size * 2) {
                const mid = start + size - 1;
                const end = Math.min(start + size * 2 - 1, n - 1);

                if (mid < end) {
                    merge(start, mid, end);
                }
            }
            size *= 2;
        }

        steps.push({
            array: array.map(el => ({ ...el, state: 'sorted' as const })),
            description: 'Tim Sort complete! Hybrid approach achieved optimal performance.'
        });

        return steps;
    }
}
