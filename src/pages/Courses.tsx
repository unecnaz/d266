import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Book, Code, Database, Sparkles, Clock, Users, TrendingUp, ChevronRight, Layers } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  students: number
  lessons: number
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  tags: string[]
}

const Courses: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const courses: Course[] = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      description: '从零开始了解电子商务的全貌，掌握电商核心概念、商业模式、运营策略，为数据分析奠定坚实的业务基础。',
      category: 'basic',
      level: '零基础入门',
      duration: 24,
      students: 1280,
      lessons: 4,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      tags: ['电商入门', '商业模式', '运营策略']
    },
    {
      id: 'python-basics',
      title: 'Python数据分析入门',
      description: '专为数据分析设计的Python课程，从基础语法到数据处理，全面掌握Python编程技能，为后续数据分析学习铺平道路。',
      category: 'basic',
      level: '零基础入门',
      duration: 40,
      students: 2560,
      lessons: 6,
      icon: <Code className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tags: ['Python', '编程基础', '数据处理']
    },
    {
      id: 'data-collection',
      title: '数据采集与清洗',
      description: '学习如何从网页、API、数据库等多种来源采集数据，掌握数据清洗的核心技能，确保数据质量为分析做好准备。',
      category: 'core',
      level: '进阶技能',
      duration: 32,
      students: 980,
      lessons: 5,
      icon: <Database className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      tags: ['数据采集', '网络爬虫', '数据清洗']
    },
    {
      id: 'data-visualization',
      title: '数据可视化实战',
      description: '将枯燥的数据转化为直观的图表，学习Excel、Python可视化库、Tableau、九数云等多种工具，打造专业的数据报表。',
      category: 'core',
      level: '进阶技能',
      duration: 28,
      students: 1450,
      lessons: 5,
      icon: <Layers className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      tags: ['数据可视化', '图表设计', 'BI工具']
    },
    {
      id: 'sql-essentials',
      title: 'SQL数据分析实战',
      description: '深入学习SQL查询语言，从基础SELECT到复杂的多表关联、子查询、窗口函数，掌握数据库数据分析的核心技能。',
      category: 'core',
      level: '进阶技能',
      duration: 30,
      students: 1890,
      lessons: 5,
      icon: <Database className="w-8 h-8" />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      tags: ['SQL', '数据库', '查询技巧']
    },
    {
      id: 'real-projects',
      title: '企业真实项目实战',
      description: '参与完整的企业数据分析项目，从需求沟通、数据获取、分析建模到报告撰写，积累真实的项目经验。',
      category: 'advanced',
      level: '项目实战',
      duration: 48,
      students: 680,
      lessons: 6,
      icon: <Sparkles className="w-8 h-8" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      tags: ['项目实战', '综合应用', '就业准备']
    }
  ]

  const categories = [
    { id: 'all', name: '全部课程', icon: <Book size={16} /> },
    { id: 'basic', name: '基础入门', icon: <Sparkles size={16} /> },
    { id: 'core', name: '核心技能', icon: <Code size={16} /> },
    { id: 'advanced', name: '项目实战', icon: <TrendingUp size={16} /> }
  ]

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(course => course.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* 顶部装饰 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <Book className="w-4 h-4 mr-2" />
              专业课程体系
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              课程中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              从基础到实战，系统化学习数据分析技能。每门课程都经过精心设计，结合真实业务场景。
            </p>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600">6</div>
              <div className="text-sm text-gray-500">精品课程</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600">202</div>
              <div className="text-sm text-gray-500">丰富章节</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600">8840+</div>
              <div className="text-sm text-gray-500">学习人数</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-gray-500">好评率</div>
            </div>
          </div>

          {/* 分类导航 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all duration-200 font-medium ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* 课程列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Link
                key={course.id}
                to={`/courses/${course.category}/${course.id}`}
                className="group block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white rounded-2xl overflow-hidden border-2 ${course.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                  {/* 课程头部 */}
                  <div className={`${course.bgColor} p-6 relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${course.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
                    <div className={`inline-flex p-3 rounded-xl bg-white shadow-sm ${course.color}`}>
                      {course.icon}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.color} bg-white`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* 课程内容 */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* 技能标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 课程信息 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Book size={14} />
                        <span>{course.lessons}章节</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{course.duration}课时</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{course.students}</span>
                      </div>
                    </div>

                    {/* 开始学习按钮 */}
                    <div className="mt-4 flex items-center justify-center">
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${course.color} bg-white border-2 ${course.borderColor} group-hover:bg-gradient-to-r group-hover:${course.color} group-hover:text-white group-hover:bg-white transition-all`}>
                        开始学习
                        <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 空状态 */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">该分类下暂无课程</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses
