import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._group = []
        this._selectedGroup=[]
        this._selectedGroupDel = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    setSelectedGroup(group) {
        this.setPage(1)
        this._selectedGroup = group
        //console.log('selected group id', group.id, group.name)
    }

    setSelectedGroupDel(group) {
        this._selectedGroupDel = group
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

    get isAuth(){
        return this._isAuth
    }

    get getUser() {
        return this._user
    }

    get selectedGroup() {
        return this._selectedGroup
    }

    get selectedGroupDel() {
        return this._selectedGroupDel
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
