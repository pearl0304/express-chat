$(function(){checkSignForm()})

function checkSignForm(){
    $("#signUpform").on("submit",function(){

        const user_id = $("input[name=user_id]").val()
        const user_nick = $("input[name=user_nick]").val()
        const user_pw = $("input[name=user_pw]").val()

        if(user_id == ''){
            alert('Please enter ID you want to use')
            return false
        } 
        if(user_nick == ''){
            alert('Please enter Nickname you want to use')
            return false
        } 

        if(user_pw == ''){
            alert('Please enter Password you want to use')
            return false
        } 
    })
}
    
function vaildation(){
        const pattern_num = /[0-9]/;
        const pattern_eng = /[a-zA-Z]/;	
        const pattern_spc = /[~!@#$%^&*()+|<>?:{}]/; 
        const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
}

