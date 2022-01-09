var loginBtn = document.getElementById("login");
var msg = document.getElementById("msg");
var email = document.getElementById("email");
var password = document.getElementById("password");
//登入
loginBtn.addEventListener("click", function () {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      // console.log(result);
      // 登入成功跳轉頁面
      location.href = "profile.html";
    })
    .catch((error) => {
      // 頁面提示錯誤訊息
      msg.innerHTML = error.message;
    });
});

//註冊
var overlay = document.getElementById("overlay");
var errMsg = document.getElementById("errMsg");
var registEmail = document.getElementById("registEmail");
var registPassword = document.getElementById("registPassword");

document.getElementById("registBtn").addEventListener("click", function () {
  overlay.classList.toggle("-none");
  msg.innerHTML = "";
  email.value = "";
  password.value = "";
});
//取消註冊
document.getElementById("closeBtn").addEventListener("click", function () {
  overlay.classList.toggle("-none");
  registEmail.value = "";
  registPassword.value = "";
  errMsg.innerHTML = "";
});

//確認註冊
document.getElementById("sendBtn").addEventListener("click", function () {
  firebase
    .auth()
    .createUserWithEmailAndPassword(registEmail.value, registPassword.value)
    .then((userCredential) => {
      // 成功跳轉頁面
      location.href = "profile.html";
    })
    .catch((error) => {
      errMsg.innerHTML = error.message;
    });
});
