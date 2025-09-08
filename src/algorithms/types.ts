/**
 * Core type definitions for the Algorithm Visualizer
 * 
 * This module defines the fundamental data structures used throughout
 * the visualization system. These types ensure type safety and provide
 * clear contracts between different parts of the application.
 */

/**
 * Represents a single element in the array being sorted.
 * Each element contains its value, unique identifier, and current visual state.
 */
export interface ArrayElement {
    /** The numeric value of the element */
    value: number;
    /** Unique identifier for React rendering and element tracking */
    id: string;
    /** Current visual state for animation and highlighting */
    state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

/**
 * Represents a single step in the sorting algorithm visualization.
 * Each step captures the state of the array and provides context about the operation.
 */
export interface SortingStep {
    /** Snapshot of the entire array at this step */
    array: ArrayElement[];
    /** Indices of elements being compared (optional, for highlighting) */
    compareIndices?: number[];
    /** Indices of elements being swapped (optional, for highlighting) */
    swapIndices?: number[];
    /** Indices of elements that are now in their final sorted position */
    sortedIndices?: number[];
    /** Human-readable description of what's happening in this step */
    description: string;
}

/**
 * Complete definition of a sorting algorithm including metadata and implementation.
 * This interface defines everything needed to display and execute an algorithm.
 */
export interface SortingAlgorithm {
    /** Display name of the algorithm */
    name: string;
    /** Detailed explanation of how the algorithm works */
    description: string;
    /** Big O notation for time complexity (e.g., "O(n log n)") */
    timeComplexity: string;
    /** Big O notation for space complexity (e.g., "O(1)") */
    spaceComplexity: string;
    /** Source code of the algorithm as a formatted string */
    code: string;
    /** Array of steps generated during algorithm execution (populated at runtime) */
    steps: SortingStep[];
}

/**
 * A preset configuration that combines algorithm metadata with categorization.
 * Presets are used to populate the algorithm selector and provide quick access
 * to predefined algorithms with their descriptions and implementations.
 */
export interface AlgorithmPreset {
    /** Unique identifier for the preset (used in routing and selection) */
    id: string;
    /** User-friendly display name */
    name: string;
    /** Category for organization and filtering in the UI */
    category: 'sorting' | 'searching' | 'pathfinding';
    /** Complete algorithm definition */
    algorithm: SortingAlgorithm;
}
