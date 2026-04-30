import React, { useState, useEffect, useRef } from 'react'
import { Play, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react'
import { loadPyodide } from 'pyodide'

const PythonTraining: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(1)
  const [code, setCode] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [pyodideReady, setPyodideReady] = useState<boolean>(false)
  const [showSolution, setShowSolution] = useState<boolean>(false)
  const pyodideRef = useRef<any>(null)

  const exercises = [
    {
      id: 1,
      title: '销售数据统计',
      description: '计算销售总额、平均销售额、最高销售额和最低销售额',
      hints: ['使用Pandas的sum()函数计算总额', '使用mean()函数计算平均值', '使用max()和min()函数找出最值'],
      template: `import pandas as pd

# 示例销售数据
sales_data = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'product': ['A', 'B', 'A', 'C', 'B'],
    'sales': [1000, 1500, 1200, 800, 1300]
})

# 计算销售总额
total_sales = sales_data['sales'].sum()

# 计算平均销售额
avg_sales = sales_data['sales'].mean()

# 计算最高销售额
max_sales = sales_data['sales'].max()

# 计算最低销售额
min_sales = sales_data['sales'].min()

# 输出结果
print(f"销售总额: {total_sales}")
print(f"平均销售额: {avg_sales}")
print(f"最高销售额: {max_sales}")
print(f"最低销售额: {min_sales}")`,
      solution: `import pandas as pd

sales_data = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'product': ['A', 'B', 'A', 'C', 'B'],
    'sales': [1000, 1500, 1200, 800, 1300]
})

total_sales = sales_data['sales'].sum()
avg_sales = sales_data['sales'].mean()
max_sales = sales_data['sales'].max()
min_sales = sales_data['sales'].min()

print(f"销售总额: {total_sales}")
print(f"平均销售额: {avg_sales}")
print(f"最高销售额: {max_sales}")
print(f"最低销售额: {min_sales}")`,
      expected: '销售总额: 5800, 平均销售额: 1160.0, 最高销售额: 1500, 最低销售额: 800'
    },
    {
      id: 2,
      title: '客户购买行为分析',
      description: '分析每个客户的购买次数和平均客单价',
      hints: ['使用groupby对客户ID分组', '使用agg聚合函数', '计算平均客单价=总金额/购买次数'],
      template: `import pandas as pd

# 客户购买数据
customer_data = pd.DataFrame({
    'customer_id': [101, 102, 101, 103, 102, 101, 103],
    'purchase_date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
    'amount': [200, 300, 150, 400, 250, 350, 100]
})

# 按客户ID分组，计算购买次数和总金额
customer_analysis = customer_data.groupby('customer_id').agg({
    'purchase_date': 'count',
    'amount': 'sum'
}).rename(columns={'purchase_date': 'purchase_count', 'amount': 'total_amount'})

# 计算平均客单价
customer_analysis['avg_order_value'] = customer_analysis['total_amount'] / customer_analysis['purchase_count']

print("客户购买行为分析:")
print(customer_analysis)`,
      solution: `import pandas as pd

customer_data = pd.DataFrame({
    'customer_id': [101, 102, 101, 103, 102, 101, 103],
    'purchase_date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
    'amount': [200, 300, 150, 400, 250, 350, 100]
})

customer_analysis = customer_data.groupby('customer_id').agg({
    'purchase_date': 'count',
    'amount': 'sum'
}).rename(columns={'purchase_date': 'purchase_count', 'amount': 'total_amount'})

customer_analysis['avg_order_value'] = customer_analysis['total_amount'] / customer_analysis['purchase_count']

print("客户购买行为分析:")
print(customer_analysis)`,
      expected: '客户101购买3次，总金额700，客单价约233.33'
    },
    {
      id: 3,
      title: '产品销售排名',
      description: '对产品按销售额进行排序和排名',
      hints: ['使用sort_values排序', '使用rank函数排名', '设置ascending=False降序'],
      template: `import pandas as pd

# 产品销售数据
product_sales = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

# 按销售额降序排序
sorted_products = product_sales.sort_values('sales', ascending=False)

# 添加排名
sorted_products['rank'] = sorted_products['sales'].rank(ascending=False, method='dense')

print("产品销售排名:")
print(sorted_products)`,
      solution: `import pandas as pd

product_sales = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

sorted_products = product_sales.sort_values('sales', ascending=False)
sorted_products['rank'] = sorted_products['sales'].rank(ascending=False, method='dense')

print("产品销售排名:")
print(sorted_products)`,
      expected: 'Product D排名第一，销售额18000'
    },
    {
      id: 4,
      title: '月度销售趋势',
      description: '分析月度销售趋势并计算增长率',
      hints: ['使用pct_change计算增长率', '处理日期数据', '注意首月增长率为NaN'],
      template: `import pandas as pd

# 月度销售数据
sales_trend = pd.DataFrame({
    'month': ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'],
    'sales': [10000, 12000, 15000, 13000, 16000, 18000]
})

# 计算月度增长率
sales_trend['growth_rate'] = sales_trend['sales'].pct_change() * 100

print("月度销售趋势分析:")
print(sales_trend)`,
      solution: `import pandas as pd

sales_trend = pd.DataFrame({
    'month': ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'],
    'sales': [10000, 12000, 15000, 13000, 16000, 18000]
})

sales_trend['growth_rate'] = sales_trend['sales'].pct_change() * 100

print("月度销售趋势分析:")
print(sales_trend)`,
      expected: '平均月度增长率约为18.85%'
    },
    {
      id: 5,
      title: '客户分群分析',
      description: '根据消费金额将客户分为不同群体',
      hints: ['使用pd.cut进行分箱', '定义分箱边界bins', '设置标签labels'],
      template: `import pandas as pd

# 客户数据
customer_data = pd.DataFrame({
    'customer_id': range(1, 11),
    'total_spend': [500, 1200, 200, 2500, 800, 3000, 900, 2000, 1800, 2800]
})

# 定义消费金额分箱边界并为客户分组
spend_bins = [0, 1000, 2000, float('inf')]
spend_labels = ['低消费', '中等消费', '高消费']
customer_data['segment'] = pd.cut(customer_data['total_spend'], bins=spend_bins, labels=spend_labels)

print("客户分群结果:")
print(customer_data)`,
      solution: `import pandas as pd

customer_data = pd.DataFrame({
    'customer_id': range(1, 11),
    'total_spend': [500, 1200, 200, 2500, 800, 3000, 900, 2000, 1800, 2800]
})

spend_bins = [0, 1000, 2000, float('inf')]
spend_labels = ['低消费', '中等消费', '高消费']
customer_data['segment'] = pd.cut(customer_data['total_spend'], bins=spend_bins, labels=spend_labels)

print("客户分群结果:")
print(customer_data)`,
      expected: '低消费4人，中等消费3人，高消费3人'
    },
    {
      id: 6,
      title: '库存周转率计算',
      description: '计算产品的库存周转率',
      hints: ['库存周转率 = 销售成本 / 平均库存', '平均库存 = (期初库存 + 期末库存) / 2'],
      template: `import pandas as pd

# 库存数据
inventory_data = pd.DataFrame({
    'product': ['A', 'B', 'C', 'D'],
    'beginning_inventory': [100, 150, 200, 120],
    'ending_inventory': [80, 120, 180, 100],
    'cost_of_sales': [5000, 8000, 10000, 6000]
})

# 计算平均库存
inventory_data['avg_inventory'] = (inventory_data['beginning_inventory'] + inventory_data['ending_inventory']) / 2

# 计算库存周转率
inventory_data['turnover_rate'] = inventory_data['cost_of_sales'] / inventory_data['avg_inventory']

print("库存周转率分析:")
print(inventory_data[['product', 'avg_inventory', 'turnover_rate']])`,
      solution: `import pandas as pd

inventory_data = pd.DataFrame({
    'product': ['A', 'B', 'C', 'D'],
    'beginning_inventory': [100, 150, 200, 120],
    'ending_inventory': [80, 120, 180, 100],
    'cost_of_sales': [5000, 8000, 10000, 6000]
})

inventory_data['avg_inventory'] = (inventory_data['beginning_inventory'] + inventory_data['ending_inventory']) / 2
inventory_data['turnover_rate'] = inventory_data['cost_of_sales'] / inventory_data['avg_inventory']

print("库存周转率分析:")
print(inventory_data[['product', 'avg_inventory', 'turnover_rate']])`,
      expected: '产品A周转率约55.56，产品B约59.26'
    },
    {
      id: 7,
      title: '市场份额计算',
      description: '计算各产品的市场份额',
      hints: ['计算总销售额', '计算各产品占比 = 产品销售额/总销售额*100', '按份额降序排列'],
      template: `import pandas as pd

# 市场销售数据
market_data = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'brand': ['Brand X', 'Brand X', 'Brand Y', 'Brand Y', 'Brand Z'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

# 计算总销售额
total_sales = market_data['sales'].sum()

# 计算市场份额
market_data['market_share'] = (market_data['sales'] / total_sales) * 100

print("产品市场份额:")
print(market_data[['product', 'sales', 'market_share']].sort_values('market_share', ascending=False))`,
      solution: `import pandas as pd

market_data = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'brand': ['Brand X', 'Brand X', 'Brand Y', 'Brand Y', 'Brand Z'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

total_sales = market_data['sales'].sum()
market_data['market_share'] = (market_data['sales'] / total_sales) * 100

print("产品市场份额:")
print(market_data[['product', 'sales', 'market_share']].sort_values('market_share', ascending=False))`,
      expected: 'Product D市场份额最高，约26.09%'
    },
    {
      id: 8,
      title: '销售数据过滤',
      description: '筛选出销售额大于1000的记录',
      hints: ['使用布尔索引进行筛选', 'sales > 1000', '查看筛选结果'],
      template: `import pandas as pd

# 销售数据
sales_data = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'product': ['A', 'B', 'A', 'C', 'B'],
    'sales': [1000, 1500, 1200, 800, 1300]
})

# 筛选出销售额大于1000的记录
filtered_sales = sales_data[sales_data['sales'] > 1000]

print("销售额大于1000的记录:")
print(filtered_sales)`,
      solution: `import pandas as pd

sales_data = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'product': ['A', 'B', 'A', 'C', 'B'],
    'sales': [1000, 1500, 1200, 800, 1300]
})

filtered_sales = sales_data[sales_data['sales'] > 1000]

print("销售额大于1000的记录:")
print(filtered_sales)`,
      expected: '筛选出3条销售额大于1000的记录'
    },
    {
      id: 9,
      title: '数据合并',
      description: '合并两个DataFrame数据',
      hints: ['使用merge函数合并数据', '指定合并键key', '注意合并方式'],
      template: `import pandas as pd

# 产品数据
products = pd.DataFrame({
    'product_id': [1, 2, 3, 4],
    'product_name': ['A', 'B', 'C', 'D'],
    'category': ['电子产品', '服装', '电子产品', '食品']
})

# 销售数据
sales = pd.DataFrame({
    'product_id': [1, 2, 2, 3, 4],
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'quantity': [10, 20, 15, 5, 25]
})

# 合并产品数据和销售数据
merged_data = pd.merge(sales, products, on='product_id')

print("合并后的数据:")
print(merged_data)`,
      solution: `import pandas as pd

products = pd.DataFrame({
    'product_id': [1, 2, 3, 4],
    'product_name': ['A', 'B', 'C', 'D'],
    'category': ['电子产品', '服装', '电子产品', '食品']
})

sales = pd.DataFrame({
    'product_id': [1, 2, 2, 3, 4],
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'quantity': [10, 20, 15, 5, 25]
})

merged_data = pd.merge(sales, products, on='product_id')

print("合并后的数据:")
print(merged_data)`,
      expected: '成功合并两个DataFrame，显示产品名称和类别'
    },
    {
      id: 10,
      title: '营销活动ROI分析',
      description: '计算各营销活动的投资回报率',
      hints: ['ROI = (收益 - 成本) / 成本 * 100%', '计算利润=收益-成本', '按ROI排序'],
      template: `import pandas as pd

# 营销活动数据
campaigns = pd.DataFrame({
    'campaign': ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'],
    'cost': [5000, 8000, 3000, 10000, 6000],
    'revenue': [20000, 30000, 12000, 35000, 25000]
})

# 计算利润
campaigns['profit'] = campaigns['revenue'] - campaigns['cost']

# 计算ROI
campaigns['roi'] = ((campaigns['revenue'] - campaigns['cost']) / campaigns['cost']) * 100

# 按ROI排序
sorted_campaigns = campaigns.sort_values('roi', ascending=False)

print("营销活动ROI分析:")
print(sorted_campaigns[['campaign', 'cost', 'revenue', 'profit', 'roi']])`,
      solution: `import pandas as pd

campaigns = pd.DataFrame({
    'campaign': ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'],
    'cost': [5000, 8000, 3000, 10000, 6000],
    'revenue': [20000, 30000, 12000, 35000, 25000]
})

campaigns['profit'] = campaigns['revenue'] - campaigns['cost']
campaigns['roi'] = ((campaigns['revenue'] - campaigns['cost']) / campaigns['cost']) * 100
sorted_campaigns = campaigns.sort_values('roi', ascending=False)

print("营销活动ROI分析:")
print(sorted_campaigns[['campaign', 'cost', 'revenue', 'profit', 'roi']])`,
      expected: 'Campaign C效果最好，ROI约300%'
    }
  ]

  const currentEx = exercises[currentExercise - 1]

  useEffect(() => {
    const initPyodide = async () => {
      try {
        setIsRunning(true)
        setOutput('正在加载Python环境...')
        
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/'
        })
        pyodideRef.current = pyodide
        
        setOutput('正在加载Pandas...')
        await pyodide.loadPackage(['pandas'])
        
        setPyodideReady(true)
        setOutput('✓ Python环境准备就绪！可以开始编写代码。')
      } catch (error) {
        console.error('Pyodide初始化失败:', error)
        setOutput(`错误：Python环境初始化失败。请检查网络连接后刷新页面重试。`)
      } finally {
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
    setIsRunning(true)
    setOutput('')

    try {
      if (!pyodideReady || !pyodideRef.current) {
        setOutput('错误：Python环境未准备就绪，请等待初始化完成。')
        setIsRunning(false)
        return
      }

      let stdoutContent = ''
      let stderrContent = ''

      const originalPrint = pyodideRef.current.globals.get('print')
      
      pyodideRef.current.globals.set('print', (...args: any[]) => {
        const str = args.map(arg => String(arg)).join(' ')
        stdoutContent += str + '\n'
      })

      try {
        await pyodideRef.current.runPythonAsync(code)
      } catch (err: any) {
        stderrContent = String(err)
      } finally {
        pyodideRef.current.globals.set('print', originalPrint)
      }

      let output = ''
      if (stdoutContent) output += stdoutContent
      if (stderrContent) {
        if (output) output += '\n'
        output += '错误信息:\n' + stderrContent
      }

      if (output === '') {
        output = '代码执行成功，但没有输出结果。'
      }

      setOutput(output)
    } catch (error) {
      setOutput(`错误：${error instanceof Error ? error.message : String(error)}`)
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Python编程训练</h1>
        <p className="text-gray-600">完成以下10道商务数据分析Python练习题，代码可直接运行</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">练习 {currentExercise}: {currentEx.title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{currentExercise} / 10</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentExercise(Math.max(1, currentExercise - 1))}
              disabled={currentExercise === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              上一题
            </button>
            <button
              onClick={() => setCurrentExercise(Math.min(exercises.length, currentExercise + 1))}
              disabled={currentExercise === exercises.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              下一题
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
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
                <button
                  onClick={handleReset}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
                >
                  <RotateCcw size={14} className="mr-1" />
                  重置
                </button>
                <button
                  onClick={handleShowSolution}
                  className="px-3 py-1 bg-green-200 text-green-700 rounded-md hover:bg-green-300 transition-colors text-sm"
                >
                  {showSolution ? '隐藏答案' : '显示答案'}
                </button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-md overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-sm ml-2">solution.py</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 h-64 bg-gray-900 text-gray-300 font-mono text-sm resize-none focus:outline-none"
                placeholder="在此处编写代码..."
              ></textarea>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleRunCode}
                disabled={isRunning || !pyodideReady}
                className="px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    运行中...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    运行代码
                  </>
                )}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">输出结果</h4>
              <div className="bg-gray-900 rounded-md p-4 min-h-[100px]">
                {output ? (
                  <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{output}</pre>
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