import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemove, onMarkRead }) {

    return (
        <section className="mail-list">

            {mails.map(mail =>
                <article key={mail.id}>
                    <Link to={`/mail/${mail.id}`}>
                        <MailPreview mail={mail} onRemove={onRemove} onMarkRead={onMarkRead} />
                    </Link>
                </article>
            )}
        </section>


    )
}
