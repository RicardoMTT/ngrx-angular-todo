import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos, setFiltro } from 'src/app/filtro/filtro.actions';
import { borrarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  filtroActual:filtrosValidos = "todos";
  filtros:filtrosValidos[] = ['completados','pendientes','todos'];
  pendientes:number = 0;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro').subscribe(filtro => {
    //   console.log(filtro);
    //   this.filtroActual = filtro;
    // })
    this.store.subscribe(state=>{
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter((todo)=>todo.completado === false).length;
    })
  }
  changeFilter(filtro:filtrosValidos){
    this.store.dispatch(setFiltro({
      filtro
    }))
  }
  borrarCompletados(){
    this.store.dispatch(borrarTodos())
  }
}