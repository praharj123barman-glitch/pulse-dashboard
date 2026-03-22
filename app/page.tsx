'use client'

import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ScatterChart, Scatter
} from 'recharts'

// ─── DATA ───────────────────────────────────────────────
const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'Feb', revenue: 38000, expenses: 25000, profit: 13000 },
  { month: 'Mar', revenue: 55000, expenses: 31000, profit: 24000 },
  { month: 'Apr', revenue: 47000, expenses: 29000, profit: 18000 },
  { month: 'May', revenue: 63000, expenses: 35000, profit: 28000 },
  { month: 'Jun', revenue: 58000, expenses: 33000, profit: 25000 },
  { month: 'Jul', revenue: 72000, expenses: 38000, profit: 34000 },
  { month: 'Aug', revenue: 68000, expenses: 36000, profit: 32000 },
  { month: 'Sep', revenue: 85000, expenses: 42000, profit: 43000 },
  { month: 'Oct', revenue: 79000, expenses: 40000, profit: 39000 },
  { month: 'Nov', revenue: 94000, expenses: 48000, profit: 46000 },
  { month: 'Dec', revenue: 108000, expenses: 52000, profit: 56000 },
]

const trafficData = [
  { day: 'Mon', visitors: 2400, pageviews: 4800 },
  { day: 'Tue', visitors: 1398, pageviews: 2900 },
  { day: 'Wed', visitors: 9800, pageviews: 15000 },
  { day: 'Thu', visitors: 3908, pageviews: 7200 },
  { day: 'Fri', visitors: 4800, pageviews: 9600 },
  { day: 'Sat', visitors: 3800, pageviews: 7000 },
  { day: 'Sun', visitors: 4300, pageviews: 8100 },
]

const channelData = [
  { name: 'Organic', value: 38, color: '#3b82f6' },
  { name: 'Paid', value: 24, color: '#8b5cf6' },
  { name: 'Social', value: 18, color: '#06b6d4' },
  { name: 'Referral', value: 12, color: '#10b981' },
  { name: 'Direct', value: 8, color: '#f59e0b' },
]

const conversionData = [
  { month: 'Jul', rate: 2.4 },
  { month: 'Aug', rate: 2.8 },
  { month: 'Sep', rate: 3.1 },
  { month: 'Oct', rate: 2.9 },
  { month: 'Nov', rate: 3.6 },
  { month: 'Dec', rate: 4.2 },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Pro Plan', amount: '$299', status: 'Completed', date: 'Dec 20' },
  { id: '#ORD-002', customer: 'Marcus Chen', product: 'Enterprise', amount: '$999', status: 'Processing', date: 'Dec 20' },
  { id: '#ORD-003', customer: 'Priya Patel', product: 'Starter', amount: '$49', status: 'Completed', date: 'Dec 19' },
  { id: '#ORD-004', customer: 'James Wilson', product: 'Pro Plan', amount: '$299', status: 'Failed', date: 'Dec 19' },
  { id: '#ORD-005', customer: 'Emma Davis', product: 'Enterprise', amount: '$999', status: 'Completed', date: 'Dec 18' },
]

const topPages = [
  { page: '/pricing', views: 12847, change: '+12%', up: true },
  { page: '/features', views: 9234, change: '+8%', up: true },
  { page: '/blog/ai-trends', views: 7891, change: '+24%', up: true },
  { page: '/docs/api', views: 6543, change: '-3%', up: false },
  { page: '/signup', views: 5821, change: '+15%', up: true },
]

const customers = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Enterprise', spent: '$2,394', joined: 'Jan 2024', status: 'Active', avatar: 'SJ' },
  { name: 'Marcus Chen', email: 'marcus@example.com', plan: 'Pro', spent: '$897', joined: 'Mar 2024', status: 'Active', avatar: 'MC' },
  { name: 'Priya Patel', email: 'priya@example.com', plan: 'Starter', spent: '$147', joined: 'Jun 2024', status: 'Active', avatar: 'PP' },
  { name: 'James Wilson', email: 'james@example.com', plan: 'Pro', spent: '$598', joined: 'Feb 2024', status: 'Churned', avatar: 'JW' },
  { name: 'Emma Davis', email: 'emma@example.com', plan: 'Enterprise', spent: '$3,996', joined: 'Nov 2023', status: 'Active', avatar: 'ED' },
  { name: 'Liam Brown', email: 'liam@example.com', plan: 'Starter', spent: '$49', joined: 'Dec 2024', status: 'Trial', avatar: 'LB' },
  { name: 'Olivia Smith', email: 'olivia@example.com', plan: 'Pro', spent: '$1,197', joined: 'Apr 2024', status: 'Active', avatar: 'OS' },
  { name: 'Noah Taylor', email: 'noah@example.com', plan: 'Enterprise', spent: '$5,988', joined: 'Aug 2023', status: 'Active', avatar: 'NT' },
]

const products = [
  { name: 'Starter Plan', price: '$49/mo', sales: 1284, revenue: '$62,916', growth: '+8%', up: true, color: '#3b82f6', stock: 'Unlimited' },
  { name: 'Pro Plan', price: '$299/mo', sales: 847, revenue: '$253,253', growth: '+22%', up: true, color: '#8b5cf6', stock: 'Unlimited' },
  { name: 'Enterprise', price: '$999/mo', sales: 234, revenue: '$233,766', growth: '+35%', up: true, color: '#10b981', stock: 'Unlimited' },
  { name: 'Add-on: AI', price: '$49/mo', sales: 562, revenue: '$27,538', growth: '-4%', up: false, color: '#f59e0b', stock: 'Unlimited' },
  { name: 'Add-on: API', price: '$99/mo', sales: 389, revenue: '$38,511', growth: '+12%', up: true, color: '#06b6d4', stock: 'Unlimited' },
]

const productSalesData = [
  { month: 'Jul', starter: 90, pro: 55, enterprise: 15 },
  { month: 'Aug', starter: 98, pro: 62, enterprise: 18 },
  { month: 'Sep', starter: 112, pro: 70, enterprise: 20 },
  { month: 'Oct', starter: 105, pro: 68, enterprise: 19 },
  { month: 'Nov', starter: 120, pro: 78, enterprise: 22 },
  { month: 'Dec', starter: 140, pro: 95, enterprise: 28 },
]

const customerGrowth = [
  { month: 'Jan', new: 120, churned: 20 },
  { month: 'Feb', new: 98, churned: 18 },
  { month: 'Mar', new: 145, churned: 22 },
  { month: 'Apr', new: 132, churned: 19 },
  { month: 'May', new: 168, churned: 25 },
  { month: 'Jun', new: 155, churned: 21 },
  { month: 'Jul', new: 189, churned: 28 },
  { month: 'Aug', new: 201, churned: 30 },
  { month: 'Sep', new: 224, churned: 32 },
  { month: 'Oct', new: 198, churned: 27 },
  { month: 'Nov', new: 245, churned: 35 },
  { month: 'Dec', new: 278, churned: 38 },
]

const analyticsHourly = [
  { hour: '0', sessions: 120 }, { hour: '2', sessions: 80 }, { hour: '4', sessions: 60 },
  { hour: '6', sessions: 180 }, { hour: '8', sessions: 520 }, { hour: '10', sessions: 890 },
  { hour: '12', sessions: 1100 }, { hour: '14', sessions: 980 }, { hour: '16', sessions: 860 },
  { hour: '18', sessions: 740 }, { hour: '20', sessions: 560 }, { hour: '22', sessions: 320 },
]

const deviceData = [
  { name: 'Desktop', value: 52, color: '#3b82f6' },
  { name: 'Mobile', value: 38, color: '#8b5cf6' },
  { name: 'Tablet', value: 10, color: '#06b6d4' },
]

const topCountries = [
  { country: '🇺🇸 United States', sessions: 18420, pct: 38 },
  { country: '🇬🇧 United Kingdom', sessions: 7840, pct: 16 },
  { country: '🇩🇪 Germany', sessions: 5230, pct: 11 },
  { country: '🇨🇦 Canada', sessions: 4120, pct: 8 },
  { country: '🇦🇺 Australia', sessions: 3890, pct: 8 },
]

// ─── NAV ────────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: '▣', label: 'Overview', id: 'overview' },
  { icon: '📈', label: 'Analytics', id: 'analytics' },
  { icon: '💰', label: 'Revenue', id: 'revenue' },
  { icon: '👥', label: 'Customers', id: 'customers' },
  { icon: '📦', label: 'Products', id: 'products' },
  { icon: '⚙️', label: 'Settings', id: 'settings' },
]

// ─── SHARED COMPONENTS ──────────────────────────────────
function StatCard({ label, value, change, up, color, icon }: any) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border2)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: 'var(--text2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{value}</div>
      <div style={{ fontSize: 12, color: up ? 'var(--green)' : 'var(--red)' }}>{up ? '↑' : '↓'} {change} vs last month</div>
    </div>
  )
}

function Card({ title, subtitle, children, action }: any) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--text2)' }}>{subtitle}</div>}
        </div>
        {action && <button style={{ fontSize: 11, color: 'var(--blue)', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', padding: '5px 12px', borderRadius: 6, cursor: 'pointer' }}>{action}</button>}
      </div>
      {children}
    </div>
  )
}

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
      <div style={{ color: 'var(--text2)', marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{typeof p.value === 'number' && p.value > 999 ? `$${(p.value / 1000).toFixed(1)}k` : p.value}</strong>
        </div>
      ))}
    </div>
  )
}

const statusColor = (s: string) => s === 'Active' ? { bg: 'rgba(16,185,129,0.12)', c: '#10b981' } : s === 'Trial' ? { bg: 'rgba(245,158,11,0.12)', c: '#f59e0b' } : { bg: 'rgba(239,68,68,0.12)', c: '#ef4444' }

// ─── PAGES ──────────────────────────────────────────────

function OverviewPage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Revenue" value="$847K" change="+18.2%" up icon="💰" color="#3b82f6" />
        <StatCard label="Active Users" value="24,891" change="+12.5%" up icon="👥" color="#10b981" />
        <StatCard label="Conversion" value="4.2%" change="+0.8%" up icon="🎯" color="#8b5cf6" />
        <StatCard label="Churn Rate" value="2.1%" change="-0.4%" up={false} icon="📉" color="#ef4444" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Revenue Overview" subtitle="Monthly revenue & profit" action="Export">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<TT />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#rg)" />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} fill="url(#pg)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Traffic Sources" subtitle="By channel">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
              {channelData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
          <div>{channelData.map(c => (
            <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} /><span style={{ fontSize: 12, color: 'var(--text2)' }}>{c.name}</span></div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{c.value}%</span>
            </div>
          ))}</div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Weekly Traffic" subtitle="Visitors & pageviews">
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={trafficData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip content={<TT />} />
              <Bar dataKey="visitors" name="Visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pageviews" name="Pageviews" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Conversion Rate" subtitle="6-month trend">
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 5]} />
              <Tooltip content={<TT />} />
              <Line type="monotone" dataKey="rate" name="Rate" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <Card title="Recent Orders" subtitle="Latest transactions" action="View all">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>)}
            </tr></thead>
            <tbody>{recentOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 0', fontSize: 12, color: 'var(--blue)', fontFamily: 'JetBrains Mono, monospace' }}>{o.id}</td>
                <td style={{ padding: '12px 0', fontSize: 13 }}>{o.customer}</td>
                <td style={{ padding: '12px 0', fontSize: 12, color: 'var(--text2)' }}>{o.product}</td>
                <td style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{o.amount}</td>
                <td style={{ padding: '12px 0' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: o.status === 'Completed' ? 'rgba(16,185,129,0.12)' : o.status === 'Processing' ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)', color: o.status === 'Completed' ? 'var(--green)' : o.status === 'Processing' ? 'var(--orange)' : 'var(--red)' }}>{o.status}</span>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
        <Card title="Top Pages" subtitle="By views this week">
          {topPages.map((p, i) => (
            <div key={p.page} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < topPages.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div>
                <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>{p.page}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)' }}>{p.views.toLocaleString()} views</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: p.up ? 'var(--green)' : 'var(--red)' }}>{p.change}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

function AnalyticsPage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Sessions" value="48,291" change="+14.2%" up icon="🖥" color="#3b82f6" />
        <StatCard label="Bounce Rate" value="38.4%" change="-2.1%" up={false} icon="↩" color="#ef4444" />
        <StatCard label="Avg Duration" value="3m 42s" change="+18s" up icon="⏱" color="#10b981" />
        <StatCard label="Pages/Session" value="4.8" change="+0.3" up icon="📄" color="#8b5cf6" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Sessions by Hour" subtitle="Today's traffic pattern">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsHourly}>
              <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}:00`} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#8b5cf6" strokeWidth={2} fill="url(#sg)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Device Breakdown" subtitle="Sessions by device">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" strokeWidth={0}>
              {deviceData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie><Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
          <div>{deviceData.map(d => (
            <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} /><span style={{ fontSize: 12, color: 'var(--text2)' }}>{d.name}</span></div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{d.value}%</span>
            </div>
          ))}</div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Top Countries" subtitle="Sessions by location">
          {topCountries.map((c, i) => (
            <div key={c.country} style={{ padding: '12px 0', borderBottom: i < topCountries.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13 }}>{c.country}</span>
                <span style={{ fontSize: 12, color: 'var(--text2)' }}>{c.sessions.toLocaleString()}</span>
              </div>
              <div style={{ height: 4, background: 'var(--surface2)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${c.pct}%`, background: 'var(--blue)', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </Card>
        <Card title="Weekly Traffic Breakdown" subtitle="Visitors vs pageviews">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip content={<TT />} />
              <Bar dataKey="visitors" name="Visitors" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pageviews" name="Pageviews" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

function RevenuePage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Revenue" value="$847K" change="+18.2%" up icon="💰" color="#3b82f6" />
        <StatCard label="Total Expenses" value="$437K" change="+9.1%" up={false} icon="📤" color="#ef4444" />
        <StatCard label="Net Profit" value="$410K" change="+28.4%" up icon="📊" color="#10b981" />
        <StatCard label="MRR" value="$108K" change="+14.9%" up icon="🔁" color="#8b5cf6" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Card title="Revenue vs Expenses vs Profit" subtitle="Full year overview" action="Download CSV">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                <linearGradient id="eg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
                <linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<TT />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#rg2)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fill="url(#eg2)" />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} fill="url(#pg2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card title="Monthly Breakdown" subtitle="Revenue by month">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Month', 'Revenue', 'Expenses', 'Profit', 'Margin'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>{revenueData.slice(-6).map(r => (
              <tr key={r.month} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 0', fontSize: 13 }}>{r.month}</td>
                <td style={{ padding: '10px 0', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--blue)' }}>${(r.revenue / 1000).toFixed(0)}k</td>
                <td style={{ padding: '10px 0', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--red)' }}>${(r.expenses / 1000).toFixed(0)}k</td>
                <td style={{ padding: '10px 0', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)' }}>${(r.profit / 1000).toFixed(0)}k</td>
                <td style={{ padding: '10px 0', fontSize: 12, fontWeight: 600 }}>{((r.profit / r.revenue) * 100).toFixed(0)}%</td>
              </tr>
            ))}</tbody>
          </table>
        </Card>
        <Card title="Revenue by Product" subtitle="This month's split">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={productSalesData} layout="vertical" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="month" type="category" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="starter" name="Starter" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="pro" name="Pro" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="enterprise" name="Enterprise" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}

function CustomersPage() {
  const [search, setSearch] = useState('')
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Customers" value="2,847" change="+12.5%" up icon="👥" color="#3b82f6" />
        <StatCard label="Active" value="2,341" change="+8.2%" up icon="✅" color="#10b981" />
        <StatCard label="Churned" value="124" change="+2.1%" up={false} icon="❌" color="#ef4444" />
        <StatCard label="Avg LTV" value="$1,240" change="+22.4%" up icon="💎" color="#8b5cf6" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Card title="Customer Growth" subtitle="New vs churned per month">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={customerGrowth} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="new" name="New" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="churned" name="Churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="All Customers" subtitle={`${filtered.length} customers`} action="Export">
        <div style={{ marginBottom: 16 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Customer', 'Email', 'Plan', 'Total Spent', 'Joined', 'Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>)}
          </tr></thead>
          <tbody>{filtered.map(c => {
            const sc = statusColor(c.status)
            return (
              <tr key={c.name} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{c.avatar}</div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 0', fontSize: 12, color: 'var(--text2)' }}>{c.email}</td>
                <td style={{ padding: '12px 0', fontSize: 12 }}>{c.plan}</td>
                <td style={{ padding: '12px 0', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)' }}>{c.spent}</td>
                <td style={{ padding: '12px 0', fontSize: 12, color: 'var(--text2)' }}>{c.joined}</td>
                <td style={{ padding: '12px 0' }}><span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 100, background: sc.bg, color: sc.c }}>{c.status}</span></td>
              </tr>
            )
          })}</tbody>
        </table>
      </Card>
    </div>
  )
}

function ProductsPage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Products" value="5" change="+1 this quarter" up icon="📦" color="#3b82f6" />
        <StatCard label="Total Sales" value="3,316" change="+19.4%" up icon="🛒" color="#10b981" />
        <StatCard label="Best Seller" value="Starter" change="+8% MoM" up icon="⭐" color="#f59e0b" />
        <StatCard label="Avg Order" value="$243" change="+14.2%" up icon="💳" color="#8b5cf6" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Sales by Product" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productSalesData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8892aa', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="starter" name="Starter" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pro" name="Pro" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="enterprise" name="Enterprise" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Revenue Share" subtitle="By product">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={products.map(p => ({ name: p.name, value: parseInt(p.revenue.replace(/[$,]/g, '')) }))} cx="50%" cy="50%" innerRadius={55} outerRadius={78} dataKey="value" strokeWidth={0}>
              {products.map((p, i) => <Cell key={i} fill={p.color} />)}
            </Pie><Tooltip formatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="Product Performance" subtitle="All plans overview" action="Add Product">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Product', 'Price', 'Sales', 'Revenue', 'Growth'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 0', fontSize: 11, color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>)}
          </tr></thead>
          <tbody>{products.map(p => (
            <tr key={p.name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '14px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                </div>
              </td>
              <td style={{ padding: '14px 0', fontSize: 12, color: 'var(--text2)' }}>{p.price}</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>{p.sales.toLocaleString()}</td>
              <td style={{ padding: '14px 0', fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)' }}>{p.revenue}</td>
              <td style={{ padding: '14px 0' }}><span style={{ fontSize: 12, fontWeight: 700, color: p.up ? 'var(--green)' : 'var(--red)' }}>{p.growth}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  )
}

function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true, monthly: true })
  const [theme, setTheme] = useState('dark')
  const [name, setName] = useState('Prohorj Bormon')
  const [email, setEmail] = useState('prohorj@example.com')
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card title="Profile" subtitle="Update your personal information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Role</label>
            <select style={{ width: '100%', padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }}>
              <option>Admin</option><option>Manager</option><option>Viewer</option>
            </select>
          </div>
          <button onClick={handleSave} style={{ padding: '10px 24px', background: saved ? 'var(--green)' : 'var(--blue)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'background 0.3s' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </Card>

        <Card title="Notifications" subtitle="Choose what you want to be notified about">
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, textTransform: 'capitalize', marginBottom: 2 }}>{key.replace(/([A-Z])/g, ' $1')} Notifications</div>
                <div style={{ fontSize: 12, color: 'var(--text2)' }}>Receive {key} alerts and updates</div>
              </div>
              <div onClick={() => setNotifications(n => ({ ...n, [key]: !val }))} style={{ width: 44, height: 24, borderRadius: 12, background: val ? 'var(--blue)' : 'var(--surface2)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', border: '1px solid var(--border)' }}>
                <div style={{ position: 'absolute', top: 3, left: val ? 22 : 2, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
              </div>
            </div>
          ))}
        </Card>

        <Card title="Appearance" subtitle="Customize your dashboard look">
          <div style={{ display: 'flex', gap: 12 }}>
            {['dark', 'light', 'system'].map(t => (
              <button key={t} onClick={() => setTheme(t)} style={{ flex: 1, padding: '12px', border: theme === t ? '1px solid var(--blue)' : '1px solid var(--border)', borderRadius: 8, background: theme === t ? 'rgba(59,130,246,0.1)' : 'var(--surface2)', color: theme === t ? 'var(--blue)' : 'var(--text2)', cursor: 'pointer', fontSize: 13, fontWeight: theme === t ? 600 : 400, textTransform: 'capitalize' }}>{t}</button>
            ))}
          </div>
        </Card>

        <Card title="Danger Zone" subtitle="Irreversible actions">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Export Data</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>Download all your data as CSV</div>
            </div>
            <button style={{ padding: '8px 18px', background: 'none', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', cursor: 'pointer', fontSize: 12 }}>Export</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--red)', marginBottom: 2 }}>Delete Account</div>
              <div style={{ fontSize: 12, color: 'var(--text2)' }}>Permanently delete your account and data</div>
            </div>
            <button style={{ padding: '8px 18px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, color: 'var(--red)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Delete</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─── MAIN APP ────────────────────────────────────────────
export default function Dashboard() {
  const [activePage, setActivePage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const pages: Record<string, JSX.Element> = {
    overview: <OverviewPage />,
    analytics: <AnalyticsPage />,
    revenue: <RevenuePage />,
    customers: <CustomersPage />,
    products: <ProductsPage />,
    settings: <SettingsPage />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <aside style={{ width: sidebarOpen ? 220 : 64, flexShrink: 0, background: 'var(--bg2)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease', overflow: 'hidden' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, minHeight: 64 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, var(--blue), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>⚡</div>
          {sidebarOpen && <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>Pulse</span>}
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: activePage === item.id ? 'rgba(59,130,246,0.12)' : 'none', color: activePage === item.id ? 'var(--blue)' : 'var(--text2)', marginBottom: 2, transition: 'all 0.15s', textAlign: 'left', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { if (activePage !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (activePage !== item.id) e.currentTarget.style.background = 'none' }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: 13, fontWeight: activePage === item.id ? 600 : 400 }}>{item.label}</span>}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ margin: '12px 8px', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'none', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
          <span style={{ flexShrink: 0 }}>{sidebarOpen ? '◀' : '▶'}</span>
          {sidebarOpen && <span style={{ fontSize: 12 }}>Collapse</span>}
        </button>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ height: 64, borderBottom: '1px solid var(--border)', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, background: 'var(--bg2)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{NAV_ITEMS.find(n => n.id === activePage)?.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text2)' }}>Monday, December 22, 2025</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12 }}>🔍</span>
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>Search...</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>🔔</div>
              <div style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', border: '2px solid var(--bg2)' }} />
            </div>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--blue), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', fontWeight: 700 }}>P</div>
          </div>
        </header>
        <main style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {pages[activePage]}
        </main>
      </div>
    </div>
  )
}
