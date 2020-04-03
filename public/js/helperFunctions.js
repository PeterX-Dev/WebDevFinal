function toggleShow(id) {
    let commentDiv = document.getElementById(`comments_${id}`);
    commentDiv.classList.remove("hide");
}

function hideComments(id) {
    let commentDiv = document.getElementById(`comments_${id}`);
    commentDiv.classList.add("hide");
}