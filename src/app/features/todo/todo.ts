import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { SelectButton, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { ToggleSwitch, ToggleSwitchChangeEvent } from 'primeng/toggleswitch';
import { TodoService } from './service/todo.service';
import { TodoFilter, TodoStore } from './store/todo.store';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, Button, InputText, SelectButton, FormsModule, ToggleSwitch],
  templateUrl: './todo.html',
  providers: [TodoStore, TodoService],
})
export default class Todo implements OnInit {
  protected store = inject(TodoStore);

  filter = signal<TodoFilter>('all');

  input = viewChild.required<ElementRef>('input');

  filtersOptions = signal([
    { label: 'Tout', value: 'all'},
    { label: 'En cours', value: 'pending'},
    { label: 'Terminé', value: 'completed'},
  ]);

  ngOnInit(): void {
    this.filter.set(this.store.filter());
  }

  addTodo(title: string) {
    this.store.addTodo(title);
    this.input().nativeElement.value = '';
  }

  deleteTodo(id: number) {
    this.store.deleteTodo(id);
  }

  updateTodo(id: number, event: ToggleSwitchChangeEvent) {
    this.store.updateTodo(id, event.checked);
  }

  updateFilter(event: SelectButtonChangeEvent) {
    const filter = event.value as TodoFilter;
    this.store.updateFilter(filter);
  }
}
