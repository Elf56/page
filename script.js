const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }
];
const root = document.querySelector('.root');
const placesList = root.querySelector('.places-list');
const popupButton = root.querySelector('.popup__button');
const popup = root.querySelector('.popup');
const zoom = root.querySelector('.zoom');
const zoomClose = root.querySelector('.zoom__close');
const edit = root.querySelector('.edit');
const editButton = root.querySelector('.edit__button');
const form = document.forms.new;
const name = form.elements.name;
const link = form.elements.link;
const formUser = document.forms.user;
const userName = formUser.elements.name1;
const job = formUser.elements.job;

popupButton.addEventListener('click', handleAddPlace);
editButton.addEventListener('click', replacesDataUser);

root.querySelector('.user-info__button').addEventListener('click', function () {
  popup.classList.add('popup_is-opened');    
});

popup.querySelector('.popup__close').addEventListener('click', function () {
  popup.classList.remove('popup_is-opened');    
});

root.querySelector('.user-info__profile').addEventListener('click', function () {
  edit.classList.add('edit_is-opened');
  
  userName.value = root.querySelector('.user-info__name').textContent;
  job.value = root.querySelector('.user-info__job').textContent;

  fieldValidation();
});

root.querySelector('.edit__close').addEventListener('click', function () {
  edit.classList.remove('edit_is-opened');  
   
  root.querySelector('#error-name1').textContent = '';
  root.querySelector('#error-job').textContent = ''; 
});

zoomClose.addEventListener('click', function () { 
  zoom.classList.remove('zoom_is-opened');
});

form.addEventListener('input', formAddCardInputHandler);
formUser.addEventListener('input', formAddUserDataHandler);

userName.addEventListener('input', userNameHandler);
job.addEventListener('input', jobHandler);

//функции
function createCard(nameValue, linkValue) {
  let placeContainer = document.createElement('div');
  placeContainer.classList.add('place-card');
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('place-card__image');
  imageContainer.setAttribute('style', `background-image: url(${linkValue})`);
  let descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('place-card__description');
  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.classList.add('place-card__delete-icon');
  const descriptionElement = document.createElement('h3');
  descriptionElement.classList.add('place-card__name');
  descriptionElement.textContent = nameValue;
  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('place-card__like-icon');

  imageContainer.appendChild(deleteButtonElement);
  descriptionContainer.appendChild(descriptionElement);
  descriptionContainer.appendChild(likeButtonElement);
  placeContainer.appendChild(imageContainer);
  placeContainer.appendChild(descriptionContainer);
 
  deleteButtonElement.addEventListener('click', function (event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
    placesList.removeChild(placeContainer);
  });
  
  likeButtonElement.addEventListener('click', function (event) { 
      event.target.classList.toggle('place-card__like-icon_liked');
  });  

  imageContainer.addEventListener('click', function () {
    zoom.classList.add('zoom_is-opened');
    zoom.querySelector('.zoom__content').setAttribute('style', `background-image: url(${linkValue})`);
  });

  return placeContainer;
}

function handleAddPlace(event){
  event.preventDefault();

  const placeContainer = createCard(name.value, link.value);

  placesList.appendChild(placeContainer);
  
  form.reset();
  popup.classList.remove('popup_is-opened'); 
  popupButton.setAttribute('disabled', true);
  popupButton.classList.add('popup__button_disabled');
}

function replacesDataUser (event) {
  event.preventDefault();


  root.querySelector('.user-info__name').textContent = userName.value;
  root.querySelector('.user-info__job').textContent = job.value;

  formUser.reset();
  edit.classList.remove('edit_is-opened'); 
  editButton.setAttribute('disabled', true);
  editButton.classList.add('edit__button_disabled');
}

function startPlaces() {
  for (i = 0; i <= initialCards.length; i ++) {
  const placeContainer = createCard(initialCards[i].name, initialCards[i].link);
  placesList.appendChild(placeContainer);
  }
}

function formAddCardInputHandler() {
  const name = event.currentTarget.elements.name;
  const link = event.currentTarget.elements.link;

  if (name.value.length === 0 || link.value.length === 0) {
    popupButton.setAttribute('disabled', true);
    popupButton.classList.add('popup__button_disabled');  
  } else {
    popupButton.removeAttribute('disabled');
    popupButton.classList.remove('popup__button_disabled');
  }
}

function formAddUserDataHandler() {
  const userName = event.currentTarget.elements.name1;
  const job = event.currentTarget.elements.job;

  fieldValidation();
}

function fieldValidation() {
  if (userName.value.length < 2 || job.value.length < 2) {
    editButton.setAttribute('disabled', true);
    editButton.classList.add('edit__button_disabled');
  }else if(userName.value.length > 30 || job.value.length > 30) {
    editButton.setAttribute('disabled', true);
    editButton.classList.add('edit__button_disabled');
  }else{
    editButton.removeAttribute('disabled');
    editButton.classList.remove('edit__button_disabled');
  }
}

function userNameHandler() {
  checksConditions(userName, root.querySelector('#error-name1')); 
}

function jobHandler() {
  checksConditions(job, root.querySelector('#error-job'));  
}

function checksConditions(elem, btn) {
  if (elem.value.length === 0) {
    btn.textContent = 'Это обязательное поле';
  }else if(elem.value.length === 1 || elem.value.length > 30){
    btn.textContent = 'Должно быть от 2 до 30 символов';
  }else{
    btn.textContent = '';
  }
}

startPlaces(); 
