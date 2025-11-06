import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from "primeng/inputtext";
import { OpenLibraryStore } from './store/open-library.store';

@Component({
  selector: 'app-search',
  imports: [InputText, InputGroup, InputGroupAddon, Button],
  template: `
    <p-inputgroup>
    <input
      fluid="true"
      #input
      type="text"
      pInputText
      placeholder="Rechercher…"
      [value]="store.filter()"
      (keyup.enter)="store.search(input.value)"
    />
    <p-inputgroup-addon>
      <p-button icon="pi pi-times" severity="secondary" (onClick)="store.reset()" />
    </p-inputgroup-addon>
    <p-inputgroup-addon>
      <i
        class="pi"
        [class]="store.isPending() ? 'pi-spin pi-spinner text-blue-500' : 'pi-search'"
      ></i>
    </p-inputgroup-addon>
    </p-inputgroup>
  `,
})
export class Search {
  protected store = inject(OpenLibraryStore);
}
