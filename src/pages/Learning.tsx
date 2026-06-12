import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Clock, CheckCircle, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react'

const Learning: React.FC = () => {
  const { category, courseId, lessonId } = useParams<{ category: string; courseId: string; lessonId?: string }>()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())

  const coursesData = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      category: 'basic',
      level: '初级',
      duration: 24,
      lessons: [
        {
          id: 1,
          title: '电子商务概述',
          duration: 45,
          sections: [
            { type: 'h2', text: '什么是电子商务' },
            { type: 'p', text: '电子商务（Electronic Commerce，简称EC）是指通过互联网、企业内部网和增值网等电子方式进行的商业交易活动，包括在线购物、电子支付、在线营销、供应链管理等一系列商业活动。' },
            { type: 'h3', text: '电子商务的发展历程' },
            { type: 'h4', text: '第一阶段（1990-1999年）：萌芽期' },
            { type: 'bullet', items: ['互联网技术开始普及，企业建立静态网站展示信息', '简单的在线交易开始出现，如亚马逊（1995年）、eBay（1995年）等平台成立', '技术基础：HTML、HTTP协议、早期搜索引擎'] },
            { type: 'h4', text: '第二阶段（2000-2009年）：发展期' },
            { type: 'bullet', items: ['B2C模式兴起，淘宝（2003年）、京东（2004年）等电商平台崛起', '第三方支付系统出现（支付宝2004年）', '物流配送体系逐步完善'] },
            { type: 'h4', text: '第三阶段（2010-2019年）：成熟期' },
            { type: 'bullet', items: ['移动电商快速发展，智能手机普及', '社交电商兴起（微信电商、拼多多2015年）', '大数据、云计算技术广泛应用', '跨境电商蓬勃发展'] },
            { type: 'h4', text: '第四阶段（2020年至今）：智能商业时代' },
            { type: 'bullet', items: ['AI、大数据、直播电商成为主流', '短视频电商（抖音、快手）快速崛起', '私域流量运营成为重要策略', '元宇宙、虚拟购物等新兴模式出现'] },
            { type: 'h3', text: '电子商务的主要模式' },
            { type: 'table', headers: ['模式', '全称', '代表平台', '特点'], rows: [
              ['B2B', '企业对企业', '阿里巴巴、慧聪网', '批量交易、大额订单'],
              ['B2C', '企业对消费者', '天猫、京东、苏宁', '零售为主、标准化产品'],
              ['C2C', '消费者对消费者', '淘宝、闲鱼', '个人交易、二手商品'],
              ['O2O', '线上到线下', '美团、饿了么、滴滴', '线上引流、线下服务'],
              ['社交电商', '基于社交的电商', '拼多多、抖音商城', '社交裂变、拼团模式'],
              ['跨境电商', '跨越国境的电商', '天猫国际、亚马逊全球购', '国际化、物流复杂']
            ]},
            { type: 'h3', text: '电子商务的核心要素' },
            { type: 'bullet', items: ['信息流：商品信息、订单信息、用户信息的传递', '资金流：支付、结算、金融服务', '物流：商品的存储、运输、配送', '商流：商品所有权的转移'] },
            { type: 'h3', text: '电子商务的优势' },
            { type: 'bullet', items: ['降低成本：减少中间环节，降低运营成本', '打破地域限制：24小时在线，全球可达', '精准营销：基于大数据的个性化推荐', '高效便捷：随时随地购物，快速配送'] },
            { type: 'quiz', question: '选择题：B2C模式是指以下哪种电子商务模式？', options: ['A. 企业对企业', 'B. 企业对消费者', 'C. 消费者对消费者', 'D. 线上到线下'], answer: 'B' },
            { type: 'quiz', question: '填空题：电子商务的四大支柱包括商流、___、资金流和信息流。', answer: '物流' },
            { type: 'quiz', question: '简答题：请简述电子商务第四阶段的主要特点。', answer: '1. AI、大数据、直播电商成为主流\n2. 智能商业时代全面到来\n3. 线上线下深度融合\n4. 社交电商快速发展\n5. 私域流量运营成为重要策略' }
          ]
        },
        {
          id: 2,
          title: '电子商务技术基础',
          duration: 60,
          sections: [
            { type: 'h2', text: '电子商务技术基础' },
            { type: 'h3', text: '互联网技术基础' },
            { type: 'p', text: '电子商务依赖于多种互联网技术的支持，构成了完整的技术体系。' },
            { type: 'h4', text: 'HTTP/HTTPS协议' },
            { type: 'bullet', items: ['HTTP：超文本传输协议，用于网页数据传输', 'HTTPS：安全版HTTP，通过SSL/TLS加密传输，保障数据安全', '重要性：确保用户数据在传输过程中不被窃取或篡改'] },
            { type: 'h4', text: 'Web服务器' },
            { type: 'bullet', items: ['作用：处理用户请求，返回网页内容', '常见服务器：Nginx、Apache、Tomcat', '负载均衡：分布式部署，处理高并发请求'] },
            { type: 'h4', text: '数据库系统' },
            { type: 'bullet', items: ['关系型数据库：MySQL、PostgreSQL、SQL Server', 'NoSQL数据库：MongoDB、Redis（缓存）', '数据存储内容：商品信息、用户数据、订单记录、交易日志'] },
            { type: 'h3', text: '电子支付系统' },
            { type: 'p', text: '电子支付是电子商务的核心环节，确保资金安全流转。' },
            { type: 'table', headers: ['支付类型', '代表平台', '特点'], rows: [
              ['第三方支付', '支付宝、微信支付', '便捷、安全、支持多种场景'],
              ['银行卡支付', '网银支付、POS机', '传统方式，覆盖面广'],
              ['数字人民币', '央行数字货币', '法定货币、离线支付'],
              ['加密货币', 'Bitcoin、Ethereum', '去中心化、跨境支付']
            ]},
            { type: 'h3', text: '物流配送系统' },
            { type: 'h4', text: '仓储管理' },
            { type: 'bullet', items: ['智能仓储：自动化货架、机器人分拣', '库存管理系统：实时监控库存水平', 'WMS系统：仓库管理系统，优化仓储流程'] },
            { type: 'h4', text: '配送网络' },
            { type: 'bullet', items: ['自建物流：京东物流、顺丰', '第三方物流：四通一达', '同城配送：美团配送、蜂鸟配送'] },
            { type: 'h3', text: '安全技术' },
            { type: 'bullet', items: ['数据加密：SSL/TLS加密传输', '身份认证：用户名密码、短信验证、生物识别', '防火墙：防止恶意攻击', '反欺诈系统：检测异常交易'] },
            { type: 'quiz', question: '选择题：以下哪种不是电子商务常用的互联网技术？', options: ['A. HTTP/HTTPS协议', 'B. Web服务器', 'C. 人工智能写作', 'D. 数据库系统'], answer: 'C' },
            { type: 'quiz', question: '填空题：电子支付的核心环节之一是___系统的支持。', answer: '第三方支付（或支付宝、微信支付等）' },
            { type: 'quiz', question: '简答题：请简述物流配送系统的主要组成部分。', answer: '1. 仓储管理：智能仓储、库存管理系统、WMS系统\n2. 配送网络：自建物流、第三方物流、同城配送\n3. 物流追踪：GPS定位、预计送达时间、通知服务\n4. 安全保障：包裹保险、异常处理机制' }
          ]
        },
        {
          id: 3,
          title: '电商平台运营',
          duration: 50,
          sections: [
            { type: 'h2', text: '电商平台运营' },
            { type: 'h3', text: '平台规则' },
            { type: 'p', text: '各大电商平台都有自己的运营规则，卖家必须严格遵守。' },
            { type: 'h4', text: '淘宝规则' },
            { type: 'bullet', items: ['店铺管理：店铺命名、资质认证、类目选择', '商品发布：标题规范、图片要求、属性填写', '交易规则：发货时间、退换货政策、评价管理', '违规处罚：虚假交易、侵权处理、信用炒作'] },
            { type: 'h3', text: '运营策略' },
            { type: 'p', text: '成功的电商运营需要综合运用多种策略。' },
            { type: 'h4', text: '店铺装修' },
            { type: 'bullet', items: ['视觉设计：品牌风格统一、页面布局合理', '用户体验：导航清晰、加载速度快', '详情页优化：产品描述详细、图片精美'] },
            { type: 'h4', text: '商品管理' },
            { type: 'bullet', items: ['选品策略：市场调研、竞品分析、差异化定位', '定价策略：成本定价、市场定价、促销定价', '库存管理：安全库存设置、库存预警、补货计划'] },
            { type: 'h4', text: '营销推广' },
            { type: 'table', headers: ['推广方式', '特点', '适用场景'], rows: [
              ['直通车', '按点击付费', '新品推广、爆款打造'],
              ['钻展', '按展现付费', '品牌曝光、活动引流'],
              ['淘客推广', '按成交付费', '销量提升、清仓处理'],
              ['直播带货', '实时互动', '新品发布、粉丝运营']
            ]},
            { type: 'h3', text: '用户管理' },
            { type: 'p', text: '维护客户关系是提升复购率的关键。' },
            { type: 'h4', text: '会员体系' },
            { type: 'bullet', items: ['积分系统：购物积分、签到积分', '等级制度：普通会员、银卡、金卡、钻石卡', '专属权益：折扣优惠、生日礼包、优先发货'] },
            { type: 'h4', text: '用户画像' },
            { type: 'bullet', items: ['数据来源：浏览记录、购买行为、收藏偏好', '画像维度：年龄、性别、地域、消费能力', '应用场景：个性化推荐、精准营销'] },
            { type: 'quiz', question: '选择题：淘宝规则属于以下哪类平台规则？', options: ['A. 京东规则', 'B. 拼多多规则', 'C. 淘宝规则', 'D. 美团规则'], answer: 'C' },
            { type: 'quiz', question: '填空题：常见的电商运营策略包括店铺装修、商品管理、___和客户服务。', answer: '营销推广' },
            { type: 'quiz', question: '简答题：请简述用户画像在电商运营中的作用。', answer: '1. 基于数据分析了解用户需求和偏好\n2. 精准定位目标客户群体\n3. 实现个性化推荐，提升用户体验\n4. 优化营销策略，提高转化率\n5. 预测用户行为，优化库存管理\n6. 提升用户满意度和复购率' }
          ]
        },
        {
          id: 4,
          title: '电商数据分析基础',
          duration: 55,
          sections: [
            { type: 'h2', text: '电商数据分析基础' },
            { type: 'h3', text: '常用数据指标' },
            { type: 'p', text: '电商运营需要关注的关键指标体系。' },
            { type: 'h4', text: '流量指标' },
            { type: 'table', headers: ['指标', '定义', '计算公式'], rows: [
              ['UV', '独立访客数', '去重后的访客数量'],
              ['PV', '页面浏览量', '所有页面的浏览次数'],
              ['转化率', '访问到购买的比例', '订单数 / UV × 100%'],
              ['跳失率', '只看一个页面就离开的比例', '跳失访客数 / UV × 100%']
            ]},
            { type: 'h4', text: '销售指标' },
            { type: 'bullet', items: ['销售额：一段时间内的总销售收入', '订单数：成功下单的订单数量', '客单价：平均每单金额（销售额 / 订单数）', '毛利率：(销售额 - 成本) / 销售额 × 100%', '复购率：重复购买用户占总用户的比例'] },
            { type: 'h4', text: '用户指标' },
            { type: 'bullet', items: ['新增用户：首次访问或注册的用户', '活跃用户：一定时间内有行为的用户', '留存率：某时间段用户在后续时间仍活跃的比例', '用户生命周期价值（LTV）：用户在生命周期内的总贡献'] },
            { type: 'h3', text: '数据分析方法' },
            { type: 'h4', text: '1. 对比分析' },
            { type: 'bullet', items: ['同比：与去年同期对比', '环比：与上一个周期对比', '与目标对比：实际完成 vs 目标值'] },
            { type: 'h4', text: '2. 漏斗分析' },
            { type: 'bullet', items: ['流量转化漏斗：访问 → 浏览 → 加入购物车 → 下单 → 支付', '购买转化漏斗：曝光 → 点击 → 访问 → 咨询 → 成交', '用户行为漏斗：注册 → 登录 → 浏览 → 购买'] },
            { type: 'h4', text: '3. 用户分群' },
            { type: 'bullet', items: ['按地域：城市、省份、区域', '按人口属性：年龄、性别、职业', '按消费能力：高、中、低消费人群', '按行为特征：新用户、活跃用户、沉睡用户'] },
            { type: 'h4', text: '4. 关联分析' },
            { type: 'bullet', items: ['商品关联：购买A商品的用户还购买了B商品', '用户行为关联：浏览A页面的用户还浏览了B页面', '时间关联：特定时间段的购买规律'] },
            { type: 'h3', text: '常用工具' },
            { type: 'table', headers: ['工具', '适用场景', '特点'], rows: [
              ['Excel', '基础数据处理', '易用、普及、图表功能强'],
              ['Python', '高级分析', 'Pandas、NumPy、Matplotlib'],
              ['九数云', '可视化分析', '拖拽式操作、无需代码'],
              ['Tableau', '企业级BI', '强大的可视化能力'],
              ['SQL', '数据库查询', '快速提取数据']
            ]},
            { type: 'quiz', question: '选择题：UV是指什么指标？', options: ['A. 页面浏览量', 'B. 独立访客', 'C. 转化率', 'D. 销售额'], answer: 'B' },
            { type: 'quiz', question: '填空题：常用的数据分析方法包括对比分析、漏斗分析、用户分群和___。', answer: '关联分析' },
            { type: 'quiz', question: '简答题：请简述什么是漏斗分析及其在电商中的应用。', answer: '1. 漏斗分析是分析用户从访问到转化过程中每一步流失情况的方法\n2. 应用场景：\n   - 流量转化漏斗：访问→浏览→加入购物车→下单→支付\n   - 购买转化漏斗：曝光→点击→访问→咨询→成交\n   - 用户行为漏斗：注册→登录→浏览→购买\n3. 作用：\n   - 识别转化瓶颈：找出哪个环节流失最严重\n   - 优化关键环节：针对性改进\n   - 提升整体转化率：提高最终购买率' }
          ]
        }
      ]
    },
    {
      id: 'python-basics',
      title: 'Python基础',
      category: 'basic',
      level: '初级',
      duration: 24,
      lessons: [
        {
          id: 1,
          title: 'Python环境搭建',
          duration: 30,
          sections: [
            { type: 'h2', text: 'Python环境搭建' },
            { type: 'h3', text: 'Python简介' },
            { type: 'p', text: 'Python是一种高级编程语言，以其简洁的语法和强大的功能而闻名。' },
            { type: 'bullet', items: ['易学易用：语法简洁，可读性强', '跨平台：支持Windows、macOS、Linux', '丰富的库：拥有大量第三方库，适用于各种领域', '广泛应用：Web开发、数据分析、人工智能、自动化等'] },
            { type: 'h3', text: '安装Python' },
            { type: 'h4', text: '步骤1：下载Python' },
            { type: 'p', text: '访问官方网站下载最新版本：https://www.python.org/downloads/' },
            { type: 'h4', text: '步骤2：Windows系统安装' },
            { type: 'bullet', items: ['运行安装程序', '务必勾选 "Add Python to PATH"', '选择安装路径或使用默认路径', '点击 "Install Now"'] },
            { type: 'h4', text: 'macOS系统安装' },
            { type: 'bullet', items: ['方法一：直接下载安装包安装', '方法二：使用Homebrew命令：brew install python3'] },
            { type: 'h3', text: '开发环境选择' },
            { type: 'table', headers: ['开发环境', '特点', '适用场景'], rows: [
              ['VS Code', '轻量级、插件丰富、跨平台', '日常开发、学习'],
              ['PyCharm', '专业级IDE、功能强大', '大型项目、团队开发'],
              ['Jupyter Notebook', '交互式编程、支持Markdown', '数据分析、教学演示'],
              ['Spyder', '科学计算专用、类似MATLAB', '数据科学、数值计算']
            ]},
            { type: 'h3', text: 'pip包管理工具' },
            { type: 'p', text: 'pip是Python的包管理工具，用于安装和管理第三方库。' },
            { type: 'code', language: 'bash', code: '# 安装包\npip install pandas\npip install numpy\n\n# 安装特定版本\npip install pandas==1.5.0\n\n# 查看已安装的包\npip list\n\n# 导出依赖列表\npip freeze > requirements.txt\n\n# 从文件安装依赖\npip install -r requirements.txt' },
            { type: 'h3', text: '虚拟环境' },
            { type: 'p', text: '推荐使用虚拟环境隔离项目依赖。' },
            { type: 'code', language: 'bash', code: '# 创建虚拟环境\npython -m venv myenv\n\n# 激活虚拟环境（Windows）\nmyenv\\Scripts\\activate\n\n# 激活虚拟环境（macOS/Linux）\nsource myenv/bin/activate\n\n# 退出虚拟环境\ndeactivate' },
            { type: 'quiz', question: '选择题：在Windows上安装Python时，需要勾选哪个选项确保Python可全局使用？', options: ['A. Install Now', 'B. Customize installation', 'C. Add Python to PATH', 'D. Download Debug Tools'], answer: 'C' },
            { type: 'quiz', question: '填空题：Python官方网站的域名是___。', answer: 'python.org' },
            { type: 'quiz', question: '简答题：请列举三种常用的Python开发环境，并说明各自的特点。', answer: '1. VS Code：轻量级、插件丰富、跨平台，适合日常开发和学习\n2. PyCharm：专业级IDE，功能强大，适合大型项目和团队开发\n3. Jupyter Notebook：支持交互式编程，适合数据分析和教学演示\n4. Spyder：专为科学计算设计，界面类似MATLAB，适合数据科学领域' }
          ]
        },
        {
          id: 2,
          title: 'Python基础语法',
          duration: 60,
          sections: [
            { type: 'h2', text: 'Python基础语法' },
            { type: 'h3', text: '变量与数据类型' },
            { type: 'p', text: 'Python是一种动态类型语言，变量不需要声明类型。' },
            { type: 'code', language: 'python', code: '# 变量定义\nname = "张三"\nage = 25\nheight = 1.75\nis_student = True\n\n# 数据类型检查\nprint(type(name))       # <class \'str\'>\nprint(type(age))        # <class \'int\'>\nprint(type(height))     # <class \'float\'>\nprint(type(is_student)) # <class \'bool\'>' },
            { type: 'table', headers: ['类型', '描述', '示例'], rows: [
              ['int', '整数', '10, -5, 0'],
              ['float', '浮点数', '3.14, -2.5'],
              ['str', '字符串', '"hello", \'world\''],
              ['bool', '布尔值', 'True, False'],
              ['list', '列表', '[1, 2, 3]'],
              ['dict', '字典', '{"name": "张三"}']
            ]},
            { type: 'h3', text: '运算符' },
            { type: 'h4', text: '算术运算符' },
            { type: 'code', language: 'python', code: 'a = 10\nb = 3\n\nprint(a + b)   # 13  加法\nprint(a - b)   # 7   减法\nprint(a * b)   # 30  乘法\nprint(a / b)   # 3.333...  除法\nprint(a // b)  # 3   整除\nprint(a % b)   # 1   取模（余数）\nprint(a ** b)  # 1000  幂运算' },
            { type: 'h4', text: '比较运算符' },
            { type: 'code', language: 'python', code: 'x = 10\ny = 5\n\nprint(x > y)   # True  大于\nprint(x < y)   # False 小于\nprint(x >= y)  # True  大于等于\nprint(x <= y)  # False 小于等于\nprint(x == y)  # False 等于\nprint(x != y)  # True  不等于' },
            { type: 'h3', text: '流程控制' },
            { type: 'h4', text: '条件判断' },
            { type: 'code', language: 'python', code: 'score = 85\n\nif score >= 90:\n    print("优秀")\nelif score >= 80:\n    print("良好")\nelif score >= 60:\n    print("及格")\nelse:\n    print("不及格")' },
            { type: 'h4', text: 'for循环' },
            { type: 'code', language: 'python', code: '# 遍历范围\nfor i in range(5):\n    print(i)  # 输出: 0 1 2 3 4\n\n# 遍历列表\nfruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)\n\n# 带索引遍历\nfor index, fruit in enumerate(fruits):\n    print(f"{index}: {fruit}")' },
            { type: 'h4', text: 'while循环' },
            { type: 'code', language: 'python', code: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1  # 等价于 count = count + 1' },
            { type: 'h4', text: 'break和continue' },
            { type: 'code', language: 'python', code: '# break - 跳出循环\nfor i in range(10):\n    if i == 5:\n        break\n    print(i)  # 输出: 0 1 2 3 4\n\n# continue - 跳过当前迭代\nfor i in range(10):\n    if i % 2 == 0:\n        continue\n    print(i)  # 输出: 1 3 5 7 9' },
            { type: 'h3', text: '输入输出' },
            { type: 'code', language: 'python', code: '# 输出\nprint("Hello, World!")\nprint("姓名:", "张三")\n\n# 格式化输出\nname = "张三"\nage = 25\nprint(f"姓名: {name}, 年龄: {age}")  # f-string\nprint("姓名: {}, 年龄: {}".format(name, age))\nprint("姓名: %s, 年龄: %d" % (name, age))\n\n# 输入\nuser_input = input("请输入您的姓名: ")\nprint(f"您好, {user_input}!")' },
            { type: 'quiz', question: '选择题：以下哪个运算符用于幂运算？', options: ['A. *', 'B. /', 'C. **', 'D. //'], answer: 'C' },
            { type: 'quiz', question: '填空题：Python中，使用___关键字可以跳出循环。', answer: 'break' },
            { type: 'quiz', question: '编程实践：编写一个Python程序，使用for循环计算1到100的累加和。', answer: 'total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)  # 输出: 5050' },
            { type: 'quiz', question: '编程实践：编写一个程序，判断一个数是否为偶数。', answer: 'num = int(input("请输入一个整数: "))\nif num % 2 == 0:\n    print(f"{num} 是偶数")\nelse:\n    print(f"{num} 是奇数")' }
          ]
        },
        {
          id: 3,
          title: '函数和模块',
          duration: 50,
          sections: [
            { type: 'h2', text: '函数和模块' },
            { type: 'h3', text: '函数定义' },
            { type: 'p', text: '函数是组织好的、可重复使用的代码块，用于执行特定任务。' },
            { type: 'code', language: 'python', code: 'def greet(name):\n    """问候函数 - 向用户打招呼"""\n    return f"你好, {name}!"\n\nresult = greet("张三")\nprint(result)  # 输出: 你好, 张三!' },
            { type: 'h4', text: '函数参数' },
            { type: 'code', language: 'python', code: '# 默认参数\ndef add(a, b=0):\n    """加法函数，b默认为0"""\n    return a + b\n\nprint(add(5))      # 5\nprint(add(5, 3))   # 8\n\n# 关键字参数\ndef introduce(name, age, city="北京"):\n    print(f"姓名: {name}, 年龄: {age}, 城市: {city}")\n\nintroduce("张三", 25)\nintroduce("李四", 30, city="上海")\n\n# 可变参数\ndef sum_all(*args):\n    """计算所有参数的和"""\n    total = 0\n    for num in args:\n        total += num\n    return total\n\nprint(sum_all(1, 2, 3, 4))  # 10\n\n# 关键字可变参数\ndef print_info(**kwargs):\n    """打印关键字参数"""\n    for key, value in kwargs.items():\n        print(f"{key}: {value}")\n\nprint_info(name="张三", age=25, major="数据分析")' },
            { type: 'h4', text: '返回值' },
            { type: 'code', language: 'python', code: '# 返回单个值\ndef square(x):\n    return x ** 2\n\n# 返回多个值\ndef calculate(a, b):\n    return a + b, a - b, a * b, a / b\n\nadd_result, sub_result, mul_result, div_result = calculate(10, 3)\nprint(f"加: {add_result}, 减: {sub_result}, 乘: {mul_result}, 除: {div_result}")' },
            { type: 'h3', text: '模块导入' },
            { type: 'p', text: '模块是包含Python定义和语句的文件，用于组织代码。' },
            { type: 'code', language: 'python', code: '# 导入整个模块\nimport math\nprint(math.pi)      # 3.141592653589793\nprint(math.sqrt(16)) # 4.0\n\n# 导入并指定别名\nimport numpy as np\narr = np.array([1, 2, 3])\n\n# 导入特定函数\nfrom math import pi, sqrt\nprint(pi)    # 3.141592653589793\nprint(sqrt(16)) # 4.0' },
            { type: 'h3', text: '常用标准库' },
            { type: 'table', headers: ['模块', '用途'], rows: [
              ['math', '数学运算'],
              ['random', '随机数生成'],
              ['datetime', '日期时间处理'],
              ['os', '操作系统交互'],
              ['sys', 'Python运行时环境'],
              ['json', 'JSON数据处理'],
              ['csv', 'CSV文件处理']
            ]},
            { type: 'quiz', question: '选择题：以下哪个命令用于安装Python包？', options: ['A. pip download', 'B. pip install', 'C. pip remove', 'D. pip list'], answer: 'B' },
            { type: 'quiz', question: '填空题：定义函数使用___关键字。', answer: 'def' },
            { type: 'quiz', question: '简答题：请简述Python模块和包的区别。', answer: '1. 模块（Module）：一个独立的Python文件（.py文件），包含函数、类、变量等定义\n2. 包（Package）：包含__init__.py文件的文件夹，用于组织多个相关模块\n3. 关系：包是由多个模块组成的集合，一个包中可以包含多个模块和子包\n4. 导入方式：模块使用import module导入，包可以使用import package.module导入' }
          ]
        }
      ]
    },
    {
      id: 'data-collection',
      title: '数据采集与处理',
      category: 'core',
      level: '中级',
      duration: 24,
      lessons: [
        {
          id: 1,
          title: '数据采集概述',
          duration: 45,
          sections: [
            { type: 'h2', text: '数据采集概述' },
            { type: 'h3', text: '什么是数据采集' },
            { type: 'p', text: '数据采集是指从各种数据源获取数据的过程，是数据分析的第一步。' },
            { type: 'h3', text: '数据源类型' },
            { type: 'bullet', items: ['公开数据：政府公开数据、统计数据、开放数据集', '网页数据：电商网站、新闻网站、社交媒体', 'API数据：第三方服务提供的API接口', '数据库数据：企业内部数据库、数据仓库', '传感器数据：IoT设备、监测仪器', '用户行为数据：点击流、日志文件'] },
            { type: 'h3', text: '数据采集方法' },
            { type: 'table', headers: ['方法', '描述', '适用场景'], rows: [
              ['网络爬虫', '自动化获取网页内容', '电商、新闻、论坛'],
              ['API调用', '通过API接口获取数据', '社交媒体、开放平台'],
              ['数据库查询', 'SQL查询获取结构化数据', '企业数据、数据仓库'],
              ['文件导入', '读取CSV、Excel、JSON等文件', '报表、数据文件'],
              ['传感器采集', '实时获取设备数据', '物联网、监控系统']
            ]},
            { type: 'h3', text: '数据伦理与规范' },
            { type: 'bullet', items: ['遵守robots.txt协议', '尊重数据所有权和版权', '保护个人隐私（GDPR、数据安全法）', '避免对目标网站造成过大压力', '数据使用透明化，注明数据来源'] },
            { type: 'quiz', question: '选择题：以下哪种数据采集方式最适合获取电商商品信息？', options: ['A. 数据库查询', 'B. 网络爬虫', 'C. 传感器采集', 'D. 文件导入'], answer: 'B' },
            { type: 'quiz', question: '填空题：网站通常通过___文件告诉爬虫哪些页面可以爬取。', answer: 'robots.txt' },
            { type: 'quiz', question: '简答题：请简述数据采集的主要方法和适用场景。', answer: '1. 网络爬虫：自动化获取网页内容，适合电商、新闻、论坛等网站\n2. API调用：通过API接口获取数据，适合社交媒体、开放平台\n3. 数据库查询：SQL查询获取结构化数据，适合企业数据、数据仓库\n4. 文件导入：读取CSV、Excel、JSON等文件，适合报表、数据文件\n5. 传感器采集：实时获取设备数据，适合物联网、监控系统' }
          ]
        }
      ]
    },
    {
      id: 'data-visualization',
      title: '数据可视化',
      category: 'core',
      level: '中级',
      duration: 24,
      lessons: [
        {
          id: 1,
          title: '数据可视化基础',
          duration: 45,
          sections: [
            { type: 'h2', text: '数据可视化基础' },
            { type: 'h3', text: '什么是数据可视化' },
            { type: 'p', text: '数据可视化是将数据转换为图形或图像形式，以便更直观地理解和分析数据。' },
            { type: 'h3', text: '可视化的重要性' },
            { type: 'bullet', items: ['快速理解：图表比表格更容易理解', '发现模式：可视化帮助发现数据中的趋势和规律', '有效沟通：图形化的报告更具说服力', '记忆深刻：可视化信息更容易被记住'] },
            { type: 'h3', text: '常见图表类型' },
            { type: 'table', headers: ['图表类型', '用途', '示例'], rows: [
              ['折线图', '展示趋势变化', '销售额随时间变化'],
              ['柱状图', '对比不同类别', '各地区销量对比'],
              ['饼图', '展示占比关系', '市场份额分布'],
              ['散点图', '展示相关性', '价格与销量关系'],
              ['热力图', '展示密度分布', '用户访问热力图'],
              ['仪表盘', '展示关键指标', 'KPI监控仪表盘']
            ]},
            { type: 'h3', text: '可视化工具' },
            { type: 'table', headers: ['工具', '特点', '适用人群'], rows: [
              ['Excel图表', '简单易用', '初学者'],
              ['Matplotlib', 'Python库，灵活强大', '数据分析人员'],
              ['Tableau', '拖拽式，功能强大', '企业分析师'],
              ['九数云', '云端BI，协作性好', '企业团队'],
              ['Plotly', '交互式图表', 'Web开发人员']
            ]},
            { type: 'quiz', question: '选择题：以下哪种图表最适合展示数据随时间的变化趋势？', options: ['A. 饼图', 'B. 散点图', 'C. 折线图', 'D. 热力图'], answer: 'C' },
            { type: 'quiz', question: '填空题：展示不同类别数据对比的常用图表是___。', answer: '柱状图' },
            { type: 'quiz', question: '简答题：请简述数据可视化的重要性。', answer: '1. 快速理解：图表比表格更容易理解数据\n2. 发现模式：可视化帮助发现数据中的趋势和规律\n3. 有效沟通：图形化的报告更具说服力\n4. 记忆深刻：可视化信息更容易被记住\n5. 决策支持：可视化帮助管理层做出更好的决策' }
          ]
        }
      ]
    },
    {
      id: 'real-projects',
      title: '企业真实运营项目',
      category: 'advanced',
      level: '高级',
      duration: 24,
      lessons: [
        {
          id: 1,
          title: '项目规划',
          duration: 45,
          sections: [
            { type: 'h2', text: '项目规划' },
            { type: 'h3', text: '项目目标设定' },
            { type: 'p', text: '明确的项目目标是成功的第一步。' },
            { type: 'bullet', items: ['业务目标：项目要解决什么业务问题', '数据目标：需要采集和分析哪些数据', '交付目标：最终产出什么成果', '时间目标：项目的时间节点'] },
            { type: 'h3', text: '需求分析' },
            { type: 'p', text: '深入了解业务需求，确保项目方向正确。' },
            { type: 'bullet', items: ['与业务方沟通，明确真实需求', '梳理数据来源和可用数据', '识别潜在的技术难点', '评估项目可行性'] },
            { type: 'h3', text: '项目规划要点' },
            { type: 'table', headers: ['阶段', '任务', '产出物'], rows: [
              ['启动阶段', '需求调研、可行性分析', '项目计划书'],
              ['设计阶段', '数据方案、分析框架设计', '设计文档'],
              ['实施阶段', '数据采集、分析建模', '分析代码、中间结果'],
              ['报告阶段', '可视化、报告撰写', '分析报告、仪表盘'],
              ['展示阶段', '项目演示、答辩准备', '演示文稿']
            ]},
            { type: 'h3', text: '时间管理' },
            { type: 'bullet', items: ['制定详细的项目时间表', '设置里程碑和检查点', '预留缓冲时间应对意外情况', '定期进度回顾和调整'] },
            { type: 'quiz', question: '选择题：项目规划的第一步是什么？', options: ['A. 开始写代码', 'B. 明确项目目标', 'C. 制作可视化图表', 'D. 写报告'], answer: 'B' },
            { type: 'quiz', question: '填空题：项目规划中，用于检查进度的关键节点称为___。', answer: '里程碑' },
            { type: 'quiz', question: '简答题：请简述项目规划的主要内容。', answer: '1. 项目目标设定：明确业务目标、数据目标、交付目标和时间目标\n2. 需求分析：与业务方沟通，了解真实需求，评估可行性\n3. 项目阶段划分：启动阶段、设计阶段、实施阶段、报告阶段、展示阶段\n4. 时间管理：制定详细时间表，设置里程碑，定期回顾进度\n5. 资源规划：人力、时间、数据资源的合理分配' }
          ]
        },
        {
          id: 2,
          title: '数据获取与清洗',
          duration: 50,
          sections: [
            { type: 'h2', text: '数据获取与清洗' },
            { type: 'h3', text: '数据源确定' },
            { type: 'p', text: '根据项目目标确定所需的数据源。' },
            { type: 'bullet', items: ['内部数据：企业数据库、业务系统', '外部数据：公开数据集、API、网络爬虫', '补充数据：调研数据、竞品数据'] },
            { type: 'h3', text: '数据质量评估' },
            { type: 'p', text: '在分析之前，必须评估数据的质量。' },
            { type: 'table', headers: ['质量维度', '描述', '检查方法'], rows: [
              ['完整性', '数据是否有缺失', '检查NULL值、空字段'],
              ['准确性', '数据是否正确', '与来源数据对比、抽样检查'],
              ['一致性', '数据格式是否统一', '检查日期、数值格式'],
              ['及时性', '数据是否最新', '检查数据更新时间'],
              ['唯一性', '是否有重复数据', '检查重复记录']
            ]},
            { type: 'h3', text: '数据清洗步骤' },
            { type: 'h4', text: '1. 缺失值处理' },
            { type: 'bullet', items: ['删除：缺失比例较低时直接删除', '填补：使用均值、中位数、众数填补', '插值：使用插值方法估计缺失值', '标记：将缺失作为一个特殊类别'] },
            { type: 'h4', text: '2. 异常值检测' },
            { type: 'bullet', items: ['统计方法：IQR、Z-score', '可视化方法：箱线图、散点图', '业务规则：根据业务知识判断', '处理方式：删除、修正、保留'] },
            { type: 'h4', text: '3. 数据转换' },
            { type: 'bullet', items: ['类型转换：字符串转数字、日期转换', '标准化：数据归一化、标准化', '编码：分类变量编码（独热编码、标签编码）', '特征工程：创建新的衍生特征'] },
            { type: 'quiz', question: '选择题：以下哪种方法不适合处理缺失值？', options: ['A. 删除缺失记录', 'B. 用均值填补', 'C. 忽略不管', 'D. 用插值法估计'], answer: 'C' },
            { type: 'quiz', question: '填空题：用于检测异常值的常用统计量是___。', answer: 'IQR（四分位距）或Z-score' },
            { type: 'quiz', question: '简答题：请简述数据清洗的主要步骤。', answer: '1. 缺失值处理：删除、填补、插值或标记缺失值\n2. 异常值检测：使用统计方法（IQR、Z-score）和可视化方法识别\n3. 数据转换：类型转换、标准化、编码、特征工程\n4. 去重处理：删除重复记录\n5. 格式统一：确保数据格式一致性\n6. 质量验证：清洗后再次检查数据质量' }
          ]
        }
      ]
    }
  ]

  const course = coursesData.find(c => c.id === courseId)
  const lessonNum = lessonId ? parseInt(lessonId) : 1
  const currentLesson = course?.lessons.find(l => l.id === lessonNum)

  useEffect(() => {
    if (course && lessonNum) {
      setCurrentLessonIndex(course.lessons.findIndex(l => l.id === lessonNum))
    }
  }, [course, lessonNum])

  useEffect(() => {
    const saved = localStorage.getItem(`completed_${courseId}`)
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)))
    }
  }, [courseId])

  const markComplete = () => {
    if (currentLesson) {
      const newCompleted = new Set(completedLessons)
      newCompleted.add(currentLesson.id)
      setCompletedLessons(newCompleted)
      localStorage.setItem(`completed_${courseId}`, JSON.stringify([...newCompleted]))
    }
  }

  const handleNext = () => {
    if (course && currentLessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentLessonIndex + 1]
      window.location.href = `/learning/${category}/${courseId}/lesson-${nextLesson.id}`
    }
  }

  const handlePrevious = () => {
    if (course && currentLessonIndex > 0) {
      const prevLesson = course.lessons[currentLessonIndex - 1]
      window.location.href = `/learning/${category}/${courseId}/lesson-${prevLesson.id}`
    }
  }

  const renderSection = (item: any, key: number) => {
    if (item.type === 'h2') {
      return <h2 key={key} className="text-2xl font-bold mt-8 mb-4 text-gray-900 border-b-2 pb-2 border-orange-200">{item.text}</h2>
    }
    if (item.type === 'h3') {
      return <h3 key={key} className="text-xl font-bold mt-6 mb-3 text-gray-800">{item.text}</h3>
    }
    if (item.type === 'h4') {
      return <h4 key={key} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{item.text}</h4>
    }
    if (item.type === 'p') {
      return <p key={key} className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>
    }
    if (item.type === 'bullet') {
      return (
        <ul key={key} className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
          {item.items.map((point: string, j: number) => <li key={j} className="leading-relaxed">{point}</li>)}
        </ul>
      )
    }
    if (item.type === 'table') {
      return (
        <div key={key} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr className="bg-orange-50">
                {item.headers.map((h: string, j: number) => (
                  <th key={j} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row: string[], j: number) => (
                <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell: string, k: number) => (
                    <td key={k} className="border border-gray-300 px-4 py-3 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    if (item.type === 'code') {
      return (
        <div key={key} className="my-6">
          <pre className="bg-gray-900 text-green-400 p-5 rounded-lg overflow-x-auto text-sm font-mono shadow-lg">
            <code>{item.code}</code>
          </pre>
        </div>
      )
    }
    if (item.type === 'quiz') {
      return (
        <div key={key} className="my-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">📝</span>
            <h4 className="text-lg font-bold text-blue-900">{item.question}</h4>
          </div>
          {item.options && (
            <div className="space-y-2 mb-4">
              {item.options.map((opt: string, j: number) => (
                <div key={j} className="bg-white px-4 py-2 rounded-lg border border-blue-200 text-gray-800">
                  {opt}
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-green-500">
            <div className="font-semibold text-green-800 mb-2">✅ 参考答案：</div>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item.answer}</div>
          </div>
        </div>
      )
    }
    return null
  }

  if (!course) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center bg-red-50 border-2 border-red-200 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-red-800">课程不存在</h2>
          <p className="text-gray-600 mb-4">当前课程ID: {courseId}</p>
          <p className="text-gray-600 mb-6">当前分类: {category}</p>
          <Link to="/courses" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" />
            返回课程列表
          </Link>
        </div>
      </div>
    )
  }

  if (!currentLesson) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center bg-yellow-50 border-2 border-yellow-200 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-yellow-800">章节不存在</h2>
          <p className="text-gray-600 mb-4">当前章节ID: {lessonId}</p>
          <p className="text-gray-600 mb-6">可用章节: {course.lessons.map(l => l.id).join(', ')}</p>
          <Link to={`/learning/${category}/${courseId}/lesson-1`} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            前往第一章
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/courses" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <ArrowLeft size={18} className="mr-2" />
              返回课程中心
            </Link>
            <div className="text-gray-600 text-sm">
              <Link to="/" className="hover:text-blue-600">首页</Link>
              <span className="mx-2">〈</span>
              <Link to="/courses" className="hover:text-blue-600">课程中心</Link>
              <span className="mx-2">〈</span>
              <span className="text-gray-900 font-medium">{course.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-8">
              <h3 className="font-bold mb-4 flex items-center text-gray-800">
                <Book size={18} className="mr-2 text-orange-600" />
                课程大纲
              </h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/learning/${category}/${courseId}/lesson-${lesson.id}`}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      lesson.id === currentLesson.id
                        ? 'bg-orange-50 border-2 border-orange-500'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-medium ${
                      lesson.id === currentLesson.id ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate text-gray-800">{lesson.title}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {lesson.duration}分钟
                      </div>
                    </div>
                    {completedLessons.has(lesson.id) && (
                      <CheckCircle size={18} className="text-green-500 ml-2" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">学习进度</span>
                  <span className="font-medium text-orange-600">
                    {completedLessons.size}/{course.lessons.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(completedLessons.size / course.lessons.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 mb-1">
                      章节 {currentLesson.id} / {course.lessons.length}
                    </div>
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  </div>
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <Clock size={18} className="mr-2" />
                    <span>{currentLesson.duration} 分钟</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {currentLesson.sections.map((item, i) => renderSection(item, i))}

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <button
                    onClick={markComplete}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      completedLessons.has(currentLesson.id)
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {completedLessons.has(currentLesson.id) ? '✅ 本章已完成' : '📚 标记本章学习完成'}
                  </button>
                </div>

                <div className="mt-8 flex justify-between items-center gap-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentLessonIndex === 0}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      currentLessonIndex === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <ChevronLeft size={20} className="mr-1" />
                    上一章
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    {currentLessonIndex + 1} / {course.lessons.length}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentLessonIndex === course.lessons.length - 1}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      currentLessonIndex === course.lessons.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    下一章
                    <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Learning
