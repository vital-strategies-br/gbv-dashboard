import { useEffect, useState } from 'react';

import { Coordinate } from '../common/types';

const useMousePosition = () => {
    const [
        mousePosition,
        setMousePosition
    ] = useState<Coordinate | null>(null);

    useEffect(() => {
        const updateMousePosition = (ev: MouseEvent) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

export default useMousePosition;