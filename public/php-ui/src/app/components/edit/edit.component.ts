import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Songs } from 'src/app/models/songs';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input()
  song!: Songs
  editFormData!: FormGroup
  dateValue!:any
  showHideNotification: boolean = true;

  constructor(private songsService: SongsService,
    private _router: Router) {

  }

  ngOnInit(): void {
    const year = this.song.releasedDate.toString().substring(0, 4);
    const month = this.song.releasedDate.toString().substring(5, 7);
    const day = this.song.releasedDate.toString().substring(8, 10);
    let releasedDate = month + "/" + day + "/" + year;
    //this.dateValue = releasedDate
    this.editFormData = new FormGroup({
      title: new FormControl(this.song.title),
      genre: new FormControl(this.song.genre),
      releasedDate: new FormControl(releasedDate),
    })
  }

  onUpdate() {
    this.songsService.updateOne(this.editFormData.value, this.song._id) 
        .subscribe({
      next: response => {
      },
      error: err => {
        this._router.navigate(["error"])
      },
      complete: () => {
        this.showHideNotification = false;
      }
    })
  }
}
