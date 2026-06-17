"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlatformIcon } from "@/app/page";

const ALL_PLATFORMS = [
  "微信公众号",
  "微博",
  "抖音",
  "小红书",
  "Bilibili",
  "知乎",
  "豆瓣",
  "Facebook",
  "Instagram",
  "Threads",
  "X (Twitter)",
  "YouTube",
  "TikTok",
  "Reddit",
  "GitHub",
  "其他",
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Login Form State
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Edit Modal State
  const [editingAccount, setEditingAccount] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    platform: "",
    name: "",
    account_id: "",
    death_date: "",
    epitaph: "",
  });
  const [saving, setSaving] = useState(false);

  // Check login status on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const res = await fetch("/api/admin/accounts");
      if (res.status === 200) {
        setIsLoggedIn(true);
        fetchAccounts();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
    } finally {
      setCheckingAuth(false);
    }
  }

  async function fetchAccounts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/accounts");
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

  // Handle Login Submit
  async function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        fetchAccounts();
      } else {
        setLoginError(data.message || "登录失败，请检查用户名与密码。");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setLoginError("网络连接失败，请稍后重试。");
    } finally {
      setLoggingIn(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      setIsLoggedIn(false);
      setAccounts([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Open Edit Modal
  function handleOpenEdit(account) {
    setEditingAccount(account);
    setEditFormData({
      id: account.id,
      platform: account.platform,
      name: account.name,
      account_id: account.account_id,
      death_date: account.death_date || "",
      epitaph: account.epitaph || "",
    });
  }

  // Handle Edit Input Change
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  }

  // Handle Edit Submit
  async function handleEditSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const data = await res.json();
      if (data.success) {
        setEditingAccount(null);
        fetchAccounts();
      } else {
        alert(data.message || "保存失败，请重试。");
      }
    } catch (error) {
      console.error("Failed to update account:", error);
      alert("网络错误，更新失败。");
    } finally {
      setSaving(false);
    }
  }

  // Handle Delete Account
  async function handleDelete(accountId, name) {
    if (!confirm(`确定要彻底删除账号 "${name}" 吗？此操作无法撤销。`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/accounts?id=${accountId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchAccounts();
      } else {
        alert(data.message || "删除失败。");
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("网络错误，删除失败。");
    }
  }

  if (checkingAuth) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "var(--text-secondary)" }}>
        正在载入管理后台...
      </div>
    );
  }

  // Render Login Screen if not authenticated
  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "1.5rem" }}>
        <div className="modal-content" style={{ maxWidth: "420px", width: "100%", cursor: "default", animation: "fadeIn 0.5s ease" }}>
          <div className="form-header" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🕯️</div>
            <h2 className="form-title">管理后台登录</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              输入凭证以管理纪念碑账号信息
            </p>
          </div>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-body">
              <div className="form-group">
                <label className="form-label">用户名</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="请输入用户名"
                  value={loginData.username}
                  onChange={e => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">密码</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="请输入复杂密码"
                  value={loginData.password}
                  onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              {loginError && (
                <div style={{ color: "#ff6b6b", fontSize: "0.85rem", marginTop: "0.5rem", textAlign: "center" }}>
                  ⚠️ {loginError}
                </div>
              )}
            </div>

            <div className="form-footer" style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
              <Link href="/" className="btn-secondary" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
                返回首页
              </Link>
              <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={loggingIn}>
                {loggingIn ? "正在验证..." : "登入后台"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="container" style={{ animation: "fadeIn 0.8s ease-out" }}>
      {/* Header */}
      <header className="header" style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", textAlign: "left" }}>
        <div>
          <h1 className="title" style={{ fontSize: "1.8rem", margin: 0 }}>后台管理控制台</h1>
          <p className="subtitle" style={{ letterSpacing: "0.05em", marginTop: "0.25rem" }}>
            管理已登记的逝去账号、审查寄语留言
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/" className="filter-tab" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
            🏠 返回首页
          </Link>
          <button className="filter-tab active" onClick={handleLogout} style={{ border: "1px solid rgba(255, 107, 107, 0.3)", background: "rgba(201, 42, 42, 0.15)", color: "#ff8787" }}>
            🔑 退出登录
          </button>
        </div>
      </header>

      {/* Main Admin Panel Container */}
      <div className="admin-panel-card" style={{ background: "var(--panel-bg)", border: "1px solid var(--panel-border)", borderRadius: "12px", padding: "1.5rem", overflowX: "auto" }}>
        
        {loading && accounts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
            正在载入受难名单...
          </div>
        ) : accounts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
            目前没有任何登记的数据。
          </div>
        ) : (
          <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse", color: "var(--text-primary)", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", textAlign: "left" }}>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500" }}>受难平台</th>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500" }}>逝者名称</th>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500" }}>账号 ID</th>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500" }}>受难时间</th>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500" }}>墓志铭 / 简介</th>
                <th style={{ padding: "0.75rem 1rem", color: "var(--text-secondary)", fontWeight: "500", textAlign: "right" }}>操作选项</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(acc => (
                <tr key={acc.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }} className="admin-row-hover">
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "var(--text-secondary)", display: "inline-flex", width: "16px", height: "16px" }}>
                        <PlatformIcon platform={acc.platform} />
                      </span>
                      <span>{acc.platform}</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: "600" }}>{acc.name}</td>
                  <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "var(--text-secondary)" }}>{acc.account_id}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>{acc.death_date || "未知"}</td>
                  <td style={{ padding: "0.75rem 1rem", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-secondary)" }}>
                    {acc.epitaph || <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>无</span>}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                      <button className="filter-tab" onClick={() => handleOpenEdit(acc)} style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem" }}>
                        ✏️ 编辑
                      </button>
                      <button className="filter-tab" onClick={() => handleDelete(acc.id, acc.name)} style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", border: "1px solid rgba(255, 107, 107, 0.2)", color: "#ff8787" }}>
                        🗑️ 删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal Dialog */}
      {editingAccount && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "520px", width: "100%" }}>
            <button className="modal-close" onClick={() => setEditingAccount(null)}>✕</button>
            <div className="form-header">
              <h2 className="form-title">编辑罹难账号资料</h2>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="form-body">
                {/* Platform select dropdown */}
                <div className="form-group">
                  <label className="form-label">所属平台 <span>*</span></label>
                  <select
                    name="platform"
                    className="form-control"
                    style={{ background: "#1a1a24", color: "#fff", cursor: "pointer" }}
                    value={editFormData.platform}
                    onChange={handleEditChange}
                    required
                  >
                    {ALL_PLATFORMS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">死者名称 <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">死者 ID <span>*</span></label>
                  <input
                    type="text"
                    name="account_id"
                    required
                    className="form-control"
                    value={editFormData.account_id}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">死亡时间 (年-月-日)</label>
                  <input
                    type="date"
                    name="death_date"
                    className="form-control"
                    value={editFormData.death_date}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">墓志铭 / 遗言 / 简述</label>
                  <textarea
                    name="epitaph"
                    rows="3"
                    className="form-control"
                    value={editFormData.epitaph}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div className="form-footer">
                <button type="button" className="btn-secondary" onClick={() => setEditingAccount(null)}>
                  取消
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "正在保存..." : "确认保存"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
