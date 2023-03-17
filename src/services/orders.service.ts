import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }
  getOrders(): Observable<any>{
    return this.firestore.collection('orders').snapshotChanges();
 }
 getSingleOrder(id: string): Observable<any> {
    return this.firestore.collection('orders').doc(id).snapshotChanges();
}
 
}
