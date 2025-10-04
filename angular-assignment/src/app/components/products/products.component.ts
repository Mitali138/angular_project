import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  rowData: any[] = [];

  columnDefs = [
    { field: 'id', headerName: 'Id', sortable: true, filter: true },
    { field: 'title', headerName: 'Product Name', sortable: true, filter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true },
    { field: 'price', headerName: 'Price (₹)', sortable: true, filter: true },
    { field: 'category', headerName: 'Category', sortable: true, filter: true },
    { field: 'discountPercentage', headerName: 'Discount %', sortable: true, filter: true },
    { field: 'warrantyInformation', headerName: 'Warranty Information', sortable: true, filter: true }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (p) => {
        this.products = p;
        this.rowData = [...this.products];
      },
      error: (err) => console.error(err)
    });
  }

  setSort(order: 'asc' | 'desc' | '') {
    if (!order) {
      this.rowData = [...this.products];
      return;
    }

    this.rowData = [...this.products].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }
}
