import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard - Kobson School Pay',
};

const sections = [
    {
        title: '🎓 Élèves',
        color: '#3b82f6',
        items: [
            { label: 'Frais', href: '/admin/frais', emoji: '💰', desc: 'Configurer les frais de scolarité' },
            { label: 'Élèves', href: '/admin/eleves', emoji: '👨‍🎓', desc: 'Fiches et gestion des élèves' },
            { label: 'Inscription', href: '/admin/inscriptions', emoji: '📋', desc: 'Inscrire et gérer les inscriptions' },
        ],
    },
    {
        title: '💰 Comptabilité',
        color: '#22c55e',
        items: [
            { label: 'Versement', href: '/admin/versements', emoji: '💳', desc: 'Suivi des paiements de scolarité' },
            { label: 'Journal des Paiements', href: '/admin/journal-paiements', emoji: '📖', desc: 'Historique de tous les paiements' },
            { label: 'Dépenses', href: '/admin/depenses', emoji: '📉', desc: 'Gérer les dépenses de l\'école' },
            { label: 'Acomptes', href: '/admin/acomptes', emoji: '💸', desc: 'Suivi des acomptes du personnel' },
            { label: 'Bulletins de Paie', href: '/admin/payroll', emoji: '📄', desc: 'Générer et consulter les fiches de paie' },
            { label: 'États Financiers & DGI', href: '/admin/etats-financiers', emoji: '📜', desc: 'Tableaux de bord financiers et déclarations' },
        ],
    },
    {
        title: '👥 Personnel',
        color: '#a855f7',
        items: [
            { label: 'Fonctions', href: '/admin/fonctions', emoji: '🏷️', desc: 'Gérer les fonctions du personnel' },
            { label: 'Matières', href: '/admin/matieres', emoji: '📚', desc: 'Catalogue des matières enseignées' },
            { label: 'Employés', href: '/admin/employes', emoji: '👥', desc: 'Fiches et gestion des employés' },
            { label: 'Import Élèves', href: '/admin/import-eleves', emoji: '📥', desc: 'Importer des élèves depuis un fichier' },
        ],
    },
    {
        title: '🛠️ Gestion',
        color: '#f97316',
        items: [
            { label: 'Examens', href: '/admin/examens', emoji: '🎓', desc: 'Planifier et gérer les examens' },
            { label: 'Classes', href: '/admin/classes', emoji: '🏫', desc: 'Créer et configurer les classes' },
            { label: 'Présences', href: '/admin/presences', emoji: '📅', desc: 'Suivi des présences et absences' },
            { label: 'Notes', href: '/admin/notes', emoji: '📝', desc: 'Saisie et consultation des notes' },
            { label: 'Cahier de Texte', href: '/admin/cahier-texte', emoji: '📖', desc: 'Journal de cours des enseignants' },
            { label: 'Bulletin Scolaire', href: '/admin/bulletins', emoji: '📄', desc: 'Génération des bulletins trimestriels' },
            { label: "Décisions Fin d'Année", href: '/admin/decisions', emoji: '⚖️', desc: 'Délibérations et décisions finales' },
            { label: "Tableaux d'Honneur", href: '/admin/tableaux-honneur', emoji: '🏆', desc: "Récompenses et distinctions" },
            { label: 'Impressions', href: '/admin/impressions', emoji: '🖨️', desc: 'Documents et rapports imprimables' },
            { label: 'Salles', href: '/admin/salles', emoji: '🏫', desc: 'Gestion des salles de classe' },
            { label: 'Volume Horaires', href: '/admin/volume-horaires', emoji: '🕒', desc: 'Volume d\'heures par matière' },
            { label: 'Emploi du Temps', href: '/admin/emploi-du-temps', emoji: '📅', desc: 'Planning hebdomadaire des cours' },
            { label: 'Communication', href: '/admin/communication', emoji: '📧', desc: 'Messagerie parents-école et SMS' },
            { label: 'Comptes Utilisateurs', href: '/admin/comptes', emoji: '🔐', desc: 'Gestion des accès et permissions' },
        ],
    },
    {
        title: '🤖 Intelligence',
        color: '#8b5cf6',
        items: [
            { label: 'Assistant IA', href: '/admin/assistant-ia', emoji: '✨', desc: 'Assistant pédagogique basé sur l\'IA' },
        ],
    },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
                    📊 Tableau de bord
                </h1>
                <p className="text-gray-500 text-sm">Bienvenue sur l'espace d'administration de Kobson School Pay</p>
            </div>

            {/* Sections */}
            {sections.map((section) => (
                <div key={section.title}>
                    <h2 className="text-base font-bold mb-3 tracking-wide uppercase" style={{ color: section.color }}>
                        {section.title}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {section.items.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className="group p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-white/5 hover:border-white/20"
                                    style={{
                                        background: `${section.color}08`,
                                        borderColor: `${section.color}25`,
                                    }}
                                >
                                    <div className="text-2xl mb-2">{item.emoji}</div>
                                    <div className="font-semibold text-white text-sm leading-tight mb-1">{item.label}</div>
                                    <div className="text-xs text-gray-500 leading-snug line-clamp-2">{item.desc}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
