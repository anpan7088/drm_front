import { useEffect } from 'react';

const useAutoHideFooter = () => {
    useEffect(() => {
        const handleScroll = () => {
            // find element with class footer
            const footer = document.querySelector('.footer');
            const contentHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;

            // if scroll position is greater than content height - 50px, hide the footer
            if (scrollPosition >= contentHeight - 150) {
                footer.classList.add('hide');
            } else {
                footer.classList.remove('hide');
            }
        };
        // add event listener to window
        window.addEventListener('scroll', handleScroll);
        
        // remove event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};

export default useAutoHideFooter;
