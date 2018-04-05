import { Component } from '@angular/core';
import { DrinkService } from './drink.service';
import { dataInfo, data1Info, Quantity } from './drinkModel';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-drink-dm',
  templateUrl: './drink-dm.component.html',
  styleUrls: ['./style.scss']
})
export class DrinkDmComponent {

  Quantity = Quantity;
  drinkData: dataInfo;
  drinkItem: dataInfo;
  drinkAdd: data1Info;
  index: number;
  inputName: string;
  addPriceSum: number;
  addList: any[] = [];
  addListName: any[] = [];
  inputRemark: string;
  constructor(private drinkService: DrinkService, private dbadd: AngularFirestore) {
    this.index = 0;
    this.getData();
    this.getData1();
  }

  getData() {
    this.drinkService.getData().subscribe(resp => {
      this.drinkData = resp.json();
      // console.log(this.drinkData);
    });
  }

  getData1() {
    this.drinkService.getData1().subscribe(resp => {
      this.drinkAdd = resp.json();
      // console.log(this.drinkAdd)
    });
  }

  addCheck(add) {
    if (add.addCheck) {
      this.addList.push(add.price);
      this.addListName.push(add.name);
    } else {
      let index = this.addList.findIndex(i => i === add.price);
      this.addList.splice(index, 1);
      this.addListName.splice(index, 1);
    }
    this.addPriceSum = 0;
    this.addList.forEach(i => this.addPriceSum += i);
  }

  quantityBtn(value, index) {
    this.index = index;
    if (value === this.Quantity.add) {
      this.index = this.index + 1;
    }
    if (this.index > 0 && value === this.Quantity.less) {
      this.index = this.index - 1;
    }
  }

  selectDrink(item) {
    this.drinkItem = item;
  }

  sum() {
    let sum;
    this.index > 0 
    ? sum = (this.drinkItem.price + this.addPriceSum)*this.index
    : sum = (this.drinkItem.price + this.addPriceSum)
    this.dbadd.collection('drink').add({
      'name': this.inputName,
      'drinkName': this.drinkItem.name,
      'add': this.addListName,
      'price': sum,
      'remark': this.inputRemark,
      'quantity': this.index
    });
  }
}
