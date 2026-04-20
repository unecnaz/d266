import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, Book, Code, Database, Award, LogIn, Menu as MenuIcon } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { name: '首页', path: '/', icon: <Book size={18} /> },
    { name: '课程中心', path: '/courses', icon: <Book size={18} /> },
    { name: '学习模块', path: '/learning', icon: <Code size={18} /> },
    { name: '数据资源', path: '/datasets', icon: <Database size={18} /> },
    { name: '个人中心', path: '/profile', icon: <User size={18} /> }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 导航栏 */}
      <header className="bg-[#1E40AF] text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code size={24} />
            <span className="text-xl font-bold">数据分析教育平台</span>
          </div>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-700 text-white'
                    : 'hover:bg-blue-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Link
              to="/login"
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-[#F97316] hover:bg-orange-600 transition-colors"
            >
              <LogIn size={18} />
              <span>登录</span>
            </Link>
          </nav>
          
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800">
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'hover:bg-blue-700 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-md bg-[#F97316] hover:bg-orange-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={18} />
                <span>登录</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 主内容 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">关于我们</h3>
              <p className="text-gray-300">
                专为商务数据分析与应用专业学生设计的在线教育平台，提供完整的课程体系和互动式学习体验。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">快速链接</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">联系我们</h3>
              <p className="text-gray-300">邮箱：contact@data-analysis-edu.com</p>
              <p className="text-gray-300">电话：123-456-7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>© 2026 数据分析教育平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout