import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {

  orderID: any;
  Order: any;
  OrderArr: any[] = [];
  orderFilter:any[]=[]
  constructor(
    private ordersService: OrdersService,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getSingleOrder();
    this.getOrders();
  }
  getOrders() {
    this.ordersService.getOrders().subscribe((data) => {
      // this.Order = order.payload.data();
      // console.log(this.Order.order);
      this.OrderArr = [];
      data.forEach((element: any) => {
        this.OrderArr.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      // console.log(this.OrderArr.filter(user=>user.getOrder.include(`${this.orderID}`)))
      // this.OrderArr.filter(user=>user.getOrder.includes(`${this.orderID}`)).map(item=>{
      //   console.log(item.email)
      // })
      this.orderFilter= [this.OrderArr.find(o=>o.getOrder.id==this.orderID)]
      console.log(this.orderFilter)
    });
  }

  getSingleOrder() {
    this.orderID = this.route.snapshot.paramMap.get('orderID');
    console.log(this.orderID);
    // this.ordersService.getSingleOrder(this.orderID).subscribe((order) => {
    //   this.Order = order.payload.data();
    //   console.log(this.Order);
    // });
  }


}
