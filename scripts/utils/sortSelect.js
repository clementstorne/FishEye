const select = document.querySelector('select');

function displaySelectButton() {
  const selectLabel = document.getElementById('sort-label');

  const mediaWrapper = document.querySelector('.photographer-medias');
  const sortSelectWrapper = document.createElement('button');
  sortSelectWrapper.setAttribute('aria-haspopup', 'listbox');
  sortSelectWrapper.setAttribute('aria-expanded', 'false');
  sortSelectWrapper.classList.add('sort-select-wrapper');
  /**
   * Déplie/Replie le bouton de tri au clic
   */
  sortSelectWrapper.addEventListener('click', toggleSelectOptions);
  mediaWrapper.insertBefore(sortSelectWrapper, selectLabel);

  const sortSelect = document.createElement('div');
  sortSelect.classList.add('sort-select');
  sortSelect.innerHTML = select.options[select.selectedIndex].innerHTML;
  sortSelectWrapper.appendChild(sortSelect);

  const toggleButton = document.createElement('div');
  toggleButton.classList.add('sort-list-toggle-button-expand');
  sortSelectWrapper.appendChild(toggleButton);

  const newMenu = document.createElement('ul');
  newMenu.setAttribute('role', 'listbox');
  newMenu.classList.add('sort-select-list', 'hidden');
  sortSelectWrapper.appendChild(newMenu);

  for (let option of select.options) {
    const newOption = document.createElement('li');
    newOption.setAttribute('role', 'option');
    newOption.setAttribute('tabindex', '0');
    /**
     * Trie les médias au clic sur une option de tri
     */
    newOption.addEventListener('click', function (event) {
      sort(option.value);
    });
    /**
     * Trie les médias lorsqu'une option de tri est choisie au clavier
     */
    newOption.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        sort(option.value);
      }
    });
    newOption.innerHTML = option.innerHTML;
    newOption.classList.add('sort-select-item', 'hidden');
    newMenu.appendChild(newOption);
    /**
     * Modifie le texte du bouton au clic sur une option de tri
     */
    newOption.addEventListener('click', setSelectedOption);
    /**
     * Modifie le texte du bouton lorsqu'une option de tri est choisie au clavier
     */
    newOption.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        setSelectedOption();
      }
    });
  }
}

/**
 * Fonction qui modifie l'attribut ARIA-expanded lorsque le bouton de tri est déplié/replié
 */
function toggleAriaExpandedAttribute() {
  const sortSelectWrapper = document.createElement('button');
  const isMenuExpanded = sortSelectWrapper.getAttribute('aria-expanded');
  if (isMenuExpanded === 'true') {
    sortSelectWrapper.setAttribute('aria-expanded', 'false');
  } else if (isMenuExpanded === 'false') {
    sortSelectWrapper.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Fonction qui déplie/replie le bouton de tri
 */
function toggleSelectOptions() {
  toggleAriaExpandedAttribute();
  const newMenu = document.querySelector('.sort-select-list');
  newMenu.classList.toggle('hidden');
  const selectOptions = document.querySelectorAll('.sort-select-item');
  selectOptions.forEach((option) => {
    option.classList.toggle('hidden');
  });
}

/**
 * Fonction qui modifie le texte du bouton au choix d'une option de tri
 */
function setSelectedOption() {
  const sortSelect = document.querySelector('.sort-select');
  for (let option of select.options) {
    if (option.innerHTML === this.innerHTML) {
      select.selectedIndex = option.index;
      sortSelect.innerHTML = this.innerHTML;
    }
  }
}
