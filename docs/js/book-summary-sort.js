(function () {
  function getSummaryItems() {
    return Array.from(document.querySelectorAll('[data-dateopenaccess][data-datebook][data-titlesort]'));
  }

  function compareDescendingDates(attribute) {
    return function (first, second) {
      const firstValue = first.getAttribute(attribute) || '';
      const secondValue = second.getAttribute(attribute) || '';

      return secondValue.localeCompare(firstValue) || compareOriginalOrder(first, second);
    };
  }

  function compareTitles(first, second) {
    return first.getAttribute('data-titlesort').localeCompare(second.getAttribute('data-titlesort'), undefined, {
      sensitivity: 'base',
      numeric: true
    }) || compareOriginalOrder(first, second);
  }

  function compareOriginalOrder(first, second) {
    return Number(first.dataset.originalOrder) - Number(second.dataset.originalOrder);
  }

  function updateImageLoading(items) {
    items.forEach((item, index) => {
      const image = item.querySelector('.thumb img');

      if (!image) {
        return;
      }

      if (index < 6) {
        image.removeAttribute('loading');
        image.setAttribute('fetchpriority', 'high');
      } else {
        image.setAttribute('loading', 'lazy');
        image.removeAttribute('fetchpriority');
      }
    });
  }

  function sortBookSummaries(sortValue) {
    const items = getSummaryItems();

    if (!items.length) {
      return;
    }

    const sortedItems = items.slice();
    switch (sortValue) {
      case 'dateopenaccess':
        sortedItems.sort(compareDescendingDates('data-dateopenaccess'));
        break;
      case 'datebook':
        sortedItems.sort(compareDescendingDates('data-datebook'));
        break;
      case 'title':
        sortedItems.sort(compareTitles);
        break;
      default:
        return;
    }

    const parent = sortedItems[0].parentNode;
    sortedItems.forEach(item => parent.appendChild(item));
    updateImageLoading(sortedItems);
  }

  document.addEventListener('DOMContentLoaded', () => {
    getSummaryItems().forEach((item, index) => {
      item.dataset.originalOrder = index;
    });

    const sortCombobox = document.querySelector('#sort-select .dqpl-combobox');
    if (!sortCombobox) {
      return;
    }

    sortCombobox.addEventListener('combobox-select:change', event => {
      sortBookSummaries(event.detail.value);
    });
  });
}());
