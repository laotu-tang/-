/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Award, 
  BookOpen, 
  Newspaper, 
  MessageSquare, 
  MapPin, 
  Briefcase, 
  Building2, 
  Compass, 
  HelpCircle,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Lawyer, ThinkTank } from '../types';
import { INDUSTRIES_DICT, SPECIALTIES_DICT, CITIES_DICT } from '../data';

interface HomeViewProps {
  onSearch: (query: string, filters?: any) => void;
  onNavigateToTab: (tab: 'faces' | 'circle' | 'mine' | 'star') => void;
  onNavigateToStarDetail: (id: string) => void;
  onSelectLawyer: (lawyer: Lawyer) => void;
  onSelectThinkTank: (thinkTank: ThinkTank) => void;
  onOpenConsultForm: (options: { type: string; lawyerId?: string; lawyerName?: string }) => void;
  onTriggerAiMatch: (prompt: string) => void;
  featuredLawyers: Lawyer[];
  thinkTanks: ThinkTank[];
}

export default function HomeView({
  onSearch,
  onNavigateToTab,
  onNavigateToStarDetail,
  onSelectLawyer,
  onSelectThinkTank,
  onOpenConsultForm,
  onTriggerAiMatch,
  featuredLawyers,
  thinkTanks
}: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInput, setAiInput] = useState('');
  
  // Quick filters state
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleGeneralSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), {
        industry: selectedIndustry,
        specialty: selectedSpecialty,
        city: selectedCity
      });
    }
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim()) {
      onTriggerAiMatch(aiInput.trim());
    }
  };

  return (
    <div className="space-y-12 pb-16" id="home_view">
      {/* 1. Hero Brand Area & Platform Intro */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12 shadow-xl border border-slate-900" id="hero_section">
        {/* Decorative Grid Accent */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              NewEco Elite 欧氪律
            </div>
            
            <h2 className="text-3.5xl md:text-5xl font-black tracking-tight leading-tight">
              和未来站在一起 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300">
                新经济法商对接服务平台
              </span>
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
              为人工智能、医疗健康、先进制造、跨境业务等新经济产业独角兽，智能匹配最懂新产品、新技术、新场景的专业法律菁英与创投资源。
            </p>

            {/* Quick stats indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 max-w-md">
              <div>
                <p className="text-2xl font-black text-white">NewEco</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">产业之星权威名录</p>
              </div>
              <div>
                <p className="text-2xl font-black text-indigo-400">100%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">新经济赛道覆盖</p>
              </div>
              <div>
                <p className="text-2xl font-black text-sky-400">AI Match</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">分钟级律师智能对接</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-2xl" id="hero_ai_card">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              AI 律师智能推荐引擎
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              输入您的核心业务、行业细分和面临的合规难题，AI 引擎将自动读取法典库与推荐专家，为您量身定制匹配报告。
            </p>
            
            <form onSubmit={handleAiSubmit} className="space-y-3">
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="例如：我们是一家做细胞治疗药物研发的B轮企业，准备向海外授权License-out，需要熟悉人遗条例及跨境专利诉讼的红圈所合伙人..."
                rows={3}
                className="w-full text-xs p-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-slate-950/80 text-slate-200 leading-relaxed resize-none"
              />
              <button
                type="submit"
                disabled={!aiInput.trim()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-900/40"
              >
                <Sparkles className="w-4 h-4" />
                立即开始 AI 智能匹配
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Core Four Navigation Entries (Section 2.2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="core_features_links">
        <button 
          onClick={() => onNavigateToTab('star')}
          className="p-5 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md rounded-2xl text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">产业之星</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">NewEco Elite 权威法律服务场景名录</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            查看名录 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button 
          onClick={() => onNavigateToTab('circle')}
          className="p-5 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md rounded-2xl text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600">产业洞察</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">前沿法律实务、案例白皮书深度解读</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-sky-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            阅读洞察 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button 
          onClick={() => onNavigateToTab('circle')}
          className="p-5 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md rounded-2xl text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
            <Newspaper className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">行业资讯</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">律所最新业绩、政策红线与出海动态</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            最新速递 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>

        <button 
          onClick={() => onOpenConsultForm({ type: 'consult' })}
          className="p-5 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md rounded-2xl text-left transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600">联系咨询</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-normal font-medium">一键提交企业诉求，人工管家一对一匹配</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            立即咨询 <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* 3. Combined Search & Dimensional Fast Filters (Section 2.2) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4" id="home_search_filters">
        <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
          <Compass className="w-4.5 h-4.5 text-slate-600" />
          自主分类检索
        </h3>
        
        <form onSubmit={handleGeneralSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索律师、律所、特许经营、数据出境、人遗条例、重筹重组等关键词..."
              className="w-full text-xs py-3 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white text-slate-800 font-medium"
            />
          </div>
          
          <button
            type="submit"
            className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors cursor-pointer"
          >
            全站搜索
          </button>
        </form>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Industry Selection */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">行业领域</span>
            <select
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                onSearch(searchQuery, { industry: e.target.value, specialty: selectedSpecialty, city: selectedCity });
              }}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-indigo-500"
            >
              <option value="">全部行业</option>
              {INDUSTRIES_DICT.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>

          {/* Specialty Selection */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">法律专业领域</span>
            <select
              value={selectedSpecialty}
              onChange={(e) => {
                setSelectedSpecialty(e.target.value);
                onSearch(searchQuery, { industry: selectedIndustry, specialty: e.target.value, city: selectedCity });
              }}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-indigo-500"
            >
              <option value="">全部专业</option>
              {SPECIALTIES_DICT.map(sp => <option key={sp} value={sp}>{sp}</option>)}
            </select>
          </div>

          {/* City Selection */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">执业地区</span>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                onSearch(searchQuery, { industry: selectedIndustry, specialty: selectedSpecialty, city: e.target.value });
              }}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-indigo-500"
            >
              <option value="">全部地区</option>
              {CITIES_DICT.map(ct => <option key={ct} value={ct}>{ct}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Featured Elite Lawyers (菁英律师) - Sections 2.2 & 2.3 */}
      <div className="space-y-6">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">本期推荐菁英律师</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">严格遵守法商评级标准，主导重大前沿创新合规项目的资深合伙人</p>
          </div>
          <button 
            onClick={() => onNavigateToTab('faces')} 
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            查看全部商界面孔 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="home_lawyer_grid">
          {featuredLawyers.map((lawyer) => (
            <div 
              key={lawyer.id} 
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Lawyer Card Header */}
                <div className="flex gap-4 items-start mb-4">
                  <img 
                    src={lawyer.avatar} 
                    alt={lawyer.name} 
                    className="w-14 h-14 object-cover rounded-xl border border-slate-100 shrink-0" 
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-extrabold text-slate-950">{lawyer.name}</h4>
                      {lawyer.isRecommended && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          推荐专家
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{lawyer.firm} · {lawyer.position}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                      <MapPin className="w-3 h-3 text-slate-300" />
                      {lawyer.city}
                    </div>
                  </div>
                </div>

                {/* Quote (金句) */}
                <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100/50">
                  <p className="text-xs text-slate-700 font-semibold italic leading-relaxed">
                    “ {lawyer.quote} ”
                  </p>
                </div>

                {/* Industry & Specialty Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {lawyer.industries.map(ind => (
                    <span key={ind} className="bg-indigo-50/40 text-indigo-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-indigo-100/30">
                      {ind}
                    </span>
                  ))}
                  {lawyer.specialties.map(sp => (
                    <span key={sp} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-slate-200/50">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Section */}
              <div className="pt-3 border-t border-slate-50 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectLawyer(lawyer)}
                  className="text-xs font-bold text-slate-700 hover:text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
                >
                  查看专属页主页 <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                </button>
                
                {/* Section 2.3 Rule: Display 'Consult' ONLY if elite_profile_opened (hasProfileOpened === true) */}
                {lawyer.hasProfileOpened ? (
                  <button
                    onClick={() => onOpenConsultForm({ type: 'consult', lawyerId: lawyer.id, lawyerName: lawyer.name })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs cursor-pointer transition-colors shadow-xs"
                  >
                    立即咨询
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 italic font-medium">仅名录展示</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Institutional Partner / Think Tanks (智库机构) - Section 2.2 */}
      <div className="space-y-6">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">首期学术与服务智库机构</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">联袂各界顶尖研究院、高校及律所，共同拟定新经济法商合规指标体系</p>
          </div>
          <button 
            onClick={() => onNavigateToTab('circle')} 
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            获取智库合作通道
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="home_thinktanks_grid">
          {thinkTanks.map((tank) => (
            <div 
              key={tank.id} 
              onClick={() => onSelectThinkTank(tank)}
              className="bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-xs rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-950 text-white font-extrabold flex items-center justify-center text-xs tracking-wider shadow-xs">
                    {tank.logo}
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    tank.type === 'firm' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                    tank.type === 'institute' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {tank.type === 'firm' ? '品牌律所' : tank.type === 'institute' ? '研究院' : '产业合作方'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-950 mb-1 line-clamp-1">{tank.name}</h4>
                <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 mb-4 font-medium">{tank.desc}</p>
              </div>

              {/* Stats & Link */}
              <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-bold font-mono">
                <span>{tank.stats.lawyersCount} 位专家 · {tank.stats.reportsCount} 篇报告</span>
                <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">详情 →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
