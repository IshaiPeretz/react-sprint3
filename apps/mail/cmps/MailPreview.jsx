import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail, onRemove, onMarkRead }) {

    const { from, subject, isRead, body } = mail

    const date = utilService.formatCustomDate(mail.sentAt)

    const classRead = isRead ? 'read' : ''
    const iconRead = isRead ? <i className="fa-regular fa-envelope"></i> : <i className="fa-regular fa-envelope-open"></i>
    return (
        <article className={`mail-prev ${classRead}`}>
            <h3 className="from">{from}</h3>
            <h3 className="subject">{subject} </h3>
            <h3 className="body"> {body} </h3>
            <h3 className="date">{date}</h3>
            <button onClick={(ev) => { onRemove(ev, mail.id) }}><i className="fa-regular fa-trash-can"></i></button>
            <button onClick={(ev) => { onMarkRead(ev, mail) }}>{iconRead}</button>
        </article >
    )
}