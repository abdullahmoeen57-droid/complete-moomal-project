import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsEvent } from '../types';
import { Search, Calendar, Pin, ArrowRight, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewsEventsView: React.FC = () => {
  const { newsEvents } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalNews, setActiveModalNews] = useState<NewsEvent | null>(null);

  const publishedNews = newsEvents.filter(n => n.isPublished);

  const filteredNews = publishedNews.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q)
    );
  });

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
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
          <span className="text-amber-700 font-semibold">News & Events</span>
        </div>

        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1">
            Official Notices & Circulars
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            News & Campus Events
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Official notices, circulars, and announcements from Moomal College of Nursing & Allied Health Sciences.
          </p>
        </div>

        {/* Search Bar (Only shown if notices exist) */}
        {publishedNews.length > 0 && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notices and announcements..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 shadow-xs transition-all"
              />
            </div>
          </div>
        )}

        {/* News Grid (Shown when notices exist) */}
        {publishedNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, idx) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.05, 0.3),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                        Latest Update
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {item.image && <img src={item.image} alt={item.title} loading="lazy" className="w-full h-44 object-cover rounded-xl mb-4 border border-slate-100" />}

                    {item.isPinned && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 mb-2">
                        <Pin className="w-3.5 h-3.5" />
                        <span>Featured Notice</span>
                      </div>
                    )}

                    <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">MCNAHS Circular</span>
                    <button
                      onClick={() => setActiveModalNews(item)}
                      className="text-xs font-semibold text-slate-900 hover:text-amber-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State when no news exist */}
        {publishedNews.length === 0 && (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
              No News or Events Published Yet
            </h3>
            <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Official circulars and notices will appear here once posted by the administration via the portal.
            </p>
          </div>
        )}

        {/* Modal Viewer */}
        {activeModalNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
              <button
                onClick={() => setActiveModalNews(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-900 p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Official Notice
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeModalNews.date}
                </span>
              </div>

              {activeModalNews.image && <img src={activeModalNews.image} alt={activeModalNews.title} className="w-full max-h-64 object-cover rounded-xl mb-4" />}
              <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mt-2 mb-4 leading-snug">
                {activeModalNews.title}
              </h2>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 mb-4 font-medium italic">
                {activeModalNews.summary}
              </div>

              <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-3 mb-6 whitespace-pre-line">
                {activeModalNews.content}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Moomal College of Nursing Administration</span>
                <button
                  onClick={() => setActiveModalNews(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
