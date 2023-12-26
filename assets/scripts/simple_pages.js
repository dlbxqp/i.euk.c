{
 const sI = setInterval(() => {
  if( h1.dataset.id ){
   clearInterval(sI)

   fetch(`${API}simple_pages/?operatingCompanyId=${h1.dataset.id}&code=${currentSection}&fields[]=header&fields[]=text`, {
    method: 'get'
   })
   .then(response => response.json() )
   .then((simple_page__response) => { //console.log('simple_page__response', simple_page__response)
    if(simple_page__response.length === 0){
     document.querySelector('#section_content').innerHTML = 'Необходимо создать простую страницу&nbsp;main'

     return false
    }

    //< simple_page
    if(currentSection !== 'main'){
     const h2 = document.createElement('h2')
     h2.textContent = simple_page__response[0].header
     sectionContent.append(h2)
    }

    const div = document.createElement('div')
    div.innerHTML = simple_page__response[0].text
    sectionContent.append(div)

    wrapElements(sectionContent)
    //> simple_page

   })
   .catch((error) => {
    console.log('error', error)
   })
  }
 }, 400)
}