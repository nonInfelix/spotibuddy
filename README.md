
# Spotify-zu-YouTube Playlist Konverter

Dieses Projekt ermöglicht es Benutzern, ihre Spotify-Playlists nahtlos in YouTube-Playlists zu konvertieren. Es nutzt Angular für die Front-End-Entwicklung und eine eigens entwickelte API für die Backend-Logik.

__Die App befindet sich im Entwicklung, deswegen sind nur begrenzte Kontingente seitens Youtube verfügbar. Google setzt dabei voraus, dass verbundene Google Konten auf der Testnutzer-Liste sind.__




## Tech Stack

**Client:** Angular v17, PrimeNG, SCSS

**Server:** Node, Express, Axios

## Screenshots
![Screenshot 2023-12-08 140454](https://github.com/nonInfelix/spotibuddy/assets/96667784/7f67d366-acee-41fe-91e8-4626b6c39a79)



## API Reference
https://github.com/nonInfelix/spotibuddy-api
#### Authentifizierung
Weiterleitung zur Route login
```http
  GET /auth
```
#### Weiterleitung Spotify OAuth
Weiterleitung zur spotify Login Seite, Weiterleitung zur redirect URI von spotify
```http
  GET /login
```
#### callback Funktion
Fordert per axios den AccessToken, RefreshToken und Ablaufdatum an.
Gibt AccessToken und RefreshToken als Cookie zurück. 
Leitet weiter an Frontend /playlist?log=1
```http
  GET /callback
```

#### Spotify User Profil
__erfordert AccessToken__. 
Fordert eigene Profildaten an.
```http
  GET /user-profile
```

#### Spotify User Playlists
__erfordert AccessToken__. 
Fordert eigene Playlists an.
```http
  GET /user-playlists
```
#### Spotify load more playlists
__erfordert AccessToken__. 
Fordert mehr Playlists an. 
```http
  GET /load-more-playlists?offset=${offset}
```
#### Spotify load more playlists
__erfordert AccessToken und offset Wert (z.B. 50)__. 
Fordert mehr Playlists an. 
```http
  GET /load-more-playlists?offset=${offset}
```
#### Spotify Lieder von ausgewählter Playlist
__erfordert AccessToken und Playlist-ID__. 
Fordert mehr Playlists an. 
```http
  GET /playlist-tracks?id=${id}
```
#### Google Anmeldung
Leitet weiter an Google Anmeldefenster, danach an /google/callback
Fordert mehr Playlists an. 
```http
  GET /google-auth
```
#### Google callback
Fordert AccessToken an.
Erstellt Youtube Playlist. Durchsucht Youtube nach den Liedern der Playlist.
Fügt Lieder in die Playlist ein. (zu finden unter spotify-converter + zufälliger, 10-stelliger string) __queryLimit muss eingestellt werden, sonst können nur 2 Lieder umgewandelt werden (default = 2)__
Weiterleitung zur /confirm Seite des Frontends
```http
  GET /google/callback
```
### Umgebungsvariablen API
    PORT
    CLIENT_ID (Spotify)
    CLIENT_SECRET (Spotify)
    REDIRECT_URI (Spotify)
    YT_CLIENT_ID (YouTube)
    YT_CLIENT_SECRET (YouTube)
    YT_REDIRECT_URI (YouTube)

## SpotifyConverter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
