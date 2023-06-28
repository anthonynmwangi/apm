import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `<div><h1>{{pageTitle}}</h1><p>My first component</p></div>`
})
export class AppComponent {
  pageTitle: string = "Acme Product Management";
}
