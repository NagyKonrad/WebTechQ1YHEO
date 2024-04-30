fetch("products.json")
.then(function(response){
   return response.json();
})
.then(function(products){
   let placeholder = document.querySelector("#data-output");
   let out = "";
   for(let product of products){
      out += `
         <tr>
            <td>${product.title}</td>
            <td>${product.body}</td>
            <td>${product.body2}</td>
         </tr>
      `;
   }
 
   placeholder.innerHTML = out;
});

