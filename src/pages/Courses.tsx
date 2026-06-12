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
      id: 'real-projects',
      title: '企业真实运营项目',
      description: '参与企业真实运营项目，从数据获取、清洗、分析到可视化报告撰写的全流程实践。',
      category: 'advanced',
      level: '高级',
      duration: 48,
      targetJobs: ['数据分析师', '业务分析师'],
      typicalTasks: ['全流程数据分析', '项目管理', '报告撰写'],
      skillTags: ['项目实践', '全流程分析', '报告撰写']
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
    <div className="space-y-8 min-h-screen">
      {/* 测试内容 */}
      <div className="bg-green-100 border-2 border-green-400 p-4 rounded">
        <p className="text-green-900 font-bold text-xl">✅ 课程中心正在加载 - 测试文本</p>
        <p className="text-green-800">课程数据: {filteredCourses.length} 门课程</p>
      </div>

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