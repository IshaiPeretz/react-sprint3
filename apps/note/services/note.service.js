import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const NOTE_KEY = 'noteDB'

export const notesService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

_createNotes()

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY).then(notes => {
        if (!notes || !notes.length) return []

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => {
                const info = note.info || {}
                return (
                    regex.test(info.txt || '') ||
                    regex.test(info.title || '')
                )
            })
        }

        if (filterBy.type && filterBy.type !== 'all') {
            notes = notes.filter(note => note.type === filterBy.type)
        }

        return notes
    })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, note)
    return storageService.post(NOTE_KEY, note)
}

function getEmptyNote(type = 'NoteTxt') {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: { backgroundColor: '#fff' },
        info: _getEmptyInfo(type),
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        type: 'all',
    }
}

function _getEmptyInfo(type) {
    if (type === 'NoteTxt') return { txt: '' }
    if (type === 'NoteImg') return { url: '', title: '' }
    if (type === 'NoteVideo') return { url: '', title: '' }
    if (type === 'NoteTodos') return { title: '', todos: [] }
    return {}
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (notes && notes.length) return

    notes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#00d' },
            info: { txt: 'Fullstack Me Baby!' },
        },
        {
            id: 'n102',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            style: { backgroundColor: '#0d0' },
            info: {
                url: 'https://picsum.photos/300/200',
                title: 'Bobi and Me',
            },
        },
        {
            id: 'n103',
            createdAt: 1112224,
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: '#d00' },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', isDone: true },
                    { txt: 'Coding power', isDone: false },
                ],
            },
        },
    ]

    utilService.saveToStorage(NOTE_KEY, notes)
}
