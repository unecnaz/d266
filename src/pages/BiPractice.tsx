import React, { useState } from 'react'
import { BarChart2, Move, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const BiPractice: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [selectedChartType, setSelectedChartType] = useState('bar')
  const [dashboardName, setDashboardName] = useState('销售数据分析')

  // 步骤数据
  const steps = [
    {
      id: 1,
      title: '选择数据源',
      description: '从可用的数据集中选择一个数据源',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">请选择以下数据源之一：</p>
          <div className="space-y-2">
            {[
              { name: '销售数据', description: '包含销售金额、地区、产品类别等信息' },
              { name: '客户数据', description: '包含客户信息、购买历史等数据' },
              { name: '产品数据', description: '包含产品信息、库存、价格等数据' }
            ].map((dataset, index) => (
              <div key={index} className="p-4 border rounded-md hover:border-blue-500 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{dataset.name}</h4>
                    <p className="text-sm text-gray-600">{dataset.description}</p>
                  </div>
                  <CheckCircle size={20} className="text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: '选择字段',
      description: '从数据源中选择需要的字段',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">可用字段</h4>
            <div className="space-y-2">
              {[
                '销售日期', '销售金额', '客户ID', '产品ID', '地区', '类别', '销售人员'
              ].map((field, index) => (
                <div 
                  key={index} 
                  className="p-2 border rounded-md hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between"
                  onClick={() => setSelectedFields([...selectedFields, field])}
                >
                  <span>{field}</span>
                  <Move size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">已选择字段</h4>
            <div className="space-y-2">
              {selectedFields.length > 0 ? (
                selectedFields.map((field, index) => (
                  <div key={index} className="p-2 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
                    <span>{field}</span>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setSelectedFields(selectedFields.filter(f => f !== field))}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">请从左侧拖拽字段到此处</p>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: '选择图表类型',
      description: '选择适合数据展示的图表类型',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'bar', name: '柱状图', description: '适合比较不同类别的数据' },
            { type: 'line', name: '折线图', description: '适合展示数据变化趋势' },
            { type: 'pie', name: '饼图', description: '适合展示数据占比' },
            { type: 'scatter', name: '散点图', description: '适合展示两个变量的关系' },
            { type: 'bar', name: '面积图', description: '适合展示累计数据' },
            { type: 'bar', name: '仪表盘', description: '适合展示关键指标' },
            { type: 'bar', name: '热力图', description: '适合展示数据密度' },
            { type: 'bar', name: '地图', description: '适合展示地理数据' }
          ].map((chart, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-md cursor-pointer transition-colors ${selectedChartType === chart.type ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
              onClick={() => setSelectedChartType(chart.type)}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <BarChart2 size={24} className="text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">{chart.name}</h4>
              <p className="text-sm text-gray-600">{chart.description}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 4,
      title: '配置图表',
      description: '配置图表的详细参数',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">图表标题</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              defaultValue="销售趋势分析"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">X轴字段</label>
              <select className="w-full p-2 border rounded-md">
                <option>销售日期</option>
                <option>地区</option>
                <option>类别</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Y轴字段</label>
              <select className="w-full p-2 border rounded-md">
                <option>销售金额</option>
                <option>销售数量</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">颜色方案</label>
            <div className="flex space-x-2">
              {['#1E40AF', '#F97316', '#10B981', '#8B5CF6'].map((color, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full cursor-pointer border-2 border-white hover:border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '保存仪表盘',
      description: '为你的仪表盘命名并保存',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">仪表盘名称</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-md"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">仪表盘描述</label>
            <textarea 
              className="w-full p-2 border rounded-md h-24"
              placeholder="描述一下这个仪表盘的用途..."
            ></textarea>
          </div>
          <div className="p-4 bg-blue-50 rounded-md">
            <h4 className="font-semibold mb-2">仪表盘预览</h4>
            <div className="h-48 bg-white border rounded-md flex items-center justify-center">
              <p className="text-gray-500">图表预览将显示在这里</p>
            </div>
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
        <h1 className="text-3xl font-bold mb-2">BI工具模拟</h1>
        <p className="text-gray-600">使用拖拽式界面创建数据可视化仪表盘</p>
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
              保存仪表盘
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

export default BiPractice