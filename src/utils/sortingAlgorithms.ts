import { ArrayElement, SortingStep } from '../types';

/**
 * Class containing various sorting algorithms.
 * Each algorithm returns an array of SortingStep objects,
 * which detail the state of the array at each step for visualization.
 * 
 * Methods:
 * - bubbleSort
 * - selectionSort
 * - insertionSort
 * - quickSort
 * - mergeSort
 * - heapSort
 * - cocktailSort
 * - shellSort
 * - combSort
 * - gnomeSort
 */
export class SortingAlgorithms {
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

          // Perform swap
          [array[j], array[j + 1]] = [array[j + 1], array[j]];

          // Show result after swap
          steps.push({
            array: [...array],
            description: `Swapped! ${array[j].value} is now before ${array[j + 1].value}`
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
        steps.push({
          array: [...array],
          description: `Placed ${temp.value} at position ${j}`
        });
      }
    }

    steps.push({
      array: array.map(el => ({ ...el, state: 'sorted' as const })),
      description: 'Shell Sort complete! All elements are sorted.'
    });

    return steps;
  }

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
}
