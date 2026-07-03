(function(){
  var PRODUCT_KEY='gewalt_products_v2';
  var ORDER_KEY='gewalt_current_order_v1';
  var FAVORITES_KEY='gewalt_favorites_v1';
  var WA_NUMBER='18290000000';
  var PLACEHOLDER='https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85';

  var seedProducts=[
    {id:'gewalt-max',name:'Gewalt- Max',slug:'gewalt-max',price:34,currency:'USD',color:'Blanco',category:'Hoodies',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',description:'Hoodie blanco con diseño gráfico GEWALT en espalda. Estilo urbano, cómodo y de edición limitada.',active:true,featured:true,sizes:{S:3,M:8,L:5,XL:2}},
    {id:'gewalt-max-one',name:'Gewalt- Max-One',slug:'gewalt-max-one',price:34,currency:'USD',color:'Verde oscuro',category:'Hoodies',image:'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85',description:'Hoodie verde oscuro con collage visual y mensaje en espalda. Diseño urbano premium para uso diario.',active:true,featured:true,sizes:{S:4,M:6,L:4,XL:0}},
    {id:'gewalt-max-two',name:'Gewalt- Max two',slug:'gewalt-max-two',price:34,currency:'USD',color:'Crema',category:'Hoodies',image:'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85',description:'Hoodie crema con ilustración central. Perfecto para un look casual con identidad GEWALT.',active:true,featured:true,sizes:{S:2,M:7,L:3,XL:1}},
    {id:'gewalt-urban-black',name:'Gewalt- Urban Black',slug:'gewalt-urban-black',price:39,currency:'USD',color:'Negro',category:'Hoodies',image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',description:'Hoodie negro de corte urbano con presencia fuerte. Ideal para combinar con denim o cargo pants.',active:true,featured:false,sizes:{S:5,M:5,L:2,XL:1}}
  ];

  function readJson(key,fallback){try{var raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch(e){return fallback;}}
  function writeJson(key,value){localStorage.setItem(key,JSON.stringify(value));}
  function money(value){return '$'+Number(value||0).toFixed(2);}
  function getProducts(){var products=readJson(PRODUCT_KEY,null);if(!products){products=seedProducts;writeJson(PRODUCT_KEY,products);}return products;}
  function saveProducts(products){writeJson(PRODUCT_KEY,products);}
  function activeProducts(){return getProducts().filter(function(product){return product.active!==false;});}
  function totalStock(product){return Object.keys(product.sizes||{}).reduce(function(sum,size){return sum+Number(product.sizes[size]||0);},0);}
  function findProduct(id){return getProducts().find(function(product){return product.id===id||product.slug===id;})||activeProducts()[0];}
  function getFavorites(){return readJson(FAVORITES_KEY,[]);}
  function toggleFavorite(id){var favs=getFavorites();var next=favs.indexOf(id)>=0?favs.filter(function(item){return item!==id;}):favs.concat(id);writeJson(FAVORITES_KEY,next);return next;}
  function query(name){return new URLSearchParams(window.location.search).get(name);}
  function el(tag,className,html){var node=document.createElement(tag);if(className)node.className=className;if(html!==undefined)node.innerHTML=html;return node;}
  function image(product){return product.image||PLACEHOLDER;}

  function renderShop(){
    var catalog=document.querySelector('.inner-catalog');
    if(!catalog)return;
    var products=activeProducts();
    var panel=document.querySelector('.shop-panel__text');
    if(panel)panel.innerHTML='Hay <b>'+products.length+'</b> productos GEWALT disponibles';
    catalog.innerHTML='';
    if(!products.length){catalog.innerHTML='<div class="gewalt-empty">No hay productos activos. Crea o activa productos desde admin.html.</div>';return;}
    products.forEach(function(product){
      var stock=totalStock(product);
      var favs=getFavorites();
      var card=el('article','short-item');
      card.innerHTML='<div class="short-item__all">'
        +'<a class="short-item__image-bg" href="product_page.html?id='+encodeURIComponent(product.id)+'"><img class="short-item__image gewalt-product-card-image" src="'+image(product)+'" alt="'+product.name+'"></a>'
        +'<div class="short-item__top"><div class="short-item__cols"><div class="short-item__col">'+(stock===0?'<span class="item-tag item-tag_red">Agotado</span>':stock<=3?'<span class="item-tag item-tag_green">Últimas</span>':'<span class="item-tag item-tag_green">Stock</span>')+'</div><div class="short-item__col"><button class="heart-button '+(favs.indexOf(product.id)>=0?'active':'')+'" data-fav="'+product.id+'"></button></div></div></div>'
        +'<h4 class="short-item__title"><a class="short-item__link" href="product_page.html?id='+encodeURIComponent(product.id)+'">'+product.name+'</a></h4>'
        +'<span class="short-item__price">'+money(product.price)+'</span>'
        +'<div class="gewalt-card-note">Color: '+product.color+' | Stock total: '+stock+'</div>'
        +'<a class="gewalt-btn gewalt-btn--light" style="margin-top:14px" href="product_page.html?id='+encodeURIComponent(product.id)+'">Ver producto</a>'
        +'</div>';
      catalog.appendChild(card);
    });
    catalog.addEventListener('click',function(event){var btn=event.target.closest('[data-fav]');if(!btn)return;event.preventDefault();toggleFavorite(btn.getAttribute('data-fav'));btn.classList.toggle('active');});
  }

  function renderHomeProducts(){
    var grid=document.getElementById('gewalt-home-products');
    if(!grid)return;
    grid.innerHTML='';
    activeProducts().slice(0,4).forEach(function(product){
      var card=el('article','gewalt-home-product');
      card.innerHTML='<img src="'+image(product)+'" alt="'+product.name+'">'
        +'<h3>'+product.name+'</h3>'
        +'<p>'+product.description+'</p>'
        +'<strong>'+money(product.price)+' · '+product.color+'</strong>'
        +'<a class="gewalt-btn" href="product_page.html?id='+encodeURIComponent(product.id)+'">Comprar</a>';
      grid.appendChild(card);
    });
  }

  function brandStaticPages(){
    document.documentElement.lang='es';
    var titleMap={
      'shop.html':'GEWALT | Catálogo',
      'product_page.html':'GEWALT | Producto',
      'checkout-1.html':'GEWALT | Pedido por WhatsApp',
      'admin.html':'GEWALT | Admin'
    };
    var current=(window.location.pathname.split('/').pop()||'index.html');
    if(titleMap[current])document.title=titleMap[current];
    document.querySelectorAll('.logo').forEach(function(logo){logo.innerHTML='<span class="gewalt-logo-text">gewalt</span>';logo.setAttribute('href','index.html');});
    var replacements={
      'Home':'Inicio','Shop':'Catálogo','Catalog':'Catálogo','Product page':'Producto','Cart':'Carrito','Checkout 1':'Pedido','Checkout 2':'Pago','Checkout 3':'Final','Wishlist':'Favoritos','Contact':'Contacto','Contact us':'Contacto','Blog':'Blog','Pages':'Páginas','Profile':'Perfil','Login':'Entrar','Registration':'Registro','Search':'Buscar','Categories':'Categorías','Price':'Precio','Colors':'Colores','Apply filter':'Aplicar filtro','By relevance':'Más relevantes','There are':'Hay','products in this category':'productos en esta categoría','Your order':'Tu pedido','order details':'datos del pedido','payment method':'método de pago','finish':'final','Contact person':'Datos del cliente','Delivery address':'Datos de entrega','continue':'continuar','return':'volver','Newsletter':'Novedades','Payment methods:':'Métodos de pago:','All right reserved. Mollee 2021':'GEWALT 2026 · Todos los derechos reservados','Best sellers at Mollee':'Productos destacados GEWALT','the last in Mollee':'Último en GEWALT','Shop now':'Comprar ahora','Add to cart':'Continuar compra','Description':'Descripción','Reviews':'Reseñas'
    };
    function replaceText(node){
      if(!node||!node.childNodes)return;
      node.childNodes.forEach(function(child){
        if(child.nodeType===3){
          var text=child.nodeValue;
          Object.keys(replacements).forEach(function(key){text=text.replace(new RegExp(key,'g'),replacements[key]);});
          child.nodeValue=text;
        }else if(child.nodeType===1&&child.tagName!=='SCRIPT'&&child.tagName!=='STYLE'){
          replaceText(child);
        }
      });
    }
    replaceText(document.body);
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(function(input){
      var map={'Search':'Buscar','Enter your name':'Nombre completo','Enter last name':'Apellido','Enter your phone':'Teléfono','Enter your email':'Email','Enter the delivery address':'Dirección o referencia','Desired delivery day':'Día de entrega','Desired delivery time':'Hora de entrega','Enter your comment to the order':'Nota para el pedido'};
      if(map[input.placeholder])input.placeholder=map[input.placeholder];
    });
    var innerTitle=document.querySelector('.inner-top__title');
    if(innerTitle&&current==='shop.html')innerTitle.textContent='Catálogo';
    if(innerTitle&&current==='product_page.html')innerTitle.textContent='Producto';
    if(innerTitle&&current==='checkout-1.html')innerTitle.textContent='Pedido';
    if(current==='shop.html'){
      var admin=document.querySelector('.shop-panel__right');
      if(admin&&!admin.querySelector('.gewalt-admin-link'))admin.insertAdjacentHTML('beforeend','<a class="gewalt-admin-link" href="admin.html">Admin stock</a>');
    }
  }

  function renderProduct(){
    var wrap=document.querySelector('.product.wrapper');
    if(!wrap)return;
    var product=findProduct(query('id'));
    var sizes=product.sizes||{};
    var firstSize=Object.keys(sizes).find(function(size){return Number(sizes[size])>0;})||'M';
    wrap.innerHTML='<div class="product__cols">'
      +'<div class="product__left"><div class="product-gallery"><div class="product-slider__item"><a class="product-slider__link" href="'+image(product)+'"><img class="product-slider__image" src="'+image(product)+'" alt="'+product.name+'"></a></div></div></div>'
      +'<div class="product__right"><div class="product__content"><h2 class="product__title">'+product.name+'</h2><p class="product__text">'+product.description+'</p>'
      +'<div class="gewalt-product-meta"><span class="gewalt-chip">'+product.category+'</span><span class="gewalt-chip">Color: '+product.color+'</span><span class="gewalt-chip '+(totalStock(product)<=3?'gewalt-chip--danger':'gewalt-chip--ok')+'">Stock total: '+totalStock(product)+'</span></div>'
      +'<div class="product__prices"><span class="product__price">'+money(product.price)+'</span></div>'
      +'<h4>Selecciona talla</h4><div class="gewalt-size-grid" id="gewalt-size-grid">'+Object.keys(sizes).map(function(size){var disabled=Number(sizes[size])<=0;return '<button class="gewalt-size-button '+(size===firstSize&&!disabled?'is-active':'')+' '+(disabled?'is-disabled':'')+'" data-size="'+size+'" data-stock="'+sizes[size]+'" '+(disabled?'disabled':'')+'>'+size+'<br><small>'+sizes[size]+' disp.</small></button>';}).join('')+'</div>'
      +'<div class="gewalt-field" style="max-width:160px"><label>Cantidad</label><input id="gewalt-product-qty" type="number" min="1" max="'+(sizes[firstSize]||1)+'" value="1"></div><div id="gewalt-product-message" class="gewalt-card-note"></div>'
      +'</div><div class="product-add"><div class="product-add__col"><button id="gewalt-buy-now" class="product-add__button button"><span class="button__text">Continuar compra</span></button></div><div class="product-add__col"><button id="gewalt-favorite" class="gewalt-btn gewalt-btn--light">Favorito</button></div></div></div></div>';
    var selectedSize=firstSize;
    var selectedStock=Number(sizes[firstSize]||0);
    var qty=document.getElementById('gewalt-product-qty');
    var message=document.getElementById('gewalt-product-message');
    function refreshMessage(){message.textContent=selectedStock<=2?'Quedan pocas unidades en esta talla':'Stock disponible para talla '+selectedSize+': '+selectedStock;}
    refreshMessage();
    document.getElementById('gewalt-size-grid').addEventListener('click',function(event){var btn=event.target.closest('[data-size]');if(!btn||btn.disabled)return;document.querySelectorAll('.gewalt-size-button').forEach(function(item){item.classList.remove('is-active');});btn.classList.add('is-active');selectedSize=btn.getAttribute('data-size');selectedStock=Number(btn.getAttribute('data-stock'));qty.max=selectedStock;qty.value=1;refreshMessage();});
    qty.addEventListener('input',function(){var val=Math.max(1,Math.min(Number(qty.value||1),selectedStock));qty.value=val;});
    document.getElementById('gewalt-favorite').addEventListener('click',function(){toggleFavorite(product.id);this.textContent='Favorito guardado';});
    document.getElementById('gewalt-buy-now').addEventListener('click',function(){
      if(!selectedSize||selectedStock<=0){message.innerHTML='<span class="gewalt-error">Selecciona una talla disponible para continuar.</span>';return;}
      var quantity=Math.max(1,Math.min(Number(qty.value||1),selectedStock));
      writeJson(ORDER_KEY,{items:[{productId:product.id,productName:product.name,color:product.color,size:selectedSize,quantity:quantity,unitPrice:Number(product.price),subtotal:Number(product.price)*quantity}],createdAt:new Date().toISOString()});
      window.location.href='checkout-1.html';
    });
  }

  function buildWhatsAppOrderUrl(order){
    var item=order.items[0];
    var customer=order.customer||{};
    var shipping=order.shipping||{name:'Retiro coordinado',price:0};
    var total=(item.subtotal||0)+Number(shipping.price||0);
    var message='Hola GEWALT, quiero hacer este pedido:\n\n'
      +'Producto: '+item.productName+'\nColor: '+item.color+'\nTalla: '+item.size+'\nCantidad: '+item.quantity+'\nPrecio unitario: '+money(item.unitPrice)+'\nSubtotal: '+money(item.subtotal)+'\n\n'
      +'Método de envío: '+shipping.name+'\nCosto de envío: '+money(shipping.price)+'\nTotal: '+money(total)+'\n\n'
      +'Datos del cliente:\nNombre: '+(customer.name||'')+'\nTeléfono: '+(customer.phone||'')+'\nCiudad/Zona: '+(customer.city||'')+'\nDirección/Referencia: '+(customer.address||'')+'\nNota: '+(customer.note||'')+'\n\nPor favor confírmenme disponibilidad y forma de pago.';
    return 'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(message);
  }

  function renderCheckout(){
    var checkout=document.querySelector('.checkout-page.wrapper');
    if(!checkout)return;
    var order=readJson(ORDER_KEY,null);
    if(!order||!order.items||!order.items.length){checkout.innerHTML='<div class="gewalt-empty">Selecciona un producto para continuar. <br><br><a class="gewalt-btn" href="shop.html">Ir al catálogo</a></div>';return;}
    var item=order.items[0];
    checkout.innerHTML='<div class="checkout-nav"><div class="checkout-nav__item active current"><span class="checkout-nav__text">Pedido GEWALT por WhatsApp</span></div></div>'
      +'<div class="gewalt-checkout-grid"><form id="gewalt-checkout-form" class="gewalt-panel gewalt-panel--white"><h2 class="checkout-form__title">Datos del cliente</h2><div class="gewalt-form-grid">'
      +'<div class="gewalt-field"><label>Nombre completo</label><input name="name" required></div><div class="gewalt-field"><label>Teléfono</label><input name="phone" required></div><div class="gewalt-field"><label>Ciudad / zona</label><input name="city" required></div><div class="gewalt-field"><label>Dirección o referencia</label><input name="address" required></div>'
      +'<div class="gewalt-field"><label>Método de envío</label><select name="shipping"><option value="Retiro coordinado|0">Retiro coordinado - $0</option><option value="Envío local|5">Envío local - $5</option><option value="Envío nacional|10">Envío nacional - $10</option></select></div><div class="gewalt-field"><label>Nota opcional</label><textarea name="note"></textarea></div></div><div id="gewalt-checkout-error" class="gewalt-error"></div><button class="gewalt-btn" style="margin-top:18px" type="submit">Enviar pedido por WhatsApp</button></form>'
      +'<aside class="gewalt-panel"><h3 class="your-order__title">Resumen</h3><div class="gewalt-order-line"><span>Producto</span><b>'+item.productName+'</b></div><div class="gewalt-order-line"><span>Color</span><b>'+item.color+'</b></div><div class="gewalt-order-line"><span>Talla</span><b>'+item.size+'</b></div><div class="gewalt-order-line"><span>Cantidad</span><b>'+item.quantity+'</b></div><div class="gewalt-order-line"><span>Subtotal</span><b>'+money(item.subtotal)+'</b></div><div class="gewalt-order-line"><span>Envío</span><b id="gewalt-shipping-price">$0.00</b></div><div class="gewalt-order-line gewalt-order-total"><span>Total</span><b id="gewalt-total">'+money(item.subtotal)+'</b></div></aside></div>';
    var form=document.getElementById('gewalt-checkout-form');
    var shippingPrice=document.getElementById('gewalt-shipping-price');
    var total=document.getElementById('gewalt-total');
    form.elements.shipping.addEventListener('change',function(){var parts=this.value.split('|');shippingPrice.textContent=money(parts[1]);total.textContent=money(item.subtotal+Number(parts[1]));});
    form.addEventListener('submit',function(event){event.preventDefault();var fields=form.elements;var parts=fields.shipping.value.split('|');var customer={name:fields.name.value.trim(),phone:fields.phone.value.trim(),city:fields.city.value.trim(),address:fields.address.value.trim(),note:fields.note.value.trim()};if(!customer.name||!customer.phone||!customer.city||!customer.address){document.getElementById('gewalt-checkout-error').textContent='Completa nombre, teléfono, ciudad/zona y dirección.';return;}order.customer=customer;order.shipping={name:parts[0],price:Number(parts[1])};writeJson(ORDER_KEY,order);window.open(buildWhatsAppOrderUrl(order),'_blank');});
  }

  function renderAdmin(){
    var app=document.getElementById('gewalt-admin-app');
    if(!app)return;
    var editingId=null;
    function blank(){return {id:'',name:'',slug:'',price:34,currency:'USD',color:'',category:'Hoodies',image:'',description:'',active:true,featured:false,sizes:{S:0,M:0,L:0,XL:0}};}
    function fill(product){var form=document.getElementById('gewalt-product-form');var fields=form.elements;fields.id.value=product.id;fields.name.value=product.name;fields.price.value=product.price;fields.color.value=product.color;fields.image.value=product.image||'';fields.description.value=product.description;fields.active.checked=product.active!==false;fields.featured.checked=!!product.featured;['S','M','L','XL'].forEach(function(size){fields['stock'+size].value=product.sizes[size]||0;});editingId=product.id;document.getElementById('gewalt-form-title').textContent='Editar producto';}
    function render(){var products=getProducts();app.querySelector('[data-count]').textContent=products.length;var tbody=document.getElementById('gewalt-products-body');tbody.innerHTML='';products.forEach(function(product){var tr=el('tr');tr.innerHTML='<td><b>'+product.name+'</b><br><small>'+product.id+'</small></td><td>'+money(product.price)+'</td><td>'+product.color+'</td><td>S '+(product.sizes.S||0)+' / M '+(product.sizes.M||0)+' / L '+(product.sizes.L||0)+' / XL '+(product.sizes.XL||0)+'</td><td><span class="gewalt-chip '+(totalStock(product)<=3?'gewalt-chip--danger':'gewalt-chip--ok')+'">'+totalStock(product)+'</span></td><td>'+(product.active!==false?'Activo':'Oculto')+'</td><td><div class="gewalt-admin-actions"><button class="gewalt-btn gewalt-btn--muted" data-edit="'+product.id+'">Editar</button><button class="gewalt-btn gewalt-btn--danger" data-delete="'+product.id+'">Eliminar</button></div></td>';tbody.appendChild(tr);});}
    app.addEventListener('click',function(event){var edit=event.target.closest('[data-edit]');var del=event.target.closest('[data-delete]');if(edit){fill(findProduct(edit.getAttribute('data-edit')));}if(del&&confirm('Eliminar producto?')){saveProducts(getProducts().filter(function(product){return product.id!==del.getAttribute('data-delete');}));render();}});
    document.getElementById('gewalt-product-form').addEventListener('submit',function(event){event.preventDefault();var fields=event.currentTarget.elements;var id=(fields.id.value||fields.name.value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');if(!fields.name.value.trim()){document.getElementById('gewalt-admin-message').textContent='El nombre es obligatorio.';return;}var product={id:id,name:fields.name.value.trim(),slug:id,price:Math.max(0,Number(fields.price.value||0)),currency:'USD',color:fields.color.value.trim(),category:'Hoodies',image:fields.image.value.trim()||PLACEHOLDER,description:fields.description.value.trim(),active:fields.active.checked,featured:fields.featured.checked,sizes:{S:Math.max(0,Number(fields.stockS.value||0)),M:Math.max(0,Number(fields.stockM.value||0)),L:Math.max(0,Number(fields.stockL.value||0)),XL:Math.max(0,Number(fields.stockXL.value||0))}};var products=getProducts().filter(function(item){return item.id!==editingId&&item.id!==product.id;});products.push(product);saveProducts(products);editingId=product.id;document.getElementById('gewalt-admin-message').textContent='Producto guardado. Revisa shop.html para verlo en catálogo.';render();});
    document.getElementById('gewalt-new-product').addEventListener('click',function(){editingId=null;document.getElementById('gewalt-product-form').reset();document.getElementById('gewalt-form-title').textContent='Crear producto';});
    document.getElementById('gewalt-reset-products').addEventListener('click',function(){if(confirm('Restaurar productos iniciales GEWALT?')){saveProducts(seedProducts);render();}});
    render();
  }

  document.addEventListener('DOMContentLoaded',function(){brandStaticPages();renderHomeProducts();renderShop();renderProduct();renderCheckout();renderAdmin();});
  window.GewaltStore={getProducts:getProducts,saveProducts:saveProducts,buildWhatsAppOrderUrl:buildWhatsAppOrderUrl};
})();
