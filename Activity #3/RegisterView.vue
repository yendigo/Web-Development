<template>
  <section class="h-100 gradient-form" id="land-bg">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-4 shadow text-black">
          <div class="row g-0">
            <!-- The left side column -->
            <div class="col-lg-6 d-flex align-items-center left-board">
              <div class="left-text ps-3">
                <h2 class="fs-2 ps-5 pe-5 fw-bold text-start text-primary">Certuptify</h2>
                <p class="small ps-5 pe-5 text-start">An application to assist the user in the creation of completion of records and certificates for interns.</p>
              </div>
            </div>
            <!-- The right side column -->
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">
                <div class="text-center">
                  <div class="fs-3 mt-1 mb-3">Sign up</div>
                </div>
                <div class="text-danger mb-3" id="registerFeedback" v-if="registerError">{{registerMessage}}</div>
                <form>
                  <div class="form-outline pb-3" style="text-align: left;">
                    <label for="form2Example11" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="nameInput" v-model="fullName" v-bind:class="{ 'is-invalid': nameError }" v-on:change="nameChecker()" placeholder="Enter full name"/>
                  </div>

                  <div class="form-outline pb-3" style="text-align: left;">
                    <label for="form2Example11" class="form-label">Email</label>
                    <input type="email" class="form-control" id="emailInput" v-model="email" v-bind:class="{ 'is-invalid': emailError }" v-on:change="emailChecker()" placeholder="Enter email address"/>
                  </div>

                  <div class="form-outline pb-2" style="text-align: left;">
                    <label for="form2Example22" class="form-label">Password</label>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" id="passwordInput" 
                          v-model="password"
                          v-bind:class="{ 'is-invalid': passwordError }" 
                          v-on:change="passwordChecker()"  placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
                        <i class="bi input-group-text bi-eye-slash-fill" id="togglePassword" v-on:click="togglePassword()"></i>
                      </div>
                  </div> 
                  <div class="form-outline pb-3" style="text-align: left;">
                    <label for="form2Example22" class="form-label">Position</label>
                    <input type="text" class="form-control" id="confirmPasswordInput" v-model="position" placeholder="Position"/>
                  </div> 
                  <!-- Signup button -->
                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" v-on:click="registerUser()">Sign up</button>
                  </div>

                  <div class="d-flex justify-content-center pt-2 small ">
                    <p class="mb-0 me-2">Already have an account?</p>
                    <a class="text-decoration-none" href="/login">Login</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from "axios"
import { server } from "../helper.js";

export default{
  name: 'RegisterView',
  data(){
    return {
      registerError: false,
      nameError: false,
      emailError: false,
      passwordError: false,
      registerMessage: "",
      fullName: "",
      email: "",
      password: "",
      position: "",
      proceed: true
    }
  },
  methods: {
    async registerUser(){  // This is to validate the inputs when the "login" button is clicked
      if(this.fullName == ""){
        this.nameError = true;
        this.proceed = false;
      }

      if(this.email == ""){
        this.emailError = true;
        this.proceed = false;
      } else {
        if(this.registerError == true){  // should not proceed if email is already used!
          this.proceed = false;
        } 
      }

      if(this.password == ""){
        this.passwordError = true;
        this.proceed = false;
      }

      if(this.proceed == true){
        this.proceedRegister();
      }
    },
    nameChecker(){  // This is to validate the input name once changed
      if(this.fullName == ""){
        this.nameError = true;
      } else {
        document.getElementById("nameInput").className = "form-control is-valid";
      }
    },
    emailChecker(){ // This is to validate the email input once changed 
      if(this.email == ""){
        this.emailError = true;
      } else {
        if(this.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
          axios.post(`${server.baseURL}/emailVerification`, { email: this.email }).then(response => {
            console.log("Inside emailVerification axios");
            console.log(response.data); // if status is true it means email is already in use!

            if(response.data == true){
              document.getElementById("emailInput").className = "form-control is-invalid";
              this.registerMessage = "Email is already in use!";
              this.registerError = true;
              this.proceed = false;
            } else {
              document.getElementById("emailInput").className = "form-control is-valid";
              this.registerError = false;
              this.proceed = true;
            }
          })
        } else {
          document.getElementById("emailInput").className = "form-control is-invalid";
          this.registerMessage = "Invalid email address!";
          this.registerError = true;
          this.proceed = false;
        }
      }
    },
    passwordChecker(){  // This is to validate the password input once changed 
      if(this.password == ""){
        this.passwordError = true;
      } else {
        document.getElementById("passwordInput").className = "form-control is-valid";
      }
    },
    proceedRegister(){
      axios.post(`${server.baseURL}/createAuthorized`, { fullName: this.fullName, email: this.email, password: this.password, position: this.position }).then(response => {  // Checking if the user is authorized
        console.log("Inside createAuthorized axios");
        console.log(response.data);  // this is what the backend returns to me
        
        if(response.data != null) {
          this.$router.push({ path: '/login' });  // If user is found proceed to QR code generator page
        }       
      }).catch(error => {
        console.log("Error in checking login");
        console.log(error.data);
      });
    },
    togglePassword(){  
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#passwordInput');
      // Toggle the type attribute using
      // getAttribute() method
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';        
      password.setAttribute('type', type);
      console.log(type);
      if (type == "text"){
        togglePassword.classList.remove('bi-eye-slash-fill');
        togglePassword.classList.toggle('bi-eye-fill');
      } else {
        togglePassword.classList.remove('bi-eye-fill');
        togglePassword.classList.toggle('bi-eye-slash-fill');
      }
      // Toggle the eye and bi-eye icon       
    }
  }
};
</script>

<style>
#land-bg {
  background-image: url(../assets/landing-bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.left-board {
  background-image: url(../assets/signup-board.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.left-text {
  padding-top: 80px;
  padding-bottom: 390px;
}
.gradient-custom-2 {
  /* fallback for old browsers */
  background: #fccb90;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, #2d52e2, #5d25a0);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #2d52e2, #5d25a0);
  /* background: linear-gradient(to right, #5d25a0, #2d52e2); */
}

@media (min-width: 768px) {
  .gradient-form {
      height: 100vh !important;
  }
}

@media (min-width: 769px) {
.gradient-custom-2 {
border-top-right-radius: .3rem;
border-bottom-right-radius: .3rem;
}
}
</style>