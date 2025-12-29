import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'E-Commerce App';
  
  menuItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Clients', path: '/customers' },
    { label: 'Inventaire', path: '/inventory' },
    { label: 'Facturation', path: '/billing' }
  ];
}
