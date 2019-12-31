var quizListContainer;
var quizQuestionListContainer;
var headingTitle;
var questionItemTemplate;

function getQuestionListFromApiWithId(quiz_id){
    var req_url = "http://localhost:8081/api/quiz_question?qid="+quiz_id;

    return fetch(req_url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        return data;
    })
    .catch(err=>console.error(err));
}

function getQuizListFromApi(){

    return fetch("http://localhost:8081/api/quiz")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        return data;
    })
    .catch((err)=>console.log(err))
}

function switchUI(type,data){
    if(type === "questions"){
        //remove quiz_container ul
        quizListContainer.innerHTML="";
        headingTitle.innerText = "Please attempt the following questions: ";
        renderQuestionList(data)
    }
    else if(type === "quiz"){
        quizQuestionListContainer.innerHTML = "";
        headingTitle.innerText = "Select a Quiz"
        renderQuiz(data)
    }
}

function renderQuiz(data){
    //
    console.log("mydata",data)
    const list_parent = document.createElement('ul');
    list_parent.setAttribute('id',"quizes")
    list_parent.setAttribute('class',"list-group");

    var list_items = []
    for( var i = 0;i<data.length;i++){
        var list_item = document.createElement('li');
        list_item.setAttribute('class','list-group-item')
        list_item.setAttribute('id',data[i]._id)
        list_item.setAttribute('data-name',data[i].name)
        list_item.innerText = data[i].name;
        list_item.addEventListener('click',(e)=>{
            var quiz_id = e.target.getAttribute('id');
            console.log(quiz_id+ " was requested")
            getQuestionListFromApiWithId(quiz_id)
            .then((questions)=> switchUI("questions",questions))
        })
        list_parent.appendChild(list_item)
    }
    quizListContainer.appendChild(list_parent);
}

function renderQuestionList(questions_list){
    //{name":"where is the capital of india","option":"delhi,punjab,goa,godda","correct_option":
    var list_parent = document.createElement('ul');
    list_parent.setAttribute('id','question_list')
    list_parent.setAttribute('class','list-group')


    for(var i=0;i<questions_list.length;i++){
        var list_item = questionItemTemplate.cloneNode(true)
        var childrenOfListItem = list_item.children;
        //console.log(childrenOfListItem)
        //change card-header
        childrenOfListItem[0].innerText = "Question "+(i+1);
        var childrenOfCardBody = childrenOfListItem[1].children;
        //change card question
        childrenOfCardBody[0].innerText = questions_list[i].name;
        /*document.getElementById('question_list').appendChild(list_item2);

        var childrenOfForm = childrenOfCardBody[1].children;
        for(var i=0;i<childrenOfForm.length;i++){
            var childrenOfOptions = childrenOfForm[i].children;

        }*/
        list_parent.appendChild(list_item);
    }
    quizQuestionListContainer.appendChild(list_parent)
}

function renderOption(option){
    
}


window.onload = function(){

    //set references to elements in dom
    headingTitle = document.getElementById('heading');
    quizListContainer = document.getElementById('quiz_container')
    quizQuestionListContainer = document.getElementById('question_container')
    // questionItemTemplate = document.getElementsByClassName('question-template')[0];
    // questionItemTemplate = questionItemTemplate.parentElement.removeChild(questionItemTemplate);

    getQuizListFromApi()
    .then((quiz_list)=>{
        switchUI("quiz",quiz_list);
    })

    //testing
    //rendertempQuestions()

}

function rendertempQuestions(){

    var list_item = document.getElementsByClassName('question-template')[0];
    var list_item2 = list_item.cloneNode(true);

    var childrenOfListItem = list_item2.children;
    console.log(childrenOfListItem)
    //change card-header
    childrenOfListItem[0].innerText = "Question 2";
    var childrenOfCardBody = childrenOfListItem[1].children;
    //change card question
    childrenOfCardBody[0].innerText = "Question text 2";
    document.getElementById('question_list').appendChild(list_item2);
    
    var childrenOfForm = childrenOfCardBody[1].children;
    for(var i=0;i<childrenOfForm.length;i++){
        var childrenOfOptions = childrenOfForm[i].children;

    }
}