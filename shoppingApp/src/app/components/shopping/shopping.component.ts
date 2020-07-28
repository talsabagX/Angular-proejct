import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  public isShowCartView: boolean
  constructor() { }

  ngOnInit() {
    this.isShowCartView = true
  }


  public showCartSideBar() {
    this.isShowCartView = true
  }

  public hideCartSideBar() {
    this.isShowCartView = false
  }


}
