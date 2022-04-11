import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./components/add/add.component";
import { ArtistComponent } from "./components/add-artist/artist.component";
import { EditArtistComponent } from "./components/edit-artist/edit-artist.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { HomeComponent } from "./components/home/home.component";
import { SongComponent } from "./components/song/song.component";
import { SongsComponent } from "./components/songs/songs.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "songs",
        component: SongsComponent
    },
    {
        path: "songs/add",
        component: AddComponent
    },
    {
        path: "songs/:songId",
        component: SongComponent
    },
    {
        path: "songs/:songId/artists",
        component: ArtistComponent
    },
    {
        path: "songs/:songId/artists/",
        component: ArtistComponent
    },
    {
        path: "songs/:songId/artists/:artistId",
        component: EditArtistComponent
    },
    {
        path: "error",
        component: ErrorPageComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
]


export const AppRouting = RouterModule.forRoot(routes);