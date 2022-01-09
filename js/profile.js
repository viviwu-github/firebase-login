// 判斷登入狀態
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // 已登入
    var email = user.email;
    document.getElementById("user").innerHTML = "你好 " + email;
  } else {
    // 未登入
    location.href = "index.html";
  }
});

// 修改密碼
var msg = document.getElementById("message");
var oldpw = document.getElementById("oldPassword");
var newpw = document.getElementById("newPassword");

document.getElementById("change").addEventListener("click", function () {
  document.getElementById("changearea").classList.toggle("-none");
  msg.innerHTML = "";
  oldpw.value = "";
  newpw.value = "";
});

//取消修改
document.getElementById("cancel").addEventListener("click", function () {
  document.getElementById("changearea").classList.toggle("-none");
  msg.innerHTML = "";
});

var sendBtn = document.getElementById("sendBtn");

//確認修改
sendBtn.addEventListener("click", function () {
  const user = firebase.auth().currentUser;
  // 修改密碼需先重新驗證使用者身分
  credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    oldpw.value
  );
  // console.log(credential);
  // 驗證通過才可修改密碼
  user
    .reauthenticateWithCredential(credential)
    .then(function () {
      user
        .updatePassword(newpw.value)
        .then(() => {
          // console.log("ok");
          msg.innerHTML = "success";
          oldpw.value = "";
          newpw.value = "";
        })
        .catch((error) => {
          // 密碼重設失敗
          msg.innerHTML = error.message;
        });
    })
    .catch(function (error) {
      // 重新驗證失敗
      // console.log(error);
      msg.innerHTML = error.message;
    });
});

// 登出
var checkoutBtn = document.getElementById("checkout");
checkoutBtn.addEventListener("click", function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
    });
});
