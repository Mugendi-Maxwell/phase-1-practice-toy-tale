let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
   
document.addEventListener('DOMContentLoaded', () => {
  const toyCollectionDiv = document.getElementById('toy-collection');
  const toyForm = document.querySelector('.add-toy-form'); 

  
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        createToyCard(toy);
      });
    })
    .catch(error => console.error('Error fetching toys:', error));

  
  function createToyCard(toy) {
    const toyCard = document.createElement('div');
    toyCard.classList.add('card');

    const toyName = document.createElement('h2');
    toyName.textContent = toy.name;

    const toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.classList.add('toy-avatar');

    const toyLikes = document.createElement('p');
    toyLikes.textContent = `${toy.likes} Likes`;

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.textContent = 'Like ❤️';

    
    likeButton.addEventListener('click', () => increaseLikes(toy, toyLikes));

    toyCard.appendChild(toyName);
    toyCard.appendChild(toyImage);
    toyCard.appendChild(toyLikes);
    toyCard.appendChild(likeButton);

    toyCollectionDiv.appendChild(toyCard);
  }

  
  function increaseLikes(toy, toyLikesElement) {
    const newLikes = toy.likes + 1;

    
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
      .then(response => response.json())
      .then(updatedToy => {
        
        toyLikesElement.textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error updating likes:', error));
  }


  toyForm.addEventListener('submit', event => {
    event.preventDefault(); 

    
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

   
    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0 
    };

    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(response => response.json())
      .then(toy => {
        
        createToyCard(toy);

        
        toyForm.reset();
      })
      .catch(error => console.error('Error adding new toy:', error));
  });
});
