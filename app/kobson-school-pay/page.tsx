import Link from 'next/link';
import { ArrowLeft, CheckCircle, GraduationCap, DollarSign, Users, BarChart3, Shield, Clock, Bell, ClipboardCheck, Smartphone, Brain } from 'lucide-react';
import SubscriptionButton from '@/components/sections/SubscriptionButton';
import DownloadZone from '@/components/sections/DownloadZone';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kobson School Pay - Gestion Scolaire Simplifiée',
    description: 'La solution complète pour la gestion administrative, financière et pédagogique de vos établissements d\'enseignement.',
};

export default function KobsonSchoolPayPage() {
    return (
        <main className="min-h-screen bg-brand-dark text-white">
            {/* Product Hero */}
            <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-brand-navy/30 -z-10" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl">
                    <Link href="/" className="inline-flex items-center text-brand-orange mb-8 hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à l'accueil
                    </Link>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                La Révolution de la <br />
                                <span className="text-brand-orange">Gestion Scolaire</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Kobson School Pay est la solution tout-en-un conçue pour simplifier le quotidien des administrateurs, comptables, enseignants et parents. Centralisez, automatisez et sécurisez votre établissement.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 text-center"
                                >
                                    Demander une Démo Gratuite
                                </Link>
                            </div>
                        </div>
                        {/* Abstract visual representation of dashboard/app */}
                        <div className="relative bg-brand-navy border border-white/10 rounded-2xl p-6 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-brand-dark p-4 rounded-xl border border-white/5">
                                    <Users className="w-8 h-8 text-brand-blue mb-2" />
                                    <div className="text-2xl font-bold">2,500+</div>
                                    <div className="text-sm text-gray-400">Élèves Gérés</div>
                                </div>
                                <div className="bg-brand-dark p-4 rounded-xl border border-white/5">
                                    <DollarSign className="w-8 h-8 text-brand-green mb-2" />
                                    <div className="text-2xl font-bold">98%</div>
                                    <div className="text-sm text-gray-400">Taux de Recouvrement</div>
                                </div>
                            </div>
                            <div className="bg-brand-dark p-4 rounded-xl border border-white/5 h-48 flex items-center justify-center text-gray-500">
                                <BarChart3 className="w-12 h-12 opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Features */}
            <section className="py-20 px-4 md:px-8 bg-brand-dark">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Une Suite Complète</h2>
                        <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-400 text-lg">Tout ce dont vous avez besoin pour piloter votre école.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Module 1 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-colors group">
                            <div className="bg-brand-blue/20 p-4 rounded-xl w-fit mb-6 text-brand-blue group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Gestion Pédagogique</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> <span className="font-bold text-white">Cahier de texte & Appel numérique</span></li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Bulletins Scolaires (Papier & Email)</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Gestion des emplois du temps</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Inscriptions & Réinscriptions</li>
                            </ul>
                        </div>

                        {/* Module 2 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-colors group">
                            <div className="bg-brand-green/20 p-4 rounded-xl w-fit mb-6 text-brand-green group-hover:scale-110 transition-transform">
                                <DollarSign className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Gestion Financière</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> <span className="font-bold text-white">Notifs SMS/Email (Paiements)</span></li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Suivi des scolarités en temps réel</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Édition de reçus automatisée</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Rapports financiers détaillés</li>
                            </ul>
                        </div>

                        {/* Module 3 */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-colors group">
                            <div className="bg-brand-orange/20 p-4 rounded-xl w-fit mb-6 text-brand-orange group-hover:scale-110 transition-transform">
                                <Users className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Ressources Humaines</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-orange mr-2 shrink-0 mt-0.5" /> Gestion du personnel</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-orange mr-2 shrink-0 mt-0.5" /> Paiement des salaires</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-orange mr-2 shrink-0 mt-0.5" /> Édition des bulletins de paie</li>
                            </ul>
                        </div>

                        {/* Module 4 - App Mobile */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-colors group">
                            <div className="bg-brand-blue/20 p-4 rounded-xl w-fit mb-6 text-brand-blue group-hover:scale-110 transition-transform">
                                <Smartphone className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Application Parents</h3>
                            <p className="text-gray-400 mb-4 text-sm italic">Disponible sur Android & iOS</p>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Suivi des versements en temps réel</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Consultation des notes & moyennes</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-blue mr-2 shrink-0 mt-0.5" /> Cahier de texte & Retards</li>
                            </ul>
                        </div>

                        {/* Module 5 - IA */}
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-colors group">
                            <div className="bg-brand-green/20 p-4 rounded-xl w-fit mb-6 text-brand-green group-hover:scale-110 transition-transform">
                                <Brain className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">IAéducative</h3>
                            <p className="text-gray-400 mb-4 text-sm italic">Accompagnement intelligent</p>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Évaluation dynamique de l'élève</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Détection des lacunes</li>
                                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-brand-green mr-2 shrink-0 mt-0.5" /> Propositions d'exercices d'aide</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 md:px-8 bg-brand-navy/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8">Pourquoi choisir <br /><span className="text-brand-orange">Kobson School Pay</span> ?</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <Shield className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Architecture Hybride & Mode Hors Ligne</h4>
                                        <p className="text-gray-400">
                                            Ne soyez jamais bloqué par une coupure internet. Notre système unique à **double base de données (Locale et Distante)** vous permet de travailler en continu. La synchronisation se fait automatiquement dès le retour de la connexion.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <Users className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Multi-Utilisateurs et Rôles</h4>
                                        <p className="text-gray-400">
                                            Une solution collaborative pensée pour toute l'équipe. Définissez des accès précis pour chaque rôle (Caissier, Surveillant, Directeur, Comptable) et sécurisez vos opérations.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <BarChart3 className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Meilleure Prise de Décision</h4>
                                        <p className="text-gray-400">Tableaux de bord intuitifs pour suivre la santé financière et pédagogique de votre école en temps réel.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <GraduationCap className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Examens & Devoirs Inter-Écoles</h4>
                                        <p className="text-gray-400">
                                            Organisez facilement des devoirs et examens communs entre plusieurs établissements. Harmonisez les niveaux et simplifiez la gestion des évaluations à grande échelle.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <Smartphone className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">App Mobile Parents & Suivi 24h/24</h4>
                                        <p className="text-gray-400">
                                            Finis les déplacements inutiles. Les parents suivent les versements, les notes et les absences de leurs enfants en temps réel via l'application mobile dédiée.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-brand-dark p-3 rounded-lg h-fit border border-white/10">
                                        <Brain className="w-6 h-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">IAéducative : Le Coach Personnel</h4>
                                        <p className="text-gray-400">
                                            Notre intelligence artificielle analyse les résultats des élèves, détecte les points de blocage et propose automatiquement des ressources d'aide adaptées pour garantir la réussite.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-brand-dark p-8 rounded-2xl border border-brand-orange/30 text-center relative overflow-hidden group hover:border-brand-orange transition-colors">
                            <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">OFFRE POPULAIRE</div>

                            <h3 className="text-2xl font-bold mb-2">Abonnement Annuel</h3>
                            <div className="text-4xl font-black text-white mb-4">
                                125 500 <span className="text-lg text-gray-400 font-normal">FCFA / an</span>
                            </div>

                            <div className="bg-brand-orange/20 text-brand-orange font-bold text-sm py-1 px-3 rounded-full mb-6 inline-block border border-brand-orange/50">
                                + 2500 SMS OFFERTS 🎁
                            </div>

                            <p className="text-gray-400 mb-8 text-sm">Accès complet à tous les modules, mises à jour et support technique inclus.</p>

                            <SubscriptionButton />
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                <span className="px-2 py-1 bg-black text-white text-xs font-bold rounded">Djamo</span>
                                <span className="px-2 py-1 bg-[#ff7900] text-white text-xs font-bold rounded">Orange</span>
                                <span className="px-2 py-1 bg-[#1dc4ff] text-white text-xs font-bold rounded">Wave</span>
                                <span className="px-2 py-1 bg-[#006838] text-white text-xs font-bold rounded">Moov</span>
                                <span className="px-2 py-1 bg-[#ffcc00] text-black text-xs font-bold rounded">MTN</span>
                            </div>
                            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <Shield className="w-3 h-3" /> Paiement 100% Sécurisé via Djamo
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <DownloadZone />
        </main>
    );
}
