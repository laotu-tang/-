/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'enterprise' | 'lawyer' | 'firm';

export interface Lawyer {
  id: string;
  name: string;
  avatar: string;
  firm: string;
  position: string;
  city: string;
  email: string;
  phone: string;
  isRecommended: boolean; // 欧氪律推荐律师
  isExpert: boolean;      // 智库专家
  hasProfileOpened: boolean; // 是否开通商界面孔专属页 (elite_profile_opened)
  industries: string[];   // 行业领域, e.g. ["人工智能", "医疗健康"]
  specialties: string[];  // 法律专业, e.g. ["投融资与资本市场", "数据合规与网络安全"]
  quote: string;          // 金句
  bio: string;            // 个人简介
  cases: Array<{
    id: string;
    industry: string;
    stage?: string;
    title: string;
    service: string;
    value: string;
  }>;
  insights: Array<{
    id: string;
    title: string;
    summary: string;
    date: string;
  }>;
  interviews: Array<{
    id: string;
    title: string;
    type: 'video' | 'text';
    link?: string;
  }>;
  socialMedia?: {
    wechatChannel?: string; // 视频号
    tiktok?: string;        // 抖音
    redBook?: string;       // 小红书
    bilibili?: string;      // B站
    publicAccount?: string; // 公众号
    github?: string;        // Github
  };
}

export interface VentureElite {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  position: string;
  city: string;
  email: string;
  phone: string;
  industries: string[];
  bio: string;
  cases: Array<{
    id: string;
    title: string;
    stage?: string;
    description: string;
  }>;
}

export interface IndustryStarCategory {
  id: string;
  name: string; // e.g. 人工智能
  englishName: string; // e.g. Artificial Intelligence
  icon: string;
  desc: string;
  subCategories: string[]; // e.g. ["大模型", "具身智能"]
  lawyersCount: number;
  lastUpdated: string;
  status: 'published' | 'sample' | 'applying' | 'coming_soon'; // 已发布, 样例展示, 申报中, 即将发布
  lawyers: Array<{
    id: string;
    rank: string; // e.g. "01"
    name: string;
    firm: string;
    city: string;
    subCategory: string; // 细分项
    specialtyTags: string[];
    evaluation: string; // 律师评价
    caseSummary: string; // 代表服务案例摘要
    hasProfileOpened: boolean; // directory_only vs elite_profile_opened
    linkedLawyerId?: string; // 关联的商界面孔律师ID
  }>;
}

export interface ThinkTank {
  id: string;
  name: string;
  logo: string;
  type: 'firm' | 'institute' | 'industry' | 'media' | 'event'; // 律所, 研究院, 产业合作方, 媒体合作方, 活动合作方
  city: string;
  services: string[];
  desc: string;
  stats: {
    lawyersCount: number;
    reportsCount: number;
    eventsCount: number;
  };
}

export interface InsightArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  type: 'practice' | 'market' | 'case' | 'report'; // 法律实务, 市场洞察, 案例解读, 研究报告
  author: string;
  date: string;
  readTime: string;
  industries: string[];
  specialties: string[];
  cover: string;
  linkedLawyerId?: string;
}

export interface EventItem {
  id: string;
  title: string;
  cover: string;
  type: 'forum' | 'closed_door' | 'roundtable' | 'webinar' | 'salon' | 'playback'; // 论坛, 闭门会, 圆桌, 线上直播, 沙龙, 活动回放
  time: string;
  location: string;
  hosts: string[];
  guests: string[];
  targetAudience: string;
  highlights: string[];
  agenda: Array<{ time: string; topic: string }>;
  status: 'registering' | 'ended' | 'playback';
}

export interface ReportItem {
  id: string;
  title: string;
  cover: string;
  summary: string;
  category: 'star' | 'industry' | 'whitepaper' | 'insight'; // 产业之星报告, 行业研究, 白皮书, 市场洞察
  industries: string[];
  specialties: string[];
  date: string;
  downloadsCount: number;
  fileSize: string;
  outline: string[];
}

export interface LeadSubmission {
  id: string;
  type: 'consult' | 'match' | 'download' | 'register' | 'star_apply' | 'onboarding';
  name: string;
  company: string;
  position: string;
  contact: string; // 手机 / 微信
  industry: string;
  description?: string;
  city?: string;
  targetLawyerId?: string;
  targetLawyerName?: string;
  targetEventId?: string;
  targetEventName?: string;
  targetReportId?: string;
  targetReportName?: string;
  timestamp: string;
}
