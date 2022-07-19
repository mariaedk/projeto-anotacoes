import { AnotacoesAddComponent } from './components/anotacoes/anotacoes-add/anotacoes-add.component';
import { CategoriaAddComponent } from './components/categoria/categoria-add/categoria-add.component';
import { CategoriaListComponent } from './components/categoria/categoria-list/categoria-list.component';
import { HomeComponent } from './components/home/home.component';
import { AnotacoesListComponent } from './components/anotacoes/anotacoes-list/anotacoes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/notas', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {path: 'categorias', component: CategoriaListComponent},
  {path: 'categoria-add', component: CategoriaAddComponent},
  {path: 'categoria-update/:id', component: CategoriaAddComponent},

  {path: 'notas', component: AnotacoesListComponent},
  {path: 'notas-add', component: AnotacoesAddComponent},
  {path: 'notas-update/:id', component: AnotacoesAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
