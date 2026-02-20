'use client';

import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, ShieldCheck, ArrowRight } from 'lucide-react';

import Link from 'next/link';

const services = [
    {
        title: 'Édition de Logiciels',
        slug: 'edition-logiciels',
        description: 'Solutions logicielles sur mesure adaptées aux besoins spécifiques de votre métier.',
        icon: <Code className="w-10 h-10 mb-4 text-brand-orange" />,
        color: 'border-brand-orange/20 hover:border-brand-orange/50',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'Développement Web',
        slug: 'developpement-web',
        description: 'Sites vitrines impactants et plateformes e-commerce performantes pour booster votre activité.',
        icon: <Globe className="w-10 h-10 mb-4 text-brand-blue" />,
        color: 'border-brand-blue/20 hover:border-brand-blue/50',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'Applications Mobiles',
        slug: 'applications-mobiles',
        description: 'Applications natives et hybrides (iOS & Android) fluides et centrées sur l\'utilisateur.',
        icon: <Smartphone className="w-10 h-10 mb-4 text-brand-green" />,
        color: 'border-brand-green/20 hover:border-brand-green/50',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'Réseaux & Maintenance',
        slug: 'reseaux-maintenance',
        description: 'Installation, sécurisation et maintenance préventive de vos infrastructures informatiques.',
        icon: <ShieldCheck className="w-10 h-10 mb-4 text-brand-red" />,
        color: 'border-brand-red/20 hover:border-brand-red/50',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=800&auto=format&fit=crop'
    }
];

export default function ServicesGrid() {
    return (
        <section id="services" className="py-24 bg-brand-navy/30 relative">
            <div className="container mx-auto px-4 md:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nos Services Expert</h2>
                    <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Une expertise technologique complète pour accompagner votre transformation numérique.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {services.map((service, index) => (
                        <Link key={index} href={`/services/${service.slug}`} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`bg-brand-navy rounded-2xl border ${service.color} transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-brand-navy/80 group h-full flex flex-col overflow-hidden cursor-pointer`}
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4 bg-brand-dark/80 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                        {service.icon}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                        {service.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-brand-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        En savoir plus <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

