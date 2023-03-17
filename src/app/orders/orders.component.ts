import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { OrdersService } from 'src/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orderId: any;
  Order: any;
  orders: any[] = [];
  default: string = '../../assets/images/default.jpg';
  constructor(
    firestore: AngularFirestore,
    private authService: AuthServiceService,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.orderId = this.route.snapshot.paramMap.get('role');
    // console.log(this.orderId);
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe((data) => {
      // this.Order = order.payload.data();
      // console.log(this.Order.order);
      this.orders = [];
      data.forEach((element: any) => {
        this.orders.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.orders)
    });
  }

}
