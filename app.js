const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let usernameInput = document.getElementById('usernameInput');

    let gitHubUsername = usernameInput.value;

    requestUserRepos(gitHubUsername);

})


function requestUserRepos(username) {

    const xhr = new XMLHttpRequest();

    const url = `https://api.github.com/users/${username}/repos`;

    xhr.open('GET', url, true);

    xhr.onload = function() {

        const data = JSON.parse(this.response);
        let root = document.getElementById('userRepos');
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
        if (data.message === "Not Found") {
            let ul = document.getElementById('userRepos');

            let li = document.createElement('li');

            li.classList.add('list-group-item')
            li.innerHTML = (`
                <p><strong>No account exists with username:</strong> ${username}</p>`);
            ul.appendChild(li);
        } else {

            let ul = document.getElementById('userRepos');
            let p = document.createElement('p');
            p.innerHTML = (`<p><strong>Number of Public Repos:${data.length}</p>`)
            ul.appendChild(p);
            for (let i in data) {
                let li = document.createElement('li');

                li.classList.add('list-group-item')

                li.innerHTML = (`
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `);

                ul.appendChild(li);

            }

        }
    }

    xhr.send();

}