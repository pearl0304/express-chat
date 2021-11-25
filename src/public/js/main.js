$(function(){
    validation()
    checkLoginForm()
})

function validation(){
    const pattern_spc = /[~!@#$%^&*()+|<>?:{}]/; 
    const pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    $("input[name=user_id]").keyup(()=>{
        const user_id = $("input[name=user_id]").val()
        if(pattern_spc.test(user_id)){
            alert('Special characters cannot be used')
            $("input[name=user_id]").val('')    
            return false
        }
        if(pattern_kor.test(user_id)){
            alert('Please enter your ID in English')
            $("input[name=user_id]").val('')
            return false}
    })
}

function checkLoginForm(){
    $("#loginform").on("submit",function(){
        const user_id = $("input[name=user_id]").val().length
        const user_pw = $("input[name=user_pw]").val().length

        if(user_id == 0){
            alert('Please enter your ID ')
            return false
        }   
        
        if(user_pw == 0){
            alert('Please enter your Passwor')
            return false
        }
    })
}





