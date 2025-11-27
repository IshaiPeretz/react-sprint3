import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM


export function MailList({ mails, onRemove, onMarkRead, openNewMail,onMarkStar }) {

    return (
        <section className="mail-list">

            {mails.map(mail =>
                <article key={mail.id}>
                    {mail.sentAt && <Link to={`/mail/${mail.id}`}>
                        <MailPreview
                            mail={mail}
                            onRemove={onRemove}
                            onMarkRead={onMarkRead}
                            onMarkStar={onMarkStar}
                        />
                    </Link>}
                    {!mail.sentAt
                        && <MailPreview
                            mail={mail}
                            onRemove={onRemove}
                            onMarkRead={onMarkRead}
                            openNewMail={() => openNewMail(mail)} />}
                </article>
            )}
        </section>


    )
}
