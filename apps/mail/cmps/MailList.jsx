import { MailPreview } from "./MailPreview.jsx"



export function MailList({ mails, onRemove }) {

    return (
        <section className = "mail-list">

            {mails.map(mail =>
                <article key={mail.id}>
                    <MailPreview mail={mail} onRemove={onRemove} />
                </article>
            )}
        </section>


    )
}
