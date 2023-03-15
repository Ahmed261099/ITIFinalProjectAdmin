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

  getSingleUser(id: string ,userRole:string ): Observable<any> {
    if(userRole === "Engineer")
    {
    return this.firestore.collection('engineers').doc(id).snapshotChanges();
    }
    else if( userRole === "Provider")
    {
      return this.firestore.collection('providers').doc(id).snapshotChanges();
    }
    else
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }

  updateUser(id: string, userRole:string ,data:any): Promise<any> {
    if(userRole === "Engineer")
    {
    return this.firestore.collection('engineers').doc(id).update(data);
    }
    else if( userRole === "Provider")
    {
      return this.firestore.collection('providers').doc(id).update(data);
    }
    else
    return this.firestore.collection('users').doc(id).update(data);
  }

}



