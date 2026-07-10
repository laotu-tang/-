/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  MapPin, 
  Download, 
  Users, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  FileText, 
  Share2, 
  Plus, 
  Trash,
  SlidersHorizontal,
  CheckCircle2,
  Info
} from 'lucide-react';
import { IndustryStarCategory, Lawyer } from '../types';
import { INDUSTRIES_DICT, SPECIALTIES_DICT } from '../data';

interface EliteStarsViewProps {
  categories: IndustryStarCategory[];
  onSelectLawyer: (lawyer: Lawyer) => void;
  lawyers: Lawyer[];
  onOpenConsultForm: (options: { type: string; lawyerId?: string; lawyerName?: string }) => void;
}

export default function EliteStarsView({
  categories,
  onSelectLawyer,
  lawyers,
  onOpenConsultForm
}: EliteStarsViewProps) {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025'>('2026');
  const [selectedCategory, setSelectedCategory] = useState<IndustryStarCategory | null>(null);
  
  // Specialty filter inside Industry Star details page (Section 6.2)
  const [activeSpecialtyFilter, setActiveSpecialtyFilter] = useState<string>('投融资与资本市场');
  
  // Nominate states (Section 10.4)
  const [nominateMode, setNominateMode] = useState<'none' | 'single' | 'batch'>('none');
  const [nominateSuccess, setNominateSuccess] = useState(false);

  // Download form states
  const [downloadActive, setDownloadActive] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [downloadForm, setDownloadForm] = useState({
    name: '', company: '', position: '', contact: '', industry: '', purpose: '', agreed: false
  });

  // Nominate Single Form state
  const [singleForm, setSingleForm] = useState({
    name: '', firm: '', industry: '人工智能', subCategory: '', specialty: '投融资与资本市场', caseMaterial: '', contact: '', remarks: ''
  });

  // Nominate Batch Form state (Section 10.4)
  const [batchForm, setBatchForm] = useState({
    firmName: '',
    contactName: '',
    contactPhone: '',
    industry: '人工智能',
    year: '2026',
    remarks: '',
    nominees: [
      { name: '', position: '合伙人', city: '北京', specialty: '投融资与资本市场', subCategory: '', evaluation: '' }
    ]
  });

  const handleAddNominee = () => {
    setBatchForm({
      ...batchForm,
      nominees: [...batchForm.nominees, { name: '', position: '合伙人', city: '北京', specialty: '投融资与资本市场', subCategory: '', evaluation: '' }]
    });
  };

  const handleRemoveNominee = (index: number) => {
    const updated = [...batchForm.nominees];
    updated.splice(index, 1);
    setBatchForm({ ...batchForm, nominees: updated });
  };

  const handleBatchNomineeChange = (index: number, field: string, value: string) => {
    const updatedNominees = batchForm.nominees.map((nom, idx) => {
      if (idx === index) {
        return { ...nom, [field]: value };
      }
      return nom;
    });
    setBatchForm({ ...batchForm, nominees: updatedNominees });
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNominateSuccess(true);
    setTimeout(() => {
      setNominateSuccess(false);
      setNominateMode('none');
      // reset
      setSingleForm({ name: '', firm: '', industry: '人工智能', subCategory: '', specialty: '投融资与资本市场', caseMaterial: '', contact: '', remarks: '' });
    }, 3000);
  };

  const handleBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNominateSuccess(true);
    setTimeout(() => {
      setNominateSuccess(false);
      setNominateMode('none');
      // reset
      setBatchForm({
        firmName: '', contactName: '', contactPhone: '', industry: '人工智能', year: '2026', remarks: '',
        nominees: [{ name: '', position: '合伙人', city: '北京', specialty: '投融资与资本市场', subCategory: '', evaluation: '' }]
      });
    }, 3000);
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadCompleted(true);
    setTimeout(() => {
      setDownloadCompleted(false);
      setDownloadActive(false);
      setDownloadForm({ name: '', company: '', position: '', contact: '', industry: '', purpose: '', agreed: false });
    }, 4000);
  };

  // Get filtered lawyers inside active Category (Section 6.2)
  const currentCategoryLawyers = selectedCategory
    ? selectedCategory.lawyers.filter(lawyer => {
        // Match activeSpecialtyFilter
        return lawyer.specialtyTags.includes(activeSpecialtyFilter);
      })
    : [];

  return (
    <div className="space-y-8 pb-16" id="elite_stars_view_container">
      
      {/* SECTION A: Nomination Form Mode (Section 10.4) */}
      {nominateMode !== 'none' && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6" id="star_nomination_form">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-950">
                {nominateMode === 'single' ? '申请入选 NewEco Elite 产业之星' : '律所批量推荐申报通道'}
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                {nominateMode === 'single' ? '律师个人推荐或自主申报' : '律所统一为多名合伙人批量递交参评案例材料'}
              </p>
            </div>
            <button 
              onClick={() => setNominateMode('none')}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              取消并返回
            </button>
          </div>

          {nominateSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-extrabold">推荐申报信息已成功提交！</h4>
              <p className="text-xs max-w-md mx-auto">欧氪律评选委员会将在 3 个工作日内进行首轮硬核法商数据核验，并向推荐联系人发送资料确认回执邮件。</p>
              <button 
                onClick={() => setNominateMode('none')}
                className="bg-slate-950 text-white font-bold py-1.5 px-6 rounded-lg text-xs"
              >
                我知道了
              </button>
            </div>
          ) : nominateMode === 'single' ? (
            /* Single nominee form */
            <form onSubmit={handleSingleSubmit} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">申报/被推荐律师姓名 *</span>
                  <input 
                    type="text" required value={singleForm.name}
                    onChange={(e) => setSingleForm({...singleForm, name: e.target.value})}
                    placeholder="例如：陈墨" className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">所属律师事务所 *</span>
                  <input 
                    type="text" required value={singleForm.firm}
                    onChange={(e) => setSingleForm({...singleForm, firm: e.target.value})}
                    placeholder="例如：君合律师事务所" className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">申报新经济产业类别 *</span>
                  <select 
                    value={singleForm.industry}
                    onChange={(e) => setSingleForm({...singleForm, industry: e.target.value})}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 font-semibold"
                  >
                    {INDUSTRIES_DICT.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">产业二级细分项 *</span>
                  <input 
                    type="text" required value={singleForm.subCategory}
                    onChange={(e) => setSingleForm({...singleForm, subCategory: e.target.value})}
                    placeholder="例如：生成式AI / 具身智能" className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">核心法律服务业务领域 *</span>
                <select 
                  value={singleForm.specialty}
                  onChange={(e) => setSingleForm({...singleForm, specialty: e.target.value})}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 font-semibold"
                >
                  {SPECIALTIES_DICT.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                </select>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">代表作及硬核合规服务材料描述 *</span>
                <textarea 
                  rows={3} required value={singleForm.caseMaterial}
                  onChange={(e) => setSingleForm({...singleForm, caseMaterial: e.target.value})}
                  placeholder="限500字。描述推荐对象最近一年在新经济场景下，主导的标杆性合规备案、商业闭环设计或诉讼案例，并附带云端公开报道链接或判决文书号等..." 
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">推荐联系人及电话 *</span>
                  <input 
                    type="text" required value={singleForm.contact}
                    onChange={(e) => setSingleForm({...singleForm, contact: e.target.value})}
                    placeholder="姓名及联系方式" className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">备注说明</span>
                  <input 
                    type="text" value={singleForm.remarks}
                    onChange={(e) => setSingleForm({...singleForm, remarks: e.target.value})}
                    placeholder="可说明是否已经开通商界面孔专属页" className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                确认提交单名律师推荐
              </button>
            </form>
          ) : (
            /* Batch Nominate Form (Section 10.4) */
            <form onSubmit={handleBatchSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">推荐申报律所机构名称 *</span>
                  <input 
                    type="text" required value={batchForm.firmName}
                    onChange={(e) => setBatchForm({...batchForm, firmName: e.target.value})}
                    placeholder="如：方达律师事务所" className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-850"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">推荐官方联系人 *</span>
                  <input 
                    type="text" required value={batchForm.contactName}
                    onChange={(e) => setBatchForm({...batchForm, contactName: e.target.value})}
                    placeholder="如：HR负责人/品牌负责人" className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-850"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">联系电话/微信号 *</span>
                  <input 
                    type="text" required value={batchForm.contactPhone}
                    onChange={(e) => setBatchForm({...batchForm, contactPhone: e.target.value})}
                    placeholder="微信号或电话" className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">参评主攻产业赛道 *</span>
                  <select 
                    value={batchForm.industry}
                    onChange={(e) => setBatchForm({...batchForm, industry: e.target.value})}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 font-semibold"
                  >
                    {INDUSTRIES_DICT.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">申报批次年份</span>
                  <select 
                    value={batchForm.year}
                    onChange={(e) => setBatchForm({...batchForm, year: e.target.value})}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-800 font-semibold"
                  >
                    <option value="2026">2026 年度</option>
                    <option value="2025">2025 年度</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Nominees List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">批量推荐参评合伙人名单</h4>
                  <button
                    type="button" onClick={handleAddNominee}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4.5 h-4.5" /> 添加一位参评律师
                  </button>
                </div>

                <div className="space-y-4" id="batch_nominees_stack">
                  {batchForm.nominees.map((nom, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative">
                      {batchForm.nominees.length > 1 && (
                        <button
                          type="button" onClick={() => handleRemoveNominee(idx)}
                          className="absolute right-4 top-4 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}

                      <div className="text-xs font-bold text-slate-400 font-mono">律师参评信息 0{idx + 1}</div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block mb-1">律师姓名 *</span>
                          <input 
                            type="text" required value={nom.name}
                            onChange={(e) => handleBatchNomineeChange(idx, 'name', e.target.value)}
                            placeholder="如：张三" className="w-full text-xs p-1.5 bg-slate-50 border border-slate-100 rounded-lg"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block mb-1">城市 *</span>
                          <input 
                            type="text" required value={nom.city}
                            onChange={(e) => handleBatchNomineeChange(idx, 'city', e.target.value)}
                            placeholder="如：上海" className="w-full text-xs p-1.5 bg-slate-50 border border-slate-100 rounded-lg"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block mb-1">二级细分产业 *</span>
                          <input 
                            type="text" required value={nom.subCategory}
                            onChange={(e) => handleBatchNomineeChange(idx, 'subCategory', e.target.value)}
                            placeholder="如：创新药 / 医疗器械" className="w-full text-xs p-1.5 bg-slate-50 border border-slate-100 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block mb-1">服务业务专业 *</span>
                          <select
                            value={nom.specialty}
                            onChange={(e) => handleBatchNomineeChange(idx, 'specialty', e.target.value)}
                            className="w-full text-xs p-1.5 bg-slate-50 border border-slate-100 rounded-lg"
                          >
                            {SPECIALTIES_DICT.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                          </select>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-slate-400 block mb-1">参评说明或核心案例概要 *</span>
                          <input 
                            type="text" required value={nom.evaluation}
                            onChange={(e) => handleBatchNomineeChange(idx, 'evaluation', e.target.value)}
                            placeholder="请描述推荐理由" className="w-full text-xs p-1.5 bg-slate-50 border border-slate-100 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">补充附件证明/全案材料链接</span>
                <input 
                  type="text" value={batchForm.remarks}
                  onChange={(e) => setBatchForm({...batchForm, remarks: e.target.value})}
                  placeholder="支持填写百度网盘、腾讯文档或其他云端共享盘链接，并提供密码..." 
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
              >
                确认提交批量申报材料并归档
              </button>
            </form>
          )}
        </div>
      )}

      {/* SECTION B: Catalog Download lead modal */}
      {downloadActive && (
        <div className="bg-slate-950 text-white border border-slate-900 rounded-2xl p-6 md:p-8 space-y-4" id="stars_download_lead_form">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <Download className="w-4.5 h-4.5 text-indigo-400" />
                NewEco Elite 产业之星名录留资下载
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">获取包含各细分领域高成长合伙人、代表案例评语及直连对接指南的完整 PDF/CSV 文件。</p>
            </div>
            <button 
              onClick={() => setDownloadActive(false)}
              className="text-slate-400 hover:text-white font-bold text-xs"
            >
              关闭
            </button>
          </div>

          {downloadCompleted ? (
            <div className="bg-emerald-950/40 border border-emerald-900 text-emerald-300 rounded-xl p-5 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-xs font-extrabold">留资通过，名录文件已送出！</h4>
              <p className="text-[11px] text-slate-400">高清完整版已通过电子邮件或微信专属通道开始推送。请查收您的通信账户。</p>
            </div>
          ) : (
            <form onSubmit={handleDownloadSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" required value={downloadForm.name}
                  onChange={(e) => setDownloadForm({...downloadForm, name: e.target.value})}
                  placeholder="姓名 *" className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100" 
                />
                <input 
                  type="text" required value={downloadForm.contact}
                  onChange={(e) => setDownloadForm({...downloadForm, contact: e.target.value})}
                  placeholder="手机 / 微信 *" className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" value={downloadForm.company}
                  onChange={(e) => setDownloadForm({...downloadForm, company: e.target.value})}
                  placeholder="公司机构" className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100" 
                />
                <input 
                  type="text" value={downloadForm.position}
                  onChange={(e) => setDownloadForm({...downloadForm, position: e.target.value})}
                  placeholder="职位" className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-100" 
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input 
                  type="checkbox" required id="agree_download_cb"
                  checked={downloadForm.agreed}
                  onChange={(e) => setDownloadForm({...downloadForm, agreed: e.target.checked})}
                  className="mt-0.5" 
                />
                <label htmlFor="agree_download_cb" className="text-[10px] text-slate-400 leading-normal">
                  本人同意欧氪律评委会将此留资作为获取 NewEco Elite 名录的合规留档凭证，并接受微信号服务对谈
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition-all"
              >
                立即提取 PDF 完整版名录
              </button>
            </form>
          )}
        </div>
      )}

      {/* SECTION C: Active Category Details Page (Section 6.2) */}
      {selectedCategory ? (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm" id="star_category_detail_view">
          
          {/* Header Banner */}
          <div className="bg-slate-950 text-white p-6 md:p-8 relative overflow-hidden border-b border-slate-900">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            <div className="relative z-10 space-y-4">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> 返回产业之星目录
              </button>

              <div className="space-y-1">
                <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
                  NewEco Elite · 产业之星名录
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  新经济产业之星 · {selectedCategory.name}
                </h2>
                <p className="text-slate-400 text-xs font-mono tracking-widest">{selectedCategory.englishName}</p>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed max-w-2xl font-medium">
                {selectedCategory.desc}
              </p>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-6">
            
            {/* Horizontal Specialty Filter Swiper (Section 6.2) */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">筛选核心业务领域 (Horizontal Swiper)</span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" id="specialty_swiper">
                {SPECIALTIES_DICT.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setActiveSpecialtyFilter(spec)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                      activeSpecialtyFilter === spec
                        ? 'bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-2xs'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Alert of Active Filtered Status */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-bold" id="current_display_prompt">
                当前展示：<strong className="text-indigo-600 font-extrabold">{activeSpecialtyFilter}</strong> · 共 <strong className="text-slate-950">{currentCategoryLawyers.length}</strong> 位入选菁英律师
              </span>
              {selectedCategory.status === 'sample' && (
                <span className="bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 border border-amber-100 rounded">样例展示阶段</span>
              )}
            </div>

            {/* Rendering matching lawyers (Section 6.2) */}
            <div className="space-y-4" id="category_lawyers_list">
              {currentCategoryLawyers.length === 0 ? (
                <div className="text-center py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <Info className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-semibold">该专业板块目前暂无正式入选律师或处于申报评审中。</p>
                  
                  <div className="flex justify-center gap-3 pt-4">
                    <button 
                      onClick={() => setNominateMode('single')}
                      className="bg-indigo-600 text-white font-bold py-1 px-4 rounded text-xs cursor-pointer"
                    >
                      申请入选 / 推荐律师
                    </button>
                  </div>
                </div>
              ) : (
                currentCategoryLawyers.map((lawyer, idx) => (
                  <div 
                    key={lawyer.id} 
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row gap-5 hover:border-slate-300 transition-all shadow-2xs"
                  >
                    {/* Left Column (Section 6.2 - Left Card style) */}
                    <div className="md:w-1/3 space-y-3 shrink-0 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-5">
                      <div className="flex gap-3 items-start">
                        {/* Rank */}
                        <div className="font-mono text-xl font-black text-indigo-400 leading-none">
                          {lawyer.rank}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-extrabold text-slate-950">{lawyer.name}</h4>
                          <p className="text-[11px] text-slate-500 font-bold leading-normal">{lawyer.firm}</p>
                          <span className="inline-flex items-center text-[10px] text-slate-400 font-bold">
                            <MapPin className="w-3 h-3 mr-0.5" /> {lawyer.city}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator badge */}
                      <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-[10px] text-slate-500 leading-relaxed font-medium">
                        <strong>所属产业细分：</strong>
                        <span className="text-slate-950 font-bold">{lawyer.subCategory}</span>
                      </div>
                    </div>

                    {/* Right Column (Section 6.2 - Right Card style with Evaluation & Cases) */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="text-xs text-slate-700 font-medium leading-relaxed">
                          <strong className="text-indigo-950 block mb-1">■ 欧氪律执委会评语 (Evaluation)：</strong>
                          {lawyer.evaluation}
                        </div>

                        {lawyer.caseSummary && (
                          <div className="bg-emerald-50/20 border border-emerald-100/30 rounded-lg p-3 text-[11px] text-slate-600 leading-normal">
                            <strong className="text-emerald-800 block mb-1">■ 代表性法律服务场景及案例摘要：</strong>
                            {lawyer.caseSummary}
                          </div>
                        )}
                      </div>

                      {/* CTA Actions mapping relationship constraints (Section 6.3) */}
                      <div className="pt-2.5 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] text-slate-400 font-semibold font-mono">
                          年份批次: {selectedYear}
                        </span>

                        {lawyer.hasProfileOpened && lawyer.linkedLawyerId ? (
                          /* elite_profile_opened -> show View Profile link + direct Consult (Section 6.3) */
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const matchedLawyer = lawyers.find(l => l.id === lawyer.linkedLawyerId);
                                if (matchedLawyer) onSelectLawyer(matchedLawyer);
                              }}
                              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              查看专属页主页 <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onOpenConsultForm({ type: 'consult', lawyerId: lawyer.linkedLawyerId, lawyerName: lawyer.name })}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-1 px-3 rounded-lg text-[10px] cursor-pointer"
                            >
                              咨询
                            </button>
                          </div>
                        ) : (
                          /* directory_only -> no transition link, display plain static button (Section 6.3) */
                          <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                            仅名录备案展示 (未开通专属咨询通道)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions inside detailed page (Section 6.2) */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4" id="star_detail_actions">
              <button
                onClick={() => setDownloadActive(true)}
                className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> 下载本产业完整名录 PDF
              </button>

              <button
                onClick={() => setNominateMode('single')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" /> 单人推荐申报此奖项
              </button>

              <button
                onClick={() => setNominateMode('batch')}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-sky-500" /> 律所团体批量推荐
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* SECTION D: Main Category Directory (Section 6.1) */
        <div className="space-y-6" id="star_directory_hub">
          
          {/* Header Title & Explainers (Section 6.1) */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase block">NewEco Elite</span>
                <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                  新经济产业之星权威名录
                </h2>
              </div>

              {/* Year Switch (Section 6.1) */}
              <div className="flex bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/50">
                <button
                  onClick={() => setSelectedYear('2026')}
                  className={`px-3 py-1 text-[10px] font-bold rounded ${
                    selectedYear === '2026' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  2026 年度
                </button>
                <button
                  onClick={() => setSelectedYear('2025')}
                  className={`px-3 py-1 text-[10px] font-bold rounded ${
                    selectedYear === '2025' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  2025 年度
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              <strong>评审定位及硬核维度说明：</strong> NewEco Elite 产业之星评选由欧氪律商商研究院联合知名创投机构发起，不以律所创收规模为唯一导向，而是聚焦于【特定产业领域细分】×【特定法律服务硬核场景】×【标杆性可考案例与商业闭环治理】。全面考核律师在新技术大模型、细胞基因重组、海外特许特许经营领域的实操应对力。
            </p>

            <div className="flex flex-wrap gap-4 pt-3 border-t border-slate-50 text-[11px] text-slate-500 font-medium">
              <span>■ 已发布 3 个核心产业</span>
              <span>■ 2 个申报批次进行中</span>
              <span>■ 覆盖超过 150 项二级法商细分项</span>
            </div>
          </div>

          {/* Quick Nominate Trigger Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-4 flex justify-between items-center">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-indigo-950">您是高成长新经济律师？</h4>
                <p className="text-[10px] text-slate-500 font-semibold">立刻自主或受邀推荐参评 NewEco Elite 名录</p>
              </div>
              <button 
                onClick={() => setNominateMode('single')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg cursor-pointer"
              >
                自主申报
              </button>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold">代表律所进行批量推举？</h4>
                <p className="text-[10px] text-slate-400 font-semibold">支持多名合伙人一键批量申报，自动整合材料</p>
              </div>
              <button 
                onClick={() => setNominateMode('batch')}
                className="bg-white text-slate-950 text-[10px] font-bold py-1.5 px-3 rounded-lg cursor-pointer"
              >
                批量推荐
              </button>
            </div>
          </div>

          {/* Industry Category Cards Grid (Section 6.1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="star_categories_grid">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="bg-white border border-slate-100 hover:border-indigo-100 rounded-2xl p-5 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    
                    {/* Status mapping rules in Section 6.1 */}
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                      category.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      category.status === 'sample' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      category.status === 'applying' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {category.status === 'published' ? '已发布' : 
                       category.status === 'sample' ? '样例展示' : 
                       category.status === 'applying' ? '申报评审中' : '即将发布'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-950">{category.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono tracking-widest">{category.englishName}</p>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-normal line-clamp-3 font-semibold">
                    {category.desc}
                  </p>

                  {/* Sub categories bullet indicators (Section 6.1) */}
                  <div className="pt-2 border-t border-slate-50 space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">覆盖二级细分场景示例：</span>
                    <div className="flex flex-wrap gap-1">
                      {category.subCategories.slice(0, 3).map(sub => (
                        <span key={sub} className="text-[9px] font-bold bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded">
                          {sub}
                        </span>
                      ))}
                      {category.subCategories.length > 3 && (
                        <span className="text-[9px] font-bold text-slate-400 px-1">...</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-5 flex justify-between items-center text-[10px] text-slate-400 font-bold font-mono">
                  <span>共收纳 {category.lawyersCount} 位律师</span>
                  
                  {category.status === 'published' || category.status === 'sample' ? (
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      进入详情名录 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setNominateMode('single')}
                      className="text-xs font-bold text-slate-500 hover:underline cursor-pointer"
                    >
                      点击推荐参评 →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
