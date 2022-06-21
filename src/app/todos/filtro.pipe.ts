import { Pipe, PipeTransform } from '@angular/core';
import { filtrosValidos } from '../filtro/filtro.actions';
import { Todo } from './models/todo.model';
import { TodoListComponent } from './todo-list/todo-list.component';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {
    console.log(todos);
    switch (filtro) {
      case "completados":
        return todos.filter(todo => todo.completado === true)

        case "completados":
          return todos.filter(todo => todo.completado === false)

      default:
        return todos;
    }
  }

}
