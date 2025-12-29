import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { CustomersComponent } from './components/customers.component';
import { InventoryComponent } from './components/inventory.component';
import { BillingComponent } from './components/billing.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'billing', component: BillingComponent },
  { path: '**', redirectTo: '' }
];
