$(function(){
    checkform()
})

function checkform(){

    $("#loginform").on("submit",function(){
        const user_id = $("input[name=user_id]").val().length
        const user_pw = $("input[name=user_pw]").val().length

        if(user_id == 0 || user_pw ==0){
            alert('Please enter your all login infomation')
            return false
        }     
    })
}

