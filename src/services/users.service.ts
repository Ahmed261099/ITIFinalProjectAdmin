import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) { }

  addUser(user: any): Promise<any> {
    if(user.role === "Engineer"){
      return this.firestore.collection('engineers').add(user);
    }
    else if(user.role === "Provider"){
      return this.firestore.collection('providers').add(user);
    }
    else
      return this.firestore.collection('users').add(user);
  }

  // , ref => ref.orderBy('name', 'asc')

  getUsers(s: string): Observable<any> {
    console.log(s);
    if(s === "engineer"){
      return this.firestore.collection('engineers').snapshotChanges();
    }
    else if(s === "provider"){
      return this.firestore.collection('providers').snapshotChanges();
    }
    else
      return this.firestore.collection('users').snapshotChanges();
  }

  getSingleUser(id: string): Observable<any> {
    return this.firestore.collection('Engineer').doc(id).snapshotChanges();
  }
}
