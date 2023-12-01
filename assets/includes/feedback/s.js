const formFeedback = document.querySelector('form#feedback')

//<
{
 const sI = setInterval(() => {
  if(typeof CONSENT !== 'undefined'){
   const cConsent = formFeedback.querySelectorAll('.feedback__checkboxes p')
   Array.from(cConsent).forEach((consent) => {
    consent.innerHTML = consent.innerHTML.replace(/\[(\d)]([^\[\]]*)\[\/\d]/gi, '<a data-id="$1" target="_blank">$2</a>')
   })
   //
   const cLinks = new DOMParser().parseFromString(formFeedback.innerHTML, 'text/html').body.querySelectorAll('a[data-id]')
   Array.from(cLinks).forEach((link) => {
    link.href = CONSENT[link.dataset.id] ? CONSENT[link.dataset.id] : '/'
    formFeedback.querySelector(`a[data-id="${link.dataset.id}"]`).outerHTML = link.outerHTML
   })

   clearInterval(sI)
  }
 }, 400)
}
//>

const message = formFeedback.querySelector('textarea')
{
 const sI = setInterval(() => {
  if(window.currentSection){
   if(currentSection === 'services' || currentSubSection === 'services'){
    message.placeholder = 'Закажите услугу'
   }

   clearInterval(sI)
  }
 }, 400)
}

//< validation
const fullName = formFeedback.querySelector('input[type="text"]')
fullName.addEventListener('input', (e) => {
 e.target.value = e.target.value.replace(/[^а-яёa-z\-\s]/ig, '');

 (e.target.value.length < 1)
  ? e.target.classList.add('incorrectly')
  : e.target.classList.remove('incorrectly')

 lockButton()
})

const tel = formFeedback.querySelector('input[type="tel"]')
IMask(
 tel,
 {mask: "+{7} (000) 000 00 00"}
)
tel.addEventListener('input', (e) => {
 (e.target.value.length !== 18)
  ? e.target.classList.add('incorrectly')
  : e.target.classList.remove('incorrectly')

 lockButton()
})

const email = formFeedback.querySelector('input[type="email"]')
email.addEventListener('input', (e) => {
 e.target.value = e.target.value.replace(/[^a-zа-яё0-9@\-_.\s]/ig, '') //Только нужные знаки

 if(
  (e.target.value.length < 8) ||
  (e.target.value.indexOf('@') === -1) ||
  (e.target.value.indexOf('.') === -1)
 ){
  e.target.classList.add('incorrectly')
 } else{
  e.target.classList.remove('incorrectly')
 }

 lockButton()
})

message.addEventListener('input', (e) => {
 (e.target.value.length < 2)
  ? e.target.classList.add('incorrectly')
  : e.target.classList.remove('incorrectly')

 lockButton()
})

const aCheckboxes = formFeedback.querySelectorAll('.feedback__checkboxes input[type="checkbox"]')
Array.from(aCheckboxes).forEach((checkbox) => {
 checkbox.addEventListener('click', (e) => {
  (e.target.checked === false)
  ? e.target.classList.add('incorrectly')
  : e.target.classList.remove('incorrectly')

  lockButton()
 })
})
//> validation

const button = formFeedback.querySelector('button')
function lockButton(){
 let errors = 0;

 (fullName.value.length < 1 || fullName.classList.contains('incorrectly')) && errors++
 //
 if(
  (tel.value.length !== 18 || tel.classList.contains('incorrectly'))
  && (email.value.length < 8 || email.classList.contains('incorrectly'))
 ){
  errors++
 }
 //
 (message.value.length < 2 || message.classList.contains('incorrectly')) && errors++
 //
 Array.from(aCheckboxes).forEach((checkbox) => {
  (checkbox.checked === false) && errors++
 })

 if(errors > 0){
  button.setAttribute('disabled', 'disabled')
  button.removeEventListener('click', subbmitForm)
 } else{
  button.removeAttribute('disabled')
  button.addEventListener('click', subbmitForm)
 }
}

function subbmitForm(e){
 e.preventDefault()

 fetch(`${API}requests/index.php`, {
  method: 'post',
  body: JSON.stringify({
   'n': fullName.value,
   't': tel.value,
   'e': email.value,
   'm': message.value
  }),
 })
 .then(response => response.json())
 .then((response) => { //console.log('response.data', response)
  openMessage(response.message, 0) //1 - green, 2 - red

  const cInputs = formFeedback.querySelectorAll('input, textarea')
  Array.from(cInputs).forEach((input) => {
   input.value = ''
  })
  //
  button.setAttribute('disabled', 'disabled')
 })
 .catch((error) => console.log(error))
}

/*
function addFormHeader(header = ''){
 if(header.length > 0){ console.log('!')
  const h2 = document.createElement('h2')
  h2.innerText = header
  formFeedback.querySelector('section > div').prepend(h2)

  return true
 }

 return false;
}
*/
