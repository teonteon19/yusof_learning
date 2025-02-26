let content
let thumbnails
const contentDiv=document.querySelector('.content')
//import { Subcontent } from "./subcontent.js"

//let url="https://teonteon19.github.io/yusof_learning"//url address for gihub cdn
let url='http://127.0.0.1:5500'

fetch(url+"/thumbnails-image/main.json").then(response=>response.json()).then(result=>{
    content=result;
    content.forEach(element => {
        let subContent=new Subcontent(element.name,element.bahasa_melayu,url,'/thumbnails-image/')
        subContent.createSubcontentDiv(contentDiv)
    });

    
    thumbnails=document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail=>{
        thumbnail.addEventListener('click',()=>window.open(url+'/category/'+thumbnail.id+'/'+thumbnail.id+'.html',"_self"))
    })
    
    
})

//for debugging - disable module
class Subcontent{
    constructor(name,bm,url,folder_url=''){
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



