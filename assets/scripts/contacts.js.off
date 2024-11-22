{
 const sI = setInterval(() => {
  const section = document.querySelector('section.contacts')
  if(section){
   const cLinks = section.querySelectorAll('a:not([href])')
   Array.from(cLinks).forEach((link) => {
    link.target = '_blank'

    if(link.innerText.indexOf('@') > -1){ //email
     const aEMails = link.innerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
     link.href = 'mailto:' + aEMails[0]
    } else {
     let telDigits = link.innerText.replace(/[^0-9]/g, '')
     if(telDigits.length === 11){ //tel
      (telDigits.slice(0, 1) * 1 === 8) && (telDigits = '7' + telDigits.slice(1))
      link.href = 'tel:+' + telDigits
     } else{ //url
      link.href = '//' + link.innerText
     }
    }
   })

   const cAddresses = section.querySelectorAll('address')
   Array.from(cAddresses).forEach((address) => {
    const link = document.createElement('a')
    link.target = '_blank'
    link.href = `//yandex.ru/search/?text=${address.innerText}`
    link.classList.add('address')
    link.innerText = address.innerText
    address.replaceWith(link)
   })

   clearInterval(sI)
  }
 })
}