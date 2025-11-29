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

                let todosText = ''
                if (info.todos && Array.isArray(info.todos)) {
                    todosText = info.todos.map(todo => todo.txt || '').join(' ')
                }

                return (
                    regex.test(info.txt || '') ||
                    regex.test(info.title || '') ||
                    regex.test(todosText)
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
    if (type === 'NoteTxt') return { title: '', txt: '' }
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
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#F28B82' },
            info: {
                title: 'Yes to the title',
                txt: 'Fullstack Me Baby!'
            },
        },
        {
            id: 'n102',
            createdAt: Date.now(),
            type: 'NoteImg',
            isPinned: false,
            style: { backgroundColor: '#CCFF90' },
            info: {
                url: 'https://picsum.photos/300/200',
                title: 'Bobi and Me',
            },
        },
        {
            id: 'n103',
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: '#A7FFEB' },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', isDone: true },
                    { txt: 'Coding power', isDone: false },
                ],
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: '#FFF475' },
            info: {
                title: 'Groceries',
                txt: 'Milk\nEggs\nBread\nBananas'
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: '#FBCB04' },
            info: {
                title: 'Kids',
                txt: 'Vaccination\nAfterschool class\nPlaydate'
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: '#CBF0F8' },
            info: {
                title: "Dinner reminder",
                txt: "Don't forget to defrost the chicken!"
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: '#E6C9A8' },
            info: {
                title: "",
                txt: "Meditation quote:\n“Slow down, you’re doing fine.”"
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: { backgroundColor: '#D7AEFB' },
            info: {
                title: "Workout plan",
                txt: "Mon - Chest\nTue - Back\nWed - Legs\nThu - Core\nFri - Cardio"
            },
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: '#FFADAD' },
            info: {
                title: "Packing for trip",
                todos: [
                    { txt: "Passport", isDone: false },
                    { txt: "Charger", isDone: false },
                    { txt: "Toothbrush", isDone: true },
                ]
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: '#FFD6A5' },
            info: {
                title: "Career",
                todos: [
                    { txt: "CV", isDone: true },
                    { txt: "Home task", isDone: false },
                    { txt: "Research", isDone: false },
                ]
            },
        },
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteVideo',
            isPinned: false,
            style: { backgroundColor: '#AECbFA' },
            info: {
                title: '',
                url: 'https://www.youtube.com/embed/jNQXAC9IVRw'
            }
        }

    ]

    utilService.saveToStorage(NOTE_KEY, notes)
}
