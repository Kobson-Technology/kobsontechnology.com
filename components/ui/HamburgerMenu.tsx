'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Kobson School Pay', href: '/kobson-school-pay' },
    { name: 'Services', href: '#services' },
    { name: 'À Propos', href: '/apropos' },
    { name: 'Contact', href: '#contact' },
];

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed top-5 right-5 z-50 p-2 text-white bg-brand-navy/80 backdrop-blur-md rounded-full shadow-lg hover:bg-brand-orange transition-colors md:hidden"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden md:flex fixed top-0 w-full z-40 bg-brand-navy/80 backdrop-blur-md p-4 justify-between items-center px-8 border-b border-white/10">
                <div className="text-xl font-bold text-white flex items-center gap-2">
                    <img src="/images/logo.jpg" alt="Kobson Technology" className="h-10 w-auto" />
                </div>
                <nav className="flex space-x-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-300 hover:text-brand-orange transition-colors font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-40 w-full h-full bg-brand-dark/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        <div className="mb-8">
                            <img src="/images/logo.jpg" alt="Kobson Technology" className="h-20 w-auto" />
                        </div>
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className="text-2xl font-bold text-white hover:text-brand-orange transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
