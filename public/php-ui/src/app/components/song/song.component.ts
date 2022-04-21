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
   private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const songId = this.route.snapshot.params["songId"];
    this.songService.getOne(songId).subscribe({
      next: songResponse => {
        console.log(songResponse)
        this.song = songResponse
        this._toastr.success("Song fetched successfully")
      },
      error: err => {
        this._toastr.error("Failed")
        this._router.navigate(["error"]);
      },
      complete: () => {
      }
    })
  }

  onDelete(song: any): void {
    this.songService.deleteOne(song._id).subscribe({
      next: songResponse => {
        this._toastr.success("Song deleted successfully")
      },
      error: err => {
        this._router.navigate(["error"]);
        this._toastr.error("Failed")
      },
      complete: () => {
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
