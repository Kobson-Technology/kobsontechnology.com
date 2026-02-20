'use client';

import { motion } from 'framer-motion';
import { Target, MapPin, Heart, Cpu, Globe, GraduationCap } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03]" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            L'Expertise Numérique <span className="text-brand-orange">Au Cœur de la Côte d'Ivoire</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Kobson Technology est un intégrateur de solutions numériques ivoirien. Nous accompagnons la transformation digitale de l'éducation, des PME et des administrations locales avec des outils adaptés à nos réalités.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Globe className="w-6 h-6 text-brand-orange" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Développement Web & Mobile</h3>
                        <p className="text-gray-400 text-sm">
                            Création de logiciels sur mesure, d'applications mobiles (Android & iOS) et de sites internet modernes pour booster votre visibilité.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-6 h-6 text-brand-orange" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Solutions Éducatives</h3>
                        <p className="text-gray-400 text-sm">
                            Éditeur de <span className="font-bold text-white">Kobson School Pay</span>, la solution qui révolutionne la gestion des inscriptions, paiements et communication scolaire.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Cpu className="w-6 h-6 text-brand-orange" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Infra & Services Locaux</h3>
                        <p className="text-gray-400 text-sm">
                            Installation de réseaux sécurisés, maintenance informatique et assistance technique de proximité pour particuliers et pros.
                        </p>
                    </motion.div>
                </div>

                {/* Values / Positioning */}
                <div className="grid md:grid-cols-2 gap-12 items-center bg-brand-navy/30 rounded-3xl p-8 md:p-12 border border-white/5">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Notre Vision & Engagement</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <MapPin className="w-6 h-6 text-brand-orange shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Ancrage Local Fort</h4>
                                    <p className="text-gray-400 text-sm">
                                        Une présence marquée dans la région de la Marahoué (Kononfla, Sinfra) pour être au plus près des besoins ruraux et semi-urbains.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Heart className="w-6 h-6 text-brand-orange shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Valeur & Proximité</h4>
                                    <p className="text-gray-400 text-sm">
                                        Des tarifs accessibles et un accompagnement complet : conseil, déploiement et maintenance. Nous ne vous laissons jamais seul.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Target className="w-6 h-6 text-brand-orange shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Transformation Durable</h4>
                                    <p className="text-gray-400 text-sm">
                                        Notre mission est simple : démocratiser l'accès aux outils numériques performants pour tous les acteurs locaux.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden group">
                        <img
                            src="/images/arriere.png"
                            alt="Engagement Kobson Technology"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="text-3xl font-black text-white/40 mb-2">KOBSON</div>
                                <div className="text-lg font-bold text-white/20">TECHNOLOGY</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
