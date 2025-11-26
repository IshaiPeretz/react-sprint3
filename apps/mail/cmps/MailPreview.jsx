import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail, onRemove }) {

    const { from, subject, isRead, body } = mail

    const date = utilService.formatCustomDate(mail.sentAt)

    const classRead = isRead ? 'read' : ''
    return (
        <article className={`mail-prev ${classRead}`}>

            <h3>{from}</h3>
            <h3><LongTxt txt={subject} length={30} /></h3>
            <h3> <LongTxt txt={body} length={30} /></h3>
            <h3>{date}</h3>
            <button onClick={(ev) => {
                onRemove(ev, mail.id)
            }}>x</button>
        </article>
    )
}