'use client';

import React, { useState } from 'react';
import { Search, Shield, User, Building2, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const users = [
    { id: 'u1', name: 'Aarav Sharma', email: 'aarav@airguard.org', role: 'PLAYER', level: 12, xp: 1240, rank: 'Air Guardian', joined: 'Aug 2026' },
    { id: 'u2', name: 'Sunita Reddy', email: 'sunita@ecoclean.org', role: 'PLAYER', level: 22, xp: 8890, rank: 'Forest Guardian', joined: 'Jul 2026' },
    { id: 'u3', name: 'Vikramaditya Das', email: 'vikram@greentech.com', role: 'COMPANY_ADMIN', level: 24, xp: 9450, rank: 'Corporate ESG Lead', joined: 'Jun 2026' },
    { id: 'u4', name: 'Dr. Meera Iyer', email: 'admin@airguard.org', role: 'ADMIN', level: 30, xp: 15400, rank: 'System Superadmin', joined: 'May 2026' },
  ];

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Platform User & Role Administration</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Manage verified player identities, corporate ESG coordinators, and municipal dispatch moderators.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-[#F8FAFD] border border-[#DADCE0] rounded-2xl outline-none"
          />
        </div>
      </div>

      <div className="gdg-card bg-white overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFD] border-b border-[#E8EAED] text-[#5F6368] uppercase text-[10px] font-bold">
            <tr>
              <th className="py-3.5 px-6">Name</th>
              <th className="py-3.5 px-6">Email</th>
              <th className="py-3.5 px-6">Role</th>
              <th className="py-3.5 px-6">Level</th>
              <th className="py-3.5 px-6">Total XP</th>
              <th className="py-3.5 px-6">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-[#F8FAFD] transition-colors">
                <td className="py-3.5 px-6 font-bold">{u.name}</td>
                <td className="py-3.5 px-6 text-[#5F6368]">{u.email}</td>
                <td className="py-3.5 px-6">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'ADMIN'
                        ? 'bg-[#FCE8E6] text-[#C5221F]'
                        : u.role === 'COMPANY_ADMIN'
                        ? 'bg-[#E6F4EA] text-[#137333]'
                        : 'bg-[#E8F0FE] text-[#1967D2]'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-6 font-black text-[#1967D2]">L{u.level}</td>
                <td className="py-3.5 px-6 font-bold">{u.xp.toLocaleString()} XP</td>
                <td className="py-3.5 px-6 text-[#80868B]">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
