import React from 'react'
import { Link } from 'react-router-dom'
import { Book, Code, Database, Award, ChevronRight } from 'lucide-react'

const Home: React.FC = () => {
  // 课程分类数据
  const courseCategories = [
    {
      id: 'basic',
      title: '专业基础课',
      description: '奠定数据分析基础，包括电子商务、市场营销、应用统计和Python基础',
      courses: ['电子商务基础', '市场营销基础', '应用统计', 'Python基础'],
      icon: <Book size={32} />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'core',
      title: '专业核心课',
      description: '掌握核心数据分析技能，包括数据采集、各类管理数据分析和可视化',
      courses: ['数据采集与处理', '销售数据分析', '产品数据分析', '客户数据分析', '数据可视化'],
      icon: <Code size={32} />,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'advanced',
      title: '案例实战与拓展课',
      description: '通过真实案例和项目实践，提升综合分析能力',
      courses: ['智慧商业', '企业真实运营项目', '行业分析报告撰写'],
      icon: <Database size={32} />,
      color: 'bg-orange-100 text-orange-700'
    }
  ]

  // 核心优势
  const coreAdvantages = [
    {
      title: '边学边练同屏实训',
      description: '左侧指导书/视频，右侧实训环境，同步学习和实践',
      icon: <Code size={24} />
    },
    {
      title: '多工具集成沙箱',
      description: 'Python编程、SQL查询、BI工具和数据采集工具的集成环境',
      icon: <Database size={24} />
    },
    {
      title: '真实数据资源',
      description: '多行业、多场景的真实或脱敏数据集，支持预览和下载',
      icon: <Book size={24} />
    },
    {
      title: '成就激励系统',
      description: '徽章、证书和技能认证，激发学习动力',
      icon: <Award size={24} />
    }
  ]

  return (
    <div className="space-y-16">
      {/* 英雄区 */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg overflow-hidden shadow-xl">
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              数据分析在线教育平台
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              专为商务数据分析与应用专业学生设计，提供完整的课程体系和互动式学习体验
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/courses"
                className="px-8 py-3 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center justify-center"
              >
                浏览课程
                <ChevronRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/learning"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-700 font-medium rounded-md transition-colors flex items-center justify-center"
              >
                开始学习
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* 核心优势 */}
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">核心优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreAdvantages.map((advantage, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 课程体系概览 */}
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">课程体系概览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseCategories.map((category) => (
            <Link
              key={category.id}
              to={`/courses/${category.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-2 mb-6">
                    {category.courses.map((course, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <ChevronRight size={16} className="text-blue-500 mr-2" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-blue-700 font-medium flex items-center group-hover:translate-x-2 transition-transform">
                    查看课程
                    <ChevronRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 学习路径图 */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">技能学习路径图</h2>
        <div className="relative">
          {/* 路径线 */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
          
          {/* 路径步骤 */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4 md:ml-auto">1</div>
                <h3 className="text-xl font-bold mb-2">专业基础</h3>
                <p className="text-gray-600">学习电子商务、市场营销、应用统计和Python基础，构建数据分析的基础知识体系</p>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white border-2 border-blue-500 w-8 h-8 rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
                <div className="bg-white border-2 border-blue-500 w-8 h-8 rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-1 md:order-2">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">核心技能</h3>
                <p className="text-gray-600">掌握数据采集与处理、各类管理数据分析和数据可视化等核心技能</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4 md:ml-auto">3</div>
                <h3 className="text-xl font-bold mb-2">综合实战</h3>
                <p className="text-gray-600">通过真实案例和项目实践，提升综合分析能力和解决实际问题的能力</p>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="bg-white border-2 border-blue-500 w-8 h-8 rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
                <div className="bg-white border-2 border-blue-500 w-8 h-8 rounded-full absolute left-1/2 transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-1 md:order-2">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h3 className="text-xl font-bold mb-2">技能认证</h3>
                <p className="text-gray-600">获得技能认证和成就徽章，提升就业竞争力</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home