//Visual Frameworks Project 4
//Corey Hobbs
//1202

window.addEventListener("DOMContentLoaded", function(){
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    function makeCats(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "itemStatus");
        for(var i=0, j=itemStatus.length; i<j; i++){
            var makeOption =  document.createElement("option");
            var optText = itemStatus[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    function getSelectedRadio(){
        var radios = document.forms[0].typeof
        for(var i=0; i<radios.length; i++){
            if(radios[i].checked){
                supplyValue = radios[i].value;
            }
        }
    }
    
    
    function toggleControls(n){
        switch(n){
            case "on":
                $("partyForm").style.display = "none";
                $("clear").style.display = "inline";
                $("displayLink").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off":
                $("partyForm").style.display = "block";
                $("clear").style.display = "inline";
                $("displayLink").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    
    
    function storeData(key){
        //if ther is no key this is new and we need key
        if(!key){
        var id                  = Math.floor(Math.random()*100000001);
        }else{
            //the key is the same key from original submit
            id = key;
        }
        getSelectedRadio(); 
        var item                = {};
            item.date           = ["Party Date:", $("date").value];
            item.psupply        = ["Party Supply:", $("psupply").value];
            item.hmany          = ["How Many:", $("hmany").value];
            item.whowill        = ["Who is bringing supply:", $("whowill").value];
            item.supplyValue    = ["Type of Supply:", supplyValue];
            item.itemStatus     = ["Status of Item:", $("itemStatus").value];
            item.notes          = ["Notes:", $("notes").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Party Item Added");
    }
    
    
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no items to display so default data was added");
            autoFillData();
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for(var i=0, len=localStorage.length; i<len; i++){
            var makeLi = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeLi.appendChild(makeSubList);
            getImage(obj.supplyValue[1], makeSubList);
            for(var n in obj){
                var makeSubLi = document.createElement("li");
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); 
        }
    }
    //Auto populate data in local storage
    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    //get the image for the right type of item
    function getImage(catName, makeSubList){
        var imageLi = document.createElement("Li");
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement("img");
        var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
        imageLi.appendChild(newImg);
    }
    
    function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //add line break
        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
        
    }
    
    function editItem() {
        //Grab the data from our item from local Storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        //show the form
        toggleControls("off");
        
        //populate the form fields with current localStorage values.//
        $("date").value = item.date[1];
        $("psupply").value = item.psupply[1];
        $("whowill").value = item.whowill[1];
        $("itemStatus").value = item.itemStatus[1];
        $("hmany").value = item.hmany[1];
        $("notes").value = item.notes[1];
        var radios = document.forms[0].typeof;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Food" && item.supplyValue[1] == "Food"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Other" && item.supplyValue[1] == "Other"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Drink" && item.supplyValue[1] == "Drink"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Decoration" && item.supplyValue[1] == "Decoration"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Present" && item.supplyValue[1] == "Present"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        save.removeEventListener("click", storeData);
        $("submit").value = "Edit Item";
        var editSubmit = $("submit");
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this item?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("The item was deleted.")
            window.location.reload();
        }else{
            alert("The item was not deleted.")
        }
    }
    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There are no items to clear")
        }else{
            localStorage.clear();
            alert("All items have been deleted");
            window.location.reload();
            return false;
        }
    }
    
    function validate(e){
        var getDate = $("date");
        var getPsupply = $("psupply");
        var getWhowill = $("whowill");
        
        //reset error msg
        errMsg.innerHTML = "";
            getDate.style.border = "1px solid black";
            getPsupply.style.border = "1px solid black";
            getWhowill.style.border = "1px solid black";
            
            
            
       //get error messages 
        var messageAry = [];
        //date validation
        if(getDate.value === ""){
            var dateError = "Please enter a date"
            getDate.style.border = "1px solid red";
            messageAry.push(dateError);
        }
        //party supply validation
        if(getPsupply.value === ""){
            var psupplyError = "Please enter a Party Supply"
            getPsupply.style.border = "1px solid red";
            messageAry.push(psupplyError);
        }
        //who will bring validation
        if(getWhowill.value === ""){
            var whowillError = "Please enter who is bringing the supply"
            getWhowill.style.border = "1px solid red";
            messageAry.push(whowillError);
        }
        //If errors display them on screen
        if(messageAry.length >= 1){
            for(var i=0, j=messageAry.length; i < j; i++){
                var txt = document.createElement("li");
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
       }else{
            storeData(this.key);
       }


    }

    
    var itemStatus = ["--Status--", "taken care of", "still need", "someone is bringing this" ],
        supplyValue;
        errMsg = $("errors");
        
        
    makeCats();
    
    
    
    var displayLink = $("displayLink");
    displayLink.addEventListener("click", getData);
    var clearLink = $("clear");
    clearLink.addEventListener("click", clearLocal);
    var save = $("submit");
    save.addEventListener("click", validate);
});