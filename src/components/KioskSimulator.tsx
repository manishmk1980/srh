import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldCheck, RefreshCw, Thermometer, Heart, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
import { KioskMeasurement } from '../types';

export default function KioskSimulator() {
  const [activeTab, setActiveTab] = useState<'kiosk-image' | 'kiosk-simulator'>('kiosk-simulator');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanStep, setScanStep] = useState<string>('Initialization');
  const [scanProgress, setScanProgress] = useState(0);
  const [weightInput, setWeightInput] = useState('68');
  const [heightInput, setHeightInput] = useState('172');

  // Multi-vital measurements state
  const [vitals, setVitals] = useState<KioskMeasurement>({
    heartRate: 72,
    bloodPressureSys: 118,
    bloodPressureDia: 78,
    bloodOxygen: 98,
    bodyTemperature: 98.4,
    bmi: 23.0,
    healthAssessment: 'Please run the vital checkup scan for assessment.',
    status: 'optimal'
  });

  // SVG Waveform state representation
  const [ecgPath, setEcgPath] = useState<string>('M 0 50 Q 20 50 40 50 L 50 20 L 55 80 L 60 45 L 65 55 L 70 50 L 100 50');
  const ecgTimer = useRef<number | null>(null);

  // Generate an authentic moving cardiogram SVG pattern
  useEffect(() => {
    let offset = 0;
    const generateEcg = () => {
      offset += 1;
      const t = offset % 10;
      let path = 'M 0 50 ';
      
      for (let i = 0; i <= 360; i += 20) {
        const x = i;
        const relativePos = (i + offset * 8) % 120;
        
        let y = 50;
        if (relativePos > 30 && relativePos < 35) {
          y = 48; // Slight baseline tremor
        } else if (relativePos >= 35 && relativePos < 40) {
          y = 52; // Dip before P wave
        } else if (relativePos >= 40 && relativePos < 46) {
          y = 45; // P wave
        } else if (relativePos >= 46 && relativePos < 50) {
          y = 50; // PR interval baseline
        } else if (relativePos >= 50 && relativePos < 52) {
          y = 55; // Q Dip
        } else if (relativePos >= 52 && relativePos < 56) {
          y = 10; // R Spike
        } else if (relativePos >= 56 && relativePos < 60) {
          y = 90; // S Dip
        } else if (relativePos >= 60 && relativePos < 68) {
          y = 38; // T wave bump
        } else if (relativePos >= 68 && relativePos < 72) {
          y = 52; // baseline dip
        }
        
        path += `L ${x} ${y} `;
      }
      setEcgPath(path);
    };

    if (scanState === 'scanning') {
      ecgTimer.current = window.setInterval(generateEcg, 80);
    } else {
      // Slower animation on idle
      ecgTimer.current = window.setInterval(generateEcg, 150);
    }

    return () => {
      if (ecgTimer.current) clearInterval(ecgTimer.current);
    };
  }, [scanState]);

  const handleStartScan = () => {
    setScanState('scanning');
    setScanProgress(0);
    setScanStep('Deploying active probes...');
    
    // Simulate active scan stages
    const duration = 4000; // 4 seconds sequence
    const intervalTime = 100;
    let accumulated = 0;

    const timer = setInterval(() => {
      accumulated += intervalTime;
      const progress = Math.min(Math.round((accumulated / duration) * 100), 100);
      setScanProgress(progress);

      if (progress < 25) {
        setScanStep('Deploying micro-vitals sensors...');
      } else if (progress < 50) {
        setScanStep('Measuring digital pulse & heart rate ECG...');
      } else if (progress < 75) {
        setScanStep('Inflat-pressure cuff & computing systolic/diastolic ratios...');
      } else if (progress < 95) {
        setScanStep('Calibrating photodiode SpO2 & thermal infrared temp register...');
      } else {
        setScanStep('Generating clinical summaries...');
      }

      if (accumulated >= duration) {
        clearInterval(timer);
        
        // Calculate vital metrics with a realistic slight variance
        const hrs = [64, 68, 72, 75, 78, 83];
        const sys = [115, 118, 120, 122, 126, 132];
        const dia = [74, 78, 80, 82, 85];
        const oxy = [97, 98, 99, 100];
        const tmp = [97.8, 98.2, 98.4, 98.6, 99.1];

        const finalHr = hrs[Math.floor(Math.random() * hrs.length)];
        const finalSys = sys[Math.floor(Math.random() * sys.length)];
        const finalDia = dia[Math.floor(Math.random() * dia.length)];
        const finalOxy = oxy[Math.floor(Math.random() * oxy.length)];
        const finalTmp = tmp[Math.floor(Math.random() * tmp.length)];

        // Compute actual BMI from height/weight inputs
        const heightMeters = parseFloat(heightInput) / 100;
        const weightKg = parseFloat(weightInput);
        let finalBmi = 22.5;
        if (heightMeters > 0 && weightKg > 0) {
          finalBmi = Math.round((weightKg / (heightMeters * heightMeters)) * 10) / 10;
        }

        // Evaluate standard diagnostic tags
        let finalStatus: 'optimal' | 'warning' | 'critical' = 'optimal';
        let assessment = '';

        if (finalSys > 130 || finalDia > 85 || finalTmp > 99.5) {
          finalStatus = 'warning';
          assessment = 'Vitals indicate mild pressure/temperature elevation. We recommend a general physician follow-up consultation within 24 hours to track trends.';
        } else if (finalHr < 60 || finalOxy < 95) {
          finalStatus = 'critical';
          assessment = 'Vitals indicate low blood oxygen markers or mild bradycardia pulse register. Please coordinate with an expert medic or seek onsite checkup support.';
        } else {
          finalStatus = 'optimal';
          assessment = 'Your primary vitals are in optimal clinical safety threshold range. Maintain proper hydration and track regularly to safeguard health!';
        }

        setVitals({
          heartRate: finalHr,
          bloodPressureSys: finalSys,
          bloodPressureDia: finalDia,
          bloodOxygen: finalOxy,
          bodyTemperature: finalTmp,
          bmi: finalBmi,
          healthAssessment: assessment,
          status: finalStatus
        });
        
        setScanState('complete');
      }
    }, intervalTime);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#D7E7EA] overflow-hidden shadow-lg flex flex-col md:flex-row min-h-[500px] lg:min-h-[540px]" id="kiosk-simulator-panel">
      
      {/* Kiosk Body Visual mockup */}
      <div className="w-full md:w-[34%] bg-[#072033] p-5 lg:p-6 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        
        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-radial from-cyan-400 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <span className="p-1 px-2.5 bg-white/10 rounded-full text-[10px] w-fit font-bold font-mono text-[#FABC09] tracking-widest uppercase">
            FLAGSHIP DESIGN
          </span>
          <h4 className="font-heading font-extrabold text-[#FABC09] text-xl tracking-tight uppercase">
            Linear Actuator Model
          </h4>
          <p className="text-xs text-[#D7E7EA] font-sans">
            Designed to bring digital remote clinics to hospitals, factories, corporate estates, & NGO community centers.
          </p>
        </div>

        {/* Vector Drawing of Kiosk Cabinet */}
        <div className="relative my-8 flex justify-center items-center h-52">
          {/* Main frame cabinet */}
          <div className="relative w-28 h-48 bg-[#0B1633] rounded-t-3xl border-3 border-[#CBD5E1] shadow-xl flex flex-col items-center">
            
            {/* Top header camera hole */}
            <div className="w-2 h-2 bg-black rounded-full mt-2 border border-slate-700"></div>

            {/* Simulated Glass Touch Screen */}
            <div className="w-[84%] h-24 bg-sky-950 mt-3 rounded-lg border-2 border-[#FABC09]/70 relative overflow-hidden flex flex-col justify-between p-1 select-none">
              {/* LED status indicator */}
              <div className="flex justify-between items-center text-[7px] font-mono text-cyan-400 px-1">
                <span>ON: REACH_AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              
              {/* Visual heartbeat chart projection */}
              <svg viewBox="0 0 100 40" className="w-full h-10 text-emerald-400 opacity-80" stroke="currentColor" fill="none">
                <path d="M 0 20 Q 20 20 40 20 L 45 5 L 48 35 L 52 20 L 70 20 Q 85 20 100 20" strokeWidth="1.5" />
              </svg>

              <div className="text-center text-[7px] font-bold tracking-wider text-[#FABC09] uppercase">
                {scanState === 'scanning' ? 'ANALYZING WIDGET' : 'SYSTEM READY'}
              </div>
            </div>

            {/* Mid Desk section for Thermal Printer slot */}
            <div className="w-[90%] h-4 bg-slate-300 border-b border-slate-500 rounded mt-3 flex justify-around items-center px-2">
              <span className="w-10 h-0.5 bg-black"></span>
              <span className="w-2 h-1 bg-green-600 rounded-sm"></span>
            </div>

            {/* Bottom Cabinet with Golden caduceus logo emblem */}
            <div className="w-full flex-1 flex items-center justify-center mt-2 relative">
              <div className="w-8 h-8 rounded-full bg-[#071201] border border-[#FABC09]/50 flex items-center justify-center">
                <span className="text-[7px] font-bold text-[#FABC09]">SRH</span>
              </div>
            </div>
            
            {/* Base Stand Plate */}
            <div className="absolute bottom-0 w-36 h-2 bg-[#94A3B8] rounded-t-sm -mb-2 border border-slate-400"></div>
          </div>

          {/* Interactive touch indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center h-full pointer-events-none">
            <span className="w-12 h-12 rounded-full border border-[#FABC09]/30 bg-[#FABC09]/10 animate-ping"></span>
          </div>
        </div>

        <div className="relative z-10 p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] space-y-1">
          <span className="font-extrabold text-[#FABC09] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> ASSISTED SCREENING WORKFLOW
          </span>
          <p className="text-slate-300 leading-relaxed">
            Guided vitals preview for screening, consultation support, and service booking coordination.
          </p>
        </div>
      </div>

      {/* Simulator Interface screen */}
      <div className="flex-1 p-5 md:p-6 lg:p-7 flex flex-col justify-between" id="kiosk-simulator-panel-screen">
        <div>
          <div className="flex justify-between items-center border-b border-[#D7E7EA] pb-3 mb-5">
            <div>
              <span className="text-xs text-[#0E7490] font-bold uppercase tracking-wider font-mono">Interactive Vitals Preview</span>
              <h5 className="font-heading font-extrabold text-[#0B1633] text-lg">Digital Clinical Vitals Screen</h5>
            </div>
            <button
              onClick={() => {
                setScanState('idle');
                setScanProgress(0);
                setVitals({
                  heartRate: 72,
                  bloodPressureSys: 118,
                  bloodPressureDia: 78,
                  bloodOxygen: 98,
                  bodyTemperature: 98.4,
                  bmi: 23.0,
                  healthAssessment: 'Please run the vital checkup scan for assessment.',
                  status: 'optimal'
                });
              }}
              className="p-1 px-3 border border-[#D7E7EA] rounded-full hover:bg-bg-light transition-all text-[11px] font-bold flex items-center gap-1 text-text-navy"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Core Measurement Display Block */}
          <div className="space-y-6">
            
            {/* Target input fields */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-bg-soft rounded-2xl border border-[#D7E7EA]/60">
              <div>
                <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightInput}
                  disabled={scanState === 'scanning'}
                  onChange={(e) => setHeightInput(e.target.value)}
                  placeholder="170"
                  className="w-full px-3 py-1.5 border border-[#D7E7EA] rounded-xl text-xs bg-white text-text-navy font-bold focus:outline-none focus:ring-1 focus:ring-[#0E7490]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-text-navy uppercase tracking-wider mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightInput}
                  disabled={scanState === 'scanning'}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="70"
                  className="w-full px-3 py-1.5 border border-[#D7E7EA] rounded-xl text-xs bg-white text-text-navy font-bold focus:outline-none focus:ring-1 focus:ring-[#0E7490]"
                />
              </div>
            </div>

            {/* Active ECG wave visualizer */}
            <div className="h-20 bg-slate-950 rounded-2xl flex flex-col justify-between p-2 relative overflow-hidden shadow-inner border-2 border-slate-800">
              <div className="flex justify-between items-center text-[10px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> Live ECG Simulator
                </span>
                <span>{scanState === 'scanning' ? 'ACTIVE screening probe...' : 'SCREEN STANDBY'}</span>
              </div>
              
              <svg viewBox="0 0 360 100" className="w-full h-12 text-emerald-400 opacity-90" stroke="currentColor" strokeWidth="2.5" fill="none">
                <path d={ecgPath} strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div className="flex justify-between items-center text-[9px] text-[#FABC09] font-mono">
                <span>REACH_AI INTEGRATED SENSING</span>
                <span>120Hz HIGH-FRAME RATE</span>
              </div>
            </div>

            {/* Quick Metrics display grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Heart rate */}
              <div className="p-3 bg-white border border-[#D7E7EA] rounded-xl flex items-start gap-3 min-h-[74px]">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] text-text-light font-bold">HR PULSE</span>
                  <span className="text-sm font-heading font-extrabold text-text-navy">
                    {scanState === 'scanning' ? 'Scanning' : `${vitals.heartRate} bpm`}
                  </span>
                </div>
              </div>

              {/* BP */}
              <div className="p-3 bg-white border border-[#D7E7EA] rounded-xl flex items-start gap-3 min-h-[74px]">
                <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] text-text-light font-bold">BLOOD PRESSURE</span>
                  <span className="text-sm font-heading font-extrabold text-text-navy">
                    {scanState === 'scanning' ? 'Inflat...' : `${vitals.bloodPressureSys}/${vitals.bloodPressureDia} mmHg`}
                  </span>
                </div>
              </div>

              {/* SpO2 */}
              <div className="p-3 bg-white border border-[#D7E7EA] rounded-xl flex items-start gap-3 min-h-[74px]">
                <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] text-text-light font-bold">BLOOD SpO2</span>
                  <span className="text-sm font-heading font-extrabold text-text-navy">
                    {scanState === 'scanning' ? 'Calib...' : `${vitals.bloodOxygen}%`}
                  </span>
                </div>
              </div>

              {/* Temperature */}
              <div className="p-3 bg-white border border-[#D7E7EA] rounded-xl flex items-start gap-3 min-h-[74px]">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[9px] text-text-light font-bold">TEMP SCAN</span>
                  <span className="text-sm font-heading font-extrabold text-text-navy">
                    {scanState === 'scanning' ? 'Scanning' : `${vitals.bodyTemperature} °F`}
                  </span>
                </div>
              </div>

            </div>

            {/* Progress Bar while scanning */}
            {scanState === 'scanning' && (
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 animate-pulse-slow">
                <div className="flex justify-between items-center text-xs text-[#0a567a] font-semibold mb-2 font-mono">
                  <span>{scanStep}</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-sky-200/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-teal transition-all duration-100 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Post scan Assessment results banner */}
            {scanState === 'complete' && (
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all duration-200 ${
                vitals.status === 'optimal' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50/70 border-amber-200 text-amber-800'
              }`}>
                {vitals.status === 'optimal' ? (
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-extrabold text-[#0B1633] text-sm uppercase">Assessment AI summary:</span>
                    <span className={`text-[10px] font-bold p-0.5 px-2 rounded-full uppercase font-mono ${
                      vitals.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {vitals.status === 'optimal' ? 'OPTIMAL HEALTH' : 'ATTENTION VALUE'}
                    </span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed font-sans">{vitals.healthAssessment}</p>
                  
                  {/* Health tips based on metrics */}
                  <div className="pt-2 text-[10px] font-mono text-text-light grid grid-cols-2 gap-2 mt-1 border-t border-slate-200/50">
                    <span>Computed BMI: <strong>{vitals.bmi}</strong> kg/m²</span>
                    <span>Status: <strong>{vitals.bmi >= 25 ? 'Overweight Risk' : vitals.bmi < 18.5 ? 'Underweight' : 'Ideal Range'}</strong></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Action footer */}
        <div className="mt-6 pt-5 border-t border-[#D7E7EA] flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-text-light font-medium">
            <BrainCircuit className="w-4 h-4 text-primary-teal" />
            <span>Try dynamic vitals simulator before you book.</span>
          </div>

          <button
            onClick={handleStartScan}
            disabled={scanState === 'scanning'}
            className="w-full xl:w-auto p-3.5 px-6 rounded-full bg-primary-teal hover:bg-[#072033] text-white font-heading font-extrabold text-xs tracking-wider transition-all select-none shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#FABC09] shrink-0" />
            {scanState === 'scanning' ? 'Vital Scan actively in progress...' : 'Measure Simulated Vitals'}
          </button>
        </div>

      </div>
    </div>
  );
}
