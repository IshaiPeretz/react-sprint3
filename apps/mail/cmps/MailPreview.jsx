import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemove }) {

    const { from, subject, sentAt } = mail

    const date = utilService.getMonthNameAndDay(sentAt)
 
    
    return (
        <article className='mail-prev'>
            <h3>{from}</h3>
            <h3>{subject}</h3>
            <h3>{date.monthName}-{date.day}</h3>
            <button onClick={() => onRemove(mail.id)}>x</button>
        </article>
    )
}