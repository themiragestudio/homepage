// src/components/models/ModelCard.jsx
import React from 'react';

const ModelCard = ({ model }) => {
  const getCategoryColor = (categoryId) => {
    const colors = {
      text: 'bg-blue-100 text-blue-800 border-blue-200',
      image: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      video: 'bg-purple-100 text-purple-800 border-purple-200',
      audio: 'bg-pink-100 text-pink-800 border-pink-200',
      multimodal: 'bg-amber-100 text-amber-800 border-amber-200',
      reasoning: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getProviderColor = (providerId) => {
    const colors = {
      openai: 'bg-green-100 text-green-800',
      anthropic: 'bg-yellow-100 text-yellow-800',
      google: 'bg-blue-100 text-blue-800',
      deepseek: 'bg-indigo-100 text-indigo-800',
      kling: 'bg-purple-100 text-purple-800',
      alibaba: 'bg-orange-100 text-orange-800',
      bytedance: 'bg-red-100 text-red-800',
      minimax: 'bg-teal-100 text-teal-800',
      byteplus: 'bg-violet-100 text-violet-800',
      xai: 'bg-gray-100 text-gray-800',
      suno: 'bg-rose-100 text-rose-800',
      raphael: 'bg-cyan-100 text-cyan-800',
      moonshot: 'bg-sky-100 text-sky-800'
    };
    return colors[providerId] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { text: '可用', className: 'bg-green-100 text-green-800 border-green-200' },
      'early-access': { text: '早期访问', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      preview: { text: '预览版', className: 'bg-amber-100 text-amber-800 border-amber-200' },
      beta: { text: '测试版', className: 'bg-purple-100 text-purple-800 border-purple-200' }
    };
    
    const config = statusConfig[status] || { text: status, className: 'bg-gray-100 text-gray-800 border-gray-200' };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${config.className}`}>
        {config.text}
      </span>
    );
  };

  const formatPrice = (pricing) => {
    if (!pricing) return '价格未公开';
    
    const { price, currency, unit } = pricing;
    const formattedPrice = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(price);
    
    return `${currency === 'USD' ? '$' : ''}${formattedPrice} ${unit}`;
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProviderColor(model.provider)}`}>
                {model.provider.charAt(0).toUpperCase() + model.provider.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(model.category)}`}>
                {model.category === 'text' ? '文本' : 
                 model.category === 'image' ? '图像' : 
                 model.category === 'video' ? '视频' : 
                 model.category === 'audio' ? '音频' : 
                 model.category === 'multimodal' ? '多模态' : '推理'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
              {model.name}
            </h3>
          </div>
          {getStatusBadge(model.status)}
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {model.description}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Pricing Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">价格</span>
            {model.discount > 0 && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                -{model.discount}%
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(model.pricing)}
            </span>
            {model.credits && (
              <span className="text-sm text-gray-500">
                ({model.credits} 积分)
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {model.features && model.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">主要特性</h4>
            <div className="flex flex-wrap gap-2">
              {model.features.slice(0, 4).map((feature, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {feature}
                </span>
              ))}
              {model.features.length > 4 && (
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-500">
                  +{model.features.length - 4}更多
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {model.tags && model.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">标签</h4>
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-100 hover:bg-indigo-100 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button 
          className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 group-hover:shadow-md"
          onClick={() => console.log(`View details for ${model.name}`)}
        >
          查看详情
        </button>
      </div>
    </div>
  );
};

export default ModelCard;