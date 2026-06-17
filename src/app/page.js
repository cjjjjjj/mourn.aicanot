"use client";

import { useState, useEffect } from "react";

// Platform categories list
const DOMESTIC_PLATFORMS = [
  "微信公众号",
  "微博",
  "抖音",
  "小红书",
  "Bilibili",
  "知乎",
  "豆瓣",
];

const INTERNATIONAL_PLATFORMS = [
  "Facebook",
  "Instagram",
  "Threads",
  "X (Twitter)",
  "YouTube",
  "TikTok",
  "Reddit",
  "GitHub",
];

const ALL_PLATFORMS = [...DOMESTIC_PLATFORMS, ...INTERNATIONAL_PLATFORMS, "其他"];

// Custom SVG Icons for Platforms
function PlatformIcon({ platform, className = "" }) {
  const p = platform ? platform.toLowerCase() : "";

  // WeChat
  if (p.includes("微信") || p.includes("wechat")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M8.22 2c-4.14 0-7.5 3-7.5 6.7 0 2.27 1.25 4.3 3.2 5.56l-.8 2.37 2.65-1.33c.77.22 1.6.35 2.45.35.5 0 .97-.04 1.44-.12-1.07-2.12-1.07-4.7 0-6.82C10.58 5.75 13.52 4 16.7 4c.48 0 .96.04 1.43.13C16.8 2.84 12.72 2 8.22 2zm-2.82 4c.64 0 1.17.48 1.17 1.07S6.04 8.13 5.4 8.13c-.65 0-1.18-.48-1.18-1.06C4.22 6.48 4.75 6 5.4 6zm5.88 0c.65 0 1.18.48 1.18 1.07s-.53 1.06-1.18 1.06c-.64 0-1.17-.48-1.17-1.06C11.1 6.48 11.64 6 12.28 6zM16.7 5.17c-3.5 0-6.32 2.52-6.32 5.63s2.83 5.62 6.32 5.62c.73 0 1.42-.1 2.07-.3l2.25 1.13-.67-2c1.65-1.07 2.7-2.77 2.7-4.66.02-3.1-2.82-5.62-6.35-5.62zm-2.48 3.37c.5 0 .92.42.92.94s-.4.94-.92.94c-.52 0-.94-.42-.94-.94s.42-.94.94-.94zm5.02 0c.52 0 .94.42.94.94s-.4.94-.94.94c-.5 0-.92-.42-.92-.94s.42-.94.92-.94z"/>
      </svg>
    );
  }
  // Weibo
  if (p.includes("微博") || p.includes("weibo")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M9.95 18.06c-3.93.12-7.25-1.57-7.4-3.77-.15-2.2 2.87-4.06 6.8-4.18 3.93-.12 7.25 1.57 7.4 3.77.15 2.2-2.87 4.07-6.8 4.18zm8.68-7.79c-.64-.53-1.6-.48-2.23.1-.4.36-.5.92-.3 1.4.35.85.12 1.83-.55 2.45-.82.76-2.14.77-2.98.02-.45-.4-.63-.98-.56-1.57.12-.96-.4-1.93-1.25-2.3-1-.44-2.17-.18-2.9.6l-1 1.07c-.45.47-.5 1.18-.17 1.7.5.8 1.48 1.15 2.37.85l1.9-.62c.45-.15.93.04 1.17.43.34.56.2 1.3-.3 1.7l-1.9 1.5c-1 .8-2.43.95-3.57.36l-1-.53a1.45 1.45 0 0 1-.72-1.46c.1-1.12.87-2.07 1.95-2.43l3.52-1.14a3.17 3.17 0 0 0 1.86-1.5c.5-1.02.26-2.26-.57-3.03-.7-.65-1.78-.7-2.58-.1l-1.47 1.1A1.1 1.1 0 0 0 9 6.86a2.76 2.76 0 0 1-.84-2c0-1 .58-1.93 1.5-2.36a3.5 3.5 0 0 1 3.54.43c1.78 1.44 2.13 3.9 1 5.5l1.62-.97a1.68 1.68 0 0 1 2.38.5c.46.77.27 1.77-.4 2.3zm2.5-2.73c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0z"/>
      </svg>
    );
  }
  // Bilibili
  if (p.includes("bilibili") || p.includes("b站")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M17.97 3.01l1.7 1.7c.4.4.4 1 0 1.4l-.87.87c.75.7 1.2 1.72 1.2 2.82v8c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4v-8c0-1.1.45-2.12 1.2-2.82l-.87-.87a1.004 1.004 0 0 1 0-1.42l1.7-1.7a1.004 1.004 0 0 1 1.42 0l2.36 2.36c.7-.22 1.43-.33 2.19-.33s1.5.11 2.2.33l2.35-2.36a1.004 1.004 0 0 1 1.42 0zM12 9.8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-3 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
      </svg>
    );
  }
  // Zhihu
  if (p.includes("知乎") || p.includes("zhihu")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M5.36 3.19h2.95v1.23H5.36V3.19zm8.56.2c.4-.2.83-.39 1.29-.55l.62 1.15a9.38 9.38 0 0 1-2.07.72l-.37-1.2l.53-.12zm-8.56 3.25h4.18V8.1H5.36V6.64zm0 2.92h5.12c-.25.86-.71 1.78-1.4 2.7a22.2 22.2 0 0 1-2.95-3.26L5 9.8c1.32 1.62 3.16 3.29 5.23 4.7l.95-.98c.55-.7 1.02-1.47 1.36-2.27H3v-1.47h6.63V8.1H3.6V6.64h6.03V4.42H3.6V2.95h7.24v2.7h1.66c-.34 1-.86 1.93-1.5 2.77c.7 1.07 1.6 2.02 2.67 2.85l-.95 1a18.25 18.25 0 0 1-3.1-3.23c-.95 1.17-2.12 2.18-3.47 3.01l-.8-.86c1.35-.8 2.52-1.8 3.47-2.92H5.36V9.56zm12.3-5.22c.3.92.52 1.96.61 3.07h2.89v1.44h-2.83c-.09 1.6-.28 3.25-.52 4.97c1.38.3 2.6.83 3.62 1.5l-.83 1.2a13.3 13.3 0 0 0-3.34-1.44v3.53h-1.63v-3.77c-.95.77-2.1 1.4-3.34 1.87l-.62-1.29c1.47-.46 2.76-1.16 3.96-2.1v-4.5h-3.1V7.4h3.1V5.5c0-.98-.12-1.9-.3-2.79l1.47-.37zm-1.47 4.54V12c.16-1.2.3-2.43.34-3.66h-.34zm.37 5.1a15.82 15.82 0 0 1-2.27 1.9l-.74-1a12.8 12.8 0 0 0 2.27-1.78l.74.89z"/>
      </svg>
    );
  }
  // Douban
  if (p.includes("豆瓣") || p.includes("douban")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M19.98 2.01v1.98H4.02V2.01h15.96zM17.48 7v6.98c0 1.25-.66 1.83-2 1.83H12.6c1.1 1 2.2 2 3.3 3.01l-1.37 1.37c-1.3-1.3-2.6-2.6-3.9-3.9-1.3 1.3-2.6 2.6-3.9 3.9l-1.37-1.37c1.1-1.01 2.2-2.01 3.3-3.01H6.18c-1.34 0-2-.58-2-1.83V7h13.3zm-1.98 2.01H8.5v3h7v-3zM21 20.01v2.01H3v-2.01h18z"/>
      </svg>
    );
  }
  // Facebook
  if (p.includes("facebook") || p.includes("fb")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
      </svg>
    );
  }
  // Instagram
  if (p.includes("instagram") || p.includes("ig")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    );
  }
  // X / Twitter
  if (p.includes("x (") || p.includes("twitter") || p.includes("x")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  // GitHub
  if (p.includes("github")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    );
  }
  // YouTube
  if (p.includes("youtube")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  // Reddit
  if (p.includes("reddit")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.23-1.72l1.32-4.13 4.3 1c.07.94.87 1.66 1.83 1.66 1.02 0 1.85-.83 1.85-1.85s-.83-1.85-1.85-1.85c-.88 0-1.62.62-1.8 1.45l-4.78-1.12a.502.502 0 0 0-.58.33L10.74 8C8.33 8.08 6.1 8.71 4.44 9.72c-.56-.73-1.44-1.22-2.44-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.6-.06.29-.1.59-.1.9 0 3.86 4.7 7 10.5 7s10.5-3.14 10.5-7c0-.31-.04-.61-.1-.9c.93-.5 1.56-1.48 1.56-2.6zM6 12.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm12 4.5c-1.82 1.82-5.27 1.82-7.09 0a.501.501 0 0 1 .71-.71c1.42 1.42 4.25 1.42 5.67 0a.502.502 0 0 1 .71.71zm-2-2.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      </svg>
    );
  }

  // Default: Generic Tombstone Icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14M12 4v16M9 9h6M8 20V8a4 4 0 0 1 8 0v12" />
    </svg>
  );
}

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("所有平台");

  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    platform: "微信公众号",
    customPlatform: "",
    name: "",
    account_id: "",
    death_date: "",
    epitaph: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success iOS Toast State
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Detail Modal State
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgFormData, setMsgFormData] = useState({ author: "", content: "" });
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Load accounts on filter or search changes
  useEffect(() => {
    fetchAccounts();
  }, [search, selectedFilter]);

  async function fetchAccounts() {
    setLoading(true);
    try {
      let url = `/api/accounts?search=${encodeURIComponent(search)}`;
      if (selectedFilter !== "所有平台") {
        url += `&platform=${encodeURIComponent(selectedFilter)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAccounts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    } finally {
      setLoading(false);
    }
  }

  // Open specific account details
  async function handleOpenDetail(account) {
    setSelectedAccount(account);
    // Fetch messages
    try {
      const res = await fetch(`/api/accounts/${account.id}/messages`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }

  // Close account details
  function handleCloseDetail() {
    setSelectedAccount(null);
    setMessages([]);
    setMsgFormData({ author: "", content: "" });
  }

  // Light a candle (Interact)
  async function handleLightCandle(e) {
    e.stopPropagation();
    if (!selectedAccount) return;

    try {
      const res = await fetch(`/api/accounts/${selectedAccount.id}/candle`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        // Update local state for both detail view and grid list
        const updatedAcc = data.data;
        setSelectedAccount(updatedAcc);
        setAccounts(prev => prev.map(acc => acc.id === updatedAcc.id ? updatedAcc : acc));
      }
    } catch (error) {
      console.error("Failed to light candle:", error);
    }
  }

  // Post a message/condolence
  async function handlePostMessage(e) {
    e.preventDefault();
    if (!selectedAccount || !msgFormData.content.trim()) return;

    setIsSendingMessage(true);
    try {
      const res = await fetch(`/api/accounts/${selectedAccount.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgFormData),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [data.data, ...prev]);
        setMsgFormData(prev => ({ ...prev, content: "" }));
      }
    } catch (error) {
      console.error("Failed to submit condolence message:", error);
    } finally {
      setIsSendingMessage(false);
    }
  }

  // Form input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Submit new account registration
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const { platform, customPlatform, name, account_id, death_date, epitaph } = formData;

    if (!name.trim() || !account_id.trim()) {
      alert("死者名称和死者 ID 均为必填项。");
      return;
    }

    const finalPlatform = platform === "其他" ? (customPlatform.trim() || "自定义平台") : platform;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: finalPlatform,
          name,
          account_id,
          death_date: death_date || undefined,
          epitaph,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddOpen(false);
        setFormData({
          platform: "微信公众号",
          customPlatform: "",
          name: "",
          account_id: "",
          death_date: "",
          epitaph: "",
        });
        // Open Success Alert
        setIsSuccessOpen(true);
        fetchAccounts();
      } else {
        alert(data.message || "登记失败，请重试。");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("网络错误，登记失败。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="dove-wrapper">🕊️</div>
        <h1 className="title">主流社区账号悼念展示平台</h1>
        <p className="subtitle">他们没有违反社群守则，他们只是运气不好。</p>
      </header>

      {/* Search & Action Bar */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="搜寻死者名称或 ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg className="search-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <button className="btn-red" onClick={() => setIsAddOpen(true)}>
          📝 登记死亡
        </button>
      </div>

      {/* Platform Filter Tabs */}
      <div className="filter-container">
        {["所有平台", ...ALL_PLATFORMS].map(pf => (
          <button
            key={pf}
            className={`filter-tab ${selectedFilter === pf ? "active" : ""}`}
            onClick={() => setSelectedFilter(pf)}
          >
            {pf}
          </button>
        ))}
      </div>

      {/* Grid of Tombstones */}
      {loading && accounts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
          正在瞻仰纪念中...
        </div>
      ) : accounts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🕯️</div>
          <div className="empty-state-text">
            没有找到相匹配的受难账号。您可以点击上方按钮为他们登记。
          </div>
        </div>
      ) : (
        <main className="grid">
          {accounts.map(acc => (
            <div key={acc.id} className="tombstone-wrapper" onClick={() => handleOpenDetail(acc)}>
              <div className="tombstone-card">
                <div className="tombstone-platform-icon">
                  <PlatformIcon platform={acc.platform} />
                </div>
                <h3 className="tombstone-name">{acc.name}</h3>
                <span className="tombstone-id">{acc.account_id}</span>
                <span className="tombstone-date">
                  {acc.death_date ? acc.death_date : "日期不详"}
                </span>
              </div>
              <div className="tombstone-base"></div>
            </div>
          ))}
        </main>
      )}

      {/* "通报罹难者" Add Account Modal */}
      {isAddOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setIsAddOpen(false)}>✕</button>
            <div className="form-header">
              <h2 className="form-title">通报罹难者</h2>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-body">
                {/* Custom Styled Platform Selection */}
                <div className="form-group">
                  <label className="form-label">受难平台 <span>*</span></label>
                  <div className="platform-options">
                    {ALL_PLATFORMS.map(p => (
                      <div
                        key={p}
                        className={`platform-option ${formData.platform === p ? "selected" : ""}`}
                        onClick={() => setFormData(prev => ({ ...prev, platform: p }))}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {formData.platform === "其他" && (
                  <div className="form-group" style={{ animation: "fadeIn 0.25s ease" }}>
                    <label className="form-label">自定义平台名称 <span>*</span></label>
                    <input
                      type="text"
                      name="customPlatform"
                      className="form-control"
                      placeholder="请输入社交平台名称"
                      required
                      value={formData.customPlatform}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">死者名称 <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="例如：fifi"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">死者 ID <span>*</span></label>
                  <input
                    type="text"
                    name="account_id"
                    className="form-control"
                    placeholder="例如：fifiya_1219"
                    required
                    value={formData.account_id}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">死亡时间 (年-月-日)</label>
                  <input
                    type="date"
                    name="death_date"
                    className="form-control"
                    value={formData.death_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">墓志铭 / 遗言 / 简述</label>
                  <textarea
                    name="epitaph"
                    className="form-control"
                    placeholder="留下他/她的墓志铭或账号简述..."
                    value={formData.epitaph}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddOpen(false)}>
                  取消
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "正在安葬..." : "安葬完成"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success iOS Alert Toast */}
      {isSuccessOpen && (
        <div className="success-toast-overlay" onClick={() => setIsSuccessOpen(false)}>
          <div className="success-toast" onClick={e => e.stopPropagation()}>
            <div className="success-toast-body">
              <div className="success-toast-domain">mourn.aicanot.com</div>
              <div style={{ fontSize: "2rem", margin: "0.5rem 0" }}>✅</div>
              <div className="success-toast-msg">资料已送出，安葬完成！</div>
            </div>
            <button className="success-toast-btn" onClick={() => setIsSuccessOpen(false)}>
              确定
            </button>
          </div>
        </div>
      )}

      {/* Detailed Modal & Interactions */}
      {selectedAccount && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content detail-modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseDetail}>✕</button>
            <div className="detail-layout">
              {/* Left Side: 3D Tombstone & Candle */}
              <div className="detail-tombstone-panel">
                <div className="tombstone-card" style={{ width: "210px", height: "250px", padding: "2.5rem 1rem 1rem 1rem", borderBottomWidth: "5px", cursor: "default" }}>
                  <div className="tombstone-platform-icon" style={{ marginBottom: "1rem" }}>
                    <PlatformIcon platform={selectedAccount.platform} />
                  </div>
                  <h3 className="tombstone-name" style={{ fontSize: "0.95rem" }}>{selectedAccount.name}</h3>
                  <span className="tombstone-id" style={{ fontSize: "0.65rem", marginBottom: "1.5rem" }}>{selectedAccount.account_id}</span>
                  <span className="tombstone-date" style={{ fontSize: "0.7rem", width: "90%" }}>
                    {selectedAccount.death_date ? selectedAccount.death_date : "日期不详"}
                  </span>
                </div>
                <div className="tombstone-base" style={{ width: "226px", height: "16px", marginTop: "-4px" }}></div>
                
                {/* Candle Lighting Component */}
                <div className="candle-section">
                  <div className="candle-container">
                    <div className="candle-light-glow"></div>
                    <div className="candle-flame-wrapper">
                      <div className="candle-flame"></div>
                    </div>
                    <div className="candle-wick"></div>
                    <div className="candle-wax"></div>
                  </div>
                  <button className="candle-btn" onClick={handleLightCandle}>
                    🔥 点亮一盏灯 ({selectedAccount.candles || 0})
                  </button>
                </div>
              </div>

              {/* Right Side: Message Wall */}
              <div className="detail-interaction-panel">
                <h2 className="form-title" style={{ marginBottom: "0.5rem" }}>{selectedAccount.name} 悼念堂</h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                  {selectedAccount.epitaph || "“这个账号什么也没有留下。”"}
                </p>

                <h3 className="message-wall-title">网友寄语</h3>

                {/* Form to leave a message */}
                <form onSubmit={handlePostMessage} className="message-input-form">
                  <div className="message-input-meta">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="您的昵称 (选填)"
                      value={msgFormData.author}
                      onChange={e => setMsgFormData(prev => ({ ...prev, author: e.target.value }))}
                    />
                  </div>
                  <textarea
                    className="form-control"
                    placeholder="写下对被封号逝去者的悼词或想法..."
                    required
                    value={msgFormData.content}
                    onChange={e => setMsgFormData(prev => ({ ...prev, content: e.target.value }))}
                  />
                  <button type="submit" className="btn-primary" style={{ alignSelf: "flex-end", padding: "0.45rem 1rem", fontSize: "0.8rem" }} disabled={isSendingMessage}>
                    {isSendingMessage ? "送出中..." : "送出寄语"}
                  </button>
                </form>

                {/* Messages List */}
                <div className="message-list">
                  {messages.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      目前还没有网友留言，写下第一条留言寄托哀思吧。
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className="message-item">
                        <div className="message-item-header">
                          <span className="message-author">✍️ {msg.author}</span>
                          <span className="message-time">
                            {new Date(msg.created_at).toLocaleString('zh-CN', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="message-content">{msg.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
