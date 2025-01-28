let test

let url="https://teonteon19.github.io/yusof_learning/test.json"

fetch(url).then(response=>response.json()).then(result=>test=result)

if(!test){
    test=2
}