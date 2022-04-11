import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artists } from 'src/app/models/artists';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

  role!: {}[]
  editFormData!: FormGroup
  showHideNotification: boolean = true;

  artistId = this.route.snapshot.params["artistId"];
  songId = this.route.snapshot.params["songId"];
  constructor(private route: ActivatedRoute,
    private artistService: ArtistsService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this.role = [
      { name: "Singer" },
      { name: "Writer" },
      { name: "Composer" }
    ];
    this.artistService.getOne(this.songId, this.artistId).subscribe({
      next: response => {
        console.log(response)
        this.editFormData = new FormGroup({
          name: new FormControl(response.name),
          role: new FormControl(response.role),
        })
      },
      error: err => {
        //this.toastrService.error("Failed")
        this._router.navigate(["error"]);
      },
      complete: () => {
        //this.toastrService.success("Success")
      }
    })

  }


  onUpdate() {
    let roleNames = [];
    console.log("...")
    console.log(this.editFormData.value)
    for (let r of this.editFormData.value.role) {
      roleNames.push(r.name);
    }
    console.log(roleNames)
    let postData = new Artists(this.editFormData.value.name, roleNames)
    this.artistService.updateOne(postData, this.songId, this.artistId)
      .subscribe({
        next: response => {
        },
        error: err => {
          this._router.navigate(["error"])
        },
        complete: () => {
          this.showHideNotification = false;
          this._router.navigate([`songs`]);

        }
      })
  }

  onDelete(songId: string, artistId: string): void {
    this.artistService.deleteOne(songId, artistId).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        //this.toastrService.error("Failed")
        this._router.navigate(["error"]);
      },
      complete: () => {
        //this.toastrService.success("Success")
        // this._router.navigate(["artist"]);
        this.editFormData.reset();

      }
    })
  }
}
