


export function CountUnread({ mails }) {

    const unread = mails.reduce((acc, mail) => {
        if (!mail.isRead ) {
            acc++
        }
        return acc
    }, 0)



    return (
        <section className="unread-counter">
           {unread} 
        </section >
    )
}