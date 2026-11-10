
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FacultyMember } from '../types';
import {
  Search,
  GraduationCap,
  User,
  ChevronRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FacultyView: React.FC = () => {
  const { faculty } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalMember, setActiveModalMember] =
    useState<FacultyMember | null>(null);

  // Faculty Categories
  const categories = [
    { id: 'all', label: 'All Faculty Members' },
    { id: 'nursing', label: 'Nursing Faculty & Instructors' },
    { id: 'basic_sciences', label: 'Pharmacology & Medical Sciences' },
    { id: 'humanities', label: 'Allied Humanities & IT' },
  ];

  // Department-based Category Filtering
  const filteredFaculty = faculty.filter(member => {
    const query = searchQuery.toLowerCase().trim();

    const department = (member.department || '')
      .toLowerCase()
      .trim();

    const name = (member.name || '').toLowerCase();
    const designation = (member.designation || '').toLowerCase();

    // Search Filtering
    const matchesSearch =
      name.includes(query) ||
      designation.includes(query) ||
      department.includes(query);

    // Automatic Department Category Filtering
    let matchesCategory = false;

    if (selectedCategory === 'all') {
      // Show everyone, including members with empty departments
      matchesCategory = true;
    }

    else if (selectedCategory === 'nursing') {
      matchesCategory = department.includes('nursing');
    }

    else if (selectedCategory === 'basic_sciences') {
      matchesCategory =
        department.includes('pharmacology') ||
        department.includes('medical sciences');
    }

    else if (selectedCategory === 'humanities') {
      matchesCategory =
        department.includes('microbiology') ||
        department === 'it' ||
        department.includes('information technology') ||
        department.includes('humanities');
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
          <button
            onClick={() => {
              window.location.hash = 'home';
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            className="hover:text-amber-800 transition-colors cursor-pointer"
          >
            Home
          </button>

          <span>/</span>

          <span className="text-amber-700 font-semibold">
            Our Faculty
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1">
            Academic Excellence & Mentorship
          </p>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Teaching Faculty & Instructors
          </h1>

          <p className="text-sm text-slate-600 mt-2">
            Meet the distinguished educators and clinical nursing instructors dedicated to cultivating ethical, competent bedside healthcare practitioners.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-xs mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search faculty by name or subject..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 transition-all"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">

            {filteredFaculty.map((member, idx) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.05, 0.35),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Faculty Photo & Information */}
                  <div className="flex items-start gap-4 mb-4">

                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-16 h-18 object-cover rounded-xl border border-slate-200 shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-16 h-18 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-700 shrink-0">
                        <User className="w-7 h-7 text-slate-400 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          MCNAHS
                        </span>
                      </div>
                    )}

                    <div className="min-w-0">
                      {member.department?.trim() && (
                        <span className="text-[11px] font-semibold text-amber-700 block uppercase tracking-wider truncate">
                          {member.department}
                        </span>
                      )}

                      <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                        {member.name}
                      </h3>

                      <p className="text-xs font-medium text-slate-600 mt-0.5">
                        {member.designation}
                      </p>
                    </div>
                  </div>

                  {/* Qualification */}
                  {member.qualification?.trim() && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-600 shrink-0" />

                      <span className="truncate">
                        {member.qualification}
                      </span>
                    </div>
                  )}

                  {/* Bio */}
                  {member.bio?.trim() && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}
                </div>

                {/* Profile Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setActiveModalMember(member)}
                    className="text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}

          </AnimatePresence>
        </div>

        {/* No Faculty Found */}
        {filteredFaculty.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">
              No faculty members found matching your search.
            </p>
          </div>
        )}

        {/* Member Profile Modal */}
        {activeModalMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setActiveModalMember(null)}
          >
            <div
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >

              {/* Close Icon */}
              <button
                onClick={() => setActiveModalMember(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-900 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Faculty Information */}
              <div className="flex items-center gap-4 mb-4">

                {activeModalMember.photoUrl ? (
                  <img
                    src={activeModalMember.photoUrl}
                    alt={activeModalMember.name}
                    className="w-20 h-24 object-cover rounded-xl border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-20 h-24 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                    <User className="w-8 h-8" />
                  </div>
                )}

                <div>
                  {activeModalMember.department?.trim() && (
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                      {activeModalMember.department}
                    </span>
                  )}

                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {activeModalMember.name}
                  </h3>

                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {activeModalMember.designation}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              {(activeModalMember.qualification?.trim() ||
                activeModalMember.bio?.trim()) && (
                <div className="space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-4">

                  {/* Academic Credentials */}
                  {activeModalMember.qualification?.trim() && (
                    <div>
                      <span className="text-slate-400 block font-medium">
                        Academic Credentials:
                      </span>

                      <span className="font-semibold text-slate-900">
                        {activeModalMember.qualification}
                      </span>
                    </div>
                  )}

                  {/* Professional Bio */}
                  {activeModalMember.bio?.trim() && (
                    <div>
                      <span className="text-slate-400 block font-medium">
                        Professional Profile & Bio:
                      </span>

                      <p className="mt-1 leading-relaxed text-slate-600">
                        {activeModalMember.bio}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* Close Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 text-right">
                <button
                  onClick={() => setActiveModalMember(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

