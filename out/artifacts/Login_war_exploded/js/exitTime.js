window.setInterval(ChangeLeaveTime,1000);
var i = 6;

function ChangeLeaveTime() {
    i = i - 1;
    if(i == 0){
        window.location.href = "index.html";
    }else{
        document.getElementById("time").innerText = i;
    }
}
