import { NavLink } from 'react-router-dom';
import './Home.css';

export default function Home(){
    return (
        <>
            <section id='adminHome'>
                <NavLink to="/admin/edital/1" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                    Edital 1, teste de link
                </NavLink>
                <br />
                <NavLink to="/admin/edital/2" end className={({ isActive }) => `link-page ${isActive ? "border-b-2 border-white" : ""}`}>
                    Edital 2, lista de sei la o que
                </NavLink>
            </section>
        </>
    );
}