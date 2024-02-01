import './questions.css'


export function Questions() {



    const handleQuestionClick = (e) => {
        const questionList = document.querySelectorAll('.sign')
        const underText = document.querySelectorAll('.under-text')
        e.preventDefault();
        console.log(e.target.innerText)

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
                    console.log(p.classList)
                })
                console.log(e.target.parentElement.nextElementSibling.clasList)
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
                <a href="#" onClick={handleQuestionClick} >What do I get exactly<span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>1/ The NextJS starter with all the boilerplate code you need to run an online business: a payment system, a database, login, a blog, UI components, and much more.
The repo is available in:
- Javascript and Typescript
- /app router and /pages router.

2/ The documentation helps you set up your app from scratch, write copy that sells, and ship fast.

3/ Access to our Discord with makers who build fast to stay accountable!</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 2 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 3 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 4 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 5 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
                <a href="#" onClick={handleQuestionClick} >Question 6 <span className='sign'>+</span></a>
                <p onClick={closingQuestion} className='under-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa totam odio obcaecati dolor molestiae amet voluptas fuga enim sit. Alias laudantium obcaecati rem quas! Voluptate mollitia repellat harum voluptas expedita.</p>
            </li>
            <li>
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
            </li>
        </ul>

    </div>

)
}