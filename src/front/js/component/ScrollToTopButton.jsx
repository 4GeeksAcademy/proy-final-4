import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const ScrollToTopButton = () => {
    const { actions } = useContext(Context);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        isVisible && (
            <div className="scroll-to-top" onClick={actions.scrollToTop}>
                <i className="bi bi-arrow-up-short"></i>
            </div>
        )
    );
};

export default ScrollToTopButton;
