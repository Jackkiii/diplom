import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._category = []
        this._group = []
        this._dates = [
            {name: 2000},
            {name: 2001},
            {name: 2002},
            {name: 2003}
        ]
        this._publications = [
            {id: 1, name: 'Первая публикация', author: 'автор1', file: 'Скачать', info: 'Информация'},
            {id: 2, name: 'Вторая публикация', author: 'автор2', file: 'Скачать', info: 'Информация'},
            {id: 3, name: 'Третья публикация', author: 'автор3', file: 'Скачать', info: 'Информация'},
            {id: 4, name: 'Четвертая публикация', author: 'автор4', file: 'Скачать', info: 'Информация'},
            {id: 5, name: 'Пятая публикация', author: 'автор5', file: 'Скачать', info: 'Информация'},
        ]
        makeAutoObservable(this)
    }

    setCategories(category){
        this._category = category
    }

    setDates(dates){
        this._dates = dates
    }

    setPublications(publications){
        this._dates = publications
    }

    setGroup(group){
        this._group = group
    }

    get category(){
        return this._category
    }

    get dates(){
        return this._dates
    }

    get publications(){
        return this._publications
    }

    get group(){
        return this._group
    }
}
