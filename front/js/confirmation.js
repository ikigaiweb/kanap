

let urlparamS = new URLSearchParams(window.location.search);    
let orderId = urlparamS.get("orderId");  
document.getElementById("orderId").textContent = orderId;