
// Your javascript goes here


const uncheckedIcon  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="#8a8a8a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 6" />
                </svg> 
                <p class='screen-reader'>Step Uncompleted</p>`
const checkedIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#303030"></circle>
    <path
      d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
      fill="#fff"
    ></path>
  </svg>
  <p class='screen-reader'>Step completed</p>`




let guideOpen = false
const guideToggleBtn = document.getElementById('guide-btn') //Drop down button
const setupGuide = document.getElementById('items') // The Ul tag for the whole guide
setupGuide.addEventListener('click', toggle)

guideToggleBtn.addEventListener('click', toggleGuide)



const itemBtn = document.getElementById('toggle-item-btn')
//Array of each html setup item
const setupItems = Array.from(setupGuide.children)





let totalSteps 

//Close Dialog logic
let dialogBtn = document.getElementById('close-dialog')
dialogBtn.addEventListener('click', closeDialog)




const closeIcon = `<svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744
    12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303
    11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z" fill="#000"/>
    </svg>
    <p class='screen-reader'>Open Guide</p>`



let openIcon = `<svg  viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197
    8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197
    13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z" fill="#000"/>
    </svg>
    <p class='screen-reader'>Close Guide</p>`




//Toggle SetUp Guide Logic
function closeDialog() {
    let dialog = document.getElementById('dialog')
    dialog.style.visibility = 'hidden'
}





const checkButtons = document.querySelectorAll('.mog')

checkButtons.forEach(button=> button.addEventListener('click',buttonChange))



const progressDiv = document.getElementById('progress')

const bar = progress.querySelector('.progress-bar')





//Toggle Setup Guide
function toggleGuide() {
  if (guideOpen === false) {
      //Change Icon
    guideToggleBtn.innerHTML = closeIcon
      //Toggle Boolean
    guideOpen = !guideOpen

    //Open Guide

    setupGuide.classList.toggle('hide')


    } else {

    guideToggleBtn.innerHTML = openIcon

    guideOpen = !guideOpen

    setupGuide.classList.toggle('hide')

    }

}



//This function accepts an event from the whole Setup guide Ul
//and then filters it to see what item was clicked
// Then toggles that item open
//This is the Entry event into the Setup Items Drop Down
function toggle(event) {
        let clickedItem
        let unclickedItems

        if (event.target.id === "toggle-item-btn") {
        //parent element of clicked item
        clickedItem = event.target.parentElement

        
        //find the HTML element that was clicked
        //remove it from the array
        //return the rest
        unclickedItems = setupItems.filter((item) => item !== clickedItem)

        hide(unclickedItems)
        showItem(clickedItem)
    }
}



//Show Clicked item
function showItem(item) {
    item.classList.toggle('selected')
}


function showNextItem(toChangeIndex, totalSteps) {

       // console.log(toChangeIndex)
        //console.log(totalSteps)

        hide(setupItems)

        
        let nextUncompletedStep

         totalSteps.findIndex((element,index) => {
                 if (index > toChangeIndex) {   
                        console.log(index)
                         nextUncompletedStep = index
                        //console.log(toChangeIndex) 
                        return element === false 
                 } else {
                        nextUncompletedStep = 0
                }
        })

        //find Next Item
        let nextItem = setupItems[nextUncompletedStep]

        

        showItem(nextItem)     

 }
        
//hide open items
function hideItem(item) {
    item.classList.remove('selected')
}


function hide(array) {
    array.map((element)=>{ hideItem(element)})
}






//Check for Previous Session Storage
function initialise() {
        if (sessionStorage.getItem('progress')) {
                totalSteps = JSON.parse(sessionStorage.getItem('progress'))
                updateDOM(totalSteps)
        } else {
                totalSteps = new Array(setupItems.length).fill(false)
                sessionStorage.setItem('progress',JSON.stringify(totalSteps))
                updateDOM(totalSteps)
        }
}


// here
//finds the setup item on which the check button was clicked
async function buttonChange(event) {
        //Somewhat of a live Steps List
        let steps = Array.from(document.getElementById('items').children)
        
        let toChangeIndex = setupItems.findIndex(function (setupItem) {
                
                return setupItem.contains(event.target)  
        })


        //Was the item that triggered this event Checked or Unchecked

        let isChecked = steps[toChangeIndex].classList.contains("checked")
       

        


        //Updates total Step array local value
        totalSteps[toChangeIndex] = !totalSteps[toChangeIndex]

        //update Session Storage 
        sessionStorage.setItem('progress',JSON.stringify(totalSteps))
        
        
        //Update DOM
        updateDOM(totalSteps,toChangeIndex,isChecked)

}




function updateDOM(...theArgs) {

        let totalSteps = theArgs[0]
        let toChangeIndex = theArgs[1] 
        let isChecked = theArgs[2]

        //console.log(isChecked)

        //Update Progress Bars
        let bars=[]
        totalSteps.map((element) => element ? bars.push(document.createElement('div')) : "")        
        bar.replaceChildren(...bars)

        //Progress Numbers
        let completed = totalSteps.filter((element) => element === true)
        progress.querySelector('.progress-num').innerHTML = `${completed.length} / ${totalSteps.length} Completed`       

//update check icons
        totalSteps.map(function (step, index) {
                setupItems[index].classList.remove('checked')
                if (step) {
                        //Change button icon
                        setupItems[index].querySelector('button').innerHTML = checkedIcon
                        setupItems[index].classList.add('checked')

                        //console.log('true')         
                } else { 
                        setupItems[index].querySelector('button').innerHTML = uncheckedIcon
                        //console.log('false')
                } 
        })


        if (isChecked) {
                //Show Unclicked Item
                hide(setupItems)
                showItem(setupItems[toChangeIndex])

        
        } else {

        //Show next Item
        
        //This is to Ensure that during the initial initialising Phase
        //an Undefined Value is not sent for Parameter "toChangeIndex"
        //-See Initialise Function.
        toChangeIndex ? showNextItem(toChangeIndex, totalSteps) :
        toChangeIndex === 0 ? showNextItem(toChangeIndex, totalSteps) : ''    
                
        }


}




document.getElementById('alert-btn').addEventListener('click', toggleAlert)

document.getElementById('menu-btn').addEventListener('click', toggleMenu)


function toggleAlert() {
        document.getElementById('alert').classList.toggle('show')
}


function toggleMenu() {
        document.getElementById('menu').classList.toggle('show')
}



initialise()

