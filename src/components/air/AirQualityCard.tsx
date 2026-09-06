'use client';

import React from 'react';
import { AirQualityData } from '@/types';
import { Wind, Droplets, Thermometer, Radio, Info } from 'lucide-react';

interface AirQualityCardProps {
  data: AirQualityData;
  compact?: boolean;
}

export function AirQualityCard({ data, compact = false }: AirQualityCardProps) {
  // Determine color scheme based on AQI
  const getAQIStyle = (aqi: number) => {
    if (aqi <= 50) {
      return {
        bg: 'bg-[#E6F4EA]',
        border: 'border-[#CEEAD6]',
        text: 'text-[#137333]',
        badgeBg: 'bg-[#34A853]',
        label: 'Good Air',
        subtext: 'Air quality is satisfactory with little or no risk.',
      };
    }
    if (aqi <= 100) {
      return {
        bg: 'bg-[#FEF7E0]',
        border: 'border-[#FEEFC3]',
        text: 'text-[#B06000]',
        badgeBg: 'bg-[#FBBC05]',
        label: 'Moderate',
        subtext: 'Acceptable; sensitive individuals should consider limiting prolonged outdoor exertion.',
      };
    }
    if (aqi <= 150) {
      return {
        bg: 'bg-[#FEF0E6]',
        border: 'border-[#FED7BE]',
        text: 'text-[#C05621]',
        badgeBg: 'bg-[#FA7B17]',
        label: 'Poor (Sensitive)',
        subtext: 'Members of sensitive groups may experience health effects.',
      };
    }
    return {
      bg: 'bg-[#FCE8E6]',
      border: 'border-[#FAD2CF]',
      text: 'text-[#C5221F]',
      badgeBg: 'bg-[#EA4335]',
      label: 'Unhealthy',
      subtext: 'Increased likelihood of adverse respiratory effects for the public.',
    };
  };

  const style = getAQIStyle(data.aqi);

  return (
    <div className="gdg-card p-5 sm:p-6 bg-white overflow-hidden relative">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F4EA] border border-[#CEEAD6] text-[11px] font-bold text-[#137333]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]"></span>
            </span>
            <span>LIVE DATA</span>
          </div>
          <span className="text-[11px] text-[#80868B] font-medium">• {data.updatedAt}</span>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-[#202124] block truncate max-w-[200px]">{data.zone}</span>
          <span className="text-[10px] text-[#5F6368]">{data.city}</span>
        </div>
      </div>

      {/* Main Gauge / Indicator Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
        {/* AQI Circle display */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-3xl bg-[#F8FAFD] border border-[#E8EAED] text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368] mb-1">
            AIR QUALITY INDEX
          </span>
          <div className="relative flex items-center justify-center my-2">
            <div
              className={`w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 ${style.border} ${style.bg}`}
            >
              <span className={`text-4xl font-black tracking-tight ${style.text}`}>
                {data.aqi}
              </span>
              <span className={`text-[11px] font-bold uppercase ${style.text}`}>
                {style.label}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#5F6368] mt-1 leading-snug px-2">
            {style.subtext}
          </p>
        </div>

        {/* Ambient & Weather conditions */}
        <div className="md:col-span-7 grid grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5F6368] mb-1">
              <Thermometer className="w-3.5 h-3.5 text-[#EA4335]" />
              <span>Temp</span>
            </div>
            <div className="text-lg font-bold text-[#202124]">{data.temperature}°C</div>
            <span className="text-[10px] text-[#80868B]">Ambient</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5F6368] mb-1">
              <Droplets className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>Humidity</span>
            </div>
            <div className="text-lg font-bold text-[#202124]">{data.humidity}%</div>
            <span className="text-[10px] text-[#80868B]">Relative</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5F6368] mb-1">
              <Wind className="w-3.5 h-3.5 text-[#34A853]" />
              <span>Wind</span>
            </div>
            <div className="text-lg font-bold text-[#202124]">{data.windSpeed} km/h</div>
            <span className="text-[10px] text-[#80868B]">{data.windDirection} breeze</span>
          </div>
        </div>
      </div>

      {/* Detailed Pollutants Matrix */}
      {!compact && (
        <div className="pt-4 border-t border-[#E8EAED]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#202124] flex items-center gap-1.5">
              <span>Pollutant Concentration Matrix</span>
              <Info className="w-3.5 h-3.5 text-[#80868B]" />
            </span>
            <span className="text-[11px] text-[#80868B]">Standard: μg/m³</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { label: 'PM2.5', val: `${data.pm25}`, status: 'Moderate', color: 'text-[#B06000]' },
              { label: 'PM10', val: `${data.pm10}`, status: 'Moderate', color: 'text-[#B06000]' },
              { label: 'NO2', val: `${data.no2}`, status: 'Good', color: 'text-[#137333]' },
              { label: 'SO2', val: `${data.so2}`, status: 'Good', color: 'text-[#137333]' },
              { label: 'CO', val: `${data.co} ppm`, status: 'Good', color: 'text-[#137333]' },
              { label: 'O3', val: `${data.o3}`, status: 'Good', color: 'text-[#137333]' },
            ].map((p, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E8EAED] text-center">
                <span className="text-[10px] font-bold text-[#5F6368] block">{p.label}</span>
                <span className="text-sm font-extrabold text-[#202124] my-0.5 block">{p.val}</span>
                <span className={`text-[9px] font-bold ${p.color}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
