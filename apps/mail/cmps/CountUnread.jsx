


export function CountUnread({ mails, activeFolder }) {

    let unread
    if (activeFolder === 'inbox') {
        unread = mails.reduce((acc, mail) => {

            if (!mail.isRead) {
                acc++
            }
            return acc
        }, 0)
    }
    
    return (
        <section className="unread-counter">{unread}</section>
    )
}