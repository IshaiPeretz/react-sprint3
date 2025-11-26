import { utilService } from "../../../services/util.service"

export function MailPreview({ mail }) {
    console.log(mail)



    
    
    const { from, subject, sentAt } = mail
 
    return (
        <article className='mail-prev'>
            <h1>{from}</h1>
            <h1>{subject}</h1>
            <h1>{sentAt}</h1>
        </article>
    )
}