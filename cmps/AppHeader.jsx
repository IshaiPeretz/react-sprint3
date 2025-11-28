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
                <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/">Home</NavLink>
                <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/about">About</NavLink>
                <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/mail">Mail</NavLink>
                <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/note">Note</NavLink>
            </nav>}

        <button className="header-hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
    </header>
}
