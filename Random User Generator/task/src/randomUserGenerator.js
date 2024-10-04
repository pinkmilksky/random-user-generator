// Retrieve saved users from localStorage or initialize as an empty array
const users = JSON.parse(localStorage.getItem("users")) || [];

// Function to sync the current user list with localStorage
function syncLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to fetch and display a random user
async function randomUserGenerator() {
    const response = await fetch("https://randomuser.me/api"); // Fetch random user data from API
    let userParams = await response.json(); // Parse JSON response
    userWrapper(userParams); // Display user details
    users.push(userParams); // Add user to the list
    syncLocalStorage(); // Sync with localStorage
}

// Function to display saved users from localStorage
async function showSavedUsers() {
    syncLocalStorage(); // Ensure localStorage is synced
    if (users.length === 0) {
        randomUserGenerator(); // If no users are saved, generate a new user
    } else {
        let aboutUser = document.getElementById("user-text");
        let savedUsersInfo = document.createElement("h3");
        savedUsersInfo.className = "saved";
        savedUsersInfo.textContent = "Saved Users";
        aboutUser.appendChild(savedUsersInfo);
    }

    for (let user of users) {
        userWrapper(user); // Display each saved user
    }
}

// Function to create the user card and display user information
function userWrapper(userParams) {
    let aboutUser = document.getElementById("user-text");

    // Container for user details
    let userContainer = document.createElement("div");
    userContainer.className = "user"; // Apply 'user' styles
    aboutUser.appendChild(userContainer);

    // User photo
    let userPhoto = document.createElement("img");
    userPhoto.src = userParams["results"]["0"]["picture"]["medium"];
    userPhoto.alt = "User photo";
    userPhoto.className = "photo"; // Apply 'photo' styles
    userContainer.appendChild(userPhoto);

    // User name
    let userName = document.createElement("h2");
    userName.className = "name"; // Apply 'name' styles
    userName.textContent = `${userParams["results"]["0"]["name"]["first"]} ${userParams["results"]["0"]["name"]["last"]}`;
    userContainer.appendChild(userName);

    // User email
    let userEmail = document.createElement("p");
    userEmail.className = "email"; // Apply 'email' styles
    userEmail.textContent = `Email: ${userParams["results"]["0"]["email"]}`;
    userContainer.appendChild(userEmail);

    // User password
    let userPassword = document.createElement("p");
    userPassword.className = "password"; // Apply 'password' styles
    userPassword.textContent = `Password: ${userParams["results"]["0"]["login"]["password"]}`;
    userContainer.appendChild(userPassword);

    // User gender
    let userGender = document.createElement("p");
    userGender.className = "gender"; // Apply 'gender' styles
    userGender.textContent = `Gender: ${userParams["results"]["0"]["gender"]}`;
    userContainer.appendChild(userGender);

    // User phone
    let userPhone = document.createElement("p");
    userPhone.className = "phone"; // Apply 'phone' styles
    userPhone.textContent = `Phone: ${userParams["results"]["0"]["phone"]}`;
    userContainer.appendChild(userPhone);

    // User location
    let userLocation = document.createElement("p");
    userLocation.className = "location"; // Apply 'location' styles
    userLocation.textContent = `Location: ${userParams["results"]["0"]["location"]["city"]} ${userParams["results"]["0"]["location"]["state"]} ${userParams["results"]["0"]["location"]["country"]}`;
    userContainer.appendChild(userLocation);

    // User birthday
    let userBirthday = document.createElement("p");
    userBirthday.className = "birthday"; // Apply 'birthday' styles
    const userBirthdayFull = new Date(userParams["results"]["0"]["dob"]["date"]);
    userBirthday.textContent = `Birthday: ${userBirthdayFull.toLocaleDateString('en-GB')}`;
    userContainer.appendChild(userBirthday);
}

// Display saved users on page load
showSavedUsers();