import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent {}
