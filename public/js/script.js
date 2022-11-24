const toggleAuth = document.querySelector(`#toggleAuth`);

toggleAuth.addEventListener(`click`, (e) => {
  e.preventDefault();
  const registerForm = document.querySelector(`#register_form`);
  const loginForm = document.querySelector(`#login_form`);

  [registerForm, loginForm].forEach((elem) => {
    elem.classList.toggle(`invisible`);
    elem.classList.toggle(`visible`);
  });
});

const loginForm = document.querySelector(`#loginForm`);
const registerForm = document.querySelector(`#registerForm`);

loginForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  console.log(`Login!`);
});

registerForm.addEventListener(`submit`, (e) => {
  e.preventDefault();
  console.log(`Register!`);
});
