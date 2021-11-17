$(function(){
    deleteSeletedImages()
    uploadArticles()

})

function deleteSeletedImages(){
    $(".delete-btn").on("click",function(){
        const seletedImage = $(this).attr("img-name")
        const index = $(this).parent().attr("index")
        const user_id = $(this).parent().attr("user_id")
        //console.log(seletedImage,index,user_id)

        $.ajax({
            url:'/feed/imgedel',
            type : 'post', 
            data : {
                index : index, 
                user_id:user_id, 
                seletedImage : seletedImage
            },
            success : function(data){
                $(".img-box[img-name="+seletedImage+"]").remove();
            }
            
        })
    })    
}

function uploadArticles(){
    $(".upload-next").on("click",function(){
        const index = $(".img-box").attr("index")
        const text = $("textarea[name=text]").val()
        const user_id = $(".img-box").attr("user_id")
       
        $.ajax({
            url:'/feed/article',
            type : 'post', 
            data: {imageIndex : index, text : text},
            success : function(data){
                location.href='/user/feed:user_id'
            }
        })

    })
}
