'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';
import SchoolSubscriptionForm from './SchoolSubscriptionForm';

export default function SubscriptionButton() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsFormOpen(true)}
                className="inline-block w-full px-8 py-4 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 mb-4 animate-pulse hover:animate-none cursor-pointer"
            >
                Souscrire Maintenant
            </button>

            <SchoolSubscriptionForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            />
        </>
    );
}
