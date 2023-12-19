const products = [
  { id: 1, name: "product1", price: 40 },
  { id: 2, name: "product2", price: 20 },
  { id: 3, name: "product3", price: 100 },
];

const cart = {
  items: [],
  total: 0,
  quantity: 0,
};

function addToCart(productId, quantity = 1) {
  cart.items.map((item) => {
    if (item.id === productId) {
      item.quantity += quantity;
      cart.total += products[productId - 1].price * quantity;
      cart.quantity += quantity;
    }
    // console.log(cart);
    return;
  });
  cart.items.push({ id: productId, quantity: quantity });
  cart.quantity += quantity;
  products.map((product) => {
    if (product.id === productId) {
      cart.total += product.price * quantity;
    }
  });
  console.log(cart);
  return;
}
function isCardValidate() {
  if (cart.quantity > 0 && cart.total > 0) {
    return true;
  }
  return false;
}
function createUniqueOrderId() {
  return Math.floor(Math.random() * 1000000);
}
function CreateOrder() {
  const pr = new Promise((resolve, reject) => {
    if (isCardValidate()) {
      const orderId = createUniqueOrderId();
      resolve(orderId);
    } else {
      const err = new Error("order not created");
      reject(err);
    }
  });
  return pr;
}
function proceedToPayment(orderId) {
  const pr = new Promise((resolve, reject) => {
    resolve(orderId);
    console.log("proceed to payment");
  });
  return pr;
}

function showOrderSummary(orderId) {
  console.log("payment done");
  console.log("order summary");
  const pr = new Promise((resolve, reject) => {
    resolve("order summary");
  });
  console.log("total amount", cart.total);
  console.log("total quantity", cart.quantity);
  cart.items = [];
  cart.total = 0;
  cart.quantity = 0;
  return pr;
}
function updateWallet() {
  console.log("wallet updated");
}
let generateRandomNumber = () => {
  return Math.floor(Math.random() * 3) + 1;
};
addToCart(1, 2);
addToCart(2, 1);
addToCart(3, 1);
addToCart(1, 1);

// its time to run promises
CreateOrder()
  .then((orderId) => {
    return proceedToPayment(orderId);
  })
  .then((orderId) => {
    return showOrderSummary(orderId);
  })
  .then(() => {
    updateWallet();
  })
  .catch((err) => {
    console.log(err);
  });

console.log("HAPPY SHOPPING");
