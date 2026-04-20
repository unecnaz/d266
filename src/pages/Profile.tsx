import React from 'react'
import { User, Book, Award, Settings, BarChart2, Calendar, CheckCircle } from 'lucide-react'

const Profile: React.FC = () => {
  // 模拟用户数据
  const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    role: '学生',
    joinDate: '2023-09-01',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20avatar%20portrait%20of%20a%20young%20student&image_size=square'
  }

  // 学习进度数据
  const learningProgress = [
    {
      courseId: 'python-basics',
      courseName: 'Python基础',
      progress: 75,
      completedLessons: 9,
      totalLessons: 12,
      status: '进行中'
    },
    {
      courseId: 'data-collection',
      courseName: '数据采集与处理',
      progress: 40,
      completedLessons: 4,
      totalLessons: 10,
      status: '进行中'
    },
    {
      courseId: 'data-visualization',
      courseName: '数据可视化',
      progress: 100,
      completedLessons: 8,
      totalLessons: 8,
      status: '已完成'
    }
  ]

  // 成就数据
  const achievements = [
    {
      id: 1,
      name: 'Python基础达人',
      description: '完成Python基础课程',
      icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gold%20medal%20badge%20for%20python%20programming&image_size=square',
      rarity: '银级',
      earnedAt: '2023-10-15'
    },
    {
      id: 2,
      name: '数据可视化专家',
      description: '完成数据可视化课程',
      icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gold%20medal%20badge%20for%20data%20visualization&image_size=square',
      rarity: '金级',
      earnedAt: '2023-11-20'
    },
    {
      id: 3,
      name: '练习能手',
      description: '完成10个Python练习题',
      icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=gold%20medal%20badge%20for%20practice&image_size=square',
      rarity: '铜级',
      earnedAt: '2023-12-05'
    }
  ]

  // 技能雷达图数据
  const skills = [
    { name: 'Python编程', value: 80 },
    { name: '数据采集', value: 60 },
    { name: '数据可视化', value: 90 },
    { name: 'SQL查询', value: 70 },
    { name: '报告撰写', value: 65 }
  ]

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">个人中心</h1>
        <p className="text-gray-600">查看你的学习进度、成就和个人资料</p>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={userData.avatar} 
              alt={userData.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <User size={16} className="mr-2 text-gray-500" />
                <span className="text-gray-700">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Settings size={16} className="mr-2 text-gray-500" />
                <span className="text-gray-700">{userData.role}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span className="text-gray-700">加入时间: {userData.joinDate}</span>
              </div>
              <div className="flex items-center">
                <Award size={16} className="mr-2 text-gray-500" />
                <span className="text-gray-700">成就数量: {achievements.length}</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              编辑资料
            </button>
          </div>
        </div>
      </div>

      {/* 学习进度 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Book size={20} className="mr-2 text-blue-600" />
          学习进度
        </h3>
        <div className="space-y-4">
          {learningProgress.map((course) => (
            <div key={course.courseId}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{course.courseName}</span>
                <span className={`text-sm ${
                  course.status === '已完成' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {course.status} ({course.completedLessons}/{course.totalLessons} 课时)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    course.status === '已完成' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 技能雷达图 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <BarChart2 size={20} className="mr-2 text-blue-600" />
          技能掌握程度
        </h3>
        <div className="h-64 flex items-center justify-center">
          {/* 这里可以集成真实的雷达图库，如Chart.js */}
          <div className="text-center text-gray-500">
            <p>技能雷达图</p>
            <p className="text-sm mt-2">Python编程: 80%</p>
            <p className="text-sm">数据采集: 60%</p>
            <p className="text-sm">数据可视化: 90%</p>
            <p className="text-sm">SQL查询: 70%</p>
            <p className="text-sm">报告撰写: 65%</p>
          </div>
        </div>
      </div>

      {/* 成就系统 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Award size={20} className="mr-2 text-blue-600" />
          我的成就
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src={achievement.icon} 
                    alt={achievement.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{achievement.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      achievement.rarity === '金级' ? 'bg-yellow-100 text-yellow-700' :
                      achievement.rarity === '银级' ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs text-gray-500">{achievement.earnedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile