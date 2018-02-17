import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wishList';
  wishText:string;
  wishId:string;
  count:number = 0;
  wishList:any = [];
  loader:boolean = true;
  submitBtnText:string = "Add wish";
  login:any = {
    username: '',
    password: ''
  };
  loggedInUser:string;

  constructor(private _data:DataService, private toaster:ToastrService){ }
  ngOnInit(){
    if(sessionStorage){
      let userKey = sessionStorage.getItem('loginuserKey')
      if(userKey){
        this.loggedInUser = userKey;
        this.runWishManagementProcess()
      }
    } else {
      this.toaster.error("Sorry, your browser do not support storage.","Error");
    }
  }
  reset(){
    this.wishText = ""
    this.wishId = ""
    this.submitBtnText= "Add wish";
  }
  addOrUpdateItemToWishList() {
    if(this.wishText){
      let formatDate = this.formatDate(new Date()),
          userKey = sessionStorage.getItem('loginuserKey'),
          wishObj = {
            user: userKey,
            wish: this.wishText
          };
      if(this.wishId){
        wishObj['updatedDate'] = formatDate;
        this._data.updateWish(this.wishId,wishObj)
        this.toaster.success('Submitted Successfully','Wish Updated');
      } else {
        wishObj['createdDate'] = formatDate;
        this._data.insertWishToList(wishObj)
        this.toaster.success('Submitted Successfully','Wish Created');
      }
      this.reset()
    }
  }
  removeWishItem(key:string){
    if(key){
      this._data.removeWish(key)
      this.toaster.warning('Submitted Successfully','Wish Deleted');
      this.count = this.wishList.length
    }
  }
  formatDate(date:Date){
    if(date){      
      return date.getDate() + "-"
            + (date.getMonth()+1)  + "-" 
            + date.getFullYear() + " "  
            + date.getHours() + ":"  
            + date.getMinutes() + ":" 
            + date.getSeconds();
    }
  }
  editWishItem(key:string){
    if(key){
      let result = this.wishList.find(item=>item.$key===key)
      this.wishText = result.wish
      this.wishId = key
      this.submitBtnText = "Update wish"
    }
  }
  getUserWishes(){
    if(this.login.username && this.login.password){
      let loginuserKey = this.login.username+'#$@#'+this.login.password
      sessionStorage.setItem('loginuserKey',loginuserKey)
      this.loggedInUser = this.login.username
      this.runWishManagementProcess();
    }
  }
  logoutUser(){
    sessionStorage.removeItem('loginuserKey');
    this.loggedInUser = "";
  }
  runWishManagementProcess(){
    let wishList = this._data.getWishList();
    wishList.snapshotChanges().subscribe(item=>{
      this.wishList = [];
      item.forEach(element =>{
        let adhoc = element.payload.toJSON()
        adhoc['$key'] = element.key
        this.wishList.push(adhoc)
        this.count = this.wishList.length
        this.loader = false
      })
    })
    this.reset()
  }
}
