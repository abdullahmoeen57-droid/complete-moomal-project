import React from 'react';
import { AffiliationBanner } from './AffiliationBanner';
import {
  Compass,
  Target,
  Award,
  CheckCircle2,
  BookOpen,
  MapPin,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  History,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 md:px-8 border-b border-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto text-center max-w-3xl"
        >
          {/* Page Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-3">
            <button
              onClick={() => {
                window.location.hash = 'home';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-amber-400 font-semibold">About Us</span>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
            Institutional Profile & Heritage
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            About Moomal College of Nursing
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Formed under the umbrella of <strong>Moomal Education Private Limited (Moomal Group of Colleges)</strong> to fulfill the growing demand for healthcare services in Sindh, providing quality nursing education affiliated with <strong>LUMHS Jamshoro</strong> and recognized by the <strong>pakistan nursing and midwifery council(PNMC)</strong>.
          </p>
        </motion.div>
      </section>

      {/* Statutory Recognition */}
      <AffiliationBanner />

      {/* Historical Context: Welcome to Hyderabad City (From Prospectus Page 14) */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Landmark className="w-4 h-4" />
            
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
                Welcome to Hyderabad City (Bird City)
              </h2>
              <div className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-3 font-serif">
                <p>
                  Hyderabad is one of those cities where the magnetic pull of nostalgia can be felt to a maximum, owing to the ever glorious landmarks of a bygone era. Apart from its modern avenues, its rich history dates back to when Kalhora ruler <strong>Mian Ghulam Shah Kalhoro</strong> established it as the capital of his empire in 1768.
                </p>
                <p>
                  Today, Hyderabad acts as an educational and clinical crossroads connecting diverse communities across Sindh. Situated in Latifabad Unit #8 on Auto Bhan Road, Moomal College of Nursing & Allied Health Sciences provides accessible, state-of-the-art medical training to incoming students.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                At a Glance
              </span>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Established Under:</span>
                  <span className="font-semibold text-slate-900">Moomal Education (Pvt) Ltd</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Group:</span>
                  <span className="font-semibold text-slate-900">Moomal Group of Colleges</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-900">Auto Bhan Road, Latifabad</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex justify-between">
                  <span className="text-slate-500">Curriculum:</span>
                  <span className="font-semibold text-amber-700">LUMHS Jamshoro Integrated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Objectives Grid */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Our Future Horizon
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">Institutional Vision</h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-serif italic">
                "Be an innovative leader in developing healthcare professionals with world class profile in research, education and patient care."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Approved Vision Document 
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Our Core Mandate
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">Mission Statement</h2>
              <ul className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Providing evidence-based nursing education in a professional environment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Developing, testing, and disseminating nursing knowledge in health sciences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Demonstrating excellence in nursing practice embracing equity and culturally effective patient care.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Healthcare Education Mission
            </div>
          </div>

          {/* Core Values as per PNMC */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Statutory Standards
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">PNC Core Values</h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Pakistan Nursing and Midwifery Council(PNMC) foundational pillars:
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium">
                  <strong>Unity:</strong> Within the profession and with interdisciplinary medical teams.
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium">
                  <strong>Faith:</strong> In the capacity of nursing to elevate public health and welfare.
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium">
                  <strong>Discipline:</strong> To educate ethical, competent bedside practitioners.
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              PNMC Vision Document Benchmark
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Objectives */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Academic Commitments
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
              Institutional Objectives 
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Outlined in accordance with Pakistan Nursing Council and LUMHS curriculum standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Competent & Therapeutic Care:</strong>
                Educate and prepare skillful nurses able to provide competent, safe, and therapeutic care to bedside patients.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Elevating Bedside Nursing:</strong>
                Substantially improve the overall quality, professionalism, and hygiene standards of bedside nurses in Pakistan.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Dual Clinical & Community Preparedness:</strong>
                Equip nurses to meet both acute inpatient hospital demands and community outreach preventive healthcare needs.
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">Mentorship & Lifelong Learning:</strong>
                Instill self-evaluation, clinical leadership, research mindset, and ongoing professional development in our graduates.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
