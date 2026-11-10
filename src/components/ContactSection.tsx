import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { collegeInfo } = useApp();
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'BSN Admissions Query',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', subject: 'BSN Admissions Query', message: '' });
      setInquirySent(false);
    }, 5000);
  };

  const whatsappLink = `https://wa.me/${collegeInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Moomal%20College%20of%20Nursing,%20I%20want%20information%20regarding%20BSN%20Admissions`;

  return (
    <section className="py-12 px-4 md:px-8 bg-slate-50">
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
          <span className="text-amber-700 font-semibold">Contact Us</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-1">
            Get in Touch
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            Contact Admissions & Campus Office
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Reach out to our admissions advisors, visit our Latifabad campus, or connect instantly over WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Cards Info (Map removed as explicitly instructed) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Campus Address */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Campus Postal Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {collegeInfo.address}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{collegeInfo.city}</p>
                </div>
              </div>
            </div>

            {/* Direct Phone Lines */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-bold text-slate-900">Telephone Lines & Cell Contact</h3>
                  <div className="mt-2 space-y-1.5 text-xs text-slate-700 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Primary Cell:</span>
                      <a href={`tel:${collegeInfo.phonePrimary}`} className="font-bold text-slate-900 hover:text-amber-700">
                        {collegeInfo.phonePrimary}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Secondary Cell:</span>
                      <a href={`tel:${collegeInfo.phoneSecondary}`} className="font-bold text-slate-900 hover:text-amber-700">
                        {collegeInfo.phoneSecondary}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-sans">Campus Landline:</span>
                      <a href={`tel:${collegeInfo.landline}`} className="font-bold text-slate-900 hover:text-amber-700">
                        {collegeInfo.landline}
                      </a>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-500 font-sans">Admission Desk:</span>
                      <span className="text-slate-900 font-bold">{collegeInfo.admissionPhone1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email & Digital Inquiries */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Official Electronic Mail</h3>
                  <p className="text-xs text-slate-500 mt-1">Official admission correspondence and student inquiries:</p>
                  <a
                    href={`mailto:${collegeInfo.email}`}
                    className="text-xs font-semibold text-amber-700 hover:underline block mt-1"
                  >
                    {collegeInfo.email}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Website: {collegeInfo.website}</p>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Action Card */}
            <div className="bg-emerald-800 text-white rounded-2xl p-6 shadow-xs flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold block">
                  Instant Messaging
                </span>
                <h4 className="font-serif text-base font-bold text-white mt-0.5">
                  Chat with Admissions on WhatsApp
                </h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Quick answers to eligibility, admissions, and prospectus queries.
                </p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Chat Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
              Send an Online Inquiry
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Our academic admission desk will respond promptly via email or phone call.
            </p>

            {inquirySent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-emerald-900">Inquiry Submitted Successfully</h3>
                <p className="text-xs text-emerald-800 mt-1">
                  Thank you! An admissions representative will contact you shortly on your provided telephone number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sana Ahmed"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-XXXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    >
                      <option value="BSN Admissions Query">BSN Admissions 2025-2026</option>
                      <option value="Admission Requirements">Admission Requirements & Criteria</option>
                      <option value="Hostel & Transport">Campus Facilities</option>
                      <option value="Clinical Rotations">Clinical Rotations & Hospitals</option>
                      <option value="Other">Other Academic Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your query or background details..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
