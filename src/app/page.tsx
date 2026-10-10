"use client";

import { useState, useMemo } from "react";
import errorsData from "@/data/ai_errors.json";
import rulesData from "@/data/rules_advice.json";
import type { AiErrorItem, RuleAdvice } from "@/types/ai_error";

const errors = errorsData as AiErrorItem[];
const rules = rulesData as RuleAdvice[];

const severityInfo = {
  critical: { level: 3, label: "高危幻覺／致命盲點" },
  high: { level: 2, label: "嚴重誤判／繞路" },
  medium: { level: 1, label: "邏輯瑕疵／瑕疵推論" },
};

const lastEntry = errors.reduce((latest, err) => (err.date > latest ? err.date : latest), "");

function SeverityMark({ severity }: { severity: AiErrorItem["severity"] }) {
  const { level, label } = severityInfo[severity];
  return (
    <span className="c-sev" data-level={level} title={label}>
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

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
    <div className="sheet">
      {/* Document Header */}
      <header className="doc-head">
        <div className="doc-name">
          <b>AI ERROR LOG</b>
          <span>AI 翻車與盲點實錄</span>
        </div>
        <div className="doc-meta">
          <div>
            <span className="label">Records</span>
            <strong>{errors.length}</strong>
          </div>
          <div>
            <span className="label">Last entry</span>
            <strong>{lastEntry}</strong>
          </div>
          <div>
            <span className="label">Registry</span>
            <strong>Active</strong>
          </div>
          <div>
            <span className="label">Source</span>
            <strong>
              <a href="https://github.com/stevebobobo/AiErrorLog" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </strong>
          </div>
        </div>
      </header>

      {/* Title */}
      <section className="title">
        <h1>
          AI 不是萬能神，<em>用真實案例警惕 AI 盲點與幻覺。</em>
        </h1>
        <p>
          記錄資深工程師與 AI 對話寫 Code 時，AI 犯下的幻覺杜撰、路徑混淆、過度自信與邏輯漏洞案例。希望能讓迷信 AI 的人保持清醒。
        </p>
      </section>

      {/* 1.0 Summary */}
      <section className="sec">
        <div className="sec-head">
          <span className="sec-no">1.0</span>
          <h2>AI 錯誤診斷與痛點指標統計</h2>
          <span className="label">Summary</span>
        </div>
        <div className="readings">
          <div className="reading">
            <b>
              {errors.length}
              <small>筆</small>
            </b>
            <span>實戰翻車與誤判紀錄</span>
          </div>
          <div className="reading">
            <b>
              5<small>次</small>
            </b>
            <span>路徑／分支搞混重蹈覆轍</span>
          </div>
          <div className="reading">
            <b>
              70+<small>個</small>
            </b>
            <span>全自動文件生成完全杜撰</span>
          </div>
          <div className="reading">
            <b>
              100<small>%</small>
            </b>
            <span>未查權威來源 (Git/Code) 災情</span>
          </div>
        </div>
      </section>

      {/* 2.0 Error Records */}
      <section className="sec">
        <div className="sec-head">
          <span className="sec-no">2.0</span>
          <h2>錯誤案例紀錄</h2>
          <span className="label">
            {filteredCases.length} / {errors.length}
          </span>
        </div>

        <div className="filter">
          <span className="label">Search</span>
          <input
            type="text"
            placeholder="搜尋 AI 錯誤行為、標題、痛點（如：Gitea, Acontis, Build來源, 杜撰）"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter">
          <span className="label">Tag</span>
          <div className="tags">
            <button className={selectedTag === "all" ? "on" : ""} onClick={() => setSelectedTag("all")}>
              全部 ({errors.length})
            </button>
            {allTags.map((tag) => (
              <button key={tag} className={selectedTag === tag ? "on" : ""} onClick={() => setSelectedTag(tag)}>
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="cols label">
          <span>ID</span>
          <span>Date</span>
          <span>Sev</span>
          <span>Title</span>
          <span>Tags</span>
          <span></span>
        </div>

        {filteredCases.length === 0 ? (
          <div className="empty">NO MATCH — 找不到符合條件的錯誤案例，請調整搜尋關鍵字或重設標籤。</div>
        ) : (
          filteredCases.map((item) => (
            <details key={item.id} className="rec">
              <summary>
                <span className="c-id">{item.id}</span>
                <span className="c-date">{item.date}</span>
                <SeverityMark severity={item.severity} />
                <span className="c-title">{item.title}</span>
                <span className="c-tags">
                  {item.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </span>
                <span className="c-toggle" aria-hidden="true"></span>
              </summary>
              <dl className="spec">
                <dt>
                  嚴重度<small>Severity</small>
                </dt>
                <dd>{severityInfo[item.severity].label}</dd>
                <dt>
                  發生場景<small>Scene</small>
                </dt>
                <dd>{item.scene}</dd>
                <dt>
                  AI 錯誤行為<small>Bad Behavior</small>
                </dt>
                <dd className="bad">
                  <ul>
                    {item.bad_behavior.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </dd>
                <dt>
                  正確事實<small>Ground Truth</small>
                </dt>
                <dd>
                  <ul>
                    {item.fact.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </dd>
                <dt>
                  錯誤根因<small>Root Cause</small>
                </dt>
                <dd>
                  <ul>
                    {item.root_cause.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </dd>
                <dt>
                  教學觀點<small>Lesson Learned</small>
                </dt>
                <dd className="lesson">{item.teaching_point}</dd>
              </dl>
            </details>
          ))
        )}

        <div className="legend">
          <span className="label">Severity</span>
          <span>
            <SeverityMark severity="critical" />
            {severityInfo.critical.label}
          </span>
          <span>
            <SeverityMark severity="high" />
            {severityInfo.high.label}
          </span>
          <span>
            <SeverityMark severity="medium" />
            {severityInfo.medium.label}
          </span>
        </div>
      </section>

      {/* 3.0 Rules */}
      <section className="sec">
        <div className="sec-head">
          <span className="sec-no">3.0</span>
          <h2>對 AI 使用者的警惕與避坑指南</h2>
          <span className="label">Rules</span>
        </div>
        <p className="sec-note">
          經過多輪真實除錯總結出的 10 條 AI 使用金律。不要盲信 AI 的「肯定答覆」，工程驗證永遠第一。
        </p>
        <div className="rules">
          {rules.map((rule) => (
            <div key={rule.id} className="rule">
              <span className="r-id">{rule.id}</span>
              <h3>{rule.title}</h3>
              <p>{rule.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="label">AI Error Log</span>
        <span className="label">AI 不是神，盲信要警醒。用真實案例驗證工程真理。</span>
      </footer>
    </div>
  );
}
