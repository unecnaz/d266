import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Code, Database, Tag, Briefcase, Clock } from 'lucide-react'

const Courses: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [activeCategory, setActiveCategory] = useState(category || 'all')

  // 课程数据
  const coursesData = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      description: '了解电子商务的基本概念、发展历程和主要模式，掌握电子商务的核心要素和运作机制。',
      category: 'basic',
      level: '初级',
      duration: 24,
      targetJobs: ['数据分析师', '电商运营专员'],
      typicalTasks: ['电商平台数据分析', '用户行为分析'],
      skillTags: ['电子商务', '商业模式', '市场分析']
    },
    {
      id: 'marketing-basics',
      title: '市场营销基础',
      description: '掌握市场营销的基本理论和方法，了解市场调研、品牌建设、促销策略等核心内容。',
      category: 'basic',
      level: '初级',
      duration: 20,
      targetJobs: ['市场分析师', '营销专员'],
      typicalTasks: ['市场调研分析', '营销效果评估'],
      skillTags: ['市场营销', '市场调研', '品牌管理']
    },
    {
      id: 'statistics',
      title: '应用统计',
      description: '学习统计学的基本概念和方法，掌握数据描述、概率分布、假设检验等统计分析技能。',
      category: 'basic',
      level: '初级',
      duration: 32,
      targetJobs: ['数据分析师', '统计分析师'],
      typicalTasks: ['数据统计分析', '假设检验', '数据可视化'],
      skillTags: ['统计学', '数据分析', '假设检验']
    },
    {
      id: 'python-basics',
      title: 'Python基础',
      description: '掌握Python编程语言的基本语法和数据结构，学习函数、模块、文件操作等核心内容。',
      category: 'basic',
      level: '初级',
      duration: 40,
      targetJobs: ['Python开发工程师', '数据分析师'],
      typicalTasks: ['Python编程', '数据处理', '脚本开发'],
      skillTags: ['Python', '编程基础', '数据处理']
    },
    {
      id: 'data-collection',
      title: '数据采集与处理',
      description: '学习数据采集的方法和工具，掌握网络爬虫、API调用、数据清洗等技能。',
      category: 'core',
      level: '中级',
      duration: 36,
      targetJobs: ['数据工程师', '数据分析师'],
      typicalTasks: ['网络爬虫开发', '数据清洗', '数据预处理'],
      skillTags: ['Python爬虫', '数据采集', '数据清洗']
    },
    {
      id: 'sales-analysis',
      title: '销售数据分析',
      description: '掌握销售数据的分析方法，学习销售趋势分析、客户细分、销售预测等技能。',
      category: 'core',
      level: '中级',
      duration: 28,
      targetJobs: ['销售分析师', '数据分析师'],
      typicalTasks: ['销售数据建模', '销售预测', '客户分析'],
      skillTags: ['销售分析', '数据建模', '预测分析']
    },
    {
      id: 'product-analysis',
      title: '产品数据分析',
      description: '学习产品数据的分析方法，掌握用户行为分析、产品功能评估、迭代优化等技能。',
      category: 'core',
      level: '中级',
      duration: 30,
      targetJobs: ['产品分析师', '数据分析师'],
      typicalTasks: ['用户行为分析', '产品功能评估', 'A/B测试'],
      skillTags: ['产品分析', '用户行为', 'A/B测试']
    },
    {
      id: 'customer-analysis',
      title: '客户数据分析',
      description: '掌握客户数据的分析方法，学习客户画像、客户生命周期、客户价值评估等技能。',
      category: 'core',
      level: '中级',
      duration: 26,
      targetJobs: ['客户分析师', '数据分析师'],
      typicalTasks: ['客户画像构建', '客户生命周期分析', '客户价值评估'],
      skillTags: ['客户分析', '用户画像', '客户生命周期']
    },
    {
      id: 'data-visualization',
      title: '数据可视化',
      description: '学习数据可视化的原理和方法，掌握使用Python库和BI工具创建有效数据可视化的技能。',
      category: 'core',
      level: '中级',
      duration: 32,
      targetJobs: ['数据可视化工程师', '数据分析师'],
      typicalTasks: ['数据可视化设计', '仪表盘构建', '报表生成'],
      skillTags: ['数据可视化', 'Matplotlib', '九数云BI', '数据报表']
    },
    {
      id: 'smart-business',
      title: '智慧商业',
      description: '了解智慧商业的概念和应用，学习如何利用数据分析和人工智能技术提升商业决策效率。',
      category: 'advanced',
      level: '高级',
      duration: 24,
      targetJobs: ['商业智能分析师', '数据分析师'],
      typicalTasks: ['商业智能分析', '决策支持', '智能推荐'],
      skillTags: ['商业智能', '人工智能', '决策支持']
    },
    {
      id: 'real-projects',
      title: '企业真实运营项目',
      description: '参与企业真实运营项目，从数据获取、清洗、分析到可视化报告撰写的全流程实践。',
      category: 'advanced',
      level: '高级',
      duration: 48,
      targetJobs: ['数据分析师', '业务分析师'],
      typicalTasks: ['全流程数据分析', '项目管理', '报告撰写'],
      skillTags: ['项目实践', '全流程分析', '报告撰写']
    },
    {
      id: 'industry-report',
      title: '行业分析报告撰写',
      description: '学习行业分析的方法和框架，掌握如何撰写专业的行业分析报告。',
      category: 'advanced',
      level: '高级',
      duration: 20,
      targetJobs: ['行业分析师', '数据分析师'],
      typicalTasks: ['行业研究', '报告撰写', '趋势分析'],
      skillTags: ['行业分析', '报告撰写', '趋势预测']
    }
  ]

  // 过滤课程
  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeCategory)

  // 分类信息
  const categories = [
    { id: 'all', name: '全部课程', icon: <Book size={18} /> },
    { id: 'basic', name: '专业基础课', icon: <Book size={18} /> },
    { id: 'core', name: '专业核心课', icon: <Code size={18} /> },
    { id: 'advanced', name: '案例实战与拓展课', icon: <Database size={18} /> }
  ]

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">课程中心</h1>
        <p className="text-gray-600">探索我们的课程体系，从基础到核心再到实战</p>
      </div>

      {/* 分类导航 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* 课程列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.category}/${course.id}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.skillTags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center">
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{course.duration} 课时</span>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.level === '初级' ? 'bg-green-100 text-green-700' :
                        course.level === '中级' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={14} className="mr-1" />
                    <span>{course.targetJobs[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Courses