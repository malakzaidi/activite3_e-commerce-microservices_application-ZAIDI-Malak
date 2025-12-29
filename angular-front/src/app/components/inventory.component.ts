import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Product } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {};
  isLoading = false;
  error: string | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.inventoryService.getProducts().subscribe({
      next: (response) => {
        this.products = response._embedded?.products || response || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des produits';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.quantity) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.inventoryService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.newProduct = {};
        this.loadProducts();
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'ajout du produit';
        console.error(err);
      }
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.inventoryService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression';
          console.error(err);
        }
      });
    }
  }
}
