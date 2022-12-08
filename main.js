let title=document.getElementById("title");
let price=document.getElementById("price"),
taxes=document.getElementById("taxes"),
ads=document.getElementById("ads"),
discount=document.getElementById("discount"),
total=document.getElementById("total"),
count=document.getElementById("count"),
searchCategory=document.getElementById("searchCategory"),
category=document.getElementById("category"),
search=document.getElementById("search"),
searchTitle=document.getElementById("searchTitle"),
deleteAll=document.getElementById("deleteAll"),
submit=document.getElementById("submit"),
mode='create',
tmp,
modeBtn='title',
tbody=document.getElementById("tbody");

let arrData=[];
if(localStorage.data != null){
    arrData = JSON.parse(localStorage.getItem("data"));
    }else{
    arrData=[];
}

Show_data();

submit.addEventListener("click",()=>{
    
        
    
    data={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if (title . value && total . innerHTML
        && category . value != ""){
            if(mode === 'create'){
                if( data . count > 1 ) {
                    for(let i=0;i<data.count;i++){
            
                        arrData.push(data);
                    }
                }
                else
                {
                    arrData.push(data);
                }
            }
                    else
                {
                    arrData[tmp]=data;
                    mode='create';
                    submit.innerHTML="Create";
                    count.style.display="block";
                    
                }

}else{
    clearData();
}

    localStorage.setItem("data",JSON.stringify(arrData));
    console.log(arrData);
    
    Show_data(arrData);



})
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML=""
    count.value="";
    category.value="";
}
function get_total(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value) - 
        +discount.value;
        total.innerHTML=result;
        total.style.backgroundColor="green";
    }
    else{
        total.innerHTML="";
        total.style.backgroundColor="red";
    }
}
function Show_data(){
    get_total();
    let table='';
    arrData.forEach(( element , id ) => {
        table +=
        `<tr>
        <td>${ id + 1 }</td>
        <td>${ element . title }</td>
        <td>${ element . price }</td>
        <td>${ element . taxes }</td>
        <td>${ element . ads }</td>
        <td>${ element . discount }</td>
        <td>${ element . total }</td>
        <td>${ element . category }</td>
        <td><button id="update" onclick="Update(${id})">Update</button></td>
        <td><button id="Delete" onclick="Delete(${id})">delete</button></td>
        </tr>
        `
    });
        tbody.innerHTML=table;
        
    if( arrData . length > 0 ){
        deleteAll.innerHTML=`
        <button id="deleteAll" onclick="deleteall()">Delete All (${arrData.length})
        </button>`
        
    }

    
}
function Delete(id){
        arrData.splice(id,1);
        localStorage.setItem("data",JSON.stringify(arrData));
        Show_data();
}
function deleteall(){
    localStorage.clear();
    arrData.splice(0);
    Show_data(); 
}
function Update(id){
    title.value=arrData[id].title;
    price.value=arrData[id].price;
    taxes.value=arrData[id].taxes;
    ads.value=arrData[id].ads;
    discount.value=arrData[id].discount;
    get_total();
    count.style.display="none"
    category.value=arrData[id].category;
    submit.innerHTML="Update";
    mode='update';
    tmp=id;
    scroll({
        top:0,
        behavior:"smooth"
})
}


function getSearchMode(id){
    if(id=="searchTitle"){
        modeBtn="title";
        
    }else{
        modeBtn='catagory';
        
    }
    search.placeholder ="search by " + modeBtn
    search.focus();
    search.value="";
    Show_data();
    console.log(modeBtn);
}


function searchFunc(value){
    let table = '';
    arrData.forEach((element,i) => {
    if(modeBtn == 'title'){
            if(element.title.includes(value.toLowerCase())){
                table +=
                `<tr>
                <td>${ i + 1 }</td>
                <td>${ element . title }</td>
                <td>${ element . price }</td>
                <td>${ element . taxes }</td>
                <td>${ element . ads }</td>
                <td>${ element . discount }</td>
                <td>${ element . total }</td>
                <td>${ element . category }</td>
                <td><button id="update" onclick="Update(${i})">Update</button></td>
                <td><button id="Delete" onclick="Delete(${i})">delete</button></td>
                </tr>
                `
                }
            }
            
    
    else{
    
            if(element.category.includes(value.toLowerCase())){
                table +=
                `<tr>
                <td>${ i + 1 }</td>
                <td>${ element . title }</td>
                <td>${ element . price }</td>
                <td>${ element . taxes }</td>
                <td>${ element . ads }</td>
                <td>${ element . discount }</td>
                <td>${ element . total }</td>
                <td>${ element . category }</td>
                <td><button id="update" onclick="Update(${i})">Update</button></td>
                <td><button id="Delete" onclick="Delete(${i})">delete</button></td>
                </tr>
                `
            }
    
    }
});
    tbody.innerHTML=table;
}
