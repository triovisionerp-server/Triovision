import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { AnimatedBackground } from "../AnimatedBackground";
import { FloatingShapes } from "../FloatingShapes";
import { Additional3DElements } from "../Additional3DElements";
import { MechanicalEngineer3D } from "../MechanicalEngineer3D";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

type Row = {
  date?: string;
  line?: string;
  shift?: string;
  target_hours?: string | number;
  actual_hours?: string | number;
  manpower?: string | number;
  output_units?: string | number;
  defects?: string | number;
};

function toNum(v: any) {
  const n = typeof v === "string" ? parseFloat(v.replace(/,/g, "")) : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function DashboardPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [line, setLine] = useState<string>("all");
  const [shift, setShift] = useState<string>("all");

  useEffect(() => {
    setLoading(true);
    setErr(null);
    Papa.parse("/manpower_sheet_varied.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setRows(res.data as Row[]);
        setLoading(false);
      },
      error: (e) => {
        setErr(e.message || "Failed to load CSV.");
        setLoading(false);
      },
    });
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const byLine = line === "all" || (r.line || "").toLowerCase() === line;
      const byShift = shift === "all" || (r.shift || "").toLowerCase() === shift;
      return byLine && byShift;
    });
  }, [rows, line, shift]);

  const kpis = useMemo(() => {
    let totalTarget = 0,
      totalActual = 0,
      totalOutput = 0,
      totalDefects = 0,
      totalManpower = 0;
    filtered.forEach((r) => {
      totalTarget += toNum(r.target_hours);
      totalActual += toNum(r.actual_hours);
      totalOutput += toNum(r.output_units);
      totalDefects += toNum(r.defects);
      totalManpower += toNum(r.manpower);
    });
    const efficiency = totalTarget ? (totalActual / totalTarget) * 100 : 0;
    const defectRate = totalOutput ? (totalDefects / totalOutput) * 100 : 0;
    const productivity = totalManpower ? totalOutput / totalManpower : 0;
    return {
      totalTarget: totalTarget.toFixed(1),
      totalActual: totalActual.toFixed(1),
      efficiency: efficiency.toFixed(1),
      defectRate: defectRate.toFixed(2),
      productivity: productivity.toFixed(2),
      totalOutput: totalOutput.toFixed(0),
      totalManpower: totalManpower.toFixed(0),
    };
  }, [filtered]);

  const trend = useMemo(() => {
    const map = new Map<
      string,
      { date: string; efficiency: number; output: number }
    >();
    filtered.forEach((r) => {
      const d = (r.date || "").toString();
      const rec = map.get(d) || { date: d, efficiency: 0, output: 0 };
      const t = toNum(r.target_hours);
      const a = toNum(r.actual_hours);
      const eff = t ? (a / t) * 100 : 0;
      rec.efficiency += eff;
      rec.output += toNum(r.output_units);
      map.set(d, rec);
    });
    return Array.from(map.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, [filtered]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      <AnimatedBackground />
      <FloatingShapes />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: KPIs + Filters + Chart */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold">Manufacturing Dashboard</h2>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex gap-4 flex-wrap">
                <div>
                  <label className="text-sm font-medium mr-2">Line</label>
                  <select
                    className="border rounded px-2 py-1"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="line1">line1</option>
                    <option value="line2">line2</option>
                    <option value="line3">line3</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mr-2">Shift</label>
                  <select
                    className="border rounded px-2 py-1"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="morning">morning</option>
                    <option value="evening">evening</option>
                    <option value="night">night</option>
                  </select>
                </div>
                <Button
                  onClick={() => {
                    setLine("all");
                    setShift("all");
                  }}
                >
                  Reset
                </Button>
              </div>
            </Card>

            {/* KPIs */}
            <Card className="p-4">
              {loading ? (
                <div>Loading CSV…</div>
              ) : err ? (
                <div className="text-red-600">Error: {err}</div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Total Output</div>
                    <div className="text-xl font-bold">{kpis.totalOutput}</div>
                  </div>
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Efficiency %</div>
                    <div className="text-xl font-bold">{kpis.efficiency}%</div>
                  </div>
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Defect Rate</div>
                    <div className="text-xl font-bold">{kpis.defectRate}%</div>
                  </div>
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Actual Hours</div>
                    <div className="text-xl font-bold">{kpis.totalActual}</div>
                  </div>
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Target Hours</div>
                    <div className="text-xl font-bold">{kpis.totalTarget}</div>
                  </div>
                  <div className="p-3 rounded border">
                    <div className="text-xs text-gray-500">Output / Manpower</div>
                    <div className="text-xl font-bold">{kpis.productivity}</div>
                  </div>
                </div>
              )}
            </Card>

            {/* Chart */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">
                Efficiency vs Output (by Date)
              </h3>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Efficiency %"
                    />
                    <Line
                      type="monotone"
                      dataKey="output"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Output"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* RIGHT: 3D Illustration */}
          <div className="hidden lg:flex justify-center">
            <MechanicalEngineer3D />
          </div>
        </div>
      </div>

      <Additional3DElements />
    </div>
  );
}

// ✅ Default export
export default DashboardPage;
