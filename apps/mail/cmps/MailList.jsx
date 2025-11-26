import { MailPreview } from "./MailPreview.jsx"



export function MailList({ mails, onRemove }) {








    return (
        <section>

            {mails.map(mail =>
                <article key={mail.id}>
                    <MailPreview mail={mail} />
                    <button onClick={() => onRemove(mail.id)}>x</button>
                </article>
            )}
        </section>


    )
}
