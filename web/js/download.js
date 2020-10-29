
function lightStar(num) {
    var starContainer = document.getElementById("starContainer");
    var lightStars = starContainer.getElementsByTagName("img");

    alert(num);

    for (var i = 0;i < num;i++){
        lightStars[i].src = "images/star1.png";
    }

}