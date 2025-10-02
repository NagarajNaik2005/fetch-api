const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userContainer.innerHTML = "Loading...";
  errorMsg.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);

  } catch (error) {
    userContainer.innerHTML = "";
    errorMsg.textContent = "Failed to load data. Please check your internet connection.";
    console.error("Error fetching users:", error);
  }
}

function displayUsers(users) {
  userContainer.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(card);
  });
}

// Event listener for reload button
reloadBtn.addEventListener("click", fetchUsers);

// Initial fetch when page loads
fetchUsers();
