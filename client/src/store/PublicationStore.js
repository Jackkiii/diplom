import {makeAutoObservable} from "mobx";

export default class PublicationStore {
    constructor() {
        this._category = []
        this._selectedCategory = {}
        this._selectedCategoryDel = {}
        this._selectedGroup = {}
        this._selectedGroupDel = {}
        this._group = []
        this._dates = [
            {name: 2000},
            {name: 2001},
            {name: 2002},
            {name: 2003}
        ]
        this._publication = []
        this._page = 1
        this._totalCount = 0
        this._limit = 20
        makeAutoObservable(this)
    }

    setCategories(category){
        this._category = category
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    setSelectedCategoryDel(category) {
        this._selectedCategoryDel = category
    }

    setSelectedGroup(group) {
        this._selectedGroup = group
    }

    setSelectedGroupDel(group) {
        this._selectedGroupDel = group
    }

    setDates(dates){
        this._dates = dates
    }

    setPublication(publication){
        this._publication = publication
    }

    setGroup(group){
        this._group = group
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

    get selectedGroup() {
        return this._selectedGroup
    }

    get selectedGroupDel() {
        return this._selectedGroupDel
    }

    get dates(){
        return this._dates
    }

    get publication(){
        return this._publication
    }

    get group(){
        return this._group
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
