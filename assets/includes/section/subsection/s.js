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

   const sI = setInterval(() => { console.log('currentSubSubSection', currentSubSubSection)
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
   }, 400)

  } else if( currentSubSection === 'contacts' ){

     fetch(`${API}contacts/?housingComplexCode=${currentSection}`, {
      method: 'get'
     })
     .then(response => response.json())
     .then((contacts__response) => { //console.log('contacts__response', contacts__response)

      if(!contacts__response.success || contacts__response.data[currentSection].sections.length < 1) return false

      //subsectionContent.classList.add(currentSubSection)
      subsectionContent.innerHTML = ''

      Array.from(contacts__response.data[currentSection].sections).forEach((v) => {
       const section = document.createElement('div')
       section.classList.add('contacts__section')
       section.style.order = v.order

       const sectionTitle = document.createElement('h3')
       sectionTitle.textContent = v.title
       section.append(sectionTitle)

       const sectionItems = document.createElement('div')
       sectionItems.classList.add('contacts__section-items')
       v.items.forEach((vv) => {
        const item = document.createElement('div')
        item.classList.add('contacts__item')
        item.style.order = vv.order

        const item_left = document.createElement('div')
        item_left.classList.add('contacts__item-left')
        item_left.innerHTML = `<i class="icon-${vv.type}"></i>`

        const item_right = document.createElement('div')
        item_right.classList.add('contacts__item-right')

        if(vv.title !== null){
         const itemTitle = document.createElement('h4')
         itemTitle.textContent = vv.title
         item_right.append(itemTitle)
        }

        const itemContent = document.createElement('div')
        itemContent.classList.add('contacts__item-content')
        if(vv.type === 'location'){
         const link = document.createElement('a')
         link.href = `//yandex.ru/maps/?pt=${vv.value}&z=16&l=map`
         link.target = '_blank'
         link.innerHTML = vv.subtitle
         itemContent.append(link)
        } else if(vv.type === 'web'){
         const p = document.createElement('p')
         const link = document.createElement('a')
         link.href = vv.value.replace(/https?:\/\//i, '//')
         link.target = '_blank'
         link.innerHTML = vv.value.replace(/https?:\/\//i, '')
         p.append(link)
         itemContent.append(p)
        } else if(vv.type === 'phone'){
         const p = document.createElement('p')
         const link = document.createElement('a')
         link.href = `tel:${vv.phone_value}`
         link.innerHTML = vv.value
         p.append(link)
         if(vv.subtitle !== null){
          const i = document.createElement('i')
          i.innerHTML = vv.subtitle
          p.append(i)
         }
         itemContent.append(p)
        } else if(vv.type === 'email'){
         const p = document.createElement('p')
         const link = document.createElement('a')
         link.href = `mailto:${vv.value}`
         link.innerHTML = vv.value
         p.append(link)
         if(vv.subtitle !== null){
          const i = document.createElement('i')
          i.innerHTML = vv.subtitle
          p.append(i)
         }
         itemContent.append(p)
        } else{
         const a_value = vv.value.split("\r\n")
         a_value.forEach((vvv) => {
          const p = document.createElement('p')
          p.innerHTML = vvv
          itemContent.append(p)
         })
         if(vv.subtitle !== null){
          const p = document.createElement('p')
          p.innerHTML = vv.subtitle
          p.style.fontStyle = 'italic'
          itemContent.append(p)
         }
        }
        item_right.append(itemContent)

        item.append(item_left)
        item.append(item_right)
        sectionItems.append(item)
        section.append(sectionItems)
       })

       subsectionContent.append(section)
      })
/*
      wrapElements(subsectionContent)
*/
     })
     .catch((error) => {
      console.log('error', error)
     })

  } else { //< simple page

   fetch(`${API}simple_pages/?housingComplexId=${sectionContent.dataset.housingComplexId}&code=${currentSubSection}&fields[]=header&fields[]=text`, {
    method: 'get'
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
      if (typeof (housingComplexesMenu) !== 'undefined' && housingComplexesMenu.dataset && housingComplexesMenu.dataset.currentHousingComplexTitle) {
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