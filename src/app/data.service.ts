import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  wishList: AngularFireList<any>;
  selectedWish:any;
  constructor(private firebase: AngularFireDatabase) { }
  getWishList(userKey?:string){
    let queryObj = {};
    if(userKey){
      this.wishList = this.firebase.list('wish', ref=>ref.orderByChild('user').equalTo(userKey));
    } else {
      this.wishList = this.firebase.list('wish');
    }
    return this.wishList;
  }
  insertWishToList(wish:any){
    this.wishList.push(wish);
  }
  updateWish(wishId:string,wish:any){
    this.wishList.update(wishId,wish);
  }
  removeWish(wishId:string){
    this.wishList.remove(wishId);
  }

}
