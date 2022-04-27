import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const noteService = {
    getById,
    query,
    savenote,
    remove,
    getVendors,
    getNextnoteId,
    getNotes
}

const KEY = 'notesDB'
var gNotes = [
    { id: "n101", type: "note-txt", isPinned: true, info: { txt: "Fullstack Me Baby!" } },
    { id: "n102", type: "note-img", info: { url: "https://cdn.britannica.com/16/177616-050-0167E767/Casablanca-Morocco.jpg", title: "Bobi and Me" }, style: { backgroundColor: "#00d" } },
    { id: "n103", type: "note-todos", info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } }];


function getNotes() {
    console.log('im here')
    return gNotes
}

function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes) {
        notes = _createnotes()
        _saveToStorage(notes)
    }

    if (filterBy) {
        let { vendor, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        notes = notes.filter(note =>
            note.vendor.includes(vendor) &&
            note.speed <= maxSpeed &&
            note.speed >= minSpeed)
    }

    return Promise.resolve(notes)
}

function getNextnoteId(noteId) {
    const notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => noteId === note.id)
    const nextnoteIdx = (noteIdx + 1 === notes.length) ? 0 : noteIdx + 1
    return notes[nextnoteIdx].id
}

function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function remove(noteId) {
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
}

function savenote(note) {
    if (note.id) return _update(note)
    else return _add(note)
}

function _add(noteToAdd) {
    let notes = _loadFromStorage()
    const note = _createnote(noteToAdd.vendor, noteToAdd.speed)
    notes = [note, ...notes]
    _saveToStorage(notes)
    return Promise.resolve()
}

function _update(noteToUpdate) {
    let notes = _loadFromStorage()
    notes = notes.map(note => note.id === noteToUpdate.id ? noteToUpdate : note)
    _saveToStorage(notes)
    return Promise.resolve()
}

function getVendors() {
    return gNotes
}

function _createnote(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        id: utilService.makeId(),
        vendor,
        speed,
        desc: utilService.makeLorem(),
        ctg: (Math.random() > 0.5) ? 'bestSeller' : 'stam'
    }
}

function _createnotes() {
    const notes = []
    for (let i = 0; i < 20; i++) {
        const vendor = gNotes[utilService.getRandomIntInclusive(0, gNotes.length - 1)]
        notes.push(_createnote(vendor))
    }
    return notes
}

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}