import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function DeveloppementWebPage() {
    const service = {
        title: 'Développement Web',
        description: 'Des solutions de développement web adaptées à vos besoins pour garantir une présence en ligne efficace, sécurisée et performante. Site vitrine, e-commerce ou portail web, nous concrétisons votre vision digitale.',
        features: ['Sites Vitrines & E-commerce', 'Optimisation SEO & Performance', 'Design Responsive', 'Hébergement et Maintenance']
    };

    return (
        <main className="min-h-screen bg-brand-dark text-white pt-24 pb-20">
            {/* Hero Section with Image */}
            <div className="relative h-[40vh] md:h-[50vh] w-full mb-12 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                    alt="Développement Web"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                    <div className="container mx-auto max-w-4xl">
                        <Link href="/" className="inline-flex items-center text-brand-orange mb-6 hover:underline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour à l'accueil
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white">{service.title}</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 md:px-8">
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                    {service.description}
                </p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="md:col-span-2">
                        <div className="bg-brand-navy p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-brand-orange">Nos points forts</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div key={index} className="flex items-center p-3 bg-brand-dark rounded-lg border border-white/5">
                                        <CheckCircle className="w-5 h-5 text-brand-green mr-3" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-brand-orange/10 p-8 rounded-2xl border border-brand-orange/20 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xl font-bold mb-4">Besoin d'un Site ?</h3>
                        <p className="text-sm text-gray-400 mb-6">Prêt à lancer votre projet web ? Contactez-nous pour une solution sur mesure.</p>
                        <Link
                            href="/#contact"
                            className="w-full py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20"
                        >
                            Démarrer le projet
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
