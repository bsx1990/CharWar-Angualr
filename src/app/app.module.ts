import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameHeaderComponent } from './game-board/game-header/game-header.component';
import { GamePlaygroundComponent } from './game-board/game-playground/game-playground.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { EmitService } from './services/emit.service';

@NgModule({
  declarations: [
    AppComponent,
    GameHeaderComponent,
    GamePlaygroundComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    EmitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
