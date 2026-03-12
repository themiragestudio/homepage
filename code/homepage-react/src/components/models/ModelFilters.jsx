// src/components/models/ModelFilters.jsx
import React, { useState } from 'react';
import { modelCategories, modelProviders } from '../../data/models';

const ModelFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedProviders, 
  setSelectedProviders,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProviderToggle = (providerId) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(selectedProviders.filter(id => id !== providerId));
    } else {
      setSelectedProviders([...selectedProviders, providerId]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedProviders([]);
    setSearchQuery('');
    setSortBy('name');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedProviders.length > 0 || searchQuery || sortBy !== 'name';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">筛选模型</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          搜索模型
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入模型名称或描述..."
            className="pl-10 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">模型类型</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            全部
          </button>
          {modelCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              style={selectedCategory === category.id ? { backgroundColor: category.color } : {}}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Provider Filters - Collapsible */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">提供商</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            {isExpanded ? '收起' : '展开'}
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className={`grid gap-2 ${isExpanded ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2'}`}>
          {modelProviders.slice(0, isExpanded ? modelProviders.length : 8).map(provider => (
            <button
              key={provider.id}
              onClick={() => handleProviderToggle(provider.id)}
              className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-between ${
                selectedProviders.includes(provider.id)
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>{provider.name}</span>
              {selectedProviders.includes(provider.id) && (
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">排序方式</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'name', label: '名称 (A-Z)' },
            { id: 'price-low', label: '价格 (低到高)' },
            { id: 'price-high', label: '价格 (高到低)' },
            { id: 'discount', label: '折扣最高' },
            { id: 'newest', label: '最新添加' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                sortBy === option.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">当前筛选</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-full border border-indigo-100 flex items-center gap-1">
                {modelCategories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  ×
                </button>
              </span>
            )}
            
            {selectedProviders.map(providerId => {
              const provider = modelProviders.find(p => p.id === providerId);
              return provider ? (
                <span key={providerId} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-100 flex items-center gap-1">
                  {provider.name}
                  <button 
                    onClick={() => handleProviderToggle(providerId)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
            
            {searchQuery && (
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-100 flex items-center gap-1">
                搜索: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-500 hover:text-emerald-700"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelFilters;