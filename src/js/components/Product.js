class Product {
    constructor(id, data){
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisWidget.getElements();
      thisProduct.initAccordion();
      thisProduct.initAmountWidget();
      thisProduct.processOrder()
      thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
      console.log('new Product:', thisProduct);
    }

    renderInMenu() {
      const thisProduct = this;
      const generatedHTML = templates.menuProduct(thisProduct.data);
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.menu);
      menuContainer.appendChild(thisProduct.element);
    }

    getElements(){
      const thisProduct = this;
      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
    }

    initAccordion() {
      const thisProduct = this;
      thisProduct.accordionTrigger.addEventListener('click', function () {
        event.preventDefault();
        thisProduct.element.classList.toggle('active');
        const activeProducts = document.querySelectorAll('article.active');
         for (let activeProduct of activeProducts) {
          if (activeProduct !== thisProduct.element) {
            activeProduct.classList.remove('.active');
          }
        }
      }
      );
    }

    initOrderForm() {
      const thisProduct = this;
      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }
      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
        thisProduct.addToCart();
      });
    }
  
   processOrder() {
      const thisProduct = this;
      const formData = utils.serializeFormToObject(thisProduct.form);
      console.log('formData', formData);
      thisProduct.params = {};
      thisProduct.params = {};
      let price = thisProduct.data.price;
      for (let paramId in thisProduct.data.params) {
        const param = thisProduct.data.params[paramId];
        for (let optionId in param.options) {
          const option = param.options[optionId];
          const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
          if (optionSelected && !option.default) {
            price += option.price;
          }
          else if (!optionSelected && option.default) {
            price -= option.price;
          }
          const optionImages = thisProduct.imageWrapper.querySelectorAll('.' + paramId + '-' + optionId);
          if (optionSelected) {
            if (!thisProduct.params[paramId]) {
              thisProduct.params[paramId] = {
                label: param.label,
                options: {},
              };
            }
            thisProduct.params[paramId].options[optionId] = option.label;
            for (let images of optionImages) {
              images.classList.add(classNames.menuProduct.imageVisible);
            }
          }else {
            for (let images of optionImages) {
              images.classList.remove(classNames.menuProduct.imageVisible);
            }
          }
        }
      }
      thisProduct.priceSingle = price;
      thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;
      thisProduct.priceElem.innerHTML = thisProduct.price;
    }
  }
