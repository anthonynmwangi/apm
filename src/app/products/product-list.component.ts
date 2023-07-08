import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({ // decorator
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls:['./product-list.component.css'] // Encapsulating component styles
})

export class ProductListComponent implements OnInit, OnDestroy{

  // Inject the ProductService during class construction
  constructor(private productService: ProductService){}

  // Declaire all your properties
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2 ;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;


  // Setter and Getter for listFilter
  public _listFilter: string = '';
  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter = value;
    console.log("In setter: ", value);
    this.filteredProducts = this.performFilter(value);
    console.log(this.filteredProducts);
  }

  filteredProducts: IProduct[] = [];
  // utilize an interface
  products: IProduct[] = [];

  // Declaire your methods (logic / functions)
  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    // get products from Products Services
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products,
        this.filteredProducts = this.products // push products to filtered products
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    this.sub.unsubscribe();
  }

  performFilter(filterBy:string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct) => product.productName.toLocaleLowerCase().includes(filterBy) )
  }

  onRatingClicked(message:string):void{
    this.pageTitle = 'Product List '+ message;
    console.log(message);
  }

}