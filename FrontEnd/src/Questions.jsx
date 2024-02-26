import './questions.css'


export function Questions() {



    const handleQuestionClick = (e) => {
        const questionList = document.querySelectorAll('.sign')
        const underText = document.querySelectorAll('.under-text')
        e.preventDefault();


        if(e.target.innerText === '+' || e.target.innerText === '-'){
            if(e.target.innerText === '+'){ 
                underText.forEach((p) => {
                    p.classList = 'under-text';
                })
                questionList.forEach((li) => {
                    li.innerText = '+';
                })
                e.target.parentElement.nextElementSibling.classList = 'under-text clicked';
                underText.forEach((p) => {
   
                })

            e.target.innerText = '-';
        }else {
            e.target.innerText = '+';
            underText.forEach((p) => {
                p.classList = 'under-text';
            })
        }

        }  else{
            if(e.target.children[0].innerText === '+'){
                questionList.forEach((li) => {
                    li.innerText = '+';
                })


                e.target.children[0].innerText = '-'; 
                
                underText.forEach((p) => {
                    p.classList = 'under-text';
                })
               e.target.nextElementSibling.classList = 'under-text clicked'


        } else{
            e.target.children[0].innerText = '+'; 
            
                            
            underText.forEach((p) => {
                p.classList = 'under-text';
            })
        }

    } 
    }

    const closingQuestion =(e) => {
        const questionList = document.querySelectorAll('.sign')

        if(e.target.classList.value === 'under-text clicked'){
            e.target.classList = 'under-text';
            questionList.forEach((li) => {
                li.innerText = '+';
            })
        }

    }

return(
    <div className="questions">
        <div className='question-header'>
            <h1>Frequently Asked Questions</h1>
            <p>Have another question? Contact me on <a onClick={(e) => e.preventDefault()} href="#">Twitter</a> or by <a onClick={(e) => e.preventDefault()} href="#">email</a>.</p>
        </div>
        
        <ul className='question-list'>
            <li>
                <a href="#" onClick={handleQuestionClick} >What exactly Ploady does?<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Ploady is a tool that scans content of your video and than generates best title, description and thumbnail for that video.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >What languages are supported?<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Only supported output language is english. If video you imported is in any other language you will get right output but it will be translated to engilsh. </p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >What is the maximum lenght of imported video?<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Imported videos should not be longer than 25 minutes.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Is Auto-upload aveilable?<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>It's still in development.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >How long does it take to generate response?<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>From 10 to 60 secounds.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Is there a supscription plan.<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>No.</p>
            </li>
            {/* <li>
                <a href="#" onClick={handleQuestionClick} >Question 7 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 8 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 9 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 10 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li> */}
        </ul>

    </div>

)
}