import React, { useState, useEffect, useRef } from 'react'
import { Play, ChevronRight, ChevronLeft, RotateCcw, ArrowLeft, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

declare global {
  interface Window {
    loadPyodide: any
  }
}

const PythonTraining: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(1)
  const [code, setCode] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [pyodideReady, setPyodideReady] = useState<boolean>(false)
  const [showSolution, setShowSolution] = useState<boolean>(false)
  const [pyodideLoaded, setPyodideLoaded] = useState<boolean>(false)
  const pyodideRef = useRef<any>(null)

  const exercises = [
    {
      id: 1,
      title: '基础计算',
      description: '计算销售总额、平均销售额、最高销售额和最低销售额',
      hints: ['使用sum()计算总额', '使用len()获取长度', '使用max()和min()找出最值'],
      template: '# 计算销售数据\nsales = [1000, 1500, 1200, 800, 1300]\n\n# TODO: 计算销售总额\ntotal = \n\n# TODO: 计算平均销售额\navg = \n\n# TODO: 计算最高销售额\nmax_val = \n\n# TODO: 计算最低销售额\nmin_val = \n\nprint("销售总额:", total)\nprint("平均销售额:", avg)\nprint("最高销售额:", max_val)\nprint("最低销售额:", min_val)',
      solution: '# 计算销售数据\nsales = [1000, 1500, 1200, 800, 1300]\n\n# 计算销售总额\ntotal = sum(sales)\n\n# 计算平均销售额\navg = total / len(sales)\n\n# 计算最高销售额\nmax_val = max(sales)\n\n# 计算最低销售额\nmin_val = min(sales)\n\nprint("销售总额:", total)\nprint("平均销售额:", avg)\nprint("最高销售额:", max_val)\nprint("最低销售额:", min_val)',
      expected: '销售总额: 5800, 平均销售额: 1160.0'
    },
    {
      id: 2,
      title: '列表操作',
      description: '统计产品销售数据',
      hints: ['使用sum()求和', '使用列表推导式筛选', '使用字典统计'],
      template: '# 客户购买数据\nproducts = ["产品A", "产品B", "产品C", "产品A", "产品B"]\nprices = [100, 200, 150, 100, 200]\n\n# TODO: 统计总销售额\ntotal_revenue = \n\n# TODO: 统计产品A的销售额\na_sales = \n\n# TODO: 统计各产品销售数量\nproduct_count = {}\n# 在这里添加代码\n\nprint("总销售额:", total_revenue)\nprint("产品A销售额:", a_sales)\nprint("产品统计:", product_count)',
      solution: '# 客户购买数据\nproducts = ["产品A", "产品B", "产品C", "产品A", "产品B"]\nprices = [100, 200, 150, 100, 200]\n\n# 统计总销售额\ntotal_revenue = sum(prices)\n\n# 统计产品A的销售额\na_sales = sum([prices[i] for i in range(len(products)) if products[i] == "产品A"])\n\n# 统计各产品销售数量\nproduct_count = {}\nfor p in products:\n    if p in product_count:\n        product_count[p] += 1\n    else:\n        product_count[p] = 1\n\nprint("总销售额:", total_revenue)\nprint("产品A销售额:", a_sales)\nprint("产品统计:", product_count)',
      expected: '总销售额: 750, 产品A销售额: 200'
    },
    {
      id: 3,
      title: '条件判断',
      description: '根据销售额判断业绩等级',
      hints: ['if-elif-else条件判断', '>=和<比较运算符', 'f-string格式化'],
      template: '# 根据销售额判断业绩等级\nsales_data = [800, 1200, 2500, 3000, 500, 1800]\n\nfor sales in sales_data:\n    # TODO: 根据销售额设置等级\n    # >=2000: 优秀, >=1500: 良好, >=1000: 合格, 否则: 不合格\n    level = \n    \n    print(f"销售额 {sales} - 等级: {level}")',
      solution: '# 根据销售额判断业绩等级\nsales_data = [800, 1200, 2500, 3000, 500, 1800]\n\nfor sales in sales_data:\n    if sales >= 2000:\n        level = "优秀"\n    elif sales >= 1500:\n        level = "良好"\n    elif sales >= 1000:\n        level = "合格"\n    else:\n        level = "不合格"\n    \n    print(f"销售额 {sales} - 等级: {level}")',
      expected: '根据销售额输出不同等级'
    },
    {
      id: 4,
      title: '字典操作',
      description: '产品库存数据分析',
      hints: ['字典.values()获取所有值', 'max()配合key参数', 'items()遍历字典'],
      template: '# 产品库存数据\ninventory = {\n    "产品A": 50,\n    "产品B": 30,\n    "产品C": 80,\n    "产品D": 20\n}\n\n# TODO: 计算总库存\ntotal_stock = \n\n# TODO: 找出库存最高的产品\nmax_product = \n\n# TODO: 找出库存最低的产品\nmin_product = \n\nprint("总库存量:", total_stock)\nprint(f"库存最高: {max_product} ({inventory[max_product]}件)")\nprint(f"库存最低: {min_product} ({inventory[min_product]}件)")',
      solution: '# 产品库存数据\ninventory = {\n    "产品A": 50,\n    "产品B": 30,\n    "产品C": 80,\n    "产品D": 20\n}\n\n# 计算总库存\ntotal_stock = sum(inventory.values())\n\n# 找出库存最高的产品\nmax_product = max(inventory, key=inventory.get)\n\n# 找出库存最低的产品\nmin_product = min(inventory, key=inventory.get)\n\nprint("总库存量:", total_stock)\nprint(f"库存最高: {max_product} ({inventory[max_product]}件)")\nprint(f"库存最低: {min_product} ({inventory[min_product]}件)")',
      expected: '总库存量: 180, 库存最高: 产品C'
    },
    {
      id: 5,
      title: '函数定义',
      description: '定义函数计算统计数据和ROI',
      hints: ['def定义函数', 'return返回多个值', '函数参数'],
      template: '# 定义计算统计数据的函数\ndef calculate_stats(data):\n    # TODO: 计算总和、平均值、最大值、最小值\n    total = \n    average = \n    max_val = \n    min_val = \n    return total, average, max_val, min_val\n\ndef calculate_roi(revenue, cost):\n    # TODO: 计算利润和ROI\n    profit = \n    roi = \n    return profit, roi\n\n# 使用函数\nsales = [1200, 1500, 1800, 900, 2000, 1600]\ntotal, avg, max_s, min_s = calculate_stats(sales)\nprint(f"销售统计 - 总额:{total}, 平均:{avg}")',
      solution: '# 定义计算统计数据的函数\ndef calculate_stats(data):\n    total = sum(data)\n    average = total / len(data)\n    max_val = max(data)\n    min_val = min(data)\n    return total, average, max_val, min_val\n\ndef calculate_roi(revenue, cost):\n    profit = revenue - cost\n    roi = (profit / cost) * 100\n    return profit, roi\n\n# 使用函数\nsales = [1200, 1500, 1800, 900, 2000, 1600]\ntotal, avg, max_s, min_s = calculate_stats(sales)\nprint(f"销售统计 - 总额:{total}, 平均:{avg}")',
      expected: '销售总额: 9000, 平均: 1500.0'
    },
    {
      id: 6,
      title: '字符串处理',
      description: '解析客户数据并统计',
      hints: ['split()分割字符串', 'int()转换整数', '条件判断'],
      template: '# 客户数据处理\ncustomer_data = "张三,35,男,VIP,15000;李四,28,女,普通,8000;王五,42,男,VIP,25000"\n\n# TODO: 解析数据\ncustomers = \n\nvip_count = 0\nvip_total = 0\nnormal_count = 0\nnormal_total = 0\n\nfor customer in customers:\n    info = customer.split(",")\n    level = info[3]\n    spend = int(info[4])\n    \n    # TODO: 根据等级统计\n    \nprint(f"VIP客户数: {vip_count}人")\nprint(f"VIP总消费: {vip_total}元")',
      solution: '# 客户数据处理\ncustomer_data = "张三,35,男,VIP,15000;李四,28,女,普通,8000;王五,42,男,VIP,25000"\n\n# 解析数据\ncustomers = customer_data.split(";")\n\nvip_count = 0\nvip_total = 0\nnormal_count = 0\nnormal_total = 0\n\nfor customer in customers:\n    info = customer.split(",")\n    level = info[3]\n    spend = int(info[4])\n    \n    if level == "VIP":\n        vip_count += 1\n        vip_total += spend\n    else:\n        normal_count += 1\n        normal_total += spend\n\nprint(f"VIP客户数: {vip_count}人")\nprint(f"VIP总消费: {vip_total}元")',
      expected: 'VIP客户数: 2人, VIP总消费: 40000元'
    },
    {
      id: 7,
      title: '循环与累加',
      description: '月度销售数据分析',
      hints: ['for循环累加', 'max()和min()', '列表索引'],
      template: '# 月度销售数据分析\nmonthly_sales = [15000, 18000, 22000, 19000, 25000, 28000, 24000, 26000, 30000, 28000, 32000, 35000]\nmonths = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]\n\n# TODO: 计算年度总销售额\nyearly_total = 0\n\nprint(f"年度总销售额: {yearly_total}元")\nprint(f"月均销售额: {yearly_total / 12:.0f}元")',
      solution: '# 月度销售数据分析\nmonthly_sales = [15000, 18000, 22000, 19000, 25000, 28000, 24000, 26000, 30000, 28000, 32000, 35000]\nmonths = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]\n\n# 计算年度总销售额\nyearly_total = 0\nfor sales in monthly_sales:\n    yearly_total += sales\n\nprint(f"年度总销售额: {yearly_total}元")\nprint(f"月均销售额: {yearly_total / 12:.0f}元")',
      expected: '年度总销售额: 302000元'
    },
    {
      id: 8,
      title: '数据排序与筛选',
      description: '员工销售数据排名',
      hints: ['sorted()排序', 'lambda表达式', '列表推导式'],
      template: '# 员工销售数据\nemployees = [\n    ("张三", 15000, 85),\n    ("李四", 22000, 92),\n    ("王五", 18000, 78),\n    ("赵六", 25000, 95),\n    ("钱七", 12000, 70),\n    ("孙八", 20000, 88)\n]\n\n# TODO: 按销售额降序排序\nsorted_by_sales = \n\nprint("按销售额排名:")\nfor i, (name, sales, score) in enumerate(sorted_by_sales, 1):\n    print(f"  {i}. {name}: {sales}元")',
      solution: '# 员工销售数据\nemployees = [\n    ("张三", 15000, 85),\n    ("李四", 22000, 92),\n    ("王五", 18000, 78),\n    ("赵六", 25000, 95),\n    ("钱七", 12000, 70),\n    ("孙八", 20000, 88)\n]\n\n# 按销售额降序排序\nsorted_by_sales = sorted(employees, key=lambda x: x[1], reverse=True)\n\nprint("按销售额排名:")\nfor i, (name, sales, score) in enumerate(sorted_by_sales, 1):\n    print(f"  {i}. {name}: {sales}元")',
      expected: '赵六销售额最高(25000元)'
    },
    {
      id: 9,
      title: '文件处理模拟',
      description: '解析CSV格式数据',
      hints: ['split()分割', 'int()转换', '循环处理'],
      template: '# 模拟从CSV文件读取销售数据\ncsv_data = """日期,产品,数量,单价\n2023-01-01,产品A,10,100\n2023-01-01,产品B,5,200\n2023-01-02,产品A,8,100\n2023-01-02,产品C,12,150\n2023-01-03,产品B,15,200\n2023-01-03,产品A,20,100\n"""\n\n# TODO: 解析数据\nlines = \nrows = []\n\nfor line in lines[1:]:\n    fields = line.split(",")\n    quantity = int(fields[2])\n    price = int(fields[3])\n    amount = quantity * price\n    rows.append(amount)\n\n# 计算总销售额\ntotal_amount = sum(rows)\nprint(f"总销售额: {total_amount}元")',
      solution: '# 模拟从CSV文件读取销售数据\ncsv_data = """日期,产品,数量,单价\n2023-01-01,产品A,10,100\n2023-01-01,产品B,5,200\n2023-01-02,产品A,8,100\n2023-01-02,产品C,12,150\n2023-01-03,产品B,15,200\n2023-01-03,产品A,20,100\n"""\n\n# 解析数据\nlines = csv_data.strip().split("\\n")\nrows = []\n\nfor line in lines[1:]:\n    fields = line.split(",")\n    quantity = int(fields[2])\n    price = int(fields[3])\n    amount = quantity * price\n    rows.append(amount)\n\n# 计算总销售额\ntotal_amount = sum(rows)\nprint(f"总销售额: {total_amount}元")',
      expected: '总销售额: 10800元'
    },
    {
      id: 10,
      title: '综合分析',
      description: '商务数据分析报告',
      hints: ['字典统计', '函数封装', '格式化输出'],
      template: '# 综合商务数据分析\nsales_records = [\n    {"date": "2023-01", "region": "华北", "amount": 120000, "orders": 150},\n    {"date": "2023-01", "region": "华东", "amount": 180000, "orders": 220},\n    {"date": "2023-01", "region": "华南", "amount": 150000, "orders": 180},\n]\n\ndef analyze_data(records):\n    region_stats = {}\n    for r in records:\n        region = r["region"]\n        if region not in region_stats:\n            region_stats[region] = {"total": 0, "orders": 0}\n        # TODO: 累加销售额和订单数\n        \n    return region_stats\n\nresult = analyze_data(sales_records)\nprint("区域销售统计:", result)',
      solution: '# 综合商务数据分析\nsales_records = [\n    {"date": "2023-01", "region": "华北", "amount": 120000, "orders": 150},\n    {"date": "2023-01", "region": "华东", "amount": 180000, "orders": 220},\n    {"date": "2023-01", "region": "华南", "amount": 150000, "orders": 180},\n]\n\ndef analyze_data(records):\n    region_stats = {}\n    for r in records:\n        region = r["region"]\n        if region not in region_stats:\n            region_stats[region] = {"total": 0, "orders": 0}\n        region_stats[region]["total"] += r["amount"]\n        region_stats[region]["orders"] += r["orders"]\n    \n    return region_stats\n\nresult = analyze_data(sales_records)\nprint("区域销售统计:", result)',
      expected: '华东地区销售额最高'
    }
  ]

  const currentEx = exercises[currentExercise - 1]

  useEffect(() => {
    const initPyodide = async () => {
      if (pyodideLoaded) return
      
      try {
        setIsRunning(true)
        setOutput('正在加载Python环境，请稍候...')
        
        if (!window.loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js'
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('加载Pyodide失败'))
            document.head.appendChild(script)
          })
        }
        
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
        })
        
        pyodideRef.current = pyodide
        setPyodideReady(true)
        setPyodideLoaded(true)
        setOutput('✓ Python环境已准备就绪！点击"运行代码"开始练习。')
        setIsRunning(false)
      } catch (error: any) {
        setOutput('❌ 加载Python环境失败: ' + error.message)
        setIsRunning(false)
      }
    }
    
    initPyodide()
  }, [])

  useEffect(() => {
    setCode(currentEx.template)
    setOutput('')
    setShowSolution(false)
  }, [currentExercise])

  const handleRunCode = async () => {
    if (!pyodideRef.current || !pyodideReady) {
      setOutput('❌ Python环境还未准备好，请稍候...')
      return
    }

    setIsRunning(true)
    setOutput('代码执行中...')

    try {
      const pyodide = pyodideRef.current
      
      const escapedCode = code.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      const result = await pyodide.runPythonAsync(`
import sys
from io import StringIO

old_stdout = sys.stdout
old_stderr = sys.stderr

sys.stdout = StringIO()
sys.stderr = StringIO()

error_msg = None
try:
    exec('''${escapedCode}''')
except Exception as e:
    error_msg = str(e)

stdout_content = sys.stdout.getvalue()
stderr_content = sys.stderr.getvalue()

sys.stdout = old_stdout
sys.stderr = old_stderr

(stdout_content, stderr_content, error_msg)
      `)

      const stdout = result[0]
      const error_msg = result[2]
      
      let outputContent = ''
      if (stdout) outputContent += stdout
      if (error_msg) outputContent += (outputContent ? '\n\n' : '') + '❌ 错误:\n' + error_msg
      
      if (outputContent === '') {
        outputContent = '✓ 代码执行成功！\n\n(没有输出内容 - 使用print()函数输出结果)'
      }
      
      setOutput(outputContent)
    } catch (error: any) {
      setOutput('❌ 执行异常: ' + error.message)
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(currentEx.template)
    setOutput('')
    setShowSolution(false)
  }

  const handleShowSolution = () => {
    if (showSolution) {
      setCode(currentEx.template)
    } else {
      setCode(currentEx.solution)
    }
    setShowSolution(!showSolution)
  }

  const reloadPyodide = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Python编程训练</h1>
          <p className="text-gray-600">完成以下10道商务数据分析Python练习题</p>
        </div>
        <Link to="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center shadow-md">
          <ArrowLeft size={18} className="mr-2" />
          返回首页
        </Link>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-semibold">练习 {currentExercise}: {currentEx.title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{currentExercise} / 10</span>
          <div className="flex space-x-2">
            <button onClick={() => setCurrentExercise(Math.max(1, currentExercise - 1))} disabled={currentExercise === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
              <ChevronLeft size={16} className="mr-1" />
              上一题
            </button>
            <button onClick={() => setCurrentExercise(Math.min(exercises.length, currentExercise + 1))} disabled={currentExercise === exercises.length} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center">
              下一题
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${pyodideReady ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${pyodideReady ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-spin'}`}></div>
            <span className={pyodideReady ? 'text-green-800' : 'text-yellow-800'}>
              {pyodideReady ? 'Python环境已就绪' : '正在加载Python环境...'}
            </span>
          </div>
          {!pyodideReady && (
            <button onClick={reloadPyodide} disabled={isRunning} className="px-3 py-1 text-sm bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 transition-colors flex items-center">
              <RefreshCw size={14} className="mr-1" />
              重试加载
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">题目描述</h3>
            <p className="text-gray-700 mb-4">{currentEx.description}</p>
            
            <h4 className="font-semibold mb-2">提示</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {currentEx.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>

            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-blue-800 mb-1">预期输出</h4>
              <p className="text-blue-700 text-sm">{currentEx.expected}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">代码编辑器</h3>
              <div className="flex space-x-2">
                <button onClick={handleReset} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm">
                  <RotateCcw size={14} className="mr-1" />
                  重置
                </button>
                <button onClick={handleShowSolution} className={`px-3 py-1 rounded-md transition-colors text-sm ${showSolution ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-200 text-green-700 hover:bg-green-300'}`}>
                  {showSolution ? '隐藏答案' : '显示答案'}
                </button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-md overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-2">exercise_{currentExercise}.py</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-y focus:outline-none min-h-[300px]"
                placeholder="在此处编写Python代码..."
                spellCheck={false}
              ></textarea>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handleRunCode} disabled={isRunning || !pyodideReady} className="px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                {isRunning ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>运行中...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>运行代码</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">输出结果</h4>
              <div className="bg-gray-900 rounded-md p-4 min-h-[150px] max-h-[400px] overflow-y-auto">
                {output ? (
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-gray-500 text-sm">点击"运行代码"查看输出结果</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PythonTraining
