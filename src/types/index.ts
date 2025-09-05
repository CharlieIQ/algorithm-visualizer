export interface ArrayElement {
  value: number;
  id: string;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export interface SortingStep {
  array: ArrayElement[];
  compareIndices?: number[];
  swapIndices?: number[];
  sortedIndices?: number[];
  description: string;
}

export interface SortingAlgorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  steps: SortingStep[];
}

export interface AlgorithmPreset {
  id: string;
  name: string;
  category: 'sorting' | 'searching' | 'pathfinding';
  algorithm: SortingAlgorithm;
}
