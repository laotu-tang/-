/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  User, 
  PlayCircle, 
  ArrowRight, 
  Download, 
  Calendar, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  FileText, 
  Sparkles,
  Share2,
  CheckCircle,
  HelpCircle,
  Lock
} from 'lucide-react';
import { InsightArticle, EventItem, ReportItem, Lawyer } from '../types';
import { INDUSTRIES_DICT, SPECIALTIES_DICT } from '../data';

interface CircleViewProps {
  articles: InsightArticle[];
  events: EventItem[];
  reports: ReportItem[];
  lawyers: Lawyer[];
  onSelectLawyer: (lawyer: Lawyer) => void;
  onOpenConsultForm: (options: { type: string; lawyerId?: string; lawyerName?: string; reportId?: string; reportName?: string; eventId?: string; eventName?: string }) => void;
}

export default function CircleView({
  articles,
  events,
  reports,
  lawyers,
  onSelectLawyer,
  onOpenConsultForm
}: CircleViewProps) {
  // Tabs: 'insight' | 'event' | 'column' | 'lab' | 'report'
  const [activeTab, setActiveTab] = useState<'insight' | 'event' | 'column' | 'lab' | 'report'>('insight');
  
  // Filtering & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  
  // Detailed viewers
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Download forms
  const [downloadReportId, setDownloadReportId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    industry: '',
    purpose: '',
    agreed: false
  });

  // Filtered lists
  const filteredArticles = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchInd = selectedIndustry ? a.industries.includes(selectedIndustry) : true;
    return matchSearch && matchInd;
  });

  const filteredEvents = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const filteredReports = reports.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchInd = selectedIndustry ? r.industries.includes(selectedIndustry) : true;
    return matchSearch && matchInd;
  });

  const handleDownloadSubmit = (e: React.FormEvent, report: ReportItem) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.agreed) {
      alert('请完整填写表单并同意隐私授权');
      return;
    }
    // Simulation
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadReportId(null);
      // Reset form
      setLeadForm({ name: '', company: '', position: '', phone: '', industry: '', purpose: '', agreed: false });
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-12" id="circle_view_container">
      
      {/* 1. Article Reader Details Overlay */}
      {selectedArticle && (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm space-y-6 p-6 md:p-8" id="article_detail_view">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> 返回破局圈列表
          </button>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                {selectedArticle.type === 'practice' ? '法律实务' : selectedArticle.type === 'market' ? '市场洞察' : '深度案例'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                {selectedArticle.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-semibold items-center pt-2">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-slate-400" /> 作者: {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" /> 阅读: {selectedArticle.readTime}
                </span>
                <span className="font-mono">发布时间: {selectedArticle.date}</span>
              </div>
            </div>

            <img 
              src={selectedArticle.cover} 
              alt={selectedArticle.title} 
              className="w-full h-64 object-cover rounded-xl border border-slate-100 my-4" 
            />

            {/* Markdown styled content */}
            <div className="prose prose-slate text-xs md:text-sm text-slate-700 leading-relaxed font-medium space-y-4 pt-4 border-t border-slate-50">
              <p className="font-bold text-slate-900 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50 rounded-r-lg">
                摘要：{selectedArticle.summary}
              </p>
              
              {/* Splitting standard text content */}
              <div className="whitespace-pre-wrap leading-relaxed space-y-3">
                {selectedArticle.content}
              </div>
            </div>

            {/* Backlink to active lawyer (Section 5.3) */}
            {selectedArticle.linkedLawyerId && (
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-950">本文原作者已入选 欧氪律 菁英律师名录</h4>
                  <p className="text-[10px] text-slate-500 font-medium">您可以直接向该律师提交您的法商合规咨询申请</p>
                </div>
                <button
                  onClick={() => {
                    const matchedLawyer = lawyers.find(l => l.id === selectedArticle.linkedLawyerId);
                    if (matchedLawyer) onSelectLawyer(matchedLawyer);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  查看该律师专属页并咨询
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Event Detailed Page (Section 5.5) */}
      {selectedEvent && (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-6 md:p-8" id="event_detail_view">
          <button 
            onClick={() => setSelectedEvent(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> 返回活动列表
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-md uppercase tracking-wider">
                  {selectedEvent.type === 'closed_door' ? '闭门研讨会' : '线上直播回放'}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                  {selectedEvent.title}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-indigo-500" />
                    <span><strong>时间:</strong> {selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-sky-500" />
                    <span><strong>地点:</strong> {selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              <img 
                src={selectedEvent.cover} 
                alt={selectedEvent.title} 
                className="w-full h-56 object-cover rounded-xl border border-slate-100" 
              />

              {/* Target Audience */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100/50">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">适合人群 (Target Audience)</h4>
                <p className="text-xs text-slate-700 font-semibold">{selectedEvent.targetAudience}</p>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">活动核心亮点 (Highlights)</h4>
                <ul className="space-y-2">
                  {selectedEvent.highlights.map((hl, idx) => (
                    <li key={idx} className="text-xs text-slate-700 font-medium flex gap-2 items-start">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Agenda */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">研讨议程 (Agenda)</h4>
                <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {selectedEvent.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-3.5 text-xs">
                      <span className="w-24 text-indigo-600 font-bold shrink-0">{item.time}</span>
                      <span className="text-slate-800 font-semibold">{item.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Form Action */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-900 sticky top-4">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                  席位预定与通道
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-6 font-medium">
                  {selectedEvent.status === 'registering' 
                    ? '本活动为实名审核制闭门沙龙。提交报名后，将在2个工作日内由官方确认并发送特邀门票。' 
                    : '本期视频及配套法商实务报告已开放下载，输入留资即可回看。'}
                </p>

                <button
                  onClick={() => onOpenConsultForm({ 
                    type: 'event_register', 
                    eventId: selectedEvent.id, 
                    eventName: selectedEvent.title 
                  })}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  {selectedEvent.status === 'registering' ? '立即在线申请席位' : '立即预约看回放与下载资料'}
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => onOpenConsultForm({ type: 'consult' })}
                    className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    赞助活动或进行发言合作咨询
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Report Detailed & Lead Form Card (Section 9.2 & 9.3) */}
      {selectedReport && (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-6 md:p-8" id="report_detail_view">
          <button 
            onClick={() => setSelectedReport(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> 返回报告中心列表
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <img 
                src={selectedReport.cover} 
                alt={selectedReport.title} 
                className="w-full h-80 object-cover rounded-xl shadow-md border border-slate-100" 
              />
              <div className="mt-4 text-center font-mono text-[11px] text-slate-400 font-bold">
                大小: {selectedReport.fileSize} · 下载量: {selectedReport.downloadsCount}次
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                  {selectedReport.category === 'star' ? 'NewEco Elite 产业之星报告' : '行业白皮书'}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                  {selectedReport.title}
                </h2>
                <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedReport.summary}
                </p>
              </div>

              {/* Outline Index */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">报告大纲目录 (Index Outline)</h4>
                <ul className="space-y-2 border border-slate-100 rounded-xl p-4 divide-y divide-slate-50">
                  {selectedReport.outline.map((ot, idx) => (
                    <li key={idx} className="text-xs text-slate-700 font-medium py-2 flex items-baseline gap-2">
                      <span className="text-indigo-500 font-bold font-mono">0{idx + 1}.</span>
                      <span>{ot}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Download Lead capture form (Section 9.3) */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6" id="report_download_form">
                <h4 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 mb-2">
                  <Download className="w-4.5 h-4.5 text-indigo-600" />
                  申请下载留资 (Download Form)
                </h4>
                <p className="text-xs text-slate-500 mb-4 font-medium">请提供您的企业信息，以便我们合规归档并为您提供本报告的高清PDF下载链接。</p>
                
                {downloadReportId === selectedReport.id && downloadSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-5 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h5 className="text-sm font-extrabold">留资验证成功！</h5>
                    <p className="text-xs">高清PDF已开始自动下载。如未开始，请点击：<a href="#" className="underline font-bold text-indigo-600">手动下载名录.pdf</a></p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { setDownloadReportId(selectedReport.id); handleDownloadSubmit(e, selectedReport); }} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">姓名 *</span>
                        <input 
                          type="text" 
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                          placeholder="您的姓名"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">手机/微信 *</span>
                        <input 
                          type="text" 
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                          placeholder="您的联系方式"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">公司/机构</span>
                        <input 
                          type="text" 
                          value={leadForm.company}
                          onChange={(e) => setLeadForm({...leadForm, company: e.target.value})}
                          placeholder="公司名称"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">职位</span>
                        <input 
                          type="text" 
                          value={leadForm.position}
                          onChange={(e) => setLeadForm({...leadForm, position: e.target.value})}
                          placeholder="您的职位"
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="agree_cb"
                        checked={leadForm.agreed}
                        onChange={(e) => setLeadForm({...leadForm, agreed: e.target.checked})}
                        className="mt-0.5" 
                      />
                      <label htmlFor="agree_cb" className="text-[11px] text-slate-500 font-medium">
                        本人同意并授权欧氪律收集本表单信息用于发送报告材料及进行后续服务对接
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!leadForm.name || !leadForm.phone || !leadForm.agreed}
                      className="w-full bg-slate-950 hover:bg-slate-850 disabled:opacity-40 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                    >
                      <Download className="w-4 h-4" />
                      提交信息并立即获取下载链接
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Normal List Views with Top Tabs (Section 5.1 & 9.1) */}
      {!selectedArticle && !selectedEvent && !selectedReport && (
        <div className="space-y-6" id="circle_list_panel">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">破局圈</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">聚合前沿法律实务、创新闭门会议、专业研究报告及实操增长指南</p>
          </div>

          {/* Tab switches (Section 5.1 & 9.1) */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-1 rounded-xl max-w-md overflow-x-auto">
            <button 
              id="circle_tab_insight"
              onClick={() => setActiveTab('insight')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'insight' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              产业洞察
            </button>
            <button 
              id="circle_tab_event"
              onClick={() => setActiveTab('event')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'event' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              高端活动
            </button>
            <button 
              id="circle_tab_report"
              onClick={() => setActiveTab('report')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'report' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              报告中心
            </button>
            <button 
              id="circle_tab_column"
              onClick={() => setActiveTab('column')}
              className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'column' ? 'bg-white text-indigo-700 shadow-2xs border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              精选栏目
            </button>
          </div>

          {/* Optional Industry Filter Bar */}
          {(activeTab === 'insight' || activeTab === 'report') && (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col sm:flex-row justify-between gap-3 items-center">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索报告标题、文章关键词..."
                  className="w-full text-[11px] py-1.5 pl-9 pr-4 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden"
                />
              </div>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="text-[11px] p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 font-semibold focus:outline-hidden"
              >
                <option value="">全部产业分类</option>
                {INDUSTRIES_DICT.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
          )}

          {/* TAB 1: Industry Insights LIST */}
          {activeTab === 'insight' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="insights_grid">
              {filteredArticles.map((art) => (
                <div key={art.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xs transition-all flex flex-col justify-between">
                  <div>
                    <img src={art.cover} alt={art.title} className="w-full h-40 object-cover border-b border-slate-50" />
                    <div className="p-4 space-y-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md">
                        {art.industries[0]}
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 line-clamp-2 leading-snug">{art.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 font-medium">{art.summary}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                    <span className="font-mono">作者: {art.author} · {art.date}</span>
                    <button 
                      onClick={() => setSelectedArticle(art)}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      阅读全文 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Events LIST (Section 5.4) */}
          {activeTab === 'event' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="events_grid">
              {filteredEvents.map((ev) => (
                <div key={ev.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xs transition-all flex flex-col justify-between">
                  <div>
                    <img src={ev.cover} alt={ev.title} className="w-full h-40 object-cover border-b border-slate-50" />
                    <div className="p-4 space-y-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                        ev.status === 'registering' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {ev.status === 'registering' ? '火热报名中' : '精彩回放'}
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 line-clamp-2 leading-snug">{ev.title}</h4>
                      
                      <div className="space-y-1 pt-1.5 text-[11px] text-slate-500 font-medium">
                        <p className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {ev.time}</p>
                        <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button 
                      onClick={() => setSelectedEvent(ev)}
                      className="w-full bg-slate-950 hover:bg-slate-850 text-white font-bold py-2 px-4 rounded-lg text-xs text-center cursor-pointer block"
                    >
                      {ev.status === 'registering' ? '申请闭门席位' : '立即看回放及提取白皮书'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Reports LIST (Section 9.1) */}
          {activeTab === 'report' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="reports_grid">
              {filteredReports.map((rep) => (
                <div key={rep.id} className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4 hover:border-slate-300 transition-all">
                  <img src={rep.cover} alt={rep.title} className="w-24 h-32 object-cover rounded-lg border border-slate-100 shadow-2xs shrink-0" />
                  <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {rep.category === 'star' ? '产业之星报告' : '深度白皮书'}
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-950 line-clamp-2 leading-snug">{rep.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-medium">{rep.summary}</p>
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold font-mono">
                      <span>{rep.fileSize} · {rep.downloadsCount}次下载</span>
                      <button 
                        onClick={() => setSelectedReport(rep)}
                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        申请下载 <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4:精选栏目 (Section 5.6 & 5.7) */}
          {activeTab === 'column' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="columns_grid">
              <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-md text-[9px] font-bold uppercase tracking-wider">
                  高端访谈专栏
                </div>
                <h4 className="text-sm font-extrabold text-slate-950">律途十字路</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  聚焦行业高增长合伙人，在红筹解构、监管趋严、大模型狂飙的新常态下，分享他们如何跨越职业十字路口的决策与洞察。
                </p>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-bold">已更新 18 期视频图文</span>
                  <span className="text-indigo-600 font-bold hover:underline cursor-pointer">立即查看栏目详情 →</span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-[9px] font-bold uppercase tracking-wider">
                  产业极速共创
                </div>
                <h4 className="text-sm font-extrabold text-slate-950">拉个群聊</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  由欧氪律发起的高密度新经济商界线上微沙龙。一个问题、多位大厂法务总监及红圈资深律师，30分钟碰撞出实操方案合规导图。
                </p>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-bold">已更新 32 期群聊精粹</span>
                  <span className="text-indigo-600 font-bold hover:underline cursor-pointer">立即查看栏目详情 →</span>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
