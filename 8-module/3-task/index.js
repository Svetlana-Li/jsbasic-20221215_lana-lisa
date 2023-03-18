export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }
  
  addProduct(product) {
    if (product != null) {
      let productInCart = this.cartItems.find(item => item.product.id === product.id)
    
      if (!productInCart) {
        let newCartItem = {product: product, count: 1}
        this.cartItems.push(newCartItem)
      } else {
        productInCart.count += 1
      }
      this.onProductUpdate()
    }
    
  }

  updateProductCount(productId, amount) {
    let productInCart = this.cartItems.find(item => item.product.id === productId)

    if (productInCart) {
      productInCart.count += amount
      if (productInCart.count === 0) {
        let itemId = this.cartItems.find(item => item.product.id === productId)
        this.cartItems.splice(itemId, 1)
      }
      this.onProductUpdate()
    }
    
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true
    } else {
      return false
    }

  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, product) => totalCount + product.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.product.price * item.count, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

