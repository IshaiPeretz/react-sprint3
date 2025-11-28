import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function NewMail({ onClose, onSendMail, editingMail }) {

    const [mailInput, setMailInput] = useState(editingMail || {})

    useEffect(() => {
        setMailInput(editingMail || {})
    }, [editingMail])

    function handleChange({ target }) {
        const { type, name: field } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setMailInput(prevInput => ({ ...prevInput, [field]: value }))
    }

    function onSend(ev) {
        ev.preventDefault()
        const mail = {
            to: mailInput.to || '',
            subject: mailInput.subject || '',
            body: mailInput.body || '',
            sentAt: Date.now(),
            createdAt: Date.now(),
            from: mailService.loggedInUser.email,
            isRead: true
        }
        onSendMail(mail)
        onClose()
    }
    function saveDraft() {
        const mail = {
            to: mailInput.to || '',
            subject: mailInput.subject || '',
            body: mailInput.body || '',
            createdAt: Date.now(),
            sentAt: null,
            from: mailService.loggedInUser.email,
            isRead: true
        }
        onSendMail(mail)
        onClose()
    }

    return (
        <div className="new-mail-modal">

            <h2 className="modal-header">New Message

                <button className="header-btn"
                    type="button"
                    onClick={saveDraft}>
                    <i className="fa-solid fa-x"></i>
                </button>
            </h2>

            <form onSubmit={onSend}>
                <input
                    type="email"
                    className="to"
                    name="to"
                    placeholder="To"
                    required
                    value={mailInput.to || ''}
                    onChange={handleChange} />

                <input
                    type="text"
                    className="subject"
                    name="subject"
                    placeholder="Subject"
                    value={mailInput.subject || ''}
                    onChange={handleChange} />
                <textarea
                    type="body"
                    className="body"
                    name="body"
                    placeholder=""
                    value={mailInput.body || ''}
                    onChange={handleChange} />

                <section className="modal-buttons">

                    <button className="send-btn" type="submit">Send</button>
                </section>
            </form>
        </div>
    )
}