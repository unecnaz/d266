import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Code, Database, Tag, Briefcase, Clock, ChevronLeft, PlayCircle } from 'lucide-react'

const CourseDetail: React.FC = () => {
  const { category, courseId } = useParams<{ category: string; courseId: string }>()

  // 课程数据
  const coursesData = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      description: '了解电子商务的基本概念、发展历程和主要模式，掌握电子商务的核心要素和运作机制。通过本课程的学习，学生将能够理解电子商务的基本原理，掌握电子商务的主要模式和运作流程，为后续的数据分析课程打下基础。',
      category: 'basic',
      level: '初级',
      duration: 24,
      targetJobs: ['数据分析师', '电商运营专员', '市场专员'],
      typicalTasks: ['电商平台数据分析', '用户行为分析', '电商运营策略制定'],
      skillTags: ['电子商务', '商业模式', '市场分析'],
      lessons: [
        { id: 1, title: '电子商务概述', content: '电子商务的定义、发展历程和主要模式' },
        { id: 2, title: '电子商务技术基础', content: '互联网技术、电子支付、物流配送等' },
        { id: 3, title: '电商平台运营', content: '平台规则、运营策略、用户管理' },
        { id: 4, title: '电商数据分析基础', content: '数据指标、分析方法、工具使用' }
      ]
    },
    {
      id: 'python-basics',
      title: 'Python基础',
      description: '掌握Python编程语言的基本语法和数据结构，学习函数、模块、文件操作等核心内容。通过本课程的学习，学生将能够使用Python进行基本的编程和数据处理，为后续的数据分析课程打下坚实的基础。',
      category: 'basic',
      level: '初级',
      duration: 40,
      targetJobs: ['Python开发工程师', '数据分析师', '数据工程师'],
      typicalTasks: ['Python编程', '数据处理', '脚本开发', '自动化工具开发'],
      skillTags: ['Python', '编程基础', '数据处理', '算法'],
      lessons: [
        { id: 1, title: 'Python环境搭建', content: '安装Python、配置开发环境' },
        { id: 2, title: 'Python基础语法', content: '变量、数据类型、运算符、流程控制' },
        { id: 3, title: '函数和模块', content: '函数定义、模块导入、包管理' },
        { id: 4, title: '数据结构', content: '列表、元组、字典、集合' },
        { id: 5, title: '文件操作', content: '文件读写、异常处理' },
        { id: 6, title: '面向对象编程', content: '类、对象、继承、多态' }
      ]
    },
    {
      id: 'data-collection',
      title: '数据采集与处理',
      description: '学习数据采集的方法和工具，掌握网络爬虫、API调用、数据清洗等技能。通过本课程的学习，学生将能够从各种数据源获取数据，并进行清洗和预处理，为后续的数据分析做好准备。',
      category: 'core',
      level: '中级',
      duration: 36,
      targetJobs: ['数据工程师', '数据分析师', '爬虫工程师'],
      typicalTasks: ['网络爬虫开发', '数据清洗', '数据预处理', 'API集成'],
      skillTags: ['Python爬虫', '数据采集', '数据清洗', 'API调用'],
      lessons: [
        { id: 1, title: '数据采集概述', content: '数据源类型、采集方法、伦理规范' },
        { id: 2, title: '网络爬虫基础', content: 'HTTP请求、HTML解析、XPath、CSS选择器' },
        { id: 3, title: 'Scrapy框架', content: 'Scrapy架构、爬虫开发、反爬策略' },
        { id: 4, title: 'API数据获取', content: 'RESTful API、认证、速率限制' },
        { id: 5, title: '数据清洗', content: '缺失值处理、异常值检测、数据转换' },
        { id: 6, title: '数据存储', content: 'CSV、JSON、数据库存储' }
      ]
    },
    {
      id: 'data-visualization',
      title: '数据可视化',
      description: '学习数据可视化的原理和方法，掌握使用Python库和BI工具创建有效数据可视化的技能。通过本课程的学习，学生将能够将复杂的数据转化为清晰、直观的可视化图表，有效地传达数据洞察。',
      category: 'core',
      level: '中级',
      duration: 32,
      targetJobs: ['数据可视化工程师', '数据分析师', '商业智能分析师'],
      typicalTasks: ['数据可视化设计', '仪表盘构建', '报表生成', '数据故事讲述'],
      skillTags: ['数据可视化', 'Matplotlib', '九数云BI', '数据报表'],
      lessons: [
        { id: 1, title: '数据可视化基础', content: '可视化原则、图表类型、色彩理论' },
        { id: 2, title: 'Matplotlib库', content: '基本图表、自定义样式、多子图' },
        { id: 3, title: 'Seaborn库', content: '统计图表、分类数据可视化' },
        { id: 4, title: 'Plotly库', content: '交互式图表、仪表盘' },
        { id: 5, title: '九数云BI工具', content: '拖拽式可视化、仪表盘搭建' },
        { id: 6, title: '可视化最佳实践', content: '数据故事讲述、受众分析、效果评估' }
      ]
    },
    {
      id: 'real-projects',
      title: '企业真实运营项目',
      description: '参与企业真实运营项目，从数据获取、清洗、分析到可视化报告撰写的全流程实践。通过本课程的学习，学生将能够运用所学技能解决实际商业问题，积累项目经验，提升就业竞争力。',
      category: 'advanced',
      level: '高级',
      duration: 48,
      targetJobs: ['数据分析师', '业务分析师', '商业智能分析师'],
      typicalTasks: ['全流程数据分析', '项目管理', '报告撰写', '业务决策支持'],
      skillTags: ['项目实践', '全流程分析', '报告撰写', '业务洞察'],
      lessons: [
        { id: 1, title: '项目规划', content: '项目目标、需求分析、时间规划' },
        { id: 2, title: '数据获取与清洗', content: '数据源确定、数据采集、数据预处理' },
        { id: 3, title: '数据分析', content: ' exploratory analysis、统计分析、建模' },
        { id: 4, title: '数据可视化', content: '图表设计、仪表盘构建' },
        { id: 5, title: '报告撰写', content: '分析报告结构、数据故事讲述、专业表达' },
        { id: 6, title: '项目展示', content: '演讲技巧、Q&A准备、反馈处理' }
      ]
    }
  ]

  // 找到当前课程
  const course = coursesData.find(c => c.id === courseId)

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">课程不存在</h2>
        <Link to="/courses" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ChevronLeft size={18} className="mr-1" />
          返回课程列表
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 面包屑导航 */}
      <div className="flex items-center text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">首页</Link>
        <ChevronLeft size={16} className="mx-2" />
        <Link to="/courses" className="hover:text-blue-600">课程中心</Link>
        <ChevronLeft size={16} className="mx-2" />
        <Link to={`/courses/${category}`} className="hover:text-blue-600">
          {category === 'basic' ? '专业基础课' :
           category === 'core' ? '专业核心课' :
           '案例实战与拓展课'}
        </Link>
        <ChevronLeft size={16} className="mx-2" />
        <span className="text-gray-700">{course.title}</span>
      </div>

      {/* 课程标题和基本信息 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-3 py-1 rounded-full ${
                course.level === '初级' ? 'bg-green-100 text-green-700' :
                course.level === '中级' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {course.level}
              </span>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                <span>{course.duration} 课时</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Book size={16} className="mr-1" />
                <span>
                  {category === 'basic' ? '专业基础课' :
                   category === 'core' ? '专业核心课' :
                   '案例实战与拓展课'}
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/learning"
            className="mt-4 md:mt-0 px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center"
          >
            <PlayCircle size={18} className="mr-2" />
            开始学习
          </Link>
        </div>

        {/* 课程描述 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">课程描述</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>

        {/* 目标岗位和典型工作任务 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Briefcase size={18} className="mr-2 text-blue-600" />
              目标岗位
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.targetJobs.map((job, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {job}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Tag size={18} className="mr-2 text-blue-600" />
              典型工作任务
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.typicalTasks.map((task, index) => (
                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {task}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 技能标签 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Code size={18} className="mr-2 text-blue-600" />
            技能标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {course.skillTags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 课程章节 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Book size={18} className="mr-2 text-blue-600" />
            课程章节
          </h3>
          <div className="space-y-3">
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    {lesson.id}
                  </div>
                  <span className="font-medium">{lesson.title}</span>
                </div>
                <PlayCircle size={20} className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail