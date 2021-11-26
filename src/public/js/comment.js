$(function(){
    commentEnter ()  
})

$(document).on("click","button[name=comment_btn]",function () {insertComment();})
function insertComment(){
    const comment = $(".comt-tf").val()
    const index = $(".comt-tf").attr("index")

    if(comment.length == 0){
        alert('Please write comment')
        return false
    }

    $.ajax({
        url:'/feed/comment',
        type : 'post',
            data : {index : index, comment:comment},
            success : function(data){
                let imgLink =''
                if(data['profile']==''){
                    imgLink =`<img src="/public/images/imagesK/profile.svg" alt="프로필이미지">`
                }else{
                    imgLink = `<img src="/uploads/profile/${data['profile']}" alt="프로필이미지">`
                }
            $(".comment").prepend(`
                <div class="user-img comment-user">
                     ${imgLink}
                    <span class="name">${data['user_nick']}</span>
                    <span class="txt">${comment}</span>
                    <span class="time">now</span>
                    <p class="reply"><a href="#">답글달기</a></p>
                </div>
            `)
            $(".comt-tf").val('')     
            $(".comt-count").html('')
            $(".comt-count").append(`${data['count']}`)
            }
    })
}

function commentEnter (){
    $("input[name=comment]").keydown(function (key) {
        if(key.keyCode == 13 ) {
            insertComment()
        }
    })
}