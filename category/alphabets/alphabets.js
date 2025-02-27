//import { Subcontent } from "/subcontent.js";//for debugging


let content
let thumbnails
let animalData
let thumbnailsCollection
let thumbs

const contentDiv=document.querySelector('.content');
const home=document.getElementById('home');
const imageShow=document.querySelector('.image_show')
const audioControl=document.getElementById('audio_control')
const imageContainer=document.getElementById('image_container');
const alphabetsThumbnails=document.querySelector('.thumbnails')
const thumbnailsContent=document.querySelector('.thumbnails_content')
const thumbnailsClose=document.getElementById('thumbnails_close')
let selectedLanguage='en';//might be redundant
const caseSelectionButtons=document.querySelectorAll('[data-case]')

let url="https://teonteon19.github.io/yusof_learning"//url address for gihub cdn//need to change 
//let url='http://127.0.0.1:5500'


home.addEventListener('click',()=>{
    window.open(url,"_self")
})

//can be refactored to reduce lines of code
thumbnailsClose.addEventListener('click',()=>{
    alphabetsThumbnails.style.display='none'
    changeCase('A')
})


caseSelectionButtons.forEach(button=>button.addEventListener('click',e=>{
        changeCase(e.target.dataset.case)
    })
)


fetch(url+"/category/alphabets/alphabets.json").then(response=>response.json()).then(result=>{

        
        content=result;
        content.forEach(element => {
            let subContent=new Subcontent(element.name,element.bahasa_melayu,url,'/category/alphabets/thumbnails-image/')
            subContent.createSubcontentDiv(contentDiv)
        });

        thumbnails=document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumbnail=>{
            thumbnail.addEventListener('click',()=>{
                console.log(thumbnail.id);
                //animalThumbnails.style.display='flex'
                thumbnailsContent.innerHTML='';//is this the best solution?the problem is if this line of code does not exist, the thumbnail will be added twice
                createAlphabetsThumbnails(thumbnail.id,content)
                alphabetsThumbnails.style.display='flex';
                thumbnailsCollection=document.querySelectorAll('.alphabet_thumbnail');
                thumbnailsCollection.forEach(element=>{
                    element.addEventListener('click',()=>{
                        element.lastElementChild.play()//why it return a promise?
                    })
                })
            })
        })




    }
)

//function that develop in animals.js,createAnimalThumbnails(catgory,animalsJson)
//moidified to suit alphabets content
//there are modification
//can be defined as a module??
function createAlphabetsThumbnails(category,alphabetsJSON){
    let alphabets
    if(category!='test'){
        for(i of alphabetsJSON){
            if(i.name==category)alphabets=i.capital.split('')
        }
    }

    alphabets.forEach(alphabet=>{
        let div=document.createElement('div');
        div.id=alphabet;
        div.className='alphabet_thumbnail';
        div.style.color=`rgb(${randomNoGenerator(255)},${randomNoGenerator(255)},${randomNoGenerator(255)})`
        div.innerText=alphabet
        thumbnailsContent.appendChild(div)

        
        let audio=document.createElement('audio');
        //audio.controls=true;
        audio.playbackRate=0.7;
        let audioSource=document.createElement('source');

        audioSource.src=`/category/alphabets/alphabets_sound/${alphabet}.mp3`
        audio.appendChild(audioSource)
        div.appendChild(audio)
        

    })
    

}

//funnction to generate random number given upper and lower limit

function randomNoGenerator(upperLimit){
    return Math.floor(Math.random()*upperLimit)
}


//function to toggle between upperCase(A),lowerCase(a) or both(Aa)

function changeCase(selectedCase){
    changeColor(caseSelectionButtons,selectedCase,'blueviolet')
    switch(selectedCase){
        case 'A':
            thumbnailsCollection.forEach(thumb=>{
                thumb.innerText=thumb.id.toLocaleUpperCase()               
            });
            break;
        case 'a':
            thumbnailsCollection.forEach(thumb=>{
                thumb.innerText=thumb.id.toLocaleLowerCase();              
            });
            break;
        case 'Aa':
            thumbnailsCollection.forEach(thumb=>{
                thumb.innerText=thumb.id.toLocaleUpperCase()+' '+thumb.id.toLocaleLowerCase();
            });
            break;
    }
}

//function to change  caseSelectionButton backgroundcolor
function changeColor(elements,caseSelection,color){
    elements.forEach(el=>{
        console.log(el.dataset['case']==caseSelection)
        if(el.dataset['case']==caseSelection)el.style.backgroundColor=color;
        else{el.style.backgroundColor='transparent';}
    })
}


//for debugging
//enable script type to be not set as 'module'
class Subcontent{
    constructor(name,bm,url='none',folder_url=''){
        this.name=name;
        this.bm=bm;
        this.page_link=url+'/category/'+name+'.html'//to be review
        this.img_link=url+folder_url+this.name+".png"//localhost not for guthub cdn
    }

    //contentDiv refer to div.content
    createSubcontentDiv(contentDiv){
        let div=document.createElement('div');
        div.className='thumbnail';
        div.id=this.name;

        let title=document.createElement('div');
        title.className='title'
        title.innerText=this.name
        div.appendChild(title)

        let imgDiv=document.createElement('div');
        imgDiv.className='image'
        let image=document.createElement('img');
        imgDiv.appendChild(image)
        image.src=this.img_link
        div.appendChild(imgDiv)

        contentDiv.appendChild(div)
    }

}
