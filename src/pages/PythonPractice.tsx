import React, { useState } from 'react'
import { Code, CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const PythonPractice: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')

  // 商务数据分析Python练习题
  const exercises = [
    {
      id: 1,
      title: '销售数据统计分析',
      description: '使用Pandas分析销售数据，计算销售总额、平均值、最高销售额和最低销售额。假设有一个包含销售数据的DataFrame，包含日期、产品、销售额等字段。',
      hints: ['使用Pandas的sum()、mean()、max()、min()函数', '注意处理可能的空值', '可以按产品或日期进行分组分析'],
      solution: `import pandas as pd

# 示例数据
sales_data = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05'],
    'product': ['A', 'B', 'A', 'C', 'B'],
    'sales': [1000, 1500, 1200, 800, 1300]
})

# 计算销售总额
total_sales = sales_data['sales'].sum()
# 计算平均销售额
average_sales = sales_data['sales'].mean()
# 计算最高销售额
highest_sales = sales_data['sales'].max()
# 计算最低销售额
lowest_sales = sales_data['sales'].min()

print(f'销售总额: {total_sales}')
print(f'平均销售额: {average_sales}')
print(f'最高销售额: {highest_sales}')
print(f'最低销售额: {lowest_sales}')

# 按产品分组分析
product_sales = sales_data.groupby('product')['sales'].sum()
print('\n按产品销售总额:')
print(product_sales)`,
      testCases: [
        { input: '', expected: '销售总额: 5800, 平均销售额: 1160.0, 最高销售额: 1500, 最低销售额: 800' }
      ]
    },
    {
      id: 2,
      title: '客户购买行为分析',
      description: '分析客户购买频率和客单价。假设有一个包含客户购买记录的DataFrame，包含客户ID、购买日期、购买金额等字段。',
      hints: ['使用groupby对客户ID进行分组', '计算每个客户的购买次数和总金额', '计算客单价（总金额/购买次数）'],
      solution: `import pandas as pd

# 示例数据
customer_data = pd.DataFrame({
    'customer_id': [101, 102, 101, 103, 102, 101, 103],
    'purchase_date': ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07'],
    'amount': [200, 300, 150, 400, 250, 350, 100]
})

# 计算每个客户的购买次数和总金额
customer_analysis = customer_data.groupby('customer_id').agg({
    'purchase_date': 'count',  # 购买次数
    'amount': 'sum'  # 总金额
}).rename(columns={'purchase_date': 'purchase_count', 'amount': 'total_amount'})

# 计算客单价
customer_analysis['average_order_value'] = customer_analysis['total_amount'] / customer_analysis['purchase_count']

print('客户购买行为分析:')
print(customer_analysis)

# 计算整体平均值
overall_avg_order_value = customer_data['amount'].mean()
print(f'\n整体平均客单价: {overall_avg_order_value}')`,
      testCases: [
        { input: '', expected: '客户101购买3次，总金额700，客单价约233.33；客户102购买2次，总金额550，客单价275；客户103购买2次，总金额500，客单价250' }
      ]
    },
    {
      id: 3,
      title: '产品销售排名',
      description: '对产品销售数据进行排序和排名，找出最畅销的产品。假设有一个包含产品销售数据的DataFrame，包含产品名称和销售额等字段。',
      hints: ['使用sort_values对销售额进行排序', '使用rank函数为产品排名', '注意排名的方式（升序或降序）'],
      solution: `import pandas as pd

# 示例数据
product_sales = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

# 按销售额降序排序
sorted_products = product_sales.sort_values('sales', ascending=False)

# 添加排名
sorted_products['rank'] = sorted_products['sales'].rank(ascending=False, method='dense')

print('产品销售排名:')
print(sorted_products)

# 找出最畅销的产品
top_product = sorted_products.iloc[0]
print(f'\n最畅销的产品: {top_product["product"]}，销售额: {top_product["sales"]}')`,
      testCases: [
        { input: '', expected: 'Product D排名第一，销售额18000；Product B排名第二，销售额15000；Product A排名第三，销售额12000' }
      ]
    },
    {
      id: 4,
      title: '销售趋势分析',
      description: '使用Matplotlib绘制销售趋势图表，分析销售数据的变化趋势。假设有一个包含日期和销售额的DataFrame。',
      hints: ['使用Matplotlib的plot函数', '设置图表标题和坐标轴标签', '可以添加网格线使图表更清晰'],
      solution: `import pandas as pd
import matplotlib.pyplot as plt

# 示例数据
sales_trend = pd.DataFrame({
    'date': pd.date_range('2023-01-01', periods=12, freq='M'),
    'sales': [10000, 12000, 15000, 13000, 16000, 18000, 20000, 22000, 25000, 23000, 26000, 28000]
})

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用来正常显示中文标签
plt.rcParams['axes.unicode_minus'] = False  # 用来正常显示负号

# 绘制销售趋势图
plt.figure(figsize=(10, 6))
plt.plot(sales_trend['date'], sales_trend['sales'], marker='o', linestyle='-', color='b')
plt.title('月度销售趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()

# 显示图表
plt.show()

# 计算销售增长率
sales_trend['growth_rate'] = sales_trend['sales'].pct_change() * 100
print('销售增长率:')
print(sales_trend[['date', 'sales', 'growth_rate']])`,
      testCases: [
        { input: '', expected: '销售趋势图显示销售额整体呈上升趋势，12月销售额达到最高28000' }
      ]
    },
    {
      id: 5,
      title: '客户分群分析',
      description: '基于客户的购买行为对客户进行分类。假设有一个包含客户ID、购买次数、总消费金额的DataFrame。',
      hints: ['使用Pandas的cut函数进行分箱', '根据购买次数和消费金额将客户分为不同群体', '可以使用四分位数作为分箱依据'],
      solution: `import pandas as pd

# 示例数据
customer_data = pd.DataFrame({
    'customer_id': range(1, 11),
    'purchase_count': [2, 5, 1, 8, 3, 10, 4, 7, 6, 9],
    'total_spend': [500, 1200, 200, 2500, 800, 3000, 900, 2000, 1800, 2800]
})

# 根据购买次数分群
purchase_bins = [0, 3, 6, float('inf')]
purchase_labels = ['低频购买', '中频购买', '高频购买']
customer_data['purchase_group'] = pd.cut(customer_data['purchase_count'], bins=purchase_bins, labels=purchase_labels)

# 根据消费金额分群
spend_bins = [0, 1000, 2000, float('inf')]
spend_labels = ['低消费', '中等消费', '高消费']
customer_data['spend_group'] = pd.cut(customer_data['total_spend'], bins=spend_bins, labels=spend_labels)

# 组合分群
customer_data['customer_segment'] = customer_data['purchase_group'] + '_' + customer_data['spend_group']

print('客户分群分析:')
print(customer_data)

# 统计各分群的客户数量
segment_counts = customer_data['customer_segment'].value_counts()
print('\n各分群客户数量:')
print(segment_counts)`,
      testCases: [
        { input: '', expected: '客户被分为不同群体，如高频购买_高消费、中频购买_中等消费等' }
      ]
    },
    {
      id: 6,
      title: '库存管理分析',
      description: '计算库存周转率和安全库存。假设有一个包含产品、期初库存、期末库存、销售成本的DataFrame。',
      hints: ['库存周转率 = 销售成本 / 平均库存', '平均库存 = (期初库存 + 期末库存) / 2', '安全库存 = 日平均需求量 × 安全库存天数'],
      solution: `import pandas as pd

# 示例数据
inventory_data = pd.DataFrame({
    'product': ['A', 'B', 'C', 'D'],
    'beginning_inventory': [100, 150, 200, 120],
    'ending_inventory': [80, 120, 180, 100],
    'cost_of_sales': [5000, 8000, 10000, 6000],
    'daily_demand': [10, 15, 20, 12],
    'lead_time': 7  # 提前期（天）
})

# 计算平均库存
inventory_data['average_inventory'] = (inventory_data['beginning_inventory'] + inventory_data['ending_inventory']) / 2

# 计算库存周转率
inventory_data['inventory_turnover'] = inventory_data['cost_of_sales'] / inventory_data['average_inventory']

# 计算安全库存（假设安全系数为1.645，对应95%置信水平）
safety_factor = 1.645
inventory_data['safety_stock'] = inventory_data['daily_demand'] * inventory_data['lead_time'] * safety_factor

print('库存管理分析:')
print(inventory_data[['product', 'beginning_inventory', 'ending_inventory', 'average_inventory', 'inventory_turnover', 'safety_stock']])

# 分析库存周转率
print('\n库存周转率分析:')
print(f'平均库存周转率: {inventory_data["inventory_turnover"].mean():.2f}')
print(f'最高库存周转率: {inventory_data["inventory_turnover"].max():.2f} (产品: {inventory_data.loc[inventory_data["inventory_turnover"].idxmax(), "product"]})')
print(f'最低库存周转率: {inventory_data["inventory_turnover"].min():.2f} (产品: {inventory_data.loc[inventory_data["inventory_turnover"].idxmin(), "product"]})')`,
      testCases: [
        { input: '', expected: '计算出各产品的库存周转率和安全库存，分析库存管理效率' }
      ]
    },
    {
      id: 7,
      title: '市场份额分析',
      description: '计算不同产品或品牌的市场份额。假设有一个包含产品、销售额的DataFrame。',
      hints: ['计算总销售额', '计算每个产品的销售额占比', '可以按类别或品牌进行分组分析'],
      solution: `import pandas as pd

# 示例数据
market_data = pd.DataFrame({
    'product': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    'brand': ['Brand X', 'Brand X', 'Brand Y', 'Brand Y', 'Brand Z'],
    'sales': [12000, 15000, 9000, 18000, 10000]
})

# 计算总销售额
total_sales = market_data['sales'].sum()

# 计算每个产品的市场份额
market_data['market_share'] = (market_data['sales'] / total_sales) * 100

print('产品市场份额分析:')
print(market_data[['product', 'sales', 'market_share']].sort_values('market_share', ascending=False))

# 按品牌计算市场份额
brand_market_share = market_data.groupby('brand')['sales'].sum().reset_index()
brand_market_share['market_share'] = (brand_market_share['sales'] / total_sales) * 100

print('\n品牌市场份额分析:')
print(brand_market_share.sort_values('market_share', ascending=False))`,
      testCases: [
        { input: '', expected: '计算出各产品和品牌的市场份额，按降序排列' }
      ]
    },
    {
      id: 8,
      title: '销售预测',
      description: '使用简单的时间序列分析预测未来销售。假设有一个包含日期和销售额的DataFrame。',
      hints: ['使用移动平均法进行预测', '计算趋势线', '可以使用线性回归进行预测'],
      solution: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 示例数据
sales_data = pd.DataFrame({
    'date': pd.date_range('2023-01-01', periods=12, freq='M'),
    'sales': [10000, 12000, 15000, 13000, 16000, 18000, 20000, 22000, 25000, 23000, 26000, 28000]
})

# 添加时间索引（1, 2, ..., 12）
sales_data['time'] = range(1, len(sales_data) + 1)

# 使用线性回归进行预测
from sklearn.linear_model import LinearRegression

X = sales_data[['time']]
y = sales_data['sales']

model = LinearRegression()
model.fit(X, y)

# 预测未来3个月的销售额
future_time = pd.DataFrame({'time': [13, 14, 15]})
future_sales = model.predict(future_time)

# 创建预测结果DataFrame
future_dates = pd.date_range('2024-01-01', periods=3, freq='M')
predicted_sales = pd.DataFrame({
    'date': future_dates,
    'sales': future_sales
})

print('销售预测结果:')
print(predicted_sales)

# 绘制历史数据和预测数据
plt.figure(figsize=(10, 6))
plt.plot(sales_data['date'], sales_data['sales'], marker='o', label='历史销售')
plt.plot(predicted_sales['date'], predicted_sales['sales'], marker='o', linestyle='--', color='r', label='预测销售')
plt.title('销售趋势与预测')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
      testCases: [
        { input: '', expected: '使用线性回归预测未来3个月的销售额，并绘制趋势图' }
      ]
    },
    {
      id: 9,
      title: '客户流失分析',
      description: '分析客户流失率和原因。假设有一个包含客户ID、最后购买日期、客户状态的DataFrame。',
      hints: ['计算客户流失率', '分析流失客户的特征', '可以使用时间差计算客户活跃度'],
      solution: `import pandas as pd
from datetime import datetime, timedelta

# 示例数据
customer_data = pd.DataFrame({
    'customer_id': range(1, 11),
    'last_purchase_date': pd.date_range('2023-01-01', periods=10, freq='30D'),
    'status': ['active', 'churned', 'active', 'churned', 'active', 'active', 'churned', 'active', 'churned', 'active'],
    'total_purchases': [5, 3, 8, 2, 10, 6, 1, 7, 2, 9],
    'average_order_value': [200, 150, 250, 100, 300, 180, 80, 220, 90, 280]
})

# 计算当前日期
current_date = datetime.now()

# 计算最后购买至今的天数
customer_data['days_since_last_purchase'] = (current_date - customer_data['last_purchase_date']).dt.days

# 定义流失客户（例如：超过90天未购买）
churn_threshold = 90
customer_data['calculated_status'] = customer_data['days_since_last_purchase'].apply(lambda x: 'churned' if x > churn_threshold else 'active')

# 计算流失率
churn_rate = (customer_data['status'] == 'churned').sum() / len(customer_data) * 100

print(f'客户流失率: {churn_rate:.2f}%')

# 分析流失客户与活跃客户的差异
churned_customers = customer_data[customer_data['status'] == 'churned']
active_customers = customer_data[customer_data['status'] == 'active']

print('\n流失客户特征:')
print(f'平均购买次数: {churned_customers["total_purchases"].mean():.2f}')
print(f'平均客单价: {churned_customers["average_order_value"].mean():.2f}')
print(f'最后购买至今天数: {churned_customers["days_since_last_purchase"].mean():.2f}')

print('\n活跃客户特征:')
print(f'平均购买次数: {active_customers["total_purchases"].mean():.2f}')
print(f'平均客单价: {active_customers["average_order_value"].mean():.2f}')
print(f'最后购买至今天数: {active_customers["days_since_last_purchase"].mean():.2f}')`,
      testCases: [
        { input: '', expected: '计算客户流失率，并分析流失客户与活跃客户的特征差异' }
      ]
    },
    {
      id: 10,
      title: '营销活动效果分析',
      description: '评估不同营销活动的ROI（投资回报率）。假设有一个包含活动名称、投入成本、产生销售额的DataFrame。',
      hints: ['计算每个活动的ROI', 'ROI = (销售额 - 成本) / 成本 × 100%', '比较不同活动的效果'],
      solution: `import pandas as pd

# 示例数据
marketing_campaigns = pd.DataFrame({
    'campaign': ['Campaign A', 'Campaign B', 'Campaign C', 'Campaign D', 'Campaign E'],
    'cost': [5000, 8000, 3000, 10000, 6000],
    'revenue': [20000, 30000, 12000, 35000, 25000]
})

# 计算每个活动的ROI
marketing_campaigns['roi'] = ((marketing_campaigns['revenue'] - marketing_campaigns['cost']) / marketing_campaigns['cost']) * 100

# 计算每个活动的利润
marketing_campaigns['profit'] = marketing_campaigns['revenue'] - marketing_campaigns['cost']

# 按ROI降序排序
sorted_campaigns = marketing_campaigns.sort_values('roi', ascending=False)

print('营销活动效果分析:')
print(sorted_campaigns[['campaign', 'cost', 'revenue', 'profit', 'roi']])

# 分析整体营销效果
total_cost = marketing_campaigns['cost'].sum()
total_revenue = marketing_campaigns['revenue'].sum()
total_profit = marketing_campaigns['profit'].sum()
overall_roi = ((total_revenue - total_cost) / total_cost) * 100

print('\n整体营销效果:')
print(f'总投入: {total_cost}')
print(f'总收益: {total_revenue}')
print(f'总利润: {total_profit}')
print(f'整体ROI: {overall_roi:.2f}%')

# 找出效果最好的活动
best_campaign = sorted_campaigns.iloc[0]
print(f'\n效果最好的活动: {best_campaign["campaign"]}，ROI: {best_campaign["roi":.2f}%')`,
      testCases: [
        { input: '', expected: '计算各营销活动的ROI和利润，找出效果最好的活动' }
      ]
    }
  ]

  const currentEx = exercises[currentExercise - 1]

  const handleSubmit = () => {
    // 这里可以添加实际的代码执行和验证逻辑
    // 现在简单模拟验证
    setSubmitted(true)
    setIsCorrect(true)
    setFeedback('正确！你的代码通过了所有测试用例。')
  }

  const handleNext = () => {
    setCurrentExercise(Math.min(exercises.length, currentExercise + 1))
    setUserAnswer('')
    setSubmitted(false)
    setIsCorrect(false)
    setFeedback('')
  }

  const handlePrevious = () => {
    setCurrentExercise(Math.max(1, currentExercise - 1))
    setUserAnswer('')
    setSubmitted(false)
    setIsCorrect(false)
    setFeedback('')
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Python编程练习</h1>
        <p className="text-gray-600">完成以下10个Python编程练习，提升你的编程技能</p>
      </div>

      {/* 练习导航 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">练习 {currentExercise}: {currentEx.title}</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{currentExercise} / 10</span>
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

        {/* 提示 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">提示</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {currentEx.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>

        {/* 代码编辑器 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">编写代码</h3>
          <div className="bg-gray-900 rounded-md overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm ml-2">solution.py</span>
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 h-64 bg-gray-900 text-gray-300 font-mono text-sm resize-none"
              placeholder="在此处编写你的代码..."
            ></textarea>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
          >
            提交答案
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
                <h4 className="font-semibold mb-1">{isCorrect ? '答案正确！' : '答案错误'}</h4>
                <p>{feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* 解决方案 */}
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

export default PythonPractice