'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, CheckCircle, Smartphone, Brain } from 'lucide-react';

export default function KobsonSchoolPayPromo() {
    return (
        <section className="py-20 bg-brand-navy relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 clip-path-slant-left pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-brand-dark to-black border border-white/10 rounded-2xl p-2 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-brand-dark rounded-xl overflow-hidden relative aspect-video flex items-center justify-center border border-white/5">
                                {/* Abstract graphical representation */}
                                <div className="absolute inset-0 bg-brand-navy/50" />
                                <div className="relative z-10 text-center p-6">
                                    <GraduationCap className="w-20 h-20 text-brand-orange mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Kobson School Pay</h3>
                                    <p className="text-gray-400 text-sm">L'excellence scolaire à portée de main</p>
                                </div>
                                {/* Floating elements */}
                                <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-1">
                                    <Smartphone className="w-3 h-3" /> Mobile Ready
                                </div>
                            </div>
                        </div>
                        {/* Backdrop Rect */}
                        <div className="absolute -inset-4 bg-brand-orange/20 rounded-2xl -z-10 transform rotate-2" />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                            </span>
                            Produit Phare
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            La Gestion Scolaire <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">Réinventée</span>
                        </h2>

                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Découvrez **Kobson School Pay**, notre solution tout-en-un pour digitaliser votre établissement. Inscriptions, paiements, pédagogie et communication parents : tout est centralisé.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-blue/20 p-1.5 rounded-full text-brand-blue"><CheckCircle className="w-5 h-5" /></div>
                                <span className="text-gray-300">Paiements mobiles sécurisés (Djamo, Wave, Orange...)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-blue/20 p-1.5 rounded-full text-brand-blue"><Smartphone className="w-5 h-5" /></div>
                                <span className="text-gray-300">App Mobile Parents (Suivi des notes & versements)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-blue/20 p-1.5 rounded-full text-brand-blue"><Brain className="w-5 h-5" /></div>
                                <span className="text-gray-300">IAéducative pour l'aide personnalisée des élèves</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-blue/20 p-1.5 rounded-full text-brand-blue"><CheckCircle className="w-5 h-5" /></div>
                                <span className="text-gray-300">Fonctionnement Hybride (Avec ou Sans Internet)</span>
                            </div>
                        </div>

                        <Link
                            href="/kobson-school-pay"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                        >
                            Découvrir Kobson School Pay
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
