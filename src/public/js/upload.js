$(function(){
    deleteSeletedImages()

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
