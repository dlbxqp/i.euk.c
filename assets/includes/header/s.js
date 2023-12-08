//< router
window.UPLOAD = 'https://euk.ingrad.ru'
window.API = 'https://euk.ingrad.ru/api/'
window.URL = new URL(document.location.href)

const a_wlpN = window.location.pathname.split('/')
window.currentSection = a_wlpN[1] ? a_wlpN[1] : 'main'
window.currentSubSection = a_wlpN[2] ? a_wlpN[2] : ''
window.currentSubSubSection = a_wlpN[3] ? a_wlpN[3] : ''
window.currentSubSubSubSection = a_wlpN[4] ? a_wlpN[4] : ''
//> router


const operatingCompaniesMenu = document.querySelector('#header_operatingCompaniesMenu')
const housingComplexesMenus = document.querySelector('#header_housingComplexesMenus')
const h1 = document.querySelector('h1')

fetch(`${API}hat/?code=` + window.location.hostname, {
 method: 'get'
})
.then((response) => {
 if(!response.ok){ //console.log('status', response.status)
  window.location.href = '/temp.html'

  return false
 } else{
  return response.json()
 }
})
.then((operating_company__response) => { //console.log('hat', operating_company__response)
 const operatingCompanyId = Object.keys(operating_company__response)[0]
 const operatingCompany = operating_company__response[ operatingCompanyId ]

 window.CONSENT = operatingCompany.consent

 //< logotype
 if(operatingCompany.logotype !== null){
  const img = document.createElement('img')
  img.alt = 'logo'
  img.src = operatingCompany.logotype

  document.querySelector('#header_hat_header').before(img)
 }
 //> logotype

 //< headers
 h1.textContent = operatingCompany.title
 h1.dataset.id = operatingCompanyId
 setPageTitle(`ЭУК «${h1.textContent}»`)

 document.querySelector('#header_hat_header').prepend( operatingCompany.type )
 //> headers

 //< operating company menu
 for(let k in operatingCompany.menu){
  const isActive = (
   (operatingCompany.menu[k].code === currentSection)
   || (operatingCompany.menu[k].urn === currentSection)
  )
  createMenuItem(operatingCompaniesMenu, [operatingCompany.menu[k].title, (operatingCompany.menu[k].urn ? operatingCompany.menu[k].urn : operatingCompany.menu[k].code)], k, isActive)
 }
 //> operating company menu

 //< housing complexes menus
 const oImages = {}
 for(k in operatingCompany['housing complexes']){
  const housingComplex = operatingCompany['housing complexes'][k]

  const li = document.createElement('li')
  li.dataset.housingComplexCode = housingComplex.code
  const h3 = document.createElement('h3')
  h3.textContent = `ЖК «${housingComplex.title}»`

  const housingComplexMenu = document.createElement('menu')
  for(kk in housingComplex.menu){
   const isActive = (housingComplex.code === currentSection && housingComplex.menu[kk].code === currentSubSection)
   isActive && setPageTitle(h3.textContent)
   createMenuItem(housingComplexMenu, [housingComplex.menu[kk].title, `${housingComplex.code}/${housingComplex.menu[kk].code}`], kk, isActive)
  }

  li.appendChild(h3)
  li.appendChild(housingComplexMenu)
  housingComplexesMenus.appendChild(li)

  //< slider
  oImages[k] = housingComplex.images
  //> slider...
 }
 createHeaderSlider(oImages)
 //> housing complexes menus

 //< submenus
 if(currentSection === 'docs' && !currentSubSection){

  // в docs.js

 } else{

  for(let k in operatingCompany['housing complexes']){
   if(operatingCompany['housing complexes'][k].code !== currentSection) continue

   for(let kk in operatingCompany['housing complexes'][k].menu){
    if(operatingCompany['housing complexes'][k].menu[kk].code !== currentSubSection) continue

    if(currentSubSection === 'tariffs'){ //console.log('currentSubSection', currentSubSection)
     const section = document.createElement('section')
     let halfyearsPseudoSelect, housesPseudoSelect
     if(!section.id){
      section.id = 'submenu'
      const div = document.createElement('div')

      //< houses  pseudoselect
      div.appendChild(createPseudoSelect('houses'))
      section.appendChild(div)
      document.querySelector('#section_content').after(section)
      housesPseudoSelect = document.querySelector('#submenu .houses_pseudoselect')
      //< houses  pseudoselect...

      //< halfyears pseudoselect
      div.appendChild(createPseudoSelect('halfyears'))
      section.appendChild(div)
      document.querySelector('#section_content').after(section)
      halfyearsPseudoSelect = document.querySelector('#submenu .halfyears_pseudoselect')
      //> halfyears pseudoselect...
     }

     for(let kkk in operatingCompany['housing complexes'][k].menu[kk].menu){
      !currentSubSubSection && (currentSubSubSection = kkk)

      if(kkk*1 === currentSubSubSection*1){
       housesPseudoSelect.querySelector('.pseudoselect__input').innerText = operatingCompany['housing complexes'][k].menu[kk].menu[kkk].title

       //< halfyears pseudoselect
       operatingCompany['housing complexes'][k].menu[kk].menu[kkk].menu.forEach((halfyear) => {
        !currentSubSubSubSection && (currentSubSubSubSection = halfyear)

        const pseudoselectTitle = halfyear.replace(/\d/g, '').toUpperCase() + ' полугодие ' + halfyear.replace(/\D/g, '')

        if(halfyear === currentSubSubSubSection){
         (halfyearsPseudoSelect.querySelector('.pseudoselect__input').innerText === '') && (halfyearsPseudoSelect.querySelector('.pseudoselect__input').innerText = pseudoselectTitle)
        } else if(!halfyearsPseudoSelect.querySelector(`.pseudoselect__list > div > div > div[data-id="${halfyear}"]`)){
         const option = document.createElement('div')
         option.innerText = pseudoselectTitle
         option.dataset.id = halfyear
         option.addEventListener('click', (e) => {
          e.target.closest('.pseudoselect').querySelector('.pseudoselect__input').innerText = e.target.innerText
          setTimeout(() => {
           document.location.pathname = `${currentSection}/${currentSubSection}/${currentSubSubSection}/${e.target.dataset.id}`
          }, 400)
         })
         halfyearsPseudoSelect.querySelector('.pseudoselect__list > div > div').appendChild(option)
        }
       })
       //> halfyears pseudoselect
      } else{
       const option = document.createElement('div')
       option.innerText = operatingCompany['housing complexes'][k]['menu'][kk]['menu'][kkk].title
       option.dataset.id = kkk
       option.addEventListener('click', (e) => {
        e.target.closest('.pseudoselect').querySelector('.pseudoselect__input').innerText = e.target.innerText
        setTimeout(() => {
         document.location.pathname = `${currentSection}/${currentSubSection}/${e.target.dataset.id}`
        }, 800)
       })
       housesPseudoSelect.querySelector('.pseudoselect__list > div > div').appendChild(option)
      }
     }

     {
      const sI = setInterval(() => {
       const housesPseudoSelect = document.querySelector('#submenu .houses_pseudoselect')
       if(housesPseudoSelect && housesPseudoSelect.querySelector('.pseudoselect__list')){
        clearInterval(sI)

        if(housesPseudoSelect.querySelectorAll('#submenu .houses_pseudoselect .pseudoselect__list div[data-id]').length === 0){
         housesPseudoSelect.querySelector('.pseudoselect__list').remove()
        } else{
         sT = null
         housesPseudoSelect.querySelector('.pseudoselect__list').addEventListener('mouseenter', () => {
          clearTimeout(sT)
         })
         housesPseudoSelect.querySelector('.pseudoselect__list > div').addEventListener('mouseleave', () => {
          sT = setTimeout(
          housesPseudoSelect.querySelector('.pseudoselect__list > div').classList.remove('active'),
          200
          )
         })
         housesPseudoSelect.querySelector('.pseudoselect__input').addEventListener('mouseenter', () => {
          housesPseudoSelect.querySelector('.pseudoselect__list > div').classList.add('active')
         })
        }
       }
      }, 400)
     }

     {
      const sI = setInterval(() => {
       const halfyearsPseudoSelect = document.querySelector('#submenu .halfyears_pseudoselect')
       if(halfyearsPseudoSelect && halfyearsPseudoSelect.querySelector('.pseudoselect__list')){
        clearInterval(sI)

        if(halfyearsPseudoSelect.querySelectorAll('#submenu .halfyears_pseudoselect .pseudoselect__list div[data-id]').length === 0){
         halfyearsPseudoSelect.querySelector('.pseudoselect__list').remove()
        } else{
         sT = null
         halfyearsPseudoSelect.querySelector('.pseudoselect__list').addEventListener('mouseenter', () => {
          clearTimeout(sT)
         })
         halfyearsPseudoSelect.querySelector('.pseudoselect__list > div').addEventListener('mouseleave', () => {
          sT = setTimeout(
          halfyearsPseudoSelect.querySelector('.pseudoselect__list > div').classList.remove('active'),
          200
          )
         })
         halfyearsPseudoSelect.querySelector('.pseudoselect__input').addEventListener('mouseenter', () => {
          halfyearsPseudoSelect.querySelector('.pseudoselect__list > div').classList.add('active')
         })
        }
       }
      }, 400)
     }
     //> halfyears pseudoselect

    } else if(currentSubSection === 'rso'){

     const section = document.createElement('section')
     section.id = 'submenu'
     const div = document.createElement('div')

     //< houses  pseudoselect
     div.appendChild(createPseudoSelect('houses'))
     section.appendChild(div)
     document.querySelector('#section_content').before(section)

     const housesPseudoSelect = document.querySelector('#submenu .houses_pseudoselect')
     for(let kkk in operatingCompany['housing complexes'][k].menu[kk].menu){
      !currentSubSubSection && (currentSubSubSection = kkk)

      if(kkk*1 === currentSubSubSection*1){
       housesPseudoSelect.querySelector('.pseudoselect__input').innerText = operatingCompany['housing complexes'][k].menu[kk].menu[kkk].title
      } else{
       const option = document.createElement('div')
       option.innerText = operatingCompany['housing complexes'][k]['menu'][kk]['menu'][kkk].title
       option.dataset.id = kkk
       option.addEventListener('click', (e) => {
        e.target.closest('.pseudoselect').querySelector('.pseudoselect__input').innerText = e.target.innerText
        setTimeout(() => {
         document.location.pathname = `${currentSection}/${currentSubSection}/${e.target.dataset.id}`
        }, 800)
       })
       housesPseudoSelect.querySelector('.pseudoselect__list > div > div').appendChild(option)
      }
     }

     {
      const sI = setInterval(() => {
       const housesPseudoSelect = document.querySelector('#submenu .houses_pseudoselect')
       if(housesPseudoSelect && housesPseudoSelect.querySelector('.pseudoselect__list')){
        clearInterval(sI)

        if(housesPseudoSelect.querySelectorAll('#submenu .houses_pseudoselect .pseudoselect__list div[data-id]').length === 0){
         housesPseudoSelect.querySelector('.pseudoselect__list').remove()
        } else{
         sT = null
         housesPseudoSelect.querySelector('.pseudoselect__list').addEventListener('mouseenter', () => {
          clearTimeout(sT)
         })
         housesPseudoSelect.querySelector('.pseudoselect__list > div').addEventListener('mouseleave', () => {
          sT = setTimeout(
          housesPseudoSelect.querySelector('.pseudoselect__list > div').classList.remove('active'),
          200
          )
         })
         housesPseudoSelect.querySelector('.pseudoselect__input').addEventListener('mouseenter', () => {
          housesPseudoSelect.querySelector('.pseudoselect__list > div').classList.add('active')
         })
        }
       }
      }, 400)
     }
     //> houses pseudoselect

    }
   }
  }
 }
})
.then(createFooter)
.catch((error) => { console.log('error', error) })


function createMenuItem(menu, aItem, key, isActive = false){
 const li = document.createElement('li')
 li.style.order = key

 const link = document.createElement('a')
 link.textContent = aItem[0]
 link.href = `/${aItem[1]}`

 if(isActive){
  link.classList.add('active')

  setPageTitle(link.textContent)
 }

 li.appendChild(link)
 menu.append(li)
}

function createPseudoSelect(title = ''){ //console.log('title', title)
 const select = document.createElement('div')
 select.classList.add('pseudoselect')
 select.classList.add(`${title}_pseudoselect`)
 const input = document.createElement('div')
 input.classList.add('pseudoselect__input')
 const listWrapperWrapper = document.createElement('div')
 listWrapperWrapper.classList.add('pseudoselect__list')
 const listWrapper = document.createElement('div')
 const list = document.createElement('div')
 //
 select.appendChild(input)
 listWrapper.appendChild(list)
 listWrapperWrapper.appendChild(listWrapper)
 select.appendChild(listWrapperWrapper)

 return select
}

function setPageTitle(header){
 if(document.title !== ''){
  document.title += ` / ${header}`
 } else{
  document.title = header
 }
}

function createFooter(){
 const div = document.createElement('div')
 div.innerHTML += document.querySelector('#header_operatingCompaniesMenu').outerHTML.replace('header_', 'footer_')
 document.querySelector('footer > section').append(div)

 const cSubMenus = document.querySelectorAll('#header_housingComplexesMenus > li')
 Array.from(cSubMenus).forEach((li) => {
  const div = document.createElement('div')
  div.innerHTML = li.innerHTML
  document.querySelector('footer > section').append(div)
 })
}
