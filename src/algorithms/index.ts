/**
 * Algorithm Visualizer - Sorting Algorithms Module
 * 
 * This module provides a comprehensive collection of sorting algorithms
 * organized by category and complexity. It serves as the main entry point
 * for all algorithm-related functionality in the visualization system.
 * 
 * Exported Components:
 * - SortingAlgorithms: Main class with all algorithms (backward compatible)
 * - Individual category classes: EfficientSorts, SimpleSorts, etc.
 * - Type definitions: ArrayElement, SortingStep, etc.
 * 
 * Usage Examples:
 * ```typescript
 * import { SortingAlgorithms } from './algorithms';
 * const steps = SortingAlgorithms.quickSort(elements);
 * 
 * // Or use specific categories:
 * import { EfficientSorts } from './algorithms';
 * const steps = EfficientSorts.quickSort(elements);
 * ```
 */

// Re-export all algorithms from their individual modules
export { SortingAlgorithms, EfficientSorts, SimpleSorts, SpecializedSorts, ImprovedSorts, NoveltySorts } from './SortingAlgorithms';

// Re-export all type definitions
export * from './types';
