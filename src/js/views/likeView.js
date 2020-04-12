import {
    elements
} from './base';

export const renderToggleLikeBtn = isLike => {
    const iconString = isLike ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;

    elements.likeList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;

    if (el) el.parentElement.removeChild(el);
}