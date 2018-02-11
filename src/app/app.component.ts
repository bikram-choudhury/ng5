import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  wishText:string;
  count:number;
  wishList:any = [];

  constructor(private _data:DataService){ }
  ngOnInit(){
    this._data.wish.subscribe(res => this.wishList = res)
    this._data.changeWishList(this.wishList)
    this.count = this.wishList.length;
  }
  addItemToWishList() {
    if(this.wishText){
      this.wishList.push(this.wishText);
      this.wishText = ""; 
      this._data.changeWishList(this.wishList)
      this.count = this.wishList.length;
    }
  }
  removeWishItem(index){
    this.wishList.splice(index,1);
    this.count = this.wishList.length;
    this._data.changeWishList(this.wishList)
  }
}
