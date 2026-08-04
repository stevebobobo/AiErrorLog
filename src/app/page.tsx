"use client";

import { useState, useMemo } from "react";
import errorsData from "@/data/ai_errors.json";
import rulesData from "@/data/rules_advice.json";
import type { AiErrorItem, RuleAdvice } from "@/types/ai_error";

const errors = errorsData as AiErrorItem[];
const rules = rulesData as RuleAdvice[];

const severityLabels = {
  critical: "🚨 高危幻覺/致命盲點",
  high: "⚠️ 嚴重誤判/繞路",
  medium: "⚡ 邏輯瑕疵/瑕疵推論",
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeCase, setActiveCase] = useState<AiErrorItem | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    errors.forEach((err) => err.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filtered Cases
  const filteredCases = useMemo(() => {
    return errors.filter((err) => {
      const matchesTag = selectedTag === "all" || err.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        err.title.toLowerCase().includes(q) ||
        err.scene.toLowerCase().includes(q) ||
        err.teaching_point.toLowerCase().includes(q) ||
        err.bad_behavior.some((b) => b.toLowerCase().includes(q)) ||
        err.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="app-container">
      {/* App Navigation Header */}
      <header className="app-header">
        <div className="brand-logo">
          <div className="brand-icon">⚠️</div>
          <span>
            <span className="brand-title-red">AI 翻車</span>
            <span className="brand-title-slate">與盲點實錄</span>
          </span>
        </div>
        <div className="header-actions">
          <a
            href="https://github.com/stevebobobo/AiErrorLog"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub 倉庫</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="warning-banner">
          <span>🛑 AI 迷信退散 · 用真實工程對話打破神話</span>
        </div>
        <h1 className="hero-title">
          AI 不是萬能神，<br />
          <span className="hero-title-red">用真實案例警惕 AI 盲點與幻覺。</span>
        </h1>
        <p className="hero-subtitle">
          記錄資深工程師與 AI 對話寫 Code 時，AI 犯下的幻覺杜撰、路徑混淆、過度自信與邏輯漏洞案例。希望能讓迷信 AI 的人保持清醒。
        </p>

        {/* Alert Stats Box */}
        <div className="alert-box">
          <div className="alert-header">
            <div className="alert-title">
              <span>📊 AI 錯誤診斷與痛點指標統計</span>
            </div>
            <div className="mono" style={{ fontSize: "0.85rem", color: "#6b7280" }}>
              Case Registry: Active
            </div>
          </div>

          <div className="alert-grid">
            <div className="alert-card">
              <div className="alert-card-val">{errors.length} 筆</div>
              <div className="alert-card-lbl">🔥 實戰翻車與誤判紀錄</div>
            </div>
            <div className="alert-card">
              <div className="alert-card-val">5 次</div>
              <div className="alert-card-lbl">⚠️ 路徑/分支搞混重蹈覆轍</div>
            </div>
            <div className="alert-card">
              <div className="alert-card-val">70+ 個</div>
              <div className="alert-card-lbl">🚨 全自動文件生成完全杜撰</div>
            </div>
            <div className="alert-card">
              <div className="alert-card-val">100%</div>
              <div className="alert-card-lbl">🔍 未查權威來源 (Git/Code) 災情</div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls: Search & Tags */}
      <section className="controls-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="搜尋 AI 錯誤行為、標題、痛點（如：Gitea, Acontis, Build來源, 杜撰）..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${selectedTag === "all" ? "active" : ""}`}
            onClick={() => setSelectedTag("all")}
          >
            全部案例 ({errors.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-tab ${selectedTag === tag ? "active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* Cases Grid */}
      {filteredCases.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "#6b7280" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "8px" }}>🔍 找不到符合條件的錯誤案例</p>
          <p style={{ fontSize: "0.9rem" }}>嘗試調整搜尋關鍵字或重設標籤</p>
        </div>
      ) : (
        <div className="cases-grid">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="case-card"
              onClick={() => setActiveCase(item)}
            >
              <div>
                <div className="card-top">
                  <span className="case-id-badge mono">{item.id}</span>
                  <span className={`severity-pill severity-${item.severity}`}>
                    {severityLabels[item.severity]}
                  </span>
                </div>

                <h3 className="case-title">{item.title}</h3>

                <div className="case-scene">
                  <strong>📍 場景：</strong> {item.scene}
                </div>

                <div className="bad-behavior-box">
                  <strong>❌ AI 錯誤行為：</strong>
                  <ul style={{ paddingLeft: "18px", marginTop: "4px" }}>
                    {item.bad_behavior.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="card-tags">
                  {item.tags.map((t, idx) => (
                    <span key={idx} className="tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <span className="mono" style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                  🗓️ {item.date}
                </span>
                <span className="action-link">查看完整解構 →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Detail Modal */}
      {activeCase && (
        <div className="modal-overlay" onClick={() => setActiveCase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setActiveCase(null)}
              title="關閉"
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span className="case-id-badge mono">{activeCase.id}</span>
              <span className={`severity-pill severity-${activeCase.severity}`}>
                {severityLabels[activeCase.severity]}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                🗓️ {activeCase.date}
              </span>
            </div>

            <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#111827", marginBottom: "12px" }}>
              {activeCase.title}
            </h2>

            <div className="case-scene" style={{ fontSize: "0.95rem" }}>
              <strong>📍 發生場景：</strong> {activeCase.scene}
            </div>

            {/* Bad Behavior */}
            <div className="modal-section-title">❌ AI 錯誤行為與盲點 (Bad Behavior)</div>
            <div className="modal-box-red">
              <ul style={{ paddingLeft: "20px" }}>
                {activeCase.bad_behavior.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Correct Fact */}
            <div className="modal-section-title">🔍 正確事實與工程驗證 (Ground Truth)</div>
            <div className="modal-box-green">
              <ul style={{ paddingLeft: "20px" }}>
                {activeCase.fact.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Root Cause */}
            <div className="modal-section-title">💡 錯誤根因分析 (Root Cause)</div>
            <div className="modal-box-amber">
              <ul style={{ paddingLeft: "20px" }}>
                {activeCase.root_cause.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Teaching Point */}
            <div className="modal-section-title">🎓 教學觀點與警惕 (Lesson Learned)</div>
            <div className="teaching-callout">{activeCase.teaching_point}</div>
          </div>
        </div>
      )}

      {/* Rules Advice Section */}
      <section className="rules-section">
        <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#111827", textAlign: "center", marginBottom: "12px" }}>
          🛑 對 AI 使用者的警惕與避坑指南
        </h2>
        <p style={{ textAlign: "center", color: "#4b5563", maxWidth: "680px", margin: "0 auto 36px", fontSize: "1.05rem" }}>
          經過多輪真實除錯總結出的 10 條 AI 使用金律。不要盲信 AI 的「肯定答覆」，工程驗證永遠第一。
        </p>

        <div className="rules-grid">
          {rules.map((rule) => (
            <div key={rule.id} className="rule-card">
              <div className="rule-num mono">{rule.id}</div>
              <h3 className="rule-title">{rule.title}</h3>
              <p className="rule-desc">{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>AI Error Log · AI 不是神，盲信要警醒。用真實案例驗證工程真理。</p>
      </footer>
    </div>
  );
}
