

export function MailHeader({ children }) {

    return (
        <header className="mail-header">
            <div className="mail-logo"><i class="fa-solid fa-envelope"></i>EMAIL</div>

            {children}

        </header>
    )
}