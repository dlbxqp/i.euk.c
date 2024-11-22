/*/< contacts
if([currentSection, currentSubSection].includes('contacts')){
 const script = document.createElement('script')
 script.src = 'scripts/contacts.js'
 document.querySelector('body').appendChild(script)
}
*///> contacts


//< wrappers
function wrapElements(parent){
 parent.innerHTML = parent.innerHTML
 .replace(/\r/g, ' ')
 .replace(/\n/g, ' ')
 .replace(/\t/g, ' ')
 .replace(/\s+/g, ' ')
 .replaceAll('> <', '><')
 .trim()

 //< tables
 let A = ''
 let B = parent.innerHTML//; console.log('B', B)
 const cTables = parent.querySelectorAll('table')//; console.log('cTables.length', cTables )

 cTables.forEach((table) => { //console.log('table', table)
  if( table.closest('.tableWrapper') ) return false

  A = table.outerHTML//; console.log('A', A)

  const div = document.createElement('div')
  div.classList.add('tableWrapper')
  table.classList.add('wrapped')
  div.appendChild(table)//; console.log('div.outerHTML', div.outerHTML)

  //console.log('> ', B.includes(A) )
  B = (B.includes(A) ? B.replace(A, div.outerHTML) : '<!-- Error -->')
 })

 parent.innerHTML = B
 //> tables
}
//> wrappers