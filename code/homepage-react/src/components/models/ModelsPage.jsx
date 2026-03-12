// src/components/models/ModelsPage.jsx
import React, { useState, useMemo } from 'react';
import ModelCard from './ModelCard';
import ModelFilters from './ModelFilters';
import { aiModels, modelCategories, modelProviders } from '../../data/models';

const ModelsPage = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort models
  const filteredModels = useMemo(() => {
    let filtered = [...aiModels];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(model => model.category === selectedCategory);
    }

    // Filter by providers
    if (selectedProviders.length > 0) {
      filtered = filtered.filter(model => selectedProviders.includes(model.provider));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort models
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return (a.pricing?.price || Infinity) - (b.pricing?.price || Infinity);
        case 'price-high':
          return (b.pricing?.price || 0) - (a.pricing?.price || 0);
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'newest':
          // For demo, sort by ID (assuming newer models have higher numbers)
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, selectedProviders, searchQuery, sortBy]);

  // Get category stats
  const categoryStats = useMemo(() => {
    const stats = {};
    modelCategories.forEach(category => {
      stats[category.id] = aiModels.filter(model => model.category === category.id).length;
    });
    stats.all = aiModels.length;
    return stats;
  }, []);

  // Get provider stats
  const providerStats = useMemo(() => {
    const stats = {};
    modelProviders.forEach(provider => {
      stats[provider.id] = aiModels.filter(model => model.provider === provider.id).length;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI 模型目录
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              探索最新的 AI 模型，包括文本生成、图像生成、视频生成、音频生成和多模态模型
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">{aiModels.length}</div>
                <div className="text-sm text-indigo-200">可用模型</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">{modelProviders.length}</div>
                <div className="text-sm text-indigo-200">提供商</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold">{modelCategories.length}</div>
                <div className="text-sm text-indigo-200">模型类型</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ModelFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedProviders={selectedProviders}
              setSelectedProviders={setSelectedProviders}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Category Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">模型分类统计</h3>
              <div className="space-y-3">
                {modelCategories.map(category => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {categoryStats[category.id] || 0}
                    </span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">总计</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                      {categoryStats.all || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Models Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? '所有模型' : 
                   modelCategories.find(c => c.id === selectedCategory)?.name + '模型'}
                </h2>
                <p className="text-gray-600 mt-1">
                  找到 <span className="font-semibold text-indigo-600">{filteredModels.length}</span> 个模型
                  {selectedProviders.length > 0 && (
                    <span>，来自 {selectedProviders.length} 个提供商</span>
                  )}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">排序:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="name">名称 (A-Z)</option>
                  <option value="price-low">价格 (低到高)</option>
                  <option value="price-high">价格 (高到低)</option>
                  <option value="discount">折扣最高</option>
                  <option value="newest">最新添加</option>
                </select>
              </div>
            </div>

            {/* Models Grid */}
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModels.map(model => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">未找到匹配的模型</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  尝试调整筛选条件或搜索关键词
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedProviders([]);
                    setSearchQuery('');
                    setSortBy('name');
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  重置所有筛选
                </button>
              </div>
            )}

            {/* Pagination (if needed in future) */}
            {filteredModels.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    显示 1-{filteredModels.length} 个模型，共 {filteredModels.length} 个
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                      上一页
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      下一页
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择我们的模型目录</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我们提供最全面、最新的 AI 模型信息，帮助您找到最适合您需求的解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">实时价格更新</h3>
              <p className="text-gray-600">
                我们持续监控各大提供商的定价变化，确保您获得最准确的价格信息。
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">详细模型对比</h3>
              <p className="text-gray-600">
                提供详细的规格对比，帮助您根据性能、价格和特性做出明智决策。
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">最新模型发布</h3>
              <p className="text-gray-600">
                第一时间收录最新发布的 AI 模型，让您始终站在技术前沿。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;