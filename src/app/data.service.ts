import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private wishList = new BehaviorSubject<any>([]);
  wish = this.wishList.asObservable();
  constructor() { }
  changeWishList(wish){
    this.wishList.next(wish);
  }
}
