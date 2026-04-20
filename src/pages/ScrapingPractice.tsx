import React, { useState } from 'react'
import { Globe, Code, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const ScrapingPractice: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [url, setUrl] = useState('https://example.com')
  const [selectors, setSelectors] = useState<string[]>([])
  const [currentSelector, setCurrentSelector] = useState('')
  const [outputFormat, setOutputFormat] = useState('json')

  // 步骤数据
  const steps = [
    {
      id: 1,
      title: '输入目标URL',
      description: '输入你想要爬取数据的网站URL',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">目标URL</label>
            <input 
              type="url" 
              className="w-full p-2 border rounded-md"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="font-semibold mb-2">提示</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>确保输入完整的URL，包括协议（http://或https://）</li>
              <li>选择结构清晰、内容丰富的网站</li>
              <li>遵守网站的robots.txt规则</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '配置选择器',
      description: '添加CSS选择器来提取你需要的数据',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">选择器名称</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                placeholder="例如：标题、链接、价格"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">CSS选择器</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                value={currentSelector}
                onChange={(e) => setCurrentSelector(e.target.value)}
                placeholder="例如：.title, .price, a.href"
              />
            </div>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                if (currentSelector) {
                  setSelectors([...selectors, currentSelector])
                  setCurrentSelector('')
                }
              }}
            >
              添加选择器
            </button>
          </div>
          <div>
            <h4 className="font-semibold mb-2">已添加的选择器</h4>
            <div className="space-y-2">
              {selectors.length > 0 ? (
                selectors.map((selector, index) => (
                  <div key={index} className="p-2 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
                    <span>{selector}</span>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setSelectors(selectors.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">请添加选择器</p>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '配置爬取参数',
      description: '设置爬取的相关参数',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">爬取深度</label>
              <select className="w-full p-2 border rounded-md">
                <option value="1">1 (只爬取当前页面)</option>
                <option value="2">2 (当前页面 + 一级链接)</option>
                <option value="3">3 (当前页面 + 两级链接)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">爬取速度</label>
              <select className="w-full p-2 border rounded-md">
                <option value="slow">慢 (避免触发反爬)</option>
                <option value="medium">中等</option>
                <option value="fast">快 (适合小型网站)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">User-Agent</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              defaultValue="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="follow-links" className="rounded" />
            <label htmlFor="follow-links">跟随页面中的链接</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="save-images" className="rounded" />
            <label htmlFor="save-images">保存页面中的图片</label>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: '选择输出格式',
      description: '选择数据的输出格式',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { format: 'json', name: 'JSON', description: '结构清晰，易于处理' },
              { format: 'csv', name: 'CSV', description: '适合Excel等表格软件' },
              { format: 'txt', name: 'TXT', description: '简单文本格式' }
            ].map((format) => (
              <div 
                key={format.format} 
                className={`p-4 border rounded-md cursor-pointer transition-colors ${outputFormat === format.format ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
                onClick={() => setOutputFormat(format.format)}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Code size={24} className="text-blue-600" />
                </div>
                <h4 className="font-semibold mb-1">{format.name}</h4>
                <p className="text-sm text-gray-600">{format.description}</p>
              </div>
            ))}
          </div>
          <div>
            <label className="block font-medium mb-1">输出文件名</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              defaultValue="scraped_data"
            />
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '开始爬取',
      description: '确认配置并开始爬取数据',
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="font-semibold mb-2">爬取配置</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">目标URL:</span>
                <span>{url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">选择器数量:</span>
                <span>{selectors.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">输出格式:</span>
                <span>{outputFormat.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-md">
            <h4 className="font-semibold mb-2">注意事项</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>爬取数据时请遵守网站的使用条款</li>
              <li>不要频繁请求同一网站，以免被封禁</li>
              <li>尊重网站的版权和知识产权</li>
              <li>仅用于学习和研究目的</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const handleNext = () => {
    setCurrentStep(Math.min(steps.length, currentStep + 1))
  }

  const handlePrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1))
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">数据采集工具模拟</h1>
        <p className="text-gray-600">使用简单的配置界面学习数据采集原理</p>
      </div>

      {/* 步骤导航 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">步骤 {currentStep}: {steps[currentStep - 1].title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{currentStep} / {steps.length}</span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              上一步
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              下一步
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 步骤内容 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{steps[currentStep - 1].description}</h3>
        </div>
        <div className="mb-8">
          {steps[currentStep - 1].content}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一步
          </button>
          {currentStep === steps.length ? (
            <button className="px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors">
              开始爬取
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              下一步
            </button>
          )}
        </div>
      </div>

      {/* 进度条 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">创建进度</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${index < currentStep - 1 ? 'bg-blue-600 text-white' : index === currentStep - 1 ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                {index + 1}
              </div>
              <p className={`text-sm ${index < currentStep - 1 ? 'text-blue-600 font-medium' : index === currentStep - 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {step.title.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrapingPractice