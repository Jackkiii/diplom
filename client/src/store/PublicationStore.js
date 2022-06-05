import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._category = []
        this._selectedCategory = {}
        this._selectedCategoryDel = {}
        this._date = []
        this._selectedData = []
        this._publication = []
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setCategories(category){
        this._category = category
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }

    setSelectedCategoryDel(category) {
        this._selectedCategoryDel = category
    }

    setDate(date){
        this._date = date
    }

    setSelectedDate(date){
        this.setPage(1)
        this._selectedData = date
    }

    setPublication(publication){
        this._publication = publication
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get category(){
        return this._category
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get selectedCategoryDel() {
        return this._selectedCategoryDel
    }

    get date(){
        return this._date
    }

    get selectedDate(){
        return this._selectedData
    }

    get publication(){
        return this._publication
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}
