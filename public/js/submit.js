var form = document.getElementById('register-form');
form.addEventListener("submit", async e => {
  e.preventDefault();
  const fd = new FormData(this);
  var response = await fetch('localhost:3000/register', {
    method: 'post',
    body: fd
  });
  let result = await response.json();
  console.log(result);
});