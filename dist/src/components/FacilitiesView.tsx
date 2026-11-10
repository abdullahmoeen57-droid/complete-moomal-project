import React from 'react';
import { BookOpen, Coffee, CheckCircle, Clock, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';
import { facilitiesData } from '../data/initialData';

export const FacilitiesView: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with gentle fade */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Page Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
            <button
              onClick={() => {
                window.location.hash = 'home';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-800 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-amber-700 font-semibold">Campus Life</span>
          </div>

          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1">
            Student Life & Learning Environment
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Campus Facilities & Infrastructure
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Moomal College of Nursing & Allied Health Sciences provides modern academic amenities including an extensive health sciences library and a hygienic student cafeteria.
          </p>
        </motion.div>

        {/* Facilities Spotlight: Library & Cafeteria */}
        <div className="space-y-12">
          {/* 1. Medical Library */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 items-center"
          >
            <div className="p-8 md:p-12 order-2 lg:order-1">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Learning Resource Center
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Medical & Nursing Sciences Library
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                Equipped with the prescribed LUMHS nursing syllabus textbooks, international nursing periodicals, medical references, and dedicated computer stations for literature search and research writing.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Curated collection of BSN textbooks and clinical manuals</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Digital research terminals with access to medical databases</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quiet individual reading carrels and discussion tables</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Full-time librarian assistance for student academic projects</span>
                </div>
              </div>
            </div>

            <div className="h-72 sm:h-96 lg:h-full order-1 lg:order-2 overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/college_library_hall_1794147850116.jpg"
                alt="Moomal College Medical Library Reading Hall"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* 2. Student Cafeteria */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 items-center"
          >
            <div className="h-72 sm:h-96 lg:h-full overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/campus_student_cafeteria_1794147849871.jpg"
                alt="Moomal College Student Cafeteria and Dining Hub"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Campus Dining & Social Hub
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Student Cafeteria & Lounge
              </h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                A clean, hygienic dining space offering fresh meals, beverages, and snacks in a warm collegiate setting. Designed for relaxation, peer bonding, and informal study discussions between clinical lectures.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Strict hygiene audits and food safety compliance</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Nutritious breakfast, lunch, tea, and snack selections</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Comfortable seating layout for students and faculty members</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Subsidized, student-friendly pricing</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clinical Affiliations Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <HeartPulse className="w-4 h-4" />
              <span>Affiliated Clinical Teaching Hospitals</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-2">
              Clinical Bedside Rotations in Latifabad Hyderabad
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Moomal College of Nursing students complete mandatory bedside clinical training at our partner teaching healthcare institutions:  <strong>Civil Hospital</strong>, and <strong>Shah Bhittai Govt. Hospital</strong>.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-xs font-semibold rounded-lg text-slate-200">
              Supervised Ward Rotations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

