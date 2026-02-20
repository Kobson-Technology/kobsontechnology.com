'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';

export default function QuoteForm() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setFormStatus('success');

        // Reset form after success
        // e.currentTarget.reset(); 
    }

    return (
        <section id="quote" className="py-24 bg-brand-navy/20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Demandez un Devis <span className="text-brand-orange">Gratuit</span></h2>
                    <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto mb-8">
                        Parlez-nous de votre projet. Nous vous répondrons sous 24h avec une proposition adaptée.
                    </p>

                    <a
                        href="https://wa.me/2250707186396?text=Bonjour,%20je%20souhaite%20obtenir%20un%20devis%20pour..."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20 hover:scale-105"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Discuter directement sur WhatsApp
                    </a>
                </div>

                <div className="max-w-3xl mx-auto bg-brand-navy p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
                    {formStatus === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-brand-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Envoyé !</h3>
                            <p className="text-gray-400">Merci de nous avoir contactés. Notre équipe reviendra vers vous très rapidement.</p>
                            <button
                                onClick={() => setFormStatus('idle')}
                                className="mt-8 px-6 py-3 bg-brand-dark border border-white/10 rounded-lg text-white hover:bg-brand-orange/20 transition-colors"
                            >
                                Envoyer un autre message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Nom Complet</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white transition-all outline-none"
                                        placeholder="Votre Nom"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white transition-all outline-none"
                                        placeholder="vous@entreprise.com"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Téléphone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white transition-all outline-none"
                                        placeholder="+225 07..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="service" className="text-sm font-medium text-gray-300">Service Concerné</label>
                                    <select
                                        id="service"
                                        className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white transition-all outline-none appearance-none"
                                    >
                                        <option value="">Sélectionnez un service</option>
                                        <option value="edition-logiciel">Édition de Logiciel</option>
                                        <option value="dev-web">Développement Web</option>
                                        <option value="app-mobile">Application Mobile</option>
                                        <option value="maintenance">Maintenance & Réseaux</option>
                                        <option value="autre">Autre Demande</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Détails du Projet</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent text-white transition-all outline-none resize-none"
                                    placeholder="Décrivez brièvement vos besoins..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'submitting' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        Envoyer ma demande <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
