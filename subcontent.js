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

export {Subcontent}