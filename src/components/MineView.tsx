/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Building, 
  ShieldAlert, 
  Award, 
  Bookmark, 
  Download, 
  PhoneCall, 
  Calendar, 
  Plus, 
  Eye, 
  BarChart3, 
  CheckCircle2, 
  UserCheck, 
  Building2, 
  FileCheck,
  Zap,
  Briefcase
} from 'lucide-react';
import { UserRole, Lawyer } from '../types';

interface MineViewProps {
  lawyers: Lawyer[];
  onSelectLawyer: (lawyer: Lawyer) => void;
}

export default function MineView({
  lawyers,
  onSelectLawyer
}: MineViewProps) {
  // Simulator Role selection (Section 11)
  const [activeRole, setActiveRole] = useState<UserRole>('enterprise');

  // Enterprise fake states
  const [bookmarks, setBookmarks] = useState<string[]>(['l-1', 'l-2']);
  const [downloadHistory] = useState([
    { title: 'NewEco Elite 产业之星名录 (2026 创投法商白皮书)', date: '2026-07-08' },
    { title: '中国企业出海数据合规与隐私保护实务白皮书', date: '2026-07-05' }
  ]);
  const [consultsHistory] = useState([
    { id: 'c-1', lawyerName: '陈墨', type: '大模型备案咨询', date: '2026-07-09', status: '跟进中' }
  ]);

  // Lawyer fake states (Section 11.3)
  const [completeness] = useState(88);
  const [leads] = useState([
    { id: 'lead-1', name: '张经理', company: '某医疗机器人独角兽', demand: '海外临床人遗条例豁免审查及商业出境数据评估', date: '2026-07-09', status: '待跟进' },
    { id: 'lead-2', name: '李总监', company: '大模型应用创业团队', demand: '多模态对话智能体模型上线合规清洗语料备案指导', date: '2026-07-07', status: '已接洽' }
  ]);

  // Law firm fake states (Section 11.4)
  const [linkedLawyers] = useState([
    { name: '陈墨', position: '高级合伙人', leadsCount: 4, views: 1420 },
    { name: '徐晓棠', position: '合伙人', leadsCount: 2, views: 980 }
  ]);

  return (
    <div className="space-y-6 pb-12" id="mine_view_container">
      
      {/* 1. Profile Panel with Role Selector */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {activeRole === 'enterprise' ? '企' : activeRole === 'lawyer' ? '律' : '所'}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-950">
                {activeRole === 'enterprise' ? '张博文 (企业会员)' : activeRole === 'lawyer' ? '陈墨 律师 (高级专家)' : '君合律师事务所 (管理后台)'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">账户ID: 4124-4300-6619 · 2026年度认证授权</p>
            </div>
          </div>

          {/* Quick interactive selector to switch simulated view (Section 11) */}
          <div className="space-y-1 w-full sm:w-auto">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block sm:text-right">切换用户视图进行测试</span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button 
                onClick={() => setActiveRole('enterprise')}
                className={`px-3 py-1 text-[10px] font-bold rounded ${
                  activeRole === 'enterprise' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                企业客户
              </button>
              <button 
                onClick={() => setActiveRole('lawyer')}
                className={`px-3 py-1 text-[10px] font-bold rounded ${
                  activeRole === 'lawyer' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                入驻律师
              </button>
              <button 
                onClick={() => setActiveRole('firm')}
                className={`px-3 py-1 text-[10px] font-bold rounded ${
                  activeRole === 'firm' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                品牌律所
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ROLE-SPECIFIC INTERACTIVE DASHBOARD PANELS */}

      {/* VIEW A: Enterprise Dashboard (Section 11.2) */}
      {activeRole === 'enterprise' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="enterprise_dashboard">
          
          {/* Main List Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Bookmarks */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Bookmark className="w-4 h-4 text-slate-400" />
                我的法商收藏名册
              </h4>

              {bookmarks.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 font-semibold text-center">暂无收藏的商界面孔或产业之星。</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {bookmarks.map((id) => {
                    const l = lawyers.find(item => item.id === id);
                    if (!l) return null;
                    return (
                      <div key={id} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <h5 className="font-bold text-slate-950">{l.name}</h5>
                          <p className="text-[10px] text-slate-500">{l.firm} · {l.position}</p>
                        </div>
                        <button 
                          onClick={() => onSelectLawyer(l)}
                          className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                        >
                          直连主页 →
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Consult Tracker */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-slate-400" />
                我的法商咨询对接记录 (Section 15.1)
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">目标专家</th>
                      <th className="p-2.5">咨询类型</th>
                      <th className="p-2.5">提交时间</th>
                      <th className="p-2.5 rounded-r-lg">对接状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                    {consultsHistory.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5">{item.lawyerName} 律师</td>
                        <td className="p-2.5">{item.type}</td>
                        <td className="p-2.5 font-mono">{item.date}</td>
                        <td className="p-2.5 text-indigo-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                          {item.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Downloads Hist */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Download className="w-4 h-4 text-slate-400" />
                我的留资下载历史
              </h4>
              
              <div className="space-y-3">
                {downloadHistory.map((dl, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <h5 className="text-[11px] font-bold text-slate-900 line-clamp-2">{dl.title}</h5>
                    <span className="text-[9px] text-slate-400 font-mono font-bold block">下载于: {dl.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B: Lawyer Dashboard (Section 11.3) */}
      {activeRole === 'lawyer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="lawyer_dashboard">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Active Leads (线索) */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-500 animate-pulse" />
                  最新匹配对接线索 (Active Leads - Section 11.3)
                </h4>
                <span className="text-[10px] text-slate-400 font-bold font-mono">2 条待跟进</span>
              </div>

              <div className="space-y-3">
                {leads.map((ld) => (
                  <div key={ld.id} className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xs font-bold text-slate-950">{ld.company} · {ld.name}</h5>
                        <span className="text-[9px] text-slate-400 font-mono font-bold block mt-0.5">申请时间: {ld.date}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        ld.status === '待跟进' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {ld.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold bg-white p-2.5 rounded-lg border border-slate-100/30">
                      <strong>咨询需求描述：</strong>{ld.demand}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* My Cases Editor panel mockup */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  代表案件管理 (Representative Cases)
                </h4>
                <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" /> 新增标杆案例
                </button>
              </div>

              <div className="p-4 bg-slate-50/50 rounded-xl text-center text-xs text-slate-400 font-semibold py-8">
                已在商界面孔专属页合规披露 2 项代表案件。点击上方按钮可继续添加。
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            
            {/* Completion & Views Metrics */}
            <div className="bg-slate-950 text-white border border-slate-900 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">专属页资料完备度</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>主页资料完成率</span>
                  <span>{completeness}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${completeness}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold">资料完备度大于 85%，可优先进入 AI 智能推荐模型匹配权值。</p>
              </div>

              {/* Views Stats */}
              <div className="pt-4 border-t border-slate-900 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">总展现曝光</span>
                  <span className="text-lg font-black font-mono text-white">4,280次</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">对接咨询点击</span>
                  <span className="text-lg font-black font-mono text-indigo-400">32次</span>
                </div>
              </div>
            </div>

            {/* Rights (权益) */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">欧氪律尊享权益</h4>
              <div className="space-y-2">
                <div className="text-xs font-bold flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>商界面孔高端专属页开通</span>
                </div>
                <div className="text-xs font-bold flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>AI 检索匹配第一梯度展现</span>
                </div>
                <div className="text-xs font-bold flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>产业之星上榜名录反链跳转</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW C: Law Firm Dashboard (Section 11.4) */}
      {activeRole === 'firm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="firm_dashboard">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Linked Lawyers */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                本所合规入驻律师列表
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">律师姓名</th>
                      <th className="p-2.5">职位</th>
                      <th className="p-2.5">累计获取商机</th>
                      <th className="p-2.5 rounded-r-lg">主页总访客</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                    {linkedLawyers.map((ly, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5">{ly.name}</td>
                        <td className="p-2.5">{ly.position}</td>
                        <td className="p-2.5 text-indigo-600">{ly.leadsCount} 条</td>
                        <td className="p-2.5 font-mono">{ly.views} 次</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">律所管理中心</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                律所版本后台支持进行多位高级合伙人的批量提名推荐（参评产业之星），并归口查看从“咨询”入口流转进本所的总商务对接数据。
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
