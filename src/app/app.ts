
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

interface Cake {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  size: string;
}

interface CartItem {
  cake: Cake;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App implements OnInit {

  constructor(private sanitizer: DomSanitizer) {}

  // GOOGLE MAPS

  get mapUrl(): SafeResourceUrl {
    const url =
      'https://maps.google.com/maps?q=' +
      encodeURIComponent(this.shopAddress) +
      '&output=embed';

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ==================================
  // CAKE PRODUCTS - 12 PRODUCTS
  // ==================================

  products: Cake[] = [
    {
      id: 1,
      name: 'Velvet Amour',
      category: 'Signature',
      price: 750,
      image: 'https://t3.ftcdn.net/jpg/02/64/84/68/360_F_264846889_3FTwwhQItDUy95Wdeaf8Qg4YLiiLNvrG.jpg',
      description: 'Rich red velvet layers with smooth cream cheese frosting and delicate cake decoration.',
      size: '8 inches'
    },
    {
      id: 2,
      name: 'Midnight Chocolate',
      category: 'Chocolate',
      price: 600,
      image: 'https://caramia.ph/cdn/shop/files/MidnightDream_1200x1200.jpg?v=1708649379',
      description: 'Moist chocolate cake with rich chocolate ganache and chocolate decorations.',
      size: '8 inches'
    },
    {
      id: 3,
      name: 'Strawberry Blush',
      category: 'Fruit',
      price: 550,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYU_OaZ6c4LoGO0F0JUS75ubEiAjsRS5x0re0_znYsF1knjPSj2y2ZEP0&s=10',
      description: 'Soft vanilla cake topped with strawberries and delicious whipped cream.',
      size: '8 inches'
    },
    {
      id: 4,
      name: 'Royal Blueberry',
      category: 'Fruit',
      price: 650,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBFSCE4HW1-0rYCFl9k3spj1AS9zNdTw20T--x4QA_eNHK-xYY5ULcbGU&s=10',
      description: 'A delightful cake with blueberry toppings and creamy frosting.',
      size: '8 inches'
    },
    {
      id: 5,
      name: 'Golden Caramel',
      category: 'Signature',
      price: 700,
      image: 'https://www.supergoldenbakes.com/wordpress/wp-content/uploads/2023/05/Mary_Berry_Salted_Caramel_Cake-1.jpg',
      description: 'Delicious caramel cake with golden caramel drizzle and smooth buttercream.',
      size: '8 inches'
    },
    {
      id: 6,
      name: 'Cookies & Cream',
      category: 'Chocolate',
      price: 800,
      image: 'https://thescranline.com/wp-content/uploads/2022/07/OREO-COOKIES-AND-CREAM-CAKE-thumbnail-24.jpg',
      description: 'Creamy cookies and cream filling with chocolate cookie toppings.',
      size: '8 inches'
    },
    {
      id: 7,
      name: 'Lemon Dream',
      category: 'Fruit',
      price: 650,
      image: 'https://www.ladybehindthecurtain.com/wp-content/uploads/2023/03/Lemon-Dream-Cheesecake-5-1024x576.jpg',
      description: 'Light and refreshing lemon cake with smooth lemon-flavored frosting.',
      size: '8 inches'
    },
    {
      id: 8,
      name: 'Purple Elegance',
      category: 'Signature',
      price: 800,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFcMaEP1C5URPjwhmii6oYaMVaK1icDtxqTMpi0rEckRJ65TqfGimCSo&s=10',
      description: 'An elegant celebration cake with beautiful purple-inspired decorations.',
      size: '8 inches'
    },
    {
      id: 9,
      name: 'Mocha Delight',
      category: 'Chocolate',
      price: 650,
      image: 'https://mgi-deliveryportal.s3.amazonaws.com/816186144-mcb-aggregators_680x510_mocha-cake.jpg',
      description: 'Coffee-infused chocolate cake with creamy mocha frosting.',
      size: '8 inches'
    },
    {
      id: 10,
      name: 'Mango Paradise',
      category: 'Fruit',
      price: 650,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRtWhYnKHwMqTGhGHAEw731CxloHMmTAZbBFcvymQCcR0Z6kXRyee0o3d&s=10',
      description: 'Sweet mango-inspired cake with fresh fruit decorations.',
      size: '8 inches'
    },
    {
      id: 11,
      name: 'Pink Romance',
      category: 'Signature',
      price: 800,
      image: 'https://ocakes.in/storage/app/public/images/item/item-642f5b0c7a618.jpg',
      description: 'A beautiful pink celebration cake with delicate frosting details.',
      size: '8 inches'
    },
    {
      id: 12,
      name: 'Classic Vanilla',
      category: 'Classic',
      price: 500,
      image: 'https://thescranline.com/wp-content/uploads/2025/02/VANILLA-CAKE-25-S-01.jpg',
      description: 'A classic soft vanilla cake with smooth and delicious buttercream.',
      size: '8 inches'
    }
  ];

  // ==================================
  // SHOPPING BAG
  // ==================================

  cart: CartItem[] = [];

  categories = [
    'All Cakes',
    'Signature',
    'Chocolate',
    'Fruit',
    'Classic'
  ];

  selectedCategory = 'All Cakes';
  searchText = '';

  selectedCake: Cake | null = null;

  // ==================================
  // MODALS
  // ==================================

  showCheckout = false;
  showReceipt = false;
  showToast = false;

  toastMessage = '';

  // ==================================
  // DARK MODE
  // ==================================

  darkMode = false;

  // ==================================
  // PAYMENT METHOD
  // ==================================

  paymentMethod = 'GCash';

  // ==================================
  // CUSTOMER INFORMATION
  // ==================================

  customer = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
    referenceNumber: ''
  };

  // ORDER INFORMATION

  order: any = null;

  // ==================================
  // SHOP INFORMATION
  // ==================================

  shopName = 'BELLORIE CAKES';
  shopEmail = 'bellorie@gmail.com';
  shopPhone = '09094567397';
  shopAddress = 'Gabaldon Nueva Ecija';

  // ==================================
  // INITIALIZE WEBSITE
  // ==================================

  ngOnInit(): void {

    const savedCart = localStorage.getItem('bellorie-cart');

    if (savedCart) {
      try {
        this.cart = JSON.parse(savedCart);
      } catch {
        this.cart = [];
      }
    }

    const savedTheme = localStorage.getItem('bellorie-theme');

    if (savedTheme === 'dark') {
      this.darkMode = true;
      document.body.classList.add('dark-theme');
    }

  }

  // ==================================
  // FILTER CAKES
  // ==================================

  get filteredProducts(): Cake[] {

    return this.products.filter(cake => {

      const categoryMatch =
        this.selectedCategory === 'All Cakes' ||
        cake.category === this.selectedCategory;

      const searchMatch =
        cake.name.toLowerCase().includes(
          this.searchText.toLowerCase()
        );

      return categoryMatch && searchMatch;

    });

  }

  // ==================================
  // CART COUNT
  // ==================================

  get cartCount(): number {

    return this.cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  }

  // ==================================
  // SUBTOTAL
  // ==================================

  get subtotal(): number {

    return this.cart.reduce(
      (sum, item) =>
        sum + (item.cake.price * item.quantity),
      0
    );

  }

  // ==================================
  // DELIVERY FEE
  // ==================================

  get deliveryFee(): number {

    return this.cart.length > 0 ? 50 : 0;

  }

  // ==================================
  // TOTAL AMOUNT
  // ==================================

  get total(): number {

    return this.subtotal + this.deliveryFee;

  }

  // ==================================
  // SAVE CART
  // ==================================

  saveCart(): void {

    localStorage.setItem(
      'bellorie-cart',
      JSON.stringify(this.cart)
    );

  }

  // ==================================
  // LIGHT AND DARK MODE
  // ==================================

  toggleTheme(): void {

    this.darkMode = !this.darkMode;

    document.body.classList.toggle(
      'dark-theme',
      this.darkMode
    );

    localStorage.setItem(
      'bellorie-theme',
      this.darkMode ? 'dark' : 'light'
    );

  }

  // ==================================
  // ADD CAKE TO CART
  // ==================================

  addToCart(cake: Cake): void {

    const existing = this.cart.find(
      item => item.cake.id === cake.id
    );

    if (existing) {

      existing.quantity++;

    } else {

      this.cart.push({
        cake: cake,
        quantity: 1
      });

    }

    this.saveCart();

    this.notify(cake.name + ' added to your bag!');

  }

  // ==================================
  // OPEN CAKE DETAILS
  // ==================================

  openCake(cake: Cake): void {

    this.selectedCake = cake;

  }

  closeCake(): void {

    this.selectedCake = null;

  }

  // ==================================
  // BUY NOW
  // ==================================

  buyNow(cake: Cake): void {

    this.addToCart(cake);

    this.selectedCake = null;

    this.openCheckout();

  }

  // ==================================
  // INCREASE QUANTITY
  // ==================================

  increaseQuantity(item: CartItem): void {

    item.quantity++;

    this.saveCart();

  }

  // ==================================
  // DECREASE QUANTITY
  // ==================================

  decreaseQuantity(item: CartItem): void {

    if (item.quantity > 1) {

      item.quantity--;

    } else {

      this.removeItem(item);

      return;

    }

    this.saveCart();

  }

  // ==================================
  // REMOVE ITEM
  // ==================================

  removeItem(item: CartItem): void {

    this.cart = this.cart.filter(
      cartItem => cartItem.cake.id !== item.cake.id
    );

    this.saveCart();

  }

  // ==================================
  // OPEN CHECKOUT
  // ==================================

  openCheckout(): void {

    if (this.cart.length === 0) {

      this.notify('Please add a cake to your bag first.');

      return;

    }

    this.showCheckout = true;

  }

  // ==================================
  // CLOSE CHECKOUT
  // ==================================

  closeCheckout(): void {

    this.showCheckout = false;

  }

  // ==================================
  // PLACE ORDER - FIXED
  // ==================================

  placeOrder(): void {

    // CHECK EMPTY CART

    if (this.cart.length === 0) {

      this.notify('Your shopping bag is empty.');

      return;

    }

    // CHECK REQUIRED CUSTOMER DETAILS

    if (
      !this.customer.fullName.trim() ||
      !this.customer.phone.trim() ||
      !this.customer.address.trim()
    ) {

      this.notify(
        'Please complete your name, phone number and delivery address.'
      );

      return;

    }

    // GENERATE UNIQUE ORDER NUMBER

    const orderNumber =
      'BEL-' + Date.now().toString().slice(-8);

    // SAVE ORDER DETAILS BEFORE CLEARING CART

    this.order = {

      orderNumber: orderNumber,

      date: new Date().toLocaleString('en-PH'),

      shopName: this.shopName,

      customer: {
        ...this.customer
      },

      paymentMethod: this.paymentMethod,

      referenceNumber: this.customer.referenceNumber || 'Not provided',

      items: this.cart.map(item => ({

        cake: {
          ...item.cake
        },

        quantity: item.quantity

      })),

      subtotal: this.subtotal,

      deliveryFee: this.deliveryFee,

      total: this.total,

      status: 'Order Placed'

    };

    // SAVE ORDER HISTORY

    try {

      const savedOrders = JSON.parse(
        localStorage.getItem('bellorie-orders') || '[]'
      );

      savedOrders.push(this.order);

      localStorage.setItem(
        'bellorie-orders',
        JSON.stringify(savedOrders)
      );

    } catch {

      this.notify('Unable to save order. Please try again.');

      return;

    }

    // CLEAR SHOPPING BAG

    this.cart = [];

    this.saveCart();

    // CLOSE CHECKOUT

    this.showCheckout = false;

    // SHOW RECEIPT POPUP

    this.showReceipt = true;

    // NOTIFICATION

    this.notify('Your order has been successfully placed!');

  }

  // ==================================
  // CLOSE RECEIPT
  // ==================================

  closeReceipt(): void {

    this.showReceipt = false;

  }

  // ==================================
  // PRINT RECEIPT
  // ==================================

  
printReceipt(): void {

  const receipt = document.getElementById('print-area');

  if (!receipt) {
    this.notify('Receipt not found. Please try again.');
    return;
  }

  // OPEN A SEPARATE PRINT WINDOW
  const printWindow = window.open(
    '',
    '_blank',
    'width=850,height=900'
  );

  if (!printWindow) {
    this.notify('Please allow pop-ups to print your receipt.');
    return;
  }

  // COPY THE ACTUAL RECEIPT
  const receiptHTML = receipt.outerHTML;

  // CREATE A CLEAN RECEIPT PAGE
  printWindow.document.open();

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BELLORIE CAKES - Official Receipt</title>

      <meta charset="UTF-8">

      <style>

        @page {
          size: A5 portrait;
          margin: 5mm;
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          font-family: Arial, sans-serif;
          color: #302F46;
        }

        body {
          padding: 10px;
        }

        #print-area {
          display: block;
          position: relative;
          width: 100%;
          max-width: 100%;
          height: auto;
          max-height: none;
          min-height: 0;
          margin: 0 auto;
          padding: 20px;
          overflow: visible;
          background: #FFF0CF;
          color: #302F46;
          border: 1px solid #D8B9A0;
          border-radius: 8px;
          box-shadow: none;
        }

        #print-area * {
          visibility: visible;
          overflow: visible;
          color: #302F46;
          font-family: Arial, sans-serif;
        }

        

.receipt-top {
  text-align: center;
  padding: 15px 10px;
  background: linear-gradient(
    135deg,
    #BFB8F4,
    #F2D9E9,
    #FFF0CF
  );
  border-bottom: 4px solid #772868;
  margin-bottom: 12px;
}

.receipt-brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #772868;
  color: #D0FF5F !important;
  font-size: 23px;
  margin-bottom: 7px;
}

.receipt-top h2 {
  font-family: Georgia, serif !important;
  font-size: 21px;
  color: #302F46 !important;
  margin: 5px 0;
}

.receipt-kicker,
.receipt-subtitle {
  font-size: 8px;
  letter-spacing: 2px;
  color: #772868 !important;
  font-weight: bold;
}

.confirmed-label {
  display: inline-block;
  background: #D0FF5F;
  color: #302F46 !important;
  padding: 6px 13px;
  border-radius: 20px;
  font-size: 9px;
  font-weight: bold;
  margin-top: 8px;
}


        .receipt-meta {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 12px 0;
          border-bottom: 1px solid #D8B9A0;
        }

        .receipt-meta div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .receipt-meta small {
          font-size: 8px;
          color: #772868 !important;
          font-weight: bold;
        }

        .receipt-meta strong {
          font-size: 10px;
        }

        .receipt-customer,
        .receipt-items,
        .receipt-totals {
          padding: 12px 0;
          border-bottom: 1px solid #D8B9A0;
        }

        #print-area h3 {
          font-family: Georgia, serif !important;
          color: #772868 !important;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .receipt-customer p {
          font-size: 10px;
          line-height: 1.5;
          margin: 5px 0;
          overflow-wrap: anywhere;
        }

        .receipt-row {
          display: grid;
          grid-template-columns: 1fr 35px 90px;
          gap: 5px;
          padding: 9px 0;
          border-bottom: 1px solid #E3CDB8;
          font-size: 10px;
        }

        .receipt-head {
          font-weight: bold;
          color: #772868 !important;
        }

        .receipt-totals p {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin: 10px 0;
        }

        .receipt-totals .receipt-grand {
          background: #772868;
          color: #FFF0CF !important;
          padding: 13px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: bold;
        }

        .receipt-grand span,
        .receipt-grand strong {
          color: #FFF0CF !important;
        }

        .receipt-footer {
          text-align: center;
          padding: 20px 5px 5px;
        }

        .receipt-footer h3 {
          font-family: Georgia, serif !important;
          font-size: 22px !important;
        }

        .receipt-footer p {
          font-size: 10px;
        }

        .receipt-footer span {
          display: block;
          color: #772868 !important;
          font-size: 8px;
          letter-spacing: 2px;
          margin-top: 12px;
        }

        @media print {
#print-area {
  page-break-inside: avoid;
  break-inside: avoid;
}

.receipt-footer {
  page-break-inside: avoid;
  break-inside: avoid;
}
          html, body {
            width: 100%;
            margin: 0;
            padding: 0;
            background: #ffffff;
          }

          body {
            padding: 0;
          }

          #print-area {
            width: 100%;
            margin: 0;
            box-shadow: none;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

        }

      </style>
    </head>

    <body>

      ${receiptHTML}

    </body>
    </html>
  `);

  printWindow.document.close();

  // OPEN PRINT PREVIEW
  printWindow.onload = () => {

    printWindow.focus();

    printWindow.print();

  };

}


  // ==================================
  // TOAST NOTIFICATION
  // ==================================

  notify(message: string): void {

    this.toastMessage = message;

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    }, 2500);

  }

  // ==================================
  // SCROLL TO SHOP
  // ==================================

  scrollToShop(): void {

    document.getElementById('shop')?.scrollIntoView({

      behavior: 'smooth'

    });

  }

}
