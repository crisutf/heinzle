import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 text-center text-[var(--color-muted)]">
            <div className="container mx-auto px-6">
                <p className="text-sm font-light relative">
                    © {new Date().getFullYear()} ProjectHeinzle. All rights reserved.
                    Special Thanks for Crisutf.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
