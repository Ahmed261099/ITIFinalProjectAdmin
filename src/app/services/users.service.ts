import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // addresses: Observable<any>;


  constructor(private firestore: AngularFirestore) {
    // this.addresses = null;
  }

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

  getUsers(s: string): Observable<any> {
    console.log(s);
    if(s === "engineer"){
      return this.firestore.collection('engineers', ref => ref.orderBy('name'.toLowerCase(), 'asc')).snapshotChanges();
    }
    else if(s === "provider"){
      return this.firestore.collection('providers', ref => ref.orderBy('name'.toLowerCase(), 'asc')).snapshotChanges();
    }
    else
      return this.firestore.collection('users', ref => ref.orderBy('name'.toLowerCase(), 'asc')).snapshotChanges();
  }

  getSingleUser(id: string, role: any): Observable<any> {
    console.log(role);
    if(role === "Engineer"){
      return this.firestore.collection('engineers').doc(id).snapshotChanges();
    } else if( role === "Provider"){
      return this.firestore.collection('providers').doc(id).snapshotChanges();
    } else {
      return this.firestore.collection('users').doc(id).snapshotChanges();
    }
  }


  // deleteField(id: string){
  //   this.firestore.doc(`/engineers/${id}/feedback[0]`).delete();
  // }

  editField(id: string, data:any): Promise<any> {
    return this.firestore.collection('providers').doc(id).update(data);
  }

  deleteSingleUser(id: string): Promise<any>{
    return this.firestore.collection('providers').doc(id).delete();
  }

}
