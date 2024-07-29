import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, ProductFormComponent]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  editProduct(product: Product): void {
    // Implementar lógica de edição
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }
}
