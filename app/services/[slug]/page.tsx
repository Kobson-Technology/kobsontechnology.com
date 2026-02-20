import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const servicesData: Record<string, { title: string; description: string; features: string[] }> = {
    'edition-logiciels': {
        title: 'Édition de Logiciels',
        description: 'Des solutions d’applications de gestion sur mesure adaptées aux besoins spécifiques de votre secteur.',
        features: ['Audit des processus métier', 'Développement sur mesure', 'Sécurité et conformité des données', 'Formation et support utilisateur']
    },
    'developpement-web': {
        title: 'Développement Web',
        description: 'Des solutions de développement web adaptées à vos besoins pour garantir une présence en ligne efficace, sécurisée et performante.',
        features: ['Sites Vitrines & E-commerce', 'Optimisation SEO & Performance', 'Design Responsive', 'Hébergement et Maintenance']
    },
    'applications-mobiles': {
        title: 'Applications Mobiles',
        description: 'Étendez votre portée avec des applications mobiles intuitives (iOS & Android).',
        features: ['Applications iOS & Android', 'Solutions Hybrides', 'Design UI/UX Mobile', 'Maintenance évolutive']
    },
    'reseaux-maintenance': {
        title: 'Réseaux & Maintenance',
        description: 'Installation, sécurisation et maintenance préventive de vos infrastructures informatiques.',
        features: ['Installation de Réseaux Informatiques', 'Maintenance préventive et curative', 'Infogérance et Support', 'Sécurité des systèmes']
    }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = servicesData[params.slug];

    if (!service) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-brand-dark text-white pt-24 px-4 md:px-8">
            <div className="container mx-auto max-w-4xl">
                <Link href="/" className="inline-flex items-center text-brand-orange mb-8 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{service.title}</h1>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    {service.description}
                </p>

                <div className="bg-brand-navy p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-brand-orange">Nos Prestations</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center p-3 bg-brand-dark rounded-lg">
                                <CheckCircle className="w-5 h-5 text-brand-green mr-3" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/#contact"
                        className="inline-flex px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20"
                    >
                        Demander un devis pour ce service
                    </Link>
                </div>
            </div>
        </main>
    );
}
