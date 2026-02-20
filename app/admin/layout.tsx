'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, BookOpen, DollarSign, BookMarked,
    Briefcase, GraduationCap, ClipboardList, FileText,
    CalendarDays, School, Clock, PenSquare, Award, Printer,
    Building2, MessageSquare, UserCog, Cpu, Bot,
    LogOut, Menu, X, ChevronDown, ChevronRight, MessageCircle
} from 'lucide-react';
import { useState } from 'react';

type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    emoji?: string;
};

type NavSection = {
    title: string;
    emoji: string;
    color: string;
    items: NavItem[];
};

const navSections: NavSection[] = [
    {
        title: 'Tableau de bord',
        emoji: '📊',
        color: 'text-[#FFA500]',
        items: [
            { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
            { label: 'Dashboard SMS', href: '/admin/sms-dashboard', icon: MessageCircle },
        ],
    },
    {
        title: 'Élèves',
        emoji: '🎓',
        color: 'text-blue-400',
        items: [
            { label: 'Frais', href: '/admin/frais', icon: DollarSign },
            { label: 'Élèves', href: '/admin/eleves', icon: Users },
            { label: 'Inscription', href: '/admin/inscriptions', icon: BookOpen },
        ],
    },
    {
        title: 'Comptabilité',
        emoji: '💰',
        color: 'text-green-400',
        items: [
            { label: 'Versement', href: '/admin/versements', icon: DollarSign },
            { label: 'Journal des Paiements', href: '/admin/journal-paiements', icon: BookMarked },
            { label: 'Dépenses', href: '/admin/depenses', icon: ClipboardList },
            { label: 'Acomptes', href: '/admin/acomptes', icon: FileText },
            { label: 'Bulletins de paies', href: '/admin/payroll', icon: FileText },
            { label: 'États Financiers & DGI', href: '/admin/etats-financiers', icon: Cpu },
        ],
    },
    {
        title: 'Personnel',
        emoji: '👥',
        color: 'text-purple-400',
        items: [
            { label: 'Fonction', href: '/admin/fonctions', icon: Briefcase },
            { label: 'Matières', href: '/admin/matieres', icon: BookMarked },
            { label: 'Employés', href: '/admin/employes', icon: GraduationCap },
            { label: 'Importation Élèves', href: '/admin/import-eleves', icon: Users },
        ],
    },
    {
        title: 'Gestion',
        emoji: '🛠️',
        color: 'text-orange-400',
        items: [
            { label: 'Examens', href: '/admin/examens', icon: GraduationCap },
            { label: 'Classes', href: '/admin/classes', icon: School },
            { label: 'Présences', href: '/admin/presences', icon: CalendarDays },
            { label: 'Notes', href: '/admin/notes', icon: PenSquare },
            { label: 'Cahier de Texte', href: '/admin/cahier-texte', icon: BookOpen },
            { label: 'Bulletin Scolaire', href: '/admin/bulletins', icon: FileText },
            { label: "Décisions Fin d'Année", href: '/admin/decisions', icon: Award },
            { label: "Tableaux d'Honneur", href: '/admin/tableaux-honneur', icon: Award },
            { label: 'Impressions', href: '/admin/impressions', icon: Printer },
            { label: 'Salle', href: '/admin/salles', icon: Building2 },
            { label: 'Volume Horaires', href: '/admin/volume-horaires', icon: Clock },
            { label: 'Emploi du Temps', href: '/admin/emploi-du-temps', icon: CalendarDays },
            { label: 'Communication', href: '/admin/communication', icon: MessageSquare },
            { label: 'Comptes Utilisateurs', href: '/admin/comptes', icon: UserCog },
        ],
    },
    {
        title: 'Intelligence',
        emoji: '🤖',
        color: 'text-violet-400',
        items: [
            { label: 'Assistant IA', href: '/admin/assistant-ia', icon: Bot },
        ],
    },
];

function SidebarSection({ section, pathname }: { section: NavSection; pathname: string }) {
    const isActive = section.items.some(i => pathname === i.href || (i.href !== '/admin' && pathname.startsWith(i.href)));
    const [open, setOpen] = useState(isActive || section.title === 'Tableau de bord');

    return (
        <div className="mb-1">
            {/* Section Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-300 transition-colors"
            >
                <span>{section.emoji}</span>
                <span className={`flex-1 text-left ${section.color}`}>{section.title}</span>
                {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>

            {/* Items */}
            {open && (
                <div className="space-y-0.5 pl-2">
                    {section.items.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                                    ${active
                                        ? 'bg-[#FFA500]/20 text-[#FFA500] font-semibold border-l-2 border-[#FFA500]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                                    }
                                `}
                            >
                                <Icon size={15} className="shrink-0" />
                                <span className="leading-tight">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen" style={{ background: '#0f0f1a' }}>
            {/* Overlay mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/70 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-64 flex flex-col
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `} style={{ background: '#141428', borderRight: '1px solid rgba(255,165,0,0.15)' }}>

                {/* Logo Area */}
                <div className="flex flex-col items-center justify-center py-6 border-b" style={{ borderColor: 'rgba(255,165,0,0.15)' }}>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 mb-2" style={{ borderColor: '#FFA500' }}>
                        <img src="/images/logo.jpg" alt="KSP" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-black text-lg tracking-wider" style={{ color: '#FFA500' }}>KOBSON</span>
                    <span className="text-xs font-semibold text-white/70 tracking-widest">SCHOOL PAY</span>
                    <button className="absolute top-4 right-3 md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
                    {navSections.map(section => (
                        <SidebarSection key={section.title} section={section} pathname={pathname} />
                    ))}
                </nav>

                {/* Footer / Version */}
                <div className="px-4 py-3 border-t text-xs flex items-center justify-between" style={{ borderColor: 'rgba(255,165,0,0.1)' }}>
                    <span className="text-gray-600">v2.0.0</span>
                    <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors">
                        <LogOut size={13} />
                        <span>Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center gap-4 px-4 py-3 border-b" style={{ background: '#141428', borderColor: 'rgba(255,165,0,0.15)' }}>
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-300 hover:text-white">
                        <Menu size={22} />
                    </button>
                    <span className="font-bold text-sm" style={{ color: '#FFA500' }}>Kobson School Pay</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
