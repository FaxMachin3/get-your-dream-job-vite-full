import axios from 'axios';

export const getUserGitHubRepos = async (username: string = '') => {
    return axios(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
};
