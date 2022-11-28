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

const showMessage = (msg, success) => {
  messageBlock.classList.toggle(`invisible`);
  messageBlock.classList.toggle(`visible`);

  if (success) messageBlock.classList.add(`message-success`);
  else messageBlock.classList.add(`message-error`);

  messageBlock.innerText = msg;
};

const closeMessage = () => {
  window.addEventListener(
    `click`,
    (e) => {
      messageBlock.classList.toggle(`invisible`);
      messageBlock.classList.toggle(`visible`);
      messageBlock.classList.remove(`message-success`);
      messageBlock.classList.remove(`message-error`);
    },
    { once: true }
  );
};

const scope = function () {
  let token;

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

        token = data.token;

        showMessage(`User account created!`, true);

        closeMessage();
      } catch (error) {
        showMessage(`Creation failed! ${error.response.data.msg}`);

        closeMessage();
      }

      document.querySelector(`#registerName`).value = "";
      document.querySelector(`#registerEmail`).value = "";
      document.querySelector(`#registerPassword`).value = "";
    },
    loginMethod: async (e) => {
      e.preventDefault();

      const email = document.querySelector(`#loginEmail`).value;
      const password = document.querySelector(`#loginPassword`).value;

      try {
        const { data } = await axios.post(`/login`, { email, password });

        token = data.token;

        showMessage(`Successfull login!`, true);

        closeMessage();
      } catch (error) {
        showMessage(`Login failed! ${error.response.data.msg}`);

        closeMessage();
      }

      document.querySelector(`#loginEmail`).value = "";
      document.querySelector(`#loginPassword`).value = "";
    },
    emailMethod: async (e) => {
      e.preventDefault();

      try {
        const request = await axios.get(`/send`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        showMessage(request.data.msg, true);

        closeMessage();
      } catch (error) {
        if (error.response.status === 401)
          showMessage(`Authorization failed!`, false);

        if (error.response.status === 500)
          showMessage(`Something went wrong! Please, try again later`, false);

        closeMessage();
      }
    },
  };

  Object.seal(functionality);
  return functionality;
};

const closure = scope();

const loginForm = document.querySelector(`#loginForm`);
const registerForm = document.querySelector(`#registerForm`);
const messageBlock = document.querySelector(`#message`);

registerForm.addEventListener(`submit`, closure.registerMethod);
loginForm.addEventListener(`submit`, closure.loginMethod);

const emailLink = document.querySelector(`#emailLink`);
emailLink.addEventListener(`click`, closure.emailMethod);
