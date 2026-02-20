'use client';

import { Database, Download, AlertTriangle, GraduationCap, Apple, Play, FileText } from 'lucide-react';

export default function DownloadZone() {
    return (
        <section className="py-20 px-4 md:px-8 bg-brand-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Téléchargements & Prérequis</h2>
                    <p className="text-gray-400">Installez les éléments nécessaires pour profiter de Kobson School Pay sur tous vos appareils.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* SQL Server Prerequisite */}
                    <div className="bg-brand-navy p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                                <Database className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Microsoft SQL Server 2019</h3>
                            <p className="text-sm text-gray-400 mb-6">Prérequis indispensable pour le stockage local des données en mode hybride (Poste PC).</p>
                        </div>
                        <a
                            href="https://www.microsoft.com/fr-fr/sql-server/sql-server-downloads"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
                        >
                            <Download className="w-4 h-4" /> Télécharger Express
                        </a>
                    </div>

                    {/* Kobson School Pay Suite (PC) */}
                    <div className="bg-brand-navy p-6 rounded-2xl border border-brand-orange/20 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-brand-orange/10 px-3 py-1 text-[10px] font-bold text-brand-orange uppercase">Version PC</div>
                        <div>
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 text-brand-orange">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Suite Kobson School Pay</h3>
                            <p className="text-sm text-gray-400 mb-6">L'installeur complet pour Windows (Modules Administratif, Enseignant, Comptable).</p>
                        </div>
                        <button
                            className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
                            onClick={() => alert('Lien de téléchargement en attente de configuration.')}
                        >
                            <Download className="w-4 h-4" /> Télécharger la Suite
                        </button>
                    </div>

                    {/* Google Play Store */}
                    <div className="bg-brand-navy p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center mb-4">
                                <Play className="w-6 h-6 text-brand-green fill-brand-green" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Android (Google Play)</h3>
                            <p className="text-sm text-gray-400 mb-6">Application mobile pour les parents et le suivi en temps réel sur smartphone Android.</p>
                        </div>
                        <button
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
                            onClick={() => alert('Lien Google Play Store en attente de validation.')}
                        >
                            <Download className="w-4 h-4" /> Bientôt sur Play Store
                        </button>
                    </div>

                    {/* Apple App Store */}
                    <div className="bg-brand-navy p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                <Apple className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">iOS (App Store)</h3>
                            <p className="text-sm text-gray-400 mb-6">Version iPhone et iPad pour les parents souhaitant suivre la scolarité de leurs enfants.</p>
                        </div>
                        <button
                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 border border-white/10"
                            onClick={() => alert('Lien App Store en attente de validation.')}
                        >
                            <Download className="w-4 h-4" /> Bientôt sur App Store
                        </button>
                    </div>
                </div>

                <div className="mt-12 p-4 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold text-brand-orange block mb-1">Note d'installation :</span>
                        Veuillez installer Microsoft SQL Server Local DB 2019 **avant** de lancer l'installation de la suite Kobson School Pay pour garantir un fonctionnement optimal du mode hors-ligne.
                    </div>
                </div>
            </div>
        </section>
    );
}
