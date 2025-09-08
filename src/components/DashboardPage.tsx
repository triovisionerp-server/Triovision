import React, { useMemo, useState } from "react";

const dashboardModules = [
	{ title: "Sales Management", subtitle: "Leads, quotations, orders.", progress: 93, color: "#22c55e" },
	{ title: "Tooling Design", subtitle: "Design, CAD, Drawings.", progress: 85, color: "#22c55e" },
	{ title: "Project / Job Management", subtitle: "Tasks, milestones.", progress: 68, color: "#facc15" },
	{ title: "Purchase Management", subtitle: "Suppliers, RFQs.", progress: 40, color: "#ef4444" },
	{ title: "Store Management", subtitle: "Inventory, e-commerce style.", progress: 75, color: "#facc15" },
	{ title: "Production Management", subtitle: "BOMs, work orders.", progress: 91, color: "#22c55e" },
	{ title: "Delivery & Dispatch", subtitle: "Shipments, tracking.", progress: 62, color: "#facc15" },
	{ title: "Invoicing", subtitle: "Invoices, credit notes.", progress: 89, color: "#22c55e" },
	{ title: "Employees", subtitle: "Staff, attendance, overview.", progress: 0, color: "#a3a3a3" },
	{ title: "Reports & Dashboard", subtitle: "KPIs, charts.", progress: 0, color: "#a3a3a3" },
];

// Full list of Manufacturing KPI examples (as requested)
const KPI_LIST = [
	"Production output per hour",
	"Scrap rate",
	"Machine downtime",
	"Inventory turnover",
	"Days of inventory",
	"Inventory carrying cost",
	"Customer complaints",
	"Defects per unit",
	"Rework rate",
	"R&D expenses as a percentage of revenue",
	"Patent applications filed",
	"New product introductions",
	"Asset utilization",
	"Availability",
	"Avoided cost",
	"Capacity utilization",
	"Comparative analytics for products, plants, divisions, companies",
	"Compliance rates",
	"Customer satisfaction",
	"Cycle time",
	"Demand forecasting",
	"Faults detected prior to failure",
	"First aid visits",
	"First time through",
	"Forecasts of production quantities",
	"Increase/decrease in plant downtime",
	"Industry benchmark performance",
	"Integration capabilities",
	"Interaction level Inventory",
	"Job, product costing",
	"Labor as a percentage of cost",
	"Labor usage, costs-direct and indirect",
	"Machine modules reuse",
	"Maintenance cost per unit",
	"Manufacturing cost per unit",
	"Material costing, usage",
	"Mean time between failure (MTBF)",
	"Mean time to repair",
	"Number of production assignments completed in time",
	"On-time orders",
	"On-time shipping",
	"Open orders",
	"Overall equipment effectiveness",
	"Overall production efficiency",
	"Overtime as a percentage of total hours",
	"Percentage decrease in inventory carrying costs",
	"Percentage decrease in production-to-market lead-time",
	"Percentage decrease in scrap and rework costs",
	"Percentage decrease in standard production hours",
	"Percentage increase in productivity",
	"Percentage increase in revenues",
	"Percentage material cost reduction",
	"Percentage reduction in defect rates",
	"Percentage reduction in downtime",
	"Percentage reduction in inventory levels",
	"Percentage reduction in manufacturing lead times",
	"Percentage savings in costs",
	"Percentage savings in inventory costs",
	"Percentage savings in labor costs",
	"Percentage savings in transportation costs",
	"Planned work to total work ratio",
	"Predictive maintenance monitoring (maintenance events per cycle)",
	"Process capability",
	"Productivity",
	"Quality improvement (first-pass yield)",
	"Quality tracking-six sigma",
	"Reduced time to productivity",
	"Reduction in penalties",
	"Savings in inventory carrying costs",
	"Scheduled production",
	"Spend analytics",
	"Storehouse stock effectiveness",
	"Supplier trending",
	"Time from order to shipment",
	"Time on floor to be packed",
	"Unplanned capacity expenditure",
	"Unused capacity expenditures",
	"Utilization",
	"Waste ration reduction",
	"Work-in-process (WIP)",
];

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 1) return [];
  const rows = lines.slice(1).map((l) => {
    const parts = l.split(",").map((p) => p.trim());
    return { label: parts[0] || "", value: Number(parts[1] || 0) };
  }).filter((r) => r.label);
  return rows;
}

export function DashboardPage() {
  const [csvData, setCsvData] = useState<{ label: string; value: number }[] | null>(null);
  const [kpiQuery, setKpiQuery] = useState("");
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([]);

  const kpiFiltered = useMemo(() => {
    const q = kpiQuery.trim().toLowerCase();
    return KPI_LIST.filter((k) => !q || k.toLowerCase().includes(q));
  }, [kpiQuery]);

  // sample chart data (unchanged)
  const chartData = useMemo(() => {
    if (csvData && csvData.length) return csvData;
    return dashboardModules.slice(0, 6).map((m) => ({ label: m.title, value: m.progress || 0, color: m.color }));
  }, [csvData]);

  function toggleKpi(k: string) {
    setSelectedKPIs((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const txt = String(reader.result || "");
        const parsed = parseCSV(txt);
        setCsvData(parsed);
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(f);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] to-[#f3e8ff] p-6">
      <div className="w-full bg-[#8b5cf6] flex items-center justify-between px-8 py-4 rounded-b-md">
        <h1 className="text-2xl font-bold text-white">ERP Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-white">Welcome, User</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Donut / file upload */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Donut (Pie) Chart</div>
            <input type="file" accept=".csv" onChange={handleFile} className="text-sm" />
          </div>
          <div className="flex justify-center items-center">
            <svg width={220} height={220} viewBox="0 0 220 220">
              <g transform="translate(110,110)">
                {(() => {
                  const total = Math.max(1, chartData.reduce((s, c) => s + (c.value || 0), 0));
                  const radius = 60;
                  const circumference = 2 * Math.PI * radius;
                  let offset = 0;
                  return chartData.map((d: any, i) => {
                    const value = d.value || 0;
                    const pct = (value / total) * 100;
                    const dash = (pct / 100) * circumference;
                    const strokeColor = d.color || ["#ef4444", "#facc15", "#22c55e", "#60a5fa", "#a78bfa", "#fb7185"][i % 6];
                    const res = (
                      <circle
                        key={i}
                        r={radius}
                        fill="transparent"
                        stroke={strokeColor}
                        strokeWidth={30}
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        strokeDashoffset={-offset}
                        transform="rotate(-90)"
                        style={{ transition: "stroke-dasharray 400ms, stroke-dashoffset 400ms" }}
                      />
                    );
                    offset += dash;
                    return res;
                  });
                })()}
                <circle r={40} fill="#fff" />
                <text x="0" y="6" fontSize="14" textAnchor="middle" fontWeight={700}>Total</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Middle: Bar chart */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold">Bar Chart</div>
            <div className="text-sm text-gray-500">Selected KPIs: <span className="font-semibold">{selectedKPIs.length}</span></div>
          </div>
          <div className="w-full overflow-x-auto">
            <svg width={Math.max(600, chartData.length * 80)} height={260}>
              {(() => {
                const max = Math.max(1, ...chartData.map((d) => d.value || 0));
                return chartData.map((d, i) => {
                  const barH = ((d.value || 0) / max) * 180;
                  return (
                    <g key={i} transform={`translate(${i * 80 + 40},0)`}>
                      <rect x={-20} y={200 - barH} width={40} height={barH} rx={6} fill={(d as any).color || '#60a5fa'} />
                      <text x={0} y={218} fontSize={12} textAnchor="middle">{d.label.length > 10 ? d.label.substring(0, 10) + '...' : d.label}</text>
                      <text x={0} y={200 - barH - 6} fontSize={12} textAnchor="middle" fontWeight={700}>{d.value}</text>
                    </g>
                  );
                });
              })()}
            </svg>
          </div>
        </div>

        {/* KPI selector / summary */}
        <div className="col-span-1 lg:col-span-1">
          <div className="bg-white p-4 rounded-2xl shadow mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">KPI Library</div>
              <div className="text-sm text-gray-500">{KPI_LIST.length} items</div>
            </div>

            <input
              type="search"
              value={kpiQuery}
              onChange={(e) => setKpiQuery(e.target.value)}
              placeholder="Search KPIs..."
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <div className="max-h-64 overflow-auto space-y-2">
              {kpiFiltered.map((k) => {
                const selected = selectedKPIs.includes(k);
                return (
                  <div key={k} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <div className="text-sm">{k}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleKpi(k)}
                        className={`text-xs px-2 py-1 rounded ${selected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}
                      >
                        {selected ? "Selected" : "Add"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Selected KPIs</div>
              <div className="text-sm text-gray-500">{selectedKPIs.length}</div>
            </div>

            {selectedKPIs.length === 0 ? (
              <div className="text-sm text-gray-500">No KPIs selected. Click 'Add' to include.</div>
            ) : (
              <ul className="space-y-2">
                {selectedKPIs.map((k) => (
                  <li key={k} className="flex items-center justify-between p-2 border rounded">
                    <div className="text-sm">{k}</div>
                    <div className="text-xs text-gray-600">sample</div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setSelectedKPIs([]); }}
                className="flex-1 text-sm px-3 py-2 bg-gray-100 rounded"
              >
                Clear
              </button>
              <button
                onClick={() => alert(`Export ${selectedKPIs.length} KPIs`)}
                className="flex-1 text-sm px-3 py-2 bg-indigo-600 text-white rounded"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modules grid */}
      <div className="max-w-7xl mx-auto py-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {dashboardModules.map((mod, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow flex flex-col items-center justify-center aspect-square w-full max-w-xs" style={{ borderTop: `5px solid ${mod.color}` }}>
            <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
              <div className="text-base font-semibold mb-2 text-center mt-4">
                {mod.title}
              </div>
              <div className="text-gray-500 text-xs mb-6 text-center">
                {mod.subtitle}
              </div>
              {mod.progress > 0 && (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-4 rounded-full flex items-center justify-end pr-2 text-xs font-bold"
                      style={{
                        width: `${mod.progress}%`,
                        background: mod.color,
                        color: "#fff",
                        transition: "width 0.5s",
                      }}
                    >
                      {mod.progress}% 
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}