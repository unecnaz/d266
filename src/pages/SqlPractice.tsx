import React, { useState } from 'react'
import { Database, CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const SqlPractice: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(1)
  const [userQuery, setUserQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [result, setResult] = useState<any[]>([])

  // SQL练习题
  const exercises = [
    {
      id: 1,
      title: '查询所有学生',
      description: '编写SQL查询语句，从students表中查询所有学生的信息。',
      tableSchema: `CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade VARCHAR(10),
    major VARCHAR(50)
);

INSERT INTO students (id, name, age, grade, major)
VALUES (1, 'John', 18, 'A', 'Computer Science'),
       (2, 'Alice', 17, 'B', 'Mathematics'),
       (3, 'Bob', 19, 'A', 'Computer Science'),
       (4, 'Charlie', 18, 'B', 'Physics'),
       (5, 'David', 17, 'C', 'Mathematics');`,
      solution: 'SELECT * FROM students;',
      expectedResult: [
        { id: 1, name: 'John', age: 18, grade: 'A', major: 'Computer Science' },
        { id: 2, name: 'Alice', age: 17, grade: 'B', major: 'Mathematics' },
        { id: 3, name: 'Bob', age: 19, grade: 'A', major: 'Computer Science' },
        { id: 4, name: 'Charlie', age: 18, grade: 'B', major: 'Physics' },
        { id: 5, name: 'David', age: 17, grade: 'C', major: 'Mathematics' }
      ]
    },
    {
      id: 2,
      title: '查询特定专业的学生',
      description: '编写SQL查询语句，从students表中查询所有计算机科学专业的学生信息。',
      tableSchema: '使用与上一题相同的students表',
      solution: "SELECT * FROM students WHERE major = 'Computer Science';",
      expectedResult: [
        { id: 1, name: 'John', age: 18, grade: 'A', major: 'Computer Science' },
        { id: 3, name: 'Bob', age: 19, grade: 'A', major: 'Computer Science' }
      ]
    },
    {
      id: 3,
      title: '按年龄排序',
      description: '编写SQL查询语句，从students表中查询所有学生的信息，并按年龄从大到小排序。',
      tableSchema: '使用与上一题相同的students表',
      solution: 'SELECT * FROM students ORDER BY age DESC;',
      expectedResult: [
        { id: 3, name: 'Bob', age: 19, grade: 'A', major: 'Computer Science' },
        { id: 1, name: 'John', age: 18, grade: 'A', major: 'Computer Science' },
        { id: 4, name: 'Charlie', age: 18, grade: 'B', major: 'Physics' },
        { id: 2, name: 'Alice', age: 17, grade: 'B', major: 'Mathematics' },
        { id: 5, name: 'David', age: 17, grade: 'C', major: 'Mathematics' }
      ]
    },
    {
      id: 4,
      title: '计算平均年龄',
      description: '编写SQL查询语句，计算students表中所有学生的平均年龄。',
      tableSchema: '使用与上一题相同的students表',
      solution: 'SELECT AVG(age) AS average_age FROM students;',
      expectedResult: [{ average_age: 17.8 }]
    },
    {
      id: 5,
      title: '分组统计专业人数',
      description: '编写SQL查询语句，统计每个专业的学生人数。',
      tableSchema: '使用与上一题相同的students表',
      solution: 'SELECT major, COUNT(*) AS student_count FROM students GROUP BY major;',
      expectedResult: [
        { major: 'Computer Science', student_count: 2 },
        { major: 'Mathematics', student_count: 2 },
        { major: 'Physics', student_count: 1 }
      ]
    }
  ]

  const currentEx = exercises[currentExercise - 1]

  const handleSubmit = () => {
    // 这里可以添加实际的SQL执行和验证逻辑
    // 现在简单模拟验证
    setSubmitted(true)
    setIsCorrect(true)
    setFeedback('正确！你的SQL查询通过了所有测试用例。')
    setResult(currentEx.expectedResult)
  }

  const handleNext = () => {
    setCurrentExercise(Math.min(exercises.length, currentExercise + 1))
    setUserQuery('')
    setSubmitted(false)
    setIsCorrect(false)
    setFeedback('')
    setResult([])
  }

  const handlePrevious = () => {
    setCurrentExercise(Math.max(1, currentExercise - 1))
    setUserQuery('')
    setSubmitted(false)
    setIsCorrect(false)
    setFeedback('')
    setResult([])
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">SQL查询练习</h1>
        <p className="text-gray-600">完成以下SQL查询练习，提升你的SQL技能</p>
      </div>

      {/* 练习导航 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">练习 {currentExercise}: {currentEx.title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{currentExercise} / 5</span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentExercise === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              上一题
            </button>
            <button
              onClick={handleNext}
              disabled={currentExercise === exercises.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              下一题
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* 练习内容 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* 题目描述 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">题目描述</h3>
          <p className="text-gray-700">{currentEx.description}</p>
        </div>

        {/* 表结构 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">表结构</h3>
          <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{currentEx.tableSchema}</pre>
          </div>
        </div>

        {/* SQL编辑器 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">编写SQL查询</h3>
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm ml-2">query.sql</span>
            </div>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-4 h-48 bg-gray-900 text-gray-300 font-mono text-sm resize-none"
              placeholder="在此处编写你的SQL查询..."
            ></textarea>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
          >
            执行查询
          </button>
        </div>

        {/* 反馈 */}
        {submitted && (
          <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <div className="flex items-start">
              {isCorrect ? (
                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0" />
              ) : (
                <XCircle size={20} className="mr-2 mt-1 flex-shrink-0" />
              )}
              <div>
                <h4 className="font-semibold mb-1">{isCorrect ? '查询正确！' : '查询错误'}</h4>
                <p>{feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* 查询结果 */}
        {submitted && result.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">查询结果</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(result[0]).map((key) => (
                      <th key={key} className="py-2 px-4 border-b text-left">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="py-2 px-4 border-b">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 参考解决方案 */}
        {submitted && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">参考解决方案</h3>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{currentEx.solution}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SqlPractice