const { Link, NavLink, } = ReactRouterDOM
const { Fragment } = React

export function Home() {
    return (
        <Fragment>
            <section className="home">
                <h1><span>Appsus</span></h1>
                <p>Your all-in-one application</p>

                <p>Seamlessly manage your emails and notes in one intuitive workspace.
                    No more app-switching—stay organized, focused, and productive.</p>

                <h3>✨ What can you find in <span>Appsus</span>:</h3>
                <ul>
                    <li>📧 Email - Inbox, sent, smart filters, lightning-fast search</li>
                    <li>📝 Notes - Rich text, organization, cross-device sync</li>
                    <li>🔗 Unified - Switch between apps without losing context</li>
                    <li>⚡ Fast - Built for speed, no lag, instant updates</li>
                </ul>

                <p>One app. Two superpowers. Zero distractions.</p>

            </section>

            <section>
                <NavLink to="/mail">
                    <div className="mail-logo">
                        <i className="fa-solid fa-envelope"></i>
                        EMAIL
                    </div>
                </NavLink>
                <NavLink to="/note">
                    <div className="note-logo">Notes</div>
                </NavLink>
            </section>

        </Fragment>
    )
}