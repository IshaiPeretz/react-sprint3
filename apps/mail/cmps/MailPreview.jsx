import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail, onRemove, onMarkRead }) {

    const { from, subject, isRead, body } = mail

    const date = utilService.formatCustomDate(mail.sentAt)

    const classRead = isRead ? 'read' : ''
    const iconRead = isRead ? <i class="fa-regular fa-envelope"></i> : <i class="fa-regular fa-envelope-open"></i>
    return (
        <article className={`mail-prev ${classRead}`}>

            <h3>{from}</h3>
            <h3><LongTxt txt={subject} length={30} /></h3>
            <h3> <LongTxt txt={body} length={30} /></h3>
            <h3>{date}</h3>
            <button onClick={(ev) => { onRemove(ev, mail.id) }}><i class="fa-regular fa-trash-can"></i></button>
            <button onClick={(ev) => { onMarkRead(ev, mail.id) }}>{iconRead}</button>

        </article>
    )
}