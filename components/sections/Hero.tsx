'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Brain } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="school-pay" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark px-4 md:px-8 pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/arriere.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/60 to-brand-dark" />
            </div>

            {/* Background Glow Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[128px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[128px] pointer-events-none z-0" />

            <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        <span className="text-brand-orange">Kobson Technology</span>
                        <br />
                        Votre Éditeur Logiciel & Service IT
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                        Des solutions pour vos défis tech : Infogérance, Applications de Gestion, Maintenance et Réseaux à Abidjan.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 group"
                        >
                            Demander une démo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/apropos"
                            className="px-8 py-4 bg-brand-navy border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center"
                        >
                            En savoir plus
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Visual / Mockup Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Mockup Container */}
                    <div className="relative z-10 bg-brand-navy rounded-2xl border border-gray-700 shadow-2xl p-4 md:p-6 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-3">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="flex-1 text-center text-xs text-gray-400 font-mono">dashboard.kobsonschoolpay.com</div>
                        </div>

                        {/* Mock Dashboard Content */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="col-span-1 bg-brand-dark p-4 rounded-lg border border-gray-800">
                                <div className="h-2 w-20 bg-gray-700 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-brand-orange/20 rounded mb-1 text-brand-orange flex items-center justify-center font-bold">1,240</div>
                                <div className="text-xs text-gray-400">Élèves inscrits</div>
                            </div>
                            <div className="col-span-1 bg-brand-dark p-4 rounded-lg border border-gray-800">
                                <div className="h-2 w-20 bg-gray-700 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-brand-green/20 rounded mb-1 text-brand-green flex items-center justify-center font-bold">98%</div>
                                <div className="text-xs text-gray-400">Recouvrement</div>
                            </div>
                            <div className="col-span-1 bg-brand-dark p-4 rounded-lg border border-gray-800">
                                <div className="h-2 w-20 bg-gray-700 rounded mb-2"></div>
                                <div className="h-8 w-16 bg-brand-blue/20 rounded mb-1 text-brand-blue flex items-center justify-center font-bold">Active</div>
                                <div className="text-xs text-gray-400">Année Scolaire</div>
                            </div>
                        </div>
                        <div className="mt-4 h-32 bg-brand-dark rounded-lg border border-gray-800 flex items-center justify-center text-gray-600 text-sm">
                            Graphique de fréquentation (Simulation)
                        </div>
                    </div>

                    {/* Floating Badge - Payments (Existing) */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 md:-left-12 bg-white text-brand-dark p-4 rounded-xl shadow-xl z-20 border border-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-green/10 p-2 rounded-full">
                                <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <div>
                                <div className="font-bold text-sm">Paiements sécurisés</div>
                                <div className="text-xs text-brand-navy">Suivi en temps réel</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* New Floating Badge - App Parents */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                        className="absolute -top-10 -right-4 md:-right-10 bg-brand-navy border border-brand-blue/30 p-4 rounded-xl shadow-2xl z-20 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-blue/20 p-2 rounded-full">
                                <Smartphone className="w-6 h-6 text-brand-blue" />
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">App Parents</div>
                                <div className="text-[10px] text-gray-400">Notes & Versements</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* New Floating Badge - AI Coach */}
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                        className="absolute top-1/2 -right-12 bg-brand-navy border border-brand-green/30 p-4 rounded-xl shadow-2xl z-20 hidden lg:block backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-brand-green/20 p-2 rounded-full">
                                <Brain className="w-6 h-6 text-brand-green" />
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">IAéducative</div>
                                <div className="text-[10px] text-gray-400">Aide Personnalisée</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
