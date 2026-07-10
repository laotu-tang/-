/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Bot, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { Lawyer } from '../types';

interface AIResultViewProps {
  userPrompt: string;
  lawyers: Lawyer[];
  onSelectLawyer: (lawyer: Lawyer) => void;
  onOpenConsultForm: (options: { type: string; lawyerId?: string; lawyerName?: string }) => void;
}

export default function AIResultView({
  userPrompt,
  lawyers,
  onSelectLawyer,
  onOpenConsultForm
}: AIResultViewProps) {
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [recommendedLawyers, setRecommendedLawyers] = useState<Lawyer[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (userPrompt) {
      fetchAiMatching();
    }
  }, [userPrompt]);

  const fetchAiMatching = async () => {
    setLoading(true);
    setErrorMsg('');
    setAiResponse('');
    
    try {
      // 1. Send the prompt to our proxy server-side Gemini route
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: `【欧氪律法商智能匹配】
用户当前的法律合规痛点需求为：
"${userPrompt}"

请针对其需求撰写一份专业的分析诊断，包含：
1. 核心法律合规难点与红线风险分析 (2-3个重点)
2. 推荐采取的初步商业战略与风控制度搭建方向
3. 需要匹配的专业法律服务方向 (例如：投融资与资本市场、数据合规、人遗条例等)

要求：请使用客观、专业、有深度但易懂的法商语调。请分成几个明显的段落，并使用 markdown 加粗格式。不要包含多余废话。请用中文回答。`
        })
      });

      if (!response.ok) {
        throw new Error('API 匹配请求失败');
      }

      const data = await response.json();
      
      if (data && data.text) {
        setAiResponse(data.text);
      } else {
        setAiResponse('### AI 匹配分析报告已完成\n\n根据您的描述，面临的主要法律风险涉及核心知识产权保护及跨国/跨机构合规审批。平台已为您整理了相应专家。');
      }

      // 2. Intelligent client-side search to recommend candidates based on prompt keywords
      const matched: Lawyer[] = [];
      const promptLower = userPrompt.toLowerCase();
      
      // Keyword matching matching rules
      lawyers.forEach(l => {
        let score = 0;
        l.industries.forEach(ind => {
          if (promptLower.includes(ind.toLowerCase()) || promptLower.includes(ind.substring(0, 2).toLowerCase())) score += 3;
        });
        l.specialties.forEach(sp => {
          if (promptLower.includes(sp.toLowerCase()) || promptLower.includes(sp.substring(0, 3).toLowerCase())) score += 2;
        });
        if (promptLower.includes(l.name.toLowerCase())) score += 5;
        if (promptLower.includes(l.firm.toLowerCase())) score += 2;

        if (score > 0) {
          matched.push(l);
        }
      });

      // If nothing matches specifically, recommend recommended lawyers
      if (matched.length === 0) {
        setRecommendedLawyers(lawyers.slice(0, 2));
      } else {
        setRecommendedLawyers(matched.slice(0, 2));
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg('匹配过程中遇到技术摩擦。我们已经为您降级启动基础匹配库：');
      setAiResponse(`### 法商合规分析 (基础库启动)

针对您的法律咨询，我们已启动核心法律条款映射。此场景主要涉及国家网信及相关监管部门的备案监管。请根据以下推荐列表约见合伙人进行方案共创。`);
      setRecommendedLawyers(lawyers.slice(0, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12" id="ai_match_results_view">
      
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          AI 智能法商评估报告 (AI Match Result)
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">
          基于您提交的需求，欧氪律 AI 大模型引擎正在实时映射相关法典备案要求，并为您甄选最适合的行业专家
        </p>
      </div>

      {/* User Input Prompt Echo */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">您的核心需求输入：</span>
        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
          “ {userPrompt} ”
        </p>
      </div>

      {/* AI Report Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2 pb-3 border-b border-slate-50">
          <Bot className="w-4.5 h-4.5 text-indigo-600" />
          欧氪律大模型专属诊疗见解 (AI Analysis)
        </h3>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3" id="ai_loading_indicator">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs text-slate-400 font-bold animate-pulse">正在深度分析多维语料确权、数据出境、人遗条例等法律红线，并挑选最匹配的红圈专家...</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
            {errorMsg && (
              <div className="bg-amber-50 text-amber-800 p-3 rounded-lg flex items-center gap-2 text-xs border border-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{errorMsg}</span>
              </div>
            )}
            
            {/* Split response text rendering cleanly */}
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/30 prose prose-slate text-xs leading-relaxed space-y-2">
              {aiResponse}
            </div>
          </div>
        )}
      </div>

      {/* Recommended Match Lists */}
      {!loading && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-600" />
            为您精选匹配以下 {recommendedLawyers.length} 位合伙人专家
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="matched_lawyers_list">
            {recommendedLawyers.map((lawyer) => (
              <div 
                key={lawyer.id}
                className="bg-white border-2 border-indigo-100/50 hover:border-indigo-500 rounded-xl p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex gap-3 items-start mb-3">
                    <img src={lawyer.avatar} alt={lawyer.name} className="w-11 h-11 object-cover rounded-xl border border-slate-100 shrink-0" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-950 flex items-center gap-1">
                        {lawyer.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold">{lawyer.firm} · {lawyer.position}</p>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">执业城市: {lawyer.city}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 italic mb-3 font-semibold">
                    “ {lawyer.quote} ”
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {lawyer.industries.map(ind => (
                      <span key={ind} className="bg-slate-50 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {ind}
                      </span>
                    ))}
                    {lawyer.specialties.map(sp => (
                      <span key={sp} className="bg-indigo-50/50 text-indigo-950 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                  <button 
                    onClick={() => onSelectLawyer(lawyer)}
                    className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-0.5 cursor-pointer"
                  >
                    查看专属页主页 <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenConsultForm({ type: 'consult', lawyerId: lawyer.id, lawyerName: lawyer.name })}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-1 px-3 rounded-lg text-[10px] cursor-pointer"
                  >
                    立即沟通
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fallback button to launch generic manual support consult */}
          <div className="bg-slate-950 text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <h4 className="text-xs font-bold">没有完全解决您的匹配诉求？</h4>
              <p className="text-[10px] text-slate-400 font-semibold">我们提供新经济专属人工法商对接，专家级顾问帮您人工定位律师。</p>
            </div>
            <button
              onClick={() => onOpenConsultForm({ type: 'consult' })}
              className="bg-white text-slate-950 hover:bg-slate-100 font-bold py-1.5 px-4 rounded-lg text-xs cursor-pointer shrink-0"
            >
              提交人工对接需求
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
