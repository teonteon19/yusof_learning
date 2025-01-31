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
        this.page_link=url+'/category/'+name+'.html'
        this.img_link=url+'/'+this.name+".png"
    }

    //contentDiv refer to div.content
    createSubcontentDiv(contentDiv){
        let div=document.createElement('div');
        div.className='thumbnail';
        div.id=this.name;

        let title=document.createElement('div');
        title.innerText=this.name
        div.appendChild(title)

        let imgDiv=document.createElement('div');
        let image=document.createElement('img');
        imgDiv.appendChild(image)
        image.src=this.img_link
        image.style.width=window.getComputedStyle(div).width.replace('px','')*0.8;
        image.style.height=window.getComputedStyle(div).height.replace('px','')*0.75;
        div.appendChild(imgDiv)

        contentDiv.appendChild(div)
    }

}


