
function $(selector){
    return document.querySelector(selector);
}
function $$(selector){
    return document.querySelector(selector);
}


function createElement(element, classList, content){
    const newElement = document.createElement(element);

    if(classList){
        newElement.setAttribute('class', classList);
    }   
    if(content){
        newElement.innerHTML = content;
    }
    
    return newElement;
}