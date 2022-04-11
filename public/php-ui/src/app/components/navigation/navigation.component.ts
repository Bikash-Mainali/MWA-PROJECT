import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  onAdd():void{
    this._router.navigate(["songs/add"])
  }
  
  onHome():void{
    this._router.navigate([""])
  }
  onSongs(): void{
    this._router.navigate(["songs"])
  }
}
