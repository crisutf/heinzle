import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SecretSection = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [vpnDetected, setVpnDetected] = useState(false);
    const [fingerprint, setFingerprint] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const background = useTransform(
        scrollYProgress,
        [0, 0.25, 0.45, 0.65],
        ["rgba(233, 206, 163, 1)", "rgba(233, 206, 163, 1)", "rgba(20, 0, 0, 1)", "rgba(0, 0, 0, 1)"]
    );

    const normalContentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.25, 0.4], [0.8, 1]);
    const SECRET_KEY_HASH = "TWFja25hNDA4MA==";

    useEffect(() => {
        // Simple Fingerprinting + Persistence
        const getFingerprint = () => {
            let storedId = localStorage.getItem('_void_did');
            if (storedId) return storedId;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = "top";
            ctx.font = "14px 'Arial'";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125,1,62,20);
            ctx.fillStyle = "#069";
            ctx.fillText("Secret-Fingerprint", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.fillText("Secret-Fingerprint", 4, 17);
            const result = canvas.toDataURL();
            const newId = btoa(result).substring(0, 32);
            localStorage.setItem('_void_did', newId);
            return newId;
        };
        setFingerprint(getFingerprint());

        // VPN/WARP Detection (Heuristic/API)
        const checkVpn = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                const org = (data.org || '').toLowerCase();
                const asn = (data.asn || '').toLowerCase();
                const isp = (data.isp || '').toLowerCase();
                
                // Cloudflare WARP and other VPN signatures
                const isVpnOrWarp = 
                    data.proxy || 
                    data.hosting || 
                    org.includes('vpn') || 
                    asn.includes('vpn') || 
                    org.includes('cloudflare') || // WARP uses Cloudflare Network
                    asn.includes('as13335') ||    // Cloudflare ASN
                    isp.includes('cloudflare');
                
                if (isVpnOrWarp) {
                    setVpnDetected(true);
                    setIsBlocked(true);
                    // Penalize with a long wait
                    let waitTime = 3600; // 60 minutes
                    const timer = setInterval(() => {
                        waitTime--;
                        if (waitTime <= 0) clearInterval(timer);
                    }, 1000);
                }
            } catch (e) {
                console.error("VPN Check failed", e);
            }
        };
        checkVpn();
    }, []);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (btoa(password) === SECRET_KEY_HASH) {
            setShowConfirmation(true);
        } else {
            setErrorMsg("WHAT ARE YOU DOING HERE");
            setTimeout(() => setErrorMsg(''), 3000);
        }
    };

    const confirmAccess = () => {
        setIsAuthenticated(true);
        setShowConfirmation(false);
    };

    if (isBlocked) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono text-xl p-10 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                    ACCESO DENEGADO. VPN DETECTADA. <br />
                    DISPOSITIVO: {fingerprint} <br />
                    ESPERA 60 MINUTOS PARA REINTENTAR...
                </motion.div>
            </div>
        );
    }

    const corruptedTexts = [
        "LA CARNE SE DESPRENDIO COMO PAPEL MOJADO",
        "PODIA OLER SU PROPIO CUERPO PUDRIENDOSE EN EL VACIO",
        "MIL OJOS MIRANDO DESDE EL OTRO LADO DE LA PANTALLA",
        "ELLA GRITABA HASTA QUE SUS CUERDAS VOCALES SE VOLVIERON POLVO",
        "EL RAYO NO SOLO QUEMO SU PIEL, QUEMO SU EXISTENCIA",
        "NO HAY LUZ AL FINAL, SOLO MAS OSCURIDAD HAMBRIENTA",
        "CASI SE TIRABA POR LAS ESCALERAS HASTA QUE VIO ABAJO A LA OSCURIDAD",
        "NO TENIA EL CONTROL DE MI CUERPO",
        "CASI **** ATROPELLAN POR ESTAR 2 SEGUNDOS CON LOS OJOS CERRADOS",
        ":)",
        "GOOD LUCK"
    ];

    const GlitchText = ({ text }) => {
        const [displayProps, setDisplayProps] = useState({
            text: text,
            glitch: false
        });

        useEffect(() => {
            const interval = setInterval(() => {
                if (Math.random() > 0.9) {
                    const corruptedChars = "†☠☿☾☣☢⚰⚱☥☦☧☨☩☪☫☬☭";
                    const newText = text.split('').map(char => 
                        Math.random() > 0.85 ? corruptedChars[Math.floor(Math.random() * corruptedChars.length)] : char
                    ).join('');
                    
                    setDisplayProps({ text: newText, glitch: true });
                    setTimeout(() => setDisplayProps({ text: text, glitch: false }), 150);
                }
            }, 200);
            return () => clearInterval(interval);
        }, [text]);

        return (
            <motion.div
                className="relative inline-block"
                animate={displayProps.glitch ? {
                    x: [0, -5, 5, -2, 2, 0],
                    filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"],
                } : {}}
                transition={{ duration: 0.1 }}
            >
                <span className="text-red-600 opacity-80 absolute top-0 left-0 blur-[1px]">{displayProps.text}</span>
                <span className="text-cyan-600 opacity-80 absolute top-0 left-0 blur-[1px]" style={{ marginLeft: '2px' }}>{displayProps.text}</span>
                <span className="relative text-white font-mono tracking-tighter">{displayProps.text}</span>
            </motion.div>
        );
    };

    return (
        <div ref={targetRef} className="relative h-[300vh] overflow-x-hidden">
            {/* Scanlines Effect (only visible when dark) */}
            <motion.div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03]" 
                style={{ 
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 2px, 3px 100%',
                    opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 0.05])
                }} 
            />

            {/* Background transition */}
            <motion.div 
                style={{ backgroundColor: background }}
                className="fixed inset-0 z-0"
            />

            <div className="relative z-10 h-full flex flex-col items-center">
                {/* Section 1: Normal Content */}
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <motion.div 
                        style={{ opacity: normalContentOpacity }}
                        className="text-center space-y-4 max-w-lg px-6"
                    >
                        <h1 className="text-4xl font-bold text-dark/80">WHAT ARE YOU DOING HERE</h1>
                        <p className="text-dark/60 text-lg leading-relaxed">
                        WHAT ARE YOU DOING HERE
                        </p>
                        <div className="pt-12 flex justify-center">
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-6 h-10 border-2 border-dark/30 rounded-full flex justify-center pt-2"
                            >
                                <div className="w-1 h-2 bg-dark/30 rounded-full" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Section 2: Password Entry */}
                <div className="h-screen w-full flex items-center justify-center p-4">
                    <motion.div 
                        style={{ opacity, scale }}
                        className="bg-black/80 p-8 border border-red-900 rounded-lg shadow-2xl max-w-md w-full"
                    >
                        {!isAuthenticated && !showConfirmation ? (
                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <motion.h2 
                                    animate={{ opacity: [1, 0.5, 1], textShadow: ["0 0 0px #f00", "0 0 10px #f00", "0 0 0px #f00"] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="text-red-600 font-mono text-2xl text-center mb-4"
                                >
                                    WHAT ARE YOU DOING HERE
                                </motion.h2>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-900 border border-red-800 text-red-500 p-3 rounded font-mono focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-red-900/30"
                                    placeholder="INGRESE CLAVE..."
                                />
                                <motion.button 
                                    whileHover={{ scale: 1.02, backgroundColor: "#7f1d1d" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-red-900 text-white font-mono py-3 rounded transition-all duration-300 shadow-[0_0_15px_rgba(153,27,27,0.4)]"
                                >
                                    Vacío
                                </motion.button>
                                {errorMsg && <p className="text-red-600 text-center font-mono text-sm animate-pulse">{errorMsg}</p>}
                                <p className="text-zinc-600 text-[10px] text-center mt-4">DISPOSITIVO ID: {fingerprint}</p>
                            </form>
                        ) : showConfirmation ? (
                            <div className="text-center space-y-6">
                                <h2 className="text-red-600 font-mono text-2xl">¿ESTÁS SEGURO?</h2>
                                <p className="text-zinc-400 font-mono text-sm leading-relaxed">
                                    AL ACCEDER, TU DIRECCIÓN IP, DISPOSITIVO Y UBICACIÓN QUEDARÁN REGISTRADOS EN NUESTROS SISTEMAS. 
                                    NO HAY VUELTA ATRÁS. EL RASTRO ES PERMANENTE.
                                </p>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={confirmAccess}
                                        className="flex-1 bg-red-900 hover:bg-red-700 text-white font-mono py-2 rounded"
                                    >
                                        SÍ, ACCEDER
                                    </button>
                                    <button 
                                        onClick={() => setShowConfirmation(false)}
                                        className="flex-1 border border-zinc-700 text-zinc-500 font-mono py-2 rounded"
                                    >
                                        CANCELAR
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <GlitchText text="ACCESO CONCEDIDO" />
                                <p className="text-zinc-500 mt-2">Sigue bajando para ver lo que queda.</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Section 3: Dark Content */}
                <div className="h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
                    {isAuthenticated && (
                        <>
                            {/* Flickering Red Overlay */}
                            <motion.div 
                                className="absolute inset-0 bg-red-900/10 pointer-events-none z-[5]"
                                animate={{ opacity: [0, 0.2, 0.1, 0.3, 0] }}
                                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                            />
                            
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="max-w-3xl w-full space-y-12 z-10"
                            >
                                <div className="space-y-8">
                                    {corruptedTexts.map((text, i) => (
                                        <div key={i} className="text-center">
                                            <GlitchText text={text} />
                                        </div>
                                    ))}
                                </div>
                                
                                <motion.div 
                                    className="mt-20 border-t border-red-950 pt-10 text-zinc-800 font-mono text-xs text-center"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <p className="tracking-[0.5em]">UNTILTED #9 - LLAVE QUE ABRIO TODO POR ERROR DE MAS</p>
                                    <p className="mt-2 text-red-900/50">UN RECUERDO, EL VACÍO, EXISTENCIA</p>
                                    <p className="mt-8 text-zinc-900 font-bold">DEVICE_ID: {fingerprint}</p>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecretSection;
