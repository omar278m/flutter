import './Header.css'
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import logo from '../../assets/logo.png';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
    // Menu state
    const [openMenu, setOpenMenu] = useState(false);
    // SubMenu state
    const [openSubMenu, setOpenSubMenu] = useState({
        about: false,
        doctors: false,
        services: false,
    });
    // Active Link
    const [active, setActive] = useState(window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1));
    const navLinks = [
        { to: "/", label: "Home", id: "home" },
        { to: "/about", label: "About", id: "about", sections: ['team', 'mission', 'history'] },
        { to: "/services", label: "Services", id: "services", sections: ['general-consultation', 'emergency-care', 'surgery', 'pediatrics', 'radiology', 'laboratory', 'pharmacy'] },
        { to: "/doctors", label: "Doctors", id: "doctors", sections: ['cardiology', 'neurology', 'orthopedics', 'pediatrics', 'dermatology', 'gynecology', 'psychiatry', 'ophthalmology'] },
        { to: "/appointments", label: "Appointments", id: "appointments" },
        { to: "/contact", label: "Contact", id: "contact" },
    ];
    // Toggle SubMenu
    const toggleSubMenu = (linkId, isOpen) => {
        setOpenSubMenu(prevState => ({
            [linkId]: isOpen
        }));
    };

    // Header scroll effect
    const headerRef = useRef(null);
    useEffect(() => {
        const header = headerRef.current;
        let current = 0;
        const handleScroll = () => {
            if (window.scrollY == 0 || current == 0) {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
                header.style.transform = 'translateY(0)';
                header.classList.remove('backdrop-blur-md');
                current = window.scrollY;
            } else {
                if (window.scrollY > current) {
                    header.style.backgroundColor = 'rgb(238 238 238 / 64 %)';
                    header.style.boxShadow = '0 5px 10px #00000078';
                    header.style.transform = 'translateY(0)';
                    header.classList.add('backdrop-blur-md');
                    current = window.scrollY;
                } else if (window.scrollY < current) {
                    header.style.backgroundColor = 'transparent';
                    header.style.boxShadow = 'none';
                    header.style.transform = 'translateY(-100%)';
                    header.classList.remove('backdrop-blur-md');
                    current = window.scrollY;
                } else {
                    header.style.backgroundColor = 'transparent';
                    header.style.boxShadow = 'none';
                    header.style.transform = 'translateY(0)';
                    header.classList.remove('backdrop-blur-md');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header id="header" ref={headerRef} className="py-4 px-8 mx-4 md:mx-8 lg:mx-12 top-0 rounded-4xl my-4 fixed w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] z-50 transition-all duration-500 ease-in-out">
            <div className="container mx-auto">
                {/* Mobile header */}
                <nav className="lg:hidden flex items-center justify-between">
                    <Link to="/" className="logo">
                        <img src={logo} alt="Logo" className="w-[50px] min-w-10" />
                    </Link>
                    <div className="menu-bar">
                        <i className="fas fa-bars text-3xl cursor-pointer" onClick={() => setOpenMenu(!openMenu)}></i>
                    </div>
                </nav>
                {/* Desktop & Mobile Menu */}
                <nav className={`nav overflow-y-scroll lg:overflow-y-visible py-20 px-8 flex-col -m-4 md:-mx-8 lg:m-0 bg-blue-100 lg:bg-transparent absolute top-0 right-0 h-screen w-md max-w-full rounded-0 space-y-15 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 lg:relative lg:top-0 lg:right-0 lg:p-0 lg:h-auto lg:w-auto ${openMenu ? 'flex' : 'hidden'} lg:flex`}>
                    <div className="list-options flex items-center justify-between mb-10 lg:mb-0 lg:justify-start">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="w-[50px] min-w-10" />
                        </Link>
                        <div className="close-bar lg:hidden">
                            <i className="fas fa-times text-3xl cursor-pointer" onClick={() => setOpenMenu(!openMenu)}></i>
                        </div>
                    </div>

                    <ul className="nav-links space-y-6 text-lg font-semibold flex flex-col items-start  lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 lg:px-0">

                        {(navLinks).map((link) => (
                            <li className="w-full" key={link.id}>
                                {/* If link has sections, render submenu*/}
                                {!link.sections ?
                                    (<Link to={link.to}
                                        id={link.id}
                                        onClick={() => { setActive(link.id); setOpenMenu(false); toggleSubMenu(link.id, false); }}
                                        className={`${active === link.id ? 'active' : ''} hover:text-gray-500 relative transition-all duration-500 ease-in-out block rounded-2xl px-4 py-2 lg:px-0 lg:py-0 hover:bg-blue-200 lg:hover:bg-transparent`}>{link.label}</Link>
                                    ) : (
                                        <span id={link.id}
                                            onClick={() => { toggleSubMenu(link.id, !openSubMenu[link.id]) }}
                                            className={`${active === link.id ? 'active' : ''} cursor-pointer flex lg:items-center lg:justify-center hover:text-gray-500 text-black relative transition-all duration-500 ease-in-out rounded-2xl px-4 py-2 lg:px-0 lg:py-0 hover:bg-blue-200 lg:hover:bg-transparent`}>{link.label} <i className={`fas invisible lg:visible text-sm ml-2 fa-chevron-${openSubMenu[link.id] ? 'up' : 'down'}`}></i></span>
                                    )}
                                {/* Map sections if link has sections*/}
                                {link.sections && <ul className={`sub-menu mt-2 ml-4 border-l-4 border-blue-300 p-4 lg:absolute bg-white rounded-lg shadow-lg ${openSubMenu[link.id] ? 'lg:block' : 'lg:hidden'}`}>
                                    {link.sections.map((section) => (
                                        <li key={section} className="">
                                            <Link to={`${link.to}#${section}`}
                                                onClick={() => { setActive(link.id); setOpenMenu(false); toggleSubMenu(link.id, false); }}
                                                className="text-sm hover:text-gray-500  transition-all duration-500 ease-in-out block rounded-2xl p-3 lg:px-5 hover:bg-blue-200 lg:hover:bg-transparent">{section.charAt(0).toUpperCase() + section.slice(1)}</Link>
                                        </li>
                                    ))}
                                </ul>}
                            </li>
                        ))}
                    </ul>
                    <div className="buttons flex space-y-4 text-lg font-semibold flex-col px-2 lg:flex-row lg:items-center lg:justify-between lg:mt-0 lg:px-0 lg:space-y-0 lg:space-x-2">
                        <Link to="/signup" className="w-full"><Button text="Signup" style="emp-button" /></Link>
                        <Link to="/login" className="w-full"><Button text="Login" /></Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;
