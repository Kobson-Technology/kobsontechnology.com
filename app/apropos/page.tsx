import HamburgerMenu from "@/components/ui/HamburgerMenu";
import Footer from "@/components/sections/Footer";
import QuoteForm from "@/components/sections/QuoteForm";
import { Globe, GraduationCap, Cpu, Wrench, MapPin, Heart, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'À Propos de Kobson Technology - Intégrateur de Solutions Numériques',
    description: 'Découvrez Kobson Technology, entreprise ivoirienne experte en développement logiciel, solutions éducatives et maintenance informatique.',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-orange selection:text-white">
            <HamburgerMenu />

            {/* Header / Hero Section */}
            <section className="pt-32 pb-20 px-4 md:px-8 bg-brand-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 clip-path-slant-left pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        En savoir plus sur <br />
                        <span className="text-brand-orange">Kobson Technology</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                        Kobson Technology est une entreprise ivoirienne qui se positionne comme un intégrateur de solutions numériques. Elle accompagne ses clients dans la conception, le déploiement et la maintenance de systèmes informatiques adaptés aux réalités locales.
                    </p>
                </div>
            </section>

            {/* Domaines d'activité */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                        <h2 className="text-3xl font-bold text-center">Domaines d’activité</h2>
                        <div className="h-1 flex-1 bg-white/10 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Domain 1 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all group">
                            <Globe className="w-10 h-10 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                            <h2 className="text-2xl font-bold mb-4">Logiciels, Web & Mobile</h2>
                            <p className="text-gray-400">
                                Création de logiciels personnalisés, applications mobiles (Android & iOS) et sites internet modernes.
                            </p>
                        </div>

                        {/* Domain 2 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-all group">
                            <GraduationCap className="w-10 h-10 text-brand-green mb-6 group-hover:scale-110 transition-transform" />
                            <h2 className="text-2xl font-bold mb-4">Solutions éducatives</h2>
                            <p className="text-gray-400">
                                Éditeur du logiciel <Link href="/kobson-school-pay" className="text-white font-bold hover:underline decoration-brand-green underline-offset-4">Kobson School Pay</Link>, qui automatise la gestion scolaire.
                            </p>
                        </div>

                        {/* Domain 3 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all group">
                            <Cpu className="w-10 h-10 text-brand-blue mb-6 group-hover:scale-110 transition-transform" />
                            <h2 className="text-2xl font-bold mb-4">Réseaux & Maintenance</h2>
                            <p className="text-gray-400">
                                Installation de réseaux sécurisés et maintenance informatique pour garantir performance et fiabilité.
                            </p>
                        </div>

                        {/* Domain 4 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all group">
                            <Wrench className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-4">Services locaux</h3>
                            <p className="text-gray-400">
                                Réparation d’ordinateurs et de matériel périphérique, assistance technique de proximité pour particuliers et organisations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Positionnement */}
            <section className="py-20 px-4 md:px-8 bg-brand-navy/30">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Notre Positionnement</h2>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-lg">
                                <MapPin className="w-8 h-8 text-brand-orange" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Expertise locale</h3>
                            <p className="text-gray-400">
                                Solutions adaptées au contexte ivoirien, avec une forte présence dans la région de la Marahoué (Kononfla, département de Sinfra).
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-lg">
                                <Heart className="w-8 h-8 text-brand-orange" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Valeur ajoutée</h3>
                            <p className="text-gray-400">
                                Proximité avec les communautés rurales, tarifs accessibles, accompagnement complet (conseil, développement, déploiement, maintenance).
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-lg">
                                <Target className="w-8 h-8 text-brand-orange" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Vision</h3>
                            <p className="text-gray-400">
                                Contribuer à la transformation digitale de l’éducation, des PME et des administrations locales.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <QuoteForm />
            <Footer />
        </main>
    );
}
