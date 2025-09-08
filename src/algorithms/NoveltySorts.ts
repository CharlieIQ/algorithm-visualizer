import { ArrayElement, SortingStep } from './types';

/**
 * Collection of unusual, novelty, and educational sorting algorithms.
 * These algorithms are primarily for entertainment, education, or demonstration
 * of creative (if impractical) approaches to sorting.
 * 
 * ⚠️ Warning: Most of these algorithms are deliberately inefficient!
 * They serve educational purposes and demonstrate interesting concepts,
 * but should never be used in production code.
 * 
 * Categories include:
 * - Algorithms with unusual approaches (Gnome Sort, Pancake Sort)
 * - Deliberately inefficient algorithms (Bogo Sort, Miracle Sort)
 * - Joke algorithms that demonstrate impossibilities (Sleep Sort, Quantum Bogo Sort)
 */
export class NoveltySorts {
    /**
     * Gnome Sort - Like insertion sort but moves elements backward via swaps
     * 
     * Algorithm Overview:
     * 1. Start at the beginning of the array
     * 2. If current element >= previous element, move forward
     * 3. If current element < previous element, swap them and move backward
     * 4. Continue until reaching the end of the array
     * 
     * Time Complexity: O(n²) worst case, O(n) best case
     * Space Complexity: O(1) - sorts in-place
     * Stability: Stable sorting algorithm
     * 
     * Metaphor: Like a garden gnome sorting flower pots - if a pot is out of place,
     * the gnome swaps it with the previous pot and steps back to check again.
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static gnomeSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];
        const n = array.length;

        steps.push({
            array: [...array],
            description: 'Starting Gnome Sort - Like insertion sort but moves element to beginning by swapping'
        });

        let index = 0;

        while (index < n) {
            if (index === 0) {
                index++;
            } else if (array[index].value >= array[index - 1].value) {
                index++;
            } else {
                steps.push({
                    array: array.map((el, idx) => ({
                        ...el,
                        state: (idx === index || idx === index - 1) ? 'swapping' as const : 'default' as const
                    })),
                    description: `Swapping ${array[index].value} and ${array[index - 1].value}`
                });

                [array[index], array[index - 1]] = [array[index - 1], array[index]];
                index--;

                steps.push({
                    array: [...array],
                    description: `Moved element backward, now checking position ${index}`
                });
            }
        }

        steps.push({
            array: array.map(el => ({ ...el, state: 'sorted' as const })),
            description: 'Gnome Sort complete! All elements are sorted.'
        });

        return steps;
    }

    /**
     * Pancake Sort - Sorts by flipping prefixes of the array
     * 
     * Algorithm Overview:
     * 1. Find the largest unsorted element
     * 2. If it's not at the beginning, flip the prefix to move it there
     * 3. Flip the entire unsorted portion to move the largest to its final position
     * 4. Reduce the size of the unsorted portion and repeat
     * 
     * Time Complexity: O(n²) - makes at most 2n flips
     * Space Complexity: O(1) - only flipping operations
     * Stability: Not stable
     * 
     * Metaphor: Like sorting a stack of pancakes using only a spatula to flip
     * the top k pancakes. You can only access the top of the stack!
     * 
     * Real-world application: Actual problem in computational biology (genome rearrangement)
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static pancakeSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];
        const n = array.length;

        steps.push({
            array: [...array],
            description: 'Starting Pancake Sort - Sort by flipping prefixes'
        });

        function flip(k: number): void {
            steps.push({
                array: array.map((el, idx) => ({
                    ...el,
                    state: idx <= k ? 'swapping' as const : 'default' as const
                })),
                description: `Flipping first ${k + 1} elements`
            });

            let left = 0;
            while (left < k) {
                [array[left], array[k]] = [array[k], array[left]];
                left++;
                k--;
            }

            steps.push({
                array: [...array],
                description: 'Flip completed'
            });
        }

        function findMax(n: number): number {
            let maxIdx = 0;
            for (let i = 0; i < n; i++) {
                if (array[i].value > array[maxIdx].value) {
                    maxIdx = i;
                }
            }
            return maxIdx;
        }

        for (let currSize = n; currSize > 1; currSize--) {
            const maxIdx = findMax(currSize);

            steps.push({
                array: array.map((el, idx) => ({
                    ...el,
                    state: idx === maxIdx ? 'comparing' as const : 'default' as const
                })),
                description: `Found maximum ${array[maxIdx].value} at position ${maxIdx}`
            });

            if (maxIdx !== currSize - 1) {
                if (maxIdx !== 0) {
                    flip(maxIdx);
                }
                flip(currSize - 1);
            }

            array[currSize - 1].state = 'sorted';
        }

        array[0].state = 'sorted';
        steps.push({
            array: [...array],
            description: 'Pancake Sort complete! All elements are sorted.'
        });

        return steps;
    }

    /**
     * Bogo Sort - Randomly shuffles until sorted (DO NOT USE IN PRODUCTION!)
     * 
     * Algorithm Overview:
     * 1. Check if the array is sorted
     * 2. If not, randomly shuffle the entire array
     * 3. Repeat until the array happens to be sorted
     * 
     * Time Complexity: O((n+1)!) average case, O(∞) worst case
     * Space Complexity: O(1)
     * Stability: Not stable (random shuffling)
     * 
     * ⚠️ WARNING: This algorithm is deliberately terrible!
     * It's used to demonstrate the worst possible approach to sorting.
     * Expected time to sort 10 elements: ~6 seconds
     * Expected time to sort 11 elements: ~1 minute
     * Expected time to sort 12 elements: ~13 minutes
     * 
     * Also known as: Stupid Sort, Slow Sort, Shotgun Sort
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static bogoSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];

        steps.push({
            array: [...array],
            description: 'Starting Bogo Sort - Randomly shuffle until sorted (THIS IS INEFFICIENT!)'
        });

        function isSorted(): boolean {
            for (let i = 1; i < array.length; i++) {
                if (array[i].value < array[i - 1].value) {
                    return false;
                }
            }
            return true;
        }

        function shuffle(): void {
            steps.push({
                array: [...array],
                description: 'Randomly shuffling array...'
            });

            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            steps.push({
                array: [...array],
                description: 'Shuffle complete, checking if sorted...'
            });
        }

        let attempts = 0;
        while (!isSorted() && attempts < 50) { // Limit attempts to prevent infinite loop
            shuffle();
            attempts++;

            if (attempts >= 50) {
                steps.push({
                    array: [...array],
                    description: 'Bogo Sort stopped after 50 attempts to prevent infinite loop!'
                });
                break;
            }
        }

        if (isSorted()) {
            steps.push({
                array: array.map(el => ({ ...el, state: 'sorted' as const })),
                description: `Bogo Sort complete after ${attempts} attempts! Pure luck!`
            });
        }

        return steps;
    }

    /**
     * Miracle Sort - Waits for a miracle to sort the array
     * 
     * Algorithm Overview:
     * 1. Check if the array is already sorted
     * 2. If yes, declare it a miracle!
     * 3. If no, wait indefinitely for cosmic rays, quantum fluctuations,
     *    or divine intervention to spontaneously sort the array
     * 
     * Time Complexity: O(n) best case, O(∞) expected case
     * Space Complexity: O(1)
     * Stability: Depends on the miracle
     * 
     * 🎭 This is a joke algorithm!
     * It demonstrates the concept that some problems require active intervention.
     * In reality, it will never sort an unsorted array.
     * 
     * Philosophical note: Sometimes used in computer science education to discuss
     * the difference between deterministic and probabilistic algorithms.
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static miracleSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];

        steps.push({
            array: [...array],
            description: 'Starting Miracle Sort - Check if array is sorted, if not, wait for a miracle!'
        });

        function isSorted(): boolean {
            for (let i = 1; i < array.length; i++) {
                if (array[i].value < array[i - 1].value) {
                    return false;
                }
            }
            return true;
        }

        if (isSorted()) {
            steps.push({
                array: array.map(el => ({ ...el, state: 'sorted' as const })),
                description: 'Miracle! The array was already sorted!'
            });
        } else {
            steps.push({
                array: [...array],
                description: 'Array is not sorted. Waiting for a miracle...'
            });

            steps.push({
                array: [...array],
                description: '🙏 Still waiting for a miracle...'
            });

            steps.push({
                array: [...array],
                description: '⏰ Miracle did not occur. Array remains unsorted. Try again later!'
            });
        }

        return steps;
    }

    /**
     * Sleep Sort - Each element "sleeps" for time proportional to its value
     * 
     * Algorithm Overview:
     * 1. For each element, create a timer that expires after (value * unit_time)
     * 2. When a timer expires, add that element to the output array
     * 3. Since smaller values have shorter timers, they wake up first
     * 4. The result is a sorted array!
     * 
     * Time Complexity: O(max(array)) - depends on largest value, not array size!
     * Space Complexity: O(n) for storing timers/promises
     * Stability: Stable (equal values wake up in original order)
     * 
     * 🎭 This is primarily a joke algorithm!
     * It demonstrates parallel processing concepts but is impractical because:
     * - Requires parallel execution (multiple threads/processes)
     * - Time depends on data values, not algorithmic efficiency
     * - Precision issues with timing can cause incorrect results
     * 
     * Note: Our visualization simulates the concept without actual timing.
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static sleepSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];
        const result: ArrayElement[] = [];

        steps.push({
            array: [...array],
            description: 'Starting Sleep Sort - Each element sleeps for time proportional to its value!'
        });

        // Since we can't actually use setTimeout in this context, we'll simulate it
        const sortedElements = [...array].sort((a, b) => a.value - b.value);

        for (let i = 0; i < sortedElements.length; i++) {
            result.push(sortedElements[i]);

            const displayArray = [...result];
            // Pad with empty elements to maintain array size
            while (displayArray.length < array.length) {
                displayArray.push({ value: 0, id: `empty-${displayArray.length}`, state: 'default' });
            }

            steps.push({
                array: displayArray,
                description: `${sortedElements[i].value} woke up after sleeping for ${sortedElements[i].value}ms!`
            });
        }

        // Replace the original array positions
        for (let i = 0; i < result.length; i++) {
            array[i] = { ...result[i], state: 'sorted' };
        }

        steps.push({
            array: [...array],
            description: 'Sleep Sort complete! All elements have awakened in perfect order!'
        });

        return steps;
    }

    /**
     * Quantum Bogo Sort - Uses "quantum superposition" to check all permutations
     * 
     * Algorithm Overview:
     * 1. Create quantum superposition of all possible permutations
     * 2. Apply a "sorting oracle" to identify the sorted state
     * 3. Measure the quantum state to collapse it into the sorted permutation
     * 
     * Time Complexity: O(1) on a quantum computer with infinite qubits
     * Space Complexity: O(n!) qubits needed for superposition
     * Stability: Depends on quantum measurement interpretation
     * 
     * 🎭 This is entirely a joke algorithm!
     * Concepts referenced:
     * - Quantum superposition (being in all states simultaneously)
     * - Quantum measurement (collapsing to a single state)
     * - The theoretical speedup of quantum algorithms
     * 
     * Reality check:
     * - No quantum computer has enough qubits for this approach
     * - Quantum algorithms don't work this way in practice
     * - This is quantum computing satire, not science
     * 
     * Educational value: Introduces quantum computing concepts in a humorous way
     * 
     * @param arr - Array of elements to sort
     * @returns Array of visualization steps
     */
    static quantumBogoSort(arr: ArrayElement[]): SortingStep[] {
        const steps: SortingStep[] = [];
        const array = [...arr];

        steps.push({
            array: [...array],
            description: 'Starting Quantum Bogo Sort - Using quantum superposition to check all permutations!'
        });

        function isSorted(): boolean {
            for (let i = 1; i < array.length; i++) {
                if (array[i].value < array[i - 1].value) {
                    return false;
                }
            }
            return true;
        }

        if (isSorted()) {
            steps.push({
                array: array.map(el => ({ ...el, state: 'sorted' as const })),
                description: 'Quantum measurement successful! Array collapsed into sorted state!'
            });
        } else {
            steps.push({
                array: [...array],
                description: '🌌 Creating quantum superposition of all possible permutations...'
            });

            steps.push({
                array: [...array],
                description: '⚛️  Measuring quantum state...'
            });

            // "Quantum collapse" into sorted state
            const sortedArray = [...array].sort((a, b) => a.value - b.value);
            for (let i = 0; i < array.length; i++) {
                array[i] = { ...sortedArray[i], state: 'sorted' };
            }

            steps.push({
                array: [...array],
                description: '✨ Quantum Bogo Sort complete! Wave function collapsed into the sorted state!'
            });
        }

        return steps;
    }
}
