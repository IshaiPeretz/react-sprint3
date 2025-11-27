

const { useState, useEffect } = React

export function MailFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterToEdit] = useState({ ...defaultFilter })


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'isRead') {
            if (value === 'true') value = true
            else if (value === 'false') value = false
            else value = null
        }
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break

        }

        setFilterToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }

    console.log(filterByToEdit)

    const { text, isRead } = filterByToEdit
    return (
        <section className="filter-container">
            <form>
                <label htmlFor="text">Search</label>
                <input onChange={handleChange} value={text} name="text" id="text" type="text" />

                <label htmlFor="isRead">Read</label>
                <input onChange={handleChange} checked={isRead === true} value={true} name="isRead" id="isRead" type="radio" />

                <label htmlFor="unRead">Unread</label>
                <input onChange={handleChange} checked={isRead === false} value={false} name="isRead" id="unRead" type="radio" />

                <label htmlFor="all">All</label>
                <input onChange={handleChange} checked={isRead === null} value={''} name="isRead" id="all" type="radio" />

            </form>
        </section>
    )
}

