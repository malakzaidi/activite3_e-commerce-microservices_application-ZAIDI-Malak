import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Partial<Customer> = {};
  isLoading = false;
  error: string | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.isLoading = true;
    this.error = null;
    this.customerService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response._embedded?.customers || response || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des clients';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addCustomer(): void {
    if (!this.newCustomer.name || !this.newCustomer.email) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: () => {
        this.newCustomer = {};
        this.loadCustomers();
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'ajout du client';
        console.error(err);
      }
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}
