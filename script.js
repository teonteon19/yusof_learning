let content
const contentDiv=document.querySelector('.content')

let url="https://teonteon19.github.io/yusof_learning/thumbnails-image"

fetch(url+"/main.json").then(response=>response.json()).then(result=>{
    content=result;
    content.forEach(element => {
        let subContent=new Subcontent(element.name,element.bahasa_melayu,url)
        subContent.createSubcontentDiv(contentDiv)
    });
})

/*
content is a list
for each element in content create a div with 2 divs that will show the title and image

*/


class Subcontent{
    constructor(name,bm,url){
        this.name=name;
        this.bm=bm;
        this.img_link=url+this.name+".png"
    }

    //contentDiv refer to div.content
    createSubcontentDiv(contentDiv){
        let div=document.createElement('div');
        div.className='thumbnail';
        div.id=this.name;

        let title=this.createTitleDiv();
        div.appendChild(title)

        let imgDiv=this.createImgDiv();
        div.appendChild(this.createImgDiv)

        contentDiv.appendChild(div)
    }

    createTitleDiv(){
        let title=document.createElement('div');
        title.innerText=this.name
    }

    createImgDiv(){
        let imgDiv=document.createElement('div');
        let image=document.createElement('img');
        imgDiv.appendChild(image)
        image.src=this.img_link
    }
}


