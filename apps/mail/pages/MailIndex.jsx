import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React


export function MailIndex() {

    const [isNewMailOpen, setIsNewMailOpen] = useState(false)
    const [mails, setMails] = useState([])
    console.log(mails)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        mailService.query()
            .then(mails => setMails(mails))
    }


    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => setMails(prevMails => prevMails.filter(mail => mailId !== mail.id)))
    }


    return (
        <section>
            {/* <button onClick={openNewMail}>Compose Mail</button> */}
            <MailList mails={mails} onRemove={removeMail} />
        </section>
    )
}

