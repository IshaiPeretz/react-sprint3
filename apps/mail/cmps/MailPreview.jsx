import { utilService } from "../../../services/util.service.js"



export function MailPreview({ mail, onRemove, onMarkRead, openNewMail, onMarkStar }) {

    const { from, subject, isRead, body, isStarred } = mail
    let displayDate
    const date = new Date(mail.sentAt)
    if (Number.isNaN(date.getTime())) {
        displayDate = 'Draft'
    } else {
        const currentYear = new Date().getFullYear()
        const monthShortName = date.toLocaleString('default', { month: 'short' })
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const dayOfMonth = date.getDate()

        displayDate = (currentYear > year)
            ? `${dayOfMonth}/${month}/${year}`
            : `${monthShortName} ${dayOfMonth}`
    }

    const classRead = isRead ? 'read' : ''
    const classStarred = isStarred ? 'starred' : ''
    const iconRead = isRead ? <i className="fa-regular fa-envelope"></i> : <i className="fa-regular fa-envelope-open"></i>
    const iconStarred = isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>
    return (
        <article className={`mail-prev ${classRead}`} onClick={openNewMail}>
            <button className={`${classStarred}`}
                onClick={(ev) => {
                    ev.stopPropagation()
                    ev.preventDefault()
                    { onMarkStar(ev, mail) }
                }}>{iconStarred}</button>
            <h3 className="from">{from} </h3>
            <h3 className="subject">{subject} </h3>
            <h3 className="body"> {body} </h3>
            <h3 className="date">{displayDate}</h3>
            <section className="preview-btns" hidden>
                <button onClick={(ev) => {
                    ev.stopPropagation()
                    ev.preventDefault()
                    onRemove(ev, mail)
                }}><i className="fa-regular fa-trash-can"></i></button>
                <button onClick={(ev) => {
                    ev.stopPropagation()
                    ev.preventDefault()
                    { onMarkRead(ev, mail) }
                }}>{iconRead}</button>
            </section>
        </article >
    )
}