export default function Footer() {
    return (
        <footer id="contact" className="bg-brand-dark py-12 border-t border-white/10 text-gray-400">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                        <img src="/images/logo.jpg" alt="Kobson Technology" className="w-full h-full object-cover" />
                    </div>
                </div>
                Kononfla, Sinfra, Côte d'Ivoire
                <p className="mb-4">
                    <a href="tel:+2250707186396" className="hover:text-brand-orange transition-colors">+(225) 07 07 18 63 96</a>
                </p>
                <p className="mb-8">
                    <a href="mailto:contact@kobsontechnology.com" className="hover:text-brand-orange transition-colors">contact@kobsontechnology.com</a>
                </p>

                <div className="flex justify-center space-x-6 mb-8">
                    <a href="https://web.facebook.com/profile.php?id=61573464915801" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Facebook</a>
                    <a href="#" className="hover:text-brand-orange transition-colors">LinkedIn</a>
                </div>
                <div className="text-sm">
                    &copy; {new Date().getFullYear()} Kobson Technology. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
