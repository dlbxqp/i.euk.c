/*
Array.from(slides).forEach(() => {
 const span1 = document.createElement('span')
 const span2 = document.createElement('span')
 span1.append(span2)
 document.querySelector('.header-slider_dots').append(span1)
})
//
const dots = document.querySelectorAll('.header-slider_dots > *')
Array.from(dots).forEach((dot, k) => {
 dot.addEventListener('click', () => {
  (sT) && clearTimeout(sT)
  showSlides(k)
 })
})
*/

function createHeaderSlider(o = {}){ //console.log('o', o)
 if(Object.keys(o).length === 0) return false

 const slider = document.querySelector('#header-slider')

 //< slides
 const a = []
 for(let k in o){
  o[k].forEach((vv) => {
   a.push({'alt': k, 'src': vv})
  })
 }
 //+
 a.sort(() => (Math.random() > .5) ? 1 : -1)
 //
 a.forEach((v) => {
  const slide = document.createElement('div')
  slide.classList.add('header-slider_slide')
  //
  const picture = document.createElement('picture')
  //
  const img = document.createElement('img')
  img.alt = v.alt
  img.src = v.src
  //
  //const text = document.createElement('div')

  picture.appendChild(img)
  slide.appendChild(picture)
  //slide.appendChild(text)
  slider.prepend(slide)
 })
 //> slides

 const slides = document.querySelectorAll('.header-slider_slide')//; console.log('slides', slides)

 let slideIndex = 0
 const showSlides = (n = slideIndex) => {
  if(n > (slides.length - 1)){
   slideIndex = 0
  } else if(n < 0){
   slideIndex = (slides.length - 1)
  } else{
   slideIndex = n
  } //console.log('slideIndex', slideIndex)

  Array.from(slides).forEach((slide, k) => {
   (k === slideIndex) ? slide.classList.add('active') : slide.classList.remove('active')
  })
  /*
  Array.from(dots).forEach((dot, k) => {
   (k === slideIndex) ? dot.classList.add('active') : dot.classList.remove('active')
  })
  */

  setTimeout(() => showSlides(++slideIndex), 6000)
 }
 showSlides(++slideIndex)

 //< slider arrows
 const arrows = document.createElement('div')
 arrows.classList.add('header-slider_arrows')

 const rightArrow =  document.createElement('span')
 rightArrow.innerHTML = '&#10095;'
 rightArrow.addEventListener('click', () => showSlides(++slideIndex))

 const leftArrow =  document.createElement('span')
 leftArrow.innerHTML = '&#10094;'
 leftArrow.addEventListener('click', () => showSlides(--slideIndex))

 arrows.appendChild(leftArrow)
 arrows.appendChild(rightArrow)
 slider.appendChild(arrows)
 //> slider arrows

/*
 //< slider dots
 const dots = document.createElement('div')
 dots.classList.add('header-slider_dots')
 slider.appendChild(dots)
 //> slider dots
*/
}