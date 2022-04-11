import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
})
export class SongsComponent implements OnInit {

  songs: any

  constructor(private songService: SongsService, private _router: Router) { }

  ngOnInit(): void {
    this.songService.getAllSongs({ value: false, searchCriteria: '' })
      .subscribe({
        next: response => {
          this.songs = response;
        },
        error: err => {
          this._router.navigate(["error"])
        },
        complete: () => console.log('complete')
      },
      )
  }

  searchSong(searchForm: NgForm) {
    this.songService.getAllSongs({ value: true, searchCriteria: searchForm .value})
      .subscribe({
        next: response => {
          this.songs = response;
        },
        error: err => {
          this._router.navigate(["error"])
        },
        complete: () => console.log('complete')

      },
      )
  }
}

