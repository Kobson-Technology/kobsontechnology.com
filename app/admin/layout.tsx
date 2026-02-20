'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users, BookOpen, CreditCard, LayoutDashboard,
    GraduationCap, BookMarked, School, Settings, LogOut,
    ChevronRight, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    {
        label: 'Tableau de bord',
        href: '/admin',
        icon: LayoutDashboard,
    },
    {
        label: 'Élèves',
        href: '/admin/eleves',
        icon: Users,
    },
    {
        label: 'Inscriptions',
        href: '/admin/inscriptions',
        icon: BookOpen,
    },
    {
        label: 'Versements',
        href: '/admin/versements',
        icon: CreditCard,
    },
    {
        label: 'Classes',
        href: '/admin/classes',
        icon: School,
    },
    {
        label: 'Matières',
        href: '/admin/matieres',
        icon: BookMarked,
    },
    {
        label: 'Personnel',
        href: '/admin/personnel',
        icon: GraduationCap,
    },
    {
        label: 'Paramètres',
        href: '/admin/parametres',
        icon: Settings,
    },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#1a1a2e] text-white">
            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#16213e] border-r border-white/5
                flex flex-col transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo / Brand */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e94560] shrink-0">
                        <img src="/images/logo.jpg" alt="KSP" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-bold text-sm text-white leading-tight">Kobson School Pay</div>
                        <div className="text-xs text-gray-400">Espace Admin</div>
                    </div>
                    <button className="ml-auto md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                                    ${isActive
                                        ? 'bg-[#e94560] text-white shadow-lg shadow-[#e94560]/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <Icon size={18} />
                                <span className="flex-1">{item.label}</span>
                                {isActive && <ChevronRight size={14} className="opacity-70" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <LogOut size={18} />
                        <span>Retour au site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Bar (mobile) */}
                <header className="md:hidden flex items-center gap-4 px-4 py-4 bg-[#16213e] border-b border-white/5">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-300 hover:text-white">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-sm">Kobson School Pay</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
