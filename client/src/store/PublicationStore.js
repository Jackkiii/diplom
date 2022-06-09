import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._category = []
        this._selectedCategory = {}
        this._selectedCategoryDel = {}
        this._author = []
        this._selectedAuthor = []
        this._date = []
        this._selectedData = []
        this._publication = []
        this._name = []
        this._checkName = []
        this._selectedName = []
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

    setName(name){
        this._name = name
    }

    setCheckName(name){
        this._checkName = name
    }

    setSelectedName(name){
        this.setPage(1)
        this._selectedName = name
    }

    setAuthor(author){
        this._author = author
    }

    setSelectedAuthor(author){
        this.setPage(1)
        this._selectedAuthor = author
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

    get author(){
        return this._author
    }

    get selectedAuthor(){
        return this._selectedAuthor
    }

    get selectedDate(){
        return this._selectedData
    }

    get checkName(){
        return this._checkName
    }

    get publication(){
        return this._publication
    }

    get name(){
        return this._name
    }

    get selectedName(){
        return this._selectedName
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
