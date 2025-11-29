
const { useState, useEffect, Fragment } = React

export function MailFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterToEdit] = useState(defaultFilter)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value


        switch (target.type) {
            case 'radio':
                if (field === 'isRead') {
                    if (value === 'true') value = true
                    else if (value === 'false') value = false
                    else value = null
                }
                break
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


    const { text, isRead } = filterByToEdit
    return (
        <Fragment>
            <section className="filter-container">
                <form>
                    <label htmlFor="text"></label>
                    <input onChange={handleChange} value={text} name="text" id="text" type="text" placeholder="Search mail" />
                </form>
            </section >
            <section className="radio-container">
                <label htmlFor="isRead">Read
                    <input onChange={handleChange} checked={isRead === true} value={'true'} name="isRead" id="isRead" type="radio" />
                </label>
                <label htmlFor="unRead">Unread
                    <input onChange={handleChange} checked={isRead === false} value={'false'} name="isRead" id="unRead" type="radio" />
                </label>
                <label htmlFor="all">All
                    <input onChange={handleChange} checked={isRead === null} value={''} name="isRead" id="all" type="radio" />
                </label>
            </section>
        </Fragment>
    )
}

