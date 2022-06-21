import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import { borrar, toggle } from '../todo.actions';

import { editar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()todo :Todo = {} as Todo;
  chkCompletado:FormControl ;
  txtInput:FormControl;
  @ViewChild('inputFisico') txtInputFisico!:ElementRef;
  editando:boolean = false;

  constructor(private store:Store<AppState>) {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl('',Validators.required);
  }

  ngOnInit(): void {
    console.log(this.todo);
    this.chkCompletado.valueChanges.subscribe(value => {
      console.log(value);
      this.store.dispatch(toggle({id:this.todo.id}))
    })

  }
  terminarEdicion(){

    console.log(this.txtInput.value);
    this.editando = false;
    if (this.txtInput.invalid) {
      return;
    }

    if(this.txtInput.value === this.todo.texto){return;}
    this.store.dispatch(editar({
      id:this.todo.id,
      texto:this.txtInput.value
    }))
  }
  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todo.texto)
    setTimeout(()=>{
      // this.txtInputFisico.nativeElement.focus();
      this.txtInputFisico.nativeElement.select();
    },1)
  }
  borrar(){
    this.store.dispatch(borrar({
      id:this.todo.id
    }))
  }
}
