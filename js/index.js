const form =document.getElementById("github-form")
const reposList = document.getElementById('repos-list');
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const configure = {
        method :"GET",
        headers:{
            
            Accept:" application/vnd.github.v3+json",
            
        },
       
    }
    fetch(`https://api.github.com/search/users?q=${e.target.value}`,configure)
    .then(res=>res.json())
    .then((data)=>{
        const users=  document.getElementById("user-list")
        
        users.innerHTML = ""
       data.items.map((e)=>{
        const list=document.createElement("li")
        list.innerHTML=""
        list.textContent= e["login"]
        list.setAttribute("data-username",e["login"])
        users.appendChild(list)
       })
        
       users.addEventListener("click",(e)=>{
        console.log(e.target)
        const username = e.target.getAttribute("data-username")
        const configureObject={
            
            headers:{
                
                Accept: " application/vnd.github.v3+json",
            },
           
        }
        fetch(`https://api.github.com/users/${username}/repos`,configureObject)
        .then(res=>res.json())
        .then((data)=>{
            displayRepos(data);
           
        })
        function displayRepos(repos) {
            reposList.innerHTML = ''; // Clear previous results
            repos.forEach(repo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                `;
                reposList.appendChild(li);
            });
        }

    })
    })
})

