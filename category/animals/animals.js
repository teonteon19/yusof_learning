import { Subcontent } from "/subcontent.js";

let content
let thumbnails
let animalData
let animalThumbnailsCollection
let thumbs

const contentDiv=document.querySelector('.content');
const home=document.getElementById('home')
const imageShow=document.querySelector('.image_show')
const audioControl=document.getElementById('audio_control')
const imageContainer=document.getElementById('image_container');
const animalThumbnails=document.querySelector('.animal_thumbnails')
const animalThumbnailsContent=document.querySelector('.animal_thumbnails_content')
const animalThumbnailsClose=document.getElementById('animal_thumbnails_close')
let selectedLanguage='en';
const animalThumbnailsContentEN=document.getElementById("animal_thumbnails_content_language_selection_en")
const animalThumbnailsContentBM=document.getElementById("animal_thumbnails_content_language_selection_bm")
const languageSelectionButtons=document.querySelectorAll('[data-language]')
const imgFormat=['jpg','png','jpeg','webp','avif']

let url="https://teonteon19.github.io/yusof_learning/thumbnails-image"//url address for gihub cdn
//let url='http://127.0.0.1:5500'

home.addEventListener('click',()=>{
    window.open(url,"_self")
})

//can be refactored to reduce lines of code
animalThumbnailsClose.addEventListener('click',()=>{
    animalThumbnails.style.display='none'
    changeSelectedLanguage('en')
})


languageSelectionButtons.forEach(button=>button.addEventListener('click',e=>{
        changeSelectedLanguage(e.target.dataset.language)
    })
)



fetch(url+"/category/animals/animals.json").then(response=>response.json()).then(result=>{

    animalData=result;
    content=animalData[1]
    thumbs=animalData[0];
    thumbs.forEach(element => {
        let subContent=new Subcontent(element.name,element.bahasa_melayu,url,'/category/animals/thumbnails-image/')
        subContent.createSubcontentDiv(contentDiv)
    });

    //using Promise.all()??
    content.forEach(animal=>{
        imgFormat.forEach(frmat=>{
            let imageFolder=url+"/category/animals/animals-image/";
            let audioFolder=url+"/category/animals/animals_sound/"
            determineValidImgFormat(frmat,imageFolder,animal.name.en).then(result=>{
                if(result)animal.imageLink=result;
                
            })
            animal.audioLink={}
            animal.audioLink.en=audioFolder+animal.name.en+'.mp3';
            animal.audioLink.bm=audioFolder+animal.name.bm+'.mp3';
        })  
    })
    
    


    thumbnails=document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail=>{
        thumbnail.addEventListener('click',()=>{
            console.log(thumbnail.id);
            //animalThumbnails.style.display='flex'
            animalThumbnailsContent.innerHTML='';//is this the best solution?the problem is if this line of code does not exist, the thumbnail will be added twice
            createAnimalThumbnails(thumbnail.id,content)
            animalThumbnails.style.display='flex';
            animalThumbnailsCollection=document.querySelectorAll('.animal_thumbnail');
            animalThumbnailsCollection.forEach(element=>{
                element.addEventListener('click',()=>{
                    element.lastElementChild.play()//why it return a promise?
                })
            })
        })
    })

    
    

    

})


//funnction to set imageContainer.src value that will eventually show an image
//loop through imgFormat
async function determineValidImgFormat(imageformat,url,imageName){
    let result;
    let imageURL=url+imageName+'.'+imageformat;
    let response=await fetch(imageURL);
    if(response.status==200)result=imageURL
    return result//what is result,is this redundadnt?//i think i have answered it
    
}

//function to view images base on the clicked thumbnails
//if 'all' thumbnails is clicked, view all images in random order
//view all images in random order
//get randomOrder->




//function to generate random array of n numbers given n number
function randomOrder(n){
    let result=[];
    let counter=0
    while(result.length<n){
        counter=counter+1
        let randno=Math.floor(Math.random()*n)
        if(!result.includes(randno))result.push(randno);
        if(counter==100)break
    }

    return result
}


//function to create animal thumbnails
//check for clicked thumbnails category
//check for animal with the same category and put them in an array
//create divs
//can be used for others, like food
function createAnimalThumbnails(category,animalsJSON){
    let animals;
    if(category=='all')animals=content;
    else{
        animals=[];
        animalsJSON.forEach(animal=>{
            if(animal.category.en==category)animals.push(animal)//change mammal to category
        })
    }
    

    animals.forEach(animal=>{
        let div=document.createElement('div');
        div.id=animal.name.en;
        div.dataset.en=animal.name.en;
        div.dataset.bm=animal.name.bm;
        div.className='animal_thumbnail';
        animalThumbnailsContent.appendChild(div)

        let img=document.createElement('img')
        img.src=animal.imageLink;
        img.alt=animal.name.en;
        div.appendChild(img)

        let audio=document.createElement('audio');
        //audio.controls=true;
        audio.playbackRate=0.7;
        let audioSource=document.createElement('source');
        audioSource.src=animal.audioLink.en//will be modified to enable selection of language
        audio.appendChild(audioSource)
        div.appendChild(audio)

        //testing
        /*
        let audioSource2=document.createElement('source');
        audioSource2.src=animal.audioLink.bm//will be modified to enable selection of language
        audio.appendChild(audioSource2)
        */
        
    })

}

//function to change selected language and the language button appearance
//as callback function when close,bm,en button is clicked 

function changeSelectedLanguage(language){
    if(language!=selectedLanguage){
        selectedLanguage=language;
        animalThumbnailsCollection.forEach(animal=>{
            animal.getElementsByTagName('source')[0].src=url+`/category/animals/animals_sound/${animal.dataset[language]}.mp3`;
            animal.getElementsByTagName('audio')[0].load()
        })

    }
    languageSelectionButtons.forEach(button=>{
        if(button.dataset.language==selectedLanguage){
            button.style.backgroundColor='blueviolet'
        }
        else{
            button.style.backgroundColor='transparent';
        }
    })
}



/*
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
*/

