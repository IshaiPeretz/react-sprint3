
const { useState } = React

export function NewMail({ onClose, onSendMail}) {

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


        onSendMail(mailInput)

        onClose()
    }


    return (
        <div className="new-mail-modal">

            <h2>New mail</h2>

            <form onSubmit={onSend}>
                <input type="email" name="to" placeholder="To" required onChange={handleChange} />
                <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
                <input type="body" name="body" placeholder="body" onChange={handleChange} />

                <section className="modal-buttons">
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="submit">Send</button>
                </section>
            </form>
        </div>
    )
}