import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, Lock, EyeOff } from 'lucide-react';

const ErrorPage = ({ code, title, message }) => {
    let Icon = AlertTriangle;
    if (code === 403) Icon = Lock;
    if (code === 401) Icon = EyeOff;

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--color-bg)',
            color: 'var(--color-text)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{
                    fontSize: '8rem',
                    fontWeight: '800',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    {code}
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 2rem', opacity: 0.8 }}>
                    {message}
                </p>

                <Link to="/" className="btn" style={{
                    background: 'var(--color-btn)',
                    color: 'var(--color-btn-text)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.75rem'
                }}>
                    <Home size={20} /> Volver al Inicio
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
