import { Component } from '@angular/core';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss']
})
export class SideBarMenuComponent {
  showFiller = false;
  categories:Array<any> = []
  constructor(private _Categoryservice:CategoryService)
  {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }
  getCategories()
  {
    this._Categoryservice.getCategories().subscribe( data => {
        data.forEach((element:any) => {
            this.categories.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
            })
        });
    } )
  }


}
