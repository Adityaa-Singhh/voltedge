import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Download, 
  Search, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { AdminBreadcrumbs, KPICard } from '../components/AdminUI';
import { 
  TrafficAreaChart, 
  EnquiryTrendChart, 
  TopProductsBarChart, 
  CategoryPerformanceChart, 
  TrafficSourcesDonutChart, 
  DeviceBreakdownDonutChart, 
  BrandPerformanceChart, 
  ConversionFunnelChart 
} from '../components/AdminCharts';
import { useAdminStore } from '../data/adminStore';

export const AdminAnalytics: React.FC = () => {
  const { products, categories, brands, enquiries, dailyAnalytics } = useAdminStore();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');

  const handleExportReport = () => {
    alert(`Exporting Sai Enterprises Performance Report (${timeRange}) in PDF format...`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <AdminBreadcrumbs items={[{ label: 'Admin' }, { label: 'Performance Analytics', active: true }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Performance & Business Analytics</h1>
            <span className="px-3 py-1 rounded-full bg-volt/15 text-volt border border-volt/30 text-xs font-black">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track user engagement, lead generation conversion funnel, product search popularity and brand demand
          </p>
        </div>

        {/* Time Range Selector & Export & GA */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-dark-1 border border-white/10 rounded-2xl p-1 flex items-center gap-1 text-xs">
            {(['7d', '30d', '90d', '12m'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase transition-all ${
                  timeRange === r ? 'bg-volt text-dark-0 shadow-md font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-2 px-4 rounded-full text-xs font-bold text-white border border-volt/30 bg-volt/10 hover:bg-volt/20 flex items-center gap-1.5 shadow-lg transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-volt" />
            <span className="hidden sm:inline">Google Analytics</span>
          </a>

          <button
            onClick={handleExportReport}
            className="btn-primary py-2 px-4 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Analytics KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title="Total Store Inventory"
          value={products.length}
          change="+8.4%"
          isPositive={true}
          icon={Users}
          accentColor="volt"
          subtitle={`${products.filter(p => p.inStock).length} in-stock live items`}
        />

        <KPICard
          title="Quotation Leads"
          value={enquiries.length}
          change="+3.8%"
          isPositive={true}
          icon={TrendingUp}
          accentColor="emerald"
          subtitle={`${enquiries.filter(e => e.status === 'NEW').length} new unread inquiries`}
        />

        <KPICard
          title="Product Categories"
          value={categories.length}
          change="+1 new"
          isPositive={true}
          icon={MessageSquare}
          accentColor="amber"
          subtitle="Switches, Wires, DBs, Lighting"
        />

        <KPICard
          title="Authorized Brands"
          value={brands.length}
          change="+5.1%"
          isPositive={true}
          icon={Users}
          accentColor="blue"
          subtitle="PMCona, Havells, Polycab"
        />
      </div>

      {/* Primary Chart Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficAreaChart dailyAnalytics={dailyAnalytics} />
        <EnquiryTrendChart enquiries={enquiries} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsBarChart products={products} enquiries={enquiries} />
        <CategoryPerformanceChart categories={categories} products={products} enquiries={enquiries} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TrafficSourcesDonutChart enquiries={enquiries} />
        <DeviceBreakdownDonutChart dailyAnalytics={dailyAnalytics} />
        <BrandPerformanceChart brands={brands} products={products} enquiries={enquiries} />
      </div>

      <ConversionFunnelChart dailyAnalytics={dailyAnalytics} enquiries={enquiries} />

      {/* Deep Dive Tables (Top Search Queries & Regional Demand) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Search Keywords Table */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-volt" />
                <h3 className="text-lg font-bold text-white tracking-tight">Top Store Search Queries</h3>
              </div>
              <span className="text-xs text-slate-400 font-bold">Live Visitor Telemetry</span>
            </div>

            {(() => {
              const aggregatedSearches: Record<string, number> = {};
              for (const d of dailyAnalytics) {
                if (d.topSearches) {
                  for (const [q, count] of Object.entries(d.topSearches)) {
                    aggregatedSearches[q] = (aggregatedSearches[q] || 0) + count;
                  }
                }
              }
              const searchList = Object.entries(aggregatedSearches)
                .map(([query, count]) => ({ query, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 6);

              if (searchList.length === 0) {
                return (
                  <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/5 my-auto">
                    <Search className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
                    <p className="text-xs text-slate-300 font-bold">No Store Searches Recorded Yet</p>
                    <p className="text-[11px] text-slate-400 mt-1">Real keyword searches typed by visitors into your product search bar will automatically appear here.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-2.5">
                  {searchList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-dark-2 flex items-center justify-center font-bold text-volt text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white capitalize">{item.query}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-volt font-mono font-bold">{item.count} {item.count === 1 ? 'search' : 'searches'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Regional Customer Demand */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-volt" />
              <h3 className="text-lg font-bold text-white tracking-tight">Regional Demand Breakdown</h3>
            </div>
            <span className="text-xs text-slate-400 font-bold">Real Quotations ({enquiries.length})</span>
          </div>

          {(() => {
            const totalEnquiries = enquiries.length;
            const regionalCounts = {
              rourkela: 0,
              sundargarh: 0,
              birmitrapur: 0,
              rajgangpur: 0,
              other: 0,
            };

            for (const e of enquiries) {
              const text = `${e.productRequirement || ''} ${e.message || ''} ${e.customerName || ''}`.toLowerCase();
              if (text.includes('sundargarh') || text.includes('jharsuguda')) {
                regionalCounts.sundargarh++;
              } else if (text.includes('birmitrapur') || text.includes('kansbahal')) {
                regionalCounts.birmitrapur++;
              } else if (text.includes('rajgangpur')) {
                regionalCounts.rajgangpur++;
              } else if (text.includes('sambalpur') || text.includes('keonjhar') || text.includes('bhubaneswar') || text.includes('cuttack')) {
                regionalCounts.other++;
              } else {
                regionalCounts.rourkela++;
              }
            }

            const regionalList = [
              {
                region: 'Rourkela (Udit Nagar, Civil Township)',
                count: regionalCounts.rourkela,
                percent: totalEnquiries > 0 ? Math.round((regionalCounts.rourkela / totalEnquiries) * 100) : 100,
              },
              {
                region: 'Sundargarh & Jharsuguda',
                count: regionalCounts.sundargarh,
                percent: totalEnquiries > 0 ? Math.round((regionalCounts.sundargarh / totalEnquiries) * 100) : 0,
              },
              {
                region: 'Birmitrapur & Kansbahal Industrial Area',
                count: regionalCounts.birmitrapur,
                percent: totalEnquiries > 0 ? Math.round((regionalCounts.birmitrapur / totalEnquiries) * 100) : 0,
              },
              {
                region: 'Rajgangpur',
                count: regionalCounts.rajgangpur,
                percent: totalEnquiries > 0 ? Math.round((regionalCounts.rajgangpur / totalEnquiries) * 100) : 0,
              },
              {
                region: 'Other Odisha Districts (Sambalpur, Keonjhar)',
                count: regionalCounts.other,
                percent: totalEnquiries > 0 ? Math.round((regionalCounts.other / totalEnquiries) * 100) : 0,
              },
            ];

            return (
              <div className="space-y-3">
                {regionalList.map((reg, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-200">{reg.region}</span>
                      <span className="text-volt font-bold">
                        {reg.percent}% ({reg.count} {reg.count === 1 ? 'quote' : 'quotes'})
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-dark-2 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-volt to-blue-500 transition-all duration-700" style={{ width: `${reg.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
