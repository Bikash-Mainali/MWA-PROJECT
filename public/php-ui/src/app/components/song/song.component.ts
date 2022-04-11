import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Songs } from 'src/app/models/songs';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song!: any;
  showAddArtistForm: boolean = true;
  showHideEditForm:boolean= true;
  showArtistList: boolean = true;
  isEditArtist: boolean = false;
  constructor(private route: ActivatedRoute,
    private songService: SongsService,
    private _router: Router,
   // private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    const songId = this.route.snapshot.params["songId"];
    this.songService.getOne(songId).subscribe({
      next: response => {
        console.log(response)
        this.song = response
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

  onDelete(song: any): void {
    this.songService.deleteOne(song._id).subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        //this.toastrService.error("Failed")
        this._router.navigate(["error"]);
      },
      complete: () => {
        //this.toastrService.success("Success")
        this._router.navigate(["songs"]);
      }
    })
  }


  onAddArtist(song: Songs){
    this._router.navigate(["artist"])
    this.showAddArtistForm = true;
  }

  onEditSong(song: Songs){
    this.showHideEditForm = false;

  }
  onEditArtist(song: any){
    console.log(song.artists)
    this.showAddArtistForm = true;
    this.showArtistList = false;
    this.isEditArtist = true;
  }
}
