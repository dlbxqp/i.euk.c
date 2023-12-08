{
 const sI = setInterval(() => {
  if( h1.dataset.id ){
   clearInterval(sI)

   const date = new Date();
   //
   const a_DLSearch = document.location.search.substr(1).split('&')//; console.log('a_DLSearch', a_DLSearch)
   let oDLSearch = {}
   let year = date.getFullYear()
   a_DLSearch.forEach((v) => {
    const a_v = v.split('=')
    oDLSearch[a_v[0]] = a_v[1];
    (a_v[0] === 'year') && (year = a_v[1])
   }); //console.log('year', year)
   fetch(`${API}information_disclosure/?operatingCompanyId=${h1.dataset.id}&year=${year}`, {
    method: 'get'
   })
   .then(response => response.json())
   .then((docs__response) => { //console.log('docs__response', docs__response)
    const section = document.createElement('section')
    section.id = 'submenu'
    const div = document.createElement('div')

    const linksWrapper = document.createElement('div')
    div.append(linksWrapper)
    for(let k in docs__response.counts){ //console.log(k, year)
     if((k * 1) === (year * 1)){
      const h2 = document.createElement('h2')
      h2.innerHTML = `Раскрытие информации за&nbsp;${k}&nbsp;год`
      div.prepend(h2)
     } else{
      const link = document.createElement('a')
      link.textContent = k

      oDLSearch.year = k
      let search = '?'
      for(let kk in oDLSearch){
       if(!kk) continue
       (search !== '?') && (search += '&')
       search += `${kk}=${oDLSearch[kk]}`
      }
      link.href = document.location.pathname + search

      link.addEventListener('click', (e) => {
       e.preventDefault()

       document.location.search = search
      })

      linksWrapper.prepend(link)
     }
    }
    section.append(div)
    document.querySelector('#section_content').before(section)

    sectionContent.classList.add('docs')
    sectionContent.innerHTML = ''

    //< sort
    const byField = (field) => (a, b) => a[field] > b[field] ? 1 : -1
    docs__response.items.sort(byField('title'))
    //console.log('docs__response.items', docs__response.items)
    //> sort

    if(docs__response.items.length > 0){
     docs__response.items.forEach((v) => { //console.log('v', v)
      const wrapper = document.createElement('div')
      wrapper.classList.add('items')
      v.id && (wrapper.dataset.id = v.id)

      const title = document.createElement('h3')
      title.textContent = v.title
      wrapper.append(title)
      //
      const documents = document.createElement('div')
      v.documents.forEach((vv) => {
       const link = document.createElement('a')
       link.href = UPLOAD + vv.src
       link.download = `${vv['file name']}.${vv['extension']}` //link.target = '_blank'
       link.textContent = vv['file name']
       link.dataset.extension = vv['extension']
       documents.append(link)
      })
      wrapper.append(documents)

      sectionContent.append(wrapper)
     })
    } else{
     const p = document.createElement('p')
     p.innerHTML = `За <strong>${year}</strong> год информация ещё не раскрыта`
     sectionContent.append(p)
    }
   })
   .catch((error) => console.log('error', error))
  }
 }, 400)
}
