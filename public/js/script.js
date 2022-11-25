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

const scope = function () {
  let t;

  const functionality = {
    registerMethod: async (e) => {
      e.preventDefault();

      const name = document.querySelector(`#registerName`).value;
      const email = document.querySelector(`#registerEmail`).value;
      const password = document.querySelector(`#registerPassword`).value;

      try {
        const { data } = await axios.post(`/register`, {
          name,
          email,
          password,
        });

        t = data;

        console.log(t);
      } catch (error) {
        alert(error.response.data.msg);
        document.querySelector(`#registerName`).value = "";
        document.querySelector(`#registerEmail`).value = "";
        document.querySelector(`#registerPassword`).value = "";
      }
    },
    loginMethod: async (e) => {
      e.preventDefault();

      const email = document.querySelector(`#loginEmail`).value;
      const password = document.querySelector(`#loginPassword`).value;

      try {
        const { data } = await axios.post(`/login`, { email, password });
        console.log(data);

        var1++;
        console.log(var1);
      } catch (error) {
        console.log(error);
      }
    },
  };

  Object.seal(functionality);
  return functionality;
};

const closure = scope();

const loginForm = document.querySelector(`#loginForm`);
const registerForm = document.querySelector(`#registerForm`);

registerForm.addEventListener(`submit`, closure.registerMethod);
loginForm.addEventListener(`submit`, closure.loginMethod);
