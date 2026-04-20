import React from 'react'
import { Database, FileText, Calendar, Clock, Award, ChevronRight } from 'lucide-react'

const Projects: React.FC = () => {
  // 实训项目数据
  const projects = [
    {
      id: 1,
      title: '汽车供应链数据分析',
      description: '分析汽车供应链的物流数据、库存数据和采购数据，识别供应链中的瓶颈和优化机会，提出改进建议。',
      difficulty: '高级',
      duration: 20, // 预计完成时间（小时）
      dataset: '供应链物流数据集',
      requirements: [
        '分析供应链各环节的运输时间和成本',
        '识别库存积压和缺货的产品',
        '分析供应商的交付准时率',
        '构建供应链优化模型',
        '撰写分析报告并提出改进建议'
      ],
      skills: ['数据分析', '供应链管理', '数据可视化', '报告撰写'],
      steps: [
        '数据获取与清洗',
        '供应链各环节分析',
        '瓶颈识别与根因分析',
        '优化方案设计',
        '报告撰写与展示'
      ]
    },
    {
      id: 2,
      title: '直播电商运营效果监测',
      description: '分析直播电商的运营数据，包括观看人数、互动率、转化率等指标，评估直播效果并提出优化策略。',
      difficulty: '中级',
      duration: 15,
      dataset: '电商运营数据集',
      requirements: [
        '分析不同时间段的直播效果',
        '评估不同主播的表现',
        '分析产品类型与销售效果的关系',
        '识别影响转化率的关键因素',
        '提出直播运营优化策略'
      ],
      skills: ['数据分析', '电商运营', '数据可视化', '业务分析'],
      steps: [
        '数据获取与预处理',
        '直播效果指标分析',
        '影响因素相关性分析',
        '优化策略制定',
        '报告撰写与展示'
      ]
    },
    {
      id: 3,
      title: '某产品市场销售分析报告',
      description: '分析某产品的市场销售数据，包括销售趋势、区域分布、客户群体等，撰写完整的市场销售分析报告。',
      difficulty: '中级',
      duration: 18,
      dataset: '市场调查数据集',
      requirements: [
        '分析产品销售趋势和季节性变化',
        '评估不同地区的销售表现',
        '分析客户群体特征和购买行为',
        '与竞争对手进行对比分析',
        '撰写完整的市场销售分析报告'
      ],
      skills: ['市场分析', '数据可视化', '报告撰写', '竞争分析'],
      steps: [
        '数据收集与清洗',
        '销售趋势分析',
        '市场细分分析',
        '竞争对比分析',
        '报告撰写与展示'
      ]
    },
    {
      id: 4,
      title: '金融产品用户行为分析',
      description: '分析金融产品的用户行为数据，识别用户特征和行为模式，为产品优化和营销策略提供建议。',
      difficulty: '高级',
      duration: 22,
      dataset: '金融交易数据集',
      requirements: [
        '分析用户的交易行为和偏好',
        '识别高价值用户群体',
        '分析用户流失原因',
        '构建用户画像',
        '提出产品优化和营销策略建议'
      ],
      skills: ['数据分析', '用户行为分析', '数据可视化', '金融分析'],
      steps: [
        '数据获取与清洗',
        '用户行为模式分析',
        '用户画像构建',
        '流失风险分析',
        '策略建议与报告撰写'
      ]
    },
    {
      id: 5,
      title: '社交媒体营销效果分析',
      description: '分析社交媒体的营销数据，评估不同平台和内容的营销效果，提出社交媒体营销策略优化建议。',
      difficulty: '中级',
      duration: 16,
      dataset: '社交媒体数据集',
      requirements: [
        '分析不同平台的营销效果',
        '评估不同类型内容的互动率',
        '分析粉丝增长趋势',
        '识别最佳发布时间',
        '提出社交媒体营销策略优化建议'
      ],
      skills: ['社交媒体分析', '数据可视化', '营销分析', '报告撰写'],
      steps: [
        '数据收集与预处理',
        '平台效果对比分析',
        '内容效果分析',
        '粉丝增长分析',
        '策略建议与报告撰写'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">综合实训项目</h1>
        <p className="text-gray-600">基于企业真实业务场景的完整项目，涵盖从数据获取、清洗、分析到可视化报告撰写的全流程</p>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.difficulty === '初级' ? 'bg-green-100 text-green-700' :
                  project.difficulty === '中级' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Database size={16} className="mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{project.dataset}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{project.duration} 小时</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">项目要求</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {project.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">所需技能</h4>
                <div className="flex flex-wrap gap-1">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-2">项目步骤</h4>
                <div className="space-y-1">
                  {project.steps.map((step, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="flex items-center px-4 py-2 bg-[#F97316] hover:bg-orange-600 text-white rounded-md transition-colors">
                  开始项目
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects