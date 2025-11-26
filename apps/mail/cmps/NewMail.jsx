
const { useState } = React 

export function NewMail({ onClose, onSendMail }) {

    const [mailInput, setMailInput] = useState()



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
        mailInput.sentAt = Date.now()
        mailInput.from = 'user@appsus.com'
        mailInput.isRead = true


        onSendMail(mailInput)

        onClose()
    }


    return (
        <div className="new-mail-modal">

            <h2 className="modal-header">New mail</h2>

            <form onSubmit={onSend}>
                <input type="email" className="to" name="to" placeholder="To" required onChange={handleChange} />
                <input type="text" className="subject" name="subject" placeholder="Subject" onChange={handleChange} />
                <textarea type="body" className="body" name="body" placeholder="" onChange={handleChange} />

                <section className="modal-buttons">
                    <button  className ="header-btn" type="button" onClick={onClose}>x</button>
                    <button type="submit">Send</button>
                </section>
            </form>
        </div>
    )
}