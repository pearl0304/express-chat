$(function(){
    deleteSeletedImages()

})

function deleteSeletedImages(){
    $(".delete-btn").on("click",function(){
        const seletedImage = $(this).attr("img-name")
        const index = $(this).parent().attr("index")
        const user_id = $(this).parent().attr("user_id")

        $.ajax({
            url:'/feed/imgedel',
            type : 'post', 
            data : {
                delIndex : index, 
                delUser_id:user_id, 
                delImageName : seletedImage
            },
            success : function(data){
                console.log(data)
            }
            
        })
    })    
}
