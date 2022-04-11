import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Songs } from 'src/app/models/songs';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

registrationForm!:FormGroup

  constructor(private songsService: SongsService,
     private _router: Router) {
    this.registrationForm = new FormGroup({
      title: new FormControl(''),
      genre: new FormControl(''),
      releasedDate: new FormControl(''),

    })
  }

  ngOnInit(): void {
  }

  addForm(){
    this.songsService.addOne(this.registrationForm.value).subscribe({
      next: response => {
      },
      error: err =>{
        //this.toastrService.error("Failed");
        this._router.navigate(["error"])

      },
      complete: () =>{
        //this.toastrService.success("Song added successfully");
        this._router.navigate(["songs"])
      }
    })
  }
}
