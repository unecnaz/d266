import React, { useState } from 'react'
import { Database, Download, Search, Filter, ChevronRight } from 'lucide-react'

const Datasets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 数据集数据
  const datasets = [
    {
      id: 1,
      name: '电商运营数据集',
      description: '包含电商平台的销售数据、用户行为数据和产品信息，适合进行销售分析和用户行为分析。',
      category: '电商',
      size: '12.5 MB',
      format: 'CSV',
      fields: ['订单ID', '用户ID', '产品ID', '销售金额', '销售日期', '地区', '支付方式'],
      sampleData: [
        { order_id: '1001', user_id: 'U001', product_id: 'P001', amount: '299.99', date: '2023-01-01', region: '北京', payment: '支付宝' },
        { order_id: '1002', user_id: 'U002', product_id: 'P002', amount: '199.99', date: '2023-01-02', region: '上海', payment: '微信支付' }
      ]
    },
    {
      id: 2,
      name: '供应链物流数据集',
      description: '包含供应链物流的运输数据、库存数据和配送数据，适合进行物流优化和库存管理分析。',
      category: '物流',
      size: '8.3 MB',
      format: 'Excel',
      fields: ['物流单号', '发货地', '目的地', '运输方式', '发货时间', '到达时间', '运输状态'],
      sampleData: [
        { logistics_id: 'L001', origin: '北京', destination: '上海', method: '快递', send_time: '2023-01-01 10:00', arrive_time: '2023-01-02 14:30', status: '已送达' },
        { logistics_id: 'L002', origin: '上海', destination: '广州', method: '物流', send_time: '2023-01-03 09:00', arrive_time: '2023-01-05 11:00', status: '已送达' }
      ]
    },
    {
      id: 3,
      name: '市场调查数据集',
      description: '包含消费者市场调查的问卷数据，适合进行市场分析和消费者行为研究。',
      category: '市场',
      size: '5.7 MB',
      format: 'CSV',
      fields: ['调查ID', '性别', '年龄', '收入水平', '购买频率', '偏好品牌', '满意度'],
      sampleData: [
        { survey_id: 'S001', gender: '男', age: '25-34', income: '5000-8000', frequency: '每月1-2次', brand: '品牌A', satisfaction: '4' },
        { survey_id: 'S002', gender: '女', age: '35-44', income: '8000-12000', frequency: '每月3-4次', brand: '品牌B', satisfaction: '5' }
      ]
    },
    {
      id: 4,
      name: '招聘网站数据集',
      description: '包含招聘网站的职位信息和求职者数据，适合进行就业市场分析和职业规划研究。',
      category: '招聘',
      size: '15.2 MB',
      format: 'JSON',
      fields: ['职位ID', '职位名称', '公司名称', '薪资范围', '工作地点', '学历要求', '工作经验'],
      sampleData: [
        { job_id: 'J001', job_title: '数据分析师', company: '科技公司A', salary: '15K-25K', location: '北京', education: '本科', experience: '3-5年' },
        { job_id: 'J002', job_title: '前端开发工程师', company: '互联网公司B', salary: '20K-30K', location: '上海', education: '本科', experience: '1-3年' }
      ]
    },
    {
      id: 5,
      name: '金融交易数据集',
      description: '包含金融机构的交易数据，适合进行金融分析和风险评估研究。',
      category: '金融',
      size: '20.1 MB',
      format: 'CSV',
      fields: ['交易ID', '用户ID', '交易类型', '交易金额', '交易时间', '交易状态', '交易渠道'],
      sampleData: [
        { transaction_id: 'T001', user_id: 'U101', type: '转账', amount: '5000', time: '2023-01-01 10:00', status: '成功', channel: '手机银行' },
        { transaction_id: 'T002', user_id: 'U102', type: '消费', amount: '899', time: '2023-01-01 12:30', status: '成功', channel: '信用卡' }
      ]
    },
    {
      id: 6,
      name: '社交媒体数据集',
      description: '包含社交媒体的用户互动数据，适合进行社交媒体分析和用户行为研究。',
      category: '社交',
      size: '18.7 MB',
      format: 'JSON',
      fields: ['帖子ID', '用户ID', '内容', '发布时间', '点赞数', '评论数', '分享数'],
      sampleData: [
        { post_id: 'P101', user_id: 'U201', content: '今天天气真好！', time: '2023-01-01 09:00', likes: '120', comments: '25', shares: '10' },
        { post_id: 'P102', user_id: 'U202', content: '新电影太好看了！', time: '2023-01-01 18:30', likes: '256', comments: '42', shares: '35' }
      ]
    }
  ]

  // 分类列表
  const categories = ['all', '电商', '物流', '市场', '招聘', '金融', '社交']

  // 过滤数据集
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">公共数据集中心</h1>
        <p className="text-gray-600">浏览和下载多行业、多场景的真实或脱敏数据集</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="搜索数据集..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            className="p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '全部分类' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 数据集列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDatasets.map(dataset => (
          <div key={dataset.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{dataset.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  dataset.category === '电商' ? 'bg-blue-100 text-blue-700' :
                  dataset.category === '物流' ? 'bg-green-100 text-green-700' :
                  dataset.category === '市场' ? 'bg-orange-100 text-orange-700' :
                  dataset.category === '招聘' ? 'bg-purple-100 text-purple-700' :
                  dataset.category === '金融' ? 'bg-red-100 text-red-700' :
                  'bg-indigo-100 text-indigo-700'
                }`}>
                  {dataset.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{dataset.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center">
                  <Database size={16} className="mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{dataset.format}</span>
                </div>
                <div className="flex items-center">
                  <Download size={16} className="mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{dataset.size}</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">包含字段</h4>
                <div className="flex flex-wrap gap-1">
                  {dataset.fields.map((field, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">数据预览</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        {Object.keys(dataset.sampleData[0]).map((key, index) => (
                          <th key={index} className="py-1 px-2 text-left">
                            {key.replace('_', ' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataset.sampleData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex} className="py-1 px-2 border-t">
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  下载数据集
                  <Download size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredDatasets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md">
          <Database size={48} className="text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">未找到数据集</h3>
          <p className="text-gray-600 text-center max-w-md">
            尝试调整搜索条件或选择不同的分类来查找数据集
          </p>
        </div>
      )}
    </div>
  )
}

export default Datasets