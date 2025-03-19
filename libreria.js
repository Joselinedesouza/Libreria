document.addEventListener("DOMContentLoaded", function () {
  const libreriaURL = " https://striveschool-api.herokuapp.com/books";
  const bookContainer = document.getElementById("container-book");
  const card = document.getElementById("card");

  fetch(libreriaURL)
    .then((response) => {
      if (response.ok) {
        console.log("bene", response);
        return response.json();
      } else throw new error("Errore");
    })

    .then((books) => {
      books.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col-sm-4", "mb-4");
        col.innerHTML = `
                    <div class="card ">
                        <img src="${book.img}" class="card-img-top " alt="Copertina libro">
                        <div class="card-body">
                            <h5 class="card-title fs-6">${book.title}</h5>
                            <p class="card-text">Prezzo: €${book.price}</p>
                            <button class="btn btn-danger btn-sm scarta">Scarta</button>
                            <button class="btn btn-primary btn-sm compra">Compra ora</button>
                        </div>
                    </div>
                `;

        col.querySelector(".scarta").addEventListener("click", function () {
          col.remove();
        });

        col.querySelector(".compra").addEventListener("click", function () {
          cardItems.push(book);
          updateCart();
        });

        bookContainer.appendChild(col);
      });
    })
    .catch((error) =>
      console.error("Errore nel caricamento dei libri:", error)
    );

  function updateCart() {
    card.innerHTML = "";
    cardItems.forEach((book, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between");

      li.innerHTML = `
                ${book.title} - €${book.price}
                <button class="btn btn-danger btn-sm rimuovi" data-index="${index}">Rimuovi</button>
            `;

      li.querySelector(".rimuovi").addEventListener("click", function () {
        cardItems.splice(index, 1);
        updateCart();
      });

      card.appendChild(li);
    });
  }
});
