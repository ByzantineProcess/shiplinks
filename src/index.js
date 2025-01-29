"use strict";
const urlParams = new URLSearchParams(window.location.search);
const prj = urlParams.get('prj');
let prjData;
fetch("prj/" + prj + ".json")
    .then(response => {
    if (!response.ok) {
        throw new Error('Project not found');
    }
    return response.json();
})
    .then(data => {
    prjData = data;
    loadProjectDefinition(data);
});
function loadProjectDefinition(data) {
    let titleObject = document.getElementById('title');
    // grab the title font and body font from the project definition, then ask google fonts to load them
    let titleFont = data.titleFont.replace(/ /g, '+');
    let bodyFont = data.bodyFont.replace(/ /g, '+');
    // use css @import to load the fonts
    let style = document.createElement('style');
    style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=${titleFont}&display=swap'); @import url('https://fonts.googleapis.com/css2?family=${bodyFont}&display=swap');`;
    document.head.appendChild(style);
    // set the title font
    if (titleObject) {
        titleObject.style.fontFamily = data.titleFont;
    }
    else {
        console.error('Title element not found');
    }
    // set the title
    if (titleObject) {
        titleObject.innerText = data.title;
    }
    // set the description font
    let descriptionObject = document.getElementById('description');
    if (descriptionObject) {
        descriptionObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Description element not found');
    }
    // set the description
    if (descriptionObject) {
        descriptionObject.innerText = data.description;
    }
    // set the banner image
    let bannerObject = document.getElementById('banner');
    if (bannerObject) {
        bannerObject.src = data.banner;
    }
    else {
        console.error('Banner element not found');
    }
    // set the tech used
    let techObject = document.getElementById('tech');
    if (techObject) {
        techObject.innerText += (" " + data.technologies.join(', '));
    }
    else {
        console.error('Tech element not found');
    }
    // set the tech font (same as description)
    if (techObject) {
        techObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Tech element not found');
    }
    // set the time spent
    let timeObject = document.getElementById('time');
    if (timeObject) {
        timeObject.innerText += (" " + data.timeSpent);
    }
    else {
        console.error('Time element not found');
    }
    // set the time font (same as description)
    if (timeObject) {
        timeObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Time element not found');
    }
    // set links (github, demo, download, etc.)
    let githubObject = document.getElementById('github');
    let demoObject = document.getElementById('demo');
    let downloadObject = document.getElementById('download');
    if (githubObject) {
        if (data.links.github) {
            githubObject.href = data.links.github;
        }
        else {
            githubObject.remove();
        }
    }
    else {
        console.error('Github element not found');
    }
    if (demoObject) {
        if (data.links.demo) {
            demoObject.href = data.links.demo;
        }
        else {
            demoObject.remove();
        }
    }
    if (downloadObject) {
        if (data.links.download) {
            downloadObject.href = data.links.download;
        }
        else {
            downloadObject.remove();
        }
    }
    // set fonts for links
    if (githubObject) {
        githubObject.style.fontFamily = data.bodyFont;
    }
    if (demoObject) {
        demoObject.style.fontFamily = data.bodyFont;
    }
    if (downloadObject) {
        downloadObject.style.fontFamily = data.bodyFont;
    }
    // set the author name
    let authorObject = document.getElementById('author-link');
    if (authorObject) {
        authorObject.innerText = (" " + data.author);
    }
    else {
        console.error('Author element not found');
    }
    // set the author link
    if (authorObject) {
        authorObject.href = data.authorLink;
    }
    else {
        console.error('Author link element not found');
    }
    // set the author link font (same as description)
    if (authorObject) {
        authorObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Author link element not found');
    }
    // set font on pretext (same as description)
    let authorPretextObject = document.getElementById('author');
    if (authorPretextObject) {
        authorPretextObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Author pretext element not found');
    }
    // set font on shiplink-footnote (same as description)
    let shiplinkFootnoteObject = document.getElementById('shiplink-footnote');
    if (shiplinkFootnoteObject) {
        shiplinkFootnoteObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Shiplink footnote element not found');
    }
    //set font on markdown
    let markdownObject = document.getElementById('markdown');
    if (markdownObject) {
        markdownObject.style.fontFamily = data.bodyFont;
    }
    else {
        console.error('Markdown element not found');
    }
    console.log(data);
}
function generateMarkdown() {
    let data = prjData;
    let markdown = "";
    markdown += `# ${data.title}\n\n`;
    markdown += `${data.description}\n\n`;
    markdown += `## Technologies\n\n`;
    markdown += `${data.technologies.join(', ')}\n\n`;
    markdown += `## Time Spent\n\n`;
    markdown += `${data.timeSpent}\n\n`;
    markdown += `## Links\n\n`;
    markdown += `Github: [${data.links.github}](${data.links.github})\n\n`;
    markdown += `Demo: [${data.links.demo}](${data.links.demo})\n\n`;
    markdown += `Download: [${data.links.download}](${data.links.download})\n\n`;
    markdown += `## Author\n\n`;
    markdown += `[${data.author}](${data.authorLink})\n\n`;
    markdown += `Generated with Shiplink\n\n`;
    return markdown;
}
