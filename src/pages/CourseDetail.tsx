import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Clock, Users, ChevronLeft, ArrowLeft, PlayCircle, CheckCircle, Sparkles, Code, Database, TrendingUp, Layers } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  duration: number
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  students: number
  lessons: Lesson[]
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  tags: string[]
  whatYouLearn: string[]
  requirements: string[]
}

const CourseDetail: React.FC = () => {
  const { category, courseId } = useParams<{ category: string; courseId: string }>()

  const coursesData: Course[] = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      description: '从零开始了解电子商务的全貌，掌握电商核心概念、商业模式、运营策略，为数据分析奠定坚实的业务基础。',
      category: 'basic',
      level: '零基础入门',
      duration: 24,
      students: 1280,
      lessons: [
        { id: 1, title: '电子商务概述', duration: 45 },
        { id: 2, title: '电子商务技术基础', duration: 60 },
        { id: 3, title: '电商平台运营', duration: 50 },
        { id: 4, title: '电商数据分析基础', duration: 55 }
      ],
      icon: <TrendingUp className="w-10 h-10" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      tags: ['电商入门', '商业模式', '运营策略'],
      whatYouLearn: [
        '理解电子商务的定义和发展历程',
        '掌握电子商务的主要商业模式（B2B、B2C、C2C、O2O等）',
        '了解电子商务的核心要素（信息流、资金流、物流、商流）',
        '学习电商平台的运营策略和用户管理方法',
        '掌握电商数据分析的基础知识和常用指标'
      ],
      requirements: ['无需任何基础，适合零起点学员', '对电子商务感兴趣即可', '建议有基本的电脑操作能力']
    },
    {
      id: 'python-basics',
      title: 'Python数据分析入门',
      description: '专为数据分析设计的Python课程，从基础语法到数据处理，全面掌握Python编程技能，为后续数据分析学习铺平道路。',
      category: 'basic',
      level: '零基础入门',
      duration: 40,
      students: 2560,
      lessons: [
        { id: 1, title: 'Python环境搭建', duration: 30 },
        { id: 2, title: 'Python基础语法', duration: 60 },
        { id: 3, title: '函数和模块', duration: 50 },
        { id: 4, title: '数据结构', duration: 55 },
        { id: 5, title: '文件操作', duration: 45 },
        { id: 6, title: '面向对象编程', duration: 50 }
      ],
      icon: <Code className="w-10 h-10" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tags: ['Python', '编程基础', '数据处理'],
      whatYouLearn: [
        '掌握Python开发环境的搭建',
        '熟练运用Python基础语法（变量、数据类型、运算符）',
        '理解流程控制语句（条件判断、循环）',
        '掌握函数和模块的定义与使用',
        '熟练处理列表、字典、元组等数据结构',
        '能够进行文件读写操作'
      ],
      requirements: ['无需编程基础', '需要一台电脑（Windows/Mac/Linux均可）', '建议每天投入1-2小时学习时间']
    },
    {
      id: 'data-collection',
      title: '数据采集与清洗',
      description: '学习如何从网页、API、数据库等多种来源采集数据，掌握数据清洗的核心技能，确保数据质量为分析做好准备。',
      category: 'core',
      level: '进阶技能',
      duration: 32,
      students: 980,
      lessons: [
        { id: 1, title: '数据采集概述', duration: 45 },
        { id: 2, title: '网络爬虫基础', duration: 60 },
        { id: 3, title: 'Scrapy框架实战', duration: 70 },
        { id: 4, title: 'API数据获取', duration: 50 },
        { id: 5, title: '数据清洗技术', duration: 55 }
      ],
      icon: <Database className="w-10 h-10" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      tags: ['数据采集', '网络爬虫', '数据清洗'],
      whatYouLearn: [
        '理解数据采集的基本概念和伦理规范',
        '掌握HTTP协议和网页结构基础知识',
        '能够使用Python编写简单的网络爬虫',
        '学会使用Scrapy框架进行大规模数据采集',
        '掌握API接口调用和数据获取方法',
        '熟练进行数据清洗和预处理'
      ],
      requirements: ['需要具备Python基础', '了解基本的HTML知识会更帮助', '建议学习过"Python数据分析入门"课程']
    },
    {
      id: 'data-visualization',
      title: '数据可视化实战',
      description: '将枯燥的数据转化为直观的图表，学习Excel、Python可视化库、Tableau、九数云等多种工具，打造专业的数据报表。',
      category: 'core',
      level: '进阶技能',
      duration: 28,
      students: 1450,
      lessons: [
        { id: 1, title: '数据可视化基础', duration: 40 },
        { id: 2, title: 'Excel高级图表', duration: 50 },
        { id: 3, title: 'Python可视化库', duration: 60 },
        { id: 4, title: 'Tableau数据可视化', duration: 55 },
        { id: 5, title: 'BI工具综合实战', duration: 75 }
      ],
      icon: <Layers className="w-10 h-10" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      tags: ['数据可视化', '图表设计', 'BI工具'],
      whatYouLearn: [
        '理解数据可视化的原则和最佳实践',
        '掌握各种图表类型的适用场景',
        '能够使用Excel创建专业级图表',
        '熟练使用Python的Matplotlib和Seaborn库',
        '学会使用Tableau进行交互式可视化',
        '掌握BI工具（如九数云）的使用'
      ],
      requirements: ['需要具备基本的数据分析知识', '了解基础的统计学概念', '有Excel使用经验会更轻松']
    },
    {
      id: 'sql-essentials',
      title: 'SQL数据分析实战',
      description: '深入学习SQL查询语言，从基础SELECT到复杂的多表关联、子查询、窗口函数，掌握数据库数据分析的核心技能。',
      category: 'core',
      level: '进阶技能',
      duration: 30,
      students: 1890,
      lessons: [
        { id: 1, title: 'SQL基础与数据查询', duration: 50 },
        { id: 2, title: '多表关联与子查询', duration: 60 },
        { id: 3, title: '聚合函数与分组', duration: 45 },
        { id: 4, title: '窗口函数详解', duration: 55 },
        { id: 5, title: 'SQL综合实战', duration: 90 }
      ],
      icon: <Database className="w-10 h-10" />,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      tags: ['SQL', '数据库', '查询技巧'],
      whatYouLearn: [
        '掌握SELECT语句的各种用法',
        '熟练进行数据筛选、排序、分页',
        '能够进行多表关联查询（JOIN）',
        '理解并能编写复杂子查询',
        '掌握聚合函数和GROUP BY的使用',
        '学会窗口函数的实际应用'
      ],
      requirements: ['无需数据库基础', '需要了解基本的数据表概念', '适合对数据分析感兴趣的学员']
    },
    {
      id: 'real-projects',
      title: '企业真实项目实战',
      description: '参与完整的企业数据分析项目，从需求沟通、数据获取、分析建模到报告撰写，积累真实的项目经验。',
      category: 'advanced',
      level: '项目实战',
      duration: 48,
      students: 680,
      lessons: [
        { id: 1, title: '项目规划与需求分析', duration: 45 },
        { id: 2, title: '数据获取与探索', duration: 60 },
        { id: 3, title: '数据清洗与预处理', duration: 70 },
        { id: 4, title: '数据分析与建模', duration: 80 },
        { id: 5, title: '数据可视化与报告', duration: 65 },
        { id: 6, title: '项目汇报与复盘', duration: 60 }
      ],
      icon: <Sparkles className="w-10 h-10" />,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      tags: ['项目实战', '综合应用', '就业准备'],
      whatYouLearn: [
        '掌握企业级数据分析项目的完整流程',
        '学会与业务方有效沟通需求',
        '能够独立完成数据采集、清洗、分析全流程',
        '掌握常用的数据分析方法和模型',
        '学会撰写专业的数据分析报告',
        '积累真实的项目经验，提升就业竞争力'
      ],
      requirements: ['需要具备Python和SQL基础', '了解基本的数据分析概念', '建议完成其他核心课程后再学习']
    }
  ]

  const course = coursesData.find(c => c.id === courseId)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">课程不存在</h2>
          <p className="text-gray-500 mb-6">抱歉，您访问的课程不存在或已被下架</p>
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            返回课程中心
          </Link>
        </div>
      </div>
    )
  }

  const categoryNames: Record<string, string> = {
    basic: '基础入门',
    core: '核心技能',
    advanced: '项目实战'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/courses"
              className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回课程中心
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-orange-600">首页</Link>
              <span className="mx-2">/</span>
              <Link to="/courses" className="hover:text-orange-600">课程中心</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{course.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 课程头部 */}
        <div className={`${course.bgColor} rounded-2xl p-8 mb-8 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 ${course.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`inline-flex p-4 rounded-2xl bg-white shadow-lg ${course.color}`}>
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.color} bg-white`}>
                    {course.level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${course.color} bg-white/50`}>
                    {categoryNames[course.category]}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{course.title}</h1>
                <p className="text-gray-600 leading-relaxed max-w-3xl">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}课时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    <span>{course.lessons.length}章节</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.students}人在学</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  to={`/learning/${course.category}/${course.id}/1`}
                  className={`inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${course.color.replace('text-', 'from-').replace('-600', '-500')} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  开始学习
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 学习收获 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className={`w-5 h-5 mr-2 ${course.color}`} />
                你将学到
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 ${course.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 课程大纲 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Book className={`w-5 h-5 mr-2 ${course.color}`} />
                课程大纲
              </h2>
              <div className="space-y-3">
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/learning/${course.category}/${course.id}/${lesson.id}`}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 ${course.borderColor} hover:${course.bgColor} transition-all group`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${course.color} bg-white border-2 ${course.borderColor}`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}分钟</span>
                        </div>
                      </div>
                    </div>
                    <PlayCircle className={`w-6 h-6 ${course.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </Link>
                ))}
              </div>
            </div>

            {/* 技能标签 */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">技能标签</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${course.color} ${course.bgColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">课程要求</h2>
              <ul className="space-y-3">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to={`/learning/${course.category}/${course.id}/1`}
                  className={`block w-full text-center px-6 py-3 bg-gradient-to-r ${course.color.replace('text-', 'from-').replace('-600', '-500')} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                >
                  开始学习
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
