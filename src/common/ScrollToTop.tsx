import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { hash, key } = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (hash) {
                const el = document.getElementById(hash.replace('#', ''));
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 1);

        return () => clearTimeout(timeout);
    }, [key, hash]);

    return null;
}

export default ScrollToTop;