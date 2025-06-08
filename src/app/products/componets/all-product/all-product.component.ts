import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartsService } from '../../../carts/services/carts.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  isNew?: boolean;
  discount?: number;
}

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  page: number = 1;
  itemsPerPage: number = 12;
  hasMoreItems: boolean = true;
  sortOrder: string = 'default';
  selectedCategory: string = 'all';

  constructor(
    private service: ProductsService,
    private cartService: CartsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.selectedCategory = category;
        this.getProductsByCategory(category);
      } else {
        this.selectedCategory = 'all';
        this.getProducts();
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  searchProducts(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  filterCategory(event: any): void {
    const category = event.target.value;
    this.selectedCategory = category;
    
    // Update URL with the new category
    if (category === 'all') {
      this.router.navigate(['/products'], {
        queryParams: {}
      });
      this.getProducts();
    } else {
      this.router.navigate(['/products'], {
        queryParams: { category: category }
      });
      this.getProductsByCategory(category);
    }
  }

  sortProducts(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOrder = select.value;
    this.applyFilters();
  }

  loadMore(): void {
    if (!this.loading && this.hasMoreItems) {
      this.page++;
      this.hasMoreItems = this.page * this.itemsPerPage < this.filteredProducts.length;
    }
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = Math.min(this.page * this.itemsPerPage, this.filteredProducts.length);
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  private getProducts(): void {
    this.loading = true;
    this.service.getAllProducts().subscribe({
      next: (res: Product[]) => {
        this.products = res.map(p => ({
          ...p,
          isNew: Math.random() > 0.8,
          discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0
        }));
        this.filteredProducts = [...this.products];
        this.applyFilters();
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  getProductsByCategory(category: string) {
    this.loading = true;
    this.service.getProductsByCategory(category).subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = data;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      console.error('Error loading products by category:', error);
    });
  }

  private getCategories(): void {
    this.loading = true;
    this.service.getAllCategories().subscribe({
      next: (res: string[]) => {
        this.categories = res;
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        alert(error);
      }
    });
  }

  private applyFilters(): void {
    let results: Product[] = [...this.products];
    
    // Apply category filter if not 'all'
    if (this.selectedCategory && this.selectedCategory !== 'all') {
      results = results.filter((product: Product) => product.category === this.selectedCategory);
    }

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter((product: Product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (this.sortOrder) {
      case 'priceAsc':
        results.sort((a: Product, b: Product) => 
          (a.discount ? a.price * (1 - (a.discount || 0)/100) : a.price) - 
          (b.discount ? b.price * (1 - (b.discount || 0)/100) : b.price)
        );
        break;
      case 'priceDesc':
        results.sort((a: Product, b: Product) => 
          (b.discount ? b.price * (1 - (b.discount || 0)/100) : b.price) - 
          (a.discount ? a.price * (1 - (a.discount || 0)/100) : a.price)
        );
        break;
      case 'nameAsc':
        results.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        results.sort((a: Product, b: Product) => b.title.localeCompare(a.title));
        break;
    }

    this.filteredProducts = results;
    this.page = 1;
    this.hasMoreItems = this.filteredProducts.length > this.itemsPerPage;
  }
  }
