import React from 'react';
import Demographic from '../icons/demographic.svg';
import './SectionHeader.css';

function SectionHeader() {
    return (
        <div className="section-header">
            <div className="section-header-content">
                <img src={Demographic} alt="Demographic icon" />
                <div className="section-header-text">
                    <h3>Subnotificação de violência contra mulher no município de Recife</h3>
                    <span>Estimativa de Subnotificação por 10.000 usuárias das atenção básica.</span>
                </div>
            </div>
        </div>
    );
}

export default SectionHeader;