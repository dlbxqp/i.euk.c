const mainPage = document.querySelector('#mainPage')


const sI = setInterval(() => {
    if(typeof h1.dataset.id !== 'undefined'){
        clearInterval(sI)

        { //< news
            fetch(`${API}news/?operatingCompanyId=${h1.dataset.id}&count=6`, {
                method: 'get'
            })
                .then(response => response.json())
                .then((response) => { //console.log('news', response.items)
                    if(response.items && response.items.length > 0){
                        //< sort
                        const byField = (field) => (a, b) => {
                            if(field === 'date'){
                                const formatDate = (date) => {
                                    const a_date = date.split(' ')
                                    const a__date = a_date[0].split('.')

                                    return `${a__date[2]}${a__date[1]}${a__date[0]}`
                                }

                                //console.log(formatDate(a[field]), formatDate(b[field]))

                                return (formatDate(a[field]) < formatDate(b[field]) ? 1 : -1)
                            }
                        }
                        response.items.sort(byField('date'))
                        //> sort

                        const wrapper = document.createElement('div')
                        wrapper.classList.add('mainPage__items')
                        //
                        const header = document.createElement('h2')
                        header.textContent = 'Новости'
                        //
                        wrapper.append(header)

                        response.items.forEach((v) => {
                            const item = document.createElement('div')
                            item.classList.add('mainPage__item')
                            item.dataset.id = v.id
                            //
                            const date = document.createElement('time')
                            date.textContent = v.date
                            item.append(date)
                            //
                            const header = document.createElement('h3')
                            header.textContent = v.header
                            item.append(header)

                            wrapper.append(item)
                        })

                        mainPage.prepend(wrapper)

                        wrapper.addEventListener('click', () => document.location.pathname = 'news')
                    }
                })
                .catch((error) => console.log('error', error))
        } //> news


        { //< answers
            fetch(`${API}answers/?operatingCompanyId=${h1.dataset.id}&count=6`, {
                method: 'get'
            })
                .then(response => response.json())
                .then((response) => { //console.log('answers', response)
                    if(response.length > 0){
                        const wrapper = document.createElement('div')
                        wrapper.classList.add('mainPage__items')
                        //
                        const header = document.createElement('h2')
                        header.textContent = 'Ответы на вопросы'
                        //
                        wrapper.append(header)

                        response.forEach((v) => {
                            const item = document.createElement('div')
                            item.classList.add('mainPage__item')
                            item.dataset.id = v.id
                            item.textContent = v.question

                            wrapper.append(item)
                        })

                        mainPage.append(wrapper)

                        wrapper.addEventListener('click', () => document.location.pathname = 'answers')
                    }
                })
                .catch((error) => console.log('error', error))
        } //> answers


        { //< important to know
            fetch(`${API}important_to_know/?operatingCompanyId=${h1.dataset.id}&count=6`, {
                method: 'get'
            })
                .then(response => response.json())
                .then((response) => { //console.log('important to know', response)
                    if(response.length > 0){
                        const wrapper = document.createElement('div')
                        wrapper.classList.add('mainPage__items')
                        //
                        const header = document.createElement('h2')
                        header.textContent = 'Важно знать'
                        //
                        wrapper.append(header)

                        response.forEach((v) => {
                            const item = document.createElement('div')
                            item.classList.add('mainPage__item')
                            item.dataset.id = v.id
                            //
                            const date = document.createElement('time')
                            date.textContent = v.date
                            item.append(date)
                            //
                            const title = document.createElement('h3')
                            title.textContent = v.title
                            item.append(title)

                            wrapper.append(item)
                        })

                        mainPage.append(wrapper)

                        wrapper.addEventListener('click', () => document.location.pathname = 'faq')
                    }
                })
                .catch((error) => console.log('error', error))
        } //> important to know


        { //< information disclosure
            const d = new Date()
            fetch(`${API}information_disclosure/?operatingCompanyId=${h1.dataset.id}&year=${d.getFullYear()}&count=6`, {
                method: 'get'
            })
                .then(response => response.json())
                .then((response) => { //console.log('information disclosure', response.items)
                    if(response.items.length > 0){
                        const wrapper = document.createElement('div')
                        wrapper.classList.add('mainPage__items')
                        //
                        const header = document.createElement('h2')
                        header.textContent = 'Раскрытие информации'
                        //
                        wrapper.append(header)

                        response.items.forEach((v) => {
                            const item = document.createElement('div')
                            item.classList.add('mainPage__item')
                            item.textContent = v.title

                            wrapper.append(item)
                        })

                        mainPage.append(wrapper)

                        wrapper.addEventListener('click', () => document.location.pathname = 'docs')
                    }
                })
                .catch((error) => console.log('error', error))
        } //> information disclosure
    }
}, 400)
