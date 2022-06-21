import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, borrarTodos, crear, editar, toggle, toggleAll } from './todo.actions';

export const initialState:Todo[] = [
  new Todo('Aprender redux'),
  new Todo('Comprar nuevo celular'),
];

export const _todoReducer = createReducer(
  initialState,
  on(crear, (state,{texto}) => [...state,new Todo(texto)]),
  on(toggle, (state,{id}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completado:!todo.completado
        }
      }else{
        return todo;
      }

    });
  }),
  on(editar, (state,{id,texto}) => {
    return state.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          texto
        }
      }else{
        return todo;
      }
    });
  }),
  on(borrar, (state,{id}) => {
    return state.filter(todo => todo.id !== id);
  }),
  on(toggleAll, (state,{completado}) => {
    return state.map(todo => {
      return {
        ...todo,
        completado:completado
      }
    });
  }),
  on(borrarTodos, (state) => {
    return state.filter(todo => todo.completado != true);
  })
);

export function todoReducer(state:Todo[] = initialState,action:Action){
  return _todoReducer(state,action)
}
