import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbitesService } from './core/services/flowbites/flowbites.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todolist';

  constructor(private flowbiteService: FlowbitesService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
    });
  }
}
