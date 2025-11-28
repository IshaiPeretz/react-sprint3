const { Link, NavLink } = ReactRouterDOM

const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return <header className="app-header">
        <Link to="/">
            <h3 className="main-logo">Appsus</h3>
        </Link>
        {isMenuOpen &&
            <nav className="nav-list">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>}

        <button className="header-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
    </header>
}
