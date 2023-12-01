{
 const sI = setInterval(() => {
  if( h1.dataset.id ){
   clearInterval(sI)

   fetch(`${API}important_to_know/`, {
    method: 'post',
    body: JSON.stringify({
     'operatingCompanyId': h1.dataset.id
    }),
   })
   .then(response => response.json())
   .then((important_to_know__response) => { //console.log('important_to_know__response', important_to_know__response)

    sectionContent.classList.add('faq')
    sectionContent.innerHTML = ''

    important_to_know__response.forEach((v) => {
     const wrapper = document.createElement('div')
     wrapper.classList.add('items')
     v.id && (wrapper.dataset.id = v.id)
     //
     const date = document.createElement('time')
     date.textContent = v.date
     wrapper.append(date)
     //
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
   })
   .catch((error) => console.log('error', error))
  }
 }, 400)
}
