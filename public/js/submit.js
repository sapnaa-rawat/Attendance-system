document.getElementById('submitbtn').onclick = async e => {
    // var name = document.getElementById('name').value;
    // var email = document.getElementById('email').value;
    // var phone = document.getElementById('phone').value;
    // var skype = document.getElementById('skype').value;
    // var designation = document.getElementById('designation').value;
    // var technology = document.getElementById('technology').value;
    // var ID = document.getElementById('ID').value;
    // var password = document.getElementById('password').value;
    var form = document.getElementById('register-form');

    // let fd = new FormData();
    // fd.append('name',name);
    // fd.append('email',email);
    // fd.append('password',password);
    // alert(JSON.stringify(fd));
    e.preventDefault();
    let response = await fetch('/localhost:3000/register', {
        method: 'POST',
        body: new FormData(form)
      });
    let result = await response.json();
    console.log(result);
};