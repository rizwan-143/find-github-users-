let myForm = document.getElementById("my-form");
  let userCard = document.getElementById("card");
  userCard.style.display = "none";
myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let userInputName = event.target.userinputname.value;
  console.log(userInputName);

  function getGitHubUsers(username) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject("user not found");
          }
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  getGitHubUsers(userInputName)
  .then((response) => {
      console.log(response);
      let enter = document.getElementById("enter");
      enter.style.display = "none";
      userCard.style.display = "block";
      let userImage = document.getElementById("user-image");
      let username = document.getElementById("user-name");
      let publicRepositries = document.getElementById("public-repositries");
      let followers = document.getElementById("followers");
      let following = document.getElementById("following");
      let location = document.getElementById("location");
      let id = document.getElementById("id");
      userImage.src = response.avatar_url;
      username.innerText = `user name : ${response.login}`;
      publicRepositries.innerText = `public repositries : ${response.public_repos}`;
      followers.innerText = `followers : ${response.followers}`;
      following.innerText = `following : ${response.following}`;
      location.innerText = `location : ${response.location || "not provided"}`;
      id.innerText = `user id : ${response.id}`;
    })
    .catch((error) => {console.log(error)
      userCard.style.display = "none";
      enter.style.display = "block";
      enter.innerText = "user not found !";
      enter.style.color = "red";
    });

  event.target.reset();
});
