import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NewMail } from "../cmps/NewMail.jsx"
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
            .then(() => setMails(mails => mails.filter(mail => mailId !== mail.id)))
    }
    function sendMail() {

    }


    function sendMail(mail) {
        mailService.save(mail)
            .then(mail => {
                setMails(mails => [...mails, mail])
            })


    }

    function openNewMail() {
        setIsNewMailOpen(true)
    }
    function closeNewMail() {
        setIsNewMailOpen(false)
    }

    return (
        <section className = "main-container">
            <button className ="compose-btn" onClick={openNewMail}><i class="fa-solid fa-pen"></i></button>
            {isNewMailOpen && <NewMail onClose={closeNewMail} onSendMail={sendMail} />}
            <MailList mails={mails} onRemove={removeMail} />
        </section>
    )
}

