import { ArrayElement, SortingStep } from '../algorithms';

/**
 * Class that wraps an array and instruments it for visualization.
 * It tracks operations like comparisons and swaps, and records steps for visualization.
 * Methods:
 * - get(index): Get value at index
 * - set(index, value): Set value at index
 * - compare(i, j): Compare elements at indices i and j (returns negative/0/positive like normal compare)
 * - swap(i, j): Swap elements at indices i and j
 * - markSorted(i): Mark element at index i as sorted
 * - length: Get array length
 * - setStepDescription(description): Set description for the next operation
 * 
 * The class records each operation as a step, which can be retrieved via getSteps().
 * Each step includes the current state of the array, indices involved in operations, and a description.
 */
export class InstrumentedArray {
    private array: ArrayElement[];
    private steps: SortingStep[] = [];
    private stepDescription: string = '';

    /**
     * The constructor initializes the instrumented array with the given initial values.
     * @param initialArray - The initial array of numbers to be instrumented
     */
    constructor(initialArray: ArrayElement[]) {
        // Initialize the array with default states
        this.array = [...initialArray.map(el => ({ ...el, state: 'default' as const }))];
        // Record the initial state as the first step
        this.steps.push({
            array: [...this.array],
            description: 'Starting custom algorithm'
        });
    }

    // Method to set description for the next operation
    setStepDescription(description: string) {
        this.stepDescription = description;
    }

    // Get element by index
    get(index: number): number {
        // Bounds check
        if (index < 0 || index >= this.array.length) {
            throw new Error(`Index ${index} out of bounds`);
        }
        return this.array[index].value;
    }

    // Set element by index
    set(index: number, value: number) {
        if (index < 0 || index >= this.array.length) {
            throw new Error(`Index ${index} out of bounds`);
        }
        // Update value and record step
        this.array[index].value = value;
        this.addStep(`Set element at index ${index} to ${value}`);
    }

    // Get array length
    get length(): number {
        return this.array.length;
    }

    // Compare two elements
    compare(i: number, j: number): number {
        if (i < 0 || i >= this.array.length || j < 0 || j >= this.array.length) {
            throw new Error(`Invalid indices: ${i}, ${j}`);
        }

        const compareArray = this.array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === j) ? 'comparing' as const : 'default' as const
        }));

        this.steps.push({
            array: compareArray,
            compareIndices: [i, j],
            description: this.stepDescription || `Comparing elements at positions ${i} and ${j}: ${this.array[i].value} vs ${this.array[j].value}`
        });

        this.stepDescription = '';
        return this.array[i].value - this.array[j].value;
    }

    // Swap two elements (adds visualization step)
    swap(i: number, j: number) {
        if (i < 0 || i >= this.array.length || j < 0 || j >= this.array.length) {
            throw new Error(`Invalid indices: ${i}, ${j}`);
        }

        if (i === j) return; // No need to swap same element

        // Show swapping state
        const swapArray = this.array.map((el, idx) => ({
            ...el,
            state: (idx === i || idx === j) ? 'swapping' as const : 'default' as const
        }));

        this.steps.push({
            array: swapArray,
            swapIndices: [i, j],
            description: this.stepDescription || `Swapping elements at positions ${i} and ${j}: ${this.array[i].value} ↔ ${this.array[j].value}`
        });

        // Perform the actual swap
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];

        // Show result after swap
        this.addStep(`Swapped! Position ${i} now has ${this.array[i].value}, position ${j} now has ${this.array[j].value}`);
    }

    // Mark element as sorted
    markSorted(index: number) {
        if (index < 0 || index >= this.array.length) {
            throw new Error(`Index ${index} out of bounds`);
        }

        this.array[index].state = 'sorted';
        this.steps.push({
            array: [...this.array],
            sortedIndices: [index],
            description: this.stepDescription || `Element at position ${index} (${this.array[index].value}) is now in its final sorted position`
        });

        this.stepDescription = '';
    }

    // Mark range as sorted
    markRangeSorted(start: number, end: number) {
        if (start < 0 || end >= this.array.length || start > end) {
            throw new Error(`Invalid range: ${start} to ${end}`);
        }

        const sortedIndices = [];
        for (let i = start; i <= end; i++) {
            this.array[i].state = 'sorted';
            sortedIndices.push(i);
        }

        this.steps.push({
            array: [...this.array],
            sortedIndices,
            description: this.stepDescription || `Elements from position ${start} to ${end} are now sorted`
        });

        this.stepDescription = '';
    }

    // Add a custom step
    addStep(description?: string) {
        this.steps.push({
            array: [...this.array],
            description: description || this.stepDescription || 'Algorithm step'
        });
        this.stepDescription = '';
    }

    // Get all visualization steps
    getSteps(): SortingStep[] {
        // Add final step marking all as sorted if not already done
        const finalStep = {
            array: this.array.map(el => ({ ...el, state: 'sorted' as const })),
            description: 'Algorithm completed! All elements are sorted.'
        };

        return [...this.steps, finalStep];
    }

    // Get final sorted array values
    getValues(): number[] {
        return this.array.map(el => el.value);
    }

    // Convert to regular JavaScript array for user convenience
    toArray(): number[] {
        return this.getValues();
    }
}

// Function to create instrumented code template
export function createInstrumentedTemplate(): string {
    return `function customSort(instrumentedArray) {
  // instrumentedArray is a special array that tracks visualization steps
  // Use these methods for visualization:
  // - instrumentedArray.get(i) - get value at index i
  // - instrumentedArray.set(i, value) - set value at index i
  // - instrumentedArray.compare(i, j) - compare elements (returns negative/0/positive like normal compare)
  // - instrumentedArray.swap(i, j) - swap two elements
  // - instrumentedArray.markSorted(i) - mark element as sorted
  // - instrumentedArray.length - get array length
  // - instrumentedArray.setStepDescription("description") - set description for next operation

  // Example: Bubble Sort
  const n = instrumentedArray.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (instrumentedArray.compare(j, j + 1) > 0) {
        // Swap if they're in wrong order
        instrumentedArray.swap(j, j + 1);
      }
    }
    // Mark the last element of this iteration as sorted
    instrumentedArray.markSorted(n - 1 - i);
  }
  
  // Mark the first element as sorted too
  instrumentedArray.markSorted(0);
  
  return instrumentedArray;
}`;
}

// Function to create a simple template for users who want basic functionality
export function createSimpleTemplate(): string {
    return `function customSort(arr) {
  // Simple version - just return sorted array
  // This won't show step-by-step visualization
  // Your sorting algorithm here
  
  // Example: Bubble Sort
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`;
}
