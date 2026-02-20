'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, School, User, Phone, MapPin, Mail, Loader2, Shield } from 'lucide-react';

interface SchoolSubscriptionFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SchoolSubscriptionForm({ isOpen, onClose }: SchoolSubscriptionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate data processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to Djamo Payment Link
        window.location.href = 'https://pay.djamo.com/ot1f3';

        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-brand-navy border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                        >
                            {/* Header */}
                            <div className="bg-brand-dark p-6 border-b border-white/5 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Inscription Établissement</h3>
                                    <p className="text-sm text-gray-400">Veuillez renseigner les informations de l'école.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg hover:bg-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">

                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Nom de l'École</label>
                                        <div className="relative">
                                            <School className="absolute left-3 top-3 w-5 h-5 text-brand-orange" />
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                placeholder="ex: Groupe Scolaire Excellence"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Responsable</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                    placeholder="Nom & Prénoms"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Contact WhatsApp</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                    placeholder="07 07 ..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email (Pour les codes d'accès)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                placeholder="direction@ecole.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Code École</label>
                                            <div className="relative">
                                                <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                    placeholder="Obligatoire"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Pays</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <select
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all appearance-none"
                                                >
                                                    <option value="CI">Côte d'Ivoire</option>
                                                    <option value="SN">Sénégal</option>
                                                    <option value="BF">Burkina Faso</option>
                                                    <option value="ML">Mali</option>
                                                    <option value="TG">Togo</option>
                                                    <option value="BJ">Bénin</option>
                                                    <option value="NE">Niger</option>
                                                    <option value="Other">Autre</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Ville / Commune</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white placeholder-gray-600 outline-none transition-all"
                                                placeholder="ex: Abidjan, Cocody"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" /> Traitement...
                                            </>
                                        ) : (
                                            <>
                                                Continuer vers le Paiement <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    <p className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                                        <Shield className="w-3 h-3" /> Redirection sécurisée vers Djamo Pay
                                    </p>
                                </div>

                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
