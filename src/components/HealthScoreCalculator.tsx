import React, { useState } from 'react';
import { ArrowRight, HeartPulse } from 'lucide-react';
import { ServiceType } from '../types';

interface ScoreCalculatorProps {
  onSelectRecommendedService: (service: ServiceType) => void;
}

export default function HealthScoreCalculator({ onSelectRecommendedService }: ScoreCalculatorProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [lifestyleRating, setLifestyleRating] = useState<number>(3); // 1-5 scale
  const [symptomSeverity, setSymptomSeverity] = useState<'none' | 'mild' | 'chronic'>('none');
  const [screeningFrequency, setScreeningFrequency] = useState<'never' | 'yearly' | 'monthly'>('never');
  const [recipient, setRecipient] = useState<'self' | 'elderly' | 'employee' | 'village'>('self');

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep((currentStep + 1) as any);
  };

  const calculateRecommendation = () => {
    let score = 0;
    
    // Core weight calculator parameters
    if (symptomSeverity === 'chronic') score += 5;
    if (symptomSeverity === 'mild') score += 2;
    if (screeningFrequency === 'never') score += 3;
    if (lifestyleRating <= 2) score += 2;
    if (recipient === 'elderly') score += 4;
    
    let recommendation: {
      packageId: ServiceType;
      packageName: string;
      priority: 'Routine Check' | 'High Attention' | 'Preventative Action';
      desc: string;
    } = {
      packageId: ServiceType.VITAL_SCREENING,
      packageName: 'Vital Screening',
      priority: 'Routine Check',
      desc: 'You have low active symptom markers. We recommend a simple baseline vital check to capture your healthy trends.'
    };

    if (score >= 8 || recipient === 'elderly' || symptomSeverity === 'chronic') {
      recommendation = {
        packageId: ServiceType.SPECIALIST,
        packageName: 'Specialist Consultation',
        priority: 'High Attention',
        desc: 'Vitals require thorough evaluation. A digital diagnostic review with an expert specialist physician is highly recommended.'
      };
    } else if (score >= 4 || symptomSeverity === 'mild') {
      recommendation = {
        packageId: ServiceType.VITALS_CONSULTATION,
        packageName: 'Vitals + Consultation',
        priority: 'Preventative Action',
        desc: 'Based on your indications, we recommend a secondary general consultation package to assess and guide your healthcare routine.'
      };
    }

    return recommendation;
  };

  const result = calculateRecommendation();

  return (
    <div className="bg-[#EEF8FA] rounded-3xl border border-[#D7E7EA] p-6 md:p-8 flex flex-col justify-between min-h-[440px]" id="health-calculator-panel">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HeartPulse className="w-5 h-5 text-primary-teal" />
          <span className="text-xs text-[#0e7490] font-bold uppercase tracking-widest font-mono">Screening Guidance Estimator</span>
        </div>

        <h4 className="font-heading font-extrabold text-[#0B1633] text-xl tracking-tight mb-2">
          Screening Requirement Helper
        </h4>
        <p className="text-xs text-text-muted mb-6">
          Answer a few quick questions to identify whether you may need screening support or consultation coordination.
        </p>

        {currentStep <= 3 && (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] font-bold font-mono text-text-light uppercase mb-1">
              <span>Diagnostic Steps</span>
              <span>{currentStep} / 3</span>
            </div>
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-teal transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1: Symptom check */}
        {currentStep === 1 && (
          <div className="space-y-4" id="calc-step-1">
            <p className="text-xs font-bold text-text-navy uppercase tracking-wider">
              1. Do you experience any recurring vitals changes (shortness of breath, mild fatigue, pressure fluctuations)?
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => { setSymptomSeverity('none'); handleNextStep(); }}
                className={`p-3 text-left text-xs font-bold rounded-xl border transition-all ${
                  symptomSeverity === 'none' 
                    ? 'border-primary-teal bg-white text-[#04496D] ring-1 ring-primary-teal' 
                    : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                No active concerns • Feel perfectly fit
              </button>
              <button
                onClick={() => { setSymptomSeverity('mild'); handleNextStep(); }}
                className={`p-3 text-left text-xs font-bold rounded-xl border transition-all ${
                  symptomSeverity === 'mild' 
                    ? 'border-primary-teal bg-white text-[#04496D] ring-1 ring-primary-teal' 
                    : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                Mild concerns • Rare fatigue, dynamic stress layers
              </button>
              <button
                onClick={() => { setSymptomSeverity('chronic'); handleNextStep(); }}
                className={`p-3 text-left text-xs font-bold rounded-xl border transition-all ${
                  symptomSeverity === 'chronic' 
                    ? 'border-primary-teal bg-white text-[#04496D] ring-1 ring-primary-teal' 
                    : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                Persistent indicators • Active blood sugar or blood pressure fluctuations
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Demographic check */}
        {currentStep === 2 && (
          <div className="space-y-4" id="calc-step-2">
            <p className="text-xs font-bold text-text-navy uppercase tracking-wider">
              2. Who is this screening or service enquiry intended for?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setRecipient('self'); handleNextStep(); }}
                className={`p-3.5 text-center text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                  recipient === 'self' ? 'border-[#04496D] bg-white text-[#04496D] ring-1 ring-primary-teal' : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                For Myself
              </button>
              <button
                onClick={() => { setRecipient('elderly'); handleNextStep(); }}
                className={`p-3.5 text-center text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                  recipient === 'elderly' ? 'border-[#04496D] bg-white text-[#04496D] ring-1 ring-primary-teal' : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                For Elderly Parents
              </button>
              <button
                onClick={() => { setRecipient('employee'); handleNextStep(); }}
                className={`p-3.5 text-center text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                  recipient === 'employee' ? 'border-[#04496D] bg-white text-[#04496D] ring-1 ring-primary-teal' : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                Company Employees
              </button>
              <button
                onClick={() => { setRecipient('village'); handleNextStep(); }}
                className={`p-3.5 text-center text-xs font-bold rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                  recipient === 'village' ? 'border-[#04496D] bg-white text-[#04496D] ring-1 ring-primary-teal' : 'bg-white hover:bg-bg-soft border-slate-200 text-text-navy'
                }`}
              >
                NGO / Rural Camp
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Last Screening frequency */}
        {currentStep === 3 && (
          <div className="space-y-4" id="calc-step-3">
            <p className="text-xs font-bold text-text-navy uppercase tracking-wider">
              3. When was the last time you took a full vital checkup?
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => { setScreeningFrequency('never'); setCurrentStep(4); }}
                className="p-3 bg-white hover:bg-bg-soft border border-slate-200 text-left text-xs font-bold rounded-xl text-text-navy transition-all"
              >
                Never measured basic vitals before / Over a year
              </button>
              <button
                onClick={() => { setScreeningFrequency('yearly'); setCurrentStep(4); }}
                className="p-3 bg-white hover:bg-bg-soft border border-slate-200 text-left text-xs font-bold rounded-xl text-text-navy transition-all"
              >
                Took a health checkup in the last 6-12 months
              </button>
              <button
                onClick={() => { setScreeningFrequency('monthly'); setCurrentStep(4); }}
                className="p-3 bg-white hover:bg-bg-soft border border-slate-200 text-left text-xs font-bold rounded-xl text-text-navy transition-all"
              >
                Regular monthly vital track user
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Calculated results visual output */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in" id="calc-step-4_result">
            <div className="p-4 bg-white rounded-2xl border border-[#D7E7EA] space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-light font-mono">Calculated priority index</span>
                <span className={`text-[10px] font-extrabold p-0.5 px-2 rounded-md ${
                  result.priority === 'High Attention' 
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : result.priority === 'Preventative Action'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  {result.priority}
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] text-text-light font-bold uppercase tracking-wider block">Recommended check:</span>
                <h5 className="font-heading font-extrabold text-[#0B1633] text-base">{result.packageName}</h5>
                <p className="text-xs text-text-muted leading-relaxed font-medium">{result.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#D7E7EA]/50">
                <span className="text-[10px] font-bold text-text-light uppercase">Service details available on enquiry</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="p-2 px-4 border border-[#D7E7EA] rounded-full hover:bg-white text-[11px] font-bold text-text-navy transition-all shrink-0"
              >
                Re-take check
              </button>

              <button
                onClick={() => onSelectRecommendedService(result.packageId)}
                className="flex-1 p-2.5 bg-primary-teal hover:bg-primary-teal/90 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                Contact for Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {currentStep < 4 && (
        <div className="text-right mt-4">
          <button
            onClick={() => setCurrentStep((currentStep - 1) as any)}
            disabled={currentStep === 1}
            className="text-[11px] text-[#0e7490] font-bold hover:underline disabled:opacity-30 disabled:no-underline"
          >
            ← Previous Question
          </button>
        </div>
      )}
    </div>
  );
}
