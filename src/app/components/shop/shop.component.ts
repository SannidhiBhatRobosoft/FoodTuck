import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
 
  private http = inject(HttpClient);
  form: FormGroup;
  itemsData: any[] = [];
  originalData: any[] = [];
  filters: string[] = []; // This will hold selected category ids
  
  dropdownOptions: any[] = [];
  categories: any[] = [];
  filteredCategories: any[] = [];
  selectedSort: string = '';
  selectedShow: string = '';
  searchText: string = '';
  
  currentPage: number = 1;
  pageSize: number = 9;
  totalItems: number = 0;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  paginatedItemsData: any[] = [];
  
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      orders: this.formBuilder.array([]),
    });
  }
  
  ngOnInit() {
    this.fetchItemsData(); // Fetch items and categories in one API call
  }
  
  fetchItemsData() {
    const apiUrl = 'https://lovely-gelato-95a9f3.netlify.app/api/shop';
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response?.data) {
          this.originalData = response.data;
          
          // Extract categories from the API response
          this.categories = this.originalData.map((category: any) => ({
            id: category._id,
            name: category.name
          }));

          // Initialize filtered categories
          this.filteredCategories = [...this.categories];

          // Flatten the items and store them in itemsData
          this.itemsData = this.getAllItems();

          // Update pagination
          this.totalItems = this.itemsData.length;
          this.totalPages = this.getTotalPages();
          this.pageNumbers = this.calculatePageNumbers();
          this.updatePagedItems();
          this.initializeOrders();
        }
      },
      (error) => console.error('Error fetching items data:', error)
    );
  }
  
  getAllItems() {
    // Flatten the items based on the API data structure
    return this.originalData.flatMap((category: any) => {
      return category.foods?.map((food: any) => ({
        name: food.name || 'unnamed food',
        original_price: food.original_price || 0.0,
        discounted_price: food.discounted_price || 0.0,
        image: food.images?.[0] || 'default-image-url.jpg',
        categoryId: food.id // Associate food item with its category ID
      })) || [];
    });
  }
  
  onCategoryChange(catId: string) {
    // Toggle category filter
    const index = this.filters.indexOf(catId);
    if (index === -1) {
      this.filters.push(catId);
    } else {
      this.filters.splice(index, 1);
    }
  
    // Apply filters and update items
    this.applyFilters();
  }
  
  applyFilters() {
    // If no filters are selected, show all items
    if (this.filters.length === 0) {
      this.itemsData = this.getAllItems();
    } else {
      // If filters are selected, filter items by category
      this.itemsData = this.originalData
        .filter((category) => this.filters.includes(category._id))
        .flatMap((category: any) => {
          return category.foods?.map((food: any) => ({
            name: food.name || 'unnamed food',
            original_price: food.original_price || 0.0,
            discounted_price: food.discounted_price || 0.0,
            image: food.images?.[0] || 'default-image-url.jpg',
            id: food.id
          })) || [];
        });
    }
    
    // Reset to page 1 if there are fewer items than the page size
    if (this.itemsData.length < this.pageSize) {
      this.currentPage = 1;
    }
    
    // Update pagination based on filtered items
    this.totalItems = this.itemsData.length;
    this.totalPages = this.getTotalPages();
    this.pageNumbers = this.calculatePageNumbers();
    this.updatePagedItems();
  }
  
  updatePagedItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.paginatedItemsData = this.itemsData.slice(startIndex, endIndex);
  }
  
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  
  calculatePageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    let pageNumbers: number[] = [];
    const startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPages);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  changePage(page: number) {
    if (page < 1 || page > this.getTotalPages()) return;
    this.currentPage = page;
    this.updatePagedItems();
    this.pageNumbers = this.calculatePageNumbers();
  }
  
  changePageRange(direction: string) {
    if (direction === 'next' && this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.updatePagedItems();
    this.pageNumbers = this.calculatePageNumbers();
  }
  
  filterCategories() {
    if (this.searchText.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  
  get orders() {
    return (this.form.get('orders') as FormArray);
  }
  
  initializeOrders() {
    this.itemsData.forEach(() => {
      this.orders.push(this.formBuilder.control(false));
    });
  }
  
  individualsblogdetails(_id: any) {
    this.router.navigate([`shop/${_id}`]);
  }
}
