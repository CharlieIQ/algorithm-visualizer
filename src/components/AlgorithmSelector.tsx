import React, { useState, useMemo } from 'react';
import {
    FiSearch,
    FiZap,
    FiBook,
    FiTool,
    FiStar,
    FiClock,
    FiHardDrive,
    FiInfo
} from 'react-icons/fi';
import { AlgorithmPreset } from '../types';

// Props for the AlgorithmSelector component
interface AlgorithmSelectorProps {
    presets: AlgorithmPreset[];
    selectedAlgorithm: string | null;
    onSelectAlgorithm: (algorithmId: string) => void;
    onShowCode: (algorithm: AlgorithmPreset) => void;
    onShowInfo: (algorithm: AlgorithmPreset) => void;
}

/**
 * The AlgorithmSelector component provides a searchable and filterable list of algorithm presets.
 * @param param0 - Component props
 * @returns The AlgorithmSelector component
 */
const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
    presets,
    selectedAlgorithm,
    onSelectAlgorithm,
    onShowCode,
    onShowInfo
}) => {
    // State for search query and selected category
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'efficient' | 'simple' | 'improved' | 'unusual'>('all');

    // Categorize algorithms
    const algorithmCategories = useMemo(() => {
        // Define categories based on preset IDs
        const efficient = ['quick-sort', 'merge-sort', 'heap-sort'];
        const simple = ['bubble-sort', 'selection-sort', 'insertion-sort'];
        const improved = ['shell-sort', 'comb-sort', 'cocktail-sort'];
        const unusual = ['gnome-sort', 'pancake-sort', 'bogo-sort'];

        return {
            efficient: presets.filter(p => efficient.includes(p.id)),
            simple: presets.filter(p => simple.includes(p.id)),
            improved: presets.filter(p => improved.includes(p.id)),
            unusual: presets.filter(p => unusual.includes(p.id))
        };
    }, [presets]);

    // Filter algorithms based on search and category
    const filteredAlgorithms = useMemo(() => {
        let filtered = presets;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = algorithmCategories[selectedCategory];
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(preset =>
                preset.algorithm.name.toLowerCase().includes(query) ||
                preset.algorithm.description.toLowerCase().includes(query) ||
                preset.algorithm.timeComplexity.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [presets, searchQuery, selectedCategory, algorithmCategories]);

    // Helper to get color based on time complexity
    const getComplexityColor = (complexity: string) => {
        if (complexity.includes('n log n')) return 'text-green-400';
        if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-yellow-400';
        if (complexity.includes('∞') || complexity.includes('!')) return 'text-red-400';
        return 'text-blue-400';
    };

    // Helper to get category icon
    const getCategoryIcon = (algorithmId: string) => {
        if (algorithmCategories.efficient.some(a => a.id === algorithmId)) return <FiZap className="text-yellow-400" />;
        if (algorithmCategories.simple.some(a => a.id === algorithmId)) return <FiBook className="text-blue-400" />;
        if (algorithmCategories.improved.some(a => a.id === algorithmId)) return <FiTool className="text-orange-400" />;
        if (algorithmCategories.unusual.some(a => a.id === algorithmId)) return <FiStar className="text-purple-400" />;
        return <FiStar className="text-gray-400" />;
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-white mb-3">Algorithm Library</h3>

                {/* Search Bar */}
                <div className="relative mb-3">
                    <input
                        type="text"
                        placeholder="Search algorithms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                    <div className="absolute right-3 top-2.5 text-dark-400">
                        <FiSearch size={16} />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {[
                        { key: 'all', label: 'All', count: presets.length },
                        { key: 'efficient', label: 'Efficient', count: algorithmCategories.efficient.length },
                        { key: 'simple', label: 'Simple', count: algorithmCategories.simple.length },
                        { key: 'improved', label: 'Improved', count: algorithmCategories.improved.length },
                        { key: 'unusual', label: 'Unusual', count: algorithmCategories.unusual.length }
                    ].map(({ key, label, count }) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key as any)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedCategory === key
                                ? 'bg-primary-600 text-white'
                                : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                                }`}
                        >
                            {label} ({count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            {searchQuery && (
                <div className="text-sm text-dark-400">
                    {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''} found
                </div>
            )}

            {/* Algorithm Cards */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {filteredAlgorithms.length > 0 ? (
                    filteredAlgorithms.map((preset) => (
                        <div
                            key={preset.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedAlgorithm === preset.id
                                ? 'border-primary-500 bg-primary-900 bg-opacity-30 shadow-lg'
                                : 'border-dark-600 hover:border-dark-500 hover:bg-dark-700'
                                }`}
                            onClick={() => onSelectAlgorithm(preset.id)}
                        >
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">{getCategoryIcon(preset.id)}</span>
                                        <h4 className="font-medium text-white">{preset.algorithm.name}</h4>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onShowInfo(preset);
                                            }}
                                            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors flex-shrink-0"
                                            title="Algorithm Info"
                                        >
                                            <FiInfo size={12} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onShowCode(preset);
                                            }}
                                            className="px-2 py-1 text-xs bg-dark-600 hover:bg-dark-500 text-dark-200 rounded transition-colors flex-shrink-0"
                                        >
                                            View Code
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-dark-300 leading-relaxed">
                                    {preset.algorithm.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <FiClock className="text-accent-400" size={12} />
                                            <span className={getComplexityColor(preset.algorithm.timeComplexity)}>
                                                {preset.algorithm.timeComplexity}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FiHardDrive className="text-primary-400" size={12} />
                                            <span className="text-dark-400">{preset.algorithm.spaceComplexity}</span>
                                        </div>
                                    </div>
                                    {selectedAlgorithm === preset.id && (
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                                            <span className="text-primary-400 text-xs">Selected</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-dark-400">
                        <div className="flex justify-center mb-2">
                            <FiSearch size={32} />
                        </div>
                        <p>No algorithms match your search.</p>
                        <p className="text-sm mt-1">Try a different search term or category.</p>
                    </div>
                )}
            </div>

            {/* Algorithm Stats */}
            <div className="mt-4 p-3 bg-dark-700 rounded-lg border border-dark-600">
                <h4 className="text-sm font-medium text-white mb-2">Collection Stats</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-dark-300">
                    <div className="flex items-center space-x-1">
                        <FiZap className="text-yellow-400" size={12} />
                        <span>Efficient: {algorithmCategories.efficient.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiBook className="text-blue-400" size={12} />
                        <span>Simple: {algorithmCategories.simple.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiTool className="text-orange-400" size={12} />
                        <span>Improved: {algorithmCategories.improved.length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FiStar className="text-purple-400" size={12} />
                        <span>Unusual: {algorithmCategories.unusual.length}</span>
                    </div>
                </div>
                <div className="mt-2 text-xs text-dark-400">
                    Total: {presets.length} algorithms
                </div>
            </div>
        </div>
    );
};

export default AlgorithmSelector;
