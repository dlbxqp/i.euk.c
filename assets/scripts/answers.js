{
 const sI = setInterval(() => {
  if( h1.dataset.id ){
   clearInterval(sI)

   fetch(`${API}answers/`, {
    method: 'post',
    body: JSON.stringify({
     'operatingCompanyId': h1.dataset.id
    }),
   })
   .then(response => response.json())
   .then((answers__response) => { //console.log('answers__response', answers__response)

    sectionContent.classList.add('answers')
    sectionContent.innerHTML = ''

    answers__response.forEach((v) => {
     const wrapper = document.createElement('div')
     wrapper.classList.add('items')
     v.id && (wrapper.dataset.id = v.id)
     //
     const question = document.createElement('h3')
     question.textContent = v.question
     wrapper.append(question)
     //
     const answer = document.createElement('div')
     answer.innerHTML = v.answer
     wrapper.append(answer)

     sectionContent.append(wrapper)

    })
   })
   .catch((error) => {
    console.log('error', error)
   })
  }
 }, 400)
}