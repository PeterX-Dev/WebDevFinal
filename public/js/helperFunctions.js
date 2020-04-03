//searchOnEnter();

function searchOnEnter() {
    var inputBar = document.getElementById("searchInput");
    inputBar.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    })
}

function toggleShow(id) {
    let commentDiv = document.getElementById(`comments_${id}`);
    commentDiv.classList.remove("hide");
}

function hideComments(id) {
    let commentDiv = document.getElementById(`comments_${id}`);
    commentDiv.classList.add("hide");
}