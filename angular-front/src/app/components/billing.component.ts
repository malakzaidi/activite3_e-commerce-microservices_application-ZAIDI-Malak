import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillingService, Bill } from '../services/billing.service';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
  bills: Bill[] = [];
  newBill: Partial<Bill> = {
    customerId: undefined,
    billDate: new Date().toISOString().split('T')[0],
    totalAmount: 0,
    productItems: []
  };
  isLoading = false;
  error: string | null = null;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.isLoading = true;
    this.error = null;
    this.billingService.getBills().subscribe({
      next: (response) => {
        this.bills = response._embedded?.bills || response || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des factures';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addBill(): void {
    if (!this.newBill.customerId || !this.newBill.totalAmount) {
      this.error = 'Veuillez remplir les champs obligatoires';
      return;
    }

    this.billingService.createBill(this.newBill).subscribe({
      next: () => {
        this.newBill = {
          customerId: undefined,
          billDate: new Date().toISOString().split('T')[0],
          totalAmount: 0,
          productItems: []
        };
        this.loadBills();
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'ajout de la facture';
        console.error(err);
      }
    });
  }

  deleteBill(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      this.billingService.deleteBill(id).subscribe({
        next: () => {
          this.loadBills();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}
