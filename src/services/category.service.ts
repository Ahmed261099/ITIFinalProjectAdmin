import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) {

   }
   getCategories(): Observable<any>
   {
      return this.firestore.collection('categories').snapshotChanges();
   }

   getProducts(id: string): Observable<any>{
      return this.firestore.collection('categories').doc(id).snapshotChanges();
   }

   getSingleProduct(id: string): Observable<any>{
    return this.firestore.collection('engineers').doc(id).snapshotChanges();
   }

   addProduct(id: string, data: any): Promise<any>{                        // will solve with update
    return this.firestore.collection('categories').doc(id).update(data);
   }

   updateProduct(id: string, data: any): Promise<any>{
    return this.firestore.collection('engineers').doc(id).update(data);
   }
}
