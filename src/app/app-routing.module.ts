import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './main-view/main-view.component';
import { GameBoardComponent } from './game-board/game-board.component';

const routes: Routes = [{ path: '', component: MainViewComponent }, { path: 'game-board', component: GameBoardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
