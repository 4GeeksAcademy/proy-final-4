import React, { useEffect } from "react";
import '../../styles/CalendlyWidget.css';

const CalendlyWidget = () => {
    const calendlyUrl = process.env.REACT_APP_CALENDLY_URL;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div
            className="calendly-inline-widget"
            data-url={calendlyUrl}
        ></div>
    );
};

export default CalendlyWidget;