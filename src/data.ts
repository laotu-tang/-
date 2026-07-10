/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Lawyer, 
  VentureElite, 
  IndustryStarCategory, 
  ThinkTank, 
  InsightArticle, 
  EventItem, 
  ReportItem 
} from './types';

export const INDUSTRIES_DICT = [
  "人工智能",
  "医疗健康",
  "先进制造",
  "消费品牌",
  "金融科技",
  "能源与双碳",
  "跨境业务"
];

export const SPECIALTIES_DICT = [
  "投融资与资本市场",
  "公司治理与合同商务",
  "劳动人力",
  "知识产权",
  "数据合规与网络安全",
  "财税与行政监管",
  "私人财富与家族治理",
  "涉外 / 跨境"
];

export const CITIES_DICT = [
  "北京",
  "上海",
  "深圳",
  "广州",
  "杭州",
  "成都",
  "新加坡"
];

export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: "l-1",
    name: "陈墨",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    firm: "君合律师事务所",
    position: "高级合伙人",
    city: "北京",
    email: "chenmo@junhe.com",
    phone: "13801002233",
    isRecommended: true,
    isExpert: true,
    hasProfileOpened: true,
    industries: ["人工智能", "先进制造"],
    specialties: ["数据合规与网络安全", "知识产权"],
    quote: "智能算法的边界不仅在技术，更在规则与伦理的平衡中。",
    bio: "陈墨律师深耕 TMT 与人工智能领域逾 15 年，为数家头部大模型厂商、具身智能初创企业提供全生命周期的合规管理、数据安全审查及生成式 AI 著作权诉讼代理服务。主导编制多部新经济行业数据白皮书，具有丰富的涉外反垄断与出海合规应对经验。",
    cases: [
      {
        id: "lc-1-1",
        industry: "人工智能",
        stage: "商业化落地",
        title: "某万亿参数大模型产品语料库合规治理与生成式服务备案项目",
        service: "多源语料数据合规清洗、隐私授权链条搭建、敏感词过滤审查及算法备案代理",
        value: "协助客户在 3 个月内顺利通过网信办等七部委备案，率先在商业场景合规上线"
      },
      {
        id: "lc-1-2",
        industry: "先进制造",
        stage: "融资B+轮",
        title: "国内领先工业机器人出口北美数据出境安评与技术出口合规项目",
        service: "出境数据地图绘制、双边出口管制合规架构设计、技术转让协议审查",
        value: "确保工业制造过程中的核心地理与工艺信息不出境，通过国家网信部门数据出境安全评估"
      }
    ],
    insights: [
      {
        id: "li-1-1",
        title: "生成式 AI 数据合规指南：大模型语料清洗及著作权合理使用界限",
        summary: "深度剖析在没有明确授权的情境下，公网开源语料抓取在大模型预训练中的合理使用边界，以及如何建立抗辩和侵权防范链条。",
        date: "2026-05-12"
      },
      {
        id: "li-1-2",
        title: "具身智能出口管制与跨境数据流动的法律合规红线",
        summary: "智能机器人出海面临着不仅包括硬件出口管制，还包含多模态实时交互数据跨境流动的监管。本文整理中美最新监管动态。",
        date: "2026-06-03"
      }
    ],
    interviews: [
      {
        id: "liv-1-1",
        title: "对话君合陈墨：智能车与大模型监管的双重考验",
        type: "text"
      },
      {
        id: "liv-1-2",
        title: "【视频】论生成式AI服务管理办法落地后的首批合规案例",
        type: "video"
      }
    ],
    socialMedia: {
      wechatChannel: "陈墨合规视界",
      publicAccount: "法治新经济观察",
      github: "lawyer-chenmo-ai"
    }
  },
  {
    id: "l-2",
    name: "徐晓棠",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    firm: "方达律师事务所",
    position: "合伙人",
    city: "上海",
    email: "xiaotong.xu@fangda.com",
    phone: "13916668899",
    isRecommended: true,
    isExpert: true,
    hasProfileOpened: true,
    industries: ["医疗健康", "跨境业务"],
    specialties: ["投融资与资本市场", "公司治理与合同商务"],
    quote: "医疗创新的道路充满不确定性，而严谨的商业法律构架则是保驾护航的确定性底色。",
    bio: "徐晓棠律师致力于生物医药、高端医疗器械、创新药研制领域的投融资与海外临床合作（License-out/in）业务。拥有医学与法学双重学术背景，先后协助十余家境内新药研发企业在港交所18A及科创板上市，在复杂的跨境架构搭建、知识产权商业安排上极具声誉。",
    cases: [
      {
        id: "lc-2-1",
        industry: "医疗健康",
        stage: "海外三期临床阶段",
        title: "某创新靶向抗癌药的跨境License-out（海外授权）非独占许可及联合研发案",
        service: "协助撰写并谈判专利许可及技术诀窍(Know-how)许可协议，设计分成(Royalty)与里程碑付款保障机制",
        value: "协助国内药企锁定高达 4.2 亿美元的交易总额，开创了同靶点跨境资产交易合规先河"
      },
      {
        id: "lc-2-2",
        industry: "医疗健康",
        stage: "IPO前夕融资",
        title: "AI医疗影像筛查技术独角兽公司引入战略投资者兼中外合资架构搭建",
        service: "重组红筹架构回归、设立合资公司并划定境内患者诊疗敏感数据托管防火墙",
        value: "保障投资机构表决权的同时，完全规避了《人类遗传资源管理条例》对外方控股的合规禁区"
      }
    ],
    insights: [
      {
        id: "li-2-1",
        title: "2026年人类遗传资源管理条例最新修正案对跨境跨机构临床研究的实务影响",
        summary: "结合今年出台的多批次审批松绑举措，详细指引中外联合临床申报在人遗备案中的提速要点。",
        date: "2026-06-18"
      },
      {
        id: "li-2-2",
        title: "生物医药License-out交易中Milestone与Royalty核算的四大潜在法律雷区",
        summary: "由于会计准则差异和跨国审计纠纷，授权合同中关于临床进展触发点以及销售额基数定义应如何严密规避含糊词汇。",
        date: "2026-07-02"
      }
    ],
    interviews: [
      {
        id: "liv-2-1",
        title: "【专访】方达徐晓棠：医药出海爆发期，中企如何做足专利防御？",
        type: "text"
      }
    ],
    socialMedia: {
      redBook: "晓棠法商笔记",
      publicAccount: "生医法眼"
    }
  },
  {
    id: "l-3",
    name: "李致远",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    firm: "中伦律师事务所",
    position: "高级合伙人",
    city: "深圳",
    email: "lizhiyuan@zhonglun.com",
    phone: "13500007788",
    isRecommended: false,
    isExpert: true,
    hasProfileOpened: true,
    industries: ["跨境业务", "消费品牌"],
    specialties: ["涉外 / 跨境", "财税与行政监管"],
    quote: "不出海，就出局；而出海的胜负，取决于在当地规则里跳舞的能力。",
    bio: "李致远律师长期执业于粤港澳大湾区，主导跨境合规、双向投资及国际争议解决事务。为跨境电商出海、新茶饮出海、储能出海等数十个快消与高增长制造品牌建立全球合规网格，精通多司法辖区税筹架构与反补贴、反倾销应对。",
    cases: [
      {
        id: "lc-3-1",
        industry: "消费品牌",
        stage: "全球化扩张阶段",
        title: "头部新茶饮品牌进军东南亚及欧洲多国供应链出海与海外特许经营架构设立",
        service: "海外加盟体系合规设计、当地食品安全及准入许可、跨境资金出境结算架构及海关税收筹划",
        value: "协助客户在 8 个月内开店突破 300 家，搭建了合规、低税负且回款顺畅的资本总架构"
      }
    ],
    insights: [
      {
        id: "li-3-1",
        title: "从特许经营到直接投资：新茶饮、餐饮品牌出海东南亚五国准入合规要务",
        summary: "总结印尼Halal认证、新加坡健康评级、越南外商控股限制等核心商业障碍与合规破局手段。",
        date: "2026-04-20"
      }
    ],
    interviews: [],
    socialMedia: {
      tiktok: "lawyer_zhiyuan"
    }
  },
  {
    id: "l-4",
    name: "王若谷",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    firm: "金杜律师事务所",
    position: "合伙人",
    city: "杭州",
    email: "wangruogu@kwm.com",
    phone: "13122223333",
    isRecommended: true,
    isExpert: false,
    hasProfileOpened: true,
    industries: ["金融科技", "消费品牌"],
    specialties: ["投融资与资本市场", "公司治理与合同商务"],
    quote: "伟大的公司治理始于第一份创始股东协议。股权架构的平衡直接决定其进化规模。",
    bio: "王若谷律师在投融资、并购重组及科创板/港股红筹上市方面拥有丰富经验。协助杭州、上海两地众多新经济电商、SaaS服务商及数字支付创新企业完成累计数百亿元的融资，擅长股东矛盾化解、VIE架构拆解及重大合规危机公关。",
    cases: [],
    insights: [
      {
        id: "li-4-1",
        title: "早期创业公司合伙人股权分配与动态调整机制设计模板",
        summary: "结合表决权、收益权、知情权和退伙约束，为科技初创团队提供规避五五分账、保障绝对控制权的范本协议指引。",
        date: "2026-03-10"
      }
    ],
    interviews: [],
    socialMedia: {}
  }
];

export const MOCK_VENTURE_ELITES: VentureElite[] = [
  {
    id: "v-1",
    name: "高博闻",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    institution: "红杉中国",
    position: "董事总经理",
    city: "上海",
    email: "bwgao@sequoiachina.com",
    phone: "13901112222",
    industries: ["人工智能", "先进制造"],
    bio: "专注于智能硬件、硬科技、算力芯片及具身智能等赛道的中后期投资。坚持“长线资本陪跑行业冠军”理念，主导投资并培育了三家AI领域独角兽。",
    cases: [
      {
        id: "vc-1-1",
        title: "A 轮领投某光子算力芯片研发公司 2 亿元融资项目",
        stage: "投后管理中",
        description: "协助对接核心汽车、云服务大厂应用场景，重组海内外专利池防范出海摩擦。"
      }
    ]
  },
  {
    id: "v-2",
    name: "许曼宁",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    institution: "高榕资本",
    position: "合伙人",
    city: "北京",
    email: "manning.xu@gaorong.com",
    phone: "13611119999",
    industries: ["医疗健康", "消费品牌"],
    bio: "深耕消费新零售与智慧医疗领域，主导并参与了多个顶尖创新药研制团队、互联网眼科及新中式餐饮品牌的A、B轮关键投资。",
    cases: [
      {
        id: "vc-2-1",
        title: "独家领投某创新细胞疗法医疗服务商 A+ 轮融资",
        description: "搭建了完善的外资战略入股合规保护通道，协调人遗条例相关的合规化拆分。"
      }
    ]
  }
];

export const MOCK_THINK_TANKS: ThinkTank[] = [
  {
    id: "t-1",
    name: "君合律师事务所",
    logo: "JH",
    type: "firm",
    city: "北京",
    services: ["红筹架构搭建", "数据与AI安全合规", "大型跨境并购", "知识产权诉讼"],
    desc: "中国最顶尖的综合型红圈律所之一，在新经济业务、涉外交易领域长期处于国际一等(Tier 1)梯队。",
    stats: {
      lawyersCount: 15,
      reportsCount: 12,
      eventsCount: 6
    }
  },
  {
    id: "t-2",
    name: "方达律师事务所",
    logo: "FD",
    type: "firm",
    city: "上海",
    services: ["生物医药合规", "证券发行上市", "商事争议解决", "外商直接投资"],
    desc: "以创新性和商业敏感度著称，在生物医药、高成长消费领域的投融资及出海架构上具备绝对领先优势。",
    stats: {
      lawyersCount: 18,
      reportsCount: 9,
      eventsCount: 5
    }
  },
  {
    id: "t-3",
    name: "中国法学会新经济法律研究院",
    logo: "NELA",
    type: "institute",
    city: "北京",
    services: ["立法前沿研究", "地方监管沙盒评估", "新规意见征集", "司法案例前沿解读"],
    desc: "由行业顶尖教授和红圈所高级合伙人联合发起，定期向监管呈报新经济创新合规的探索提案。",
    stats: {
      lawyersCount: 5,
      reportsCount: 22,
      eventsCount: 14
    }
  }
];

export const MOCK_INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "art-1",
    title: "AI大模型时代，企业开源语料库治理与数据清洗的合规指南",
    summary: "随着数据安全法和个人信息保护法的严格实施，如何合法合规地进行全网数据清洗、建立著作权防侵权抗辩链条？君合大模型团队为您提供全方位实务解析。",
    content: `## 大模型预训练中的数据合规红线

在生成式 AI (Generative AI) 飞速发展的今天，高质量的数据集是模型智能提升的生命线。然而，海量语料库的收集极易触碰三大法律红线：

1. **著作权侵权红线**：在未经权利人授权的情况下，大规模爬取受版权保护的电子书、付费学术论文、原创博客等，是否能构成“合理使用”？
2. **个人信息与隐私红线**：社交媒体评论、公开招聘信息等语料中常夹杂自然人的个人敏感信息，如何在模型训练中有效执行去标识化与去隐私化。
3. **数据出境与关键信息红线**：若训练涉及国家地理、军事敏感词及重要行业核心机密数据，则可能触犯重要数据安全出境法规。

### 实务应对要点
- **引入授权语料过滤模型**：建立多源语料分类机制，对包含CC-BY、Apache等合规开源授权的语料进行深度打标。
- **动态去标识化工具**：在清洗环节引入自动文本NLP识别，强行脱敏身份证号、电话、人名、邮箱。
- **安全过滤黑名单机制**：网信部门敏感词库、暴力恐怖等有害数据应直接从原始训练集库剔除，并建立算法训练防御性可解释记录。

本指南由新经济产业之星专家律师为您定制，详情可咨询关联律师。`,
    type: "practice",
    author: "陈墨",
    date: "2026-05-12",
    readTime: "8 分钟",
    industries: ["人工智能"],
    specialties: ["数据合规与网络安全", "知识产权"],
    cover: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=300&auto=format&fit=crop",
    linkedLawyerId: "l-1"
  },
  {
    id: "art-2",
    title: "2026年生物医药出海：License-out跨境专利纠纷与里程碑条款博弈要点",
    summary: "生物医药行业跨境授权License-out迎来历史性爆发期，但首批出海案例中开始面临里程碑款争议和不合理分成扣减。方达生医合伙人深度解读新规则下的合同筹划。",
    content: `## 生物医药License-out交易中的利益博弈

License-out（海外授权）正逐渐成为国内创新药企、生物科技初创在临床中后期回笼研发资金、确立国际地位的主要通道。然而，由于合同细节拟定不当，不少药企面临“赔了夫人又折兵”的境地。

### 里程碑付款（Milestone Payments）的设定雷区
1. **临床进展定义含糊**：例如合同约定“进入三期临床”触发里程碑，但对方在临床试验方案（IND）获批后拖延患者首例入组（First Patient In, FPI），以此拖延付款。
2. **专利被异议免责扣减**：部分跨国买方要求在专利面临任何无效审查（IPR）期间，强行扣除高达 50% 的销售额分成。

### 律师应对方案
- 在交易设计中，必须引入**明确的时间节点和“商业上合理努力”（Commercially Reasonable Efforts）**的强制履约标准。
- 对分成和扣减，设立**“地板价”（Floor Level）**，即无论因侵权、仿制药上市、专利异议产生多少扣减，最终支付的分成比例不应低于预设底线。`,
    type: "market",
    author: "徐晓棠",
    date: "2026-06-18",
    readTime: "12 分钟",
    industries: ["医疗健康", "跨境业务"],
    specialties: ["投融资与资本市场", "涉外 / 跨境"],
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300&auto=format&fit=crop",
    linkedLawyerId: "l-2"
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "ev-1",
    title: "2026首届大模型合规与具身智能高阶法商闭门会",
    cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500&auto=format&fit=crop",
    type: "closed_door",
    time: "2026-08-15 14:00 - 18:00",
    location: "北京 · 金茂万丽酒店会议大厅",
    hosts: ["欧氪律新经济商界研究中心", "中国法学会新经济法律研究院"],
    guests: ["陈墨（君合高级合伙人）", "高博闻（红杉中国董事总经理）", "某监管部门算法处特邀专家"],
    targetAudience: "大模型初创企业CEO/CTO、新经济硬科技投资人、人工智能领域合规负责人",
    highlights: [
      "独家透露首批大模型多模态语料跨境备案政策走向",
      "硬科技投融资协议中特有“数据安全陈述与保证”条款设计",
      "现场拆解 2026 最新具身智能核心技术出口壁垒案例"
    ],
    agenda: [
      { time: "14:00 - 14:30", topic: "签到与贵宾私域社交" },
      { time: "14:30 - 15:45", topic: "陈墨律师分享：大模型预训练语料确权与算法合规申报关键阻碍" },
      { time: "15:45 - 16:30", topic: "高博闻：硬科技投资视角，哪些数据瑕疵会直接导致一票否决？" },
      { time: "16:30 - 17:30", topic: "圆桌研讨：算法备案、数据出境、人遗条例的实际合规冲突及监管沙盒破局" },
      { time: "17:30 - 18:00", topic: "定向自由咨询与平台对接" }
    ],
    status: "registering"
  },
  {
    id: "ev-2",
    title: "跨越新周期：生物医药跨境授权（License-out）全案复盘线上沙龙",
    cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=500&auto=format&fit=crop",
    type: "playback",
    time: "2026-07-02 19:30 - 21:00",
    location: "线上直播 (欧氪律特约会议室)",
    hosts: ["欧氪律新经济商界研究中心", "方达律师事务所"],
    guests: ["徐晓棠（方达合伙人）", "许曼宁（高榕资本合伙人）"],
    targetAudience: "创新药企董秘、法务总监、跨境资产并购经理、医药赛道早期投资人",
    highlights: [
      "真实还原 4.2 亿美金 License-out 全案谈判历程",
      "外方恶意终止合作后，中方专利回购与惩罚性索赔实操",
      "视频回放现已全面开放，可点击即时下载活动配套白皮书"
    ],
    agenda: [
      { time: "第一部分", topic: "中国新药License-out爆发态势与合规矛盾核心热点" },
      { time: "第二部分", topic: "海外临床开发权益终止与回拨机制的深度法理解析" },
      { time: "第三部分", topic: "Q&A 观众即时业务难点一问一答" }
    ],
    status: "playback"
  }
];

export const MOCK_REPORTS: ReportItem[] = [
  {
    id: "rep-1",
    title: "NewEco Elite 新经济产业之星名录 (2026 创投法商白皮书)",
    cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=300&auto=format&fit=crop",
    summary: "聚合2026年度新经济赛道表现最活跃的菁英律师、投资专家及智库机构。本名录作为企业法务挑选外部高价值律所的权威法商指南。",
    category: "star",
    industries: ["人工智能", "医疗健康", "先进制造", "跨境业务"],
    specialties: ["投融资与资本市场", "数据合规与网络安全", "知识产权", "涉外 / 跨境"],
    date: "2026-07-01",
    downloadsCount: 1420,
    fileSize: "18.4 MB",
    outline: [
      "一、2026年新经济法律服务三大趋势：AI合规成为绝对刚需",
      "二、NewEco Elite 人工智能、医疗健康及跨境业务上榜律师全息名录",
      "三、代表案例剖析：出海合规与数据要素交易前沿操作实录",
      "四、首期智库机构法律合作评级指数"
    ]
  },
  {
    id: "rep-2",
    title: "中国企业出海数据合规与隐私保护实务白皮书（2026最新版）",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop",
    summary: "覆盖欧洲GDPR最新处罚判定、美国各州州级隐私法爆发、东南亚多国本地化服务器部署要求。为出海企业勾勒最清晰的法务风控网格。",
    category: "whitepaper",
    industries: ["跨境业务", "消费品牌", "金融科技"],
    specialties: ["数据合规与网络安全", "涉外 / 跨境"],
    date: "2026-06-15",
    downloadsCount: 980,
    fileSize: "12.5 MB",
    outline: [
      "一、全球多辖区个人隐私法处罚走势与域外效力前沿",
      "二、跨境电商与SaaS应用：多重Cookies管理与动态同意收集标准",
      "三、核心数据出境安评与涉密豁免申报操作地图",
      "四、全球第三方支付工具及本地代管资金安全合规"
    ]
  }
];

// Industry Stars (NewEco Elite) Data - Section 6.1 & 6.2 of Spec
export const MOCK_INDUSTRY_STARS: IndustryStarCategory[] = [
  {
    id: "ind-1",
    name: "人工智能",
    englishName: "Artificial Intelligence",
    icon: "Sparkles",
    desc: "覆盖大模型训练语料确权、生成式AI算法备案、具身智能软硬件出口管制及智能体自治法律责任、算力资产证券化交易场景。",
    subCategories: ["大语言模型", "具身智能", "AI 医疗", "智能体（Agent）", "算力基础设施"],
    lawyersCount: 12,
    lastUpdated: "2026-07-01",
    status: "published",
    lawyers: [
      {
        id: "star-l-1-1",
        rank: "01",
        name: "陈墨",
        firm: "君合律师事务所",
        city: "北京",
        subCategory: "大语言模型 / 具身智能",
        specialtyTags: ["数据合规与网络安全", "知识产权"],
        evaluation: "陈墨律师在生成式AI领域的政策研判与合规方案落地上，处于国内最前列。他协助首批大模型企业完成了网信备案，方案精巧、实战且可解释性强。",
        caseSummary: "某万亿参数大模型产品语料库清洗合规备案、智能人形机器人技术出口反管制合规治理。",
        hasProfileOpened: true, // elite_profile_opened
        linkedLawyerId: "l-1"
      },
      {
        id: "star-l-1-2",
        rank: "02",
        name: "李若白",
        firm: "大成律师事务所",
        city: "杭州",
        subCategory: "大语言模型 / 算力基础设施",
        specialtyTags: ["数据合规与网络安全", "涉外 / 跨境"],
        evaluation: "李律师擅长处理大规模智算中心建设、算力租赁协议及海量算力跨区域调配的数据保护。为浙江多家大模型及GPU租赁企业提供一站式底座合规服务。",
        caseSummary: "某云端渲染与AI训练集群算力租赁合规链条设计与跨域网络安全架构论证。",
        hasProfileOpened: false, // directory_only
      },
      {
        id: "star-l-1-3",
        rank: "03",
        name: "张一鸣",
        firm: "世辉律师事务所",
        city: "上海",
        subCategory: "智能体（Agent） / 消费场景",
        specialtyTags: ["公司治理与合同商务", "数据合规与网络安全"],
        evaluation: "张律师深耕于社交AI及智能体消费决策链路。在大批量智能代理执行支付等复杂业务时的授权越权法律定性上极具真知灼见。",
        caseSummary: "某虚拟伴侣智能体产品用户协议隐私风险治理与虚拟财产买卖合规防范。",
        hasProfileOpened: false, // directory_only
      }
    ]
  },
  {
    id: "ind-2",
    name: "医疗健康",
    englishName: "Healthcare & Life Sciences",
    icon: "HeartPulse",
    desc: "涵盖新药研制、跨境海外临床资产转让（License-out/in）、人类遗传资源出境安评、AI影像器械资质申请及细胞疗法准入。",
    subCategories: ["创新药开发", "医疗器械与AI影像", "CXO / 医疗外包", "人遗条例申报", "数字医疗"],
    lawyersCount: 8,
    lastUpdated: "2026-06-25",
    status: "published",
    lawyers: [
      {
        id: "star-l-2-1",
        rank: "01",
        name: "徐晓棠",
        firm: "方达律师事务所",
        city: "上海",
        subCategory: "创新药开发 / 人遗条例申报",
        specialtyTags: ["投融资与资本市场", "公司治理与合同商务"],
        evaluation: "徐律师同时具备生物医药学术功底，起草的跨境License-out协议对分成核算、退回权利与国际仲裁机制的拟定极其周密，实战性极佳。",
        caseSummary: "主导某创新抗癌药高达4.2亿美元的海外跨境非独占授权(License-out)知识产权与商业安排。",
        hasProfileOpened: true, // elite_profile_opened
        linkedLawyerId: "l-2"
      }
    ]
  },
  {
    id: "ind-3",
    name: "先进制造",
    englishName: "Advanced Manufacturing",
    icon: "Cpu",
    desc: "覆盖工业4.0、新能源汽车产业链、高端数控机床、核心元器件技术壁垒及供应链重组、商业卫星发射等合规场景。",
    subCategories: ["工业机器人", "新能源整车及配件", "商业航天", "精密元器件"],
    lawyersCount: 9,
    lastUpdated: "2026-07-02",
    status: "sample", // 样例展示
    lawyers: [
      {
        id: "star-l-3-1",
        rank: "01",
        name: "陈墨",
        firm: "君合律师事务所",
        city: "北京",
        subCategory: "工业机器人",
        specialtyTags: ["数据合规与网络安全", "知识产权"],
        evaluation: "陈律师在机器人硬件涉及的出口管制和现场感知数据流动方面具备极佳积累，协助头部厂商建立了双轨反制合规系统。",
        caseSummary: "国内领先工业机器人出口北美数据出境安评与技术出口合规项目。",
        hasProfileOpened: true,
        linkedLawyerId: "l-1"
      }
    ]
  },
  {
    id: "ind-4",
    name: "消费品牌",
    englishName: "Consumer Brands",
    icon: "ShoppingBag",
    desc: "关注茶饮餐饮出海、潮流IP跨境授权、DTC电商合规、绿色环保包装供应链及大额广告引流合规风险控制。",
    subCategories: ["新式餐饮与茶饮", "跨境电商", "潮流IP / 文化出海", "绿色供应链"],
    lawyersCount: 14,
    lastUpdated: "2026-07-05",
    status: "applying", // 申报中
    lawyers: []
  },
  {
    id: "ind-5",
    name: "跨境业务",
    englishName: "Cross-border & Offshore",
    icon: "Globe",
    desc: "涵盖红筹架构（VIE）设计与搭建、离岸财富架构、跨国常年反洗钱与涉外制裁应诉、跨境多国数据合规网格落地。",
    subCategories: ["红筹与VIE重组", "海外信托与财富治理", "涉外仲裁", "跨国制裁合规"],
    lawyersCount: 10,
    lastUpdated: "2026-07-09",
    status: "coming_soon", // 即将发布
    lawyers: []
  }
];
