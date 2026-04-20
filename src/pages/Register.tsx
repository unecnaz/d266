import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, School, CheckCircle } from 'lucide-react'

const Register: React.FC = () => {
  const [userType, setUserType] = useState('student') // student 或 teacher
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // 验证表单
    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有必填字段')
      setIsLoading(false)
      return
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      setIsLoading(false)
      return
    }
    
    if (userType === 'teacher' && !inviteCode) {
      setError('教师注册需要邀请码')
      setIsLoading(false)
      return
    }
    
    // 模拟注册验证
    setTimeout(() => {
      setIsLoading(false)
      // 注册成功，跳转到登录页面
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">注册</h1>
          <p className="text-gray-600">创建账号开始你的学习之旅</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`flex-1 py-2 ${userType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setUserType('student')}
            >
              学生注册
            </button>
            <button
              className={`flex-1 py-2 ${userType === 'teacher' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setUserType('teacher')}
            >
              教师注册
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">姓名</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                className="w-full p-2 pl-10 border rounded-md"
                placeholder="请输入姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">邮箱</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className="w-full p-2 pl-10 border rounded-md"
                placeholder="请输入邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">密码</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className="w-full p-2 pl-10 border rounded-md"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">确认密码</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className="w-full p-2 pl-10 border rounded-md"
                placeholder="请确认密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {userType === 'teacher' && (
            <div>
              <label className="block font-medium mb-1">邀请码</label>
              <div className="relative">
                <School size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full p-2 pl-10 border rounded-md"
                  placeholder="请输入邀请码"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex items-center">
            <input type="checkbox" id="agreement" className="rounded" />
            <label htmlFor="agreement" className="ml-2 text-sm">
              我同意平台的 <a href="#" className="text-blue-600 hover:underline">服务条款</a> 和 <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? '注册中...' : '注册'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            已有账号？ <Link to="/login" className="text-blue-600 hover:underline">立即登录</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register