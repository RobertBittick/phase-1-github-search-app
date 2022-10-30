const init = () => {
    const submitForm = document.getElementById('github-form')
    const userContainer = document.getElementById('user-list')
    const repoContainer = document.getElementById('repos-list')

    submitForm.addEventListener('submit', (event) => {
        event.preventDefault()
        fetch(`https://api.github.com/search/users?q=${event.target.children[0].value}`)
        .then(response => response.json())
        .then(data => {
            renderUsers(data.items)
        })
    })

    function renderUsers(users){
        users.forEach(user => {
            console.log(user)
            let userNameLi = document.createElement('li')
            userNameLi.textContent = user.login
            userNameLi.button
            let userImg = document.createElement('img')
            userImg.setAttribute('src', user.avatar_url)
            

            userNameLi.addEventListener('click', (event) => {
                event.preventDefault()
                userNameLi.style.color = 'purple'
                fetch(`https://api.github.com/users/${event.target.value}/repos`)
                .then(response => response.json())
                .then(repos => {
                    repos.forEach(repo =>{
                    let repoLi = document.createElement('p')
                    repoLi.textContent = repo.url
                    repoContainer.append(repoLi) 
                    })

                })
            })
            userContainer.append(userNameLi,userImg)
        });
    }

}



document.addEventListener('DOMContentLoaded', init)

