import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Book, Clock, CheckCircle, ArrowLeft, ChevronRight, ChevronLeft, PlayCircle } from 'lucide-react'

interface Section {
  type: 'h2' | 'h3' | 'h4' | 'p' | 'bullet' | 'table' | 'code' | 'quiz'
  text?: string
  items?: string[]
  headers?: string[]
  rows?: string[][]
  code?: string
  language?: string
  question?: string
  options?: string[]
  answer?: string
}

interface Lesson {
  id: number
  title: string
  duration: number
  sections: Section[]
}

interface Course {
  id: string
  title: string
  category: string
  color: string
  bgColor: string
  lessons: Lesson[]
}

const Learning: React.FC = () => {
  const { category, courseId, lessonId } = useParams<{ category: string; courseId: string; lessonId?: string }>()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())

  const coursesData: Course[] = [
    {
      id: 'ecommerce-basics',
      title: '电子商务基础',
      category: 'basic',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      lessons: [
        {
          id: 1,
          title: '电子商务概述',
          duration: 45,
          sections: [
            { type: 'h2', text: '第一章：电子商务概述' },
            { type: 'h3', text: '什么是电子商务' },
            { type: 'p', text: '电子商务（Electronic Commerce，简称EC）是指通过互联网、企业内部网和增值网等电子方式进行的商业交易活动。它涵盖了在线购物、电子支付、在线营销、供应链管理等一系列商业活动。' },
            { type: 'h3', text: '电子商务的发展历程' },
            { type: 'h4', text: '第一阶段（1990-1999年）：萌芽期' },
            { type: 'bullet', items: ['互联网技术开始普及，企业建立静态网站展示信息', '1995年亚马逊和eBay的成立标志着电商平台的出现', '简单的在线交易开始出现，如网络拍卖、信息发布'] },
            { type: 'h4', text: '第二阶段（2000-2009年）：发展期' },
            { type: 'bullet', items: ['B2C模式兴起，淘宝（2003年）、京东（2004年）等电商平台崛起', '第三方支付系统出现，支付宝（2004年）解决了交易信任问题', '物流配送体系逐步完善，支撑电商发展'] },
            { type: 'h4', text: '第三阶段（2010-2019年）：成熟期' },
            { type: 'bullet', items: ['移动电商快速发展，智能手机普及带来新的购物方式', '社交电商兴起，微信电商、拼多多等新模式出现', '大数据和云计算技术广泛应用于电商运营', '跨境电商蓬勃发展，全球购成为常态'] },
            { type: 'h4', text: '第四阶段（2020年至今）：智能商业时代' },
            { type: 'bullet', items: ['AI、大数据、直播电商成为主流营销方式', '短视频电商快速崛起，抖音、快手成为重要销售渠道', '私域流量运营成为电商的重要策略', '元宇宙、虚拟购物等新兴模式开始探索'] },
            { type: 'h3', text: '电子商务的主要模式' },
            { type: 'table', headers: ['模式', '全称', '代表平台', '特点'], rows: [
              ['B2B', '企业对企业', '阿里巴巴、慧聪网', '批量交易、大额订单'],
              ['B2C', '企业对消费者', '天猫、京东、苏宁', '零售为主、标准化产品'],
              ['C2C', '消费者对消费者', '淘宝、闲鱼', '个人交易、二手商品'],
              ['O2O', '线上到线下', '美团、饿了么', '本地生活服务'],
              ['社交电商', '基于社交的电商', '拼多多、抖音商城', '社交裂变、拼团模式']
            ]},
            { type: 'h3', text: '电子商务的核心要素' },
            { type: 'bullet', items: ['信息流：商品信息、订单信息、用户信息的传递', '资金流：支付、结算、金融服务', '物流：商品的存储、运输、配送', '商流：商品所有权的转移'] },
            { type: 'h3', text: '电子商务的优势' },
            { type: 'bullet', items: ['降低成本：减少中间环节，降低运营成本', '打破地域限制：24小时在线，全球可达', '精准营销：基于大数据的个性化推荐', '高效便捷：随时随地购物，快速配送'] },
            { type: 'quiz', question: '选择题：B2C模式是指以下哪种电子商务模式？', options: ['A. 企业对企业', 'B. 企业对消费者', 'C. 消费者对消费者', 'D. 线上到线下'], answer: 'B' },
            { type: 'quiz', question: '选择题：电子商务发展的第四阶段被称为？', options: ['A. 萌芽期', 'B. 发展期', 'C. 成熟期', 'D. 智能商业时代'], answer: 'D' },
            { type: 'quiz', question: '选择题：以下哪项不是电子商务的核心要素？', options: ['A. 信息流', 'B. 资金流', 'C. 物流', 'D. 人流'], answer: 'D' },
            { type: 'quiz', question: '选择题：阿里巴巴属于哪种电子商务模式？', options: ['A. B2C', 'B. C2C', 'C. B2B', 'D. O2O'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个平台是典型的社交电商模式？', options: ['A. 京东', 'B. 拼多多', 'C. 唯品会', 'D. 苏宁'], answer: 'B' },
            { type: 'quiz', question: '填空题：电子商务的四大要素包括商流、信息流、资金流和___。', answer: '物流' },
            { type: 'quiz', question: '简答题：请简述电子商务第四阶段的主要特点。', answer: '1. AI、大数据、直播电商成为主流\n2. 短视频电商快速崛起\n3. 私域流量运营成为重要策略\n4. 全球化和跨境电商持续发展' }
          ]
        },
        {
          id: 2,
          title: '电子商务技术基础',
          duration: 60,
          sections: [
            { type: 'h2', text: '第二章：电子商务技术基础' },
            { type: 'h3', text: '互联网技术基础' },
            { type: 'p', text: '电子商务依赖于多种互联网技术的支持，这些技术构成了完整的技术体系，支撑着电商平台的正常运行。' },
            { type: 'h4', text: 'HTTP/HTTPS协议' },
            { type: 'bullet', items: ['HTTP：超文本传输协议，用于网页数据传输', 'HTTPS：安全版HTTP，通过SSL/TLS加密传输', '重要性：确保用户数据在传输过程中的安全性'] },
            { type: 'h4', text: 'Web服务器' },
            { type: 'bullet', items: ['作用：处理用户请求，返回网页内容', '常见服务器：Nginx、Apache、Tomcat', '负载均衡：分布式部署，处理高并发请求'] },
            { type: 'h4', text: '数据库系统' },
            { type: 'bullet', items: ['关系型数据库：MySQL、PostgreSQL、Oracle', 'NoSQL数据库：MongoDB、Redis（缓存）', '数据存储内容：商品信息、用户数据、订单记录'] },
            { type: 'h3', text: '电子支付系统' },
            { type: 'p', text: '电子支付是电子商务的核心环节，确保资金安全流转。' },
            { type: 'table', headers: ['支付类型', '代表平台', '特点'], rows: [
              ['第三方支付', '支付宝、微信支付', '便捷、安全、支持多种场景'],
              ['银行卡支付', '网银支付、快捷支付', '传统方式，覆盖面广'],
              ['数字人民币', '央行数字货币', '法定货币、离线支付'],
              ['预付卡', '商超卡、电商平台卡', '定向消费、礼品需求']
            ]},
            { type: 'h3', text: '物流配送系统' },
            { type: 'h4', text: '仓储管理' },
            { type: 'bullet', items: ['智能仓储：自动化货架、机器人分拣', '库存管理系统：实时监控库存水平', 'WMS系统：仓库管理系统，优化仓储流程'] },
            { type: 'h4', text: '配送网络' },
            { type: 'bullet', items: ['自建物流：京东物流、顺丰', '第三方物流：四通一达', '同城配送：美团配送、蜂鸟配送'] },
            { type: 'h3', text: '安全技术' },
            { type: 'bullet', items: ['数据加密：SSL/TLS加密传输', '身份认证：用户名密码、短信验证、生物识别', '防火墙：防止恶意攻击', '反欺诈系统：检测异常交易'] },
            { type: 'quiz', question: '选择题：以下哪种不是电子商务常用的安全技术？', options: ['A. 数据加密', 'B. 身份认证', 'C. 人工智能写作', 'D. 防火墙'], answer: 'C' },
            { type: 'quiz', question: '选择题：HTTP和HTTPS的主要区别是什么？', options: ['A. 端口不同', 'B. HTTPS加密传输', 'C. 速度不同', 'D. 没有区别'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪种数据库不是关系型数据库？', options: ['A. MySQL', 'B. MongoDB', 'C. PostgreSQL', 'D. Oracle'], answer: 'B' },
            { type: 'quiz', question: '选择题：京东物流属于哪种物流模式？', options: ['A. 第三方物流', 'B. 自建物流', 'C. 同城配送', 'D. 跨境物流'], answer: 'B' },
            { type: 'quiz', question: '选择题：数字人民币是由哪个机构发行的？', options: ['A. 支付宝', 'B. 微信支付', 'C. 中国人民银行', 'D. 商业银行'], answer: 'C' },
            { type: 'quiz', question: '填空题：电子支付的核心环节之一是___系统的支持。', answer: '第三方支付（或安全支付）' },
            { type: 'quiz', question: '简答题：请简述物流配送系统的主要组成部分。', answer: '1. 仓储管理：智能仓储、库存管理系统、WMS系统\n2. 配送网络：自建物流、第三方物流、同城配送\n3. 物流追踪：GPS定位、预计送达时间\n4. 客服系统：异常处理、用户查询' }
          ]
        },
        {
          id: 3,
          title: '电商平台运营',
          duration: 50,
          sections: [
            { type: 'h2', text: '第三章：电商平台运营' },
            { type: 'h3', text: '平台规则与店铺管理' },
            { type: 'p', text: '各大电商平台都有自己的运营规则，卖家必须严格遵守这些规则才能在平台上正常经营。' },
            { type: 'h4', text: '淘宝规则要点' },
            { type: 'bullet', items: ['店铺管理：店铺命名规范、资质认证要求、类目选择', '商品发布：标题规范、图片要求、属性填写完整度', '交易规则：发货时间要求、退换货政策、评价管理'] },
            { type: 'h4', text: '违规处罚' },
            { type: 'bullet', items: ['虚假交易：炒作信誉度将受到处罚', '侵权处理：侵犯知识产权将被下架商品', '信用炒作：违反者将受到扣分处罚'] },
            { type: 'h3', text: '运营策略' },
            { type: 'p', text: '成功的电商运营需要综合运用多种策略，从多个维度提升店铺竞争力。' },
            { type: 'h4', text: '店铺装修与视觉设计' },
            { type: 'bullet', items: ['品牌风格统一，形成识别度', '页面布局合理，导航清晰', '详情页优化：产品描述详细、图片精美'] },
            { type: 'h4', text: '商品管理与选品策略' },
            { type: 'bullet', items: ['市场调研：了解市场需求和竞争状况', '竞品分析：分析同类产品的优劣势', '差异化定位：找到自己的独特卖点'] },
            { type: 'h4', text: '定价策略' },
            { type: 'bullet', items: ['成本定价：确保利润空间', '市场定价：参考竞争对手定价', '促销定价：限时折扣、满减活动'] },
            { type: 'h3', text: '营销推广方式' },
            { type: 'table', headers: ['推广方式', '计费方式', '适用场景'], rows: [
              ['直通车', '按点击付费', '新品推广、爆款打造'],
              ['钻展', '按展现付费', '品牌曝光、活动引流'],
              ['淘客推广', '按成交付费', '销量提升、清仓处理'],
              ['直播带货', '佣金分成', '新品发布、粉丝运营']
            ]},
            { type: 'h3', text: '用户管理与会员体系' },
            { type: 'bullet', items: ['积分系统：购物积分、签到积分', '等级制度：普通会员、银卡会员、金卡会员、钻石会员', '专属权益：折扣优惠、生日礼包、优先发货'] },
            { type: 'quiz', question: '选择题：淘宝规则属于以下哪类平台规则？', options: ['A. 京东规则', 'B. 淘宝规则', 'C. 拼多多规则', 'D. 美团规则'], answer: 'B' },
            { type: 'quiz', question: '选择题：直通车推广的计费方式是？', options: ['A. 按成交付费', 'B. 按点击付费', 'C. 按展现付费', 'D. 包月付费'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪种定价策略属于促销定价？', options: ['A. 成本定价', 'B. 市场定价', 'C. 限时折扣', 'D. 撇脂定价'], answer: 'C' },
            { type: 'quiz', question: '选择题：淘客推广的计费方式是？', options: ['A. 按点击付费', 'B. 按展现付费', 'C. 按成交付费', 'D. 固定费用'], answer: 'C' },
            { type: 'quiz', question: '选择题：会员体系中，购物积分属于哪种权益？', options: ['A. 等级权益', 'B. 积分权益', 'C. 专属权益', 'D. 折扣权益'], answer: 'B' },
            { type: 'quiz', question: '填空题：常见的电商运营策略包括店铺装修、商品管理、营销推广和___。', answer: '客户服务（或用户管理）' },
            { type: 'quiz', question: '简答题：请简述如何进行有效的选品。', answer: '1. 市场调研：了解目标市场的需求和规模\n2. 竞品分析：分析同类产品的价格、销量、评价\n3. 差异化定位：找到自己有优势的具体方向\n4. 供应链评估：确保能够稳定供货\n5. 利润核算：确保有足够的利润空间' }
          ]
        },
        {
          id: 4,
          title: '电商数据分析基础',
          duration: 55,
          sections: [
            { type: 'h2', text: '第四章：电商数据分析基础' },
            { type: 'h3', text: '常用数据指标体系' },
            { type: 'p', text: '电商运营需要关注多个维度的数据指标，这些指标帮助我们了解业务状况并做出决策。' },
            { type: 'h4', text: '流量指标' },
            { type: 'table', headers: ['指标', '定义', '计算公式'], rows: [
              ['UV', '独立访客数', '去重后的访客数量'],
              ['PV', '页面浏览量', '所有页面的浏览次数总和'],
              ['转化率', '访问到购买的比例', '订单数 / UV × 100%'],
              ['跳失率', '只看一个页面就离开', '跳失访客数 / UV × 100%']
            ]},
            { type: 'h4', text: '销售指标' },
            { type: 'bullet', items: ['销售额：一段时间内的总销售收入', '订单数：成功下单的订单总数量', '客单价：平均每单金额（销售额 ÷ 订单数）', '毛利率：(销售额 - 成本) / 销售额 × 100%', '复购率：重复购买用户占总用户的比例'] },
            { type: 'h4', text: '用户指标' },
            { type: 'bullet', items: ['新增用户：首次访问或注册的用户数量', '活跃用户：一定时间内有行为的用户', '留存率：某时间段用户在后续时间仍活跃的比例', '用户生命周期价值（LTV）：用户在整个生命周期内的总贡献'] },
            { type: 'h3', text: '数据分析方法' },
            { type: 'h4', text: '1. 对比分析' },
            { type: 'bullet', items: ['同比：与去年同期对比，排除季节因素', '环比：与上一个周期对比，观察增长趋势', '与目标对比：实际完成情况 vs 目标值'] },
            { type: 'h4', text: '2. 漏斗分析' },
            { type: 'bullet', items: ['流量转化漏斗：访问 → 浏览 → 加入购物车 → 下单 → 支付', '购买转化漏斗：曝光 → 点击 → 访问 → 咨询 → 成交', '用户行为漏斗：注册 → 登录 → 浏览 → 购买'] },
            { type: 'h4', text: '3. 用户分群' },
            { type: 'bullet', items: ['按地域分群：城市、省份、区域', '按人口属性分群：年龄、性别、职业', '按消费能力分群：高、中、低消费人群', '按行为特征分群：新用户、活跃用户、沉睡用户'] },
            { type: 'h3', text: '常用分析工具' },
            { type: 'table', headers: ['工具', '适用场景', '特点'], rows: [
              ['Excel', '基础数据处理', '易用、普及度高、图表功能强'],
              ['Python', '高级数据分析', 'Pandas、NumPy、Matplotlib'],
              ['九数云', '可视化分析', '拖拽式操作、无需编程'],
              ['Tableau', '企业级BI', '强大的可视化能力'],
              ['SQL', '数据库查询', '快速提取数据']
            ]},
            { type: 'quiz', question: '选择题：UV是指什么指标？', options: ['A. 页面浏览量', 'B. 独立访客数', 'C. 转化率', 'D. 销售额'], answer: 'B' },
            { type: 'quiz', question: '选择题：客单价的计算公式是？', options: ['A. 订单数/销售额', 'B. 销售额/订单数', 'C. 销售额/访客数', 'D. 订单数/访客数'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪种数据分析方法用于分析用户转化过程？', options: ['A. 对比分析', 'B. 漏斗分析', 'C. 用户分群', 'D. 相关性分析'], answer: 'B' },
            { type: 'quiz', question: '选择题：复购率衡量的是什么？', options: ['A. 新用户比例', 'B. 用户重复购买的比例', 'C. 客单价', 'D. 转化率'], answer: 'B' },
            { type: 'quiz', question: '选择题：跳失率是指什么？', options: ['A. 只看一个页面就离开的访客比例', 'B. 购买后退货的比例', 'C. 加购后未下单的比例', 'D. 注册后未购买的比例'], answer: 'A' },
            { type: 'quiz', question: '填空题：常用的数据分析方法包括对比分析、漏斗分析、用户分群和___。', answer: '关联分析' },
            { type: 'quiz', question: '简答题：请简述什么是漏斗分析及其作用。', answer: '1. 漏斗分析是分析用户从访问到转化过程中每一步流失情况的方法\n2. 主要漏斗类型：\n   - 流量转化漏斗：访问→浏览→加购→下单→支付\n   - 购买转化漏斗：曝光→点击→访问→咨询→成交\n3. 作用：\n   - 识别转化瓶颈，找出流失最严重的环节\n   - 针对性优化，提高整体转化率\n   - 提升营销效率，降低获客成本' }
          ]
        }
      ]
    },
    {
      id: 'python-basics',
      title: 'Python数据分析入门',
      category: 'basic',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      lessons: [
        {
          id: 1,
          title: 'Python环境搭建',
          duration: 30,
          sections: [
            { type: 'h2', text: '第一章：Python环境搭建' },
            { type: 'h3', text: 'Python简介' },
            { type: 'p', text: 'Python是一种高级编程语言，由Guido van Rossum于1991年创建。它以简洁的语法和强大的功能而闻名，特别适合数据分析领域。' },
            { type: 'bullet', items: ['易学易用：语法简洁，可读性强，适合初学者', '跨平台：支持Windows、macOS、Linux', '丰富的库：拥有大量第三方库，适用于各种领域', '广泛应用：Web开发、数据分析、人工智能、自动化等'] },
            { type: 'h3', text: '安装Python' },
            { type: 'h4', text: 'Windows系统安装步骤' },
            { type: 'bullet', items: ['访问Python官网：https://www.python.org/downloads/', '下载最新版本的Python安装包', '运行安装程序，勾选"Add Python to PATH"', '选择安装路径，点击"Install Now"'] },
            { type: 'h4', text: 'macOS系统安装' },
            { type: 'bullet', items: ['方法一：直接下载安装包安装', '方法二：使用Homebrew，在终端输入brew install python3'] },
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
            { type: 'p', text: '推荐使用虚拟环境隔离项目依赖，避免不同项目之间的包冲突。' },
            { type: 'code', language: 'bash', code: '# 创建虚拟环境\npython -m venv myenv\n\n# 激活虚拟环境（Windows）\nmyenv\\Scripts\\activate\n\n# 激活虚拟环境（macOS/Linux）\nsource myenv/bin/activate\n\n# 退出虚拟环境\ndeactivate' },
            { type: 'quiz', question: '选择题：在Windows上安装Python时，需要勾选哪个选项确保Python可全局使用？', options: ['A. Install Now', 'B. Customize installation', 'C. Add Python to PATH', 'D. Download Debug Tools'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个工具用于安装Python第三方库？', options: ['A. conda', 'B. pip', 'C. npm', 'D. yarn'], answer: 'B' },
            { type: 'quiz', question: '选择题：Jupyter Notebook最适合以下哪种场景？', options: ['A. 大型项目开发', 'B. 数据分析和教学演示', 'C. Web开发', 'D. 系统编程'], answer: 'B' },
            { type: 'quiz', question: '选择题：虚拟环境的主要作用是什么？', options: ['A. 提高运行速度', 'B. 隔离项目依赖', 'C. 增加内存', 'D. 美化界面'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个命令用于导出项目依赖列表？', options: ['A. pip install', 'B. pip freeze', 'C. pip list', 'D. pip uninstall'], answer: 'B' },
            { type: 'quiz', question: '填空题：Python官方网站的域名是___。', answer: 'python.org' },
            { type: 'quiz', question: '简答题：请列举三种常用的Python开发环境，并说明各自的特点。', answer: '1. VS Code：轻量级、插件丰富、跨平台，适合日常开发和学习\n2. PyCharm：专业级IDE，功能强大，适合大型项目和团队开发\n3. Jupyter Notebook：支持交互式编程，适合数据分析和教学演示' }
          ]
        },
        {
          id: 2,
          title: 'Python基础语法',
          duration: 60,
          sections: [
            { type: 'h2', text: '第二章：Python基础语法' },
            { type: 'h3', text: '变量与数据类型' },
            { type: 'p', text: 'Python是一种动态类型语言，变量不需要声明类型，类型会在赋值时自动确定。' },
            { type: 'code', language: 'python', code: '# 变量定义\nname = "张三"    # 字符串\nage = 25         # 整数\nheight = 1.75    # 浮点数\nis_student = True  # 布尔值\n\n# 数据类型检查\nprint(type(name))       # <class \'str\'>\nprint(type(age))        # <class \'int\'>\nprint(type(height))     # <class \'float\'>\nprint(type(is_student)) # <class \'bool\'>' },
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
            { type: 'h3', text: '输入输出' },
            { type: 'code', language: 'python', code: '# 输出\nprint("Hello, World!")\nprint("姓名:", "张三")\n\n# 格式化输出\nname = "张三"\nage = 25\nprint(f"姓名: {name}, 年龄: {age}")  # f-string\nprint("姓名: {}, 年龄: {}".format(name, age))\n\n# 输入\nuser_input = input("请输入您的姓名: ")\nprint(f"您好, {user_input}!")' },
            { type: 'quiz', question: '选择题：以下哪个运算符用于幂运算？', options: ['A. *', 'B. /', 'C. **', 'D. //'], answer: 'C' },
            { type: 'quiz', question: '选择题：Python中，以下哪个是正确的注释方式？', options: ['A. /* 注释 */', 'B. // 注释', 'C. # 注释', 'D. -- 注释'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个数据类型是不可变的？', options: ['A. list', 'B. dict', 'C. str', 'D. set'], answer: 'C' },
            { type: 'quiz', question: '选择题：range(5)生成的序列是？', options: ['A. 1-5', 'B. 0-5', 'C. 0-4', 'D. 1-4'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个语句用于判断多个条件？', options: ['A. if', 'B. elif', 'C. else', 'D. while'], answer: 'B' },
            { type: 'quiz', question: '填空题：Python中，使用___关键字可以跳出循环。', answer: 'break' },
            { type: 'quiz', question: '编程实践：编写一个Python程序，使用for循环计算1到100的累加和。', answer: 'total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)  # 输出: 5050' }
          ]
        },
        {
          id: 3,
          title: '函数和模块',
          duration: 50,
          sections: [
            { type: 'h2', text: '第三章：函数和模块' },
            { type: 'h3', text: '函数定义与调用' },
            { type: 'p', text: '函数是组织好的、可重复使用的代码块，用于执行特定任务。函数可以提高代码的模块性和重用性。' },
            { type: 'code', language: 'python', code: 'def greet(name):\n    """问候函数 - 向用户打招呼\n    \n    参数:\n        name: 姓名\n    返回:\n        问候语\n    """\n    return f"你好, {name}!"\n\nresult = greet("张三")\nprint(result)  # 输出: 你好, 张三!' },
            { type: 'h3', text: '函数参数' },
            { type: 'code', language: 'python', code: '# 默认参数\ndef add(a, b=0):\n    """加法函数，b默认为0"""\n    return a + b\n\nprint(add(5))      # 5\nprint(add(5, 3))   # 8\n\n# 关键字参数\ndef introduce(name, age, city="北京"):\n    print(f"姓名: {name}, 年龄: {age}, 城市: {city}")\n\nintroduce("张三", 25)\nintroduce("李四", 30, city="上海")\n\n# 可变参数\ndef sum_all(*args):\n    """计算所有参数的和"""\n    total = 0\n    for num in args:\n        total += num\n    return total\n\nprint(sum_all(1, 2, 3, 4))  # 10' },
            { type: 'h3', text: '模块导入' },
            { type: 'p', text: '模块是包含Python定义和语句的文件，用于组织代码。一个.py文件就是一个模块。' },
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
            { type: 'quiz', question: '选择题：定义函数时，参数可以有默认值吗？', options: ['A. 不可以', 'B. 可以', 'C. 只有关键字参数可以', 'D. 只有位置参数可以'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个模块用于处理JSON数据？', options: ['A. csv', 'B. json', 'C. math', 'D. random'], answer: 'B' },
            { type: 'quiz', question: '选择题：import numpy as np 的作用是？', options: ['A. 导入numpy模块并命名为np', 'B. 导入np模块并命名为numpy', 'C. 导入numpy中的np函数', 'D. 导入numpy和np两个模块'], answer: 'A' },
            { type: 'quiz', question: '选择题：函数中return语句的作用是什么？', options: ['A. 打印输出', 'B. 返回值给调用者', 'C. 定义变量', 'D. 结束循环'], answer: 'B' },
            { type: 'quiz', question: '填空题：定义函数使用___关键字。', answer: 'def' },
            { type: 'quiz', question: '简答题：请简述Python模块和包的区别。', answer: '1. 模块（Module）：一个独立的Python文件（.py文件），包含函数、类、变量等定义\n2. 包（Package）：包含__init__.py文件的文件夹，用于组织多个相关模块\n3. 关系：包是由多个模块组成的集合，一个包中可以包含多个模块和子包' }
          ]
        },
        {
          id: 4,
          title: '数据结构',
          duration: 55,
          sections: [
            { type: 'h2', text: '第四章：数据结构' },
            { type: 'h3', text: '列表（List）' },
            { type: 'p', text: '列表是Python中最常用的数据结构之一，可以存储有序的可变元素集合。' },
            { type: 'code', language: 'python', code: '# 创建列表\nfruits = ["apple", "banana", "cherry"]\nnumbers = [1, 2, 3, 4, 5]\nmixed = [1, "hello", 3.14, True]\n\n# 索引访问\nprint(fruits[0])   # apple\nprint(fruits[-1])  # cherry\n\n# 切片\nprint(fruits[1:3])  # [\'banana\', \'cherry\']\n\n# 添加元素\nfruits.append("orange")\nfruits.insert(1, "grape")\n\n# 删除元素\nfruits.remove("banana")\ndel fruits[0]\npopped = fruits.pop()' },
            { type: 'h3', text: '元组（Tuple）' },
            { type: 'p', text: '元组与列表类似，但元组是不可变的，创建后不能修改。' },
            { type: 'code', language: 'python', code: '# 创建元组\npoint = (10, 20)\ncolors = ("red", "green", "blue")\n\n# 索引访问\nprint(point[0])  # 10\n\n# 解包\nx, y = point\nprint(f"x={x}, y={y}")\n\n# 元组不可修改，以下操作会报错\n# point[0] = 15  # TypeError' },
            { type: 'h3', text: '字典（Dictionary）' },
            { type: 'p', text: '字典存储键值对（key-value pairs），是一种高效的数据结构。' },
            { type: 'code', language: 'python', code: '# 创建字典\nperson = {\n    "name": "张三",\n    "age": 25,\n    "city": "北京"\n}\n\n# 访问值\nprint(person["name"])  # 张三\nprint(person.get("age"))  # 25\n\n# 添加/修改\nperson["email"] = "zhangsan@example.com"\nperson["age"] = 26\n\n# 删除\ndel person["city"]\npopped = person.pop("email")\n\n# 遍历\nfor key, value in person.items():\n    print(f"{key}: {value}")' },
            { type: 'h3', text: '集合（Set）' },
            { type: 'p', text: '集合是无序的不重复元素集，支持数学集合运算。' },
            { type: 'code', language: 'python', code: '# 创建集合\nfruits = {"apple", "banana", "cherry"}\nnumbers = {1, 2, 3, 4, 5}\n\n# 添加/删除\nfruits.add("orange")\nfruits.remove("banana")\n\n# 集合运算\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a | b)  # 并集: {1, 2, 3, 4, 5, 6}\nprint(a & b)  # 交集: {3, 4}\nprint(a - b)  # 差集: {1, 2}' },
            { type: 'quiz', question: '选择题：以下哪个数据结构是可变的且可以存储重复元素？', options: ['A. 元组', 'B. 集合', 'C. 列表', 'D. 字典'], answer: 'C' },
            { type: 'quiz', question: '选择题：集合的特点是什么？', options: ['A. 有序、可重复', 'B. 无序、不可重复', 'C. 有序、不可重复', 'D. 无序、可重复'], answer: 'B' },
            { type: 'quiz', question: '选择题：字典的键必须满足什么条件？', options: ['A. 必须是字符串', 'B. 必须是数字', 'C. 必须是不可变的', 'D. 没有限制'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个方法用于向列表末尾添加元素？', options: ['A. insert()', 'B. append()', 'C. extend()', 'D. add()'], answer: 'B' },
            { type: 'quiz', question: '选择题：元组和列表的主要区别是什么？', options: ['A. 语法不同', 'B. 元组不可变', 'C. 列表不可变', 'D. 没有区别'], answer: 'B' },
            { type: 'quiz', question: '填空题：字典使用___来访问值。', answer: '键（或key）' },
            { type: 'quiz', question: '简答题：请说明列表和元组的主要区别。', answer: '1. 可变性：列表是可变的，可以添加、删除、修改元素；元组是不可变的，创建后不能修改\n2. 性能：元组比列表轻量，性能略好\n3. 用途：列表用于需要修改的数据集合；元组用于固定不变的数据，如函数返回值\n4. 语法：列表用方括号[]，元组用圆括号()' }
          ]
        },
        {
          id: 5,
          title: '文件操作',
          duration: 45,
          sections: [
            { type: 'h2', text: '第五章：文件操作' },
            { type: 'h3', text: '文件读取' },
            { type: 'p', text: 'Python提供了强大的文件操作功能，可以读写各种类型的文件。' },
            { type: 'code', language: 'python', code: '# 读取整个文件\nwith open("example.txt", "r", encoding="utf-8") as f:\n    content = f.read()\n    print(content)\n\n# 按行读取\nwith open("example.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())\n\n# 读取所有行到列表\nwith open("example.txt", "r", encoding="utf-8") as f:\n    lines = f.readlines()' },
            { type: 'h3', text: '文件写入' },
            { type: 'code', language: 'python', code: '# 写入文件（覆盖）\nwith open("output.txt", "w", encoding="utf-8") as f:\n    f.write("Hello, World!\\n")\n    f.write("第二行内容")\n\n# 追加写入\nwith open("output.txt", "a", encoding="utf-8") as f:\n    f.write("\\n这是追加的内容")' },
            { type: 'h3', text: 'CSV文件操作' },
            { type: 'code', language: 'python', code: 'import csv\n\n# 读取CSV\nwith open("data.csv", "r", encoding="utf-8") as f:\n    reader = csv.reader(f)\n    for row in reader:\n        print(row)\n\n# 写入CSV\nwith open("output.csv", "w", encoding="utf-8", newline="") as f:\n    writer = csv.writer(f)\n    writer.writerow(["姓名", "年龄", "城市"])\n    writer.writerow(["张三", 25, "北京"])\n    writer.writerow(["李四", 30, "上海"])' },
            { type: 'h3', text: 'JSON文件操作' },
            { type: 'code', language: 'python', code: 'import json\n\n# 写入JSON\ndata = {\n    "name": "张三",\n    "age": 25,\n    "skills": ["Python", "SQL", "Excel"]\n}\nwith open("data.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, ensure_ascii=False, indent=2)\n\n# 读取JSON\nwith open("data.json", "r", encoding="utf-8") as f:\n    loaded_data = json.load(f)\n    print(loaded_data)' },
            { type: 'quiz', question: '选择题：读取文件时使用什么模式可以避免中文乱码？', options: ['A. r', 'B. rb', 'C. r编码utf-8', 'D. rw'], answer: 'C' },
            { type: 'quiz', question: '选择题：以下哪个模式用于追加写入文件？', options: ['A. w', 'B. r', 'C. a', 'D. x'], answer: 'C' },
            { type: 'quiz', question: '选择题：with语句的主要作用是什么？', options: ['A. 简化循环', 'B. 自动管理资源', 'C. 定义函数', 'D. 条件判断'], answer: 'B' },
            { type: 'quiz', question: '选择题：json.dump()函数的作用是什么？', options: ['A. 读取JSON文件', 'B. 写入JSON文件', 'C. 解析JSON字符串', 'D. 格式化JSON'], answer: 'B' },
            { type: 'quiz', question: '选择题：csv模块中，哪个方法用于写入一行数据？', options: ['A. write()', 'B. writerow()', 'C. writeline()', 'D. write_csv()'], answer: 'B' },
            { type: 'quiz', question: '填空题：使用with语句打开文件可以自动处理文件的___。', answer: '关闭（或资源释放）' },
            { type: 'quiz', question: '简答题：请说明如何安全地处理文件操作。', answer: '1. 使用with语句自动关闭文件，避免资源泄漏\n2. 指定正确的文件编码（如encoding="utf-8"）避免乱码\n3. 使用try-except捕获文件操作可能出现的异常\n4. 检查文件是否存在后再操作\n5. 写入前做好数据备份' }
          ]
        },
        {
          id: 6,
          title: '面向对象编程',
          duration: 50,
          sections: [
            { type: 'h2', text: '第六章：面向对象编程' },
            { type: 'h3', text: '类和对象' },
            { type: 'p', text: '面向对象编程（OOP）是一种编程范式，它使用"对象"来设计软件。类是对象的蓝图或模板。' },
            { type: 'code', language: 'python', code: 'class Student:\n    """学生类"""\n    \n    def __init__(self, name, age, student_id):\n        """初始化方法"""\n        self.name = name\n        self.age = age\n        self.student_id = student_id\n        self.grades = []\n    \n    def add_grade(self, grade):\n        """添加成绩"""\n        self.grades.append(grade)\n    \n    def get_average(self):\n        """计算平均分"""\n        if not self.grades:\n            return 0\n        return sum(self.grades) / len(self.grades)\n    \n    def display_info(self):\n        """显示学生信息"""\n        print(f"学号: {self.student_id}")\n        print(f"姓名: {self.name}")\n        print(f"年龄: {self.age}")\n        print(f"成绩: {self.grades}")\n        print(f"平均分: {self.get_average():.2f}")\n\n# 创建对象\nstudent1 = Student("张三", 20, "S001")\nstudent1.add_grade(85)\nstudent1.add_grade(92)\nstudent1.add_grade(78)\nstudent1.display_info()' },
            { type: 'h3', text: '继承' },
            { type: 'code', language: 'python', code: 'class Person:\n    """人类"""\n    \n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def introduce(self):\n        print(f"我是{self.name}，今年{self.age}岁")\n\nclass Student(Person):\n    """学生类，继承自人类"""\n    \n    def __init__(self, name, age, student_id):\n        super().__init__(name, age)  # 调用父类的初始化方法\n        self.student_id = student_id\n    \n    def introduce(self):  # 重写父类方法\n        print(f"我是学生{self.name}，学号{self.student_id}")\n\n# 创建学生对象\nstudent = Student("李四", 18, "S002")\nstudent.introduce()  # 输出: 我是学生李四，学号S002' },
            { type: 'h3', text: '封装与多态' },
            { type: 'code', language: 'python', code: 'class BankAccount:\n    """银行账户类 - 演示封装"""\n    \n    def __init__(self, account_id, balance=0):\n        self._account_id = account_id  # 受保护属性\n        self.__balance = balance  # 私有属性\n    \n    def deposit(self, amount):\n        """存款"""\n        if amount > 0:\n            self.__balance += amount\n            return True\n        return False\n    \n    def withdraw(self, amount):\n        """取款"""\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n    \n    def get_balance(self):\n        """获取余额"""\n        return self.__balance\n\n# 使用账户\naccount = BankAccount("ACC001", 1000)\naccount.deposit(500)\naccount.withdraw(200)\nprint(f"余额: {account.get_balance()}")  # 1300' },
            { type: 'quiz', question: '选择题：类中以双下划线开头的属性称为___属性？', options: ['A. 公有', 'B. 保护', 'C. 私有', 'D. 特殊'], answer: 'C' },
            { type: 'quiz', question: '选择题：__init__方法的作用是什么？', options: ['A. 定义类', 'B. 初始化对象', 'C. 调用方法', 'D. 继承父类'], answer: 'B' },
            { type: 'quiz', question: '选择题：继承的作用是什么？', options: ['A. 提高代码运行速度', 'B. 实现代码重用', 'C. 增加内存', 'D. 简化语法'], answer: 'B' },
            { type: 'quiz', question: '选择题：Python中，子类如何调用父类的初始化方法？', options: ['A. parent.__init__()', 'B. super().__init__()', 'C. self.__init__()', 'D. 无法调用'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是面向对象编程的特性？', options: ['A. 递归', 'B. 封装', 'C. 循环', 'D. 条件判断'], answer: 'B' },
            { type: 'quiz', question: '填空题：使用___关键字可以调用父类的方法。', answer: 'super()' },
            { type: 'quiz', question: '简答题：请简述面向对象编程的三大特性。', answer: '1. 封装：将数据和操作数据的方法封装在类中，隐藏内部实现细节\n2. 继承：子类可以继承父类的属性和方法，实现代码重用\n3. 多态：不同对象对同一消息做出不同响应，增加灵活性' }
          ]
        }
      ]
    },
    {
      id: 'data-collection',
      title: '数据采集与清洗',
      category: 'core',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      lessons: [
        {
          id: 1,
          title: '数据采集概述',
          duration: 45,
          sections: [
            { type: 'h2', text: '第一章：数据采集概述' },
            { type: 'h3', text: '什么是数据采集' },
            { type: 'p', text: '数据采集是指从各种数据源获取数据的过程，是数据分析的第一步。没有高质量的数据，就无法进行有效的分析。' },
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
            { type: 'bullet', items: ['遵守robots.txt协议，不爬取禁止的内容', '尊重数据所有权和版权，使用合法数据源', '保护个人隐私，遵守GDPR、数据安全法等法规', '避免对目标网站造成过大压力，控制爬取频率', '数据使用透明化，注明数据来源'] },
            { type: 'quiz', question: '选择题：以下哪种数据采集方式最适合获取电商商品信息？', options: ['A. 数据库查询', 'B. 网络爬虫', 'C. 传感器采集', 'D. 文件导入'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪项不是数据采集的数据源类型？', options: ['A. 公开数据', 'B. 网页数据', 'C. API数据', 'D. 虚构数据'], answer: 'D' },
            { type: 'quiz', question: '选择题：数据伦理中最重要的原则是什么？', options: ['A. 速度第一', 'B. 遵守法律法规', 'C. 数据越多越好', 'D. 无需注明来源'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪种方法适合获取企业内部数据？', options: ['A. 网络爬虫', 'B. 数据库查询', 'C. 传感器采集', 'D. API调用'], answer: 'B' },
            { type: 'quiz', question: '选择题：robots.txt文件的作用是什么？', options: ['A. 加速爬取', 'B. 告诉爬虫哪些页面可以爬取', 'C. 加密数据', 'D. 存储数据'], answer: 'B' },
            { type: 'quiz', question: '填空题：网站通常通过___文件告诉爬虫哪些页面可以爬取。', answer: 'robots.txt' },
            { type: 'quiz', question: '简答题：请简述数据采集的主要方法和适用场景。', answer: '1. 网络爬虫：自动化获取网页内容，适合电商、新闻、论坛等网站\n2. API调用：通过API接口获取数据，适合社交媒体、开放平台\n3. 数据库查询：SQL查询获取结构化数据，适合企业数据\n4. 文件导入：读取CSV、Excel等文件，适合报表和数据文件\n5. 传感器采集：实时获取设备数据，适合物联网和监控系统' }
          ]
        },
        {
          id: 2,
          title: '网络爬虫基础',
          duration: 60,
          sections: [
            { type: 'h2', text: '第二章：网络爬虫基础' },
            { type: 'h3', text: 'HTTP协议基础' },
            { type: 'p', text: '理解HTTP协议是编写爬虫的基础。HTTP是一种请求-响应协议，客户端发送请求，服务器返回响应。' },
            { type: 'h4', text: 'HTTP请求方法' },
            { type: 'bullet', items: ['GET：请求获取指定资源，最常用的请求方法', 'POST：向服务器提交数据', 'PUT：更新指定资源', 'DELETE：删除指定资源'] },
            { type: 'h4', text: 'HTTP状态码' },
            { type: 'bullet', items: ['200 OK：请求成功', '404 Not Found：资源不存在', '403 Forbidden：禁止访问', '500 Internal Server Error：服务器错误'] },
            { type: 'h3', text: 'Python网络请求' },
            { type: 'code', language: 'python', code: 'import requests\n\n# GET请求\nresponse = requests.get("https://api.example.com/data")\nprint(response.status_code)\nprint(response.text)\nprint(response.json())\n\n# POST请求\ndata = {"username": "test", "password": "123456"}\nresponse = requests.post("https://api.example.com/login", json=data)\n\n# 带参数请求\nparams = {"page": 1, "limit": 10}\nresponse = requests.get("https://api.example.com/list", params=params)\n\n# 设置请求头\nheaders = {"User-Agent": "Mozilla/5.0"}\nresponse = requests.get("https://example.com", headers=headers)' },
            { type: 'h3', text: 'HTML解析基础' },
            { type: 'p', text: '获取网页内容后，需要解析HTML来提取所需数据。BeautifulSoup是最常用的HTML解析库。' },
            { type: 'code', language: 'python', code: 'from bs4 import BeautifulSoup\n\nhtml = """\n<html>\n    <head><title>示例页面</title></head>\n    <body>\n        <div class="product">\n            <h2>商品名称</h2>\n            <p class="price">99.00元</p>\n        </div>\n    </body>\n</html>\n"""\n\nsoup = BeautifulSoup(html, "html.parser")\n\n# 查找元素\ntitle = soup.find("title").text\nproduct = soup.find("div", class_="product")\nproduct_name = product.find("h2").text\nprice = product.find("p", class_="price").text\n\nprint(f"标题: {title}")\nprint(f"商品: {product_name}")\nprint(f"价格: {price}")' },
            { type: 'quiz', question: '选择题：以下哪个HTTP方法最适合获取网页内容？', options: ['A. POST', 'B. GET', 'C. PUT', 'D. DELETE'], answer: 'B' },
            { type: 'quiz', question: '选择题：HTTP状态码200表示什么？', options: ['A. 请求成功', 'B. 资源不存在', 'C. 禁止访问', 'D. 服务器错误'], answer: 'A' },
            { type: 'quiz', question: '选择题：BeautifulSoup库的作用是什么？', options: ['A. 发送HTTP请求', 'B. 解析HTML', 'C. 存储数据', 'D. 加密数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是常见的反爬措施？', options: ['A. 设置请求头', 'B. 使用代理', 'C. 验证码', 'D. 加快爬取速度'], answer: 'C' },
            { type: 'quiz', question: '选择题：requests库中，哪个方法用于发送GET请求？', options: ['A. requests.post()', 'B. requests.get()', 'C. requests.put()', 'D. requests.delete()'], answer: 'B' },
            { type: 'quiz', question: '填空题：Python中用于发送HTTP请求最常用的库是___。', answer: 'requests' },
            { type: 'quiz', question: '简答题：请简述编写爬虫的基本步骤。', answer: '1. 分析目标网站结构，了解数据分布\n2. 发送HTTP请求获取网页内容\n3. 解析HTML提取所需数据\n4. 存储数据到本地文件或数据库\n5. 处理反爬措施（设置请求头、控制频率、使用代理等）\n6. 遵守robots.txt和网站使用协议' }
          ]
        },
        {
          id: 3,
          title: 'Scrapy框架实战',
          duration: 70,
          sections: [
            { type: 'h2', text: '第三章：Scrapy框架实战' },
            { type: 'h3', text: 'Scrapy简介' },
            { type: 'p', text: 'Scrapy是一个快速的Web爬虫框架，用于爬取网站数据并提取结构化数据。它功能强大且易于使用。' },
            { type: 'h3', text: 'Scrapy项目创建' },
            { type: 'code', language: 'bash', code: '# 安装Scrapy\npip install scrapy\n\n# 创建新项目\nscrapy startproject myspider\n\n# 进入项目目录\ncd myspider\n\n# 创建爬虫\nscrapy genspider example example.com' },
            { type: 'h3', text: '编写Spider' },
            { type: 'code', language: 'python', code: 'import scrapy\n\nclass ExampleSpider(scrapy.Spider):\n    name = "example"\n    allowed_domains = ["example.com"]\n    start_urls = ["https://www.example.com/products"]\n    \n    def parse(self, response):\n        # 提取商品列表\n        for product in response.css("div.product"):\n            yield {\n                "name": product.css("h3::text").get(),\n                "price": product.css("p.price::text").get(),\n                "url": product.css("a::attr(href)").get()\n            }\n        \n        # 翻页\n        next_page = response.css("a.next::attr(href)").get()\n        if next_page:\n            yield response.follow(next_page, self.parse)' },
            { type: 'h3', text: 'Scrapy数据管道' },
            { type: 'code', language: 'python', code: '# pipelines.py\nimport json\n\nclass JsonWriterPipeline:\n    \n    def open_spider(self, spider):\n        self.file = open("items.json", "w", encoding="utf-8")\n    \n    def close_spider(self, spider):\n        self.file.close()\n    \n    def process_item(self, item, spider):\n        line = json.dumps(dict(item), ensure_ascii=False) + "\\n"\n        self.file.write(line)\n        return item\n\n# settings.py 中启用管道\n# ITEM_PIPELINES = {\n#     "myspider.pipelines.JsonWriterPipeline": 300,\n# }' },
            { type: 'quiz', question: '选择题：Scrapy框架中，用于解析HTML的方法是？', options: ['A. requests', 'B. BeautifulSoup', 'C. CSS选择器或XPath', 'D. selenium'], answer: 'C' },
            { type: 'quiz', question: '选择题：Scrapy框架的核心组件是什么？', options: ['A. 爬虫', 'B. 引擎', 'C. 调度器', 'D. 下载器'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个命令用于创建Scrapy项目？', options: ['A. scrapy startproject', 'B. scrapy create', 'C. scrapy init', 'D. scrapy new'], answer: 'A' },
            { type: 'quiz', question: '选择题：Scrapy的Item Pipeline的作用是什么？', options: ['A. 发送请求', 'B. 处理提取的数据', 'C. 解析HTML', 'D. 管理URL队列'], answer: 'B' },
            { type: 'quiz', question: '选择题：yield关键字在Scrapy中的作用是什么？', options: ['A. 返回值', 'B. 生成Item', 'C. 结束函数', 'D. 异常处理'], answer: 'B' },
            { type: 'quiz', question: '填空题：Scrapy框架的start_urls用于定义___。', answer: '起始URL列表' },
            { type: 'quiz', question: '简答题：请简述Scrapy的工作流程。', answer: '1. Spiders（爬虫）：定义如何爬取某个网站，提取数据\n2. Scrapy Engine（引擎）：控制整个系统的数据流\n3. Scheduler（调度器）：管理待爬取的URL请求\n4. Downloader（下载器）：下载网页内容\n5. Item Pipeline（管道）：处理提取的数据，如保存到文件\n6. Middleware（中间件）：处理请求和响应的钩子' }
          ]
        },
        {
          id: 4,
          title: 'API数据获取',
          duration: 50,
          sections: [
            { type: 'h2', text: '第四章：API数据获取' },
            { type: 'h3', text: 'API基础概念' },
            { type: 'p', text: 'API（Application Programming Interface）是应用程序编程接口，允许不同软件之间进行数据交换。' },
            { type: 'bullet', items: ['RESTful API：基于HTTP协议，使用JSON格式传输数据', 'GraphQL：一种查询语言，允许客户端指定需要的数据', 'WebSocket：实现双向实时通信'] },
            { type: 'h3', text: '调用RESTful API' },
            { type: 'code', language: 'python', code: 'import requests\n\n# 基本GET请求\nresponse = requests.get("https://api.github.com/users")\nprint(response.status_code)\ndata = response.json()\n\n# 带认证的请求\nheaders = {"Authorization": "token YOUR_TOKEN"}\nresponse = requests.get("https://api.github.com/user/repos", headers=headers)\n\n# 处理分页\npage = 1\nwhile True:\n    params = {"page": page, "per_page": 100}\n    response = requests.get("https://api.example.com/data", params=params)\n    if not response.json():\n        break\n    # 处理数据\n    page += 1' },
            { type: 'h3', text: 'API认证方式' },
            { type: 'table', headers: ['认证方式', '说明', '适用场景'], rows: [
              ['API Key', '简单的密钥认证', '非敏感数据'],
              ['OAuth 2.0', '授权认证流程', '需要用户授权的场景'],
              ['JWT', 'JSON Web Token', '无状态的认证'],
              ['Basic Auth', '用户名密码认证', '测试环境简单认证']
            ]},
            { type: 'h3', text: '处理API响应' },
            { type: 'code', language: 'python', code: 'import requests\nfrom time import sleep\n\ndef fetch_with_retry(url, max_retries=3):\n    \"\"\"带重试的API请求\"\"\"\n    for attempt in range(max_retries):\n        try:\n            response = requests.get(url, timeout=10)\n            response.raise_for_status()  # 检查HTTP错误\n            return response.json()\n        except requests.exceptions.RequestException as e:\n            print(f"请求失败: {e}\")\n            if attempt < max_retries - 1:\n                sleep(2 ** attempt)  # 指数退避\n            else:\n                raise\n\n# 使用示例\ndata = fetch_with_retry("https://api.example.com/data")\nprint(data)' },
            { type: 'quiz', question: '选择题：以下哪个不是常见的API认证方式？', options: ['A. OAuth 2.0', 'B. API Key', 'C. Web Scraping', 'D. JWT'], answer: 'C' },
            { type: 'quiz', question: '选择题：RESTful API通常使用什么格式传输数据？', options: ['A. XML', 'B. JSON', 'C. CSV', 'D. HTML'], answer: 'B' },
            { type: 'quiz', question: '选择题：OAuth 2.0用于什么场景？', options: ['A. 数据库连接', 'B. 用户授权', 'C. 文件存储', 'D. 数据加密'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是API调用时需要注意的事项？', options: ['A. 忽略状态码', 'B. 不设置认证', 'C. 遵守频率限制', 'D. 不验证数据'], answer: 'C' },
            { type: 'quiz', question: '选择题：GraphQL与RESTful API的主要区别是什么？', options: ['A. 速度更快', 'B. 客户端指定需要的数据', 'C. 使用XML格式', 'D. 不需要认证'], answer: 'B' },
            { type: 'quiz', question: '填空题：RESTful API通常使用___格式传输数据。', answer: 'JSON' },
            { type: 'quiz', question: '简答题：请简述调用外部API的注意事项。', answer: '1. 处理认证：按照API要求添加认证信息\n2. 错误处理：检查响应状态码，处理异常情况\n3. 频率限制：遵守API的调用频率限制，必要时添加延迟\n4. 数据验证：验证返回数据的完整性和正确性\n5. 费用问题：注意付费API的使用成本' }
          ]
        },
        {
          id: 5,
          title: '数据清洗技术',
          duration: 55,
          sections: [
            { type: 'h2', text: '第五章：数据清洗技术' },
            { type: 'h3', text: '数据质量评估' },
            { type: 'p', text: '在进行分析之前，必须评估数据的质量。高质量的数据是有效分析的基础。' },
            { type: 'table', headers: ['质量维度', '描述', '检查方法'], rows: [
              ['完整性', '数据是否有缺失', '检查NULL值、空字段'],
              ['准确性', '数据是否正确', '与来源数据对比、抽样检查'],
              ['一致性', '数据格式是否统一', '检查日期、数值格式'],
              ['及时性', '数据是否最新', '检查数据更新时间']
            ]},
            { type: 'h3', text: '缺失值处理' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndf = pd.DataFrame({\n    "A": [1, 2, np.nan, 4],\n    "B": [5, np.nan, np.nan, 8],\n    "C": ["a", "b", "c", "d"]\n})\n\n# 检测缺失值\nprint(df.isnull().sum())\n\n# 删除缺失值\ndf_dropped = df.dropna()\n\n# 用均值填充数值型缺失值\ndf["A"].fillna(df["A"].mean(), inplace=True)\n\n# 用众数填充分类型缺失值\ndf["B"].fillna(df["B"].mode()[0], inplace=True)\n\n# 用前一个值填充（向前填充）\ndf.fillna(method="ffill", inplace=True)' },
            { type: 'h3', text: '异常值检测' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\n\n# 使用IQR方法检测异常值\ndef detect_outliers_iqr(data, column):\n    Q1 = data[column].quantile(0.25)\n    Q3 = data[column].quantile(0.75)\n    IQR = Q3 - Q1\n    lower_bound = Q1 - 1.5 * IQR\n    upper_bound = Q3 + 1.5 * IQR\n    outliers = data[(data[column] < lower_bound) | (data[column] > upper_bound)]\n    return outliers, lower_bound, upper_bound\n\n# 使用Z-score方法\nfrom scipy import stats\n\ndef detect_outliers_zscore(data, column, threshold=3):\n    z_scores = np.abs(stats.zscore(data[column]))\n    outliers = data[z_scores > threshold]\n    return outliers\n\n# 可视化检测 - 箱线图\nimport matplotlib.pyplot as plt\nplt.boxplot(df["A"])\nplt.show()' },
            { type: 'h3', text: '数据转换' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\n\n# 类型转换\ndf["date"] = pd.to_datetime(df["date"])\ndf["price"] = df["price"].astype(float)\n\n# 数据标准化\nscaler = StandardScaler()\ndf["normalized"] = scaler.fit_transform(df[["A"]])\n\n# 分类变量编码\nle = LabelEncoder()\ndf["category_encoded"] = le.fit_transform(df["category"])\n\n# 创建派生字段\ndf["year"] = df["date"].dt.year\ndf["month"] = df["date"].dt.month\ndf["price_range"] = pd.cut(df["price"], bins=[0, 10, 50, 100], labels=["低", "中", "高"])' },
            { type: 'quiz', question: '选择题：以下哪种方法不适合处理缺失值？', options: ['A. 删除缺失记录', 'B. 用均值填补', 'C. 忽略不管', 'D. 用插值法估计'], answer: 'C' },
            { type: 'quiz', question: '选择题：IQR方法用于检测什么？', options: ['A. 缺失值', 'B. 异常值', 'C. 重复值', 'D. 错误值'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个不是数据质量维度？', options: ['A. 完整性', 'B. 准确性', 'C. 美观性', 'D. 一致性'], answer: 'C' },
            { type: 'quiz', question: '选择题：LabelEncoder用于什么目的？', options: ['A. 数值标准化', 'B. 分类变量编码', 'C. 缺失值填补', 'D. 异常值处理'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据清洗通常占数据分析项目的时间比例是？', options: ['A. 10%-20%', 'B. 30%-40%', 'C. 60%-80%', 'D. 90%以上'], answer: 'C' },
            { type: 'quiz', question: '填空题：用于检测异常值的常用统计量是___。', answer: 'IQR（四分位距）或Z-score' },
            { type: 'quiz', question: '简答题：请简述数据清洗的主要步骤。', answer: '1. 数据质量评估：检查完整性、准确性、一致性、及时性\n2. 缺失值处理：删除、用均值/众数填补、插值\n3. 异常值检测：IQR方法、Z-score方法、可视化\n4. 数据转换：类型转换、标准化、编码\n5. 去重处理：删除重复记录\n6. 格式统一：确保数据格式一致性\n7. 质量验证：清洗后再次检查数据质量' }
          ]
        }
      ]
    },
    {
      id: 'data-visualization',
      title: '数据可视化实战',
      category: 'core',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      lessons: [
        {
          id: 1,
          title: '数据可视化基础',
          duration: 40,
          sections: [
            { type: 'h2', text: '第一章：数据可视化基础' },
            { type: 'h3', text: '什么是数据可视化' },
            { type: 'p', text: '数据可视化是将数据转换为图形或图像形式的过程，以便更直观地理解和分析数据。好的可视化能够让我们一眼看出数据中的规律和洞察。' },
            { type: 'h3', text: '可视化的重要性' },
            { type: 'bullet', items: ['快速理解：图表比表格更容易理解数据', '发现模式：可视化帮助发现数据中的趋势和规律', '有效沟通：图形化的报告更具说服力', '记忆深刻：可视化信息更容易被记住'] },
            { type: 'h3', text: '选择合适的图表类型' },
            { type: 'table', headers: ['图表类型', '用途', '示例'], rows: [
              ['折线图', '展示趋势变化', '销售额随时间变化'],
              ['柱状图', '对比不同类别', '各地区销量对比'],
              ['饼图', '展示占比关系', '市场份额分布'],
              ['散点图', '展示相关性', '价格与销量关系'],
              ['热力图', '展示密度分布', '用户访问热力图'],
              ['仪表盘', '展示关键指标', 'KPI监控仪表盘']
            ]},
            { type: 'h3', text: '可视化设计原则' },
            { type: 'bullet', items: ['简洁明了：去除不必要的装饰元素', '选择合适的图表类型：根据数据关系选择', '注意颜色的使用：区分不同数据系列', '添加清晰的标签和标题', '考虑受众：确保目标读者能理解'] },
            { type: 'quiz', question: '选择题：以下哪种图表最适合展示数据随时间的变化趋势？', options: ['A. 饼图', 'B. 散点图', 'C. 折线图', 'D. 热力图'], answer: 'C' },
            { type: 'quiz', question: '选择题：展示各部分占整体比例应该使用什么图表？', options: ['A. 折线图', 'B. 柱状图', 'C. 饼图', 'D. 散点图'], answer: 'C' },
            { type: 'quiz', question: '选择题：展示两个变量之间的关系应该使用什么图表？', options: ['A. 饼图', 'B. 散点图', 'C. 柱状图', 'D. 仪表盘'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据可视化设计原则中，以下哪项最重要？', options: ['A. 颜色鲜艳', 'B. 简洁明了', 'C. 动画效果', 'D. 复杂装饰'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个不是常见的可视化图表类型？', options: ['A. 漏斗图', 'B. 气泡图', 'C. 流程图', 'D. 表格图'], answer: 'D' },
            { type: 'quiz', question: '填空题：展示不同类别数据对比的常用图表是___。', answer: '柱状图' },
            { type: 'quiz', question: '简答题：请简述数据可视化的重要性。', answer: '1. 快速理解：图表比表格更容易理解数据\n2. 发现模式：可视化帮助发现数据中的趋势和规律\n3. 有效沟通：图形化的报告更具说服力\n4. 记忆深刻：可视化信息更容易被记住\n5. 决策支持：可视化帮助管理层做出更好的决策' }
          ]
        },
        {
          id: 2,
          title: 'Excel高级图表',
          duration: 50,
          sections: [
            { type: 'h2', text: '第二章：Excel高级图表' },
            { type: 'h3', text: 'Excel图表基础' },
            { type: 'p', text: 'Excel是最常用的数据处理工具，其图表功能可以满足大部分日常可视化需求。' },
            { type: 'h4', text: '创建图表的基本步骤' },
            { type: 'bullet', items: ['准备数据：确保数据格式正确', '选择数据范围', '插入选项卡中选择图表类型', '调整图表布局和样式', '添加标题和标签'] },
            { type: 'h3', text: '常用图表类型及适用场景' },
            { type: 'h4', text: '柱状图和条形图' },
            { type: 'bullet', items: ['簇状柱状图：对比多个系列的数据', '堆积柱状图：展示整体和部分关系', '条形图：适合展示类别名称较长时'] },
            { type: 'h4', text: '折线图' },
            { type: 'bullet', items: ['适合展示时间序列数据', '可以添加多个数据系列', '支持趋势线预测'] },
            { type: 'h4', text: '饼图' },
            { type: 'bullet', items: ['展示各部分占整体的比例', '建议不超过7个分类', '可以使用复合饼图处理过多分类'] },
            { type: 'h3', text: '高级图表技巧' },
            { type: 'bullet', items: ['组合图表：将两种图表类型结合', '动态图表：使用数据验证和公式创建交互式图表', '条件格式：使用颜色直观显示数据大小', '迷你图：在单元格中显示小型趋势图'] },
            { type: 'quiz', question: '选择题：Excel中，适合展示时间序列数据的图表类型是？', options: ['A. 饼图', 'B. 散点图', 'C. 折线图', 'D. 雷达图'], answer: 'C' },
            { type: 'quiz', question: '选择题：Excel中，迷你图的作用是什么？', options: ['A. 装饰图表', 'B. 在单元格中显示小型趋势图', 'C. 创建复杂图表', 'D. 数据分析'], answer: 'B' },
            { type: 'quiz', question: '选择题：Excel的条件格式可以用于什么目的？', options: ['A. 美化界面', 'B. 突出显示特定数据', 'C. 排序数据', 'D. 筛选数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：Excel中，组合图表的作用是什么？', options: ['A. 将两种图表类型结合', 'B. 放大图表', 'C. 缩小图表', 'D. 删除图表'], answer: 'A' },
            { type: 'quiz', question: '选择题：Excel中，动态图表通常使用什么功能实现？', options: ['A. 数据验证', 'B. 数据透视表', 'C. 条件格式', 'D. 图表模板'], answer: 'A' },
            { type: 'quiz', question: '填空题：使用条件格式可以直观地用___显示数据大小。', answer: '颜色' },
            { type: 'quiz', question: '简答题：请列举三种Excel常用图表并说明适用场景。', answer: '1. 柱状图：适合对比不同类别的数据大小\n2. 折线图：适合展示数据随时间变化的趋势\n3. 饼图：适合展示各部分占整体的比例关系\n4. 散点图：适合展示两个变量之间的相关性\n5. 组合图：将两种图表结合，适合多维度分析' }
          ]
        },
        {
          id: 3,
          title: 'Python可视化库',
          duration: 60,
          sections: [
            { type: 'h2', text: '第三章：Python可视化库' },
            { type: 'h3', text: 'Matplotlib基础' },
            { type: 'p', text: 'Matplotlib是Python最基础的可视化库，几乎可以创建所有类型的图表。' },
            { type: 'code', language: 'python', code: 'import matplotlib.pyplot as plt\nimport numpy as np\n\n# 设置中文字体\nplt.rcParams["font.sans-serif"] = ["SimHei"]\nplt.rcParams["axes.unicode_minus"] = False\n\n# 简单的折线图\nx = np.array([1, 2, 3, 4, 5])\ny = np.array([10, 25, 30, 45, 50])\n\nplt.figure(figsize=(10, 6))\nplt.plot(x, y, marker="o", linewidth=2, markersize=8)\nplt.title("销售趋势图", fontsize=16)\nplt.xlabel("月份", fontsize=12)\nplt.ylabel("销售额(万元)", fontsize=12)\nplt.grid(True)\nplt.show()' },
            { type: 'h3', text: '常用图表类型' },
            { type: 'code', language: 'python', code: '# 柱状图\ncategories = ["北京", "上海", "广州", "深圳"]\nsales = [120, 150, 90, 110]\n\nplt.figure(figsize=(10, 6))\nplt.bar(categories, sales, color=["red", "blue", "green", "orange"])\nplt.title("各城市销售额", fontsize=16)\nplt.xlabel("城市", fontsize=12)\nplt.ylabel("销售额(万元)", fontsize=12)\nplt.show()\n\n# 饼图\nsizes = [25, 35, 20, 20]\nlabels = ["A级", "B级", "C级", "D级"]\ncolors = ["gold", "yellowgreen", "lightcoral", "lightskyblue"]\n\nplt.figure(figsize=(8, 8))\nplt.pie(sizes, labels=labels, colors=colors, autopct="%1.1f%%", startangle=90)\nplt.title("客户等级分布", fontsize=16)\nplt.show()' },
            { type: 'h3', text: 'Seaborn统计图表' },
            { type: 'p', text: 'Seaborn是基于Matplotlib的高级可视化库，专注于统计图表的绘制。' },
            { type: 'code', language: 'python', code: 'import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\n# 设置主题\nsns.set_style("whitegrid")\n\n# 加载示例数据\ntips = sns.load_dataset("tips")\n\n# 散点图\nplt.figure(figsize=(10, 6))\nsns.scatterplot(x="total_bill", y="tip", data=tips, hue="smoker")\nplt.title("账单与小费关系", fontsize=16)\nplt.show()\n\n# 箱线图\nplt.figure(figsize=(10, 6))\nsns.boxplot(x="day", y="total_bill", data=tips)\nplt.title("各日期账单分布", fontsize=16)\nplt.show()' },
            { type: 'quiz', question: '选择题：以下哪个是Python中最基础的可视化库？', options: ['A. Seaborn', 'B. Matplotlib', 'C. Plotly', 'D. Tableau'], answer: 'B' },
            { type: 'quiz', question: '选择题：Seaborn库的特点是什么？', options: ['A. 轻量级', 'B. 专注于统计图表', 'C. 商业付费', 'D. 基于D3.js'], answer: 'B' },
            { type: 'quiz', question: '选择题：Matplotlib中，哪个函数用于绘制折线图？', options: ['A. plt.bar()', 'B. plt.plot()', 'C. plt.pie()', 'D. plt.scatter()'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个库不是Python可视化库？', options: ['A. Matplotlib', 'B. Pandas', 'C. Seaborn', 'D. Plotly'], answer: 'B' },
            { type: 'quiz', question: '选择题：设置Matplotlib显示中文需要配置哪个参数？', options: ['A. font.family', 'B. font.sans-serif', 'C. font.size', 'D. font.weight'], answer: 'B' },
            { type: 'quiz', question: '填空题：Seaborn是基于___的高级可视化库。', answer: 'Matplotlib' },
            { type: 'quiz', question: '简答题：请说明如何解决Matplotlib显示中文的问题。', answer: '1. 设置中文字体：plt.rcParams["font.sans-serif"] = ["SimHei"]\n2. 修复负号显示：plt.rcParams["axes.unicode_minus"] = False\n3. 或者使用其他支持中文的字体如"Microsoft YaHei"\n4. 对于Linux系统，可能需要下载并安装中文字体' }
          ]
        },
        {
          id: 4,
          title: 'Tableau数据可视化',
          duration: 55,
          sections: [
            { type: 'h2', text: '第四章：Tableau数据可视化' },
            { type: 'h3', text: 'Tableau简介' },
            { type: 'p', text: 'Tableau是一款强大的商业智能工具，无需编程即可创建交互式可视化图表。它支持多种数据源，适合企业级数据分析。' },
            { type: 'h3', text: 'Tableau工作流程' },
            { type: 'bullet', items: ['连接数据源：Excel、数据库、云服务等', '拖拽字段到工作区，创建视图', '选择图表类型', '添加筛选器和参数', '创建仪表板和工作表'] },
            { type: 'h3', text: '常用图表类型' },
            { type: 'table', headers: ['图表类型', '适用场景', '创建方法'], rows: [
              ['折线图', '时间序列趋势', '将日期放到列，指标放到行'],
              ['柱状图', '类别对比', '将类别放到列，指标放到行'],
              ['地图', '地理分布', '将地理字段拖到画布'],
              ['散点图', '相关性分析', '将两个指标分别放到行列'],
              ['热力图', '交叉分析', '使用矩形着色功能']
            ]},
            { type: 'h3', text: 'Tableau高级功能' },
            { type: 'h4', text: '计算字段' },
            { type: 'bullet', items: ['创建新字段进行计算', '使用函数如SUM、AVG、IF等', '支持嵌套计算'] },
            { type: 'h4', text: '参数和筛选器' },
            { type: 'bullet', items: ['参数：让用户可以动态控制值', '筛选器：限制显示的数据范围', '快捷筛选：让用户自己选择筛选条件'] },
            { type: 'h4', text: '仪表板和工作表' },
            { type: 'bullet', items: ['仪表板：将多个图表组合在一起', '操作：添加交互功能，如跳转、筛选', '布局：调整图表大小和位置'] },
            { type: 'quiz', question: '选择题：Tableau的主要特点是什么？', options: ['A. 需要编程', 'B. 拖拽式操作', 'C. 只支持Excel', 'D. 不支持交互'], answer: 'B' },
            { type: 'quiz', question: '选择题：Tableau中，计算字段的作用是什么？', options: ['A. 美化图表', 'B. 创建新字段进行计算', 'C. 导入数据', 'D. 导出数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：Tableau仪表板的作用是什么？', options: ['A. 存储数据', 'B. 将多个图表组合在一起', 'C. 编写代码', 'D. 管理文件'], answer: 'B' },
            { type: 'quiz', question: '选择题：Tableau支持哪些数据源？', options: ['A. 只支持Excel', 'B. 只支持数据库', 'C. 多种数据源', 'D. 不支持任何数据源'], answer: 'C' },
            { type: 'quiz', question: '选择题：Tableau的参数功能用于什么目的？', options: ['A. 美化界面', 'B. 让用户动态控制值', 'C. 导入数据', 'D. 删除数据'], answer: 'B' },
            { type: 'quiz', question: '填空题：Tableau仪表板可以添加___来实现交互功能。', answer: '操作（或actions）' },
            { type: 'quiz', question: '简答题：请简述Tableau的基本工作流程。', answer: '1. 连接数据源：连接到Excel、数据库等数据源\n2. 数据准备：在数据源界面查看和筛选数据\n3. 创建工作表：拖拽字段到工作区，选择图表类型\n4. 添加分析功能：添加计算字段、筛选器、参数\n5. 创建仪表板：将多个工作表组合成仪表板\n6. 添加交互：使用操作实现交互功能\n7. 发布和共享：将工作簿发布到Tableau Server或保存为文件' }
          ]
        },
        {
          id: 5,
          title: 'BI工具综合实战',
          duration: 75,
          sections: [
            { type: 'h2', text: '第五章：BI工具综合实战' },
            { type: 'h3', text: 'BI工具概述' },
            { type: 'p', text: '商业智能（BI）工具帮助企业将数据转化为可操作的洞察。九数云是国内常用的BI工具，适合中国用户。' },
            { type: 'h3', text: '九数云基础操作' },
            { type: 'bullet', items: ['数据导入：支持Excel、CSV、数据库等多种数据源', '数据处理：清洗、转换、合并数据', '可视化分析：拖拽式创建各种图表', '仪表板制作：组合多个图表，创建管理驾驶舱'] },
            { type: 'h3', text: '综合实战案例' },
            { type: 'h4', text: '电商数据分析仪表板' },
            { type: 'bullet', items: ['核心指标卡片：销售额、订单数、客单价、转化率', '趋势图：销售额和订单数随时间变化', '类目占比：各类目销售额占比', '地区分布：各地区销售情况热力图', 'TOP商品榜：销售额最高的商品排名', '用户分析：新增用户、活跃用户、复购率'] },
            { type: 'h3', text: '数据可视化最佳实践' },
            { type: 'h4', text: '布局设计' },
            { type: 'bullet', items: ['重要指标放左上角，符合阅读习惯', '图表从大到小排列，突出重点', '保持适当的留白，不要过于拥挤'] },
            { type: 'h4', text: '颜色使用' },
            { type: 'bullet', items: ['使用品牌色作为主色调', '避免使用过多颜色，控制在5种以内', '使用红色表示警告或下降，绿色表示正常或上升'] },
            { type: 'h4', text: '数据更新' },
            { type: 'bullet', items: ['设置数据自动更新频率', '注意数据的时效性', '历史数据存档以便对比分析'] },
            { type: 'quiz', question: '选择题：BI仪表板中，核心指标通常放在什么位置？', options: ['A. 右下角', 'B. 左上角', 'C. 中心位置', 'D. 任意位置'], answer: 'B' },
            { type: 'quiz', question: '选择题：九数云是一款什么类型的工具？', options: ['A. 编程工具', 'B. BI分析工具', 'C. 数据库', 'D. 操作系统'], answer: 'B' },
            { type: 'quiz', question: '选择题：BI仪表板设计中，颜色使用应注意什么？', options: ['A. 使用多种颜色', 'B. 控制在5种以内', 'C. 只用红色', 'D. 不使用颜色'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是BI工具的主要功能？', options: ['A. 文字处理', 'B. 数据可视化分析', 'C. 图片编辑', 'D. 游戏开发'], answer: 'B' },
            { type: 'quiz', question: '选择题：管理驾驶舱的主要作用是什么？', options: ['A. 装饰办公室', 'B. 展示企业关键指标', 'C. 存储文件', 'D. 编写代码'], answer: 'B' },
            { type: 'quiz', question: '填空题：BI工具中的___可以将多个图表组合在一起。', answer: '仪表板（或Dashboard）' },
            { type: 'quiz', question: '简答题：请简述如何设计一个有效的管理驾驶舱。', answer: '1. 明确目标：确定仪表板要解决什么问题\n2. 选择核心指标：选择最关键的KPI，如销售额、订单量等\n3. 合理布局：重要指标放左上角，图表从大到小排列\n4. 选择合适的图表：根据数据关系选择对应的图表类型\n5. 添加筛选和交互：让用户能够深入探索数据\n6. 统一视觉风格：使用协调的颜色和字体\n7. 定期更新：保持数据的时效性' }
          ]
        }
      ]
    },
    {
      id: 'sql-essentials',
      title: 'SQL数据分析实战',
      category: 'core',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      lessons: [
        {
          id: 1,
          title: 'SQL基础与数据查询',
          duration: 50,
          sections: [
            { type: 'h2', text: '第一章：SQL基础与数据查询' },
            { type: 'h3', text: 'SQL简介' },
            { type: 'p', text: 'SQL（Structured Query Language）是用于管理关系型数据库的标准语言。几乎所有数据分析工作都需要用到SQL。' },
            { type: 'h3', text: '基本查询语句' },
            { type: 'code', language: 'sql', code: '-- 最基本的查询\nSELECT * FROM employees;\n\n-- 查询特定列\nSELECT employee_id, name, salary\nFROM employees;\n\n-- 使用别名\nSELECT name AS 员工姓名, salary AS 月薪\nFROM employees;\n\n-- 使用DISTINCT去重\nSELECT DISTINCT department\nFROM employees;\n\n-- 限制返回行数（不同数据库语法不同）\nSELECT * FROM employees LIMIT 10;  -- MySQL\nSELECT TOP 10 * FROM employees;     -- SQL Server\nSELECT * FROM employees FETCH FIRST 10 ROWS ONLY;  -- Oracle' },
            { type: 'h3', text: '条件筛选' },
            { type: 'code', language: 'sql', code: '-- WHERE子句\nSELECT * FROM employees\nWHERE salary > 10000;\n\n-- 多条件组合\nSELECT * FROM employees\nWHERE salary > 10000 AND department = \'销售部\';\n\n-- OR条件\nSELECT * FROM employees\nWHERE department = \'销售部\' OR department = \'市场部\';\n\n-- BETWEEN范围\nSELECT * FROM employees\nWHERE salary BETWEEN 5000 AND 10000;\n\n-- IN列表匹配\nSELECT * FROM employees\nWHERE department IN (\'销售部\', \'市场部\', \'运营部\');\n\n-- LIKE模糊匹配\nSELECT * FROM employees\nWHERE name LIKE \'张%\';  -- 姓张的员工' },
            { type: 'h3', text: '排序和分页' },
            { type: 'code', language: 'sql', code: '-- ORDER BY排序\nSELECT * FROM employees\nORDER BY salary DESC;  -- 降序\n\nSELECT * FROM employees\nORDER BY department ASC, salary DESC;  -- 多列排序\n\n-- 分页查询\nSELECT * FROM employees\nORDER BY employee_id\nLIMIT 10 OFFSET 20;  -- 第3页，每页10条' },
            { type: 'quiz', question: '选择题：以下哪个SQL语句可以查询所有姓张的员工？', options: ['SELECT * FROM employees WHERE name = \'张\'', 'SELECT * FROM employees WHERE name LIKE \'张%\'', 'SELECT * FROM employees WHERE name IN (\'张\')', 'SELECT * FROM employees WHERE name = \'%张%\''], answer: 'B' },
            { type: 'quiz', question: '选择题：SQL中，LIMIT关键字的作用是什么？', options: ['A. 排序', 'B. 限制返回行数', 'C. 筛选', 'D. 分组'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是SQL的比较运算符？', options: ['A. +', 'B. =', 'C. AND', 'D. OR'], answer: 'B' },
            { type: 'quiz', question: '选择题：ORDER BY子句默认的排序方式是什么？', options: ['A. 降序', 'B. 升序', 'C. 随机', 'D. 无排序'], answer: 'B' },
            { type: 'quiz', question: '选择题：SQL中，BETWEEN关键字的作用是什么？', options: ['A. 匹配列表中的值', 'B. 匹配范围', 'C. 模糊匹配', 'D. 逻辑与'], answer: 'B' },
            { type: 'quiz', question: '填空题：SQL中，使用___关键字可以去重。', answer: 'DISTINCT' },
            { type: 'quiz', question: '简答题：请简述SELECT语句的执行顺序。', answer: 'SELECT语句的执行顺序：\n1. FROM：确定数据来源的表\n2. WHERE：筛选满足条件的行\n3. GROUP BY：将数据分组\n4. HAVING：筛选分组\n5. SELECT：选择要返回的列\n6. ORDER BY：对结果排序\n7. LIMIT：限制返回行数' }
          ]
        },
        {
          id: 2,
          title: '多表关联与子查询',
          duration: 60,
          sections: [
            { type: 'h2', text: '第二章：多表关联与子查询' },
            { type: 'h3', text: '表关联基础' },
            { type: 'p', text: '在实际数据分析中，数据通常分布在多个表中，需要通过关联来组合数据。' },
            { type: 'h3', text: 'JOIN连接' },
            { type: 'code', language: 'sql', code: '-- INNER JOIN 内连接（只保留两边都匹配的记录）\nSELECT e.name, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id;\n\n-- LEFT JOIN 左连接（保留左表所有记录）\nSELECT e.name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id;\n\n-- RIGHT JOIN 右连接（保留右表所有记录）\nSELECT e.name, d.department_name\nFROM employees e\nRIGHT JOIN departments d ON e.department_id = d.department_id;\n\n-- FULL OUTER JOIN 全连接\nSELECT e.name, d.department_name\nFROM employees e\nFULL OUTER JOIN departments d ON e.department_id = d.department_id;' },
            { type: 'h3', text: '多表连接' },
            { type: 'code', language: 'sql', code: '-- 连接多个表\nSELECT e.name, d.department_name, p.project_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.department_id\nINNER JOIN employee_projects ep ON e.employee_id = ep.employee_id\nINNER JOIN projects p ON ep.project_id = p.project_id;\n\n-- 自连接（同一表的不同记录关联）\nSELECT e.name AS 员工, m.name AS 经理\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id;' },
            { type: 'h3', text: '子查询' },
            { type: 'code', language: 'sql', code: '-- 子查询在WHERE中\nSELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);\n\n-- 子查询在FROM中（派生表）\nSELECT dept, AVG(salary) AS avg_salary\nFROM (SELECT department AS dept, salary FROM employees) t\nGROUP BY dept;\n\n-- EXISTS检查是否存在\nSELECT * FROM employees e\nWHERE EXISTS (\n    SELECT 1 FROM orders o\n    WHERE o.employee_id = e.employee_id\n);\n\n-- 子查询在SELECT中\nSELECT name, \n    (SELECT COUNT(*) FROM orders WHERE employee_id = e.employee_id) AS order_count\nFROM employees e;' },
            { type: 'quiz', question: '选择题：LEFT JOIN和INNER JOIN的主要区别是什么？', options: ['A. 速度不同', 'B. LEFT JOIN保留左表所有记录，INNER JOIN只保留匹配的', 'C. 语法不同', 'D. 没有区别'], answer: 'B' },
            { type: 'quiz', question: '选择题：自连接的作用是什么？', options: ['A. 连接不同数据库', 'B. 连接同一表的不同记录', 'C. 连接多个表', 'D. 删除数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：EXISTS关键字的作用是什么？', options: ['A. 检查是否存在满足条件的记录', 'B. 删除记录', 'C. 更新记录', 'D. 插入记录'], answer: 'A' },
            { type: 'quiz', question: '选择题：以下哪个JOIN会保留两表所有记录？', options: ['A. INNER JOIN', 'B. LEFT JOIN', 'C. RIGHT JOIN', 'D. FULL OUTER JOIN'], answer: 'D' },
            { type: 'quiz', question: '选择题：子查询可以出现在哪个子句中？', options: ['A. 只能在WHERE中', 'B. 只能在FROM中', 'C. SELECT、FROM、WHERE中都可以', 'D. 只能在SELECT中'], answer: 'C' },
            { type: 'quiz', question: '填空题：子查询可以出现在SELECT、FROM和___子句中。', answer: 'WHERE' },
            { type: 'quiz', question: '简答题：请简述SQL中各种JOIN的区别。', answer: '1. INNER JOIN：只保留两表都匹配的记录\n2. LEFT JOIN：保留左表所有记录，右表没有匹配的为NULL\n3. RIGHT JOIN：保留右表所有记录，左表没有匹配的为NULL\n4. FULL OUTER JOIN：保留两表所有记录，没有匹配的为NULL' }
          ]
        },
        {
          id: 3,
          title: '聚合函数与分组',
          duration: 45,
          sections: [
            { type: 'h2', text: '第三章：聚合函数与分组' },
            { type: 'h3', text: '常用聚合函数' },
            { type: 'code', language: 'sql', code: '-- COUNT计数\nSELECT COUNT(*) FROM employees;  -- 总行数\nSELECT COUNT(DISTINCT department) FROM employees;  -- 不重复的部门数\n\n-- SUM求和\nSELECT SUM(salary) FROM employees;\n\n-- AVG平均值\nSELECT AVG(salary) FROM employees;\n\n-- MAX最大值\nSELECT MAX(salary) FROM employees;\n\n-- MIN最小值\nSELECT MIN(salary) FROM employees;\n\n-- 组合使用\nSELECT \n    COUNT(*) AS total_employees,\n    AVG(salary) AS avg_salary,\n    MAX(salary) AS max_salary,\n    MIN(salary) AS min_salary\nFROM employees;' },
            { type: 'h3', text: 'GROUP BY分组' },
            { type: 'code', language: 'sql', code: '-- 按部门统计\nSELECT department, COUNT(*) AS employee_count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department;\n\n-- 按多个字段分组\nSELECT department, gender, COUNT(*) AS count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department, gender;\n\n-- HAVING筛选分组\nSELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 5;  -- 只显示超过5人的部门\n\n-- WHERE和HAVING的区别\nSELECT department, AVG(salary) AS avg_salary\nFROM employees\nWHERE salary > 5000  -- 先筛选行\nGROUP BY department\nHAVING AVG(salary) > 8000;  -- 再筛选分组' },
            { type: 'h3', text: '综合示例' },
            { type: 'code', language: 'sql', code: '-- 统计每个部门的工资情况\nSELECT \n    d.department_name,\n    COUNT(e.employee_id) AS employee_count,\n    SUM(e.salary) AS total_salary,\n    AVG(e.salary) AS avg_salary,\n    MAX(e.salary) AS max_salary,\n    MIN(e.salary) AS min_salary\nFROM departments d\nLEFT JOIN employees e ON d.department_id = e.department_id\nGROUP BY d.department_id, d.department_name\nORDER BY avg_salary DESC;' },
            { type: 'quiz', question: '选择题：以下哪个聚合函数可以统计不重复值的数量？', options: ['A. COUNT(*)', 'B. COUNT(DISTINCT)', 'C. SUM', 'D. AVG'], answer: 'B' },
            { type: 'quiz', question: '选择题：GROUP BY子句的作用是什么？', options: ['A. 排序', 'B. 分组', 'C. 筛选', 'D. 限制行数'], answer: 'B' },
            { type: 'quiz', question: '选择题：SUM函数的作用是什么？', options: ['A. 计数', 'B. 求和', 'C. 求平均', 'D. 求最大值'], answer: 'B' },
            { type: 'quiz', question: '选择题：HAVING子句必须和哪个子句一起使用？', options: ['A. WHERE', 'B. GROUP BY', 'C. ORDER BY', 'D. LIMIT'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个聚合函数可以获取最小值？', options: ['A. MAX', 'B. AVG', 'C. MIN', 'D. COUNT'], answer: 'C' },
            { type: 'quiz', question: '填空题：___子句用于筛选分组后的结果。', answer: 'HAVING' },
            { type: 'quiz', question: '简答题：请说明WHERE和HAVING的区别。', answer: '1. WHERE在分组前筛选，针对每一行数据\n2. HAVING在分组后筛选，针对分组聚合后的结果\n3. WHERE不能使用聚合函数，HAVING可以\n4. 执行顺序：WHERE → GROUP BY → HAVING → SELECT' }
          ]
        },
        {
          id: 4,
          title: '窗口函数详解',
          duration: 55,
          sections: [
            { type: 'h2', text: '第四章：窗口函数详解' },
            { type: 'h3', text: '窗口函数概念' },
            { type: 'p', text: '窗口函数是一种特殊的SQL函数，它在一组行上执行计算，但不会像GROUP BY那样将多行合并为一行。' },
            { type: 'h3', text: '基本语法' },
            { type: 'code', language: 'sql', code: 'window_function(expression) OVER (\n    [PARTITION BY column]\n    [ORDER BY column]\n    [ROWS/RANGE frame]\n)' },
            { type: 'h3', text: '排名函数' },
            { type: 'code', language: 'sql', code: '-- ROW_NUMBER：给每一行分配一个唯一的序号\nSELECT \n    name,\n    department,\n    salary,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept\nFROM employees;\n\n-- RANK：相同的值排名相同，但后续排名会跳跃\nSELECT \n    name,\n    salary,\n    RANK() OVER (ORDER BY salary DESC) AS rank\nFROM employees;\n\n-- DENSE_RANK：相同的值排名相同，后续排名连续\nSELECT \n    name,\n    salary,\n    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank\nFROM employees;' },
            { type: 'h3', text: '聚合窗口函数' },
            { type: 'code', language: 'sql', code: '-- 计算累计和\nSELECT \n    month,\n    sales,\n    SUM(sales) OVER (ORDER BY month) AS cumulative_sales\nFROM monthly_sales;\n\n-- 计算移动平均（最近3个月的平均）\nSELECT \n    month,\n    sales,\n    AVG(sales) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg\nFROM monthly_sales;\n\n-- 计算每个员工的工资占部门总计的百分比\nSELECT \n    name,\n    department,\n    salary,\n    salary * 100.0 / SUM(salary) OVER (PARTITION BY department) AS pct_of_dept\nFROM employees;\n\n-- LAG和LEAD函数\nSELECT \n    month,\n    sales,\n    LAG(sales, 1) OVER (ORDER BY month) AS prev_month_sales,\n    LEAD(sales, 1) OVER (ORDER BY month) AS next_month_sales\nFROM monthly_sales;' },
            { type: 'quiz', question: '选择题：ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)的作用是？', options: ['A. 按部门分组，然后按工资从高到低排序，并给每行分配序号', 'B. 按工资排序', 'C. 只按部门分组', 'D. 计算平均工资'], answer: 'A' },
            { type: 'quiz', question: '选择题：窗口函数和GROUP BY的主要区别是什么？', options: ['A. 速度不同', 'B. 窗口函数保留每一行', 'C. 语法不同', 'D. 没有区别'], answer: 'B' },
            { type: 'quiz', question: '选择题：LAG函数的作用是什么？', options: ['A. 获取下一行数据', 'B. 获取上一行数据', 'C. 获取第一行数据', 'D. 获取最后一行数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：RANK和DENSE_RANK的区别是什么？', options: ['A. 没有区别', 'B. RANK会跳跃排名', 'C. DENSE_RANK会跳跃排名', 'D. RANK速度更快'], answer: 'B' },
            { type: 'quiz', question: '选择题：窗口函数中，PARTITION BY的作用是什么？', options: ['A. 排序', 'B. 分组', 'C. 筛选', 'D. 限制行数'], answer: 'B' },
            { type: 'quiz', question: '填空题：___函数可以获取当前行之前一行的数据。', answer: 'LAG' },
            { type: 'quiz', question: '简答题：请简述窗口函数与GROUP BY的区别。', answer: '1. GROUP BY将多行合并为一行，窗口函数保留每一行\n2. GROUP BY不能再引用原始列，窗口函数可以同时看到原始列和聚合结果\n3. 窗口函数使用OVER子句定义窗口\n4. 窗口函数支持PARTITION BY分组和ORDER BY排序' }
          ]
        },
        {
          id: 5,
          title: 'SQL综合实战',
          duration: 90,
          sections: [
            { type: 'h2', text: '第五章：SQL综合实战' },
            { type: 'h3', text: '实战案例：电商数据分析' },
            { type: 'h4', text: '数据概览' },
            { type: 'p', text: '假设我们有以下表：orders（订单表）、order_items（订单明细表）、products（商品表）、customers（客户表）' },
            { type: 'h3', text: '业务问题1：计算月度销售趋势' },
            { type: 'code', language: 'sql', code: 'SELECT \n    DATE_FORMAT(o.order_date, \'%Y-%m\') AS month,\n    COUNT(DISTINCT o.order_id) AS order_count,\n    COUNT(DISTINCT o.customer_id) AS customer_count,\n    SUM(oi.quantity * oi.price) AS total_revenue\nFROM orders o\nINNER JOIN order_items oi ON o.order_id = oi.order_id\nWHERE o.order_status = \'completed\'\nGROUP BY DATE_FORMAT(o.order_date, \'%Y-%m\')\nORDER BY month;' },
            { type: 'h3', text: '业务问题2：找出Top 10畅销商品' },
            { type: 'code', language: 'sql', code: 'SELECT \n    p.product_id,\n    p.product_name,\n    p.category,\n    COUNT(oi.order_item_id) AS order_count,\n    SUM(oi.quantity) AS total_quantity,\n    SUM(oi.quantity * oi.price) AS total_revenue\nFROM products p\nINNER JOIN order_items oi ON p.product_id = oi.product_id\nINNER JOIN orders o ON oi.order_id = o.order_id\nWHERE o.order_status = \'completed\'\nGROUP BY p.product_id, p.product_name, p.category\nORDER BY total_revenue DESC\nLIMIT 10;' },
            { type: 'h3', text: '业务问题3：用户复购率分析' },
            { type: 'code', language: 'sql', code: 'WITH customer_orders AS (\n    SELECT \n        customer_id,\n        COUNT(DISTINCT order_id) AS order_count,\n        MIN(order_date) AS first_order,\n        MAX(order_date) AS last_order\n    FROM orders\n    WHERE order_status = \'completed\'\n    GROUP BY customer_id\n)\nSELECT \n    CASE \n        WHEN order_count = 1 THEN \'新客户\'\n        WHEN order_count = 2 THEN \'回头客\'\n        WHEN order_count <= 5 THEN \'活跃客户\'\n        ELSE \'忠诚客户\'\n    END AS customer_type,\n    COUNT(*) AS customer_count\nFROM customer_orders\nGROUP BY customer_type;' },
            { type: 'h3', text: 'SQL优化建议' },
            { type: 'bullet', items: ['只查询需要的列，避免SELECT *', '在WHERE子句中使用索引列', '避免在WHERE中对字段使用函数', '使用EXPLAIN分析查询计划', '适当使用临时表或派生表简化复杂查询'] },
            { type: 'quiz', question: '选择题：在计算月度销售趋势时，为什么要使用COUNT(DISTINCT customer_id)而不是COUNT(customer_id)？', options: ['A. 速度更快', 'B. 避免同一客户多次下单被重复计算', 'C. 语法要求', 'D. 没有区别'], answer: 'B' },
            { type: 'quiz', question: '选择题：CTE（WITH子句）的作用是什么？', options: ['A. 删除数据', 'B. 创建临时结果集', 'C. 更新数据', 'D. 插入数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：EXPLAIN关键字的作用是什么？', options: ['A. 执行查询', 'B. 分析查询计划', 'C. 创建表', 'D. 删除表'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个是SQL优化的基本原则？', options: ['A. 使用SELECT *', 'B. 在WHERE中对字段使用函数', 'C. 创建合适的索引', 'D. 不使用索引'], answer: 'C' },
            { type: 'quiz', question: '选择题：复购率分析通常需要统计什么？', options: ['A. 订单数量', 'B. 客户购买次数分布', 'C. 销售额', 'D. 商品数量'], answer: 'B' },
            { type: 'quiz', question: '填空题：使用___关键字可以给子查询命名的同时创建临时结果集。', answer: 'WITH（或CTE）' },
            { type: 'quiz', question: '简答题：请简述SQL查询优化的基本原则。', answer: '1. 避免SELECT *，只查询需要的列\n2. WHERE子句中的等号左边不要使用表达式或函数\n3. 创建合适的索引加速查询\n4. 避免在WHERE中使用NOT IN，使用LEFT JOIN或NOT EXISTS替代\n5. 使用EXPLAIN分析查询计划找出瓶颈\n6. 对于大表查询，考虑分页处理' }
          ]
        }
      ]
    },
    {
      id: 'real-projects',
      title: '企业真实项目实战',
      category: 'advanced',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      lessons: [
        {
          id: 1,
          title: '项目规划与需求分析',
          duration: 45,
          sections: [
            { type: 'h2', text: '第一章：项目规划与需求分析' },
            { type: 'h3', text: '项目启动阶段' },
            { type: 'p', text: '企业数据分析项目通常始于一个业务问题或需求。项目的成功很大程度上取决于前期的规划和需求分析。' },
            { type: 'h3', text: '需求调研方法' },
            { type: 'bullet', items: ['访谈：与业务方进行一对一访谈，了解业务背景和需求', '问卷调查：针对大量用户收集需求和反馈', '数据分析：分析现有数据发现潜在问题', '竞品分析：了解行业最佳实践'] },
            { type: 'h3', text: '项目规划要素' },
            { type: 'table', headers: ['要素', '内容', '产出物'], rows: [
              ['业务目标', '项目要解决什么业务问题', '业务需求文档'],
              ['数据目标', '需要哪些数据，分析什么', '数据需求清单'],
              ['交付目标', '最终产出什么成果', '交付清单'],
              ['时间目标', '项目的时间节点', '项目计划表'],
              ['资源需求', '人力、数据、工具需求', '资源计划']
            ]},
            { type: 'h3', text: '与业务方沟通技巧' },
            { type: 'bullet', items: ['用业务语言而非技术术语沟通', '确认理解一致，避免需求偏差', '管理期望，不要过度承诺', '记录决策和变更，留下文档'] },
            { type: 'quiz', question: '选择题：项目规划的第一步是什么？', options: ['A. 开始写代码', 'B. 明确项目目标', 'C. 制作可视化图表', 'D. 写报告'], answer: 'B' },
            { type: 'quiz', question: '选择题：需求调研的主要方法有哪些？', options: ['A. 只有访谈', 'B. 访谈、问卷调查、数据分析等', 'C. 只有数据分析', 'D. 不需要调研'], answer: 'B' },
            { type: 'quiz', question: '选择题：项目规划中，里程碑的作用是什么？', options: ['A. 装饰作用', 'B. 检查进度的关键节点', 'C. 增加项目成本', 'D. 延迟项目'], answer: 'B' },
            { type: 'quiz', question: '选择题：与业务方沟通时，应该使用什么语言？', options: ['A. 技术术语', 'B. 业务语言', 'C. 外语', 'D. 专业术语'], answer: 'B' },
            { type: 'quiz', question: '选择题：项目规划的产出物包括哪些？', options: ['A. 只有代码', 'B. 业务需求文档、数据需求清单等', 'C. 只有报告', 'D. 没有产出物'], answer: 'B' },
            { type: 'quiz', question: '填空题：项目规划中，用于检查进度的关键节点称为___。', answer: '里程碑' },
            { type: 'quiz', question: '简答题：请简述项目规划的主要内容。', answer: '1. 明确项目目标和范围\n2. 进行需求调研和分析\n3. 制定项目时间表和里程碑\n4. 确定所需资源和人员\n5. 评估项目风险和应对措施\n6. 与利益相关方沟通并确认计划' }
          ]
        },
        {
          id: 2,
          title: '数据获取与探索',
          duration: 60,
          sections: [
            { type: 'h2', text: '第二章：数据获取与探索' },
            { type: 'h3', text: '确定数据源' },
            { type: 'p', text: '根据项目目标确定所需的数据源是企业数据分析的重要一步。' },
            { type: 'bullet', items: ['内部数据：企业数据库、业务系统、日志文件', '外部数据：公开数据集、API数据、第三方数据', '调研数据：问卷调查、用户访谈', '竞品数据：行业报告、公开财务数据'] },
            { type: 'h3', text: '数据获取方法' },
            { type: 'table', headers: ['数据类型', '获取方法', '注意事项'], rows: [
              ['数据库', 'SQL查询', '注意查询性能，避免全表扫描'],
              ['API', '调用接口', '注意频率限制和认证'],
              ['文件', 'ETL工具或脚本', '注意文件格式和编码'],
              ['爬虫', '自动化采集', '遵守法律法规']
            ]},
            { type: 'h3', text: '数据探索（EDA）' },
            { type: 'p', text: '探索性数据分析（Exploratory Data Analysis）是在正式分析之前对数据进行初步探索，了解数据的基本特征。' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\n\n# 读取数据\ndf = pd.read_csv("sales_data.csv")\n\n# 基本信息\nprint(df.shape)  # 数据维度\nprint(df.dtypes)  # 数据类型\nprint(df.describe())  # 数值型统计\n\n# 缺失值\nprint(df.isnull().sum())\n\n# 重复值\nprint(df.duplicated().sum())\n\n# 分布情况\nprint(df[\'category\'].value_counts())\n\n# 相关性\nprint(df.corr())' },
            { type: 'h3', text: '数据质量评估' },
            { type: 'bullet', items: ['完整性：是否有缺失值，缺失比例如何', '准确性：数据是否真实可信', '一致性：数据格式是否统一', '时效性：数据是否足够新'] },
            { type: 'quiz', question: '选择题：探索性数据分析的英文缩写是？', options: ['A. EDA', 'B. ETL', 'C. KPI', 'D. CRM'], answer: 'A' },
            { type: 'quiz', question: '选择题：EDA的主要目的是什么？', options: ['A. 编写代码', 'B. 了解数据特征和发现问题', 'C. 创建可视化', 'D. 制作报告'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据探索中，describe()方法的作用是什么？', options: ['A. 删除数据', 'B. 显示数据统计摘要', 'C. 排序数据', 'D. 筛选数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据质量评估包括哪些维度？', options: ['A. 只有完整性', 'B. 完整性、准确性、一致性、及时性', 'C. 只有准确性', 'D. 没有维度'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个不是常见的数据源类型？', options: ['A. 数据库', 'B. API', 'C. 文件', 'D. 凭空想象'], answer: 'D' },
            { type: 'quiz', question: '填空题：数据探索的主要目的是___。', answer: '了解数据的基本特征和发现潜在问题' },
            { type: 'quiz', question: '简答题：请简述数据获取的主要方法及其注意事项。', answer: '1. 数据库查询：通过SQL获取，注意查询性能\n2. API调用：通过接口获取，注意认证和频率限制\n3. 文件导入：读取CSV/Excel，注意格式编码\n4. 爬虫采集：自动化获取，遵守法律法规\n5. 人工调研：问卷访谈，获取定性数据' }
          ]
        },
        {
          id: 3,
          title: '数据清洗与预处理',
          duration: 70,
          sections: [
            { type: 'h2', text: '第三章：数据清洗与预处理' },
            { type: 'h3', text: '数据清洗流程' },
            { type: 'p', text: '数据清洗是数据分析中最耗时的环节，通常占据整个项目的60%-80%时间。' },
            { type: 'h3', text: '缺失值处理' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndf = pd.DataFrame({\n    \"name\": [\"张三\", \"李四\", None, \"王五\"],\n    \"age\": [25, None, 30, 35],\n    \"salary\": [5000, 6000, None, 8000]\n})\n\n# 查看缺失值\nprint(df.isnull().sum())\n\n# 删除缺失值（谨慎使用）\ndf_cleaned = df.dropna()\n\n# 用均值填充数值型缺失值\ndf[\"age\"].fillna(df[\"age\"].mean(), inplace=True)\ndf[\"salary\"].fillna(df[\"salary\"].median(), inplace=True)\n\n# 用众数填充分类型缺失值\ndf[\"name\"].fillna(df[\"name\"].mode()[0], inplace=True)' },
            { type: 'h3', text: '异常值处理' },
            { type: 'code', language: 'python', code: '# IQR方法处理异常值\ndef handle_outliers_iqr(df, column):\n    Q1 = df[column].quantile(0.25)\n    Q3 = df[column].quantile(0.75)\n    IQR = Q3 - Q1\n    lower = Q1 - 1.5 * IQR\n    upper = Q3 + 1.5 * IQR\n    # 将异常值替换为边界值\n    df[column] = df[column].clip(lower=lower, upper=upper)\n    return df\n\n# 使用Z-score方法检测异常值\nfrom scipy import stats\n\ndef detect_outliers_zscore(df, column, threshold=3):\n    z_scores = np.abs(stats.zscore(df[column]))\n    outliers = df[z_scores > threshold]\n    return outliers' },
            { type: 'h3', text: '数据转换' },
            { type: 'code', language: 'python', code: '# 数据类型转换\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\ndf[\"price\"] = df[\"price\"].astype(float)\n\n# 数据标准化\nfrom sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\ndf[\"salary_scaled\"] = scaler.fit_transform(df[[\"salary\"]])\n\n# 分类变量编码\nfrom sklearn.preprocessing import LabelEncoder\n\nle = LabelEncoder()\ndf[\"category_encoded\"] = le.fit_transform(df[\"category\"])\n\n# 创建派生特征\ndf[\"year\"] = df[\"date\"].dt.year\ndf[\"month\"] = df[\"date\"].dt.month\ndf[\"is_weekend\"] = df[\"date\"].dt.dayofweek.isin([5, 6]).astype(int)' },
            { type: 'quiz', question: '选择题：数据清洗通常占据整个分析项目多少时间？', options: ['A. 10%-20%', 'B. 60%-80%', 'C. 5%-10%', 'D. 90%以上'], answer: 'B' },
            { type: 'quiz', question: '选择题：填充缺失值时，数值型数据常用什么方法？', options: ['A. 用0填充', 'B. 用均值或中位数填充', 'C. 用众数填充', 'D. 不处理'], answer: 'B' },
            { type: 'quiz', question: '选择题：LabelEncoder的作用是什么？', options: ['A. 数值标准化', 'B. 分类变量编码', 'C. 缺失值填补', 'D. 异常值处理'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据转换包括哪些操作？', options: ['A. 只有类型转换', 'B. 类型转换、标准化、编码等', 'C. 只有删除', 'D. 没有操作'], answer: 'B' },
            { type: 'quiz', question: '选择题：以下哪个方法可以检测重复值？', options: ['A. isnull()', 'B. duplicated()', 'C. describe()', 'D. sum()'], answer: 'B' },
            { type: 'quiz', question: '填空题：使用均值填充缺失值适用于___类型数据。', answer: '数值' },
            { type: 'quiz', question: '简答题：请简述完整的数据清洗流程。', answer: '1. 数据质量评估：检查缺失值、异常值、重复值\n2. 缺失值处理：删除、填充（均值/众数/插值）或标记\n3. 异常值处理：删除、修正或保留（业务需要时）\n4. 数据类型转换：确保数据类型正确\n5. 数据标准化：统一数据格式和单位\n6. 特征工程：创建派生特征\n7. 格式统一：确保数据的一致性\n8. 验证清洗结果：再次检查数据质量' }
          ]
        },
        {
          id: 4,
          title: '数据分析与建模',
          duration: 80,
          sections: [
            { type: 'h2', text: '第四章：数据分析与建模' },
            { type: 'h3', text: '描述性分析' },
            { type: 'p', text: '描述性分析是最基础的分析方法，帮助我们了解数据的基本特征和现状。' },
            { type: 'bullet', items: ['集中趋势：均值、中位数、众数', '离散程度：标准差、方差、极差', '分布形状：偏度、峰度'] },
            { type: 'h3', text: '对比分析' },
            { type: 'code', language: 'python', code: '# 按维度对比分析\nimport pandas as pd\n\n# 按月份对比\nmonthly_comparison = df.groupby(\"month\").agg({\n    \"sales\": \"sum\",\n    \"profit\": \"sum\"\n}).reset_index()\n\n# 同比和环比分析\ndf[\"sales_yoy\"] = df.groupby(\"month\")[\"sales\"].pct_change()  # 同比\ndf[\"sales_qoq\"] = df[\"sales\"].pct_change()  # 环比\n\n# 多维度对比\nmulti_dim = df.pivot_table(\n    values=[\"sales\", \"profit\"],\n    index=[\"region\", \"category\"],\n    aggfunc=\"sum\"\n)' },
            { type: 'h3', text: '相关性分析' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\n\n# 计算相关系数\ncorrelation = df[[\"sales\", \"advertising\", \"price\", \"population\"]].corr()\n\n# 可视化相关性矩阵\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nplt.figure(figsize=(10, 8))\nsns.heatmap(correlation, annot=True, cmap=\"coolwarm\", center=0)\nplt.title(\"相关性矩阵\")\nplt.show()\n\n# 散点图矩阵\nsns.pairplot(df[[\"sales\", \"advertising\", \"price\"]])\nplt.show()' },
            { type: 'h3', text: '趋势分析和预测' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n\n# 简单线性回归预测\nX = df[[\"advertising\"]].values\ny = df[\"sales\"].values\n\nmodel = LinearRegression()\nmodel.fit(X, y)\n\n# 预测\ndf[\"sales_predicted\"] = model.predict(X)\n\n# 评估模型\nfrom sklearn.metrics import r2_score, mean_squared_error\n\nr2 = r2_score(y, df[\"sales_predicted\"])\nrmse = np.sqrt(mean_squared_error(y, df[\"sales_predicted\"]))\nprint(f\"R²: {r2:.3f}\")\nprint(f\"RMSE: {rmse:.3f}\")' },
            { type: 'quiz', question: '选择题：以下哪种方法最适合分析两个数值变量之间的线性关系？', options: ['A. 回归分析', 'B. 聚类分析', 'C. 分类分析', 'D. 关联规则'], answer: 'A' },
            { type: 'quiz', question: '选择题：描述性分析包括哪些内容？', options: ['A. 只有均值', 'B. 集中趋势、离散程度、分布形状', 'C. 只有图表', 'D. 没有内容'], answer: 'B' },
            { type: 'quiz', question: '选择题：对比分析包括哪些类型？', options: ['A. 只有同比', 'B. 同比、环比、与目标对比', 'C. 只有环比', 'D. 没有对比'], answer: 'B' },
            { type: 'quiz', question: '选择题：相关性分析的作用是什么？', options: ['A. 描述数据', 'B. 找出变量之间的关系', 'C. 预测未来', 'D. 删除数据'], answer: 'B' },
            { type: 'quiz', question: '选择题：R²值的取值范围是什么？', options: ['A. 0-1', 'B. -1-1', 'C. 任意值', 'D. 1-100'], answer: 'A' },
            { type: 'quiz', question: '填空题：R²值用于评估模型的___。', answer: '拟合优度（或解释能力）' },
            { type: 'quiz', question: '简答题：请简述数据分析的主要步骤。', answer: '1. 明确分析目标：确定要回答的业务问题\n2. 描述性分析：了解数据的基本特征\n3. 对比分析：按不同维度比较数据\n4. 相关性分析：找出变量之间的关系\n5. 趋势分析：分析数据随时间的变化\n6. 预测建模：基于历史数据预测未来\n7. 得出结论：提出可执行的建议' }
          ]
        },
        {
          id: 5,
          title: '数据可视化与报告',
          duration: 65,
          sections: [
            { type: 'h2', text: '第五章：数据可视化与报告' },
            { type: 'h3', text: '可视化设计原则' },
            { type: 'p', text: '好的可视化能够直观地传达数据洞察，让决策者快速理解并做出判断。' },
            { type: 'h3', text: '选择合适的图表' },
            { type: 'table', headers: ['分析目的', '推荐图表'], rows: [
              ['对比', '柱状图、条形图'],
              ['趋势', '折线图、面积图'],
              ['占比', '饼图、环形图'],
              ['分布', '直方图、箱线图'],
              ['关系', '散点图、气泡图'],
              ['地理', '地图、热力图']
            ]},
            { type: 'h3', text: '创建专业报表' },
            { type: 'code', language: 'python', code: 'import pandas as pd\nimport matplotlib.pyplot as plt\nfrom matplotlib import font_manager\n\n# 设置中文字体\nplt.rcParams[\"font.sans-serif\"] = [\"SimHei\"]\nplt.rcParams[\"axes.unicode_minus\"] = False\n\n# 创建报表图表\nfig, axes = plt.subplots(2, 2, figsize=(14, 10))\n\n# 图1：月度销售趋势\nax1 = axes[0, 0]\nax1.plot(df[\"month\"], df[\"sales\"], marker=\"o\", linewidth=2)\nax1.set_title(\"月度销售趋势\", fontsize=14)\nax1.set_xlabel(\"月份\")\nax1.set_ylabel(\"销售额\")\nax1.grid(True)\n\n# 图2：品类占比\nax2 = axes[0, 1]\ncategory_sales = df.groupby(\"category\")[\"sales\"].sum()\nax2.pie(category_sales, labels=category_sales.index, autopct=\"%1.1f%%\")\nax2.set_title(\"品类销售占比\", fontsize=14)\n\n# 图3：区域对比\nax3 = axes[1, 0]\nregion_sales = df.groupby(\"region\")[\"sales\"].sum().sort_values(ascending=True)\nax3.barh(region_sales.index, region_sales.values, color=\"skyblue\")\nax3.set_title(\"区域销售对比\", fontsize=14)\n\n# 图4：价格与销量关系\nax4 = axes[1, 1]\nax4.scatter(df[\"price\"], df[\"sales\"], alpha=0.6)\nax4.set_title(\"价格与销量关系\", fontsize=14)\nax4.set_xlabel(\"价格\")\nax4.set_ylabel(\"销量\")\n\nplt.tight_layout()\nplt.savefig(\"sales_report.png\", dpi=150, bbox_inches=\"tight\")\nplt.show()' },
            { type: 'h3', text: '报告撰写结构' },
            { type: 'bullet', items: ['执行摘要：简明扼要地总结主要发现和建议', '背景与目的：说明项目的背景和分析目标', '数据概览：介绍使用的数据和其基本特征', '分析方法：说明使用的分析方法和工具', '主要发现：详细阐述分析结果', '建议：根据发现提出可执行的建议', '附录：包含详细数据和代码'] },
            { type: 'quiz', question: '选择题：展示数据随时间变化的趋势应该使用什么图表？', options: ['A. 饼图', 'B. 柱状图', 'C. 折线图', 'D. 散点图'], answer: 'C' },
            { type: 'quiz', question: '选择题：数据分析报告的核心部分是什么？', options: ['A. 附录', 'B. 主要发现', 'C. 背景', 'D. 方法'], answer: 'B' },
            { type: 'quiz', question: '选择题：执行摘要应该多长？', options: ['A. 越多越好', 'B. 1页以内', 'C. 10页以上', 'D. 不用写'], answer: 'B' },
            { type: 'quiz', question: '选择题：可视化设计原则中，什么最重要？', options: ['A. 颜色鲜艳', 'B. 简洁明了', 'C. 复杂装饰', 'D. 动画效果'], answer: 'B' },
            { type: 'quiz', question: '选择题：报告中应该包含哪些内容？', options: ['A. 只有图表', 'B. 背景、方法、发现、建议', 'C. 只有文字', 'D. 没有内容'], answer: 'B' },
            { type: 'quiz', question: '填空题：报表的执行摘要应该___呈现主要发现。', answer: '简明扼要' },
            { type: 'quiz', question: '简答题：请简述数据分析报告的主要结构。', answer: '1. 执行摘要：简明扼要总结主要发现和建议（1页以内）\n2. 背景与目的：说明项目背景和分析目标\n3. 数据概览：介绍数据来源、维度和基本特征\n4. 分析方法：说明使用的分析方法和工具\n5. 主要发现：详细阐述分析结果（核心部分）\n6. 建议：根据发现提出可执行的建议\n7. 附录：包含详细数据、代码和技术说明' }
          ]
        },
        {
          id: 6,
          title: '项目汇报与复盘',
          duration: 60,
          sections: [
            { type: 'h2', text: '第六章：项目汇报与复盘' },
            { type: 'h3', text: '项目汇报技巧' },
            { type: 'p', text: '数据分析项目的价值最终要通过汇报来体现。好的汇报能让业务方认可项目价值并推动落地。' },
            { type: 'h3', text: '汇报前的准备' },
            { type: 'bullet', items: ['了解受众：高层管理还是业务负责人，关注点不同', '明确目标：希望受众了解什么、做什么决定', '准备材料：PPT、数字报告、演示Demo', '预演练习：确保表达清晰流畅'] },
            { type: 'h3', text: '汇报结构建议' },
            { type: 'bullet', items: ['开场（1分钟）：简要说明汇报主题和目标', '背景（2分钟）：项目的背景和要解决的问题', '方法（3分钟）：使用的数据和分析方法', '发现（10分钟）：主要分析结果和建议（重点）', '讨论（5分钟）：回答问题和讨论下一步'] },
            { type: 'h3', text: '数据故事化表达' },
            { type: 'code', language: 'python', code: '# 将数据转化为故事的技巧\n\n# 1. 从问题出发\nprint(\"问题：我们的客户流失率高达15%...\")\n\n# 2. 揭示发现\nprint(\"发现：通过分析发现，流失客户中有60%在流失前30天没有登录...\")\n\n# 3. 提出建议\nprint(\"建议：建议在客户超过7天未登录时发送关怀邮件或推送...\")\n\n# 4. 量化预期效果\nprint(\"预期：如果能挽回30%的流失客户，每月可增加收入约50万元...\")' },
            { type: 'h3', text: '项目复盘' },
            { type: 'table', headers: ['复盘维度', '问题', '改进措施'], rows: [
              ['需求', '需求变更频繁', '建立需求变更流程'],
              ['数据', '数据质量不如预期', '提前做数据质量评估'],
              ['技术', '部分SQL执行太慢', '优化查询或预处理数据'],
              ['沟通', '业务方对结果有疑虑', '增加中间沟通节点'],
              ['交付', '报告送达率低', '增加邮件跟进']
            ]},
            { type: 'h3', text: '持续改进' },
            { type: 'bullet', items: ['建立知识库：沉淀项目经验和方法论', '工具模板化：将常用的分析流程做成模板', '自动化报表：减少重复劳动', '定期回顾：每季度回顾项目，迭代优化'] },
            { type: 'quiz', question: '选择题：项目汇报中，应该把主要时间花在哪个部分？', options: ['A. 开场', 'B. 背景', 'C. 发现和建议', 'D. 讨论'], answer: 'C' },
            { type: 'quiz', question: '选择题：项目汇报前需要做什么准备？', options: ['A. 什么都不用准备', 'B. 了解受众、明确目标、准备材料', 'C. 只准备PPT', 'D. 只练习演讲'], answer: 'B' },
            { type: 'quiz', question: '选择题：数据故事化表达的关键是什么？', options: ['A. 使用复杂术语', 'B. 从问题出发，层层递进', 'C. 只展示图表', 'D. 不讲故事'], answer: 'B' },
            { type: 'quiz', question: '选择题：项目复盘的作用是什么？', options: ['A. 浪费时间', 'B. 总结经验，持续改进', 'C. 批评团队', 'D. 结束项目'], answer: 'B' },
            { type: 'quiz', question: '选择题：持续改进包括哪些措施？', options: ['A. 建立知识库、工具模板化、自动化报表', 'B. 什么都不做', 'C. 只开会', 'D. 只写报告'], answer: 'A' },
            { type: 'quiz', question: '填空题：项目复盘后应该建立___，沉淀项目经验。', answer: '知识库' },
            { type: 'quiz', question: '简答题：请简述如何做好项目汇报。', answer: '1. 了解受众：高层关注战略价值，业务负责人关注可执行性\n2. 结构清晰：按背景、方法、发现、建议的顺序组织内容\n3. 数据说话：用数据支撑观点，让结论更有说服力\n4. 故事化表达：从问题出发，层层递进，让听众跟随你的逻辑\n5. 明确行动：说明需要受众做什么决定或行动\n6. 预留讨论：留出时间回答问题，促进沟通' }
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
      window.location.href = `/learning/${category}/${courseId}/${nextLesson.id}`
    }
  }

  const handlePrevious = () => {
    if (course && currentLessonIndex > 0) {
      const prevLesson = course.lessons[currentLessonIndex - 1]
      window.location.href = `/learning/${category}/${courseId}/${prevLesson.id}`
    }
  }

  const renderSection = (item: Section, key: number) => {
    switch (item.type) {
      case 'h2':
        return <h2 key={key} className="text-2xl font-bold mt-8 mb-4 text-gray-900 border-b-2 pb-2 border-orange-200">{item.text}</h2>
      case 'h3':
        return <h3 key={key} className="text-xl font-bold mt-6 mb-3 text-gray-800">{item.text}</h3>
      case 'h4':
        return <h4 key={key} className="text-lg font-semibold mt-4 mb-2 text-gray-700">{item.text}</h4>
      case 'p':
        return <p key={key} className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>
      case 'bullet':
        return (
          <ul key={key} className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
            {item.items?.map((point, j) => <li key={j} className="leading-relaxed">{point}</li>)}
          </ul>
        )
      case 'table':
        return (
          <div key={key} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-orange-100 to-red-100">
                  {item.headers?.map((h, j) => (
                    <th key={j} className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows?.map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, k) => (
                      <td key={k} className="border border-gray-300 px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'code':
        return (
          <div key={key} className="my-6">
            <div className="bg-gray-800 text-gray-400 px-4 py-2 text-sm font-mono rounded-t-lg border-b border-gray-700">
              {item.language || 'code'}
            </div>
            <pre className="bg-gray-900 text-green-400 p-5 rounded-b-lg overflow-x-auto text-sm font-mono shadow-lg">
              <code>{item.code}</code>
            </pre>
          </div>
        )
      case 'quiz':
        return (
          <div key={key} className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">📝</span>
              <h4 className="text-lg font-bold text-blue-900">{item.question}</h4>
            </div>
            {item.options && (
              <div className="space-y-2 mb-4">
                {item.options.map((opt, j) => (
                  <div key={j} className="bg-white px-4 py-2 rounded-lg border border-blue-200 text-gray-800 hover:bg-blue-50 transition-colors">
                    {opt}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-green-500 shadow-sm">
              <div className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="text-xl mr-2">✅</span>
                参考答案：
              </div>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{item.answer}</div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">课程不存在</h2>
          <p className="text-gray-500 mb-6">抱歉，您访问的课程不存在</p>
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回课程中心
          </Link>
        </div>
      </div>
    )
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Book className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">章节不存在</h2>
          <p className="text-gray-500 mb-6">该课程暂无此章节内容</p>
          <Link
            to={`/learning/${course.category}/${course.id}/1`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-lg"
          >
            前往第一章
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回课程中心
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-orange-600">首页</Link>
              <span className="mx-2">›</span>
              <Link to="/courses" className="hover:text-orange-600">课程中心</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">{course.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧课程目录 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
              <h3 className="font-bold mb-4 flex items-center text-gray-800">
                <Book size={18} className="mr-2 text-orange-600" />
                课程目录
              </h3>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/learning/${course.category}/${course.id}/${lesson.id}`}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      lesson.id === currentLesson.id
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-500'
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
                      <div className="text-xs text-gray-500 flex items-center mt-1">
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

              {/* 学习进度 */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">学习进度</span>
                  <span className="font-medium text-orange-600">
                    {completedLessons.size}/{course.lessons.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all"
                    style={{ width: `${(completedLessons.size / course.lessons.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧学习内容 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* 课程标题头部 */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 mb-1">
                      第{currentLesson.id}章 / 共{course.lessons.length}章
                    </div>
                    <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  </div>
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <Clock size={18} className="mr-2" />
                    <span>{currentLesson.duration} 分钟</span>
                  </div>
                </div>
              </div>

              {/* 课程内容 */}
              <div className="p-8">
                {currentLesson.sections.map((item, i) => renderSection(item, i))}

                {/* 标记完成按钮 */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <button
                    onClick={markComplete}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      completedLessons.has(currentLesson.id)
                        ? 'bg-green-100 text-green-800 border-2 border-green-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                    }`}
                    disabled={completedLessons.has(currentLesson.id)}
                  >
                    {completedLessons.has(currentLesson.id) ? '✅ 本章已完成' : '📚 标记本章学习完成'}
                  </button>
                </div>

                {/* 上一章/下一章 */}
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
                  
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {currentLessonIndex + 1} / {course.lessons.length}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={currentLessonIndex === course.lessons.length - 1}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      currentLessonIndex === course.lessons.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
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
