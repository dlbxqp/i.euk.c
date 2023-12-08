window.subsectionContent = document.querySelector('#subsection_content')

{
 const sI = setInterval(() => { //console.log('currentSection: ', currentSection)
  if(!sectionContent.dataset.housingComplexId) return false
  clearInterval(sI)
  //console.log('housingComplexId', sectionContent.dataset.housingComplexId)


  if(currentSubSection === 'tariffs'){

   const sI = setInterval(() => {
    if(currentSubSubSection){
     clearInterval(sI)

     fetch(`${API}tariffs/?houseId=${currentSubSubSection}&semester=${currentSubSubSubSection}&fields[]=id&fields[]=title&fields[]=description`, {
      method: 'get'
     })
     .then(response => response.json())
     .then((tariffs__response) => { //console.log('tariffs', tariffs__response)
      if(tariffs__response.length > 0){
       subsectionContent.innerHTML = ''

       //<  halfyears
       Array.from(tariffs__response).forEach((tariff) => { //console.log('tariff', tariff)
        const {id, title, description} = tariff

        //< section
        const fragment = document.createDocumentFragment()
        const dp = new DOMParser().parseFromString(description, 'text/html').body
        dp.querySelectorAll('table').forEach((table) => { //console.log('table', table)
         if( !table.querySelector('caption') ){
          const caption = document.createElement('caption')
          caption.innerText = title
          caption.dataset.id = id
          table.prepend(caption)
         }

         fragment.append(table)
        })

        subsectionContent.append(fragment)

        wrapElements(subsectionContent)
        //> section
       }) //> halfyears

      } else{

       //document.location.href = '/'

      }

     })
     .catch((error) => {
      console.log('error', error)
     })
    }
   }, 400)

  } else if( currentSubSection === 'rso' ){

   const sI = setInterval(() => {
    if(currentSubSubSection){
     clearInterval(sI)

     fetch(`${API}rso/?houseId=${currentSubSubSection}&fields[]=title&fields[]=description`, {
      method: 'get'
     })
     .then(response => response.json())
     .then((rso__response) => { //console.log('rso__response', rso__response)
      if(rso__response.length === 0) return false

      subsectionContent.classList.add(currentSubSection)
      subsectionContent.innerHTML = ''

      Array.from(rso__response).forEach((rso) => {
       const div = document.createElement('div')
       div.innerHTML = rso.description

       subsectionContent.append(div)
      })

      wrapElements(subsectionContent)
     })
     .catch((error) => {
      console.log('error', error)
     })

    }
   })

  } else { //< simple page

   fetch(`${API}simple_pages/`, {
    method: 'post',
    body: JSON.stringify({
     'housingComplexId': sectionContent.dataset.housingComplexId,
     'code': currentSubSection,
     'fields': ['header', 'text']
    }),
   })
   .then(response => response.json())
   .then((simple_page__response) => { //console.log('simple_page__response', simple_page__response)
    if(simple_page__response.length === 0) return false

    subsectionContent.classList.add(currentSubSection)
    subsectionContent.innerHTML = ''

    /*
      const h3 = document.createElement('h3')
      h3.textContent = simple_page__response[0].header
      subsectionContent.appendChild(h3)
    */
    {
     const sI = setInterval(() => {
      if(housingComplexesMenu.dataset.currentHousingComplexTitle){
       const section = document.createElement('section')
       section.id = 'header_breadcrumbs'
       const div = document.createElement('div')
       const h2 = document.createElement('h2')
       h2.textContent = housingComplexesMenu.dataset.currentHousingComplexTitle + ` // ${simple_page__response[0].header}`

       div.appendChild(h2)
       section.appendChild(div)
       document.querySelector('#subsection_content').before(section)

       clearInterval(sI)
      }
     }, 400)
    }

    const div = document.createElement('div')
    div.innerHTML = simple_page__response[0].text
    subsectionContent.appendChild(div)

    wrapElements(subsectionContent)
   })
   .catch((error) => {
    console.log('error', error)
   })
  }

 }, 400)
}