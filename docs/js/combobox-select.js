(function () {
  const listboxOpenClass = 'dqpl-listbox-show';
  const activeOptionClass = 'dqpl-option-active';
  let generatedId = 0;

  function getOptions(listbox) {
    return Array.from(listbox.querySelectorAll('[role="option"]'));
  }

  function getEnabledOptions(listbox) {
    return getOptions(listbox).filter(option => option.getAttribute('aria-disabled') !== 'true');
  }

  function getOptionLabel(option) {
    return option.textContent.replace(/\s+/g, ' ').trim();
  }

  function ensureOptionIds(listbox) {
    getOptions(listbox).forEach(option => {
      if (!option.id) {
        generatedId += 1;
        option.id = `dqpl-option-${generatedId}`;
      }
    });
  }

  function setActive(combobox, listbox, option, scroll) {
    if (!option) {
      return;
    }

    getOptions(listbox).forEach(current => current.classList.remove(activeOptionClass));
    option.classList.add(activeOptionClass);
    combobox.setAttribute('aria-activedescendant', option.id);

    if (scroll) {
      option.scrollIntoView({ block: 'nearest' });
    }
  }

  function selectOption(combobox, listbox, option, close) {
    if (!option || option.getAttribute('aria-disabled') === 'true') {
      return;
    }

    const previousSelected = listbox.querySelector('[aria-selected="true"]');
    const previousValue = previousSelected ? previousSelected.getAttribute('data-value') : null;
    const newValue = option.getAttribute('data-value');

    getOptions(listbox).forEach(current => current.removeAttribute('aria-selected'));
    option.setAttribute('aria-selected', 'true');
    setActive(combobox, listbox, option, false);

    const pseudoValue = combobox.querySelector('.dqpl-pseudo-value');
    if (pseudoValue) {
      const textTarget = pseudoValue.firstElementChild || pseudoValue;
      textTarget.textContent = getOptionLabel(option);
    }

    if (close) {
      closeListbox(combobox, listbox);
    }

    if (newValue !== previousValue) {
      combobox.dispatchEvent(new CustomEvent('combobox-select:change', {
        bubbles: true,
        detail: {
          value: newValue,
          label: getOptionLabel(option),
          option
        }
      }));
    }
  }

  function getSelectedOption(combobox, listbox) {
    const selected = listbox.querySelector('[aria-selected="true"]');
    if (selected) {
      return selected;
    }

    const activeId = combobox.getAttribute('aria-activedescendant');
    return activeId ? document.getElementById(activeId) : null;
  }

  function openListbox(combobox, listbox) {
    const selected = getSelectedOption(combobox, listbox) || getEnabledOptions(listbox)[0];
    listbox.classList.add(listboxOpenClass);
    combobox.setAttribute('aria-expanded', 'true');
    listbox.setAttribute('data-cached-selected', selected ? selected.id : '');
    setActive(combobox, listbox, selected, true);
  }

  function closeListbox(combobox, listbox) {
    listbox.classList.remove(listboxOpenClass);
    combobox.setAttribute('aria-expanded', 'false');
  }

  function cancelListbox(combobox, listbox) {
    const cachedId = listbox.getAttribute('data-cached-selected');
    const cachedOption = cachedId ? document.getElementById(cachedId) : getSelectedOption(combobox, listbox);
    setActive(combobox, listbox, cachedOption, false);
    closeListbox(combobox, listbox);
  }

  function isOpen(listbox) {
    return listbox.classList.contains(listboxOpenClass);
  }

  function moveActive(combobox, listbox, direction) {
    const options = getEnabledOptions(listbox);
    if (!options.length) {
      return;
    }

    const activeId = combobox.getAttribute('aria-activedescendant');
    const activeOption = activeId ? document.getElementById(activeId) : null;
    const currentIndex = Math.max(0, options.indexOf(activeOption));
    const nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex + direction));
    setActive(combobox, listbox, options[nextIndex], true);
  }

  function matchOptionByCharacter(listbox, character) {
    const lowerCharacter = character.toLowerCase();
    return getEnabledOptions(listbox).find(option => getOptionLabel(option).toLowerCase().startsWith(lowerCharacter));
  }

  function initCombobox(combobox) {
    const listboxId = combobox.getAttribute('aria-owns');
    const listbox = listboxId ? document.getElementById(listboxId) : null;
    if (!listbox || combobox.dataset.dqplComboboxReady === 'true') {
      return;
    }

    combobox.dataset.dqplComboboxReady = 'true';
    combobox.tabIndex = 0;
    combobox.setAttribute('aria-expanded', 'false');
    ensureOptionIds(listbox);

    const selected = getSelectedOption(combobox, listbox) || getEnabledOptions(listbox)[0];
    selectOption(combobox, listbox, selected, false);
    let suppressNextOptionClick = false;

    combobox.addEventListener('click', () => {
      if (isOpen(listbox)) {
        closeListbox(combobox, listbox);
      } else {
        openListbox(combobox, listbox);
      }
    });

    combobox.addEventListener('keydown', event => {
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (isOpen(listbox)) {
            selectOption(combobox, listbox, document.getElementById(combobox.getAttribute('aria-activedescendant')), true);
          } else {
            openListbox(combobox, listbox);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen(listbox)) {
            openListbox(combobox, listbox);
          } else {
            moveActive(combobox, listbox, 1);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen(listbox)) {
            openListbox(combobox, listbox);
          } else {
            moveActive(combobox, listbox, -1);
          }
          break;
        case 'Home':
          event.preventDefault();
          if (!isOpen(listbox)) {
            openListbox(combobox, listbox);
          }
          setActive(combobox, listbox, getEnabledOptions(listbox)[0], true);
          break;
        case 'End':
          event.preventDefault();
          if (!isOpen(listbox)) {
            openListbox(combobox, listbox);
          }
          setActive(combobox, listbox, getEnabledOptions(listbox).at(-1), true);
          break;
        case 'Escape':
          if (isOpen(listbox)) {
            event.preventDefault();
            cancelListbox(combobox, listbox);
          }
          break;
        case 'Tab':
          closeListbox(combobox, listbox);
          break;
        default:
          if (event.key.length === 1 && event.key.trim()) {
            const match = matchOptionByCharacter(listbox, event.key);
            if (match) {
              if (!isOpen(listbox)) {
                openListbox(combobox, listbox);
              }
              setActive(combobox, listbox, match, true);
            }
          }
      }
    });

    combobox.addEventListener('blur', () => {
      if (isOpen(listbox)) {
        cancelListbox(combobox, listbox);
      }
    });

    listbox.addEventListener('mousedown', event => {
      const option = event.target.closest('[role="option"]');
      if (!option || option.getAttribute('aria-disabled') === 'true') {
        return;
      }

      event.preventDefault();
      setActive(combobox, listbox, option, false);
      combobox.focus();

      document.addEventListener('mouseup', mouseupEvent => {
        const releasedOption = mouseupEvent.target.closest('[role="option"]');
        suppressNextOptionClick = Boolean(releasedOption && listbox.contains(releasedOption));

        if (releasedOption && listbox.contains(releasedOption) && releasedOption.getAttribute('aria-disabled') !== 'true') {
          selectOption(combobox, listbox, releasedOption, true);
        } else {
          cancelListbox(combobox, listbox);
        }
      }, { once: true });
    });

    listbox.addEventListener('click', event => {
      const option = event.target.closest('[role="option"]');
      if (!option || option.getAttribute('aria-disabled') === 'true') {
        return;
      }

      if (suppressNextOptionClick) {
        suppressNextOptionClick = false;
        return;
      }

      selectOption(combobox, listbox, option, true);
      combobox.focus();
    });

    listbox.addEventListener('mouseover', event => {
      const option = event.target.closest('[role="option"]');
      if (option && option.getAttribute('aria-disabled') !== 'true') {
        setActive(combobox, listbox, option, false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dqpl-combobox').forEach(initCombobox);
  });
}());
