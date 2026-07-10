/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Share2, 
  Bookmark, 
  Phone, 
  Mail, 
  BookOpen, 
  PlayCircle,
  FileText, 
  X, 
  Check, 
  MessageSquare,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  ChevronLeft
} from 'lucide-react';
import { Lawyer, VentureElite } from '../types';
import { INDUSTRIES_DICT, SPECIALTIES_DICT, CITIES_DICT } from '../data';

interface FacesViewProps {
  lawyers: Lawyer[];
  ventureElites: VentureElite[];
  selectedLawyerFromParent: Lawyer | null;
  onClearSelectedLawyer: () => void;
  onOpenConsultForm: (options: { type: string; lawyerId?: string; lawyerName?: string }) => void;
}

export default function FacesView({
  lawyers,
  ventureElites,
  selectedLawyerFromParent,
  onClearSelectedLawyer,
  onOpenConsultForm
}: FacesViewProps) {
  // Navigation tabs: 'lawyer' | 'venture'
  const [activeTab, setActiveTab] = useState<'lawyer' | 'venture'>('lawyer');
  
  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [onlyRecommended, setOnlyRecommended] = useState(false);

  // Active viewing detail
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [selectedElite, setSelectedElite] = useState<VentureElite | null>(null);

  // Social share feedback
  const [shareFeedback, setShareFeedback] = useState(false);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedLawyerFromParent) {
      setSelectedLawyer(selectedLawyerFromParent);
      setActiveTab('lawyer');
    }
  }, [selectedLawyerFromParent]);

  const handleClearDetail = () => {
    setSelectedLawyer(null);
    onClearSelectedLawyer();
  };

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerShare = () => {
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  // Filter lists
  const filteredLawyers = lawyers.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.firm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry ? l.industries.includes(selectedIndustry) : true;
    const matchesSpecialty = selectedSpecialty ? l.specialties.includes(selectedSpecialty) : true;
    const matchesCity = selectedCity ? l.city === selectedCity : true;
    const matchesRec = onlyRecommended ? l.isRecommended : true;
    return matchesSearch && matchesIndustry && matchesSpecialty && matchesCity && matchesRec;
  });

  const filteredElites = ventureElites.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry ? e.industries.includes(selectedIndustry) : true;
    const matchesCity = selectedCity ? e.city === selectedCity : true;
    return matchesSearch && matchesIndustry && matchesCity;
  });

  return (
    <div className="space-y-6 pb-12" id="faces_view_container">
      
      {/* If looking at lawyer detail, render details layout */}
      {selectedLawyer ? (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm" id="lawyer_detail_page">
          {/* Header Back Link */}
          <div className="bg-slate-50 border-b border-slate-100 py-3.5 px-6 flex justify-between items-center">
            <button 
              onClick={handleClearDetail}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 返回商界面孔列表
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleBookmark(selectedLawyer.id)}
                className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  bookmarked[selectedLawyer.id] 
                    ? 'bg-amber-50 border-amber-300 text-amber-700' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked[selectedLawyer.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                {bookmarked[selectedLawyer.id] ? '已收藏' : '收藏'}
              </button>
              <button 
                onClick={triggerShare}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> 
                {shareFeedback ? '链接已复制!' : '分享海报'}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* 1. Header Card (Section 4.2) */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b border-slate-100 pb-8">
              <img 
                src={selectedLawyer.avatar} 
                alt={selectedLawyer.name} 
                className="w-24 h-24 object-cover rounded-2xl border-2 border-indigo-100 shrink-0" 
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-slate-950">{selectedLawyer.name}</h3>
                  <span className="bg-indigo-50 text-indigo-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-indigo-100/50">
                    菁英律师
                  </span>
                  {selectedLawyer.isRecommended && (
                    <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-100/50">
                      欧氪律推荐专家
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-700">{selectedLawyer.firm} · {selectedLawyer.position}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-300" /> {selectedLawyer.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-slate-300" /> {selectedLawyer.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-slate-300" /> {selectedLawyer.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Self Media Accounts (自媒体账号 - Section 4.2) */}
            {selectedLawyer.socialMedia && Object.values(selectedLawyer.socialMedia).some(Boolean) && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">
                  自媒体法商知识发布矩阵
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedLawyer.socialMedia.publicAccount && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      公众号: <strong className="text-slate-950">{selectedLawyer.socialMedia.publicAccount}</strong>
                    </span>
                  )}
                  {selectedLawyer.socialMedia.wechatChannel && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      视频号: <strong className="text-slate-950">{selectedLawyer.socialMedia.wechatChannel}</strong>
                    </span>
                  )}
                  {selectedLawyer.socialMedia.redBook && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      小红书: <strong className="text-slate-950">{selectedLawyer.socialMedia.redBook}</strong>
                    </span>
                  )}
                  {selectedLawyer.socialMedia.github && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                      Github: <strong className="text-slate-950 font-mono">{selectedLawyer.socialMedia.github}</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 3. Bio & Quote (Section 4.2) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-4">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  个人简介 (Limit 300 Words)
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedLawyer.bio}
                </p>
              </div>

              <div className="md:col-span-4 bg-indigo-50/20 rounded-xl p-4 border border-indigo-100/20 flex flex-col justify-center">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider mb-2 block">执业信条</span>
                <p className="text-indigo-950 text-xs font-bold leading-relaxed italic">
                  “ {selectedLawyer.quote} ”
                </p>
              </div>
            </div>

            {/* 4. Representative Cases in Carousel/Stack Format (代表案例 - Section 4.2) */}
            {selectedLawyer.cases && selectedLawyer.cases.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  代表合规及诉讼案例 (Representative Cases)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLawyer.cases.map((cs) => (
                    <div key={cs.id} className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 shadow-2xs">
                      <div className="flex justify-between items-start gap-3 mb-2.5">
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full">
                          {cs.industry} {cs.stage ? `· ${cs.stage}` : ''}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-950 mb-2">{cs.title}</h5>
                      <p className="text-[11px] text-slate-500 leading-normal mb-3 font-medium">
                        <strong>主要服务：</strong>{cs.service}
                      </p>
                      <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-lg p-2.5 text-[11px] text-emerald-800 font-medium">
                        <strong>商业价值：</strong>{cs.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Insights Column & Interviews (洞见专栏与深度访谈) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              {/* Columns */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  最新洞见专栏 (Column Views)
                </h4>
                {selectedLawyer.insights.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium">暂无发表文章</p>
                ) : (
                  selectedLawyer.insights.map((ins) => (
                    <div key={ins.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-all">
                      <h5 className="text-xs font-bold text-slate-950 mb-1">{ins.title}</h5>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mb-1.5 font-medium">{ins.summary}</p>
                      <span className="text-[9px] text-slate-400 font-mono font-bold">{ins.date}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Interviews */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  深度专访与视频 (Interviews)
                </h4>
                {selectedLawyer.interviews.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium">暂无深度访谈</p>
                ) : (
                  selectedLawyer.interviews.map((intv) => (
                    <div key={intv.id} className="p-3 bg-white border border-slate-100 rounded-lg flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2.5">
                        {intv.type === 'video' ? (
                          <PlayCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                        ) : (
                          <FileText className="w-5 h-5 text-sky-600 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-slate-800 line-clamp-1">{intv.title}</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 uppercase tracking-wider shrink-0">
                        {intv.type === 'video' ? '视频' : '图文'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* 6. Sticky Bottom CTA Block (Section 4.2) */}
            <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 pt-6 mt-12">
              <div className="text-center md:text-left">
                <h4 className="text-xs font-extrabold text-indigo-950">约见或咨询 {selectedLawyer.name} 律师</h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">专属直连通道：提交需求后专属法商客服将在 1 小时内电话跟进对接</p>
              </div>
              <button
                onClick={() => onOpenConsultForm({ type: 'consult', lawyerId: selectedLawyer.id, lawyerName: selectedLawyer.name })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl text-xs transition-all shadow-md shadow-indigo-900/10 cursor-pointer w-full md:w-auto"
              >
                立即发起咨询
              </button>
            </div>

          </div>
        </div>
      ) : selectedElite ? (
        /* Render Venture Elite detail layout */
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm" id="elite_detail_page">
          <div className="bg-slate-50 border-b border-slate-100 py-3.5 px-6 flex justify-between items-center">
            <button 
              onClick={() => setSelectedElite(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 返回商界面孔列表
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleBookmark(selectedElite.id)}
                className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  bookmarked[selectedElite.id] 
                    ? 'bg-amber-50 border-amber-300 text-amber-700' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked[selectedElite.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                {bookmarked[selectedElite.id] ? '已收藏' : '收藏'}
              </button>
              <button 
                onClick={triggerShare}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> 
                {shareFeedback ? '已复制分享链接' : '分享'}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border-b border-slate-100 pb-8">
              <img 
                src={selectedElite.avatar} 
                alt={selectedElite.name} 
                className="w-24 h-24 object-cover rounded-2xl border-2 border-slate-200 shrink-0" 
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black text-slate-950">{selectedElite.name}</h3>
                  <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-200">
                    创投精英
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-700">{selectedElite.institution} · {selectedElite.position}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-300" /> {selectedElite.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-slate-300" /> {selectedElite.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-slate-300" /> {selectedElite.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">投资简介 (Bio)</h4>
              <p className="text-slate-700 text-xs leading-relaxed font-medium">{selectedElite.bio}</p>
            </div>

            {/* Representative Invest Cases */}
            {selectedElite.cases && selectedElite.cases.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">主导代表性投资案例</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedElite.cases.map((cs) => (
                    <div key={cs.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full">
                        {cs.stage || '投后管理中'}
                      </span>
                      <h5 className="text-xs font-bold text-slate-950 mt-2 mb-1.5">{cs.title}</h5>
                      <p className="text-xs text-slate-500 leading-normal font-medium">{cs.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Otherwise render List View with Filters */
        <div className="space-y-6" id="faces_list_pane">
          
          {/* Header Title */}
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">商界面孔</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">聚焦新经济高价值红圈律师、菁英学者与创投资深合伙人展示墙</p>
          </div>

          {/* Toggle Button for Type (Section 4.1) */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-1 rounded-xl max-w-sm">
            <button 
              id="toggle_lawyers"
              onClick={() => setActiveTab('lawyer')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'lawyer' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              菁英律师 ({filteredLawyers.length})
            </button>
            <button 
              id="toggle_elites"
              onClick={() => setActiveTab('venture')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'venture' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              创投精英 ({filteredElites.length})
            </button>
          </div>

          {/* Advanced Search Filter Rail (Section 4.1) */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={activeTab === 'lawyer' ? "搜姓名、律所、业务领域标签..." : "搜投资人、投资机构..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs py-2.5 pl-9 pr-4 bg-slate-50 border border-slate-100 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:bg-white text-slate-800 font-medium"
                />
              </div>

              {/* Only Rec Toggle */}
              {activeTab === 'lawyer' && (
                <button
                  type="button"
                  onClick={() => setOnlyRecommended(!onlyRecommended)}
                  className={`px-4 py-2.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    onlyRecommended 
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                      : 'bg-slate-50 border-slate-100 text-slate-600'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  仅看推荐专家
                </button>
              )}
            </div>

            {/* Dimensional dropdown selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-50">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 block">行业选择</span>
                <select 
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden"
                >
                  <option value="">全部行业</option>
                  {INDUSTRIES_DICT.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              {activeTab === 'lawyer' && (
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 block">业务领域选择</span>
                  <select 
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden"
                  >
                    <option value="">全部业务领域</option>
                    {SPECIALTIES_DICT.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 block">城市选择</span>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 font-medium focus:outline-hidden"
                >
                  <option value="">全部城市</option>
                  {CITIES_DICT.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Rendering list cards */}
          {activeTab === 'lawyer' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="lawyers_list_grid">
              {filteredLawyers.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">没有找到符合条件的菁英律师。</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedIndustry(''); setSelectedSpecialty(''); setSelectedCity(''); setOnlyRecommended(false); }}
                    className="text-xs text-indigo-600 font-bold underline mt-2"
                  >
                    清除重置所有筛选
                  </button>
                </div>
              ) : (
                filteredLawyers.map((lawyer) => (
                  <div 
                    key={lawyer.id}
                    className="bg-white border border-slate-100 hover:border-slate-300 hover:shadow-xs rounded-xl p-5 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex gap-3 items-start mb-3">
                        <img src={lawyer.avatar} alt={lawyer.name} className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0" />
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-sm font-extrabold text-slate-950">{lawyer.name}</h4>
                            {lawyer.isRecommended && (
                              <span className="text-[8px] font-bold bg-indigo-50 text-indigo-700 px-1 rounded border border-indigo-100">推荐专家</span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">{lawyer.firm} · {lawyer.position}</p>
                          <span className="inline-flex items-center text-[10px] text-slate-400 font-semibold font-mono">
                            <MapPin className="w-2.5 h-2.5 mr-0.5 text-slate-300" /> {lawyer.city}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-normal line-clamp-2 mb-4 font-medium italic">
                        “ {lawyer.quote} ”
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {lawyer.industries.map(ind => (
                          <span key={ind} className="bg-slate-50 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200/50">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-slate-50 flex justify-between items-center">
                      <button 
                        onClick={() => setSelectedLawyer(lawyer)}
                        className="text-xs font-bold text-slate-600 hover:text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        查看专属主页 <ChevronRight className="w-3 h-3" />
                      </button>
                      
                      {lawyer.hasProfileOpened && (
                        <button 
                          onClick={() => onOpenConsultForm({ type: 'consult', lawyerId: lawyer.id, lawyerName: lawyer.name })}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-lg text-[10px] cursor-pointer"
                        >
                          立即咨询
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Render Venture Elites List */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="elites_list_grid">
              {filteredElites.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">没有找到符合条件的创投精英。</p>
                </div>
              ) : (
                filteredElites.map((elite) => (
                  <div 
                    key={elite.id}
                    className="bg-white border border-slate-100 hover:border-slate-300 hover:shadow-xs rounded-xl p-5 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex gap-3 items-start mb-3">
                        <img src={elite.avatar} alt={elite.name} className="w-12 h-12 object-cover rounded-xl border border-slate-100 shrink-0" />
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-950">{elite.name}</h4>
                          <p className="text-[11px] text-slate-600 font-medium">{elite.institution} · {elite.position}</p>
                          <span className="inline-flex items-center text-[10px] text-slate-400 font-semibold font-mono">
                            <MapPin className="w-2.5 h-2.5 mr-0.5 text-slate-300" /> {elite.city}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4 font-medium">
                        {elite.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {elite.industries.map(ind => (
                          <span key={ind} className="bg-indigo-50/50 text-indigo-950 text-[9px] font-bold px-2 py-0.5 rounded border border-indigo-100/30">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-50">
                      <button 
                        onClick={() => setSelectedElite(elite)}
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        查看主页并咨询合作 <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
