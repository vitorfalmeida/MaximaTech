import { Component, OnInit } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { DepartmentService } from '../services/department.service';
import { Product } from '../models/product.model';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  product: Product = { id: '', code: '', description: '', department: '', price: 0, status: false };
  departments: Department[] = [];

  constructor(private productService: ProductService, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  onSubmit(): void {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe();
    } else {
      this.productService.addProduct(this.product).subscribe();
    }
    this.clearForm();
  }

  clearForm(): void {
    this.product = { id: '', code: '', description: '', department: '', price: 0, status: false };
  }
}
