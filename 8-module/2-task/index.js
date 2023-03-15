import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {}
    this.render()
    this.addEventListeners()
  }

  render() {
    this.elem = createElement(
      `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
      `
    )
  }

  addEventListeners() {
    this.filteredProducts = this.products;
    for (let i of this.products) {
        let card = new ProductCard({
          name: i.name,
          price: i.price,
          category: i.category,
          image: i.image,
          id: i.id,
          nuts: i.nuts,
          spiciness: i.spiciness,
          vegeterian: i.vegeterian
        })
        card.elem.dataset.productId = i.id
        this.elem.querySelector('.products-grid__inner').append(card.elem)
    }
  }
  

  updateFilter(filters) {
    // this.filters = { ...this.filters, ...filters };
    // let cards = this.elem.querySelectorAll('.card')

    this.filters = { ...this.filters, ...filters };
    if (this.filters.noNuts) {
      this.filteredProducts = this.filteredProducts.filter((product) => !product.nuts);
    }
    if (this.filters.vegeterianOnly) {
      this.filteredProducts = this.filteredProducts.filter((product) => product.vegeterian);
    }
    if (this.filters.maxSpiciness) {
      this.filteredProducts = this.filteredProducts.filter((product) => product.spiciness <= this.filters.maxSpiciness);
    }
    if (this.filters.category) {
      this.filteredProducts = this.filteredProducts.filter((product) => product.category === this.filters.category);
    }
    if (!this.filters.noNuts && !this.filters.vegeterianOnly && !this.filters.maxSpiciness && !this.filters.category) {
      this.filteredProducts = this.products;
    }

    let productsGridInner = this.elem.querySelector('.products-grid__inner');
    while (productsGridInner.firstChild) {
      productsGridInner.removeChild(productsGridInner.firstChild);
    }

    for (let product of this.filteredProducts) {
      let card = new ProductCard({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        id: product.id,
        nuts: product.nuts,
        spiciness: product.spiciness,
        vegeterian: product.vegeterian
      })
      card.elem.dataset.productId = product.id
      productsGridInner.append(card.elem)
    }

      

      
    
  }

}
