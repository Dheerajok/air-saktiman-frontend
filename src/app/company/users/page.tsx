'use client';

import React, { useState } from 'react';
import { Search, Users, Zap, Shield, Award, CheckCircle2 } from 'lucide-react';

export default function CompanyUsersPage() {
  const [search, setSearch] = useState('');

  const employees = [
    { id: 'e1', name: 'Aarav Sharma', department: 'Cloud Engineering', level: 12, missions: 26, xp: 1240, impact: 342, status: 'Active' },
    { id: 'e2', name: 'Sneha Kulkarni', department: 'Product Design', level: 15, missions: 34, xp: 2150, impact: 480, status: 'Active' },
    { id: 'e3', name: 'Rohan Varma', department: 'Enterprise Sales', level: 14, missions: 29, xp: 1890, impact: 410, status: 'Active' },
    { id: 'e4', name: 'Meera Nair', department: 'Sustainability Team', level: 18, missions: 48, xp: 3420, impact: 650, status: 'Top Performer' },
    { id: 'e5', name: 'Karan Mehra', department: 'Finance & Accounts', level: 8, missions: 14, xp: 820, impact: 190, status: 'Active' },
  ];

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#202124]">Employee Guardians Directory</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Track individual employee mission completion, clean air XP, and team ESG impact.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee or team..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-[#F8FAFD] border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none"
          />
        </div>
      </div>

      {/* Employees Table */}
      <div className="gdg-card bg-white overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFD] border-b border-[#E8EAED] text-[#5F6368] uppercase text-[10px] font-bold">
            <tr>
              <th className="py-3.5 px-6">Employee</th>
              <th className="py-3.5 px-6">Department</th>
              <th className="py-3.5 px-6">Level</th>
              <th className="py-3.5 px-6">Missions Done</th>
              <th className="py-3.5 px-6">Total XP</th>
              <th className="py-3.5 px-6">Impact Pts</th>
              <th className="py-3.5 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
            {filtered.map((emp) => (
              <tr key={emp.id} className="hover:bg-[#F8FAFD] transition-colors">
                <td className="py-3.5 px-6 font-bold">{emp.name}</td>
                <td className="py-3.5 px-6 text-[#5F6368]">{emp.department}</td>
                <td className="py-3.5 px-6 font-black text-[#1967D2]">L{emp.level}</td>
                <td className="py-3.5 px-6">{emp.missions} tasks</td>
                <td className="py-3.5 px-6 font-bold">{emp.xp} XP</td>
                <td className="py-3.5 px-6 font-bold text-[#34A853]">+{emp.impact}</td>
                <td className="py-3.5 px-6">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px]">
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
