import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { DepartmentService } from '../services/department.service';
import { Product } from '../models/product.model';
import { Department } from '../models/department.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: '', code: '', description: '', departmentId: '', price: 0, status: false, deleted: false, departmentName: '' };
  departments: Department[] = [];
  isSubmitting = false;

  constructor(private productService: ProductService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      if (!this.product.id) {
        this.product.id = uuidv4();
        await this.productService.addProduct(this.product).toPromise();
      } else {
        await this.productService.updateProduct(this.product.id, this.product).toPromise();
      }
      this.clearForm();
      this.isSubmitting = false;
      this.refreshPage(); // Atualizar a página após salvar
    } catch {
      this.isSubmitting = false;
    }
  }

  clearForm(): void {
    this.product = { id: '', code: '', description: '', departmentId: '', price: 0, status: false, deleted: false, departmentName: '' };
  }

  editProduct(product: Product): void {
    this.product = { ...product };
  }

  refreshPage(): void {
    window.location.reload();
  }
}
