
var uni = [{"web_page": "", "state-province": "", "alpha_two_code": "", "domains": "", "name": "", "country": ""}] 
var table = document.getElementById("university").getElementsByTagName("tbody")[0]
window.addEventListener("load", function(){
    axios.get('http://universities.hipolabs.com/search?country=United+States')
    .then(function (response){
        uni = response.data
    })
    .catch(function (error){
        console.log("erreur : " + error)
    })
    .finally(function(){
        updateTable(uni)
    })
})

function updateTable(universities){
    table.innerHTML = ""
    universities.forEach(function(element){
        table.appendChild(document.createElement("tr"))
        var tr = table.lastChild
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element.name
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element.country
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element.alpha_two_code
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element["state-province"]
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element.domains
        tr.appendChild(document.createElement("td"))
        tr.lastChild.innerHTML = element.web_pages
    })
}

document.getElementById("sort").addEventListener("click", function(){
    table.innerHTML = ""
    if(this.value === "az"){
        table.innerHTML = "loading..."
        updateTable(uni.sort(function(a, b){
            if(a.name < b.name) return -1
            if(a.name > b.name) return 1
            return 0
        }))
        this.value = "az"
    }
    else{
        updateTable(uni.sort(function(a, b){
            if(a.name > b.name){
                return -1
            }
            if(a.name < b.name){
                return 1
            }
            return 0
        }))
        this.value = "za"
    }

})

document.getElementById("search").addEventListener("keyup", function(){
    table.innerHTML = ""
    updateTable(uni.filter(function(element){
        return element.name.toLowerCase().includes(this.value.toLowerCase())
    }, this))
})