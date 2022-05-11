import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._category = [
            {id: 1, name: 'Категория 1'},
            {id: 2, name: 'Категория 2'},
            {id: 3, name: 'Категория 3'},
            {id: 4, name: 'Категория 4'}
        ]
        this._dates = [
            {name: 2000},
            {name: 2001},
            {name: 2002},
            {name: 2003}
        ]
        makeAutoObservable(this)
    }

    setCategories(category){
        this._category = category
    }

    setDates(dates){
        this._dates = dates
    }

    get category(){
        return this._category
    }

    get dates(){
        return this._dates
    }
}
