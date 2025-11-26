import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemove }) {

    const { from, subject, sentAt } = mail

    const date = utilService.getMonthNameAndDay(sentAt)
 
    
    return (
        <article className='mail-prev'>
            <h1>{from}</h1>
            <h1>{subject}</h1>
            <h1>{date.monthName}-{date.day}</h1>
            <button onClick={() => onRemove(mail.id)}>x</button>
        </article>
    )
}