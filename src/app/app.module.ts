import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameHeaderComponent } from './game-board/game-header/game-header.component';
import { GamePlaygroundComponent } from './game-board/game-playground/game-playground.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { EmitService } from './services/emit.service';
import { MainViewComponent } from './main-view/main-view.component';
import { MainTitleComponent } from './main-view/main-title/main-title.component';
import { MainOptionsComponent } from './main-view/main-options/main-options.component';

@NgModule({
  declarations: [
    AppComponent,
    GameHeaderComponent,
    GamePlaygroundComponent,
    GameBoardComponent,
    MainViewComponent,
    MainTitleComponent,
    MainOptionsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [EmitService],
  bootstrap: [AppComponent]
})
export class AppModule {}
