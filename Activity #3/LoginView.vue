<template>
  <section class="h-100 gradient-form" id="land-bg">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 shadow text-black">
          <div class="row g-0">
            <!-- The left side column -->
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">
                <div class="text-center">
                  <div class="fs-3 pt-4">Sign in</div>
                </div>
                <div class="text-danger mb-3" id="loginFeedback" v-if="loginError">{{loginMessage}}</div>
                <form>
                  <div class="form-outline pb-3" style="text-align: left; padding-left: 1px;">
                    <label for="form2Example11" class="form-label">Email</label>
                    <input type="email" class="form-control" id="emailInput" v-model="email" v-bind:class="{ 'is-invalid': emailError }" v-on:change="emailChecker()" placeholder="Enter email address"/>
                  </div>

                  <div class="form-outline pb-3" style="text-align: left; padding-left: 1px;">
                    <label for="form2Example22" class="form-label">Password</label>
                      <div class="input-group mb-3">
                        <input type="password" class="form-control" id="passwordInput" 
                          v-model="password"
                          v-bind:class="{ 'is-invalid': passwordError }" 
                          v-on:change="passwordChecker()"  placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
                        <i class="bi input-group-text bi-eye-slash-fill" id="togglePassword" v-on:click="togglePassword()"></i>
                      </div>
                  </div>
                  <!-- Forms using BOOTSTRAP 5 -->
                  
                  <div class="row pb-2 pt-3 ps-2">
                    <div class="col-6">
                      <div class="form-check text-start small">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">Remember me</label>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-end small ">Forgot password?</div>
                    </div>
                  </div>

                  <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" v-on:click="validateLogin()">Login</button>
                    <!-- <a class="text-muted" href="#!">Forgot password?</a> -->
                  </div>

                  <div class="d-flex justify-content-center pt-2 small">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <a class="text-decoration-none" href="/register">Sign up</a>
                  </div>
                </form>
              </div>
            </div>
            <!-- The right side column -->
            <div class="col-lg-6 d-flex align-items-center right-board">
              <div class="right-text ps-3">
                <h2 class="fs-2 ps-4 pe-5 fw-bold text-start text-primary">Welcome back</h2>
                <p class="small ps-4 pe-5 text-start">An application to assist the user in the creation of completion of records and certificates for interns.</p>
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
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { server } from "../helper.js";

export default{
  name: 'LoginView',
  data(){
    return {
      emailError: false,
      passwordError: false,
      loginError: false,
      email: "",
      password: "",
      loginMessage: "",
    }
  },
  methods: {
    validateLogin(){  // This is to validate the inputs when the "login" button is clicked
      var proceed = true;
      if(this.email == ""){
        this.emailError = true;
        proceed = false;
      } else {
        // this is to check if email is valid email address
        if(this.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
          document.getElementById("emailInput").className = "form-control is-valid";
          this.loginError = false;
        } else {
          document.getElementById("emailInput").className = "form-control is-invalid";
          this.loginMessage = "Invalid email address!";
          this.loginError = true; // If loginError is true display message, if false loginMessage is not visible
        }
      }

      if(this.password == ""){
        this.passwordError = true;
        proceed = false;
      }

      if(proceed == true){
        this.proceedLogin();
      }
    },
    emailChecker(){ // This is to validate the email input once changed 
      if(this.email == ""){
        this.emailError = true;
      } else {
        if(this.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        {
          document.getElementById("emailInput").className = "form-control is-valid";
          this.loginError = false;
        } else {
          document.getElementById("emailInput").className = "form-control is-invalid";
          this.loginMessage = "Invalid email address!";
          this.loginError = true; // If loginError is true display message, if false loginMessage is not visible
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
    togglePassword(){  
      const togglePassword = document.querySelector('#togglePassword');
      const password = document.querySelector('#passwordInput');
      // Toggle the type attribute using
      // getAttribute() method
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';        
      password.setAttribute('type', type);
      console.log(type);
      if(type == "text"){
        togglePassword.classList.remove('bi-eye-slash-fill');
        togglePassword.classList.toggle('bi-eye-fill');
      } else {
        togglePassword.classList.remove('bi-eye-fill');
        togglePassword.classList.toggle('bi-eye-slash-fill');
      }
      // Toggle the eye and bi-eye icon    
    },
    proceedLogin(){
      axios.post(`${server.baseURL}/loginAuthorized`, { email: this.email, password: this.password }).then(response => {  // Checking if the user is authorized
        console.log("Inside loginAuthorized axios");
        console.log(response.data);  // this is what the backend returns to me
        
        if(response.data.found == true) {
          this.$router.push({ path: '/generator' });  // If user is found proceed to QR code generator page
        } else {
          this.loginMessage = "No user with that email or wrong password!";
          this.loginError = true;
        }       
      }).catch(error => {
        console.log("Error in checking login");
        console.log(error.data);
      });
    }
  },
};
</script>

<style>
#land-bg {
  background-image: url(../assets/landing-bg.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.right-board {
  background-image: url(../assets/login-board.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.right-text {
  padding-top: 390px;
  padding-bottom: 40px;
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