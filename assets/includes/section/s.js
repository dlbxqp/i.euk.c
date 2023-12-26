window.sectionContent = document.querySelector('#section_content')

{
 const sT = setTimeout(() => {
  (!currentSection) && sT();

  if(currentSection === 'answers'){

   const sI = setInterval(() => {
    if(h1.dataset.id !== undefined){
     clearInterval(sI)

     import('/assets/scripts/answers.js')
    }
   }, 400)

  } else if(currentSection === 'faq'){

   const sI = setInterval(() => {
    if(h1.dataset.id !== undefined){
     clearInterval(sI)

     import('/assets/scripts/faq.js')
    }
   }, 400)

  } else if(currentSection === 'docs'){

   const sI = setInterval(() => {
    if(h1.dataset.id !== undefined){
     clearInterval(sI)

     import('/assets/scripts/docs.js')
    }
   }, 400)

  } else if(currentSection === 'news'){

   const sI = setInterval(() => {
    if(h1.dataset.id !== undefined){
     clearInterval(sI)

     import('/assets/scripts/news.js')
    }
   }, 400)

  } else{

   fetch(`${API}housing_complexes/?code=${currentSection}&fields[]=id&fields[]=title&fields[]=text`, {
    method: 'get'
   })
   .then(response => response.json())
   .then((housing_complex__response) => { //console.log('housing_complex__response', housing_complex__response.data)
    sectionContent.classList.add(currentSection)
    sectionContent.innerHTML = ''

    if(housing_complex__response.length > 0){
     //< ЖК
     sectionContent.dataset.housingComplexId = housing_complex__response[0].id

     const h2 = document.createElement('h2')
     h2.textContent = 'ЖК «' + housing_complex__response[0].title + '»'
     sectionContent.append(h2)

     const div = document.createElement('div')
     div.innerHTML = housing_complex__response[0].text
     sectionContent.append(div)
     //> ЖК
    } else{

     import('/assets/scripts/simple_pages.js')

    }

   })
   .catch((error) => {
    console.log('error', error)
   })
  }
 }, 400)
}