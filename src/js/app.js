import { Product } from  './components/Product.js';
import { CartProduct } from  './components/CartProduct.js';
import { AmountWidget } from  './components/AmountWidget.js';
import { Cart } from  './components/Cart.js';
import { settings, select, classNames } from '../settings.js';

const app = {
    
    initMenu: function(){
      const thisApp = this;
      console.log('thisApp.data:', thisApp.data);
      for(let productData in thisApp.data.products){
        new Product(productData, thisApp.data.products[productData]);
      }
    },
    
    initPages: function(){
    const thisApp = this;

    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);
    console.log(thisApp.pages);
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    console.log(thisApp.navLinks)
    thisApp.activatePage(thisApp.pages[0].id);
    for (let link of thisApp.navLinks) {
        link.getEventListener('click', function(event){
            const clickedElement = this;
            event.preventDefault();
            const id = clickedElem.getAttribute('href').replace('#', '');
            thisApp.activatePage(id);
            window.location.hash = '#/' + id;
        })
    }
        
  },

    initData: function(){
      const thisApp = this;
      thisApp.data = dataSource;
    },

    initCart: function () {
      const thisApp = this;
      const cartElem = document.querySelector(select.containerOf.cart);
      thisApp.cart = new Cart(cartElem);
      thisApp.productList = document.querySelector(select.containerOf.menu);
      
      thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
    },

    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      thisApp.initData();
      thisApp.initMenu();
      thisApp.initCart();
    },
  };

  app.init();
}

