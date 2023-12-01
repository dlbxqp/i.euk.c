{
    const sI = setInterval(() => {
        if(h1 && h1.dataset && h1.dataset.id){
            clearInterval(sI)

            let url = `${API}news/?operatingCompanyId=${h1.dataset.id}`;
            (URL.searchParams.has('page')) && (url += '&page=' + URL.searchParams.get('page'))
            fetch(url, {
                method: 'get'
            })
                .then(response => response.json())
                .then((news__response) => { //console.log('news__response', news__response)
                    let {pages, page, items} = news__response

                    sectionContent.classList.add('news')
                    sectionContent.innerHTML = ''

/* Нет смысла поскольку сортирует не все новости, а те что на текущей странице (в многостраничке)
                    //< sort
                    const byField = (field) => (a, b) => {
                        if(field === 'date'){
                            const formatDate = (date) => {
                                if(!date){
                                    return false
                                }

                                const a_date = date.split(' ')
                                const a__date = a_date[0].split('.')

                                return `${a__date[2]}${a__date[1]}${a__date[0]}`
                            }

                            //console.log(formatDate(a[field]), formatDate(b[field]))

                            return (formatDate(a[field]) < formatDate(b[field]) ? 1 : -1)
                        }
                    }
                    items.sort(byField('date'))
                    //> sort
*/

                    items.forEach((v) => { //console.log('v (items)', v)
                        const wrapper = document.createElement('div')
                        wrapper.classList.add('items')
                        v.id && (wrapper.dataset.id = v.id)

                        const date = document.createElement('time')
                        date.textContent = v.date
                        wrapper.append(date)

                        const header = document.createElement('h3')
                        header.textContent = v.header
                        wrapper.append(header)

                        const content_text = document.createElement('div')
                        content_text.classList.add('news__text')
                        content_text.innerHTML = v.text
                        //
                        if(v.images && v.images.length > 0){
                            const content_images = document.createElement('div')
                            content_images.classList.add('news__images')
                            v.images.forEach((vv) => {
                                const image = document.createElement('img')
                                image.alt = 'Иллюстрация к новости'
                                image.src = UPLOAD + vv
                                content_images.append(image)
                            })
                            content_text.append(content_images)
                        }
                        //
                        if(v.documents && v.documents.length > 0){
                            const content_documents = document.createElement('div')
                            content_documents.classList.add('news__documents')
                            v.documents.forEach((vv) => {
                                const link = document.createElement('a')
                                link.href = UPLOAD + vv.src
                                link.download = `${vv['file name']}.${vv['extension']}` //link.target = '_blank'
                                link.textContent = vv['file name']
                                link.dataset.extension = vv['extension']
                                content_documents.append(link)
                            })
                            content_text.append(content_documents)
                        }

                        wrapper.append(content_text)
                        sectionContent.append(wrapper)
                    })

                    wrapElements(sectionContent)

                    //< многостраничка
                    if(pages > 1){
                        const div = document.createElement('div')
                        div.classList.add('multipage')

                        for(let i = 1; i <= pages; i++){
                            const link = document.createElement('a')

                            URL.searchParams.set('page', i)
                            link.href = `${URL}`
                            link.textContent = `${i}`;

                            (page === i) && link.classList.add('active')

                            div.append(link)
                        }

                        sectionContent.before(div)
                        sectionContent.after(div.cloneNode(true))
                    }
                    //> многостраничка
                })
                .then(() => {
                    const cItems = sectionContent.querySelectorAll('.items')
                    Array.from(cItems).forEach((item) => {
                        item.addEventListener('click', () => item.classList.add('active'))
                    })
                })
                .catch((error) => {
                    console.log('error', error)
                })
        }
    }, 400)
}
