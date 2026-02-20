import Link from 'next/link';
import {
    Users, BookOpen, CreditCard, GraduationCap,
    BookMarked, School, ArrowRight, TrendingUp,
    AlertCircle, CheckCircle
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Administration - Kobson School Pay',
    description: 'Espace d\'administration de Kobson School Pay',
};

const modules = [
    {
        title: 'Élèves',
        description: 'Gérer les fiches élèves, importer et exporter les données.',
        href: '/admin/eleves',
        icon: Users,
        color: 'from-blue-600/20 to-blue-600/5',
        border: 'border-blue-500/20 hover:border-blue-500/50',
        iconColor: 'text-blue-400',
        badge: 'Priorité 1',
        badgeColor: 'bg-blue-500/20 text-blue-300',
    },
    {
        title: 'Inscriptions',
        description: 'Enregistrer les inscriptions par classe et année scolaire.',
        href: '/admin/inscriptions',
        icon: BookOpen,
        color: 'from-green-600/20 to-green-600/5',
        border: 'border-green-500/20 hover:border-green-500/50',
        iconColor: 'text-green-400',
        badge: 'Priorité 2',
        badgeColor: 'bg-green-500/20 text-green-300',
    },
    {
        title: 'Versements',
        description: 'Suivi des paiements de scolarité et des reçus.',
        href: '/admin/versements',
        icon: CreditCard,
        color: 'from-orange-600/20 to-orange-600/5',
        border: 'border-orange-500/20 hover:border-orange-500/50',
        iconColor: 'text-orange-400',
        badge: 'Priorité 3',
        badgeColor: 'bg-orange-500/20 text-orange-300',
    },
    {
        title: 'Classes',
        description: 'Créer et configurer les classes par niveau et cycle.',
        href: '/admin/classes',
        icon: School,
        color: 'from-purple-600/20 to-purple-600/5',
        border: 'border-purple-500/20 hover:border-purple-500/50',
        iconColor: 'text-purple-400',
        badge: 'Base',
        badgeColor: 'bg-purple-500/20 text-purple-300',
    },
    {
        title: 'Matières',
        description: 'Gérer le catalogue des matières enseignées.',
        href: '/admin/matieres',
        icon: BookMarked,
        color: 'from-pink-600/20 to-pink-600/5',
        border: 'border-pink-500/20 hover:border-pink-500/50',
        iconColor: 'text-pink-400',
        badge: 'Base',
        badgeColor: 'bg-pink-500/20 text-pink-300',
    },
    {
        title: 'Personnel',
        description: 'Gérer les enseignants, administrateurs et leurs salaires.',
        href: '/admin/personnel',
        icon: GraduationCap,
        color: 'from-yellow-600/20 to-yellow-600/5',
        border: 'border-yellow-500/20 hover:border-yellow-500/50',
        iconColor: 'text-yellow-400',
        badge: 'À venir',
        badgeColor: 'bg-yellow-500/20 text-yellow-300',
    },
];

const statCards = [
    { label: 'Modules disponibles', value: '6', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Modules en cours', value: '0', icon: TrendingUp, color: 'text-blue-400' },
    { label: 'Alertes système', value: '0', icon: AlertCircle, color: 'text-orange-400' },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                    Bienvenue sur <span className="text-[#e94560]">Kobson School Pay</span>
                </h1>
                <p className="text-gray-400">
                    Sélectionnez un module pour commencer à gérer vos données scolaires.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-[#16213e] rounded-2xl border border-white/5 p-5 flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Module Grid */}
            <h2 className="text-lg font-bold text-gray-300 mb-4">Modules de gestion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {modules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                        <Link key={mod.href} href={mod.href}>
                            <div className={`
                                bg-gradient-to-br ${mod.color} border ${mod.border}
                                rounded-2xl p-6 h-full transition-all duration-300
                                hover:-translate-y-1 hover:shadow-lg cursor-pointer group
                            `}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-white/5 ${mod.iconColor}`}>
                                        <Icon size={22} />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${mod.badgeColor}`}>
                                        {mod.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                                <p className="text-sm text-gray-400 mb-4 leading-relaxed">{mod.description}</p>
                                <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                    Accéder
                                    <ArrowRight size={15} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Migration Badge */}
            <div className="mt-10 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-300 flex items-start gap-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                    <strong className="block mb-0.5">Migration en cours</strong>
                    Ce portail est en cours de développement. Chaque module est ajouté progressivement depuis l'application WPF Kobson School Pay.
                </div>
            </div>
        </div>
    );
}
