
function registrar() {
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value


  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      verificar()

    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });



}

function ingresar() {

  let email2 = document.getElementById('email2').value
  let password2 = document.getElementById('password2').value

  firebase.auth().signInWithEmailAndPassword(email2, password2)
    .then(function () {
       alert('send a email for verify accout')
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)

    });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      show(user)

    } else {
      document.getElementById('contenido').innerHTML = ``
          
    }
  });

}
observador();

function show(user) {
  if (user.emailVerified) {
    document.getElementById('contenido').innerHTML = `
      <div class="alert alert-success col-md-6 mx-auto mt-5" role="alert">
      <h4 class="alert-heading">Bienvenido ${user.email}</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <hr>
      <button class="btn btn-danger" onclick="cerrar()" >cerrar session </button>
    </div>
       `
  }

}


function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    document.getElementById('contenido').innerHTML =  `
      <div class="alert alert-warning alert-dismissible fade show mt-3 col-md-6 mx-auto" role="alert">
      <strong>message send!</strong> send a email to verify accout
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `

  }).catch(function (error) {
    console.log(error)
  });
}

async function cerrar() {
  await firebase.auth().signOut()
}



