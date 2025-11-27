import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail, onRemove, onMarkRead }) {

    const { from, subject, isRead, body } = mail

    const date = new Date(mail.sentAt)
    const currentYear = new Date().getFullYear()
    const monthShortName = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const dayOfMonth = date.getDate()

    const displayDate = (currentYear > year) ? `${dayOfMonth}/${month}/${year}` : `${dayOfMonth} - ${monthShortName}`


    const classRead = isRead ? 'read' : ''
    const iconRead = isRead ? <i className="fa-regular fa-envelope"></i> : <i className="fa-regular fa-envelope-open"></i>
    return (
        <article className={`mail-prev ${classRead}`}>
            <h3 className="from">{from}</h3>
            <h3 className="subject">{subject} </h3>
            <h3 className="body"> {body} </h3>
            <h3 className="date">{displayDate}</h3>
            <section className="prev-btns" hidden>
                <button onClick={(ev) => { onRemove(ev, mail.id) }}><i className="fa-regular fa-trash-can"></i></button>
                <button onClick={(ev) => { onMarkRead(ev, mail) }}>{iconRead}</button>
            </section>
        </article >
    )
}